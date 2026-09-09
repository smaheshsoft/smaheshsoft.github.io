window.Pages = window.Pages || {};
window.Pages['solera'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>Solera</span></div>
    <h1>🔋 Solera Interview</h1>
    <p>MCP · GenAI/RAG on Battery Swapping · Agentic AI · Currency Handling · C# Code Review (LINQ + SQL Injection) · Concurrency &amp; Load · Platform Architecture</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">What is the usage of an MCP server?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">One line</div>
            <p>An MCP server exposes an enterprise system's tools, resources and prompts through one standard protocol, so any compliant AI client can discover and call them safely — without a bespoke integration per assistant.</p>
          </div>
          <div class="code-box">MCP HOST (the AI app)
  └── MCP CLIENT ── JSON-RPC ──► MCP SERVER ──► your system
                                 (DB, API, files, SaaS)

Exposes THREE things:
  TOOLS      model-invoked actions      get_station_status(id)
  RESOURCES  app-attached context       file://runbooks/fault.md
  PROMPTS    reusable templates         "Summarise this incident"</div>
          <div class="tip-box">✅ Interview line: "MCP is a governed API surface built for AI clients — narrow, purpose-built tools with AI-readable descriptions, not a raw pass-through of my REST API."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">What we're achieving with MCP could be done with an API call — why do we need an MCP server?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">The honest answer: a single API call, yes. Many AI clients calling many systems, no.</div>
            <p>For ONE assistant calling ONE API, a direct HTTP call is simpler and MCP is overhead. MCP earns its cost the moment there is more than one AI client, or more than one backend system — which is the actual enterprise situation.</p>
          </div>
          <div class="code-box">WITHOUT MCP (N assistants × M systems)          WITH MCP
4 assistants × 6 systems                        Each system exposes ONE MCP server
= 24 bespoke integrations, each with             Each assistant speaks ONE protocol
  its own auth, schema, error handling           = 4 + 6 components, not 24

Every NEW assistant = 6 more integrations        A new assistant reuses every
                                                  existing MCP server on day one</div>
          <div class="ans-block"><div class="ans-label">What a raw API call doesn't give you, that MCP does</div>
            <ul>
              <li><strong>Discovery</strong> — the model reads tool descriptions and decides what to call; a hardcoded API call requires the developer to wire that logic manually per assistant.</li>
              <li><strong>Standard auth &amp; identity propagation</strong> — one place enforces the caller's real permissions, instead of every integration reinventing it.</li>
              <li><strong>Reuse across clients</strong> — Claude, Copilot, an internal agent, and next year's tool all use the SAME server with zero extra work.</li>
              <li><strong>Governance</strong> — rate limits, audit, response-size caps sit in the server, reviewable in one place by security.</li>
            </ul>
          </div>
          <div class="tip-box">✅ Strong answer: "You're right that a single API call solves the single-integration case. MCP is the answer to the M×N integration problem — I build the connector once, and every current and future AI client reuses it, with authorization and audit centralised instead of duplicated per integration."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">How is AI used in the Battery Swapping platform? What RAG pipeline and vector DB were used?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Architecture</div>
            <div class="flow-box">
              <div class="flow-step">Operational + Knowledge Data</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Chunk + Embed</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Vector Store</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Hybrid Retrieval</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step green">Azure OpenAI + Citations</div>
            </div>
          </div>
          <div class="qa-answer">"Station telemetry, incident history and SOPs were embedded and indexed so engineers could ask operational questions in plain language instead of querying five systems. Retrieval was hybrid — vector similarity plus keyword match — because station IDs and fault codes are exact identifiers that pure semantic search tends to miss, then a semantic re-ranker narrowed to the top few chunks before they reached the prompt. The system prompt instructed the model to answer only from that retrieved context and cite the source, refusing when the context didn't contain the answer — that's what kept it grounded instead of hallucinating on operational data."</div>
          <div class="ans-block"><div class="ans-label">If asked which vector DB, specifically</div>
            <p>Answer with whichever you actually used and why — Azure AI Search (native hybrid search + semantic re-ranker + Entra ID, if already on Azure) or pgvector (if the data already lived in PostgreSQL and adding a vector column avoided standing up a new datastore). Don't claim both were run in production if only one was.</p>
          </div>
          <div class="warn-box">⚠️ Be ready for the immediate follow-up: "how did you stop it answering from stale or unauthorized data?" — identity-scoped retrieval filters (tenant/ACL applied before ranking) and event-driven re-indexing on document change are the two answers that show real ownership, not just a demo.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">How was Agentic AI with an LLM used in the Battery Swapping platform?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Answer at the correct autonomy level — don't overclaim</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1fr 1.8fr;"><div>Level</div><div>What it means</div></div>
              <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">RAG assistant</div><div>Answers grounded in retrieved data. No action taken.</div></div>
              <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">Tool-calling agent</div><div>Model decides to call an MCP tool (e.g. fetch live station status) — bounded, single or few steps</div></div>
              <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">Autonomous agent</div><div>Multi-step planning loop, no human in the loop — a much bigger claim</div></div>
            </div>
          </div>
          <div class="qa-answer">"What we built was tool-calling — level one to two on the autonomy scale, not fully autonomous agents. Given an operational question, the model could decide to call an MCP tool to pull live station status or open telemetry rather than only answering from static retrieved documents, and the loop was bounded: a fixed step cap, a token budget, and human review before anything consequential happened. I'd only move toward higher autonomy for actions that are reversible and low-risk — creating a draft ticket, tagging a record — and I'd keep approval gates on anything that changes state a customer or the business depends on."</div>
          <div class="tip-box">✅ This precise, level-aware framing reads as more senior than claiming full autonomy — it shows you understand the risk/autonomy trade-off rather than reciting "agentic AI" as a buzzword.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">How will currency handling be done? Write the code.</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Design: currency is a property of the entity, never assumed globally</div>
            <p>Every monetary amount is stored with its own currency code — never a bare <code>decimal</code>. Conversion happens at the presentation/reporting boundary, using rates as of a specific date, not silently at write time.</p>
          </div>
          <div class="code-box">// Money as a value object — amount and currency travel together, always
public readonly record struct Money(decimal Amount, string CurrencyCode)
{
    public static Money Zero(string currency) => new(0m, currency);

    public Money Add(Money other)
    {
        if (CurrencyCode != other.CurrencyCode)
            throw new InvalidOperationException(
                $"Cannot add {CurrencyCode} to {other.CurrencyCode} without an explicit conversion.");
        return this with { Amount = Amount + other.Amount };
    }
}

// Entity maps 1:1 — currency is NEVER inferred from context or a default
public class Invoice
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public string CurrencyCode { get; set; } = default!;   // e.g. "INR", "USD" — ISO 4217
}

