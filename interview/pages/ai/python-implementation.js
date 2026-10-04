window.Pages['ai-python-implementation'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>Implementing AI Agents &amp; RAG in Python</span></div>
  <h1>🐍 Implementing AI Agents &amp; RAG in Python</h1>
  <p>Why Python is the native home for this stack, and a working end-to-end implementation</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance — Why Python, Natively</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">📦</div><div class="principle-name">First-class SDKs</div><p>OpenAI, Azure OpenAI, Anthropic, Hugging Face all ship Python-first; .NET/Java SDKs trail or wrap them</p></div>
      <div class="principle-card"><div class="principle-icon">🧮</div><div class="principle-name">Native ML/data stack</div><p>numpy, pandas, scikit-learn, PyTorch — embeddings and vector math are native, not bolted on</p></div>
      <div class="principle-card"><div class="principle-icon">🧰</div><div class="principle-name">Framework ecosystem</div><p>LangChain, LlamaIndex, Semantic Kernel (Python), CrewAI, AutoGen — agent/RAG frameworks launch here first</p></div>
      <div class="principle-card"><div class="principle-icon">⚡</div><div class="principle-name">async/await built in</div><p>asyncio handles concurrent LLM/tool calls the same shape as C# Task-based async</p></div>
    </div>
    <div class="tip-box">✅ Interview framing: "Python isn't the only option — I've built the orchestration layer in .NET/Semantic Kernel for enterprise systems that are already .NET shops. But for new agentic/RAG work, Python is where the ecosystem lands first: new model releases, new retrieval techniques, and new agent frameworks all ship Python support months before anywhere else."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Flow Diagram — From Raw Files To Agent Answer, File By File</div>
  <div class="ref-body">
    <div style="background:#0b0f19;border:1px solid #1f2937;border-radius:12px;padding:22px;overflow-x:auto;">
      <div style="min-width:820px;font-family:'Consolas','Courier New',monospace;">

        <!-- Stage 0: sources -->
        <div style="display:flex;justify-content:center;margin-bottom:12px;">
          <div style="color:#cbd5e1;font-size:12px;border:1px solid #334155;border-radius:20px;padding:5px 16px;">📁 Raw documents (PDF, docs, text)</div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <!-- Stage 1: chunk + embed (offline) -->
        <div style="background:#0c2415;border:1px solid #16a34a;border-radius:10px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <div style="color:#86efac;font-size:11px;font-weight:700;letter-spacing:.04em;">① INGEST &amp; EMBED — offline, run once per document set</div>
              <div style="color:#bbf7d0;font-size:10px;margin-top:2px;">Chunk text, call the embeddings API for each chunk, keep source + text alongside the vector</div>
            </div>
            <span style="background:#123820;color:#bbf7d0;font-size:10px;border-radius:6px;padding:4px 10px;white-space:nowrap;">📄 rag_pipeline.py → embed()</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <!-- Stage 2: vector store -->
        <div style="background:#1e1030;border:1px solid #7c3aed;border-radius:10px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <div style="color:#c4b5fd;font-size:11px;font-weight:700;letter-spacing:.04em;">② STORE — InMemoryVectorStore (swap for pgvector/Azure AI Search in prod)</div>
              <div style="color:#ddd6fe;font-size:10px;margin-top:2px;">Holds every Chunk(text, embedding, source) — searchable by cosine similarity</div>
            </div>
            <span style="background:#2a1850;color:#ddd6fe;font-size:10px;border-radius:6px;padding:4px 10px;white-space:nowrap;">📄 rag_pipeline.py → InMemoryVectorStore</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <!-- Stage 3: user query -->
        <div style="display:flex;justify-content:center;margin-bottom:12px;">
          <div style="color:#cbd5e1;font-size:12px;border:1px solid #334155;border-radius:20px;padding:5px 16px;">👤 User query arrives — online, per request</div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <!-- Stage 4: agent loop -->
        <div style="background:#2a2008;border:1px solid #b45309;border-radius:10px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <div style="color:#fcd34d;font-size:11px;font-weight:700;letter-spacing:.04em;">③ AGENT LOOP — Planner decides: answer now, or call a tool?</div>
              <div style="color:#fde68a;font-size:10px;margin-top:2px;">Bounded loop (max_steps) — model emits tool_calls or a final answer each turn</div>
            </div>
            <span style="background:#3a2a0a;color:#fde68a;font-size:10px;border-radius:6px;padding:4px 10px;white-space:nowrap;">📄 agent.py → run_agent()</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <!-- Stage 5: branch - tool exec vs direct -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px;">
          <div style="background:#07241f;border:1px solid #0d9488;border-radius:10px;padding:12px;">
            <div style="color:#5eead4;font-size:11px;font-weight:700;letter-spacing:.04em;margin-bottom:6px;">④a TOOL EXECUTION</div>
            <div style="color:#99f6e4;font-size:10px;margin-bottom:6px;">search_knowledge_base() hits the vector store; lookup_order_status() hits the DB</div>
            <span style="background:#0e3934;color:#99f6e4;font-size:10px;border-radius:6px;padding:4px 8px;">📄 agent.py → call_tool()</span>
          </div>
          <div style="background:#2a0f14;border:1px solid #be123c;border-radius:10px;padding:12px;">
            <div style="color:#fda4af;font-size:11px;font-weight:700;letter-spacing:.04em;margin-bottom:6px;">④b DIRECT GROUNDED ANSWER</div>
            <div style="color:#fecdd3;font-size:10px;margin-bottom:6px;">Simple query — retrieve once, generate with temperature=0, cite the source</div>
            <span style="background:#3a151d;color:#fecdd3;font-size:10px;border-radius:6px;padding:4px 8px;">📄 rag_pipeline.py → answer()</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:10px;">④a loops back to ③ with the tool result appended to messages — until the Planner is confident enough to stop</div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <!-- Final -->
        <div style="display:flex;justify-content:center;">
          <div style="color:#cbd5e1;font-size:12px;border:1px solid #334155;border-radius:20px;padding:5px 16px;">✅ Final answer returned to the caller</div>
        </div>
      </div>
    </div>
    <div class="tip-box">✅ Notice the split between OFFLINE (①②, run once or on a schedule when documents change) and ONLINE (③④, run per user request) — conflating the two means re-embedding your entire knowledge base on every query, which is both slow and needlessly expensive.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Minimal RAG Pipeline — Native Python, No Framework</div>
  <div class="ref-body">
    <div class="code-box">Chunk → Embed → Store → Retrieve → Generate — the whole classic RAG
loop in plain Python, so the mechanics are visible before adding a
framework on top.</div>
    <div class="ans-block"><div class="ans-label">rag_pipeline.py</div>
    <div class="code-box">import os
from dataclasses import dataclass
from openai import AzureOpenAI
import numpy as np

client = AzureOpenAI(
    api_key=os.environ["AZURE_OPENAI_KEY"],
    api_version="2024-06-01",
    azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"],
)

@dataclass
class Chunk:
    text: str
    embedding: list[float]
    source: str

def embed(text: str) -> list[float]:
    resp = client.embeddings.create(model="text-embedding-3-small", input=text)
    return resp.data[0].embedding

def cosine_similarity(a: list[float], b: list[float]) -> float:
    a, b = np.array(a), np.array(b)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

class InMemoryVectorStore:
    def __init__(self):
        self._chunks: list[Chunk] = []

    def add(self, text: str, source: str) -> None:
        self._chunks.append(Chunk(text=text, embedding=embed(text), source=source))

    def search(self, query: str, top_k: int = 3) -> list[Chunk]:
        q_emb = embed(query)
        scored = [(cosine_similarity(q_emb, c.embedding), c) for c in self._chunks]
        scored.sort(key=lambda x: x[0], reverse=True)
        return [c for _, c in scored[:top_k]]

def answer(query: str, store: InMemoryVectorStore) -> str:
    retrieved = store.search(query)
    context = "\\n---\\n".join(f"[{c.source}] {c.text}" for c in retrieved)

    system_prompt = (
        "Answer ONLY using the provided context. "
        "If the context doesn't contain the answer, say you don't know. "
        "Always cite the source in brackets."
    )
    resp = client.chat.completions.create(
        model="gpt-4o",
        temperature=0,                      # deterministic — same grounding discipline
        messages=[                          # discussed on the RAG topic page
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Context:\\n{context}\\n\\nQuestion: {query}"},
        ],
    )
    return resp.choices[0].message.content</div></div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Tool-Calling Agent — Native Python, No Framework</div>
  <div class="ref-body">
    <div class="code-box">This is the "Reasoning Engine" from the Agentic RAG page — Planner +
Tool Execution + a bounded loop — written directly against the OpenAI
function-calling API, no agent framework required.</div>
    <div class="ans-block"><div class="ans-label">agent.py</div>
    <div class="code-box">import json

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "search_knowledge_base",
            "description": "Search the vector store for relevant context",
            "parameters": {
                "type": "object",
                "properties": {"query": {"type": "string"}},
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "lookup_order_status",
            "description": "Look up an order's status in the relational DB",
            "parameters": {
                "type": "object",
                "properties": {"order_id": {"type": "string"}},
                "required": ["order_id"],
            },
        },
    },
]

