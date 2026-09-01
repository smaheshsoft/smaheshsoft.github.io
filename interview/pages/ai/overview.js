window.Pages['ai-overview'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>Overview</span></div>
  <h1>🧠 AI &amp; LLM Engineering</h1>
  <p>Twelve topics — each with what it is, real-world use cases, industry benefits, how to apply it in
  production, and interview answers.</p>
</div>

<div class="ref-section">
  <div class="ref-title">How These Topics Fit Together</div>
  <div class="ref-body">
    <div class="code-box">                    ┌──────────────────────────────┐
                    │      GENERATIVE AI           │  the capability
                    │   powered by LLMs            │
                    └──────────────┬───────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
   GROUNDING                  STEERING                   ACTING
   ─────────                  ────────                   ──────
   RAG                        Prompt engineering         Agentic AI
   Embeddings                 Structured output          Agents & orchestration
   Vector databases           Evaluation                 MCP (tool access)
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   │
                    ┌──────────────┴───────────────┐
                    │        PLATFORM              │
                    │  Azure OpenAI · AI Foundry   │
                    │  Cost & performance · Safety │
                    └──────────────────────────────┘

READ IN THIS ORDER IF YOU ARE STARTING OUT
  1. Generative AI → 2. LLMs → 3. Prompt engineering
  4. Embeddings → 5. Vector databases → 6. RAG
  7. MCP → 8. Agentic AI → 9. Agents & orchestration
  10. Azure OpenAI → 11. AI Foundry → 12. Cost & performance</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Foundations</div>
  <div class="ref-body">
    <div class="card-grid">
      <div class="card" onclick="showPage('ai-genai', document.querySelector('[onclick*=ai-genai]'))">
        <div class="card-icon">✨</div><h3>Generative AI</h3>
        <p>What changes for an architect, where it fits, which use cases succeed and which fail.</p>
        <div class="card-meta"><span class="tag blue">Use cases</span><span class="tag blue">Playbook</span></div>
      </div>
      <div class="card" onclick="showPage('ai-llm', document.querySelector('[onclick*=ai-llm]'))">
        <div class="card-icon">🧠</div><h3>Large Language Models</h3>
        <p>Tokens, context windows, model tiers, non-determinism and production failure modes.</p>
        <div class="card-meta"><span class="tag blue">Model choice</span><span class="tag blue">Routing</span></div>
      </div>
      <div class="card" onclick="showPage('ai-prompt', document.querySelector('[onclick*=ai-prompt]'))">
        <div class="card-icon">📝</div><h3>Prompt Engineering</h3>
        <p>Prompt anatomy, few-shot, structured output, injection defence, versioning and evaluation.</p>
        <div class="card-meta"><span class="tag blue">Injection</span><span class="tag blue">Eval</span></div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Grounding — Making It Answer From Your Data</div>
  <div class="ref-body">
    <div class="card-grid">
      <div class="card" onclick="showPage('ai-embeddings', document.querySelector('[onclick*=ai-embeddings]'))">
        <div class="card-icon">🧩</div><h3>Embeddings &amp; Semantic Search</h3>
        <p>Meaning as geometry, hybrid search, model choice and zero-downtime re-indexing.</p>
        <div class="card-meta"><span class="tag blue">Hybrid</span><span class="tag blue">Re-index</span></div>
      </div>
      <div class="card" onclick="showPage('ai-vectordb', document.querySelector('[onclick*=ai-vectordb]'))">
        <div class="card-icon">🗂️</div><h3>Vector Databases</h3>
        <p>Azure AI Search vs pgvector vs Pinecone, ANN indexes, filtering and tenant isolation.</p>
        <div class="card-meta"><span class="tag blue">ANN</span><span class="tag blue">Multi-tenant</span></div>
      </div>
      <div class="card" onclick="showPage('ai-rag', document.querySelector('[onclick*=ai-rag]'))">
        <div class="card-icon">🔎</div><h3>RAG</h3>
        <p>The full pipeline, chunking strategies, re-ranking, evaluation and security.</p>
        <div class="card-meta"><span class="tag blue">Chunking</span><span class="tag blue">Citations</span></div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Acting — Tools, Agents And Orchestration</div>
  <div class="ref-body">
    <div class="card-grid">
      <div class="card" onclick="showPage('ai-mcp', document.querySelector('[onclick*=ai-mcp]'))">
        <div class="card-icon">🔌</div><h3>Model Context Protocol</h3>
        <p>Standardised tool access, the M×N problem, and the security model that makes it approvable.</p>
        <div class="card-meta"><span class="tag blue">Tools</span><span class="tag blue">Governance</span></div>
      </div>
      <div class="card" onclick="showPage('ai-agentic', document.querySelector('[onclick*=ai-agentic]'))">
        <div class="card-icon">🤖</div><h3>Agentic AI</h3>
        <p>Autonomy levels, the agent loop, hard budgets, approval gates and failure modes.</p>
        <div class="card-meta"><span class="tag blue">Autonomy</span><span class="tag blue">Guardrails</span></div>
      </div>
      <div class="card" onclick="showPage('ai-orchestration', document.querySelector('[onclick*=ai-orchestration]'))">
        <div class="card-icon">🎛️</div><h3>Agents &amp; Orchestration</h3>
        <p>Chains, routers, planners, multi-agent trade-offs, durable state and framework choice.</p>
        <div class="card-meta"><span class="tag blue">Patterns</span><span class="tag blue">Durability</span></div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Platform &amp; Operations</div>
  <div class="ref-body">
    <div class="card-grid">
      <div class="card" onclick="showPage('ai-azure-openai', document.querySelector('[onclick*=ai-azure-openai]'))">
        <div class="card-icon">🔷</div><h3>Azure OpenAI</h3>
        <p>Deployment types, PTU vs Standard vs Batch, private networking, identity and quotas.</p>
        <div class="card-meta"><span class="tag blue">PTU</span><span class="tag blue">Managed Identity</span></div>
      </div>
      <div class="card" onclick="showPage('ai-foundry', document.querySelector('[onclick*=ai-foundry]'))">
        <div class="card-icon">🏭</div><h3>Azure AI Foundry</h3>
        <p>Model catalogue, managed agents, evaluation, tracing, safety and project governance.</p>
        <div class="card-meta"><span class="tag blue">Evaluation</span><span class="tag blue">Catalogue</span></div>
      </div>
      <div class="card" onclick="showPage('ai-cost-performance', document.querySelector('[onclick*=ai-cost-performance]'))">
        <div class="card-icon">⚡</div><h3>Cost &amp; Performance</h3>
        <p>Cost model, routing, caching layers, latency budgets and FinOps for AI.</p>
        <div class="card-meta"><span class="tag blue">Routing</span><span class="tag blue">Caching</span></div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">The Cross-Cutting Answers</div>
  <div class="ref-body">
    <p>Five themes come up in almost every AI architecture interview, whatever the specific question.</p>

    <div class="two-col">
      <div>
        <div class="ans-block"><div class="ans-label">1. Grounding beats cleverness</div>
        Most quality problems are retrieval problems. Fix what reaches the prompt before
        tuning how the model is asked.</div>
        <div class="ans-block"><div class="ans-label">2. Identity flows end to end</div>
        The assistant must never see or do more than the person it acts for. Filters
        and tool authorisation derive from the validated token, server-side.</div>
        <div class="ans-block"><div class="ans-label">3. Treat the model as an unreliable dependency</div>
        Schema-validate output, cap budgets, retry once, then fall back to a human.
        Same discipline as any external API.</div>
      </div>
      <div>
        <div class="ans-block"><div class="ans-label">4. Measure or you are guessing</div>
        A golden evaluation set in CI is what separates engineering from prompt
        folklore. Regressions here are silent.</div>
        <div class="ans-block"><div class="ans-label">5. Cost is an architecture concern</div>
        Model routing, context discipline and caching are design decisions, not a
        billing problem to discover at month end.</div>
      </div>
    </div>

    <div class="tip-box">✅ If you remember one line for interviews: "The model is a commodity. The architecture
    around it — grounding, identity, evaluation, orchestration and cost governance — is the engineering."</div>
  </div>
</div>
`;
