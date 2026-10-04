window.Pages['ai-agentic-sdlc'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>Agentic SDLC — Multi-Agent Software Factory</span></div>
  <h1>🏭 Agentic SDLC — Multi-Agent Software Factory</h1>
  <p>Requirements → Design → Development → Code Review → Testing → Release → Monitoring → Tech Debt — one agent per stage, humans at the gates that matter</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance — The Full Pipeline</div>
  <div class="ref-body">
    <div class="code-box">┌──────────────┐   ┌───────────┐   ┌─────────────┐   ┌─────────────┐
│ 1. Requirements│──▶│ 2. Design  │──▶│ 3. Development│──▶│ 4. Code Review│
│    Agent       │   │    Agent   │   │    Agent     │   │    Agent     │
└──────────────┘   └───────────┘   └─────────────┘   └──────┬──────┘
                                                              ▼
┌──────────────┐   ┌───────────┐   ┌─────────────┐   ┌─────────────┐
│ 8. Tech Debt   │◀──│ 7. Monitoring│◀──│ 6. Release  │◀──│ 5. Testing  │
│    Agent       │   │    Agent    │   │    Agent    │   │    Agent    │
└──────┬───────┘   └───────────┘   └─────────────┘   └─────────────┘
       │
       └────────────────── feeds back into Requirements (continuous loop) ──────┘</div>
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">📝</div><div class="principle-name">One agent, one stage</div><p>Each stage has a narrow, auditable responsibility — not one agent doing everything</p></div>
      <div class="principle-card"><div class="principle-icon">🧑‍⚖️</div><div class="principle-name">Autonomy ∝ reversibility</div><p>Fully automate what's cheap to undo; gate what isn't</p></div>
      <div class="principle-card"><div class="principle-icon">🔁</div><div class="principle-name">Closed loop</div><p>Monitoring and tech debt findings feed back into new requirements</p></div>
      <div class="principle-card"><div class="principle-icon">📊</div><div class="principle-name">Everything is an artifact</div><p>Every stage reads/writes structured data, not just chat — auditable, replayable</p></div>
    </div>
    <div class="tip-box">✅ Interview framing: "I don't design this as one autonomous agent doing the whole SDLC — I design it as eight narrow agents, each owning one stage's inputs/outputs, orchestrated as a workflow with explicit human-approval gates at the points where a mistake is expensive to undo."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Stage-By-Stage: Inputs, Outputs, Autonomy</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1fr;">
        <div>Stage</div><div>Inputs</div><div>Outputs</div><div>Autonomy</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1fr;"><div class="dt-name">1. Requirements</div><div>Raw ask (ticket, email, voice note), existing BRD/PRD, stakeholder Q&amp;A</div><div>Structured user stories + acceptance criteria</div><div>Drafts only — human confirms intent</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1fr;"><div class="dt-name">2. Design</div><div>User stories, existing HLD, architecture principles (RAG)</div><div>Proposed component changes, ADR draft, affected services list</div><div>Drafts only — architect reviews before Development starts</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1fr;"><div class="dt-name">3. Development</div><div>Approved design, style guide (RAG), existing codebase</div><div>Branch + diff + unit tests</div><div class="dt-yes">High — auto-generates PRs for low-risk changes</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1fr;"><div class="dt-name">4. Code Review</div><div>Diff, PR intent, static analysis findings, past incidents</div><div>Inline comments + approve/request-changes verdict</div><div>High for style/bugs; hard gate on auth/payments/schema</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1fr;"><div class="dt-name">5. Testing</div><div>Diff, acceptance criteria, existing test suite</div><div>New/updated test cases, coverage delta, pass/fail report</div><div class="dt-yes">High — auto-runs and reports; flags coverage gaps</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1fr;"><div class="dt-name">6. Release</div><div>Green test report, deployment plan, rollback plan</div><div>Deployment executed, canary metrics</div><div>Auto-rollback on regression; human gate for prod on high-blast-radius services</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1fr;"><div class="dt-name">7. Monitoring</div><div>Logs, metrics, traces, alerts post-release</div><div>Incident summary, root-cause hypothesis, affected-user estimate</div><div class="dt-yes">High — summarizes and pages; human decides remediation</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr 1fr;"><div class="dt-name">8. Tech Debt</div><div>Codebase scan, churn/complexity metrics, incident history, stale dependencies</div><div>Ranked debt register + remediation proposals, feeds new requirements</div><div>Drafts only — prioritization is a human/product decision</div></div>
    </div>
    <div class="warn-box">⚠️ The failure mode in almost every "agentic SDLC" pitch is collapsing all 8 stages into one agent with one giant prompt. That agent can't be reviewed stage-by-stage, can't have different autonomy levels per stage, and a single bad output corrupts everything downstream. Separate agents with typed hand-offs are what make this auditable.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Real-World Walkthrough — "Add CSV Export to the Reports Page"</div>
  <div class="ref-body">
    <div class="code-box">1. REQUIREMENTS AGENT
   Input:  Jira ticket "Customers want to export reports as CSV"
   Output: User Story: "As a report viewer, I can export the current
           filtered view as CSV" + Acceptance Criteria (respects active
           filters, handles 100k+ rows via streaming, UTF-8 BOM for Excel)
   Gate:   Product Owner confirms scope (no gate = scope creep risk)