def call_tool(name: str, args: dict, store: InMemoryVectorStore) -> str:
    if name == "search_knowledge_base":
        results = store.search(args["query"])
        return json.dumps([{"source": c.source, "text": c.text} for c in results])
    if name == "lookup_order_status":
        return json.dumps({"order_id": args["order_id"], "status": "Shipped"})
    raise ValueError(f"Unknown tool: {name}")

def run_agent(query: str, store: InMemoryVectorStore, max_steps: int = 4) -> str:
    messages = [
        {"role": "system", "content": "Use tools when you need facts. Don't guess."},
        {"role": "user", "content": query},
    ]

    for _ in range(max_steps):                      # bounded loop — never spin forever
        resp = client.chat.completions.create(
            model="gpt-4o", messages=messages, tools=TOOLS, tool_choice="auto"
        )
        msg = resp.choices[0].message

        if not msg.tool_calls:                       # Conditional Router: confident → stop
            return msg.content

        messages.append(msg)
        for tool_call in msg.tool_calls:              # Tool Execution step
            args = json.loads(tool_call.function.arguments)
            result = call_tool(tool_call.function.name, args, store)
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": result,
            })
        # loop continues → Planner re-evaluates with tool results in context

    return "Could not resolve within the step budget — escalating to a human."</div></div>
    <div class="warn-box">⚠️ The <code>max_steps</code> bound is not optional — it's the Python equivalent of the "bounded iteration limit" on the Reasoning Engine's Conditional Router from the Agentic RAG architecture. Without it, a model that keeps calling tools without converging runs (and bills) indefinitely.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Same System With a Framework — LangChain / LangGraph</div>
  <div class="ref-body">
    <div class="code-box">Hand-rolled Python (above) is ~120 lines and fully visible. A