// Conversion happens explicitly, at a specific point in time, via a rate service
public interface IExchangeRateProvider
{
    Task<decimal> GetRateAsync(string from, string to, DateOnly asOf);
}

public class CurrencyConverter
{
    private readonly IExchangeRateProvider _rates;
    public CurrencyConverter(IExchangeRateProvider rates) => _rates = rates;

    public async Task<Money> ConvertAsync(Money source, string targetCurrency, DateOnly asOf)
    {
        if (source.CurrencyCode == targetCurrency) return source;
        var rate = await _rates.GetRateAsync(source.CurrencyCode, targetCurrency, asOf);
        return new Money(Math.Round(source.Amount * rate, 2), targetCurrency);
    }
}</div>
          <div class="ans-block"><div class="ans-label">Why this shape</div>
            <ul>
              <li><strong>Never store a converted total without the original</strong> — you lose the ability to audit or re-derive it.</li>
              <li><strong>Rate lookups are date-scoped</strong> — a report generated today for last month's invoice must use last month's rate, not today's.</li>
              <li><strong>Rounding happens once, at conversion</strong>, using the currency's minor-unit precision (2 decimals for most, 0 for JPY) — rounding twice compounds error at scale.</li>
              <li><strong>Storage uses <code>decimal</code>, never <code>float</code>/<code>double</code></strong>, for exact monetary arithmetic.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">Code review — find the issue (Question 1: LINQ deferred execution)</div>
        <div class="qa-answer">
          <div class="code-box">List&lt;int&gt; item = new List&lt;int&gt;{1,2,3};
