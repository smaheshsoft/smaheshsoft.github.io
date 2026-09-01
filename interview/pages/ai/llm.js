window.Pages['ai-llm'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>Large Language Models</span></div>
  <h1>🧠 Large Language Models (LLM)</h1>
  <p>Tokens · Context windows · Model selection · Latency &amp; cost · Production patterns · Interview answers</p>
</div>

<div class="ref-section">
  <div class="ref-title">What An Architect Must Actually Know</div>
  <div class="ref-body">
    <p>You do not need to derive attention maths. You need to reason correctly about
    <b>tokens, context, determinism, latency and failure modes</b>, because every design decision
    downstream depends on them.</p>

    <div class="code-box">TOKEN
  ~4 characters / ~0.75 words in English. Code and non-English text cost more tokens.
  You pay per token IN (prompt) and per token OUT (completion) — usually output costs more.

CONTEXT WINDOW
  The maximum tokens for prompt + response combined.
  Bigger window ≠ better answers. Quality degrades when relevant facts are buried
  in a huge context ("lost in the middle"). Retrieve less, but retrieve right.

TEMPERATURE
  0.0-0.3  deterministic, factual — extraction, classification, grounded Q&A
  0.7-1.0  creative, varied      — brainstorming, marketing copy
  Enterprise default: LOW. Reproducibility matters more than flair.

STATELESS
  The model remembers nothing between calls. Conversation history is re-sent every turn,
  so a long chat gets progressively more expensive and slower. Summarise or window it.

NON-DETERMINISTIC
  Same input can give different output. Never assume exact-match responses.
  Force structure with JSON schema / structured outputs and validate in code.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Choosing A Model — The Real Trade-off</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1fr 1.3fr 1.3fr 1fr;">
        <div>Tier</div><div>Use For</div><div>Avoid For</div><div>Relative Cost</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr 1fr;">
        <div class="dt-name">Small / fast</div>
        <div>Classification, routing, extraction, tagging, simple rewrites</div>
        <div>Multi-step reasoning, nuanced judgement</div>
        <div class="dt-yes">Lowest</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr 1fr;">
        <div class="dt-name">Mid / balanced</div>
        <div>Grounded Q&amp;A, summarisation, most RAG workloads, tool calling</div>
        <div>Deep architectural reasoning, complex code generation</div>
        <div>Medium</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1fr 1.3fr 1.3fr 1fr;">
        <div class="dt-name">Frontier / large</div>
        <div>Agentic planning, hard reasoning, code migration, evaluation judge</div>
        <div>High-volume simple tasks — you are burning money</div>
        <div class="dt-no">Highest</div>
      </div>
    </div>

    <div class="tip-box">💡 The mature pattern is <b>model routing</b>: a cheap model handles the 80% of easy
    traffic and escalates only hard cases to the expensive one. This single decision often cuts spend by more
    than half without a measurable quality drop.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Real-World Use Cases</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-block"><div class="ans-label">Extraction &amp; structuring</div>
        Turn a PDF invoice, an email thread or an incident report into strict JSON.
        Replaces brittle regex and per-vendor parsers. Highest ROI, lowest risk — the
        output is machine-checkable.</div>

        <div class="ans-block"><div class="ans-label">Summarisation at scale</div>
        Nightly digests of tickets, alerts, PRs, customer feedback. Value comes from
        coverage: summarising things nobody had time to read.</div>

        <div class="ans-block"><div class="ans-label">Classification &amp; routing</div>
        Triage support tickets, route claims, tag content. Often replaces a
        custom-trained classifier — no labelled dataset, no retraining pipeline.</div>
      </div>
      <div>
        <div class="ans-block"><div class="ans-label">Grounded Q&amp;A</div>
        The RAG assistant pattern: answers cite internal documents. Most-requested
        enterprise use case, and the one most dependent on retrieval quality.</div>

        <div class="ans-block"><div class="ans-label">Code understanding</div>
        Explaining legacy modules, generating tests, drafting migration plans.
        Strong fit where a senior engineer reviews the output.</div>

        <div class="ans-block"><div class="ans-label">Natural-language to query</div>
        Users ask in English, the model emits SQL or KQL against a
        <b>read-only, allow-listed</b> schema. Never let generated SQL write.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Industry Benefits</div>
  <div class="ref-body">
    <div class="stats-bar">
      <div class="stat-box"><div class="num">1 model</div><div class="label">replaces many task-specific models</div></div>
      <div class="stat-box"><div class="num">Days</div><div class="label">to a working feature, vs months of labelling</div></div>
      <div class="stat-box"><div class="num">No retrain</div><div class="label">behaviour changes via prompt, not pipeline</div></div>
      <div class="stat-box"><div class="num">Any format</div><div class="label">unstructured input becomes structured output</div></div>
    </div>

    <p>The strategic benefit is <b>removal of the ML lifecycle</b> for a large class of problems. Previously,
    "classify these tickets" meant labelled data, training, versioning, drift monitoring and a data scientist.
    Now it is an API call with a well-written prompt and an evaluation set — which a platform team can own.</p>

    <div class="warn-box">⚠️ The trade-off is honest: you swap training cost for <b>inference cost, latency and
    vendor dependency</b>. A high-volume classifier may still be cheaper as a small fine-tuned model. Model the
    unit economics before committing.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">How To Use It In The Real World — Production Patterns</div>
  <div class="ref-body">
    <div class="ans-block"><div class="ans-label">1. Force structured output</div>
    <div class="code-box">// Ask for a schema, then validate. Never parse free text with string hacks.
var options = new ChatCompletionOptions {
    ResponseFormat = ChatResponseFormat.CreateJsonSchemaFormat(
        "ticket_triage",
        BinaryData.FromString(schemaJson),   // required fields, enums, types
        jsonSchemaIsStrict: true),
    Temperature = 0f
};

var result = await client.CompleteChatAsync(messages, options);

// Still validate — strict mode guards shape, not business rules.
if (!TryParse&lt;TicketTriage&gt;(result, out var triage) || !IsValidPriority(triage))
    return await RetryOnceOrFallbackToHuman(ticket);</div></div>

    <div class="ans-block"><div class="ans-label">2. Control the conversation window</div>
    <div class="code-box">Naive:  send all 60 turns every call → cost grows quadratically, latency climbs
Better: keep last N turns verbatim + a rolling summary of everything older

  if (history.TokenCount &gt; 6000) {
      var summary = await Summarise(history.Older);   // one cheap call
      history = new[] { summary }.Concat(history.Recent(8)).ToList();
  }</div></div>

    <div class="ans-block"><div class="ans-label">3. Design for failure</div>
    <div class="code-box">Failure mode              Mitigation
─────────────────────     ────────────────────────────────────────────
Rate limit (429)          Exponential backoff + secondary region deployment
Timeout / slow response   Stream tokens (SSE) so users see progress; hard cap
Malformed output          Strict schema + one retry + human fallback
Hallucination             Grounding (RAG) + citations + refusal instruction
Cost spike                Per-tenant token quota + alert on daily spend
Model deprecated          Pin version; abstract behind your own interface</div></div>

    <div class="tip-box">💡 Always stream long responses. Perceived latency is what users judge — first token in
    400ms with streaming beats a complete answer at 6 seconds, even though total time is similar.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answers</div>
  <div class="ref-body">
    <div class="qa-card">
      <div class="qa-question">How do you keep LLM costs under control at enterprise scale?</div>
      <div class="qa-answer">"Four levers, in order of impact. First, model routing — a small model handles
      routine traffic and only escalates hard cases, which is usually the biggest saving. Second, control the
      context: retrieve six good chunks rather than fifty mediocre ones, and summarise old conversation turns
      instead of resending them. Third, cache — semantically similar questions hit a cache rather than the
      model. Fourth, govern — per-tenant token quotas, max output tokens on every call, and a dashboard on cost
      per conversation so a regression is visible the same day, not at month end."</div>
    </div>
    <div class="qa-card">
      <div class="qa-question">The model returns different output for the same input. How do you build a
      reliable system on that?</div>
      <div class="qa-answer">"You stop treating it as a function and treat it as an unreliable dependency —
      the same discipline as an external API. Temperature near zero, strict JSON schema so the shape is
      guaranteed, validation in code for business rules, one retry, then a deterministic fallback or human
      handoff. Anything consequential gets a review step. And you test statistically with an evaluation set
      rather than asserting on exact strings."</div>
    </div>
  </div>
</div>
`;
