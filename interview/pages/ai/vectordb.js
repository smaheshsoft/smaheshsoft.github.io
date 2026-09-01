window.Pages['ai-vectordb'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>Vector Databases</span></div>
  <h1>🗂️ Vector Databases</h1>
  <p>Azure AI Search · pgvector · Pinecone · ANN indexes · Filtering · Scale · Interview answers</p>
</div>

<div class="ref-section">
  <div class="ref-title">The Problem They Solve</div>
  <div class="ref-body">
    <p>Finding the nearest vectors by brute force means comparing the query against every stored vector.
    At a million chunks that is a million distance calculations per query — far too slow. Vector databases
    provide <b>Approximate Nearest Neighbour (ANN)</b> indexes that trade a sliver of recall for
    orders-of-magnitude speed.</p>

    <div class="code-box">Brute force (exact)        1M vectors → ~1M comparisons → hundreds of ms
ANN index (approximate)    1M vectors → ~thousands   → single-digit ms, ~95-99% recall

HNSW  — graph based. Fast queries, high recall, memory hungry. The common default.
IVF   — cluster based. Lower memory, needs training, good for very large sets.
Flat  — no index, exact. Correct choice under ~10k vectors. Do not over-engineer.</div>

    <div class="tip-box">💡 Under roughly 50,000 chunks almost anything works, including a plain database with
    pgvector and no tuning. Choose your vector store for <b>filtering, security and operations</b>, not for raw
    ANN speed — that is rarely the binding constraint at enterprise document scale.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Choosing — Azure AI Search vs pgvector vs Pinecone</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1fr 1.3fr 1.3fr 1.3fr;">
        <div>Aspect</div><div>Azure AI Search</div><div>pgvector (PostgreSQL)</div><div>Pinecone</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr 1.3fr;">
        <div class="dt-name">Model</div><div>Managed search PaaS</div><div>Extension on your existing DB</div><div>Managed vector SaaS</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr 1.3fr;">
        <div class="dt-name">Hybrid search</div><div class="dt-yes">Built in + semantic re-ranker</div><div>Manual: combine with tsvector</div><div>Sparse-dense, needs setup</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr 1.3fr;">
        <div class="dt-name">Filtering</div><div class="dt-yes">Rich OData filters, pre-filter</div><div class="dt-yes">Full SQL WHERE — strongest</div><div>Metadata filters, more limited</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr 1.3fr;">
        <div class="dt-name">Transactions</div><div class="dt-no">No</div><div class="dt-yes">Yes — same ACID DB as your data</div><div class="dt-no">No</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr 1.3fr;">
        <div class="dt-name">Ops burden</div><div>Low — fully managed</div><div>You run Postgres (or Flexible Server)</div><div>Lowest</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr 1.3fr;">
        <div class="dt-name">Azure fit</div><div class="dt-yes">Native: Entra ID, VNet, Private Link</div><div class="dt-yes">Native if already on Azure PG</div><div>Third party — review data residency</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr 1.3fr;">
        <div class="dt-name">Pick when</div><div>Enterprise RAG on Azure, mixed content, need re-ranking</div><div>Already on Postgres, moderate scale, want one datastore</div><div>Vector-first product, very large scale, want zero ops</div>
      </div>
    </div>

    <div class="warn-box">⚠️ Adding a separate vector database is a real architectural cost: another datastore to
    secure, back up, monitor and keep consistent with the source of truth. If your data already lives in
    PostgreSQL and you have fewer than a few million chunks, <b>pgvector avoids an entire moving part</b>.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Filtering — Where Security Lives</div>
  <div class="ref-body">
    <div class="code-box">PRE-FILTER  (filter first, then search the survivors)
  ✅ Correct result count, correct security
  ✅ What you want for tenant and ACL filtering

POST-FILTER (search first, then discard)
  ⚠️ Ask for 10, get 3 back because 7 were filtered out
  ⚠️ Silent recall loss that looks like "the AI is unhelpful"

Always confirm which one your store does. Azure AI Search and pgvector
both pre-filter; several vector-only stores historically post-filtered.</div>

    <div class="ans-block"><div class="ans-label">Multi-tenant isolation options</div>
    <div class="code-box">1. Filter by tenant field     Simple, cheap. Relies on every query being
                              filtered correctly — one missed filter is a breach.
                              Enforce it in a shared repository, never per caller.

2. Index / collection per    Hard isolation, easy "delete this tenant".
   tenant                     Cost and management grow with tenant count.

3. Separate service per      Maximum isolation for regulated or large tenants.
   tenant                     Highest cost. Reserve for those who require it.

Common enterprise answer: (1) by default, (2) or (3) for regulated tenants.</div></div>

    <div class="ans-block"><div class="ans-label">Filter built from identity, not from the request</div>
    <div class="code-box">// ❌ Never take the tenant from the client payload.
// ✅ Derive it from the validated token, server-side.
var tenantId = user.FindFirst("tid").Value;
var groups   = user.FindAll("groups").Select(c =&gt; c.Value);

var filter = $"tenant eq '{tenantId}' and acl/any(g: search.in(g, '{string.Join(",", groups)}'))";</div></div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Real-World Use Cases &amp; Industry Benefits</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-block"><div class="ans-label">Grounding store for RAG</div>
        The primary role: hold document chunks and serve the top matches per query,
        filtered by who is asking.</div>
        <div class="ans-block"><div class="ans-label">Long-term agent memory</div>
        Past conversations and decisions stored as vectors so an assistant can recall
        "what did we decide about this station last month?".</div>
        <div class="ans-block"><div class="ans-label">Similarity services</div>
        Duplicate detection, related-incident lookup, recommendation — served from the
        same index that powers search.</div>
      </div>
      <div>
        <div class="ans-block"><div class="ans-label">Benefit: search that scales with content</div>
        Adding documents does not mean adding synonym rules. Quality holds as the
        corpus grows.</div>
        <div class="ans-block"><div class="ans-label">Benefit: one retrieval layer, many apps</div>
        Chatbot, support console and analytics all query the same governed index,
        so answers stay consistent across channels.</div>
        <div class="ans-block"><div class="ans-label">Benefit: auditable access</div>
        Retrieval is a logged, filtered query — you can prove which user saw which
        source, which is what compliance asks for.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Operating It</div>
  <div class="ref-body">
    <div class="code-box">CAPACITY
  Storage ≈ vectors × dims × 4 bytes × (1.5-2 for index overhead) + original text
  1M chunks × 1536 dims ≈ 6 GB vectors ≈ 10-12 GB provisioned. Plan replicas for QPS.

FRESHNESS
  Event-driven upsert on document change beats nightly full rebuilds.
  Upsert by stable document id, and DELETE removed documents — orphaned chunks
  are the most common cause of "it quoted a policy we retired".

TUNING (HNSW)
  efConstruction ↑ → better index, slower build
  efSearch       ↑ → better recall, slower query   ← tune this one at runtime
  m              ↑ → better recall, more memory

MONITOR
  Query latency p95 · recall against the golden set · index size growth
  Filter hit rate · empty-result rate (a spike usually means a broken filter)</div>

    <div class="tip-box">💡 Track <b>empty-result rate</b> as a first-class metric. When a deployment breaks a
    security filter or a field name, retrieval silently returns nothing and the assistant starts saying "I could
    not find that" — which users report as "the AI got worse", not as an outage.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answers</div>
  <div class="ref-body">
    <div class="qa-card">
      <div class="qa-question">How do you choose between Azure AI Search, pgvector and Pinecone?</div>
      <div class="qa-answer">"I start from the operating model rather than benchmarks. If the platform is on
      Azure and the corpus is mixed enterprise content, Azure AI Search wins because hybrid search, the semantic
      re-ranker, Entra ID and Private Link come built in — that is weeks of integration I do not write. If the
      data already lives in PostgreSQL and we are at moderate scale, pgvector is the better architectural call:
      one datastore, full SQL filtering, transactional consistency with the business data, and no extra service
      to secure and back up. Pinecone I would consider for a vector-first product at very large scale where zero
      ops matters more than keeping data inside our own Azure boundary — but in a regulated enterprise, data
      residency usually decides that for me."</div>
    </div>
    <div class="qa-card">
      <div class="qa-question">How do you guarantee one tenant never retrieves another tenant's documents?</div>
      <div class="qa-answer">"The filter is derived from the validated token server-side, never from the request
      body, and it is applied in a single shared retrieval component so no caller can bypass it. I confirm the
      store pre-filters rather than post-filters, so security is enforced before ranking. Every chunk carries
      tenant and ACL metadata written at ingestion. For regulated tenants I escalate to a dedicated index. And I
      test it — a negative test suite that asserts tenant A queries never return tenant B documents runs in CI."</div>
    </div>
  </div>
</div>
`;