2. DESIGN AGENT
   Input:  Approved story + existing Reports module HLD (RAG)
   Output: "Add IReportExporter.ExportCsvAsync(), stream via
           IAsyncEnumerable, reuse existing filter pipeline. No new
           service needed — low blast radius." + draft ADR
   Gate:   Tech lead approves approach (5 min read, not a design doc)

3. DEVELOPMENT AGENT
   Input:  Approved design
   Output: Branch feat/csv-export, CsvReportExporter.cs implementing
           IReportExporter, unit tests for streaming + BOM + empty-set
   Gate:   None — low-risk, additive change, auto-opens PR

4. CODE REVIEW AGENT
   Input:  PR diff + style guide (RAG) + static analysis
   Output: "LGTM. One suggestion: CsvReportExporter should dispose the
           StreamWriter explicitly — currently relies on GC." Verdict:
           Approve with suggestion (non-blocking, no auth/payment surface)
   Gate:   None — non-blocking comment only

5. TESTING AGENT
   Input:  PR + acceptance criteria
   Output: Adds integration test for 150k-row export, confirms streaming
           doesn't spike memory, coverage +2.1% → Pass
   Gate:   None — green pipeline auto-proceeds

6. RELEASE AGENT
   Input:  Green pipeline, deployment plan (canary 5% → 100%)
   Output: Deploys to canary, watches error rate for 15 min, promotes
           to 100% automatically since error rate stayed flat
   Gate:   Human gate skipped — pre-approved as low-blast-radius; HIGH
           blast-radius services (billing, auth) would require sign-off here

7. MONITORING AGENT
   Input:  Post-release logs/metrics for 48h
   Output: "CSV export used 340 times, p95 latency 1.2s, zero errors.
           No action needed."
   Gate:   None — informational

8. TECH DEBT AGENT (runs continuously, not per-feature)
   Input:  Full codebase scan + this feature's new code
   Output: Flags that 3 other export paths (PDF, Excel) duplicate the
           same filter-application logic now triplicated 3 ways —
           proposes extracting IReportExporter as the shared contract
           retroactively. Feeds back into Requirements as a refactor story.</div>
    <div class="tip-box">✅ Notice the gate pattern: low-risk/reversible stages (dev, test, low-blast-radius release) run fully autonomously; the only real human checkpoints are confirming SCOPE (requirements) and APPROACH (design) up front — exactly the two things that are expensive to redo if wrong.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Orchestrator Pattern — Typed Hand-Offs Between Stages</div>
  <div class="ref-body">
    <div class="ans-block"><div class="ans-label">Each stage hands off a typed artifact, never free-text chat history</div>
    <div class="code-box">public record RequirementsOutput(string UserStory, List&lt;string&gt; AcceptanceCriteria, string TicketId);