var query = item.Where(x =&gt; x&gt;1);
query.Add(4);                        // ← THE BUG
foreach(var i in query)
    Console.Write(i+" ");</div>
          <div class="warn-box">⚠️ This does not compile. <code>Where()</code> returns <code>IEnumerable&lt;int&gt;</code>, and <code>IEnumerable&lt;T&gt;</code> has no <code>Add</code> method — that only exists on <code>List&lt;T&gt;</code>/<code>ICollection&lt;T&gt;</code>. The compiler rejects <code>query.Add(4)</code> outright.</div>
          <div class="ans-block"><div class="ans-label">The deeper concept being tested — deferred execution</div>
            <div class="code-box">// Even fixing the type error, this reveals a classic LINQ gotcha:
List&lt;int&gt; item = new List&lt;int&gt;{1,2,3};
var query = item.Where(x =&gt; x&gt;1);   // NOT executed yet — just a description
item.Add(4);                          // mutate the SOURCE before enumerating
foreach(var i in query)               // NOW the query actually runs
    Console.Write(i+" ");             // prints: 2 3 4   ← 4 is included!

// Where() is LAZY. It doesn't run until you iterate (foreach, ToList(), etc).
// If the underlying collection changes before that point, the query sees
// the CHANGED collection — which surprises people who think "query" is
// a snapshot taken at the moment Where() was called. It is not.</div>
          </div>
          <div class="tip-box">✅ Correct answer: "Two separate things here. First, this literally doesn't compile — IEnumerable&lt;int&gt; has no Add. But the real intent of the question is deferred execution: a LINQ query built with Where/Select isn't a result, it's a description of a query that only runs when enumerated — so if you materialize with .ToList() immediately, you get a snapshot; if you don't, later changes to the source are visible when you finally iterate."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q7</div>
      <div class="qa-body">
        <div class="qa-question">Code review — find the issue (Question 2: claim processing endpoint)</div>
        <div class="qa-answer">
          <div class="code-box">[HttpPost]
Public IActionResult Process(string claimid)
{
  SqlConnection con=new SqlConnection(_connection);
  con.Open();
  SqlCommand cmd=new SqlCommand("Select * from claim where claimid="+claimid,con);
  SqlReader read=cmd.ExecuteReader();
  List&lt;claim&gt; claims=new List&lt;claim&gt;();
  decimal total=0;
  while(read.Read())
  {
    var amount=read["amount"];
    total+=amount;
    claims.Add(new Claim{Id=read["id"],Amount=amount});
  }
  return ok(claims);
}</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:0.6fr 1fr 1.4fr;"><div>Severity</div><div>Issue</div><div>Why it matters</div></div>
            <div class="dt-row" style="grid-template-columns:0.6fr 1fr 1.4fr;">
              <div class="dt-name" style="color:#c0392b;">Critical</div><div>SQL Injection</div>
              <div><code>"...where claimid="+claimid</code> concatenates raw user input directly into SQL. <code>claimid = "1; DROP TABLE claim;--"</code> is a valid attack. Must use a parameterized query.</div>
            </div>
            <div class="dt-row" style="grid-template-columns:0.6fr 1fr 1.4fr;">
              <div class="dt-name" style="color:#c0392b;">Critical</div><div>Resource leak</div>
              <div><code>SqlConnection</code> and the reader are never disposed — no <code>using</code>. Under load this exhausts the connection pool and takes the app down.</div>
            </div>
            <div class="dt-row" style="grid-template-columns:0.6fr 1fr 1.4fr;">
              <div class="dt-name" style="color:#c0392b;">Compile error</div><div>Wrong type name</div>
              <div><code>SqlReader</code> doesn't exist — the real type is <code>SqlDataReader</code>.</div>
            </div>
            <div class="dt-row" style="grid-template-columns:0.6fr 1fr 1.4fr;">
              <div class="dt-name" style="color:#c0392b;">Compile error</div><div>object + decimal</div>
              <div><code>read["amount"]</code> is <code>object</code>. <code>total += amount</code> has no defined <code>+</code> operator for <code>object</code> — needs an explicit cast/convert.</div>
            </div>
            <div class="dt-row" style="grid-template-columns:0.6fr 1fr 1.4fr;">
              <div class="dt-name">High</div><div>Unsafe casts</div>
              <div><code>Id = read["id"]</code>, <code>Amount = amount</code> — assigning <code>object</code> straight into typed properties either won't compile or throws <code>InvalidCastException</code> at runtime depending on the model.</div>
            </div>
            <div class="dt-row" style="grid-template-columns:0.6fr 1fr 1.4fr;">
              <div class="dt-name">Medium</div><div><code>total</code> is dead</div>
              <div>Computed but never returned or used — only <code>claims</code> goes back to the caller. Likely a leftover requirement never wired up.</div>
            </div>
            <div class="dt-row" style="grid-template-columns:0.6fr 1fr 1.4fr;">
              <div class="dt-name">Medium</div><div>No async</div>
              <div>Blocking <code>ExecuteReader()</code>/<code>Read()</code> on a web request thread instead of the async equivalents hurts throughput under load.</div>
            </div>
            <div class="dt-row" style="grid-template-columns:0.6fr 1fr 1.4fr;">
              <div class="dt-name">Low</div><div><code>Select *</code></div>
              <div>Pulls every column even though only <code>id</code> and <code>amount</code> are used — wasted I/O, and brittle if the table schema changes.</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Corrected version</div>
            <div class="code-box">[HttpPost]
