window.Pages['ai-model-comparison'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>Public Model Landscape &amp; Comparison</span></div>
  <h1>⚖️ Public Model Landscape &amp; Comparison</h1>
  <p>Which public model for which use case, and how to compare them on the metrics that actually matter</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">🧠</div><div class="principle-name">Reasoning-heavy</div><p>Multi-step logic, planning, hard coding — pick a "thinking" model</p></div>
      <div class="principle-card"><div class="principle-icon">⚡</div><div class="principle-name">High-volume / low-latency</div><p>Chat, classification, extraction — pick a small/fast model</p></div>
      <div class="principle-card"><div class="principle-icon">🖼️</div><div class="principle-name">Multimodal</div><p>Images, documents, audio — pick a model with native vision/audio</p></div>
      <div class="principle-card"><div class="principle-icon">🔓</div><div class="principle-name">Open-weight</div><p>Self-host, fine-tune, data never leaves your VPC</p></div>
    </div>
    <div class="tip-box">✅ Interview framing: "I don't pick 'the best model' — I pick the cheapest model that clears the accuracy bar for the specific task, and I keep the model behind my own interface so swapping it is a config change, not a rewrite."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Implementation Flow — Which Model Does Which Job</div>
  <div class="ref-body">
    <div style="background:#0b0f19;border:1px solid #1f2937;border-radius:12px;padding:22px;overflow-x:auto;">
      <div style="min-width:820px;font-family:'Consolas','Courier New',monospace;">

        <div style="display:flex;justify-content:center;margin-bottom:12px;">
          <div style="color:#cbd5e1;font-size:12px;border:1px solid #334155;border-radius:20px;padding:5px 16px;">👤 User Query</div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <!-- Stage 1: Router -->
        <div style="background:#2a2008;border:1px solid #b45309;border-radius:10px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <div style="color:#fcd34d;font-size:11px;font-weight:700;letter-spacing:.04em;">① ROUTER / INTENT CLASSIFIER</div>
              <div style="color:#fde68a;font-size:10px;margin-top:2px;">Decide: simple Q&amp;A, needs retrieval, needs a tool, or needs deep reasoning?</div>
            </div>
            <span style="background:#3a2a0a;color:#fde68a;font-size:10px;border-radius:6px;padding:4px 10px;white-space:nowrap;">🏷️ GPT-4o-mini / Claude Haiku / Phi-4</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <!-- Stage 2: Embedding -->
        <div style="background:#1e1030;border:1px solid #7c3aed;border-radius:10px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <div style="color:#c4b5fd;font-size:11px;font-weight:700;letter-spacing:.04em;">② EMBEDDING MODEL (retrieval path only)</div>
              <div style="color:#ddd6fe;font-size:10px;margin-top:2px;">Turn the query into a vector to search the knowledge base</div>
            </div>
            <span style="background:#2a1850;color:#ddd6fe;font-size:10px;border-radius:6px;padding:4px 10px;white-space:nowrap;">🧩 text-embedding-3-small / Cohere Embed</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <!-- Stage 3: Re-ranker -->
        <div style="background:#07241f;border:1px solid #0d9488;border-radius:10px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <div style="color:#5eead4;font-size:11px;font-weight:700;letter-spacing:.04em;">③ RE-RANKER (optional, high-precision retrieval)</div>
              <div style="color:#99f6e4;font-size:10px;margin-top:2px;">Re-score top-k chunks for relevance before they reach the generator</div>
            </div>
            <span style="background:#0e3934;color:#99f6e4;font-size:10px;border-radius:6px;padding:4px 10px;white-space:nowrap;">🎯 Cohere Rerank / cross-encoder</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <!-- Stage 4: Branch - Tool agent vs Reasoning vs Generation -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:10px;">
          <div style="background:#07241f;border:1px solid #0d9488;border-radius:10px;padding:12px;">
            <div style="color:#5eead4;font-size:11px;font-weight:700;letter-spacing:.04em;margin-bottom:6px;">④a TOOL-CALLING AGENT</div>
            <div style="color:#99f6e4;font-size:10px;margin-bottom:6px;">Needs an API/DB/calculator call before answering</div>
            <span style="background:#0e3934;color:#99f6e4;font-size:10px;border-radius:6px;padding:4px 8px;">🔧 GPT-4o / Claude Sonnet</span>
          </div>
          <div style="background:#1e1030;border:1px solid #7c3aed;border-radius:10px;padding:12px;">
            <div style="color:#c4b5fd;font-size:11px;font-weight:700;letter-spacing:.04em;margin-bottom:6px;">④b DEEP REASONING</div>
            <div style="color:#ddd6fe;font-size:10px;margin-bottom:6px;">Multi-step logic, planning, hard math/code</div>
            <span style="background:#2a1850;color:#ddd6fe;font-size:10px;border-radius:6px;padding:4px 8px;">🧠 o1/o3 · DeepSeek-R1 · Claude Opus</span>
          </div>
          <div style="background:#2a0f14;border:1px solid #be123c;border-radius:10px;padding:12px;">
            <div style="color:#fda4af;font-size:11px;font-weight:700;letter-spacing:.04em;margin-bottom:6px;">④c GROUNDED GENERATION</div>
            <div style="color:#fecdd3;font-size:10px;margin-bottom:6px;">Straightforward answer from retrieved context</div>
            <span style="background:#3a151d;color:#fecdd3;font-size:10px;border-radius:6px;padding:4px 8px;">✍️ GPT-4o-mini · Claude Haiku · Gemini Flash</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <!-- Stage 5: Guardrail / critic -->
        <div style="background:#2a0f14;border:1px solid #be123c;border-radius:10px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <div style="color:#fda4af;font-size:11px;font-weight:700;letter-spacing:.04em;">⑤ GUARDRAIL / CRITIC (optional, high-stakes answers)</div>
              <div style="color:#fecdd3;font-size:10px;margin-top:2px;">Check groundedness, policy compliance, hallucination risk before release</div>
            </div>
            <span style="background:#3a151d;color:#fecdd3;font-size:10px;border-radius:6px;padding:4px 10px;white-space:nowrap;">🛡️ small/cheap model — a second opinion, not a rewrite</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <!-- Final -->
        <div style="display:flex;justify-content:center;">
          <div style="color:#cbd5e1;font-size:12px;border:1px solid #334155;border-radius:20px;padding:5px 16px;">✅ Answer returned to user</div>
        </div>
      </div>
    </div>
    <div class="tip-box">✅ Interview line: "A production system is rarely one model doing everything — it's a pipeline where the cheapest capable model handles routing and embeddings, retrieval does the heavy lifting on grounding, and the expensive reasoning model is reserved for the fraction of queries that actually need multi-step thinking or tool orchestration. That mix is what keeps cost and latency sane at scale."</div>
    <div class="warn-box">⚠️ Common trap: sending every query through the most expensive flagship model "to be safe." In a well-designed pipeline, the router/embedding/generation stages — which handle the overwhelming majority of traffic — run on small, cheap models; the expensive reasoning model is invoked only when the router explicitly detects it's needed.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">OpenAI's Own Lineup — Which Model For Which Job</div>
  <div class="ref-body">
    <div class="warn-box">⚠️ "OpenAI" is not one model — it's several model FAMILIES, each built for a different stage of a RAG/agent pipeline. Using GPT-4o to generate embeddings, or an embedding model to write an answer, is a category error — they're not interchangeable.</div>
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.3fr 1.5fr;"><div>Job</div><div>OpenAI Model</div><div>What It Actually Does</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.3fr 1.5fr;"><div class="dt-name">Embedding (for retrieval/search)</div><div>text-embedding-3-small / text-embedding-3-large</div><div>Turns text into a vector for similarity search — never generates text, has no "answer" in it</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.3fr 1.5fr;"><div class="dt-name">Searching / ranking retrieved results</div><div>No dedicated OpenAI re-ranker — use the embedding's cosine similarity, or an LLM-as-judge call with GPT-4o-mini</div><div>OpenAI doesn't ship a re-ranker like Cohere Rerank; ranking is either vector-similarity score or a cheap LLM scoring prompt</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.3fr 1.5fr;"><div class="dt-name">General-purpose generation / chat / RAG answers</div><div>GPT-4o (flagship), GPT-4o-mini (cheap/fast)</div><div>Takes retrieved context + question, produces the final grounded answer</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.3fr 1.5fr;"><div class="dt-name">Deep multi-step reasoning</div><div>o1 / o3 ("reasoning" models)</div><div>Spends extra inference-time "thinking" tokens before answering — slower, pricier, for hard logic/math/planning</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.3fr 1.5fr;"><div class="dt-name">Tool-calling / agent orchestration</div><div>GPT-4o, GPT-4o-mini (both support function calling)</div><div>Emits structured tool_calls — the Reasoning Engine / Planner role</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.3fr 1.5fr;"><div class="dt-name">Vision / document understanding</div><div>GPT-4o (native multimodal)</div><div>Reads images, charts, scanned documents directly — no separate OCR step for most cases</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.3fr 1.5fr;"><div class="dt-name">Content moderation / safety filtering</div><div>omni-moderation-latest (free moderation endpoint)</div><div>Flags harmful content before/after generation — a guardrail step, not a generator</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.3fr 1.5fr;"><div class="dt-name">Speech-to-text</div><div>Whisper (whisper-1)</div><div>Transcribes audio to text — feeds into the same RAG/agent pipeline as any other text input</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.3fr 1.5fr;"><div class="dt-name">Text-to-speech</div><div>tts-1 / tts-1-hd</div><div>Converts the final generated answer to audio — last-mile output, not part of reasoning</div></div>
    </div>
    <div class="code-box">Mapping onto the RAG pipeline (same stages as the Implementation Flow above):

  ① Router/classifier    → GPT-4o-mini
  ② Embedding             → text-embedding-3-small (or -large for higher recall)
  ③ Re-ranking            → cosine similarity from ② OR a GPT-4o-mini "score this" call
  ④a Tool-calling agent   → GPT-4o / GPT-4o-mini (function calling)
  ④b Deep reasoning       → o1 / o3
  ④c Grounded generation  → GPT-4o-mini (cheap path) or GPT-4o (quality path)
  ⑤ Guardrail/moderation  → omni-moderation-latest
  (optional) voice I/O    → whisper-1 in, tts-1 out</div>
    <div class="tip-box">✅ Interview line: "Within just OpenAI's lineup, a production RAG system already uses at least three different models — an embedding model for retrieval, a cheap chat model for routing and most generation, and reserves the reasoning models (o1/o3) for the fraction of queries that need genuine multi-step logic. Treating 'GPT' as a single model that does everything is the most common beginner mistake I see in system design answers."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Public Model Families &amp; Primary Use Cases</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1fr 1.6fr 1.3fr;">
        <div>Family</div><div>Type</div><div>Best-Fit Use Cases</div><div>Notable Tiers</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.6fr 1.3fr;"><div class="dt-name">OpenAI GPT</div><div>Closed API</div><div>General chat, tool-calling agents, code generation, vision</div><div>GPT-4o (flagship), GPT-4o-mini (cheap/fast), o1/o3 (deep reasoning)</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.6fr 1.3fr;"><div class="dt-name">Anthropic Claude</div><div>Closed API</div><div>Long-document analysis, careful/safety-sensitive writing, agentic coding</div><div>Opus (flagship reasoning), Sonnet (balanced), Haiku (fast/cheap)</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.6fr 1.3fr;"><div class="dt-name">Google Gemini</div><div>Closed API</div><div>Massive-context document/video analysis, multimodal, Google Workspace integration</div><div>Gemini Pro (flagship), Gemini Flash (fast/cheap)</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.6fr 1.3fr;"><div class="dt-name">Meta Llama</div><div>Open-weight</div><div>Self-hosted inference, fine-tuning, data-residency-sensitive workloads</div><div>Llama 3.x 8B / 70B / 405B</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.6fr 1.3fr;"><div class="dt-name">Mistral</div><div>Open-weight + API</div><div>Cost-efficient self-hosted deployments, European data residency (GDPR)</div><div>Mistral Small/Large, Mixtral (MoE)</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.6fr 1.3fr;"><div class="dt-name">Microsoft Phi</div><div>Open-weight (small)</div><div>Edge/on-device inference, low-resource environments, cheap classification</div><div>Phi-3 / Phi-4 (3.8B–14B)</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.6fr 1.3fr;"><div class="dt-name">Amazon Titan / Nova</div><div>Closed API (AWS Bedrock)</div><div>AWS-native enterprise workloads, multimodal via Bedrock</div><div>Nova Micro/Lite/Pro</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.6fr 1.3fr;"><div class="dt-name">Cohere Command</div><div>Closed API</div><div>Enterprise RAG, multilingual retrieval, re-ranking</div><div>Command R / R+ (retrieval-optimized)</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1fr 1.6fr 1.3fr;"><div class="dt-name">DeepSeek</div><div>Open-weight</div><div>Cost-efficient reasoning and coding at near-flagship quality</div><div>DeepSeek-V3, DeepSeek-R1 (reasoning)</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Use-Case → Model Selection Matrix</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Use Case</div><div>Recommended Shape</div><div>Why</div></div>
      <div class="dt-row"><div class="dt-name">Customer support chatbot (RAG)</div><div>Small/fast model (GPT-4o-mini, Claude Haiku, Gemini Flash)</div><div>High volume, latency-sensitive, grounded by retrieval — flagship reasoning adds cost, not accuracy here</div></div>
      <div class="dt-row"><div class="dt-name">Code generation / agentic coding</div><div>Claude Sonnet/Opus, GPT-4o, DeepSeek-V3</div><div>Strong code+reasoning benchmarks, good tool-calling reliability</div></div>
      <div class="dt-row"><div class="dt-name">Complex multi-step reasoning (planning, math, audits)</div><div>o1/o3, DeepSeek-R1, Claude Opus (extended thinking)</div><div>"Thinking" models trade latency/cost for deliberate multi-step reasoning</div></div>
      <div class="dt-row"><div class="dt-name">Long-document / contract analysis</div><div>Gemini Pro (huge context), Claude (long context + careful reading)</div><div>Context window and long-context recall quality dominate this use case</div></div>
      <div class="dt-row"><div class="dt-name">Classification / extraction at scale</div><div>Phi-4, GPT-4o-mini, Claude Haiku, fine-tuned small open model</div><div>Simple task, huge volume — cheapest model that clears the accuracy bar wins</div></div>
      <div class="dt-row"><div class="dt-name">On-prem / data-residency-locked workloads</div><div>Llama 3.x, Mistral, Phi — self-hosted</div><div>Data never leaves your infrastructure; no vendor API call at inference time</div></div>
      <div class="dt-row"><div class="dt-name">Multilingual enterprise RAG</div><div>Cohere Command R+, Gemini, GPT-4o</div><div>Strong multilingual retrieval/re-ranking and generation support</div></div>
      <div class="dt-row"><div class="dt-name">Vision / document OCR + understanding</div><div>GPT-4o, Gemini Pro, Claude (vision)</div><div>Native multimodal input — no separate OCR pipeline needed for most documents</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Comparing Models — The Metrics That Actually Matter</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Metric</div><div>What It Tells You</div><div>Where It Bites You If Ignored</div></div>
      <div class="dt-row"><div class="dt-name">Context window</div><div>Max tokens the model can read at once (8K–2M+ depending on model)</div><div>Long documents get silently truncated or force aggressive chunking</div></div>
      <div class="dt-row"><div class="dt-name">Cost per 1M tokens (input/output)</div><div>Direct driver of unit economics at scale</div><div>A "slightly better" flagship model can be 10-20x the cost of a small model for marginal gain</div></div>
      <div class="dt-row"><div class="dt-name">Latency (time-to-first-token / total)</div><div>User-facing responsiveness</div><div>Reasoning models (o1/R1) can take 10-60s+ — unusable for a live chat turn</div></div>
      <div class="dt-row"><div class="dt-name">Throughput (tokens/sec)</div><div>How fast the full response streams</div><div>Matters for long-form generation (reports, code files)</div></div>
      <div class="dt-row"><div class="dt-name">Reasoning benchmark scores (MMLU, GPQA, HumanEval, SWE-bench)</div><div>Proxy for raw capability on knowledge/code/reasoning tasks</div><div>Benchmarks can be saturated/gamed — validate on YOUR eval set, not just the leaderboard</div></div>
      <div class="dt-row"><div class="dt-name">Tool-calling reliability</div><div>How consistently the model emits valid, well-formed function calls</div><div>A model with great raw reasoning but flaky tool-calling breaks agent pipelines in production</div></div>
      <div class="dt-row"><div class="dt-name">Multimodality</div><div>Native support for images, audio, video vs text-only</div><div>Text-only models force a separate OCR/vision pipeline, adding cost and failure points</div></div>
      <div class="dt-row"><div class="dt-name">Fine-tunability</div><div>Can you adapt it to your domain/style with your own data?</div><div>Closed flagship APIs often restrict or don't offer fine-tuning; open-weight models do</div></div>
      <div class="dt-row"><div class="dt-name">Licensing / data residency</div><div>Where inference runs, what the provider can/can't do with your data</div><div>Regulatory blockers (GDPR, data sovereignty) can rule out an otherwise-ideal model entirely</div></div>
      <div class="dt-row"><div class="dt-name">Rate limits / availability SLA</div><div>Requests-per-minute caps, regional availability</div><div>A great model you can't scale to your traffic is not a production option</div></div>
    </div>
    <div class="warn-box">⚠️ Common trap: comparing models purely on a public leaderboard score. Leaderboards measure general capability; your production decision should weigh capability against YOUR latency budget, YOUR cost ceiling, and YOUR eval set's pass rate — a model that's #1 on a benchmark but 8x your cost ceiling is not the right answer.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Worked Example — Picking A Model For A Support RAG Bot</div>
  <div class="ref-body">
    <div class="code-box">Requirement: 50,000 chats/day, p95 latency &lt; 2s, grounded answers
             from a 10,000-document knowledge base, budget-conscious

Step 1 — Eliminate by latency:    o1/R1 reasoning models OUT (too slow)
Step 2 — Eliminate by cost:       flagship Opus/GPT-4o OUT at this volume
                                   unless accuracy testing proves it's needed
Step 3 — Candidates:              GPT-4o-mini, Claude Haiku, Gemini Flash,
                                   fine-tuned Phi-4 (self-hosted)
Step 4 — Run YOUR eval set        (grounded-answer accuracy, refusal
         against each candidate    correctness, citation accuracy)
Step 5 — Pick cheapest model      e.g. Claude Haiku scores 94% on your
         that clears the bar       eval set at 1/8th Opus's cost → ship it,
                                    revisit if accuracy requirements rise</div>
    <div class="tip-box">✅ Interview line: "I treat model selection as an empirical decision, not a preference — narrow the field by hard constraints (latency, cost ceiling, data residency), then run every remaining candidate against my own eval set and pick the cheapest one that clears the bar. I keep that decision behind an abstraction so a better/cheaper model next quarter is a config swap."</div>
  </div>
</div>
`;
