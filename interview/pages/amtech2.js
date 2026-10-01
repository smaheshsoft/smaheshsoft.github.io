window.Pages = window.Pages || {};
window.Pages['amtech2'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>AM Tech Software – Round 2</span></div>
    <h1>🧵 AM Tech Software Interview — Round 2</h1>
    <p>Multi-Agent Memory Sharing · AI Search Cost Optimization · Deterministic RAG · Hallucination Mitigation · Legacy Migration · RAG System Design · Fully Automated Agent SDLC · DI Lifetime Bug · Async/TaskCompletionSource Trace</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">How do you pass content between LLM agents for cross-functional agents? How is memory shared between agents?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">The design problem</div>
            <p>Each agent has its own context window and its own job. "Memory sharing" isn't one mechanism — it's three different problems with three different answers: what THIS agent needs to remember across its own turns, what one agent hands to the NEXT agent, and what the whole multi-agent system needs to recall from last week.</p>
          </div>
          <div class="flow-box">
            <div class="flow-step">Short-term<br><span style="font-weight:400;font-size:11px;">this conversation</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Handoff<br><span style="font-weight:400;font-size:11px;">agent A → agent B</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-step green">Long-term<br><span style="font-weight:400;font-size:11px;">across sessions, shared</span></div>
          </div>
          <div class="code-box">SHORT-TERM MEMORY (per-agent, per-conversation)
  Lives in the agent's own context window / conversation transcript.
  Summarized and windowed as it grows (see Q2 of the AI pages for the
  same pattern: rolling summary + last N turns, not the full history).

HANDOFF BETWEEN AGENTS (the actual "pass content" part)
  Agents don't share a brain — they pass a STRUCTURED artifact, not raw
  chat history. A "Research Agent" doesn't hand its entire transcript to
  a "Writer Agent"; it hands a structured result:

    public record AgentHandoff(
        string FromAgent,
        string TaskId,
        string Summary,              // condensed, not the full transcript
        IReadOnlyList<Citation> Sources,
        IDictionary<string, object> StructuredFindings,
        string? NextAgentInstruction);

  This keeps the next agent's context window small and FOCUSED — it
  gets the conclusion and evidence, not the reasoning noise that
  produced it.

LONG-TERM / SHARED MEMORY (across agents, across sessions)
  A shared store BOTH agents can read/write — typically a vector store
  keyed by task/session id, or a structured "working memory" table.
  This is where genuine cross-agent state lives: facts learned,
  decisions made, open questions — not the raw conversation.</div>
          <div class="ans-block"><div class="ans-label">In code — shared memory store, not shared context window</div>
            <div class="code-box">public interface IAgentMemoryStore
{
    Task WriteAsync(string sessionId, MemoryEntry entry, CancellationToken ct);
    Task&lt;IReadOnlyList&lt;MemoryEntry&gt;&gt; RecallAsync(string sessionId, string query, int topK, CancellationToken ct);
}

// Research Agent writes a finding
await _memory.WriteAsync(sessionId, new MemoryEntry(
    Author: "ResearchAgent",
    Content: "Station STN-4471 has 3 prior LATCH_FAIL incidents in 90 days.",
    Tags: new[] { "incident-pattern", "STN-4471" }), ct);

// Planning Agent, LATER and SEPARATELY, recalls relevant memory —
// not by replaying Research Agent's transcript, but by QUERYING
// the shared store for what's relevant to ITS current task
var relevant = await _memory.RecallAsync(sessionId, "station fault history", topK: 5, ct);</div>
          </div>
          <div class="warn-box">⚠️ The mistake that fails this question: concatenating every agent's full transcript into one giant shared context. It blows the context window, dilutes relevance (the "lost in the middle" problem), and multiplies token cost across every agent. Pass CONCLUSIONS and structured findings, not raw reasoning traces.</div>
          <div class="tip-box">✅ Closing line: "I treat inter-agent communication as an API contract, not a chat merge — each agent emits a structured handoff object, and shared long-term memory lives in an external store both agents query, keyed by session or task id. That keeps each agent's context window small and lets agents be added or swapped without redesigning how memory flows."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">How do you optimize search and reduce AI cost?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Two separate levers — search quality and spend are related but not the same</div>
            <div class="code-box">SEARCH OPTIMIZATION (better retrieval = fewer, cheaper LLM calls)
  Hybrid search (vector + keyword) — fewer wasted retrievals that force
    a retry or a "I couldn't find that" refusal, which wastes the whole
    call that preceded it
  Re-ranking — send the LLM 5 precise chunks instead of 20 mediocre ones
    → directly cuts prompt tokens on EVERY call
  Metadata pre-filtering (tenant, doc type, date) BEFORE vector search,
    not after — smaller candidate set, faster, cheaper at the index layer
  Query caching at the search layer — identical/near-identical queries
    skip re-embedding AND re-searching, not just skip the LLM call

AI COST REDUCTION (same six-lever framework as Q10, Round 1)
  Model routing · context discipline · caching · output limits ·
  batch offline work · skip the model where a lookup/rule suffices</div>
          </div>
          <div class="ans-block"><div class="ans-label">The connection between them — this is the insight worth stating explicitly</div>
            <p>Better search IS a cost lever, not just a quality lever — every chunk you don't need to send is tokens you don't pay for. Teams that treat "improve RAG accuracy" and "reduce AI cost" as separate initiatives miss that tightening retrieval is usually the single highest-leverage cost optimization available, because it reduces token volume on literally every single request.</p>
          </div>
          <div class="tip-box">✅ Interview line: "The fastest way I've cut AI cost in practice wasn't model routing — it was fixing retrieval precision, because a tighter, more relevant context window is both cheaper AND more accurate at the same time. Those two goals are rarely in tension; poor retrieval is lose-lose."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">How do you get a closed (deterministic/consistent) result using RAG?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Reframe: RAG + LLM is inherently probabilistic — "closed result" means engineering AROUND that, not eliminating it</div>
            <p>You can't make the model itself deterministic in the way a SQL query is — but you CAN constrain the system so the same question reliably produces the same class of answer.</p>
          </div>
          <div class="code-box">LEVERS THAT PRODUCE A "CLOSED" / CONSISTENT RESULT

1. TEMPERATURE = 0 (or near it)
   Removes most sampling randomness. Doesn't guarantee byte-identical
   output every time (provider-side batching/hardware can still cause
   tiny variance) but removes creative drift.

2. STRUCTURED OUTPUT / JSON SCHEMA
   Force the shape of the answer, not just hope for it:
     ResponseFormat = ChatResponseFormat.CreateJsonSchemaFormat(...)
   A fixed schema means "closed" in the sense that matters for
   downstream code — the STRUCTURE never varies even if wording does.

3. GROUNDED, NARROW RETRIEVAL
   If the SAME 3-5 chunks are retrieved every time for the same
   question (stable index, deterministic ranking), the model has the
   same evidence every time — this is what actually stabilizes the
   ANSWER CONTENT, more than temperature does.

4. EXPLICIT REFUSAL RULE
   "If the context doesn't contain the answer, reply exactly: ..."
   — converts an open-ended guess into one of a closed set of outcomes:
   a correct grounded answer, OR a fixed refusal string. No third option.

5. VALIDATE + RETRY, DON'T TRUST THE FIRST OUTPUT
   Validate against the schema / business rules in code; on failure,
   retry once with a corrective instruction, then fall back to a
   deterministic default or human handoff — never surface a malformed
   or ungrounded answer.

6. CACHE THE CLOSED ANSWER
   Once a question has a verified, closed answer, cache it (see Round 1
   Q2) — the SAME question then returns the EXACT same cached result
   every time, which is the only way to get true determinism.</div>
          </div>
          <div class="tip-box">✅ Closing line: "I can't make the model deterministic, but I can make the SYSTEM closed — narrow the possible outcomes to 'a grounded answer from a fixed small context' or 'an explicit refusal,' enforce the shape with a JSON schema, and cache verified answers so repeat questions are byte-identical. That's what 'closed result' means in a system built on a probabilistic component."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">How do you avoid hallucinations in an LLM?</div>
        <div class="qa-answer">
          <div class="code-box">LAYERED DEFENCE — no single fix is sufficient on its own

1. GROUND EVERY ANSWER (RAG)
   The model answers from RETRIEVED context, not from training memory.
   This alone eliminates most factual hallucination on domain questions.

2. EXPLICIT "I DON'T KNOW" INSTRUCTION
   "Answer ONLY from the context below. If insufficient, reply exactly:
   'I could not find this in the available documents.'"
   Models hallucinate most when they feel obligated to produce AN answer
   — give them an explicit, acceptable alternative to guessing.

3. CITATIONS REQUIRED
   Force the model to cite the source chunk for every claim. This does
   double duty: it nudges the model to actually USE the context (rather
   than ignore it and answer from memory), and it lets a human verify
   the claim in one click.

4. LOW TEMPERATURE
   Reduces confident improvisation, especially on edge cases the
   retrieved context only partially covers.

5. STRUCTURED OUTPUT WITH VALIDATION
   A hallucinated enum value or malformed id fails schema validation
   in code BEFORE it reaches a user — catch it mechanically, not by
   hoping the model behaves.

6. SMALLER, MORE PRECISE CONTEXT (not more context)
   Counter-intuitively, dumping MORE retrieved chunks "to be safe"
   increases hallucination risk — irrelevant chunks give the model
   more raw material to blend into a plausible-sounding but wrong answer.

7. EVALUATION WITH A FAITHFULNESS METRIC
   Score "is the answer actually supported by the retrieved context"
   on a golden set, in CI — hallucination regressions are otherwise
   completely silent (see the evaluation theme across the AI pages).</div>
          <div class="warn-box">⚠️ A hallucination caused by a RETRIEVAL gap looks identical to one caused by the model ignoring good context — always check which one it is before "fixing" the wrong layer. If the right chunk wasn't retrieved, tightening the prompt won't help; fix retrieval.</div>
          <div class="tip-box">✅ Closing line: "Hallucination isn't a single bug to patch — it's the default behaviour of a model asked to answer something it doesn't actually know, so the fix is removing every incentive and opportunity for it to guess: ground it, give it permission to refuse, make it cite sources, and validate the output mechanically rather than trusting it."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">How do you approach migrating an old legacy application to the latest technology?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Don't pitch a rewrite — use the strangler fig pattern (same principle as the monolith→microservices answer in Round 1)</div>
            <div class="code-box">PHASE 1 — ASSESS, DON'T ASSUME
  Inventory what's actually there: dependencies, data flows, who owns
  what, which parts are high-risk/high-change vs stable-and-untouched.
  A full rewrite risk-profile is almost always worse than incremental —
  big-bang rewrites have a well-documented high failure rate industry-wide.

PHASE 2 — PUT A FACADE / ANTI-CORRUPTION LAYER IN FRONT
  Route traffic through a new API gateway that proxies to the legacy
  system UNCHANGED at first. This gives you a seam to redirect traffic
  from later, without touching the legacy code yet.

PHASE 3 — STRANGLE ONE CAPABILITY AT A TIME
  Pick the highest-pain / most-frequently-changed module FIRST (same
  data-driven selection as microservices extraction). Build it fresh
  on the new stack, behind the facade, running in PARALLEL.
  Shadow-test: route a copy of real traffic to both old and new,
  compare outputs, before cutting real traffic over.

PHASE 4 — CUT OVER, KEEP ROLLBACK
  Repoint the facade's routing for that one capability. Keep the legacy
  code path dormant but available for a rollback window.

PHASE 5 — REPEAT, RETIRE
  Once ALL capabilities are migrated and the facade routes 100% to new
  code, decommission the legacy system. Only now is it safe to delete.</div>
          </div>
          <div class="ans-block"><div class="ans-label">The parts people skip, that cause real incidents</div>
            <ul>
              <li><strong>Data migration is its own project</strong> — schema differences, in-flight transactions during cutover, and reconciliation jobs to prove old and new systems agree.</li>
              <li><strong>Feature parity audits</strong> — legacy systems accumulate undocumented business rules ("why does it do THAT for this one customer type") that only surface when they're missing in the new system.</li>
              <li><strong>Dual-write / dual-read period</strong> — during transition, both systems may need to stay in sync; decide the source of truth explicitly, don't let it be implicit.</li>
              <li><strong>Business buy-in on timeline</strong> — legacy migrations get deprioritized the moment a deadline slips without a visible milestone; ship cut-overs incrementally so there's always recent, demonstrable progress.</li>
            </ul>
          </div>
          <div class="tip-box">✅ Closing line: "I treat legacy migration exactly like the monolith-to-microservices problem — strangler fig, not big-bang. Put a facade in front, migrate the highest-pain capability first with shadow traffic to prove equivalence before cutover, and keep the old path alive as a rollback until the new one has earned trust in production."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">How is the RAG system designed?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Same end-to-end design as covered in the RAG topic page — summarized here</div>
            <div class="flow-box">
              <div class="flow-step">Docs</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Chunk + Embed</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Vector Store</div>
            </div>
            <div class="flow-box">
              <div class="flow-step">Query</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Hybrid Retrieve</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Re-rank</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step green">Grounded Answer + Citations</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">The five design decisions that actually distinguish a good RAG system from a demo</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1fr 1.8fr;"><div>Decision</div><div>What a production system gets right</div></div>
              <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">Chunking</div><div>Structural (by heading/section), not fixed-size — with a heading-path prefix so each chunk is self-describing</div></div>
              <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">Retrieval</div><div>Hybrid (vector + keyword) + re-ranking — vector alone misses exact identifiers</div></div>
              <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">Security</div><div>Identity-scoped filter applied BEFORE ranking, derived from the caller's token server-side — never from the request body</div></div>
              <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">Grounding</div><div>System prompt instructs answer-only-from-context with an explicit refusal string and required citations</div></div>
              <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">Evaluation</div><div>A golden set of 50-200 real questions scored on recall, faithfulness and citation accuracy — in CI, on every change</div></div>
            </div>
          </div>
          <div class="tip-box">✅ For the full depth on each of these — chunking strategies, re-ranking, security filtering, and the evaluation loop — see the RAG topic page under Architecture / AI & LLM Engineering; this answer is the one-breath summary version for a verbal interview.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q7</div>
      <div class="qa-body">
        <div class="qa-question">Design a fully automated agent workflow covering the full lifecycle — Development, Code Review, Build, Approval, Release.</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Map each SDLC stage to an agent with a narrow, auditable job — not one agent doing everything</div>
            <div class="flow-box">
              <div class="flow-step">Dev Agent<br><span style="font-weight:400;font-size:11px;">writes code</span></div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Review Agent<br><span style="font-weight:400;font-size:11px;">static + AI review</span></div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Build Agent<br><span style="font-weight:400;font-size:11px;">CI pipeline</span></div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Approval Gate<br><span style="font-weight:400;font-size:11px;">human or policy</span></div>
              <div class="flow-arrow">→</div>
              <div class="flow-step green">Release Agent<br><span style="font-weight:400;font-size:11px;">deploy + monitor</span></div>
            </div>
          </div>
          <div class="code-box">STAGE-BY-STAGE

1. DEVELOPMENT AGENT
   Given a ticket/spec, generates a PR on a feature branch. Scoped to
   ONE repo, ONE ticket — never pushes directly to main.

2. CODE REVIEW AGENT
   Runs on every PR: static analysis (lint, security scan, SAST) +
   an LLM review pass checking against the team's architecture/style
   guide. Posts inline PR comments. Does NOT auto-approve — flags for
   human review on anything touching auth, data access, or payments.

3. BUILD AGENT (standard CI, not "AI" — this stage should stay
   deterministic)
   Compiles, runs unit + integration tests, produces a signed artifact.
   A failed build HARD STOPS the pipeline — no agent can override this.

4. APPROVAL GATE
   Policy-driven: low-risk changes (docs, config under a size threshold)
   can auto-approve on green CI + clean review. Anything touching
   security, schema, or production config requires an explicit human
   approval — this is the ONE place autonomy is deliberately capped
   (same autonomy-level principle as the Agentic AI topic page).

5. RELEASE AGENT
   Deploys via the existing CD pipeline (blue-green/canary), watches
   health metrics post-deploy, and AUTOMATICALLY ROLLS BACK on an
   error-rate or latency regression — this is where automation is
   SAFEST to grant full autonomy, because rollback is reversible.</div>
          <div class="ans-block"><div class="ans-label">What makes this "fully automated" without being reckless</div>
            <ul>
              <li><strong>Full audit trail</strong> — every agent action logged: which agent, what change, what evidence, what decision — because "the agent did it" is never an acceptable incident answer.</li>
              <li><strong>Hard gates stay hard</strong> — build failure and security-sensitive approval are NEVER soft-overridable by an agent, no matter how confident it is.</li>
              <li><strong>Autonomy matches reversibility</strong> — release gets full automation specifically because it has automatic rollback; approval of security-sensitive changes stays human because it doesn't.</li>
              <li><strong>Agents are tool-calling, not open-ended</strong> — each agent has a narrow, explicit toolset (see the MCP/Agentic AI topic pages) scoped to exactly its stage, not broad repo/infra access.</li>
            </ul>
          </div>
          <div class="tip-box">✅ Closing line: "I'd automate aggressively where mistakes are cheap and reversible — builds, low-risk approvals, canary release with auto-rollback — and keep a human explicitly in the loop wherever a mistake is expensive or hard to undo, like approving a schema change or a security-sensitive diff. 'Fully automated' doesn't mean 'no humans' — it means no human has to do routine, low-risk work, so the humans who ARE in the loop are only there for decisions that actually need judgment."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q8</div>
      <div class="qa-body">
        <div class="qa-question">Identify the issues in the following code</div>
        <div class="qa-answer">
          <div class="code-box">builder.Services.AddDbContext&lt;AppDbContext&gt;();
builder.Services.AddSingleton&lt;OrderService&gt;();

public sealed class OrderService
{
    private readonly AppDbContext _db;
    public OrderService(AppDbContext db)
    {
        _db = db;
    }
}</div>
          <div class="warn-box">⚠️ <strong>Captive dependency bug</strong> — a Singleton depending on a Scoped service. <code>AddDbContext</code> registers <code>AppDbContext</code> as <strong>Scoped</strong> by default (one instance per HTTP request). <code>OrderService</code> is registered as <strong>Singleton</strong> (one instance for the app's entire lifetime). The container will inject the DbContext into OrderService ONCE, at first resolution, and that single instance gets "captured" and reused for every request for the rest of the app's life.</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:0.6fr 1.9fr;"><div>Severity</div><div>Consequence</div></div>
            <div class="dt-row" style="grid-template-columns:0.6fr 1.9fr;"><div class="dt-name" style="color:#c0392b;">Critical</div><div>Startup validation (if <code>ValidateScopes</code>/<code>ValidateOnBuild</code> is enabled, which it is by default in Development) throws <code>InvalidOperationException: Cannot consume scoped service 'AppDbContext' from singleton 'OrderService'</code> — app won't even start</div></div>
            <div class="dt-row" style="grid-template-columns:0.6fr 1.9fr;"><div class="dt-name" style="color:#c0392b;">Critical</div><div>If validation is OFF (common misconfiguration in Production), it silently succeeds at startup and fails at runtime instead: <code>DbContext</code> is NOT thread-safe — concurrent requests sharing the one captured instance throw <code>"A second operation was started on this context before a previous operation has completed"</code></div></div>
            <div class="dt-row" style="grid-template-columns:0.6fr 1.9fr;"><div class="dt-name">High</div><div>Even without concurrency errors, the single DbContext's change tracker accumulates entities across EVERY request for the app's lifetime — unbounded memory growth and stale/incorrect query results from cached tracked entities</div></div>
            <div class="dt-row" style="grid-template-columns:0.6fr 1.9fr;"><div class="dt-name">High</div><div>The underlying DB connection is held open for the app's entire lifetime rather than returned to the pool per request — defeats connection pooling</div></div>
          </div>
          <div class="ans-block"><div class="ans-label">Fix — option 1: make OrderService Scoped (the usual, correct fix)</div>
            <div class="code-box">builder.Services.AddDbContext&lt;AppDbContext&gt;();   // stays Scoped
builder.Services.AddScoped&lt;OrderService&gt;();       // match the lifetime</div>
          </div>
          <div class="ans-block"><div class="ans-label">Fix — option 2: if OrderService genuinely MUST be Singleton, use a factory</div>
            <div class="code-box">builder.Services.AddDbContextFactory&lt;AppDbContext&gt;();
builder.Services.AddSingleton&lt;OrderService&gt;();

public sealed class OrderService
{
    private readonly IDbContextFactory&lt;AppDbContext&gt; _dbFactory;
    public OrderService(IDbContextFactory&lt;AppDbContext&gt; dbFactory) => _dbFactory = dbFactory;

    public async Task&lt;Order&gt; GetOrderAsync(int id, CancellationToken ct)
    {
        await using var db = await _dbFactory.CreateDbContextAsync(ct);   // fresh, short-lived
        return await db.Orders.FindAsync(new object[] { id }, ct);
    }
}</div>
          </div>
          <div class="tip-box">✅ Lead with "this is a captive dependency — Singleton holding a Scoped DbContext" by name; that's the exact term interviewers are listening for. Then explain the thread-safety and memory consequences, not just "it won't compile" (it compiles fine — the failure is at container-validation or runtime, which is the subtler and more important part of the answer).</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q9</div>
      <div class="qa-body">
        <div class="qa-question">What will be the output of the following code?</div>
        <div class="qa-answer">
          <div class="code-box">static async Task RunAsync(Task gate)
{
    Console.Write("A");
    await gate;
    Console.Write("B");
}

var gate = new TaskCompletionSource&lt;bool&gt;(
    TaskCreationOptions.RunContinuationsAsynchronously);

Console.Write("1");
var task = RunAsync(gate.Task);
Console.Write("2");

gate.SetResult(true);
await task;

Console.Write("3");</div>
          <div class="ans-block"><div class="ans-label">Output: <code>1A2B3</code></div>
            <div class="code-box">TRACE, LINE BY LINE

Console.Write("1")              → prints "1"

var task = RunAsync(gate.Task)  → calling an async method runs it
                                   SYNCHRONOUSLY up to its first await.
                                   Prints "A" immediately, then hits
                                   'await gate;' — gate.Task is NOT YET
                                   completed, so RunAsync SUSPENDS here
                                   and returns a Task back to the caller
                                   (assigned to 'task'). Control returns
                                   to the calling code.

Console.Write("2")              → prints "2"  (RunAsync is still paused)

gate.SetResult(true)            → completes the TCS's task. Because the
                                   TCS was created with
                                   RunContinuationsAsynchronously, the
                                   continuation (the rest of RunAsync,
                                   i.e. printing "B") is QUEUED to the
                                   thread pool rather than run INLINE
                                   on this thread during SetResult.
                                   SetResult returns immediately.

await task                      → awaits RunAsync's task. The queued
                                   continuation runs (on a pool thread),
                                   printing "B", and RunAsync completes.
                                   await task then returns.

Console.Write("3")              → prints "3"

RESULT: 1 A 2 B 3  →  "1A2B3"</div>
          </div>
          <div class="ans-block"><div class="ans-label">The real test: do you know WHY <code>RunContinuationsAsynchronously</code> is there?</div>
            <p>The text output is <code>1A2B3</code> whether or not that flag is set — in both cases "B" prints before "3" because <code>await task</code> waits for it either way. The flag doesn't change WHAT gets printed, it changes WHERE the continuation (<code>"B"</code> plus anything after the <code>await gate</code> in a real method) executes:</p>
            <div class="code-box">WITHOUT RunContinuationsAsynchronously (default behaviour)
  gate.SetResult(true) runs the continuation INLINE, SYNCHRONOUSLY,
  on the thread that calls SetResult — "B" could print DURING the
  SetResult(true) call itself, before that line even returns.
  DANGER: if SetResult is called while holding a lock, or from a UI
  thread, the continuation (which might also need that lock, or try
  to marshal back to the UI thread) can DEADLOCK or re-enter
  unexpectedly — a notoriously hard bug to reproduce.

WITH RunContinuationsAsynchronously (this code)
  The continuation is scheduled onto the thread pool instead — SetResult
  returns immediately without running arbitrary downstream code inline.
  Safer default for library/infrastructure code where you don't control
  what the continuation does or which thread calls SetResult.</div>
          </div>
          <div class="tip-box">✅ Strong answer: "The output is 1A2B3 — async methods run synchronously up to their first await, so 'A' prints before control returns to the caller, and 'B' only prints once gate.SetResult runs, which happens before we reach '3' because we await the task first. The RunContinuationsAsynchronously flag doesn't change this output, but it matters a lot in real code — without it, SetResult would run the continuation inline on the calling thread, which is a classic source of deadlocks if that thread is holding a lock or is a UI thread. I use that flag by default on any TaskCompletionSource I don't fully control the completion context for."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q10</div>
      <div class="qa-body">
        <div class="qa-question">How do you build a login module with a limit on the number of concurrent logins per client, and enforce single-login-at-a-time? How do you design this for concurrency?</div>
        <div class="qa-answer">

          <div class="ans-block"><div class="ans-label">The design problem, stated precisely</div>
            <p>Two related but distinct requirements: (1) cap the number of concurrently active sessions per client/tenant at N, and (2) a stricter special case where N=1 — a new login must invalidate the previous one. The hard part isn't the business rule, it's making the CHECK-AND-ACT atomic under concurrent login attempts — classic race condition territory.</p>
          </div>

          <div class="flow-box">
            <div class="flow-step">Login Request</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Atomic Session Check + Register</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Evict Oldest / Reject</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step green">Issue Token</div>
          </div>

          <div class="ans-block"><div class="ans-label">Why this is a concurrency problem, not just a business rule</div>
            <div class="code-box">❌ THE NAIVE (BROKEN) APPROACH
  1. Count active sessions for user
  2. if (count &lt; maxAllowed) → create new session
  This has a TOCTOU (time-of-check-to-time-of-use) race: two login
  requests for the same user, arriving within milliseconds of each
  other, can BOTH read count=0 before either one writes — both get
  allowed in, and your "max 1 session" rule is silently violated
  under load. This is the exact same race-condition shape as the
  double-spend / overselling problems in e-commerce checkout.</div>
          </div>

          <div class="ans-block"><div class="ans-label">Design — session registry backed by an atomic store (Redis)</div>
            <div class="code-box">SESSION REGISTRY (Redis — chosen because it gives ATOMIC operations
across concurrent requests, and TTL for automatic expiry)

  Key:   session:active:{userId}          → SET of active session ids
  Key:   session:meta:{sessionId}         → {userId, device, ip, loginAt, lastSeenAt}
  Key:   session:token:{sessionId}        → refresh token hash, TTL-bound

WHY REDIS SPECIFICALLY: single-threaded command execution means a
SET-based membership check + add happens as ONE atomic step — no
other request can interleave between "check" and "act", which is
exactly what closes the race condition above.</div>
          </div>

          <div class="ans-block"><div class="ans-label">In code — atomic login with single-session enforcement (N=1)</div>
          <div class="code-box">public class SessionLoginService
{
    private readonly IDatabase _redis;
    private readonly int _maxConcurrentSessions;   // 1 for single-login-at-a-time

    public async Task&lt;LoginResult&gt; LoginAsync(string userId, string password, DeviceInfo device, CancellationToken ct)
    {
        if (!await _credentialStore.VerifyAsync(userId, password, ct))
            return LoginResult.InvalidCredentials();

        var newSessionId = Guid.NewGuid().ToString("N");
        var activeSessionsKey = $"session:active:{userId}";

        // ATOMIC via a Lua script — Redis guarantees the whole script runs
        // as ONE indivisible step, so no other login for this user can
        // interleave between reading current sessions and registering this one.
        var script = @"
            local activeKey = KEYS[1]
            local maxAllowed = tonumber(ARGV[1])
            local newSessionId = ARGV[2]
            local sessionTtl = tonumber(ARGV[3])

            local current = redis.call('SMEMBERS', activeKey)
            local evicted = {}

            if #current &gt;= maxAllowed then
                -- Evict the OLDEST session(s) to make room — for N=1 this
                -- evicts the single existing session (forces it to log out)
                for i = 1, (#current - maxAllowed + 1) do
                    redis.call('SREM', activeKey, current[i])
                    table.insert(evicted, current[i])
                end
            end

            redis.call('SADD', activeKey, newSessionId)
            redis.call('EXPIRE', activeKey, sessionTtl)
            return evicted";

        var evictedSessions = (RedisResult[])await _redis.ScriptEvaluateAsync(
            script,
            keys: new RedisKey[] { activeSessionsKey },
            values: new RedisValue[] { _maxConcurrentSessions, newSessionId, 86400 });

        // Persist metadata + tell the evicted session(s) they're dead
        await _sessionStore.CreateAsync(newSessionId, userId, device, ct);
        foreach (var evicted in evictedSessions)
            await _revocationList.RevokeAsync(evicted.ToString(), ct);   // see below

        var token = _tokenIssuer.IssueAccessToken(userId, newSessionId);
        return LoginResult.Success(token, evictedCount: evictedSessions.Length);
    }
}</div></div>

          <div class="ans-block"><div class="ans-label">Enforcing it on EVERY subsequent request, not just at login</div>
            <p>A stolen or cached token for an evicted session must stop working immediately — not just "fail to log in again." Every authenticated request needs to check the session is still the active one.</p>
            <div class="code-box">public class SessionValidationMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var sessionId = context.User.FindFirst("sid")?.Value;
        var userId    = context.User.FindFirst("sub")?.Value;

        if (sessionId is not null && userId is not null)
        {
            var isActive = await _redis.SetContainsAsync($"session:active:{userId}", sessionId);
            if (!isActive)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsJsonAsync(new { error = "session_revoked",
                    message = "This session was logged out because you signed in elsewhere." });
                return;
            }
        }
        await next(context);
    }
}</div>
          </div>

          <div class="ans-block"><div class="ans-label">Real-time notification to the evicted device (what makes this feel like a product, not just a backend rule)</div>
            <div class="code-box">// Push a "you've been logged out" event over SignalR/WebSocket to the
