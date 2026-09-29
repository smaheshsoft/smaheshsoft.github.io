window.Pages = window.Pages || {};
window.Pages['amtech'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>AM Tech Software</span></div>
    <h1>🧵 AM Tech Software Interview — Round 1</h1>
    <p>Timeout Diagnosis · LLM Caching &amp; Cost · RAG Accuracy · Parallel API Calls &amp; Cancellation · Thread Pool Starvation · SemaphoreSlim · Monolith→Microservices Buy-in · Slow Query Diagnosis · AI Cost Justification · Async Non-Blocking UI</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">How do you identify the cause of a timeout when both the DB and the App Service look fine?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">The trap in the question — "DB and App fine" usually means someone only checked CPU/memory</div>
            <p>A timeout with healthy CPU and memory on both ends almost always means the request is stuck <strong>waiting</strong>, not <strong>computing</strong> — and the usual suspects don't show up on a basic dashboard.</p>
          </div>
          <div class="code-box">WHERE TO LOOK, IN ORDER

1. CONNECTION POOL EXHAUSTION (most common cause of this exact symptom)
   DB server: low CPU, low memory — because it isn't even RECEIVING the query yet.
   App: threads are just WAITING for a free pooled connection.
   Check: SqlConnection pool counters, "Wait Timeout expired" in the exception
   message is the smoking gun — that's a POOL timeout, not a query timeout.

2. THREAD POOL STARVATION (see Q6) — sync-over-async blocking worker threads
   so the request never even reaches the point of calling the DB.

3. LOCK / BLOCKING CHAIN IN THE DATABASE
   A cheap, fast query can time out for 30s waiting on a LOCK held by an
   unrelated long transaction. sys.dm_exec_requests + sys.dm_os_waiting_tasks
   (or pg_locks / pg_stat_activity) shows blocking chains — CPU stays idle
   because the query isn't running, it's queued behind a lock.

4. DOWNSTREAM DEPENDENCY (a THIRD service, not DB or App)
   DNS resolution delay, an expired TLS cert triggering retries, a
   Redis/cache call hanging, or an external API call with no timeout set.

5. NETWORK / INFRA LAYER
   NSG rules, a saturated Private Link / VNet peering, Azure SNAT port
   exhaustion — outbound connections silently queue when SNAT ports run out.</div>
          <div class="ans-block"><div class="ans-label">The systematic approach — don't guess, correlate</div>
            <div class="flow-box">
              <div class="flow-step">Correlation ID</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Distributed Trace (App Insights)</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Find the exact SPAN that's slow</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step green">Is it waiting, or computing?</div>
            </div>
            <p>A distributed trace with dependency spans tells you WHICH hop is slow before you touch either server. If the DB span itself is fast but the overall request is slow, the problem is upstream of the DB call — pool wait, thread pool queue, or a prior dependency.</p>
          </div>
          <div class="tip-box">✅ Answer structure that scores well: "I wouldn't trust 'DB and App are fine' as a conclusion — I'd verify it with a distributed trace first, because CPU and memory are the wrong metrics for a waiting-not-computing problem. Nine times out of ten with this exact symptom, it's connection pool exhaustion or a lock wait — both invisible on a resource dashboard."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">How do you use caching in LLM workflows to reduce cost?</div>
        <div class="qa-answer">
          <div class="code-box">THREE CACHE LAYERS

1. EXACT CACHE
   key = hash(model + prompt version + normalized input + doc versions)
   Zero quality risk. Include retrieved-doc versions in the key so a
   document update invalidates stale cached answers automatically.

2. SEMANTIC CACHE
   Embed the incoming question; if cosine similarity to a cached
   question exceeds a threshold, reuse its answer.
   Powerful on FAQ/support traffic where wording varies but intent repeats.
   ⚠️ Scope per tenant + per permission set — a loose threshold can
      return a confidently wrong cached answer to the wrong user.

3. PROMPT / PREFIX CACHE (provider feature)
   Providers discount a long, STABLE prefix (system prompt, standing
   instructions) reused across calls. Structure prompts as:
   [stable system prompt] → [stable few-shot examples] → [variable input]
   so the cacheable portion is as large as possible.</div>
          <div class="code-box">// Exact + semantic cache, checked before ever calling the model
public async Task&lt;string&gt; AnswerAsync(string question, string tenant, CancellationToken ct)
{
    var exactKey = ComputeExactKey(question, tenant, promptVersion: "v7");
    if (await _cache.TryGetAsync(exactKey, out var cached))
        return cached;                                    // zero LLM calls

    var qVector = await _embeddings.EmbedAsync(question, ct);
    var similar = await _semanticCache.FindSimilarAsync(qVector, tenant, threshold: 0.95, ct);
    if (similar is not null)
        return similar.Answer;                             // reuse, no LLM call

    var answer = await _llm.CompleteAsync(BuildPrompt(question), ct);
    await _cache.SetAsync(exactKey, answer, ttl: TimeSpan.FromHours(6));
    await _semanticCache.StoreAsync(qVector, answer, tenant);
    return answer;
}</div>
          <div class="tip-box">✅ Also mention: cache hit rate is a first-class cost metric — track it on a dashboard next to spend, because a silent cache-invalidation bug looks identical to "traffic grew" on a monthly cost chart.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">How do you optimize the context window? When do you fine-tune vs other approaches?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Context window optimization — precision over volume</div>
            <div class="code-box">❌ "Just retrieve more chunks to be safe" — 20+ chunks in the prompt
   → dilutes relevance ("lost in the middle"), costs more, SLOWER

✅ Retrieve 5-6 HIGH-PRECISION chunks via hybrid search + re-ranking
   → the model attends better to less, more relevant context

OTHER LEVERS:
  Summarize old conversation turns instead of resending full history
  Prepend a heading path to each chunk so it's self-describing without
    needing surrounding context: "Ops Manual › §4.2 Downtime SLA › ..."
  Compress tool-call results before re-inserting into context
    (top-N rows + count, not a raw 500-row dump)</div>
          </div>
          <div class="ans-block"><div class="ans-label">Fine-tuning vs the alternatives — decide in this order</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.6fr 1.3fr;"><div>Approach</div><div>Fixes</div><div>Cost/effort</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.3fr;"><div class="dt-name">Better prompt</div><div>Format, tone, missing instructions</div><div class="dt-yes">Lowest — try first</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.3fr;"><div class="dt-name">RAG / grounding</div><div>Factual accuracy, freshness, private data</div><div class="dt-yes">Low-medium</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.3fr;"><div class="dt-name">Few-shot examples</div><div>Consistent output format, edge cases</div><div>Low</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.3fr;"><div class="dt-name">Fine-tuning</div><div>Domain TONE/STYLE at scale, or a narrow task run millions of times where prompt tokens dominate cost</div><div class="dt-no">High — training data, evaluation, retraining on drift</div></div>
            </div>
            <p>Fine-tuning teaches <strong>behaviour</strong>; RAG teaches <strong>facts</strong>. If the wrong answer changes when a document changes, that's a RAG problem, not a fine-tuning problem — fine-tuning on facts that change goes stale immediately.</p>
          </div>
          <div class="tip-box">✅ Interview line: "I reach for fine-tuning last, not first — it's the most expensive lever and the least reversible. I'd only fine-tune once prompt engineering and RAG have hit their ceiling and the remaining gap is consistent, structural, and worth the retraining cost every time the base model updates."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">We're getting 95% matching in the RAG pipeline — how do we get to 99.9% accuracy?</div>
        <div class="qa-answer">
          <div class="warn-box">⚠️ First reframe the question itself: "99.9% accuracy" is very rarely achievable or even the right target for natural-language retrieval — treat this as "how do I close the gap as far as it's economically worth closing," and say so. Promising 99.9% and missing it is worse than setting the right expectation up front.</div>
          <div class="ans-block"><div class="ans-label">Diagnose BEFORE you tune anything — find out where the 5% is actually failing</div>
            <div class="code-box">Build a labelled evaluation set of real failing questions, then classify:

  RETRIEVAL FAILURE      right chunk never came back            → fix chunking/embedding
  RANKING FAILURE        right chunk came back, ranked #8        → fix re-ranking
  GENERATION FAILURE     right chunk was in the prompt, model
                         still got it wrong                      → fix prompt/grounding rules
  AMBIGUOUS QUESTION     the question itself has no single
                         correct answer in the corpus             → not a system bug

Most teams jump straight to "try a better model" — but in practice the
5% failing is usually retrieval or ranking, not generation.</div>
          </div>
          <div class="ans-block"><div class="ans-label">The levers, in likely order of impact</div>
            <ul>
              <li><strong>Hybrid search</strong> — if not already combining vector + keyword, this alone often recovers several points, especially on exact identifiers.</li>
              <li><strong>Better chunking</strong> — structural (by heading/section) instead of fixed-size, with a heading-path prefix on each chunk.</li>
              <li><strong>Re-ranking</strong> — a cross-encoder re-ranker over the top 20-30 candidates before selecting the final 5.</li>
              <li><strong>Query rewriting</strong> — resolve pronouns/context from chat history before embedding the query.</li>
              <li><strong>Confidence-based refusal</strong> — for the residual gap, explicitly refuse or escalate to a human rather than guess. This converts "wrong answer" into "known unknown," which is what most businesses actually need at the 99%+ tier.</li>
            </ul>
          </div>
          <div class="tip-box">✅ Strong answer: "I'd push hard from 95% toward 98-99% with hybrid search, better chunking and a re-ranker — that's usually where the real gains are. Past that, I'd stop chasing the number in the retrieval system itself and instead make the LAST mile safe: confidence-scored refusal and human escalation, because for the remaining edge cases, 'I don't know, let me check' is a better outcome than a confident wrong answer, and it's far cheaper to build than squeezing the last fraction of a percent out of the model."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">You have 4 services and need to make 3 API calls in parallel and get the response. If the request is cancelled, how do you notify the other services?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Parallel calls with a shared cancellation token — the standard .NET shape</div>
          <div class="code-box">public async Task&lt;AggregatedResult&gt; GetAggregatedDataAsync(
    string orderId, CancellationToken callerToken)
{
    // Own timeout + link to the caller's cancellation — either can cancel all three
    using var timeoutCts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
    using var linkedCts  = CancellationTokenSource.CreateLinkedTokenSource(callerToken, timeoutCts.Token);
    var ct = linkedCts.Token;

    Task&lt;PaymentInfo&gt;   paymentTask   = _paymentClient.GetAsync(orderId, ct);
    Task&lt;InventoryInfo&gt; inventoryTask = _inventoryClient.GetAsync(orderId, ct);
    Task&lt;ShippingInfo&gt;  shippingTask  = _shippingClient.GetAsync(orderId, ct);

    try
    {
        await Task.WhenAll(paymentTask, inventoryTask, shippingTask);
        // ct cancelled here (by caller OR timeout) → WhenAll throws
        // TaskCanceledException, and HttpClient PROPAGATES that ct into
        // every in-flight request, aborting the TCP connection on each.
    }
    catch (OperationCanceledException) when (ct.IsCancellationRequested)
    {
        _logger.LogWarning("Aggregation cancelled for order {OrderId}", orderId);
        throw;   // let the caller's own cancellation flow through, don't swallow it
    }

    return new AggregatedResult(paymentTask.Result, inventoryTask.Result, shippingTask.Result);
}</div></div>
          <div class="ans-block"><div class="ans-label">"Notify the other services" — the part people get wrong</div>
            <p><code>CancellationToken</code> only cancels the <strong>outbound HTTP call from THIS service</strong> — it does not, by itself, tell a downstream service "abandon the work you already started." Whether that matters depends on what those services are doing:</p>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.8fr;"><div>Downstream work is...</div><div>What actually happens on cancel</div></div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;"><div class="dt-name">A quick read</div><div>Aborting the TCP connection is enough — the downstream service was almost done anyway, or the DB query gets cancelled via the DB driver honouring the connection close</div></div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;"><div class="dt-name">A long-running / stateful operation</div><div>Connection abort does NOT stop it — you need an explicit cancel signal, e.g. a follow-up <code>DELETE /jobs/{{id}}</code> call, or the downstream service publishes progress and self-cancels on a "job abandoned" event</div></div>
            </div>
            <div class="code-box">// If downstream work is genuinely long-running, cancellation needs to be
// an explicit MESSAGE, not just a dropped connection:
catch (OperationCanceledException)
{
    // fire-and-forget cleanup — don't let cleanup itself block on the
    // already-cancelled token
    _ = Task.WhenAll(
        _paymentClient.CancelAsync(orderId, CancellationToken.None),
        _inventoryClient.CancelAsync(orderId, CancellationToken.None),
        _shippingClient.CancelAsync(orderId, CancellationToken.None));
    throw;
}</div>
          </div>
          <div class="tip-box">✅ This distinction — "dropping the connection isn't the same as telling the other side to stop working" — is exactly what separates a senior answer from a mid-level one on this question.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">How do you handle thread starvation, and how do you know how many threads are running, how many are queued, and how many have progressed? How would you make a junior developer aware of this?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">What causes thread pool starvation — the root cause, not just symptoms</div>
            <div class="code-box">MOST COMMON CAUSE: sync-over-async
  .Result / .Wait() / .GetAwaiter().GetResult() on an async call BLOCKS
  a thread pool worker thread instead of releasing it back to the pool
  while waiting. Do this under load and the pool can't grow fast enough
  (it adds threads slowly — ~1-2 per second after the burst) to keep up,
  so newly queued work sits waiting even though "nothing looks busy".

OTHER CAUSES: CPU-bound work on the thread pool (should use a dedicated
  pool or offload), Task.Run misuse queuing more work onto the SAME
  starved pool, and long synchronous I/O calls (blocking file/DB APIs).</div>
          </div>
          <div class="ans-block"><div class="ans-label">How to actually SEE it — running / queued / completed</div>
            <div class="code-box">ThreadPool.GetAvailableThreads(out int workerAvail, out int ioAvail);
ThreadPool.GetMaxThreads(out int workerMax, out int ioMax);
ThreadPool.GetMinThreads(out int workerMin, out int ioMin);

int running = workerMax - workerAvail;        // currently executing
// QUEUED work isn't directly exposed — use ThreadPool.PendingWorkItemCount
// (.NET 6+) or ETW/EventCounters for a true queue-length signal:
long queued    = ThreadPool.PendingWorkItemCount;
long completed = ThreadPool.CompletedWorkItemCount;

// Expose as a metric, don't just log it once:
_meter.CreateObservableGauge("threadpool.running", () => running);
_meter.CreateObservableGauge("threadpool.queued",  () => queued);
_meter.CreateObservableGauge("threadpool.completed_total", () => completed);</div>
            <div class="code-box">// Production signal: the ThreadPoolStarvation dotnet-counters events
// dotnet-counters monitor -p &lt;pid&gt; System.Runtime
//   shows ThreadPool Queue Length, ThreadPool Thread Count LIVE
// dotnet-trace + PerfView can capture "Thread pool starvation" ETW events
//   directly — .NET raises these when queue latency crosses a threshold.

// Application Insights: request duration growing while CPU stays flat
// is the classic starvation fingerprint — the same shape as the Q1 timeout.</div>
          </div>
          <div class="ans-block"><div class="ans-label">Making a junior developer aware — turn it into something they can't miss</div>
            <ul>
              <li><strong>A live dashboard panel</strong> (Grafana/App Insights) showing thread pool queue length next to request latency — so the correlation is visually obvious the next time it happens, not something they have to know to go looking for.</li>
              <li><strong>An analyzer/lint rule</strong> that flags <code>.Result</code>, <code>.Wait()</code>, and <code>.GetAwaiter().GetResult()</code> in PR review — catch the root cause before it ships, not after it pages someone.</li>
              <li><strong>A 15-minute "why async all the way" walkthrough</strong> with a before/after load test showing latency under 500 concurrent requests with and without one sync-over-async call in the chain — the numbers make the abstract concept concrete.</li>
              <li><strong>A runbook entry</strong>: "latency up, CPU flat → check thread pool queue length first" — so on-call doesn't have to rediscover this pattern from scratch.</li>
            </ul>
          </div>
          <div class="tip-box">✅ Closing line: "The fix for the current incident is finding and removing the blocking call. The fix for it not recurring is making the signal visible — a dashboard and a lint rule beat a wiki page nobody reads."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q7</div>
      <div class="qa-body">
        <div class="qa-question">What scenario have you used SemaphoreSlim for? Explain it.</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">The scenario: capping concurrent calls to a rate-limited downstream dependency</div>
            <p>A batch job needed to enrich thousands of records by calling an external API that enforces a hard concurrency limit (e.g. 10 simultaneous connections) — firing all requests with <code>Task.WhenAll</code> unthrottled would trip the provider's rate limiter and start failing requests.</p>
          </div>
          <div class="code-box">public class ThrottledApiClient
{
    // initialCount = maxCount = 10 → exactly 10 concurrent slots
    private readonly SemaphoreSlim _throttle = new(initialCount: 10, maxCount: 10);
    private readonly HttpClient _http;

    public async Task&lt;EnrichedRecord&gt; EnrichAsync(Record record, CancellationToken ct)
    {
        await _throttle.WaitAsync(ct);      // blocks here if 10 are already in flight
        try
        {
            var response = await _http.GetAsync($"/enrich/{record.Id}", ct);
            return await response.Content.ReadFromJsonAsync&lt;EnrichedRecord&gt;(ct);
        }
        finally
        {
            _throttle.Release();            // ALWAYS release, even on exception —
        }                                   // finally is non-negotiable here
    }
}

// Caller — 5000 records, but never more than 10 in flight at once
var tasks = records.Select(r => client.EnrichAsync(r, ct));
var results = await Task.WhenAll(tasks);</div>
          <div class="ans-block"><div class="ans-label">Why SemaphoreSlim specifically, not lock or Semaphore</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1fr 1.8fr;"><div>Option</div><div>Why not / why yes</div></div>
              <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">lock / Monitor</div><div>Only allows ONE thread through — this needed N concurrent, not mutual exclusion</div></div>
              <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">Semaphore (non-Slim)</div><div>Kernel object, heavier, only supports synchronous <code>.Wait()</code> — blocks a thread instead of awaiting</div></div>
              <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">SemaphoreSlim</div><div class="dt-yes">Lightweight, in-process, and critically has <code>WaitAsync()</code> — doesn't block a thread pool thread while waiting, which avoids exactly the starvation problem from Q6</div></div>
            </div>
          </div>
          <div class="warn-box">⚠️ The failure mode to call out unprompted: forgetting the <code>finally</code> block. If an exception is thrown between <code>WaitAsync</code> and <code>Release</code>, that slot is permanently lost and the semaphore slowly starves down to zero — a subtle, hard-to-diagnose deadlock-like bug that only appears under sustained failure conditions.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q8</div>
      <div class="qa-body">
        <div class="qa-question">We have all the APIs and the DB in a single monolithic application. How do you convince people to move to microservices? What are the ways to get approval?</div>
        <div class="qa-answer">
          <div class="warn-box">⚠️ Careful — this is also a trap question, the same shape as "why not just ETL" from other rounds. The strong answer does NOT assume microservices are automatically the right call. Lead with the diagnostic, not the pitch.</div>
          <div class="ans-block"><div class="ans-label">Step 1 — diagnose the ACTUAL pain before proposing a solution</div>
            <div class="code-box">Don't pitch "microservices" as a technology upgrade. Find the specific,
NAMED pain the business already feels:
  • One team's deploy blocks every other team's release?
  • One noisy module (e.g. reporting) drags down the whole app under load?
  • Onboarding a new engineer takes weeks because the codebase is huge?
  • A single slow/leaky dependency has taken the WHOLE system down before?

If none of these are true, microservices add operational cost for no
measured benefit — and that itself is a valid, defensible conclusion
to bring back to leadership.</div>
          </div>
          <div class="ans-block"><div class="ans-label">Step 2 — build the business case in THEIR language, not architecture language</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.9fr;"><div>Audience</div><div>What actually moves them</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">Engineering leadership</div><div>Deploy frequency today vs projected, incident blast-radius history, time-to-onboard a new hire</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">Finance / business</div><div>Cost of a specific outage that a bulkhead would have contained, engineering hours lost per quarter to release coordination overhead</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">Product</div><div>Features blocked or delayed because of the monolith's release cadence</div></div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Step 3 — the approval path that actually works: prove it small, don't ask for a rewrite</div>
            <div class="code-box">❌ "Approve a 12-month rewrite to microservices" — huge ask, huge risk,
   easy to say no to, and a classic way projects die in committee.

✅ STRANGLER FIG — incremental, each step independently justifiable:
  1. Pick the ONE module causing the most pain (highest change frequency
     + highest incident correlation — data-driven, not opinion-driven)
  2. Extract JUST that one as a service, behind the existing API gateway/
     facade — the monolith and the new service run side by side
  3. Measure the SAME metrics from step 1 (deploy frequency, blast radius)
     before/after — this becomes your evidence for the next module
  4. Only propose extracting module #2 once module #1 has PROVEN data,
     not projected data

Each step needs sign-off for weeks of work, not years — far easier to
approve, and each success builds the case for the next.</div>
          </div>
          <div class="tip-box">✅ Closing line: "I wouldn't ask for permission to 'migrate to microservices' — that's an architecture-driven pitch and it's rightly hard to approve. I'd ask for permission to extract ONE specific painful module, with a before/after metric already agreed, and let the results build the business case for what comes next. That also means if the data doesn't support it, I've lost weeks, not years."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q9</div>
      <div class="qa-body">
        <div class="qa-question">A query that used to run in milliseconds is now taking minutes. How do you identify the issue and fix it?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">"Used to be fast, now slow" narrows the search dramatically — it's a CHANGE, not a design flaw</div>
            <p>The query text presumably hasn't changed (or check that first) — so something about the DATA or the ENVIRONMENT around it has. That reframing is the fastest path to the answer.</p>
          </div>
          <div class="code-box">DIAGNOSTIC CHECKLIST, IN LIKELY-CAUSE ORDER

1. STALE STATISTICS / EXECUTION PLAN CHANGE   ← usually #1 cause
   As a table grows or data distribution shifts, the query optimizer's
   cached plan (built for the OLD data shape) can become wrong — e.g. it
   still assumes a small table and does a scan that was fine at 10K rows
   but is catastrophic at 10M rows.
   Fix: check EXECUTION PLAN — compare cached plan (sys.dm_exec_query_plan
   / EXPLAIN ANALYZE) against what SHOULD run today. Update statistics
   (UPDATE STATISTICS / ANALYZE) or force a plan recompile.

2. MISSING OR FRAGMENTED INDEX
   An index existed and was fine at low cardinality, or was silently
   dropped, or has fragmented badly from heavy writes without maintenance.
   Fix: sys.dm_db_index_physical_stats (fragmentation %), rebuild/reorganize.

3. PARAMETER SNIFFING
   The FIRST call compiled a plan optimized for an unusual parameter value
   (e.g. a rare status with 5 rows), and that plan got cached and reused
   for every subsequent call with a common value (5 million rows) — fast
   for the first caller, catastrophic for everyone after.
   Fix: OPTION (RECOMPILE) for genuinely variable-cardinality queries, or
   OPTIMIZE FOR a representative value.

4. LOCK CONTENTION / BLOCKING
   A long-running transaction elsewhere is holding a lock this query
   needs. The query LOOKS slow but is actually just waiting.
   Fix: sys.dm_exec_requests + blocking_session_id chain.

5. DATA GROWTH CROSSED A THRESHOLD
   The table simply outgrew an approach that was fine at a smaller size
   (e.g. a full scan that was "fast enough" at 100K rows is not at 50M).</div>
          </div>
          <div class="ans-block"><div class="ans-label">The fix, once diagnosed</div>
            <p>Almost always one of: add/rebuild the right index, update statistics, add <code>OPTION (RECOMPILE)</code> or a plan guide for parameter-sniffing cases, or — if it's genuine data growth — redesign the query (pagination, a covering index, or pre-aggregation) rather than hoping indexing alone fixes an algorithmic problem.</p>
          </div>
          <div class="tip-box">✅ Interview line: "The fact that it changed, not the fact that it's slow, is the key clue — I'd check the execution plan first, because a stale plan after data growth or a parameter-sniffing bad plan explains 'fast then suddenly slow' far more often than a genuine query design flaw."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q10</div>
      <div class="qa-body">
        <div class="qa-question">How do you reduce AI cost?</div>
        <div class="qa-answer">
          <div class="code-box">SIX LEVERS, ROUGHLY BY IMPACT

1. MODEL ROUTING       cheap model for routine traffic, escalate only
                       hard cases to the expensive one — usually the
                       single biggest saving
2. CONTEXT DISCIPLINE  retrieve 5-6 precise chunks, not 20+; summarize
                       old conversation turns instead of resending them
3. CACHING             exact + semantic cache (see Q2) — avoids the
                       model call entirely on repeated/similar questions
4. OUTPUT LIMITS       cap max tokens; instruct brevity explicitly —
                       output usually costs more per token than input
5. BATCH THE OFFLINE   move non-interactive work (nightly summarisation,
   WORKLOAD             bulk classification) to the batch tier discount
6. SKIP THE MODEL       a deterministic rule, regex, or DB lookup for
   WHERE POSSIBLE       anything that doesn't need language understanding
                       — 100% saving on that path, and often faster too</div>
          <div class="tip-box">✅ The lever people forget: #6. Not every request needs an LLM call — a classifier, a lookup table, or a cached template answer is faster, cheaper, and fully unit-testable. Reserve the model for what genuinely requires reasoning over language.</div>
          <div class="ans-block"><div class="ans-label">Measure the right thing</div>
            <p>Track <strong>cost per completed task</strong> and <strong>tokens per request</strong>, not just total monthly spend — a prompt or retrieval change that quietly adds tokens per call is invisible on a monthly total until the invoice arrives, but obvious immediately on a per-request chart.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q11</div>
      <div class="qa-body">
        <div class="qa-question">How do you justify AI cost to the customer, and how do you make them pay — especially when a competitor outside offers better AI and models?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Reframe the conversation: from "cost of AI" to "cost per outcome, versus the alternative"</div>
            <p>Nobody pays for tokens. They pay for a problem being solved. "₹4 per triaged support ticket, resolved in 8 seconds, versus 12 minutes of an agent's time" is a business decision a customer can evaluate. "Our LLM costs X per month" is not — it invites exactly the "a competitor is cheaper" objection, because it's comparing the wrong thing.</p>
          </div>
          <div class="code-box">JUSTIFY WITH:
  • Cost per completed task vs the manual/legacy baseline (time saved,
    error reduction, coverage of work that previously went undone)
  • SLA and reliability the customer is actually buying — grounding,
    audit trail, data residency, security posture, support — not
    "access to a model", which is genuinely commoditised
  • Business outcome metrics: faster resolution, higher CSAT, fewer
    escalations — tie the AI spend line to a revenue or cost line
    the customer already tracks

WHEN A COMPETITOR CLAIMS "BETTER AI / MODELS":
  • The model itself IS increasingly a commodity — Azure OpenAI, most
    frontier providers converge on similar raw capability. Compete on
    what's NOT commoditised: how well it's grounded in THEIR data,
    integration depth, security/compliance posture, and reliability
    under their actual load — not on which logo is behind the API.
  • Offer a bake-off on THEIR real data and real questions, not a
    marketing demo — this is usually where integration depth wins,
    because a well-grounded mid-tier model beats a poorly-grounded
    frontier model on their own domain questions almost every time.
  • If they genuinely need frontier-model capability for a specific
    hard task, ROUTE to it for just that slice (see Q10) — don't
    lose the whole deal defending a position that isn't true for
    100% of their traffic.</div>
          </div>
          <div class="tip-box">✅ Closing line: "I don't defend against 'a competitor has a better model' by arguing the model — because on raw capability, that argument is genuinely losable and increasingly irrelevant. I move the conversation to cost per outcome and how well the system is grounded in their own data, because that's where the actual differentiation and the actual value sits, and it's defensible with evidence rather than a marketing claim."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q12</div>
      <div class="qa-body">
        <div class="qa-question">How do you use sync and async threads to make a non-blocking UI?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">The core rule: async releases the thread while waiting; sync holds it hostage</div>
            <div class="code-box">SYNCHRONOUS call on the UI thread
  UI thread BLOCKS until the call returns → the whole UI freezes,
  no redraw, no input handling, the app looks hung.

ASYNCHRONOUS call (async/await)
  The UI thread is RELEASED back to the message loop while waiting.
  UI stays responsive — animations run, buttons respond, scrolling works.
  When the awaited operation completes, execution resumes on the
  captured SynchronizationContext (back on the UI thread automatically).</div>
          </div>
          <div class="code-box">// ❌ Blocks the UI thread — window freezes for the duration of the call
private void OnSearchClick(object sender, RoutedEventArgs e)
{
    var results = _api.SearchAsync(query).Result;   // .Result = sync-over-async
    ResultsList.ItemsSource = results;               // never reached until unfrozen
}

// ✅ Non-blocking — UI thread is free to keep processing input
private async void OnSearchClick(object sender, RoutedEventArgs e)
{
    SearchButton.IsEnabled = false;
    LoadingSpinner.Visibility = Visibility.Visible;

    try
    {
        var results = await _api.SearchAsync(query, _cts.Token);
        ResultsList.ItemsSource = results;      // back on the UI thread automatically
    }
    catch (OperationCanceledException)
    {
        // user navigated away / typed again before this finished — ignore
    }
    finally
    {
        SearchButton.IsEnabled = true;
        LoadingSpinner.Visibility = Visibility.Collapsed;
    }
}</div>
          <div class="ans-block"><div class="ans-label">Making it feel instant, not just non-frozen</div>
            <ul>
              <li><strong>Debounce + cancel</strong> — for search-as-you-type, cancel the previous in-flight call when a new keystroke arrives (a fresh <code>CancellationTokenSource</code> per keystroke), so the UI never renders a stale, out-of-order response.</li>
              <li><strong>Optimistic UI</strong> — update the UI immediately assuming success (e.g. a "like" button), and roll back only if the async call actually fails.</li>
              <li><strong>Progress feedback</strong>, not just a spinner — for anything over ~1 second, show what's happening so the wait doesn't feel broken.</li>
              <li><strong>CPU-bound work still needs <code>Task.Run</code></strong> — async/await alone doesn't help a genuinely CPU-heavy operation; that needs to move off the UI thread onto a background thread explicitly, then marshal the result back.</li>
            </ul>
          </div>
          <div class="warn-box">⚠️ The most common mistake in real codebases: marking a method <code>async</code> but then calling <code>.Result</code> or <code>.Wait()</code> somewhere inside it "just to get a value out" — this reintroduces the exact blocking the async signature was supposed to remove, and on UI threads specifically can deadlock (the awaited task tries to resume on the UI thread's SynchronizationContext, which is itself blocked waiting on <code>.Result</code>).</div>
          <div class="tip-box">✅ Closing line: "async/await doesn't make the work faster — it makes the WAIT non-blocking, by releasing the UI thread back to the message loop instead of holding it hostage. The discipline that matters is never mixing sync and async in the same call chain, because one blocking call anywhere in that chain reintroduces the freeze the rest of the chain was designed to avoid."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q13</div>
      <div class="qa-body">
        <div class="qa-question">How do you move from one model to another model in an LLM/RAG pipeline?</div>
        <div class="qa-answer">

          <div class="warn-box">⚠️ First split the question — "the model" in a RAG pipeline is actually TWO different models with completely different migration risk. Answering this as one generic "swap the model" question is the mistake that loses points here.</div>

          <div class="flow-box">
            <div class="flow-step">GENERATION MODEL<br><span style="font-weight:400;font-size:11px;">answers the question</span></div>
            <div class="flow-arrow">vs</div>
            <div class="flow-step blue">EMBEDDING MODEL<br><span style="font-weight:400;font-size:11px;">indexes the documents</span></div>
          </div>

          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.5fr 1.5fr;"><div>Aspect</div><div>Generation model swap</div><div>Embedding model swap</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;"><div class="dt-name">What breaks if ignored</div><div>Output tone/format/refusal behaviour shifts</div><div class="dt-no">EVERY existing vector becomes meaningless — silent, not an error</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;"><div class="dt-name">Re-index needed?</div><div class="dt-yes">No</div><div class="dt-no">Yes — every document, full re-embed</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;"><div class="dt-name">Cost of the migration</div><div>Prompt re-tuning + evaluation</div><div>Compute for millions of embed calls + storage for a parallel index</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;"><div class="dt-name">Can it be gradual (canary %)?</div><div class="dt-yes">Yes — route a % of traffic to the new model</div><div class="dt-no">No — a query embedded by model A can't be meaningfully compared to vectors from model B</div></div>
          </div>

          <div class="ans-block"><div class="ans-label">Why embedding model swaps are the dangerous one — the silent failure mode</div>
            <div class="code-box">Query embedded with model A   →  vector space A
Documents embedded with model B →  vector space B

Cosine similarity between a vector from space A and a vector from
space B is MEANINGLESS — there's no error, no exception. Retrieval
just quietly returns near-random results, and the system looks like
it's "getting worse at answering" with no obvious cause. This is the
single most common production RAG bug when a model upgrade ships
without a full re-index.</div>
          </div>

          <div class="ans-block"><div class="ans-label">The safe migration pattern — for EITHER model, same shape</div>
            <div class="code-box">1. BUILD THE NEW VERSION IN PARALLEL — never in place
   index-v1 (LIVE, model A)  ◄── alias "kb-current" ── app reads this
   index-v2 (BUILDING, model B)   — built from source of truth,
                                     app keeps reading v1 throughout

2. RUN THE GOLDEN EVALUATION SET AGAINST BOTH
   50-200 real questions with accepted answers / expected sources.
   Score: recall@5, faithfulness, citation accuracy, latency, cost/request.

3. COMPARE — v2 must MEET OR BEAT v1 on every metric that matters
   before it becomes a candidate. "Feels better" is not a gate.

4. CUTOVER = REPOINT THE ALIAS, NOT A CODE DEPLOY
   kb-current: v1 → v2         — instant, and instantly reversible
   Keep v1 live and queryable for a rollback window (days, not hours).

5. MONITOR POST-CUTOVER
   Refusal rate, thumbs-down rate, retrieval empty-rate — a regression
   here is the signal to roll the alias back immediately.</div>
          </div>

          <div class="ans-block"><div class="ans-label">In code — parallel embedding pipeline with provenance stamped on every vector</div>
          <div class="code-box">public class ReindexJob
{
    private readonly IEmbeddingClient _newEmbeddings;   // model B client
    private readonly IVectorStore _vectorStore;
    private readonly IDocumentSource _sourceOfTruth;

    public async Task RunAsync(string targetIndexName, CancellationToken ct)
    {
        await foreach (var doc in _sourceOfTruth.StreamAllAsync(ct))
        {
            var chunks  = _chunker.Chunk(doc.Text, maxTokens: 500, overlapTokens: 60);
            var vectors = await _newEmbeddings.EmbedBatchAsync(chunks.Select(c => c.Text), ct);

            var records = chunks.Zip(vectors, (chunk, vector) => new IndexRecord
            {
                Id            = $"{doc.SourceId}-{chunk.Index}",
                Content       = chunk.Text,
                ContentVector = vector,
                // STAMP provenance — this is what prevents the "which space
                // does this vector belong to" bug from ever recurring
                EmbedModel    = "text-embedding-3-large",
                EmbedVersion  = "2025-11",
                IndexName     = targetIndexName,
                Tenant        = doc.Tenant,
                AllowedGroups = doc.AllowedGroups
            });

            await _vectorStore.UpsertAsync(targetIndexName, records, ct);
        }
    }
}

// Cutover — an alias repoint, not a deployment
public class SearchAliasManager
{
    public async Task PromoteAsync(string newIndexName, CancellationToken ct)
    {
        var evalResult = await _evaluator.RunGoldenSetAsync(newIndexName, ct);
        if (!evalResult.MeetsOrBeats(_evaluator.Baseline))
            throw new InvalidOperationException("New index failed evaluation gate — not promoting.");

        await _searchClient.UpdateAliasAsync("kb-current", newIndexName, ct);   // instant cutover
        _logger.LogInformation("Promoted {Index} to kb-current. Old index kept live for rollback.", newIndexName);
    }

    public Task RollbackAsync(string previousIndexName, CancellationToken ct)
        => _searchClient.UpdateAliasAsync("kb-current", previousIndexName, ct);  // instant, no redeploy
}</div></div>

          <div class="ans-block"><div class="ans-label">Generation model swap — the lighter-weight half</div>
            <div class="code-box">Retrieval/index stays untouched. What actually needs revalidation:
  • System prompt behaviour — different models follow instructions,
    refuse, and format output differently even with an identical prompt
  • Structured-output / function-calling syntax — schemas and tool-call
    formats are NOT always compatible across model families
  • Token-per-response and latency — affects cost and UX, re-check budgets
  • Run the SAME golden evaluation set — faithfulness and relevance
    scores, not just "the demo looks fine"

Can be done as a GRADUAL canary: route 5% of traffic to the new model,
compare live metrics against the control group, ramp up only on
evidence — something an embedding-model swap cannot safely do.</div>
          </div>

          <div class="tip-box">✅ Closing line: "I treat these as two different migrations wearing the same name. Swapping the generation model is a prompt-and-evaluation exercise I can canary gradually. Swapping the embedding model requires a full parallel re-index, because mixing vector spaces fails silently with no exception — just quietly wrong retrieval. Either way, cutover is an alias repoint gated on a golden evaluation set, never an in-place change, so a regression is a one-line rollback, not an incident."</div>
        </div>
      </div>
    </div>

  </div>
`;