framework trades that visibility for built-in state management,
streaming, memory, and a larger tool/retriever ecosystem — worth it
once the agent graph has real branching, not for a single tool loop.</div>
    <div class="ans-block"><div class="ans-label">langgraph_agent.py — same agent, graph-shaped</div>
    <div class="code-box">from langgraph.graph import StateGraph, END
from langchain_openai import AzureChatOpenAI
from langchain_core.tools import tool

@tool
def search_knowledge_base(query: str) -> str:
    """Search the vector store for relevant context."""
    return "\\n".join(c.text for c in vector_store.search(query))

llm = AzureChatOpenAI(azure_deployment="gpt-4o", temperature=0).bind_tools(
    [search_knowledge_base]
)

def call_model(state):
    return {"messages": [llm.invoke(state["messages"])]}

def should_continue(state):
    last = state["messages"][-1]
    return "tools" if last.tool_calls else END

graph = StateGraph(dict)
graph.add_node("agent", call_model)
graph.add_node("tools", ToolNode([search_knowledge_base]))   # LangGraph built-in
graph.add_conditional_edges("agent", should_continue, {"tools": "tools", END: END})
graph.add_edge("tools", "agent")                              # loop back — Conditional Router
graph.set_entry_point("agent")
app = graph.compile()</div></div>
    <div class="tip-box">✅ Interview line: "I default to plain Python + the provider SDK until I actually need multi-node branching, shared state across agents, or built-in checkpointing — LangGraph's conditional-edge graph is the same Conditional-Router concept as the hand-rolled loop, just with the state machine made explicit and reusable across more complex flows."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Python vs .NET — When Each Makes Sense</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2fr 2fr;"><div>Factor</div><div>Python</div><div>.NET / C#</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2fr;"><div class="dt-name">New model/framework access</div><div class="dt-yes">Day-one support (OpenAI, Anthropic, HF, LangChain, LlamaIndex)</div><div>Often wraps the Python/REST API, lags by weeks-months</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2fr;"><div class="dt-name">Data science / ML tooling</div><div class="dt-yes">numpy, pandas, PyTorch, scikit-learn native</div><div>ML.NET exists but far smaller ecosystem</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2fr;"><div class="dt-name">Enterprise integration</div><div>Needs glue (FastAPI service called from .NET)</div><div class="dt-yes">Native DI, strong typing, fits existing enterprise .NET platform</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2fr;"><div class="dt-name">Team &amp; ops fit</div><div>Best if the team already ships Python services</div><div class="dt-yes">Best when the rest of the platform (APIs, AKS workloads) is already .NET</div></div>
      <div class="dt-row" style="grid-template-columns:1.2fr 2fr 2fr;"><div class="dt-name">Governance/observability wiring</div><div>Built per-project unless using a platform like Azure AI Foundry</div><div class="dt-yes">Semantic Kernel plugs into existing enterprise DI/telemetry conventions</div></div>
    </div>
    <div class="tip-box">✅ Realistic architecture for a .NET shop: prototype and iterate on the RAG/agent logic in Python (fastest access to the ecosystem), then either keep it as a small Python microservice behind a REST/gRPC boundary the .NET platform calls, or port the stabilized logic to Semantic Kernel once the design has settled — don't force the whole enterprise platform to become Python just to use the newest framework.</div>
  </div>
</div>
`;