// evicted session BEFORE it hits the revoked-session wall on its next
// API call — far better UX than a silent 401 on the next click.
await _notificationHub.Clients.Group($"session:{evictedSessionId}")
    .SendAsync("ForceLogout", new { reason = "NewLoginElsewhere" });</div>
          </div>

          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.9fr;"><div>Design choice</div><div>Why</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">Redis + Lua script</div><div>Atomicity across concurrent logins — closes the TOCTOU race a plain SELECT-then-INSERT cannot</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">Set, not counter</div><div>A SET of session ids (not just a count) lets you identify and evict the SPECIFIC oldest session, and supports N&gt;1 per-client limits with the same mechanism</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">Middleware check on every request</div><div>A revoked session's existing token must stop working immediately, not just block future logins</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">TTL on the active-session key</div><div>If the app crashes without a clean logout, the stale entry expires on its own rather than permanently blocking that slot</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">Real-time push to evict</div><div>UX: tell the kicked-out device immediately rather than let it silently fail on its next action</div></div>
          </div>

          <div class="ans-block"><div class="ans-label">Extending to "N concurrent logins per client" (not just N=1)</div>
            <p>Identical mechanism — only the <code>maxAllowed</code> parameter changes. For a B2B client with, say, a 5-seat license: <code>activeSessionsKey = $"session:active:client:{clientId}"</code> instead of per-user, and the Lua script evicts the oldest session(s) once the 6th login arrives. The atomicity requirement is identical regardless of whether N is 1 or 50 — the race condition exists at any N.</p>
          </div>

          <div class="warn-box">⚠️ What interviewers are actually probing with this question: do you reach for Redis/atomic operations by instinct when you hear "concurrent" + "limit," or do you design a check-then-act flow against a regular SQL table (which technically CAN be made safe with a serializable transaction or a unique constraint + retry, but is far more contention-prone under real login traffic than a single-threaded Redis script)?</div>

          <div class="tip-box">✅ Closing line: "The business rule — max N concurrent sessions, evict the oldest — is the easy part. The design problem is making 'check current sessions, then add mine' atomic, because under real concurrent login traffic a naive check-then-act always has a race window. I use a Redis-backed session registry with an atomic Lua script for the check-and-evict-and-register step, enforce it on every request via middleware so a revoked token dies immediately rather than just failing future logins, and push a real-time notification to the evicted device for a clean UX instead of a silent failure."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q11</div>
      <div class="qa-body">
        <div class="qa-question">For a code review agent, what information is needed and how does it work? Is user input needed?</div>
        <div class="qa-answer">

          <div class="ans-block"><div class="ans-label">This extends the Code Review Agent stage from the Q7 SDLC answer — here's what it actually needs to function</div>
            <p>A code review agent is only as good as the context it's given. A diff alone is not enough — a human reviewer implicitly brings the style guide, the architecture's intent, recent incident history and team conventions to a review; the agent needs ALL of that supplied explicitly, because it has none of it by default.</p>
          </div>

          <div class="flow-box">
            <div class="flow-step">PR Diff + Context</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Static Analysis</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">LLM Review (grounded)</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step green">Inline Comments + Verdict</div>
          </div>

          <div class="ans-block"><div class="ans-label">The information it needs — this is the real content of the question</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.9fr;"><div>Input</div><div>Why the agent needs it</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">The diff itself</div><div>Obvious, but needs FULL file context around each hunk, not just the +/- lines — a change can look wrong in isolation and correct in context</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">PR description / linked ticket</div><div>Without the INTENT, the agent can't judge whether the diff achieves what it's supposed to — only whether it's internally consistent</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">Team style/architecture guide</div><div>RAG-retrieved, same as any grounded system — "is this consistent with how WE do things" needs the team's actual conventions, not generic best practice</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">Static analysis results</div><div>Lint, SAST, dependency-vulnerability scan results feed in as STRUCTURED findings — the LLM reasons over them, it doesn't re-derive them (don't make the model do what a deterministic tool already does better)</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">Test coverage delta</div><div>Did coverage go up or down for the changed lines — a mechanical signal the agent should cite, not guess at</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">File/module ownership + blast radius</div><div>A change to a shared library used by 12 services needs more scrutiny than a change to one controller — the agent needs the dependency graph to know this</div></div>
              <div class="dt-row" style="grid-template-columns:1.1fr 1.9fr;"><div class="dt-name">Past review history on this file</div><div>"This exact bug was introduced and reverted here 3 months ago" is exactly the kind of institutional memory a human senior reviewer has and an agent needs retrieved for it</div></div>
            </div>
          </div>

          <div class="ans-block"><div class="ans-label">In code — the input contract and pipeline</div>
          <div class="code-box">public record CodeReviewRequest(
    string PullRequestId,
    string Description,                     // PR description / linked ticket summary
    IReadOnlyList<DiffHunk> Diffs,           // diff WITH surrounding context, not raw patch
    StaticAnalysisResult StaticFindings,     // lint/SAST/dependency scan — structured, not re-derived
    CoverageDelta TestCoverage,
    IReadOnlyList<string> AffectedServices,  // blast radius from the dependency graph
    string RepositoryStyleGuideRef);         // pointer for RAG retrieval, not inlined wholesale

public class CodeReviewAgent
{
    public async Task<CodeReviewResult> ReviewAsync(CodeReviewRequest request, CancellationToken ct)
    {
        // 1. Ground the review in the TEAM's actual conventions, retrieved — not assumed
        var styleGuideContext = await _rag.RetrieveAsync(request.RepositoryStyleGuideRef, request.Diffs, ct);
        var pastIncidents     = await _rag.RetrieveSimilarAsync("past bugs in these files", request.Diffs, ct);

        // 2. The model reasons over STRUCTURED findings, never re-derives what a tool already found
        var prompt = BuildReviewPrompt(request, styleGuideContext, pastIncidents);
        var review = await _llm.CompleteAsync(prompt, ct);

        // 3. Validate shape — comments must reference REAL line numbers that exist in the diff
        var comments = ValidateAndFilterComments(review, request.Diffs);

        return new CodeReviewResult(
            Comments: comments,
            Verdict: DetermineVerdict(comments, request.StaticFindings),   // never "approve" on CRITICAL static findings
            RequiresHumanReview: comments.Any(c => c.Severity >= Severity.High)
                                 || request.AffectedServices.Contains("payments")
                                 || request.AffectedServices.Contains("auth"));
    }
}</div></div>

          <div class="ans-block"><div class="ans-label">Is user input needed? Yes — at three specific points, by design</div>
            <div class="code-box">1. PR DESCRIPTION / INTENT (input BEFORE the agent runs)
   The agent cannot infer WHY a change was made — a human must state the
   intent (ticket link, PR description). Without this, "is this the
   right fix" degrades to "is this internally consistent."

2. DISPOSITION ON FLAGGED ITEMS (input DURING review)
   The agent proposes findings; a human developer responds: fix, or
   explicitly dismiss with a reason ("false positive — this IS
   intentional because..."). This feedback loop also becomes training
   signal for tuning the agent's precision over time.

3. FINAL APPROVAL ON HIGH-RISK CHANGES (input AFTER review, see Q7)
   The agent NEVER auto-approves changes touching auth, payments,
   schema, or anything flagged High/Critical severity — a human
   approver is a hard gate, not a formality, matching the same
   autonomy-matches-reversibility principle from the Agentic AI topic
   page and the Q7 SDLC answer.</div>
          </div>

          <div class="warn-box">⚠️ The failure mode to call out unprompted: letting the agent decide WHAT severity level requires human sign-off. That threshold must be a fixed, auditable policy a human set — not something the model infers per-PR, or you've quietly handed judgment calls about its own authority back to the system you're trying to keep in check.</div>

          <div class="tip-box">✅ Closing line: "A code review agent needs everything a human reviewer uses implicitly, made explicit: the diff with real context, the intent behind it, retrieved team conventions and past incident history, and structured output from the deterministic tools it should never try to replace, like SAST and coverage. User input isn't optional at the edges — it's required up front to state intent, during review to disposition findings, and at the end as a hard approval gate on anything high-risk. The agent's job is to make the easy 80% of review instant and give the human reviewer a head start on the hard 20%, not to remove the human from it."</div>
        </div>
      </div>
    </div>

  </div>
`;
