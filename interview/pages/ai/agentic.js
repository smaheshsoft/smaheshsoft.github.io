window.Pages['ai-agentic'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>Agentic AI</span></div>
  <h1>🤖 Agentic AI</h1>
  <p>Autonomy levels · Loop design · Guardrails · Use cases · Failure modes · Interview answers</p>
</div>

<div class="ref-section">
  <div class="ref-title">What Makes A System "Agentic"</div>
  <div class="ref-body">
    <p>A chatbot answers. An <b>agent decides what to do next</b>. Given a goal, it plans steps, calls tools,
    observes results and loops until the goal is met or a limit is hit. The defining property is not
    intelligence — it is <b>control of the loop</b>.</p>

    <div class="code-box">CHATBOT                          AGENT
Prompt → answer                  Goal → plan → act → observe → repeat → result
One model call                   Many calls, unpredictable count
Cost known upfront               Cost depends on how long it loops
Deterministic path               Path chosen at runtime by the model
Fails visibly                    Can fail silently, expensively, or half-way

THE LOOP
  ┌─────────────────────────────────────────────┐
  │ 1. Model receives goal + tool catalogue      │
  │ 2. Model chooses a tool and arguments        │
  │ 3. YOUR CODE validates and executes it       │  ← the control point
  │ 4. Result is appended to context             │
  │ 5. Model decides: another tool, or finish?   │
  └──────────────── loop, with hard caps ────────┘</div>

    <div class="tip-box">🧠 Step 3 is where architecture lives. The model never touches your systems directly —
    it emits an <i>intent</i>, and your code decides whether that intent is permitted, valid and affordable.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Autonomy Levels — Choose Deliberately</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:0.5fr 1fr 1.6fr 1.2fr;">
        <div>L</div><div>Level</div><div>What It Does</div><div>Where To Use</div>
      </div>
      <div class="dt-row" style="grid-template-columns:0.5fr 1fr 1.6fr 1.2fr;">
        <div class="dt-name">0</div><div>Read-only</div>
        <div>Queries data, answers questions. No writes.</div>
        <div class="dt-yes">Start here. Almost always safe</div>
      </div>
      <div class="dt-row" style="grid-template-columns:0.5fr 1fr 1.6fr 1.2fr;">
        <div class="dt-name">1</div><div>Suggest</div>
        <div>Drafts the action, human clicks approve</div>
        <div class="dt-yes">Best value-to-risk ratio in enterprise</div>
      </div>
      <div class="dt-row" style="grid-template-columns:0.5fr 1fr 1.6fr 1.2fr;">
        <div class="dt-name">2</div><div>Act, reversible</div>
        <div>Executes low-risk, undoable actions autonomously</div>
        <div>Create draft ticket, add a comment, tag a record</div>
      </div>
      <div class="dt-row" style="grid-template-columns:0.5fr 1fr 1.6fr 1.2fr;">
        <div class="dt-name">3</div><div>Act, consequential</div>
        <div>Refunds, config changes, customer-visible messages</div>
        <div class="dt-no">Only with approval gates and hard limits</div>
      </div>
      <div class="dt-row" style="grid-template-columns:0.5fr 1fr 1.6fr 1.2fr;">
        <div class="dt-name">4</div><div>Fully autonomous</div>
        <div>Multi-step goals with no human in the loop</div>
        <div class="dt-no">Rare in regulated enterprise. Justify hard</div>
      </div>
    </div>

    <div class="warn-box">⚠️ Most production value sits at <b>levels 0-2</b>. Teams that jump to level 4 usually
    end up rebuilding at level 1 after the first incident. Design the approval gate first; relax it later with
    evidence.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Real-World Use Cases</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.9fr 0.9fr;">
        <div>Scenario</div><div>What The Agent Does</div><div>Level</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.9fr 0.9fr;">
        <div class="dt-name">Incident triage</div>
        <div>Reads the alert, queries logs and metrics, checks recent deployments, correlates with past incidents, posts a diagnosis with evidence</div>
        <div class="dt-yes">0-1</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.9fr 0.9fr;">
        <div class="dt-name">Field service</div>
        <div>Given a station fault, pulls telemetry, matches the SOP, checks part availability, drafts a dispatch plan for the supervisor</div>
        <div class="dt-yes">1</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.9fr 0.9fr;">
        <div class="dt-name">Claims processing</div>
        <div>Extracts the claim, validates against policy, checks fraud signals, routes or requests missing documents</div>
        <div>1-2</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.9fr 0.9fr;">
        <div class="dt-name">Data engineering</div>
        <div>Investigates a failed pipeline, reads logs, identifies the schema change, opens a PR with the fix</div>
        <div>1</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.9fr 0.9fr;">
        <div class="dt-name">Procurement</div>
        <div>Compares quotes against contract terms, flags deviations, drafts the approval note</div>
        <div>1</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.2fr 1.9fr 0.9fr;">
        <div class="dt-name">Onboarding</div>
        <div>Creates accounts, assigns groups, provisions tooling from an approved template</div>
        <div>2</div>
      </div>
    </div>

    <div class="tip-box">💡 The common thread: the agent does the <b>investigation</b> — the part that takes a
    human 40 minutes of clicking through five systems — and a human keeps the <b>decision</b>.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Industry Benefits</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-block"><div class="ans-label">Collapses cross-system investigation</div>
        The expensive part of ops work is context assembly across tools. An agent does
        that in seconds and presents a reasoned summary with evidence.</div>
        <div class="ans-block"><div class="ans-label">Consistent process execution</div>
        The agent follows the same runbook every time, at 3am, without skipping the
        boring verification step.</div>
      </div>
      <div>
        <div class="ans-block"><div class="ans-label">24/7 first response</div>
        Triage and enrichment happen immediately; the human arrives to a prepared
        case rather than a raw alert.</div>
        <div class="ans-block"><div class="ans-label">Institutional memory</div>
        Past incidents and decisions become retrievable context, so the agent applies
        what the team learned last year.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">How To Use It In The Real World — Building The Loop Safely</div>
  <div class="ref-body">
    <div class="ans-block"><div class="ans-label">Hard limits are not optional</div>
    <div class="code-box">var budget = new AgentBudget {
    MaxSteps        = 12,                        // stop runaway loops
    MaxTokens       = 60_000,                    // stop runaway cost
    MaxWallClock    = TimeSpan.FromMinutes(2),   // stop runaway latency
    MaxToolCalls    = new() { ["send_email"] = 1, ["query_db"] = 8 }
};

while (!done && budget.Allows(state)) {
    var step = await model.NextStepAsync(context, tools);
    if (step.IsFinal) break;

    if (!policy.IsAllowed(step.Tool, step.Args, user))    // authZ per call
        { context.Add(Denied(step)); continue; }

    if (policy.NeedsApproval(step.Tool, step.Args))       // human gate
        return Pending(step);                             // resume after approval

    var result = await tools.ExecuteAsync(step, timeout: 20s);
    context.Add(Truncate(result, maxTokens: 2000));       // keep context bounded
}
if (!done) return Escalate("Budget exhausted", state);    // never fail silently</div></div>

    <div class="ans-block"><div class="ans-label">Tool design decides agent quality</div>
    <div class="code-box">✅ Few, well-named, well-described tools beat many overlapping ones
✅ Narrow scope:  get_station_status(stationId)   not  run_sql(query)
✅ Idempotent where possible, with an idempotency key on writes
✅ Return structured, compact results — raw 500-row dumps blow the context
✅ Return errors as data the model can reason about, not exceptions
❌ Never expose a tool the agent's user is not authorised to use directly</div></div>

    <div class="ans-block"><div class="ans-label">Observability for a non-deterministic system</div>
    <div class="code-box">Log every run as a trace: goal, each step, tool, args, result, tokens, latency.
Metrics that matter:
  Task success rate        did it achieve the goal?
  Steps per task           creeping up = degrading reasoning or bad tools
  Tool error rate          which tool the agent keeps misusing
  Human override rate      how often approvers reject the proposal
  Cost per completed task  the number finance will ask for
Replay capability: re-run a failed trace against a new prompt to prove a fix.</div></div>

    <div class="warn-box">⚠️ Biggest real-world failure modes: <b>loops</b> (agent repeats the same failing call),
    <b>context overflow</b> (tool results fill the window until reasoning collapses), <b>confident wrong
    actions</b>, and <b>prompt injection through tool output</b> — a retrieved document or ticket comment that
    instructs the agent. Treat every tool result as untrusted input.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answers</div>
  <div class="ref-body">
    <div class="qa-card">
      <div class="qa-question">How would you make an autonomous agent safe enough for production?</div>
      <div class="qa-answer">"I constrain the blast radius before I optimise the intelligence. Autonomy level
      chosen per action — read-only and suggest by default, autonomous only for reversible operations. The model
      never executes anything; it proposes, and my orchestrator authorises each call against the user's own
      permissions, so the agent can never do more than the person it acts for. Hard budgets on steps, tokens,
      wall clock and per-tool call counts. Approval gates on anything consequential, with idempotency keys so a
      retry cannot double-charge. Full traces for replay, and metrics on task success, override rate and cost
      per task. If the budget is exhausted, it escalates to a human — it never fails silently."</div>
    </div>
    <div class="qa-card">
      <div class="qa-question">What is the difference between an agent and a workflow, and when do you pick which?</div>
      <div class="qa-answer">"A workflow has a path I designed; an agent chooses the path at runtime. If the
      steps are known, use a workflow — it is cheaper, deterministic, testable and easier to certify. Agents earn
      their cost only when the path genuinely varies per case, like incident investigation where the next query
      depends on what the last one returned. In practice the best design is usually hybrid: a deterministic
      workflow for the overall process with one agentic step where the branching is genuinely open-ended."</div>
    </div>
    <div class="tip-box">✅ Strong framing: "Agentic AI is a distributed systems problem — retries, timeouts,
    idempotency, authorisation and budgets — with a non-deterministic planner in the middle."</div>
  </div>
</div>
`;