public record DesignOutput(string Approach, List&lt;string&gt; AffectedComponents, string AdrDraft, RiskLevel BlastRadius);
public record DevOutput(string BranchName, string DiffUrl, List&lt;string&gt; TestsAdded);
public record ReviewOutput(ReviewVerdict Verdict, List&lt;ReviewComment&gt; Comments, bool RequiresHumanGate);
public record TestOutput(bool Passed, double CoverageDelta, List&lt;string&gt; FailedTests);
public record ReleaseOutput(bool Deployed, string CanaryStatus, bool AutoPromoted);
public record MonitorOutput(IncidentSeverity Severity, string RootCauseHypothesis);
public record TechDebtItem(string Description, DebtSeverity Severity, string ProposedFix);

public class SdlcPipeline
{
    // Each stage is its OWN agent call with its OWN prompt, tools and
    // autonomy policy — never one mega-prompt spanning every stage.
    public async Task RunAsync(string ticketId)
    {
        var reqs = await _requirementsAgent.RunAsync(ticketId);
        await _gates.RequireApprovalAsync(reqs, GateType.ScopeConfirmation);

        var design = await _designAgent.RunAsync(reqs);
        await _gates.RequireApprovalAsync(design, GateType.ApproachApproval);

        var dev = await _devAgent.RunAsync(design);
        var review = await _reviewAgent.RunAsync(dev);
        if (review.RequiresHumanGate)
            await _gates.RequireApprovalAsync(review, GateType.SecuritySensitive);

        var tests = await _testAgent.RunAsync(dev);
        if (!tests.Passed) { await _requirementsAgent.FlagRegressionAsync(tests); return; }

        var release = await _releaseAgent.RunAsync(dev, design.BlastRadius);
        var monitor = await _monitorAgent.WatchAsync(release, TimeSpan.FromHours(48));

        // Tech debt runs continuously, independent of any single pipeline run,
        // but its findings route back in as new Requirements tickets.
        var debtItems = await _techDebtAgent.ScanAsync(dev.DiffUrl);
        foreach (var item in debtItems.Where(d => d.Severity >= DebtSeverity.High))
            await _requirementsAgent.FileDebtTicketAsync(item);
    }
}</div></div>
    <div class="warn-box">⚠️ The "RequiresHumanGate" decision must come from a deterministic policy (auth/payments/schema/high-blast-radius keywords, ownership rules), never from the Code Review agent deciding for itself whether its own change is risky enough to escalate — the same trap as letting any agent self-certify its own authority.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Tech Debt Identification Agent — Detail</div>
  <div class="ref-body">
    <div class="code-box">SIGNALS THE AGENT COMBINES (none alone is reliable):
  • Code churn        — files changed often + high defect rate
  • Cyclomatic complexity — functions too complex to safely change
  • Duplication        — near-identical logic across 3+ places
  • Dependency age      — packages multiple majors behind, unpatched CVEs
  • Test coverage gaps  — critical paths with no regression safety net
  • Incident correlation — which files show up repeatedly in postmortems

OUTPUT: a ranked debt register, not a wall of warnings
  Severity = f(blast radius if it breaks, frequency of change,
              cost to fix now vs cost compounding later)</div>
    <div class="tip-box">✅ Interview line: "Tech debt detection is a scoring problem, not a linting problem — a complex function nobody ever touches is lower priority than a simpler one that's been the root cause of three incidents and changes every sprint. The agent's job is to rank by actual cost, not just flag everything that looks messy."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Memory &amp; Context Sharing Across The 8 Agents</div>
  <div class="ref-body">
    <div class="code-box">THREE LAYERS — don't use one store for all three

1. RUN CONTEXT (per pipeline execution — short-lived)
   What:   this ticket's story, design decision, diff URL, test results
   Where:  one durable run record (Cosmos/Postgres), keyed by RunId
   Lives:  as long as this one feature's pipeline is in flight

2. STRUCTURED HAND-OFF (between adjacent stages — typed, not chat)
   What:   RequirementsOutput → DesignOutput → DevOutput → ...
   Where:  passed directly as the next agent's input (see records above)
   Rule:   NEVER pass raw chat transcript between stages — pass the
           typed artifact. A transcript invites re-interpretation drift;
           a typed record forces each agent to consume exactly one thing.