public async Task&lt;IActionResult&gt; Process(string claimId, CancellationToken ct)
{
    if (string.IsNullOrWhiteSpace(claimId))
        return BadRequest("claimId is required.");

    const string sql = "SELECT Id, Amount FROM Claim WHERE ClaimId = @ClaimId";

    await using var con = new SqlConnection(_connection);
    await con.OpenAsync(ct);

    await using var cmd = new SqlCommand(sql, con);
    cmd.Parameters.AddWithValue("@ClaimId", claimId);   // parameterized — no injection

    await using var reader = await cmd.ExecuteReaderAsync(ct);

    var claims = new List&lt;Claim&gt;();
    decimal total = 0m;

    while (await reader.ReadAsync(ct))
    {
        var amount = reader.GetDecimal(reader.GetOrdinal("Amount"));   // typed read
        total += amount;
        claims.Add(new Claim
        {
            Id     = reader.GetInt32(reader.GetOrdinal("Id")),
            Amount = amount
        });
    }

    return Ok(new { Claims = claims, Total = total });   // total now actually used
}</div>
          </div>
          <div class="tip-box">✅ Lead with SQL injection first — it's the one a security review would block a release over. Then resource disposal. The type errors are worth naming quickly, but the injection and leak are what an architect-level answer prioritises.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q8</div>
      <div class="qa-body">
        <div class="qa-question">How is concurrency handled in the application? How is higher load handled?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Two different problems — answer them separately</div>
            <div class="flow-box">
              <div class="flow-step">CONCURRENCY<br><span style="font-weight:400;font-size:11px;">correctness under simultaneous writes</span></div>
              <div class="flow-arrow">vs</div>
              <div class="flow-step blue">LOAD<br><span style="font-weight:400;font-size:11px;">throughput under simultaneous traffic</span></div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Concurrency — correctness</div>
            <div class="code-box">OPTIMISTIC CONCURRENCY (default choice — no locks held)
  Every row carries a RowVersion / ETag.
  UPDATE ... WHERE Id=@id AND RowVersion=@expected
  0 rows affected → someone else updated it first → 409 Conflict,
  caller re-reads and retries. Scales far better than locking.

PESSIMISTIC LOCKING (only when contention is severe + short critical section)
  SELECT ... WITH (UPDLOCK, ROWLOCK) — holds a row lock for the transaction.
  Used sparingly: e.g. reserving the LAST unit of stock at checkout.

DISTRIBUTED / CROSS-SERVICE
  A distributed lock (Redis RedLock) or, better, redesign so ownership
  of that resource lives in ONE service — avoid needing the lock at all.</div>
            <div class="code-box">// EF Core optimistic concurrency in practice
public class Order
{
    public int Id { get; set; }
    [Timestamp] public byte[] RowVersion { get; set; }   // auto-checked by EF
}

try
{
    await _db.SaveChangesAsync();
}
catch (DbUpdateConcurrencyException)
{
    return Conflict("This order was modified by someone else — please retry.");
}</div>
          </div>
          <div class="ans-block"><div class="ans-label">Load — throughput and scale</div>
            <div class="code-box">HORIZONTAL SCALE     Stateless API pods behind AKS HPA / KEDA —
                     more traffic spins up more pods automatically

ASYNC END-TO-END     async/await through the full stack so threads aren't
                     blocked waiting on I/O — far more requests per pod

CACHING               Redis for hot reads (station status, reference data)
                     — cuts DB load directly

