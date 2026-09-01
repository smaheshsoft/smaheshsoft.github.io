window.Pages['ai-cost-performance'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>LLM Cost &amp; Performance</span></div>
  <h1>⚡ LLM Cost &amp; Performance Optimization</h1>
  <p>Cost model · Routing · Caching · Latency · FinOps for AI · Interview answers</p>
</div>

<div class="ref-section">
  <div class="ref-title">Understand The Cost Model First</div>
  <div class="ref-body">
    <div class="code-box">COST PER CALL = (prompt tokens × input rate) + (completion tokens × output rate)

  Output tokens usually cost several times more than input tokens.
  So verbosity is expensive twice: you pay for it, and users wait for it.

WHAT SILENTLY INFLATES THE PROMPT
  Full conversation history resent every turn        ← grows every message
  Twenty retrieved chunks "just in case"             ← the usual culprit
  A 900-token system prompt on a trivial endpoint
  Raw tool output pasted in unfiltered (500-row dumps)
  Few-shot examples that were never pruned

UNIT ECONOMICS — the number to actually manage
  Cost per conversation, or cost per completed task.
  Total monthly spend hides everything. A 20% traffic rise and a
  20% prompt bloat look identical on a monthly chart.</div>

    <div class="warn-box">⚠️ The most common production surprise is not traffic growth — it is a prompt or
    retrieval change that adds a few hundred tokens per request. At a million calls a month that is a large,
    invisible increase. Chart <b>tokens per request</b> and alert on it.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">The Optimisation Levers — In Order Of Impact</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:0.4fr 1.1fr 1.7fr 1fr;">
        <div>#</div><div>Lever</div><div>What You Do</div><div>Typical Effect</div>
      </div>
      <div class="dt-row" style="grid-template-columns:0.4fr 1.1fr 1.7fr 1fr;">
        <div class="dt-name">1</div><div>Model routing</div>
        <div>Cheap model for routine traffic, escalate only hard cases</div>
        <div class="dt-yes">Largest single saving</div>
      </div>
      <div class="dt-row" style="grid-template-columns:0.4fr 1.1fr 1.7fr 1fr;">
        <div class="dt-name">2</div><div>Context discipline</div>
        <div>Retrieve 5 good chunks, not 25; summarise old turns</div>
        <div class="dt-yes">Large, and usually improves quality</div>
      </div>
      <div class="dt-row" style="grid-template-columns:0.4fr 1.1fr 1.7fr 1fr;">
        <div class="dt-name">3</div><div>Caching</div>
        <div>Exact and semantic cache for repeated questions</div>
        <div>Large on FAQ-shaped traffic</div>
      </div>
      <div class="dt-row" style="grid-template-columns:0.4fr 1.1fr 1.7fr 1fr;">
        <div class="dt-name">4</div><div>Output limits</div>
        <div>Cap max tokens; instruct brevity explicitly</div>
        <div>Moderate, and improves latency</div>
      </div>
      <div class="dt-row" style="grid-template-columns:0.4fr 1.1fr 1.7fr 1fr;">
        <div class="dt-name">5</div><div>Batch offline work</div>
        <div>Move non-interactive jobs to the batch tier</div>
        <div>Significant discount where applicable</div>
      </div>
      <div class="dt-row" style="grid-template-columns:0.4fr 1.1fr 1.7fr 1fr;">
        <div class="dt-name">6</div><div>Skip the model</div>
        <div>Rules, regex or a lookup where no reasoning is needed</div>
        <div class="dt-yes">100% saving on that path</div>
      </div>
    </div>

    <div class="tip-box">💡 Lever 6 is the one architects forget. Not every request needs a model. A deterministic
    classifier, a database lookup or a template answer is faster, cheaper and fully testable — reserve the model
    for what genuinely requires language understanding.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Caching — Three Layers</div>
  <div class="ref-body">
    <div class="code-box">1. EXACT CACHE
   Key = hash(model + prompt version + normalised input + retrieved doc versions)
   Trivial to implement, zero quality risk. Include doc versions in the key so a
   document update invalidates stale answers.

2. SEMANTIC CACHE
   Embed the question; if cosine similarity to a cached question is high, reuse.
   Powerful on support and FAQ traffic where wording varies but intent repeats.
   ⚠️ Set the threshold conservatively and scope the cache per tenant and per user
      permission set — a loose threshold returns a confidently wrong cached answer.

3. PROMPT / CONTEXT CACHING (provider feature)
   Reuse of a long stable prefix (system prompt, standing instructions) at reduced
   cost. Structure prompts as STABLE PREFIX first, variable content last, so the
   cacheable portion is as long as possible.

ALWAYS
  Cache per tenant. Never let one tenant's answer serve another's question.
  Record cache hit rate — it is a first-class cost metric.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Latency — What Users Actually Feel</div>
  <div class="ref-body">
    <div class="code-box">TIME TO FIRST TOKEN (TTFT)  ← this is what feels like "speed"
TOKENS PER SECOND           ← this is what feels like "flow"
TOTAL TIME                  ← what your dashboard measures, and users notice least

TACTICS
  Stream (SSE) always for anything over a sentence.
    400ms to first token beats a 6s complete response, even at equal total time.
  Do retrieval and any independent tool calls in parallel, not in sequence.
  Cap output tokens — generation time is roughly linear in tokens produced.
  Smaller model = lower latency as well as lower cost. Route accordingly.
  Pre-warm and reuse HTTP clients; connection setup is measurable at p99.
  PTU / provisioned capacity removes noisy-neighbour variance from p95.

BUDGET EXAMPLE (grounded answer)
  Retrieval          80-150ms
  Re-rank            30-60ms
  Model TTFT         300-600ms
  Streamed output    ~40 tokens/s
  → user sees text in under a second; full answer streams in
    while they are already reading.</div>

    <div class="warn-box">⚠️ Do not put a synchronous LLM call in a hot path that has a tight SLA and no
    streaming affordance — a checkout flow, a login, a payment authorisation. If AI output is needed there,
    compute it asynchronously and cache it, or degrade gracefully when it is not ready.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">FinOps For AI — Governing Spend</div>
  <div class="ref-body">
    <div class="code-box">ATTRIBUTE
  Log tokens and cost per request with tenant, feature, user and prompt version.
  Without attribution you cannot answer "which feature caused this increase?"

BUDGET
  Per-tenant and per-feature token quotas enforced at the gateway, not only in code.
  Hard stop or graceful degradation on breach — never an unbounded bill.

ALERT
  Daily spend anomaly · tokens per request regression · cache hit rate drop
  Cost per completed task trending up

REVIEW
  Monthly: top 10 endpoints by spend, and what each is worth.
  A feature costing more than the work it replaces should be re-scoped or retired.

FORECAST
  cost/month ≈ requests/day × avg tokens/request × blended rate × 30
  Model it before launch, then compare against actuals in week one.</div>

    <div class="tip-box">💡 Present AI spend to the business as <b>cost per completed task</b> against the manual
    baseline. "₹4 per triaged ticket versus 12 minutes of an engineer's time" is a decision a sponsor can make.
    A monthly total is not.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answers</div>
  <div class="ref-body">
    <div class="qa-card">
      <div class="qa-question">AI spend has tripled month over month. How do you investigate?</div>
      <div class="qa-answer">"First separate volume from efficiency, because they need different fixes. I chart
      requests per day against tokens per request — if requests are flat and tokens per request jumped, it is a
      regression, typically a prompt change or a retrieval change that widened the context, and I can find the
      release from the prompt version stamped on every log line. Then I break spend down by feature and tenant
      to see whether it is broad or one endpoint. Fixes in order: routing cheap traffic to a smaller model,
      trimming retrieved context, enabling or repairing the cache, capping output tokens, and moving anything
      non-interactive to batch. Then I add the guardrail that was missing: per-tenant quotas and an alert on
      tokens per request so the next regression is caught in a day."</div>
    </div>
    <div class="qa-card">
      <div class="qa-question">How do you reduce latency for a RAG assistant?</div>
      <div class="qa-answer">"Stream first — time to first token is what users judge, and streaming changes the
      perceived experience more than any backend optimisation. Then parallelise: retrieval and any independent
      tool calls run concurrently rather than in sequence. Keep the retrieved set small, because a bloated
      prompt costs both money and time to process. Cap output tokens since generation time scales with them.
      Route simple queries to a smaller, faster model. And use provisioned capacity for the interactive path so
      p95 is not at the mercy of shared-tier neighbours."</div>
    </div>
  </div>
</div>
`;