3. LONG-TERM / CROSS-RUN MEMORY (persists across many features)
   What:   style guide, past incidents, architecture principles, ADRs,
           this codebase's known debt register
   Where:  vector store + RAG — every agent retrieves what it needs,
           it isn't pushed into every prompt
   Rule:   this is SHARED READ access across all 8 agents, but only the
           Tech Debt and Monitoring agents WRITE to it (new incidents,
           new debt items) — write access is narrow and auditable</div>

    <div class="flow-box">
      <div class="flow-step">Run Context<br><span style="font-weight:400;font-size:11px;">this feature only</span></div>
      <div class="flow-arrow">feeds</div>
      <div class="flow-step blue">Structured Hand-off<br><span style="font-weight:400;font-size:11px;">stage → next stage</span></div>
      <div class="flow-arrow">writes into</div>
      <div class="flow-step">Long-Term Memory<br><span style="font-weight:400;font-size:11px;">all features, all time</span></div>
    </div>

    <div class="ans-block"><div class="ans-label">In code — shared memory store, narrow write access</div>
    <div class="code-box">public interface IAgentMemoryStore
{
    // Every agent can READ — retrieval is scoped by query, not pushed in bulk.
    Task&lt;IReadOnlyList&lt;MemoryItem&gt;&gt; SearchAsync(string query, string[] tags, int topK);

    // Only specific agents are authorized to WRITE — enforced by the caller's
    // identity, not by convention. A Dev agent cannot silently log a "fact"
    // that corrupts what the Design agent trusts next time.
    Task AppendAsync(MemoryItem item, string writerAgentId);
}

public record AgentHandoff(
    string RunId,
    string FromStage,
    string ToStage,
    object TypedPayload,     // e.g. DesignOutput, never a raw transcript
    DateTimeOffset At);

// Orchestrator passes TypedPayload directly — the Dev agent never sees
// the Requirements agent's raw conversation, only DesignOutput.
var design = await _designAgent.RunAsync(reqs);
var dev = await _devAgent.RunAsync(design);   // typed, not chat history</div></div>

    <div class="warn-box">⚠️ The most common memory-sharing bug: concatenating every prior stage's full chat transcript into the next agent's prompt "to be safe." This balloons token cost, lets stale or wrong early reasoning leak forward unchallenged, and makes failures nearly impossible to debug — you can't tell which of 6 transcripts caused a bad decision. Typed hand-offs plus a separately-queried long-term memory store scale; transcript concatenation doesn't.</div>
    <div class="tip-box">✅ Interview line: "I treat memory sharing as three different problems, not one: what THIS run needs right now (durable run record), what the NEXT stage specifically needs (a typed hand-off object), and what EVERY future run might need (RAG over a shared, narrowly-writable long-term store). Collapsing those into one shared context window is what makes multi-agent systems unreliable and expensive."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answer — Full Framework In One Response</div>
  <div class="ref-body">
    <div class="qa-card">
      <div class="qa-question">Design a fully agentic SDLC, from requirement gathering through monitoring and tech debt.</div>
      <div class="qa-answer">"I'd structure it as eight narrow agents — Requirements, Design, Development, Code Review, Testing, Release, Monitoring, and Tech Debt — each with its own prompt, tools, and typed input/output contract, orchestrated as a pipeline rather than one autonomous agent doing everything. Autonomy scales with reversibility: Development and Testing run largely unattended because a bad unit test or an unmerged branch costs nothing; Release auto-promotes on low-blast-radius services but hard-gates on auth/payments/schema changes; Requirements and Design stay human-confirmed up front because getting scope or approach wrong is the most expensive mistake to undo later. Monitoring and Tech Debt close the loop — incidents and debt findings become new Requirements tickets automatically, so the system keeps itself honest over time instead of debt silently accumulating. The one rule I don't compromise on: no agent decides its own escalation threshold — whether something needs a human gate is a deterministic policy, not a judgment call left to the same agent that produced the change."</div>
    </div>
  </div>
</div>
`;