QUEUE-BASED LEVELLING Bursty writes go to Service Bus/Event Hub instead of
                     hitting the DB directly; workers drain at a safe,
                     controlled rate — protects the database from spikes

CONNECTION POOLING    Bounded DB connection pool + retry with backoff,
                     so a burst degrades gracefully instead of exhausting
                     connections and taking the whole app down

RATE LIMITING         Per-client throttling at the gateway (APIM) so one
                     noisy caller can't starve everyone else</div>
          </div>
          <div class="tip-box">✅ Strong close: "Concurrency and load are different problems with different tools — optimistic concurrency for correctness on shared writes, and horizontal scaling plus async I/O plus a queue to absorb bursts for throughput. I default to optimistic concurrency because pessimistic locks don't scale, and I only reach for a distributed lock when redesigning ownership isn't possible."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q9</div>
      <div class="qa-body">
        <div class="qa-question">What is the application architecture for the Battery Swapping platform?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">High-level shape</div>
            <div class="flow-box">
              <div class="flow-step">Swapping Stations</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Azure IoT Hub</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Event Hub</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step blue">Azure Functions</div>
              <div class="flow-arrow">→</div>
              <div class="flow-step green">AKS Microservices</div>
            </div>
          </div>
          <div class="qa-answer">"Telemetry from stations streams in through IoT Hub into Event Hub for high-throughput ingestion, then Azure Functions handle event-driven processing before landing in AKS-hosted microservices for the domain logic — station management, billing, fleet operations. Data sits in PostgreSQL for transactional data, Redis for hot cache, and Blob Storage for large payloads like telemetry archives. The GenAI/RAG layer sits alongside as its own service — retrieval over operational and knowledge data, backed by a vector store, with MCP-based tool integration so the assistant can securely reach into other services. Everything runs behind Azure API Management for auth, rate limiting and routing, with Application Insights and Log Analytics for observability, and Azure DevOps for CI/CD across the estate."</div>
          <div class="ans-block"><div class="ans-label">Be ready to go one level deeper on whichever piece they poke</div>
            <ul>
              <li><strong>Multi-region</strong> — how failover and data residency were handled</li>
              <li><strong>Multi-currency billing</strong> — ties back to Q5's currency design</li>
              <li><strong>Security boundary for the AI layer</strong> — ties back to Q3's identity-scoped retrieval</li>
              <li><strong>Cost governance</strong> — the 20% infrastructure saving figure, and how it was achieved</li>
            </ul>
          </div>
          <div class="tip-box">✅ Keep the first pass at this altitude — a clean end-to-end flow — then let the interviewer's follow-up questions pull you into whichever layer they actually care about, rather than front-loading every detail into one answer.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q10</div>
      <div class="qa-body">
        <div class="qa-question">Write the code to process a file for RAG — different file types, chat text, and REST API as inputs. Give the design.</div>
        <div class="qa-answer">

          <div class="ans-block"><div class="ans-label">The design problem, stated precisely</div>
            <p>Three very different input shapes — a binary file (PDF, DOCX, image), free-text from a chat, and a JSON payload from a REST call — all need to end up in the SAME place: normalized text chunks in a vector store. The design question is really "how do I avoid writing three separate, diverging ingestion pipelines."</p>
          </div>

          <div class="flow-box">
            <div class="flow-step">File / Chat / API<br><span style="font-weight:400;font-size:11px;">3 different shapes</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">IContentExtractor<br><span style="font-weight:400;font-size:11px;">strategy per source</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">RawDocument<br><span style="font-weight:400;font-size:11px;">ONE common shape</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Chunk + Embed</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step green">Vector Store</div>
          </div>

          <div class="ans-block"><div class="ans-label">Key design decision: normalize FIRST, then one shared pipeline</div>
            <p>Every source-specific extractor's only job is to produce the same <code>RawDocument</code> shape. Chunking, embedding, metadata tagging and indexing are written <strong>once</strong> and never touched again when a new source type is added — that's the Open/Closed principle applied to ingestion.</p>
          </div>

          <div class="code-box">// ── The one shape every source normalizes into ──────────────────────
public record RawDocument(
    string SourceId,          // file name, chat session id, API request id
    string SourceType,        // "file:pdf" | "chat" | "api"
    string Text,              // extracted plain text
    string Tenant,            // security boundary — set at ingestion, never guessed later
    IReadOnlyList<string> AllowedGroups,
    IDictionary<string, string> Metadata);   // title, author, url, timestamp...

