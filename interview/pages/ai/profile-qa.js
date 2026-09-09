window.Pages['ai-profile-qa'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>Profile Q&amp;A</span></div>
  <h1>🎤 Questions Based On Your Profile</h1>
  <p>Interviewer questions that drill directly into your resume's AI/GenAI claims — with answers grounded in what you actually wrote</p>
</div>

<div class="ref-section">
  <div class="ref-title">What's On Your Resume — The Lines That Get Probed</div>
  <div class="ref-body">
    <div class="code-box">"Designed and introduced enterprise GenAI/RAG architecture using vector
databases and semantic search over operational and knowledge data, with
MCP-based tool integration to securely connect AI assistants with
enterprise systems."
                                        — Wissen Technology, Principal Architect

"AI &amp; LLM Engineering: Generative AI, Agentic AI, LLM, RAG, Vector
Databases (Azure AI Search, pgvector, Pinecone), Model Context Protocol
(MCP), Microsoft AI Foundry / Azure AI Foundry, Azure OpenAI, Embeddings
&amp; Semantic Search, Prompt Engineering, AI Agents &amp; Orchestration,
LLM Cost &amp; Performance Optimization."
                                        — Core Skills</div>
    <div class="tip-box">💡 Every answer below is written the way YOU would defend it — first person, specific, and honest about scope. Adjust any number or detail that doesn't match what you actually built before using it live.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">The Q&amp;A</div>
  <div class="ref-body">
    <div class="qa-list">

      <div class="qa-card">
        <div class="qa-num">1</div>
        <div class="qa-body">
          <div class="qa-question">Your resume says you introduced an enterprise GenAI/RAG architecture at Wissen. Walk me through it end to end.</div>
          <div class="qa-answer">
            <div class="ans-block"><div class="ans-label">Structure the answer around the pipeline, not a feature list</div>
              <div class="flow-box">
                <div class="flow-step">Operational + Knowledge Data</div>
                <div class="flow-arrow">→</div>
                <div class="flow-step blue">Embed + Index (Vector Store)</div>
                <div class="flow-arrow">→</div>
                <div class="flow-step blue">Semantic Retrieval (RAG)</div>
                <div class="flow-arrow">→</div>
                <div class="flow-step green">Azure OpenAI + MCP Tools</div>
              </div>
            </div>
            <div class="qa-answer">"The platform had operational data — station telemetry, incident history, SOPs — spread across several systems, and engineers were spending time hunting across tools for answers. I designed a layer where that data gets embedded into a vector store and made searchable through semantic retrieval, so an assistant can answer a question grounded in our own operational data rather than generic knowledge. On top of that I added MCP-based tool integration so the assistant could securely call into enterprise systems — not just read documents, but take governed actions through a controlled tool surface. The architecture sat on Azure OpenAI and Azure AI Foundry, with identity-scoped access so the assistant never returns data the requesting user isn't authorised to see."</div>
            <div class="tip-box">✅ Notice this answer stays at the architecture level — data flow, security boundary, platform choice — because that's what a Principal Architect is expected to own. Leave implementation minutiae for a follow-up question.</div>
          </div>
        </div>
      </div>

      <div class="qa-card">
        <div class="qa-num">2</div>
        <div class="qa-body">
          <div class="qa-question">Why MCP specifically, instead of just writing custom API integrations for each tool the assistant needed?</div>
          <div class="qa-answer">
            <div class="ans-block"><div class="ans-label">The M×N problem — the standard framing</div>
              <div class="code-box">WITHOUT MCP                        WITH MCP
N assistants × M systems           Each system exposes ONE MCP server
= N×M bespoke integrations         Each assistant speaks ONE protocol
                                    = N + M components, not N×M</div>
            </div>
            <div class="qa-answer">"Custom integrations solve today's problem but don't scale — every new AI assistant or every new backend system means another bespoke integration. MCP standardises the interface, so I build one governed server per system once, and any compliant AI client can use it — the current assistant, and whatever we adopt next year. It also gave us one place to put authorisation, rate limiting and audit, instead of that logic being duplicated across every integration."</div>
          </div>
        </div>
      </div>

      <div class="qa-card">
        <div class="qa-num">3</div>
        <div class="qa-body">
          <div class="qa-question">How did you make sure the AI assistant couldn't access data the requesting user wasn't allowed to see?</div>
          <div class="qa-answer">
            <div class="ans-block"><div class="ans-label">This is the question that separates "used AI" from "architected AI securely"</div>
              <div class="code-box">Identity flows END TO END — never a shared service-account token

  User's Entra ID token
        │
        ▼
  MCP server validates token, extracts tenant + group claims
        │
        ▼
  Retrieval filter built from THOSE claims (never from client request body)
        │
        ▼
  Vector search runs PRE-FILTERED by tenant/ACL, THEN ranked
        │
        ▼
  Assistant can only ever see what this user could see directly</div>
            </div>
            <div class="qa-answer">"The assistant runs as the requesting user, not as a privileged service account. Every retrieval call is filtered server-side using claims from the user's own validated token — tenant, role, access group — never from anything the client sends in the request. The vector store filters before ranking, not after, so a security boundary is never something the assistant could accidentally rank around. And every tool call goes through an authorisation check against that same identity before it executes."</div>
            <div class="warn-box">⚠️ If asked "what if the vector database doesn't support pre-filtering" — know the answer: some stores post-filter, which silently returns fewer results than requested and can look like a bug rather than a security gap. Confirm this explicitly for whatever store you actually used.</div>
          </div>
        </div>
      </div>

      <div class="qa-card">
        <div class="qa-num">4</div>
        <div class="qa-body">
          <div class="qa-question">You list Azure AI Search, pgvector, and Pinecone as vector databases you've worked with. Which did you actually use for this platform, and why?</div>
          <div class="qa-answer">
            <div class="ans-block"><div class="ans-label">Answer with the real decision driver, not a feature comparison</div>
              <p>Pick whichever you actually used and justify it on the driver that mattered:</p>
              <div class="decision-table">
                <div class="dt-row dt-header" style="grid-template-columns:1fr 1.8fr;"><div>If you used…</div><div>The honest justification</div></div>
                <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">Azure AI Search</div><div>Already on Azure; needed hybrid search + the built-in semantic re-ranker; Entra ID and Private Link came natively, which mattered for a regulated energy platform</div></div>
                <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">pgvector</div><div>Operational data already lived in PostgreSQL; adding a vector column avoided standing up a whole new datastore to secure and operate</div></div>
              </div>
            </div>
            <div class="warn-box">⚠️ Don't claim you evaluated all three in production — say which one you actually shipped, and that you're familiar with the others' trade-offs (which is true, from your own reference material). Interviewers can tell the difference between "I used X" and "I know about X, Y, Z" — and conflating them is a credibility risk.</div>
          </div>
        </div>
      </div>

      <div class="qa-card">
        <div class="qa-num">5</div>
        <div class="qa-body">
          <div class="qa-question">Your summary mentions "Agentic AI" as a skill. Did the Wissen platform actually have autonomous agents, or was it a retrieval-and-answer assistant?</div>
          <div class="qa-answer">
            <div class="ans-block"><div class="ans-label">Be precise here — this is where overclaiming gets caught fastest</div>
              <div class="decision-table">
                <div class="dt-row dt-header" style="grid-template-columns:1fr 1.8fr;"><div>Level</div><div>What it means</div></div>
                <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">Assistant / RAG</div><div>Answers questions grounded in retrieved data. No autonomous action.</div></div>
                <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">Tool-calling</div><div>Model can invoke MCP tools when it decides to — this is what "MCP-based tool integration" on your resume actually claims</div></div>
                <div class="dt-row" style="grid-template-columns:1fr 1.8fr;"><div class="dt-name">Autonomous agent</div><div>Multi-step planning loop with no human in the loop — a much bigger claim</div></div>
              </div>
            </div>
            <div class="qa-answer">"What I shipped at Wissen was retrieval-grounded assistance with MCP-based tool calling — the model could invoke governed tools to fetch live status or take a bounded action, always with the response reviewed by an engineer for anything consequential. That's level two, not full autonomous agents. I'm listing Agentic AI as a skill because I've designed the pattern — autonomy levels, tool authorisation, budgets, approval gates — and I'd scope any future work by exactly how much autonomy the use case actually justifies, which for most enterprise workflows is less than people initially assume."</div>
            <div class="tip-box">✅ This kind of precise, level-aware answer reads as MORE senior than an inflated claim — it shows you understand the spectrum, which is the actual skill being tested.</div>
          </div>
        </div>
      </div>

      <div class="qa-card">
        <div class="qa-num">6</div>
        <div class="qa-body">
          <div class="qa-question">How did you control the cost of running this at Wissen, given your resume mentions "LLM Cost & Performance Optimization"?</div>
          <div class="qa-answer">
            <div class="ans-block"><div class="ans-label">Tie the answer to your OTHER stated resume metric — the 20% infrastructure cost saving</div>
              <div class="code-box">Levers actually applied to an enterprise RAG assistant:
  1. Retrieved a small, precise context (5-6 chunks) rather than a wide
     dump — cuts tokens AND improves grounding quality simultaneously
  2. Capped max output tokens on every call — no runaway generation cost
  3. Cached repeated/similar questions rather than re-calling the model
  4. Sized the model to the task — a smaller model for routine lookups,
     escalating only when the question needed real reasoning</div>
            </div>
            <div class="qa-answer">"The same cost governance approach that got us the 20% infrastructure saving applied here — I treated tokens per request as a first-class metric, not just total monthly spend, because a bloated prompt or an over-wide retrieval set is invisible on a monthly chart until the bill arrives. Practically: tight retrieval instead of dumping large context, capped output tokens, caching on repeated questions, and routing simple lookups to a cheaper model rather than paying frontier-model rates for everything."</div>
          </div>
        </div>
      </div>

      <div class="qa-card">
        <div class="qa-num">7</div>
        <div class="qa-body">
          <div class="qa-question">What would you say is the single hardest problem you solved building this GenAI layer?</div>
          <div class="qa-answer">
            <div class="qa-answer">"Getting retrieval right was harder than the AI part. The model itself is a commodity — Azure OpenAI answers well once it has the right context. The actual engineering was in chunking operational documents so the right fact reached the prompt, tuning hybrid search so exact identifiers like station or fault codes weren't lost to purely semantic matching, and building the security filter so retrieval respected the same access boundaries the rest of the platform already had. Most of what people call 'AI problems' in an enterprise setting are actually search and identity problems wearing an AI label."</div>
            <div class="tip-box">✅ This kind of answer signals seniority because it resists the natural pull toward talking about the model, and instead names the unglamorous plumbing — which is genuinely where the engineering effort goes.</div>
          </div>
        </div>
      </div>

      <div class="qa-card">
        <div class="qa-num">8</div>
        <div class="qa-body">
          <div class="qa-question">Your title moved to "Lead Technical Architect" alongside "Principal Architect" on your latest resume — how does AI work change what an architect owns day to day?</div>
          <div class="qa-answer">
            <div class="qa-answer">"It adds a layer of platform ownership that didn't exist before. Beyond enterprise architecture, cloud strategy and DevOps, I now also own model routing and fallback, the retrieval and grounding layer, tool governance through MCP, evaluation of AI output quality, and cost attribution per feature — because those are exactly the pieces that go wrong silently if nobody owns them. The core architectural discipline doesn't change: define boundaries, manage risk, keep the system operable. What changes is that 'the system' now includes a non-deterministic component, so evaluation and guardrails become as core to my role as availability and security always were."</div>
          </div>
        </div>
      </div>

      <div class="qa-card">
        <div class="qa-num">9</div>
        <div class="qa-body">
          <div class="qa-question">If you were starting the Wissen GenAI initiative again today, what would you do differently?</div>
          <div class="qa-answer">
            <div class="qa-answer">"I'd build the evaluation set before the first line of retrieval code, not after. Early on we judged quality by reading responses, which doesn't scale and doesn't catch regressions when a prompt or a chunking strategy changes. A golden set of real questions with expected answers, scored automatically in CI, is what turns 'this feels better' into a number you can gate a release on — and it's cheap to build early and expensive to retrofit once the system is already in production and every stakeholder has an opinion on quality."</div>
            <div class="tip-box">✅ A good "what would you do differently" answer names a real, specific process gap — not a vague "I'd do more testing." This one is concrete and matches the evaluation theme covered elsewhere in this AI section.</div>
          </div>
        </div>
      </div>

      <div class="qa-card">
        <div class="qa-num">10</div>
        <div class="qa-body">
          <div class="qa-question">You're targeting Lead Technical Architect and Cloud/AI Architect roles. Why should we trust an infrastructure-and-microservices architect with AI-specific decisions?</div>
          <div class="qa-answer">
            <div class="qa-answer">"Because most of what makes an enterprise AI system trustworthy isn't AI-specific — it's the same architectural discipline I've applied for fifteen years, pointed at a new component. Identity and access control, cost governance, high availability, CI/CD and evaluation gates, security review — none of that changes because the workload calls an LLM instead of a REST API. What I bring that a pure ML specialist often doesn't is exactly that systems discipline: how to put a non-deterministic component behind the same guardrails, audit trail and operational rigor as everything else in a regulated enterprise platform. The model is the new part. Making it production-grade is the architecture problem I already know how to solve."</div>
            <div class="tip-box">✅ Strong closing answer for any interview in this track — it reframes "why trust you with AI" into "AI needs exactly the discipline you already have," which is both true and the most defensible positioning available.</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
`;
