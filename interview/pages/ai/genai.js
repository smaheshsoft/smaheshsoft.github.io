window.Pages['ai-genai'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>Generative AI</span></div>
  <h1>✨ Generative AI</h1>
  <p>What it is · How it works · Real-world use cases · Industry benefits · How to apply · Interview answers</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">Prompt + Context</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step blue">LLM (generates)</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step green">New Content</div>
    </div>
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">📝</div><div class="principle-name">Text</div><p>Drafts, summaries, code</p></div>
      <div class="principle-card"><div class="principle-icon">💬</div><div class="principle-name">Conversation</div><p>Chat, Q&amp;A assistants</p></div>
      <div class="principle-card"><div class="principle-icon">🗂️</div><div class="principle-name">Structured Data</div><p>JSON extraction, forms</p></div>
      <div class="principle-card"><div class="principle-icon">🎨</div><div class="principle-name">Media</div><p>Images, audio, video</p></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">What It Is — In Plain Terms</div>
  <div class="ref-body">
    <p>Generative AI produces <b>new content</b> — text, code, images, audio, structured data — rather than
    only classifying or predicting from a fixed set of labels. Traditional ML answers
    "which bucket does this belong to?"; generative AI answers "produce something that fits this request".</p>

    <div class="code-box">Discriminative AI (classic ML)          Generative AI
─────────────────────────────          ────────────────────────────
Input  → label                          Prompt → generated content
"Is this invoice fraudulent?"           "Draft a dispute letter for this invoice"
Output: yes / no + confidence           Output: paragraphs of new text
Trained per task                        One model, many tasks (zero/few-shot)
Needs labelled data per task            Needs prompts, not retraining</div>

    <p>For an architect the important shift is this: <b>the model is a general-purpose capability, not a
    feature</b>. You do not train a model per use case. You integrate one model and steer it with context,
    instructions and tools — which moves the engineering effort from data science into
    <b>systems design, data plumbing, security and cost control</b>.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">How It Works — The Architect's View</div>
  <div class="ref-body">
    <div class="code-box">REQUEST PATH
  User / system
      │
      ▼
  [ Orchestration layer ]  ← your code. Owns: auth, routing, retries, budget, logging
      │
      ├─► Retrieval    (RAG: fetch grounding facts from your data)
      ├─► Tools        (MCP / function calling: query DB, call API, run action)
      ├─► Guardrails   (PII strip, prompt-injection checks, content safety)
      │
      ▼
  [ Model endpoint ]  Azure OpenAI / Azure AI Foundry
      │
      ▼
  Post-processing → schema validation → cache → response + citations + audit log

WHAT YOU CONTROL                        WHAT THE MODEL CONTROLS
System prompt and instructions          Wording, structure, reasoning path
Which context is retrieved              How it weighs that context
Which tools are exposed                 When to call them
Output schema and validation            First-draft content
Token budget, model tier, caching       Latency per token</div>

    <div class="tip-box">🧠 Key mental model: the model is <b>stateless</b>. Every call carries its whole world in
    the prompt. Memory, personalisation, history and freshness are all <b>your architecture's job</b>, not the
    model's.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Real-World Use Cases — By Industry</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.6fr 1.5fr;">
        <div>Industry</div><div>Use Case</div><div>Why Generative AI Fits</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.5fr;">
        <div class="dt-name">Energy / Mobility</div>
        <div>Ops assistant over station telemetry, SOPs and incident history</div>
        <div>Engineers ask in plain language instead of querying five systems</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.5fr;">
        <div class="dt-name">Banking</div>
        <div>Summarising KYC packs, drafting dispute responses, policy Q&amp;A for agents</div>
        <div>High document volume, repetitive writing, strict template compliance</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.5fr;">
        <div class="dt-name">Healthcare</div>
        <div>Clinical note drafting, discharge summaries, coding assistance</div>
        <div>Documentation is the bottleneck, not the clinical decision</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.5fr;">
        <div class="dt-name">Insurance</div>
        <div>Claim intake triage, damage-report summarisation, policy Q&amp;A</div>
        <div>Unstructured input (emails, PDFs, photos) turned into structured decisions</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.5fr;">
        <div class="dt-name">Retail / E-comm</div>
        <div>Product description generation, review summarisation, conversational search</div>
        <div>Catalogue scale makes manual authoring impossible</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.5fr;">
        <div class="dt-name">Engineering orgs</div>
        <div>Code review assist, test generation, legacy code explanation, migration support</div>
        <div>Reading and explaining code is where senior time is lost</div>
      </div>
    </div>

    <div class="warn-box">⚠️ The pattern that works: <b>generative AI drafts, a human approves</b>. The pattern that
    fails: letting the model take an irreversible action with no review step. Choose use cases where a wrong
    output is <b>cheap to catch and cheap to correct</b>.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Industry Benefits — What Actually Moves</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-block"><div class="ans-label">Cycle-time reduction</div>
        Work that is "read a lot, write a summary" compresses hardest. Drafting, triage,
        first-pass review and knowledge lookup are where measurable time comes back.</div>

        <div class="ans-block"><div class="ans-label">Knowledge reach</div>
        Expertise trapped in wikis, tickets and senior engineers' heads becomes queryable by everyone.
        Onboarding and tier-1 support improve without adding headcount.</div>
      </div>
      <div>
        <div class="ans-block"><div class="ans-label">Coverage, not just speed</div>
        Work nobody had time for gets done: every ticket summarised, every contract checked,
        every log anomaly explained. This is often the larger win.</div>

        <div class="ans-block"><div class="ans-label">Consistency</div>
        Output follows the same structure and tone every time — valuable in regulated
        documentation where format compliance is itself a cost.</div>
      </div>
    </div>

    <div class="tip-box">💡 Be careful about claiming headcount reduction. The defensible business case is
    <b>throughput per person</b> and <b>coverage of previously-skipped work</b> — that is also what survives
    scrutiny in a steering committee.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">How To Use It In The Real World — Delivery Playbook</div>
  <div class="ref-body">
    <div class="code-box">STEP 1 — PICK THE RIGHT FIRST USE CASE
  ✅ High volume, repetitive, text-heavy
  ✅ A human already reviews the output
  ✅ Ground truth exists so you can measure quality
  ❌ Irreversible actions, legal finality, no reviewer

STEP 2 — GROUND IT IN YOUR DATA
  Plain LLM = generic answers + hallucination risk.
  Add RAG so answers cite your documents. Biggest single quality lever.

STEP 3 — DEFINE "GOOD" BEFORE YOU BUILD
  Build an evaluation set of 50-200 real questions with accepted answers.
  Without this you cannot tell whether a prompt change helped or hurt.

STEP 4 — WRAP IT IN ENTERPRISE CONTROLS
  Identity-scoped retrieval (users only see what they may see)
  Content safety in and out · PII handling · full audit trail
  Token budgets and per-tenant quotas

STEP 5 — SHIP NARROW, THEN WIDEN
  One department, one document set, visible feedback button.
  Expand only when evaluation scores hold at real traffic.

STEP 6 — OPERATE IT
  Monitor: answer quality, refusal rate, latency p95, cost per conversation,
  retrieval hit rate, thumbs-down clusters. Treat prompts as versioned artefacts.</div>

    <div class="ans-block"><div class="ans-label">Minimal production shape (.NET)</div>
    <div class="code-box">// 1. Retrieve grounding context (identity-filtered)
var chunks = await search.SearchAsync(query, filter: tenantFilter, top: 6);

// 2. Build the prompt: system rules + grounded context + user question
var messages = new List&lt;ChatMessage&gt; {
    new SystemChatMessage(SystemPrompt),                  // rules, tone, refusal policy
    new SystemChatMessage("Context:" + Join(chunks)),     // the facts it may use
    new UserChatMessage(query)
};

// 3. Call the model with an explicit budget
var resp = await client.CompleteChatAsync(messages,
    new ChatCompletionOptions { Temperature = 0.2f, MaxOutputTokenCount = 800 });

// 4. Validate, cite, log
var answer = Validate(resp);                  // schema / safety / empty check
await audit.LogAsync(tenantId, userId, query, answer, resp.Usage);
return new { answer, citations = chunks.Select(c =&gt; c.Source) };</div></div>

    <div class="warn-box">⚠️ Temperature 0.2 and an explicit token cap are deliberate. Defaults give you creative
    variance and unbounded spend — neither is what an enterprise workload wants.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answers</div>
  <div class="ref-body">
    <div class="qa-card">
      <div class="qa-question">How would you introduce Generative AI into an enterprise platform?</div>
      <div class="qa-answer">"I start from the workflow, not the model. I look for high-volume, text-heavy work
      that already has a human reviewer — fast value with a safety net. Architecturally I put an orchestration
      layer between the app and the model so retrieval, guardrails, tool access, audit and cost control are mine
      to govern, and the model stays swappable. I ground answers with RAG over our own data with identity-scoped
      filtering, define an evaluation set before building so quality is measurable, and ship to one department
      first. On Azure that is Azure OpenAI or AI Foundry behind APIM, Azure AI Search as the vector store, and
      Managed Identity throughout — no keys in config."</div>
    </div>
    <div class="qa-card">
      <div class="qa-question">What is the biggest risk, and how do you mitigate it?</div>
      <div class="qa-answer">"Confident wrong answers. Mitigation is layered: ground every answer in retrieved
      context, require citations, instruct the model to refuse when context is insufficient, validate the output
      shape in code, and keep a human approval step for anything consequential. Then measure — refusal rate and
      thumbs-down clusters show where grounding is failing before users lose trust."</div>
    </div>
    <div class="tip-box">✅ Strong closing line: "The model is the easy part. The architecture around it —
    grounding, identity, evaluation and cost governance — is what makes it an enterprise system."</div>
  </div>
</div>
`;