// ── Strategy interface — every source type implements this, nothing else ──
public interface IContentExtractor
{
    string SourceType { get; }
    bool CanHandle(IngestRequest request);
    Task<RawDocument> ExtractAsync(IngestRequest request, CancellationToken ct);
}</div>

          <div class="ans-block"><div class="ans-label">File extractor — dispatches by content type, one implementation per format</div>
          <div class="code-box">public class FileContentExtractor : IContentExtractor
{
    public string SourceType => "file";
    private readonly Dictionary<string, IFileParser> _parsers;

    public FileContentExtractor(IEnumerable<IFileParser> parsers)
        => _parsers = parsers.ToDictionary(p => p.ContentType, StringComparer.OrdinalIgnoreCase);

    public bool CanHandle(IngestRequest r) => r.File is not null;

    public async Task<RawDocument> ExtractAsync(IngestRequest r, CancellationToken ct)
    {
        if (!_parsers.TryGetValue(r.File!.ContentType, out var parser))
            throw new NotSupportedException($"No parser registered for {r.File.ContentType}");

        var text = await parser.ExtractTextAsync(r.File.Stream, ct);

        return new RawDocument(
            SourceId: r.File.FileName,
            SourceType: $"file:{parser.ContentType}",
            Text: text,
            Tenant: r.Tenant,
            AllowedGroups: r.AllowedGroups,
            Metadata: new Dictionary<string, string> { ["fileName"] = r.File.FileName });
    }
}

public interface IFileParser
{
    string ContentType { get; }                                    // "application/pdf" etc.
    Task<string> ExtractTextAsync(Stream content, CancellationToken ct);
}

// One focused parser per format — new format = new class, nothing else changes
public class PdfFileParser : IFileParser
{
    public string ContentType => "application/pdf";
    public async Task<string> ExtractTextAsync(Stream content, CancellationToken ct)
    {
        using var pdf = PdfDocument.Open(content);           // e.g. PdfPig
        return string.Join("\\n\\n", pdf.GetPages().Select(p => p.Text));
    }
}

public class DocxFileParser : IFileParser
{
    public string ContentType => "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    public async Task<string> ExtractTextAsync(Stream content, CancellationToken ct)
    {
        using var doc = WordprocessingDocument.Open(content, false);  // OpenXML SDK
        return doc.MainDocumentPart!.Document.Body!.InnerText;
    }
}

