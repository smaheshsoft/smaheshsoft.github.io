window.Pages['ai-orchestration'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>AI Agents &amp; Orchestration</span></div>
  <h1>🎛️ AI Agents &amp; Orchestration</h1>
  <p>Patterns · Multi-agent · Frameworks · State &amp; durability · Interview answers</p>
</div>

<div class="ref-section">
  <div class="ref-title">Orchestration Patterns — Pick The Simplest That Works</div>
  <div class="ref-body">
    <div class="code-box">1. CHAIN (deterministic pipeline)
   extract → validate → summarise → format
   Known steps, no branching. Cheapest, testable. Start here.

2. ROUTER
   classify intent → dispatch to the right specialised handler
   One cheap model call decides; each branch is simple and independently testable.

3. TOOL-CALLING AGENT
   One model + a tool catalogue + a bounded loop.
   Covers the large majority of real "agent" requirements.

4. PLANNER / EXECUTOR
   A strong model writes a plan; a cheaper model executes each step.
   Good cost profile when planning is hard but steps are routine.

5. MULTI-AGENT (supervisor + specialists)
   Supervisor delegates to Research / SQL / Writer agents.
   Powerful and expensive. Justify it — most problems do not need it.

6. REFLECTION / CRITIC
   Generate → a second pass critiques → revise.
   Doubles cost, meaningfully raises quality on writing and code tasks.</div>

    <div class="warn-box">⚠️ Multi-agent is the most over-applied pattern in the field. Each additional agent adds
    latency, cost, and a new place for context to be lost in translation. Use one agent with good tools until you
    can demonstrate it is the bottleneck.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">When Multi-Agent Genuinely Helps</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-block"><div class="ans-label">✅ Distinct expertise and toolsets</div>
        A SQL agent with database tools and a writing agent with document tools have
        genuinely different prompts, permissions and failure modes.</div>
        <div class="ans-block"><div class="ans-label">✅ Parallelisable work</div>
        Five documents analysed concurrently by five workers, then merged — real
        wall-clock gain.</div>
        <div class="ans-block"><div class="ans-label">✅ Adversarial review</div>
        A separate critic with no stake in the first answer catches errors the author
        will not.</div>
      </div>
      <div>
        <div class="ans-block"><div class="ans-label">❌ "It feels more organised"</div>
        Splitting a prompt into three roles that all call the same tools adds cost and
        latency for no capability gain.</div>
        <div class="ans-block"><div class="ans-label">❌ Sequential hand-offs</div>
        A → B → C where each waits for the last is just a chain with extra token
        overhead and lossy summaries between hops.</div>
        <div class="ans-block"><div class="ans-label">❌ To fix a weak prompt</div>
        More agents will not rescue unclear instructions or bad retrieval.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Framework Choice</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div>Option</div><div>Strength</div><div>Consider When</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Semantic Kernel</div>
        <div>First-class .NET, plugin model, fits Azure and enterprise DI patterns</div>
        <div>You are a .NET shop — lowest friction, easiest to hand to the team</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Azure AI Foundry Agents</div>
        <div>Managed agent runtime, threads, tools, tracing built in</div>
        <div>You want the platform to own state and observability</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">LangChain / LangGraph</div>
        <div>Largest ecosystem; LangGraph gives explicit state-machine control</div>
        <div>Python teams, or you need graph-shaped control flow</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Direct SDK + your code</div>
        <div>No abstraction tax, total control, trivial to debug</div>
        <div class="dt-yes">Underrated. A tool loop is ~200 lines</div>
      </div>
    </div>

    <div class="tip-box">💡 Frameworks move fast and break. Keep your orchestration behind your own interface so
    swapping the framework is a contained change — the same discipline you would apply to any volatile
    dependency.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">State, Durability And Long-Running Work</div>
  <div class="ref-body">
    <p>An agent run can take minutes and pause for human approval. That makes it a
    <b>long-running workflow</b>, and it needs the same treatment you would give any distributed process.</p>

    <div class="code-box">WHAT MUST SURVIVE A RESTART
  Conversation / step history      Approval state (pending, approved, rejected)
  Tool results already obtained    Budget consumed so far
  Idempotency keys issued          The final result

WHERE TO PUT IT
  Cosmos DB / PostgreSQL   durable run + step records, queryable for audit
  Durable Functions        built-in checkpointing, timers, external events
  Redis                    hot short-term context only, never system of record

APPROVAL AS AN EXTERNAL EVENT
  run.status = AwaitingApproval  → persist → return to caller
  Approver acts  → event resumes the run from the stored checkpoint
  Do NOT hold an HTTP request or an in-memory loop open waiting for a human.</div>

    <div class="ans-block"><div class="ans-label">Idempotency on every write tool</div>
    <div class="code-box">// A retried step must not create a second ticket or a second refund.
var key = Hash(runId, stepIndex, toolName, argsJson);
if (await store.TryGetResultAsync(key) is { } cached) return cached;

var result = await tool.ExecuteAsync(args);
await store.SaveResultAsync(key, result);
return result;</div></div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Real-World Use Cases &amp; Industry Benefits</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.7fr 1.3fr;">
        <div>Use Case</div><div>Orchestration Shape</div><div>Benefit</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.7fr 1.3fr;">
        <div class="dt-name">Document processing</div>
        <div>Chain: OCR → extract → validate → route, with an agent step only for exceptions</div>
        <div>Straight-through processing with human effort only on the hard cases</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.7fr 1.3fr;">
        <div class="dt-name">Support assistant</div>
        <div>Router → RAG answer, order lookup, or human handoff</div>
        <div>Cheap model handles routing; specialists stay simple and testable</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.7fr 1.3fr;">
        <div class="dt-name">Ops investigation</div>
        <div>Tool-calling agent over logs, metrics, deployments and past incidents</div>
        <div>Minutes of cross-system context assembly compressed into seconds</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.7fr 1.3fr;">
        <div class="dt-name">Report generation</div>
        <div>Parallel workers per data source → merge → critic pass → publish</div>
        <div>Wall-clock gain from parallelism, quality gain from the critic</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.7fr 1.3fr;">
        <div class="dt-name">Code migration</div>
        <div>Planner lists files; executor transforms each; tests gate the merge</div>
        <div>Scales to work no team would take on manually</div>
      </div>
    </div>

    <div class="tip-box">💡 Benefit worth stating to a business audience: orchestration turns AI from a
    <b>conversation</b> into a <b>process participant</b> — it plugs into existing workflows with the same
    audit, approval and SLA expectations as any other system component.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answers</div>
  <div class="ref-body">
    <div class="qa-card">
      <div class="qa-question">Design an orchestration layer for enterprise AI features.</div>
      <div class="qa-answer">"A single service that every AI feature goes through, so governance is in one
      place. It owns model routing and fallback, retrieval, the tool registry with per-tool authorisation,
      guardrails in and out, token budgets and quotas per tenant, caching, tracing and audit. Features declare
      what they need declaratively rather than calling the model SDK directly. State for long-running runs goes
      into Cosmos or Durable Functions with checkpointing so an approval pause survives a restart, and every
      write tool takes an idempotency key. The model provider sits behind my own interface, so switching
      providers or model versions is a config change, not a rewrite across twenty features."</div>
    </div>
    <div class="qa-card">
      <div class="qa-question">When would you not use a multi-agent architecture?</div>
      <div class="qa-answer">"Almost by default. If one model with a good tool catalogue can do the job, extra
      agents just add latency, cost and lossy hand-offs. I move to multi-agent only for genuinely different
      expertise with different tools and permissions, for parallel work where wall clock matters, or for an
      independent critic. And I would rather run a deterministic workflow with one agentic step than a swarm —
      it is cheaper, easier to test, and far easier to explain to an auditor."</div>
    </div>
  </div>
</div>
`;
