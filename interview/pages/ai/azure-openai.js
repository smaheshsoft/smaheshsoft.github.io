window.Pages['ai-azure-openai'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>Azure OpenAI</span></div>
  <h1>🔷 Azure OpenAI Service</h1>
  <p>Why enterprises pick it · Deployment types · Networking &amp; identity · Quotas · Interview answers</p>
</div>

<div class="ref-section">
  <div class="ref-title">Why Enterprises Choose Azure OpenAI</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div>Concern</div><div>Public API</div><div>Azure OpenAI</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Data handling</div><div>Provider terms</div><div class="dt-yes">Your prompts are not used to train models</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Residency</div><div>Provider regions</div><div class="dt-yes">Choose the Azure region; data stays in it</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Network</div><div>Public internet</div><div class="dt-yes">VNet, Private Link, no public egress</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Identity</div><div>API keys</div><div class="dt-yes">Entra ID + Managed Identity + RBAC</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Compliance</div><div>Varies</div><div class="dt-yes">Inherits Azure certifications and contracts</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 1.5fr;">
        <div class="dt-name">Governance</div><div>Separate billing</div><div class="dt-yes">Azure Policy, cost tags, subscription controls</div>
      </div>
    </div>

    <div class="tip-box">💡 In a regulated enterprise the decision is rarely about model quality — it is about
    <b>data boundary, identity and procurement</b>. Azure OpenAI wins because it lands inside controls the
    organisation has already approved.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Deployment Types — The Cost And Latency Decision</div>
  <div class="ref-body">
    <div class="code-box">STANDARD (pay-as-you-go, shared capacity)
  Pay per token. No commitment. Latency varies with neighbour load.
  Subject to per-deployment TPM/RPM quota; bursts can hit 429.
  ✅ Development, pilots, spiky or low-volume production

PROVISIONED THROUGHPUT (PTU — reserved capacity)
  Buy dedicated units. Predictable latency, no noisy-neighbour effect.
  Fixed monthly cost whether you use it or not.
  ✅ High steady volume, latency SLAs, customer-facing workloads

BATCH
  Submit a job, results within a long window, significant discount.
  ✅ Nightly summarisation, bulk classification, back-catalogue processing

COMMON ENTERPRISE SHAPE
  PTU for the interactive path (predictable p95)
  + Standard as spillover when PTU saturates
  + Batch for everything that does not need to be real time</div>

    <div class="warn-box">⚠️ PTU is a capacity commitment, not a discount. Model your real token throughput
    first — teams routinely over-buy on peak estimates and then run at 30% utilisation. Start on Standard,
    measure for a few weeks, then size PTU against observed p95.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Reference Architecture</div>
  <div class="ref-body">
    <div class="code-box">Client / App
     │  Entra ID token
     ▼
[ API Management ]  ← rate limits per tenant, token metering, key vaulting,
     │                caching, request/response logging, model routing
     ▼
[ Your orchestration service ]  (Managed Identity, no keys)
     │
     ├─► Azure AI Search        vector + keyword, identity-filtered
     ├─► Content Safety         input and output screening
     ├─► Cosmos DB / PostgreSQL conversation state, audit
     ▼
[ Azure OpenAI ]  Private Endpoint · region-pinned · versioned deployment
     │
     └─► Application Insights + Log Analytics  (tokens, latency, errors, cost)

MULTI-REGION
  Primary region PTU + secondary region Standard.
  Route on 429 or elevated latency. Keep prompts and model versions identical
  so failover does not silently change behaviour.</div>

    <div class="ans-block"><div class="ans-label">Managed Identity — no keys anywhere</div>
    <div class="code-box">// Key-based auth is the most common finding in an AI security review.
var client = new AzureOpenAIClient(
    new Uri(endpoint),
    new DefaultAzureCredential());     // Managed Identity in Azure, dev creds locally

// RBAC: assign "Cognitive Services OpenAI User" to the app's managed identity.
// Nothing secret in config, nothing to rotate, full Entra audit trail.</div></div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Quotas, Throttling And Resilience</div>
  <div class="ref-body">
    <div class="code-box">TPM  tokens per minute   — the real constraint. Includes prompt + completion.
RPM  requests per minute — roughly derived from TPM.

429 IS NORMAL. DESIGN FOR IT.
  Honour the Retry-After header — do not invent your own backoff
  Exponential backoff with jitter on top
  Fall back to a secondary region or a smaller model
  Queue non-interactive work rather than retrying in the request path

QUOTA STRATEGY
  Separate deployments per environment — dev must never starve prod
  Separate deployments per critical workload so one cannot exhaust another
  Per-tenant token budgets enforced at APIM, not just in application code

PIN THE MODEL VERSION
  Auto-update sounds convenient until behaviour shifts under a prompt you
  did not change. Pin, then upgrade deliberately behind your evaluation suite.</div>

    <div class="tip-box">💡 Track <b>tokens per request</b> as a metric, not just total spend. A prompt change that
    quietly adds 400 tokens per call is invisible in a daily total until the invoice arrives — but obvious on a
    per-request chart the day it ships.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Real-World Use Cases &amp; Industry Benefits</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-block"><div class="ans-label">Regulated grounded assistants</div>
        Banking, healthcare and public sector: private endpoints, region pinning
        and Entra ID make an internal assistant approvable.</div>
        <div class="ans-block"><div class="ans-label">Document processing at scale</div>
        Batch deployment for overnight extraction and classification across
        millions of documents at a materially lower unit cost.</div>
      </div>
      <div>
        <div class="ans-block"><div class="ans-label">Customer-facing experiences</div>
        PTU gives the predictable p95 you need to publish an SLA on a
        conversational feature.</div>
        <div class="ans-block"><div class="ans-label">Benefit: one governance model</div>
        AI spend, access and audit sit inside the same subscription, policy and
        tagging model as the rest of the estate — no new control plane.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answers</div>
  <div class="ref-body">
    <div class="qa-card">
      <div class="qa-question">Design a secure, production Azure OpenAI deployment.</div>
      <div class="qa-answer">"Azure OpenAI with a Private Endpoint and no public network access, pinned to an
      approved region and a pinned model version. Applications reach it only through APIM, which handles
      per-tenant rate limiting, token metering, caching and logging. Authentication is Entra ID with Managed
      Identity and the Cognitive Services OpenAI User role — no API keys in configuration. Content Safety screens
      input and output, grounding comes from Azure AI Search with identity-based filtering, and conversation
      state and audit go to Cosmos. For capacity, PTU in the primary region for predictable latency with
      Standard as spillover and a secondary region for failover. Application Insights tracks tokens, latency,
      error rate and cost per conversation, with alerts on spend anomalies."</div>
    </div>
    <div class="qa-card">
      <div class="qa-question">Your AI feature starts returning 429s in production. What do you do?</div>
      <div class="qa-answer">"Short term, confirm the retry path is honouring Retry-After with jitter, and that
      we are failing over to the secondary region rather than hammering the throttled one. Then check whether
      it is genuine growth or a regression — a prompt change that increased tokens per request will consume TPM
      without any traffic increase, which is why I chart tokens per request. Medium term, separate deployments
      so one workload cannot starve another, move non-interactive work to batch or a queue, and size PTU against
      observed p95. And per-tenant quotas at APIM so a single tenant cannot exhaust shared capacity."</div>
    </div>
  </div>
</div>
`;