public class ImageOcrFileParser : IFileParser
{
    public string ContentType => "image/png";
    private readonly IOcrClient _ocr;                          // e.g. Azure AI Vision
    public ImageOcrFileParser(IOcrClient ocr) => _ocr = ocr;
    public Task<string> ExtractTextAsync(Stream content, CancellationToken ct)
        => _ocr.ReadTextAsync(content, ct);
}</div></div>

          <div class="ans-block"><div class="ans-label">Chat text extractor — trivial, but still normalizes the same way</div>
          <div class="code-box">public class ChatContentExtractor : IContentExtractor
{
    public string SourceType => "chat";
    public bool CanHandle(IngestRequest r) => r.ChatText is not null;

    public Task<RawDocument> ExtractAsync(IngestRequest r, CancellationToken ct)
        => Task.FromResult(new RawDocument(
            SourceId: r.ChatSessionId!,
            SourceType: "chat",
            Text: r.ChatText!,                       // already plain text — no parsing needed
            Tenant: r.Tenant,
            AllowedGroups: r.AllowedGroups,
            Metadata: new Dictionary<string, string> { ["sessionId"] = r.ChatSessionId! }));
}</div></div>

          <div class="ans-block"><div class="ans-label">REST API extractor — flattens JSON into readable text before it ever reaches the model</div>
          <div class="code-box">public class ApiPayloadContentExtractor : IContentExtractor
{
    public string SourceType => "api";
    public bool CanHandle(IngestRequest r) => r.ApiPayload is not null;

    public Task<RawDocument> ExtractAsync(IngestRequest r, CancellationToken ct)
    {
        // Raw JSON embeds poorly — flatten to natural language first.
        // {"stationId":"STN-4471","fault":"LATCH_FAIL","severity":"high"}
        //   → "Station STN-4471 reported fault LATCH_FAIL with severity high."
        var text = JsonFlattener.ToNaturalLanguage(r.ApiPayload!);

        return Task.FromResult(new RawDocument(
            SourceId: r.ApiRequestId!,
            SourceType: "api",
            Text: text,
            Tenant: r.Tenant,
            AllowedGroups: r.AllowedGroups,
            Metadata: new Dictionary<string, string> { ["requestId"] = r.ApiRequestId! }));
    }
}</div></div>

          <div class="ans-block"><div class="ans-label">The orchestrator — picks the right extractor, then runs ONE shared pipeline</div>
          <div class="code-box">public class IngestionPipeline
{
    private readonly IEnumerable<IContentExtractor> _extractors;
    private readonly IChunker _chunker;
    private readonly IEmbeddingClient _embeddings;
    private readonly IVectorStore _vectorStore;

    public async Task IngestAsync(IngestRequest request, CancellationToken ct)
    {
        var extractor = _extractors.FirstOrDefault(e => e.CanHandle(request))
            ?? throw new NotSupportedException("No extractor can handle this request.");

        // STEP 1 — source-specific: the ONLY part that varies by input type
        RawDocument doc = await extractor.ExtractAsync(request, ct);

        if (string.IsNullOrWhiteSpace(doc.Text))
            return;                                    // nothing to index — not an error

        // STEP 2 onward — identical for every source, written once
        var chunks = _chunker.Chunk(doc.Text, maxTokens: 500, overlapTokens: 60);

        var vectors = await _embeddings.EmbedBatchAsync(chunks.Select(c => c.Text), ct);

        var records = chunks.Zip(vectors, (chunk, vector) => new IndexRecord
        {
            Id            = $"{doc.SourceId}-{chunk.Index}",
            Content       = chunk.Text,
            ContentVector = vector,
            SourceType    = doc.SourceType,
            Tenant        = doc.Tenant,
            AllowedGroups = doc.AllowedGroups,
            Metadata      = doc.Metadata,
            IngestedUtc   = DateTime.UtcNow
        });

        await _vectorStore.UpsertAsync(records, ct);      // upsert — safe to re-run
    }
}

// Program.cs — adding a NEW source type is one registration line, nothing else touched
services.AddScoped<IContentExtractor, FileContentExtractor>();
services.AddScoped<IContentExtractor, ChatContentExtractor>();
services.AddScoped<IContentExtractor, ApiPayloadContentExtractor>();
services.AddScoped<IFileParser, PdfFileParser>();
services.AddScoped<IFileParser, DocxFileParser>();
services.AddScoped<IFileParser, ImageOcrFileParser>();</div></div>

          <div class="ans-block"><div class="ans-label">Why this shape — the design principles being demonstrated</div>
            <div class="decision-table">
              <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.8fr;"><div>Principle</div><div>Where it shows up</div></div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;"><div class="dt-name">Open/Closed</div><div>New file format or new input channel = new class + one DI registration. The pipeline itself is never edited.</div></div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;"><div class="dt-name">Strategy pattern</div><div><code>IContentExtractor</code> and <code>IFileParser</code> — the orchestrator picks the right one, never branches on type with if/else.</div></div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;"><div class="dt-name">Single Responsibility</div><div>Each parser does ONE format. The pipeline does chunk+embed+index. Nobody mixes extraction with indexing.</div></div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;"><div class="dt-name">Security at the boundary</div><div>Tenant/AllowedGroups are set once, at extraction, and carried through every downstream step — never re-derived later.</div></div>
              <div class="dt-row" style="grid-template-columns:1.2fr 1.8fr;"><div class="dt-name">Idempotency</div><div>Upsert keyed by <code>sourceId-chunkIndex</code> — re-running ingestion on the same file never creates duplicates.</div></div>
            </div>
          </div>

          <div class="warn-box">⚠️ Common trap in this answer: embedding raw JSON directly instead of flattening it to natural language first. Embedding models are trained on natural language — a raw JSON blob embeds poorly and retrieval quality drops. Always normalize structured input into readable text before chunking.</div>

          <div class="tip-box">✅ Closing line: "The design decision that matters most here isn't the parsers — it's normalizing every input type into one common document shape before anything else happens, so chunking, embedding, security filtering and indexing are written once and never change when a new input type is added. That's what keeps three-and-growing source types from becoming three-and-growing diverging pipelines."</div>
        </div>
      </div>
    </div>

  </div>
`;
