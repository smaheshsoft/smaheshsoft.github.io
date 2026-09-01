window.Pages['ai-foundry'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>Azure AI Foundry</span></div>
  <h1>🏭 Microsoft / Azure AI Foundry</h1>
  <p>What it adds over raw endpoints · Model catalogue · Agents · Evaluation · Governance · Interview answers</p>
</div>

<div class="ref-section">
  <div class="ref-title">What It Is</div>
  <div class="ref-body">
    <p>Azure AI Foundry is Microsoft's platform layer for building, evaluating and operating AI applications.
    Where Azure OpenAI gives you <b>a model endpoint</b>, Foundry gives you the <b>surrounding lifecycle</b>:
    a multi-vendor model catalogue, a managed agent runtime, evaluation tooling, tracing, content safety and
    governance in one workspace.</p>

    <div class="code-box">RAW ENDPOINT ONLY                 WITH FOUNDRY
You build:                        Platform provides:
  model selection harness           Catalogue: OpenAI, Llama, Mistral, Phi, Cohere…
  agent loop + state                Managed agents: threads, tools, state
  evaluation harness                Built-in evaluators + your own datasets
  tracing plumbing                  Tracing of prompts, tools, tokens, latency
  safety integration                Content safety wired in
  deployment governance             Project-scoped RBAC, quotas, cost visibility</div>

    <div class="tip-box">🧠 Framing for an interview: "Azure OpenAI is the model. Foundry is the
    <b>application platform</b> around it — catalogue, agents, evaluation and governance. You can build all of
    that yourself; Foundry is the decision to buy that layer rather than maintain it."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">The Pieces That Matter To An Architect</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.7fr 1.3fr;">
        <div>Capability</div><div>What It Gives You</div><div>Why It Matters</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr;">
        <div class="dt-name">Model catalogue</div>
        <div>Many vendors and open models behind one consistent API and one billing surface</div>
        <div>Swap or A/B models without a new procurement cycle</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr;">
        <div class="dt-name">Agent service</div>
        <div>Managed agents with threads, tool calling, file handling, persistent state</div>
        <div>You stop building and operating your own agent state store</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr;">
        <div class="dt-name">Evaluation</div>
        <div>Groundedness, relevance, coherence, safety scores over a dataset</div>
        <div class="dt-yes">Turns "seems better" into a number you can gate on</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr;">
        <div class="dt-name">Tracing</div>
        <div>End-to-end view of prompt, retrieval, tool calls, tokens, latency</div>
        <div>Debugging non-deterministic systems without homemade logging</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr;">
        <div class="dt-name">Content safety</div>
        <div>Harm categories, jailbreak and injection detection, custom blocklists</div>
        <div>A control you can show to risk and compliance</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr;">
        <div class="dt-name">Projects &amp; RBAC</div>
        <div>Workspace isolation, scoped access, per-project quota and cost</div>
        <div>Multiple teams share the platform without stepping on each other</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Evaluation — The Feature Worth Adopting First</div>
  <div class="ref-body">
    <p>Most teams ship AI features with no objective quality gate. Foundry's evaluation tooling is the fastest
    route from opinion to measurement, and it is what makes a change reviewable.</p>

    <div class="code-box">EVALUATOR              MEASURES                          CATCHES
Groundedness           Is the answer supported by the      Hallucination, weak retrieval
                       retrieved context?
Relevance              Does it answer the question asked?  Off-topic, evasive answers
Retrieval              Did search return the right docs?   Chunking and index problems
Coherence / fluency    Is it well-formed?                  Rare with modern models
Safety                 Harmful content categories          Policy violations
Custom                 Your business rules                 Format, disclaimers, refusals

WORKFLOW
  1. Build a dataset of real questions with expected answers or reference context
  2. Run evaluation on every prompt, model, chunking or retrieval change
  3. Gate the release on score thresholds
  4. Re-run after any model version upgrade — behaviour can shift underneath you</div>

    <div class="warn-box">⚠️ Automated evaluators are useful but imperfect — an LLM judging an LLM inherits some
    of the same blind spots. Keep a smaller human-reviewed sample alongside the automated scores, especially
    for anything customer-facing or regulated.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Real-World Use Cases</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-block"><div class="ans-label">Model bake-off before committing</div>
        Run the same evaluation dataset across three models from the catalogue and
        choose on measured groundedness and cost, not on marketing.</div>
        <div class="ans-block"><div class="ans-label">Enterprise assistant estate</div>
        Several business units each get a project with their own data, quota and
        access, on shared, governed infrastructure.</div>
      </div>
      <div>
        <div class="ans-block"><div class="ans-label">Managed agents for internal tools</div>
        Ops and support agents with tool calling and persistent threads, without
        building a durable state layer first.</div>
        <div class="ans-block"><div class="ans-label">Safety and quality gates in CI</div>
        Evaluation runs on every pull request that touches a prompt, so quality
        regressions are blocked before release.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Industry Benefits — And The Honest Trade-off</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-block"><div class="ans-label">Faster to production</div>
        Evaluation, tracing and agent state are the parts teams under-estimate.
        Buying them removes months of platform work.</div>
        <div class="ans-block"><div class="ans-label">Vendor optionality</div>
        A catalogue behind one API keeps model choice a technical decision rather
        than a contract renegotiation.</div>
        <div class="ans-block"><div class="ans-label">Auditability</div>
        Traces and evaluation history give risk teams evidence, not assurances.</div>
      </div>
      <div>
        <div class="ans-block"><div class="ans-label">⚖️ Platform lock-in</div>
        Agents, threads and evaluation assets are Foundry-shaped. Keep your
        orchestration behind your own interface so the core remains portable.</div>
        <div class="ans-block"><div class="ans-label">⚖️ Less control</div>
        A managed agent runtime is convenient until you need behaviour it does not
        expose. Know which parts you must own.</div>
        <div class="ans-block"><div class="ans-label">⚖️ Moving target</div>
        The platform evolves quickly. Pin versions and re-run evaluations after
        platform updates.</div>
      </div>
    </div>

    <div class="tip-box">💡 Pragmatic position: adopt Foundry for <b>evaluation, tracing, safety and the model
    catalogue</b> early — those are pure gain. Be more deliberate about handing over the agent loop itself if
    your orchestration needs are unusual.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answers</div>
  <div class="ref-body">
    <div class="qa-card">
      <div class="qa-question">When would you use Azure AI Foundry rather than calling Azure OpenAI directly?</div>
      <div class="qa-answer">"Directly, for a single narrow feature where I already have orchestration,
      observability and an evaluation harness — adding a platform there is overhead. Foundry once there are
      multiple AI use cases across teams, because then I need a model catalogue to compare and swap models, a
      shared evaluation capability so quality is measurable and gated in CI, tracing across retrieval and tool
      calls, content safety, and project-level RBAC, quota and cost attribution. That is a platform investment
      I would otherwise have to build and staff. I would still keep my orchestration behind my own interface so
      the application core stays portable."</div>
    </div>
    <div class="qa-card">
      <div class="qa-question">How do you decide which model to use for a workload?</div>
      <div class="qa-answer">"Empirically. I build an evaluation dataset from real traffic with expected
      answers, then run candidate models across it scoring groundedness, relevance, format compliance, latency
      and cost per request. The catalogue makes that a configuration exercise rather than an integration
      project. Usually the outcome is not a single model but a routing policy — a cheap model for the routine
      majority, escalating to a stronger one for the hard cases, which is where most of the cost saving comes
      from."</div>
    </div>
  </div>
</div>
`;
