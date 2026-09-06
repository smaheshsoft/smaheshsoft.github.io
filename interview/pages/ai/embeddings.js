window.Pages['ai-embeddings'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>Embeddings &amp; Semantic Search</span></div>
  <h1>🧩 Embeddings &amp; Semantic Search</h1>
  <p>Vectors · Similarity · Hybrid search · Model choice · Re-indexing · Interview answers</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">Text</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step blue">Embedding Model</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step green">Vector [0.02, -0.11, ...]</div>
    </div>
    <div class="code-box">"battery swap failed"      → close in vector space
"swap transaction error"  → close in vector space
"quarterly revenue"       → far away in vector space

Meaning becomes geometry — nearby points = similar meaning</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">What An Embedding Is</div>
  <div class="ref-body">
    <p>An embedding turns text into a list of numbers — a <b>vector</b> — positioned so that text with similar
    meaning lands close together. That is the whole idea: <b>meaning becomes geometry</b>, and "find similar
    meaning" becomes "find nearby points".</p>

    <div class="code-box">"battery swap failed"        → [0.021, -0.118, 0.334, ... ]   1536 numbers
"swap transaction error"     → [0.019, -0.121, 0.329, ... ]   ← very close
"quarterly revenue report"   → [0.402,  0.233, -0.051, ... ]  ← far away

KEYWORD SEARCH                      SEMANTIC SEARCH
Matches characters                  Matches meaning
"car" ≠ "automobile"                "car" ≈ "automobile" ≈ "vehicle"
Misses paraphrase                   Finds the paraphrase
Nails exact IDs: "STN-4471"         Often misses exact IDs  ← the catch</div>

    <div class="warn-box">⚠️ That last line is why production systems use <b>hybrid search</b>. Semantic search
    is weak exactly where enterprises are strong: part numbers, station IDs, error codes, clause references.
    Vector plus keyword, always.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Similarity, Dimensions And Cost</div>
  <div class="ref-body">
    <div class="code-box">SIMILARITY MEASURE
  Cosine similarity — the angle between vectors. Range -1 to 1; 1 = identical meaning.
  Almost always the right default for text. Normalise vectors and dot product = cosine.

DIMENSIONS
  More dimensions  → finer distinctions, more storage, slower search
  Fewer dimensions → cheaper and faster, slight recall loss
  Modern models support shortening (e.g. 3072 → 1024) with minor quality cost.
  1M chunks × 1536 dims × 4 bytes ≈ 6 GB of raw vectors before index overhead.

COST SHAPE
  Embedding is cheap per call and done once per chunk at ingestion.
  Queries embed one short string — negligible.
  The real cost is STORAGE + the RE-EMBEDDING you will eventually do.</div>

    <div class="tip-box">💡 Budget rule: embedding a 10,000-document corpus typically costs a few dollars.
    Re-embedding it because you changed model is the same cost again plus an outage window — so pick the
    embedding model deliberately, and record which model produced every vector.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Real-World Use Cases — Beyond Chatbots</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-block"><div class="ans-label">Duplicate &amp; near-duplicate detection</div>
        Incoming ticket embeds close to an existing one → auto-link instead of
        creating a duplicate. Works across differently-worded reports of the same fault.</div>

        <div class="ans-block"><div class="ans-label">Semantic routing</div>
        Route a request to the right team, queue or skill group by meaning rather
        than a keyword rule table nobody maintains.</div>

        <div class="ans-block"><div class="ans-label">Recommendation</div>
        "Similar incidents", "related documents", "customers like this one" —
        nearest-neighbour lookup, no ML training required.</div>
      </div>
      <div>
        <div class="ans-block"><div class="ans-label">Anomaly &amp; drift detection</div>
        A log line or transaction description far from every known cluster is
        worth flagging. Useful where rules miss novel patterns.</div>

        <div class="ans-block"><div class="ans-label">Clustering &amp; theme discovery</div>
        Group thousands of survey responses or reviews into themes automatically,
        then summarise each cluster with an LLM.</div>

        <div class="ans-block"><div class="ans-label">Retrieval for RAG</div>
        The best-known use — but as the list above shows, embeddings earn their
        keep even in systems with no chatbot at all.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Industry Benefits</div>
  <div class="ref-body">
    <div class="stats-bar">
      <div class="stat-box"><div class="num">Cross-lingual</div><div class="label">a Tamil query can match an English document</div></div>
      <div class="stat-box"><div class="num">No training</div><div class="label">semantic capability without a labelled dataset</div></div>
      <div class="stat-box"><div class="num">Synonym-free</div><div class="label">no thesaurus or rule table to maintain</div></div>
      <div class="stat-box"><div class="num">Typo-tolerant</div><div class="label">meaning survives misspelling</div></div>
    </div>

    <p>The operational benefit that matters most: <b>you delete a whole class of maintenance</b>. Synonym lists,
    stemming rules and keyword expansion tables all quietly rot. Embeddings replace that with a model call —
    the search improves when you upgrade the model, not when someone remembers to edit a config file.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">How To Use It In The Real World</div>
  <div class="ref-body">
    <div class="ans-block"><div class="ans-label">Ingestion: batch, and record provenance</div>
    <div class="code-box">// Batch embedding calls — one request per chunk is slow and rate-limit prone.
var batches = chunks.Chunk(64);
foreach (var batch in batches) {
    var vectors = await embeddingClient.GenerateEmbeddingsAsync(batch.Select(c =&gt; c.Text));
    for (int i = 0; i &lt; batch.Length; i++)
        docs.Add(new IndexDoc {
            Id           = batch[i].Id,
            Content      = batch[i].Text,
            ContentVector= vectors[i].ToFloats(),
            // provenance — you WILL need these:
            EmbedModel   = "text-embedding-3-large",
            EmbedVersion = "2024-10",
            SourceUri    = batch[i].Source,
            Tenant       = batch[i].Tenant,
            Acl          = batch[i].AllowedGroups,
            UpdatedUtc   = DateTime.UtcNow
        });
    await index.MergeOrUploadDocumentsAsync(docs);   // upsert, not insert
}</div></div>

    <div class="ans-block"><div class="ans-label">The rule people break</div>
    <div class="code-box">❌ Query embedded with model A, documents embedded with model B.
   The vectors live in different spaces. Results look random and nobody
   understands why. There is no error message — just bad answers.

✅ Same model, same version, same preprocessing for query and document.
   Store the model name on every vector. On model upgrade, re-embed
   into a NEW index, verify against the golden set, then swap the alias.</div></div>

    <div class="ans-block"><div class="ans-label">Zero-downtime re-index</div>
    <div class="code-box">index-v1 (live, model A)  ←── alias "kb-current" ──  app reads this
index-v2 (building, model B)

1. Build v2 in the background from source of truth
2. Run the golden evaluation set against v2
3. Compare recall@5 and faithfulness with v1
4. Only if v2 wins: repoint the alias  → instant cutover, instant rollback</div></div>

    <div class="warn-box">⚠️ Embeddings are not encryption. A vector is a lossy but real representation of the
    text — inversion attacks can recover meaningful content. Treat your vector store with the same
    classification, access control and residency rules as the source documents.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answers</div>
  <div class="ref-body">
    <div class="qa-card">
      <div class="qa-question">Why do you need keyword search if you have semantic search?</div>
      <div class="qa-answer">"Because enterprise queries are full of exact tokens — station IDs, part numbers,
      error codes, contract clause numbers. Embeddings capture meaning, and an identifier has no meaning to
      capture, so a pure vector search will happily return a semantically similar but wrong record. Hybrid
      search runs both and fuses the scores, then a semantic re-ranker orders the merged set. In my experience
      that combination is a bigger quality jump than upgrading the embedding model."</div>
    </div>
    <div class="qa-card">
      <div class="qa-question">You need to upgrade the embedding model on a live system. How?</div>
      <div class="qa-answer">"Never in place — old and new vectors are incompatible and there is no error to
      tell you. I build a parallel index with the new model, run the golden question set against both, and
      compare recall and faithfulness. If the new one wins, I repoint the search alias, which is an instant
      cutover and an instant rollback. I keep the model name and version stamped on every document so I can
      always tell which space a vector belongs to."</div>
    </div>
  </div>
</div>
`;
