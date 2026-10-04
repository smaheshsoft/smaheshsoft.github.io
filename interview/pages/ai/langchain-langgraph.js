window.Pages['ai-langchain-langgraph'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>LangChain &amp; LangGraph for RAG</span></div>
  <h1>🦜 LangChain &amp; LangGraph for RAG</h1>
  <p>Where each framework fits in a RAG solution, and how they compose into the Agentic RAG pipeline</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">🔗</div><div class="principle-name">LangChain</div><p>Building blocks — document loaders, text splitters, retrievers, chains, vector-store integrations</p></div>
      <div class="principle-card"><div class="principle-icon">🕸️</div><div class="principle-name">LangGraph</div><p>Orchestration — a state-machine graph for looping, branching, multi-agent RAG flows</p></div>
      <div class="principle-card"><div class="principle-icon">🧩</div><div class="principle-name">Composable</div><p>LangGraph nodes typically call LangChain components internally — they're not competitors</p></div>
      <div class="principle-card"><div class="principle-icon">💾</div><div class="principle-name">Checkpointing</div><p>LangGraph persists graph state — survives a restart mid-conversation or mid-approval</p></div>
    </div>
    <div class="tip-box">✅ Interview framing: "LangChain gives me the RAG building blocks — loaders, splitters, retrievers, vector-store wrappers. LangGraph gives me the control flow around them — when classic chain-style RAG isn't enough and I need looping, branching, or multiple agents, I wrap those same LangChain components as nodes in a LangGraph graph."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Where Each One Fits In The RAG Pipeline</div>
  <div class="ref-body">
    <div style="background:#0b0f19;border:1px solid #1f2937;border-radius:12px;padding:22px;overflow-x:auto;">
      <div style="min-width:760px;font-family:'Consolas','Courier New',monospace;">

        <div style="display:flex;justify-content:center;margin-bottom:12px;">
          <div style="color:#cbd5e1;font-size:12px;border:1px solid #334155;border-radius:20px;padding:5px 16px;">📁 Documents</div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="background:#0c2415;border:1px solid #16a34a;border-radius:10px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <div style="color:#86efac;font-size:11px;font-weight:700;letter-spacing:.04em;">LANGCHAIN — Document Loaders &amp; Text Splitters</div>
              <div style="color:#bbf7d0;font-size:10px;margin-top:2px;">PyPDFLoader, WebBaseLoader, RecursiveCharacterTextSplitter</div>
            </div>
            <span style="background:#123820;color:#bbf7d0;font-size:10px;border-radius:6px;padding:4px 10px;">🔗 LangChain</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="background:#1e1030;border:1px solid #7c3aed;border-radius:10px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <div style="color:#c4b5fd;font-size:11px;font-weight:700;letter-spacing:.04em;">LANGCHAIN — Embeddings &amp; Vector Store Integration</div>
              <div style="color:#ddd6fe;font-size:10px;margin-top:2px;">AzureOpenAIEmbeddings + a unified interface over FAISS/pgvector/Azure AI Search/Pinecone</div>
            </div>
            <span style="background:#2a1850;color:#ddd6fe;font-size:10px;border-radius:6px;padding:4px 10px;">🔗 LangChain</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="display:flex;justify-content:center;margin-bottom:12px;">
          <div style="color:#cbd5e1;font-size:12px;border:1px solid #334155;border-radius:20px;padding:5px 16px;">👤 User query — online, per request</div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="background:#2a2008;border:1px solid #b45309;border-radius:10px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <div style="color:#fcd34d;font-size:11px;font-weight:700;letter-spacing:.04em;">LANGGRAPH — Stateful Graph: Retrieve → Grade → Re-retrieve/Answer</div>
              <div style="color:#fde68a;font-size:10px;margin-top:2px;">Owns the loop: is this retrieval good enough, or do we re-query / call a tool / escalate?</div>
            </div>
            <span style="background:#3a2a0a;color:#fde68a;font-size:10px;border-radius:6px;padding:4px 10px;">🕸️ LangGraph</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="background:#07241f;border:1px solid #0d9488;border-radius:10px;padding:12px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <div style="color:#5eead4;font-size:11px;font-weight:700;letter-spacing:.04em;">LANGCHAIN — Prompt Template + LLM Call (inside a LangGraph node)</div>
              <div style="color:#99f6e4;font-size:10px;margin-top:2px;">ChatPromptTemplate + AzureChatOpenAI — grounded generation with citations</div>
            </div>
            <span style="background:#0e3934;color:#99f6e4;font-size:10px;border-radius:6px;padding:4px 10px;">🔗 LangChain inside 🕸️ LangGraph</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="display:flex;justify-content:center;">
          <div style="color:#cbd5e1;font-size:12px;border:1px solid #334155;border-radius:20px;padding:5px 16px;">✅ Answer returned</div>
        </div>
      </div>
    </div>
    <div class="tip-box">✅ The pattern: LangChain components (loaders, splitters, retrievers, prompt templates, LLM wrappers) do the WORK inside each step; LangGraph decides the CONTROL FLOW between steps — when to loop back, branch, or stop.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. Classic RAG Chain — LangChain Only (No Loop Needed)</div>
  <div class="ref-body">
    <div class="code-box">Use this when one retrieve-then-generate pass is enough — simple
FAQ bot, single document set, no need to re-query or branch.</div>
    <div class="ans-block"><div class="ans-label">simple_rag_chain.py</div>
    <div class="code-box">from langchain_openai import AzureOpenAIEmbeddings, AzureChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# ── Ingest (offline) ──
docs = PyPDFLoader("policy.pdf").load()
chunks = RecursiveCharacterTextSplitter(
    chunk_size=800, chunk_overlap=100
).split_documents(docs)

embeddings = AzureOpenAIEmbeddings(azure_deployment="text-embedding-3-small")
vector_store = FAISS.from_documents(chunks, embeddings)
retriever = vector_store.as_retriever(search_kwargs={"k": 4})

# ── Chain (online, per query) ──
prompt = ChatPromptTemplate.from_template(
    "Answer ONLY using this context. Cite the source.\\n\\n"
    "Context:\\n{context}\\n\\nQuestion: {question}"
)
llm = AzureChatOpenAI(azure_deployment="gpt-4o", temperature=0)

def format_docs(docs):
    return "\\n---\\n".join(d.page_content for d in docs)

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

answer = rag_chain.invoke("What is the refund window for Enterprise customers?")</div></div>
    <div class="tip-box">✅ Interview line: "LangChain's LCEL (the pipe syntax above) composes retriever → prompt → model → parser into one declarative chain. For straightforward, single-pass RAG this is all I need — I don't reach for LangGraph until the flow needs to loop or branch."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. Agentic/Corrective RAG — LangGraph Adds The Loop</div>
  <div class="ref-body">
    <div class="code-box">Use this when retrieval quality is uncertain and the system should
grade its own retrieval, re-query with a rewritten question, or fall
back to a tool/web search before answering — the "Conditional Router"
from the Agentic RAG architecture, implemented as a graph.</div>
    <div class="ans-block"><div class="ans-label">corrective_rag_graph.py</div>
    <div class="code-box">from typing import TypedDict
from langgraph.graph import StateGraph, END

class RagState(TypedDict):
    question: str
    documents: list
    rewritten_question: str
    answer: str
    grade: str          # "good" | "insufficient"

def retrieve(state: RagState) -> RagState:
    docs = retriever.invoke(state.get("rewritten_question", state["question"]))
    return {**state, "documents": docs}

def grade_documents(state: RagState) -> RagState:
    # LLM call: "Do these documents actually answer the question?"
    verdict = grading_chain.invoke({
        "question": state["question"], "documents": format_docs(state["documents"])
    })
    return {**state, "grade": verdict}   # "good" or "insufficient"

def rewrite_question(state: RagState) -> RagState:
    better_q = rewrite_chain.invoke({"question": state["question"]})
    return {**state, "rewritten_question": better_q}

def generate(state: RagState) -> RagState:
    answer = rag_chain.invoke({
        "context": format_docs(state["documents"]), "question": state["question"]
    })
    return {**state, "answer": answer}

def route_after_grading(state: RagState) -> str:
    return "generate" if state["grade"] == "good" else "rewrite_question"

graph = StateGraph(RagState)
graph.add_node("retrieve", retrieve)
graph.add_node("grade_documents", grade_documents)
graph.add_node("rewrite_question", rewrite_question)
graph.add_node("generate", generate)

graph.set_entry_point("retrieve")
graph.add_edge("retrieve", "grade_documents")
graph.add_conditional_edges("grade_documents", route_after_grading,
                             {"generate": "generate", "rewrite_question": "rewrite_question"})
graph.add_edge("rewrite_question", "retrieve")   # loop back with a better question
graph.add_edge("generate", END)

app = graph.compile()
result = app.invoke({"question": "What's the refund window?"})</div></div>
    <div class="warn-box">⚠️ Without a max-iteration guard, <code>rewrite_question → retrieve → grade_documents</code> can loop forever if the knowledge base genuinely doesn't contain the answer. Add a step counter to <code>RagState</code> and route to a "give up, say you don't know" node after N attempts — the same bounded-loop discipline as the hand-rolled Python agent.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. Multi-Agent RAG — LangGraph Nodes As Specialist Agents</div>
  <div class="ref-body">
    <div class="code-box">Maps directly to the "Multi-Agent System" box from the Agentic RAG
architecture — Agent 1 (vector search), Agent 2 (structured data),
Agent 3 (verification) — each a LangGraph node, routed by a supervisor.</div>
    <div class="ans-block"><div class="ans-label">multi_agent_rag.py</div>
    <div class="code-box">class MultiAgentState(TypedDict):
    question: str
    route: str            # "docs" | "sql" | "both"
    doc_results: str
    sql_results: str
    verified_answer: str

def supervisor(state: MultiAgentState) -> MultiAgentState:
    route = router_chain.invoke({"question": state["question"]})  # cheap classifier model
    return {**state, "route": route}

def doc_agent(state: MultiAgentState) -> MultiAgentState:
    docs = retriever.invoke(state["question"])
    return {**state, "doc_results": format_docs(docs)}

def sql_agent(state: MultiAgentState) -> MultiAgentState:
    result = sql_chain.invoke({"question": state["question"]})     # text-to-SQL chain
    return {**state, "sql_results": result}

def verifier_agent(state: MultiAgentState) -> MultiAgentState:
    combined = f"{state.get('doc_results','')}\\n{state.get('sql_results','')}"
    verified = verify_chain.invoke({"question": state["question"], "evidence": combined})
    return {**state, "verified_answer": verified}

def route_from_supervisor(state: MultiAgentState) -> list[str]:
    return ["doc_agent"] if state["route"] == "docs" else \\
           ["sql_agent"] if state["route"] == "sql" else ["doc_agent", "sql_agent"]

graph = StateGraph(MultiAgentState)
graph.add_node("supervisor", supervisor)
graph.add_node("doc_agent", doc_agent)
graph.add_node("sql_agent", sql_agent)
graph.add_node("verifier_agent", verifier_agent)

graph.set_entry_point("supervisor")
graph.add_conditional_edges("supervisor", route_from_supervisor)
graph.add_edge("doc_agent", "verifier_agent")
graph.add_edge("sql_agent", "verifier_agent")
graph.add_edge("verifier_agent", END)

app = graph.compile()</div></div>
    <div class="tip-box">✅ Interview line: "This is the Agentic RAG diagram made literal — the supervisor node is the Reasoning Engine's router, doc_agent/sql_agent are the Multi-Agent System, and verifier_agent is the Human Validation / Auditor role, just automated. LangGraph's conditional edges are what let the supervisor fan out to both agents in parallel when a question genuinely needs both sources."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Checkpointing &amp; Memory — Why LangGraph Specifically For Production RAG</div>
  <div class="ref-body">
    <div class="code-box">from langgraph.checkpoint.postgres import PostgresSaver

checkpointer = PostgresSaver.from_conn_string(POSTGRES_URL)
app = graph.compile(checkpointer=checkpointer)

# Each invocation is tied to a thread_id — the full state (messages,
# retrieved docs, grades, loop count) is persisted after every node.
config = {"configurable": {"thread_id": "conversation-4471"}}
app.invoke({"question": "What's the refund window?"}, config=config)

# A day later, the SAME thread_id resumes with full prior state —
# no re-sending chat history, no losing where the loop left off.
app.invoke({"question": "What about for the Pro tier?"}, config=config)</div>
    <div class="tip-box">✅ Interview line: "I pick LangGraph over a hand-rolled loop specifically when I need this — durable state for a long-running or multi-turn RAG conversation, checkpointed after every node, so a pod restart or an approval pause doesn't lose the conversation's progress. For a single-shot, stateless RAG chain, plain LangChain (or even no framework) is simpler and sufficient."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">When To Use Which — Decision Table</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Scenario</div><div>Use</div><div>Why</div></div>
      <div class="dt-row"><div class="dt-name">Single-pass FAQ/RAG bot</div><div>LangChain (LCEL chain) only</div><div>No looping or branching needed — simplest option that works</div></div>
      <div class="dt-row"><div class="dt-name">Retrieval quality is unreliable, needs self-correction</div><div>LangGraph (Corrective RAG pattern)</div><div>Needs a loop: grade → rewrite → re-retrieve, bounded by a step limit</div></div>
      <div class="dt-row"><div class="dt-name">Query needs both documents AND structured data</div><div>LangGraph (multi-agent supervisor)</div><div>Needs branching/fan-out to specialist agents, then merge + verify</div></div>
      <div class="dt-row"><div class="dt-name">Long-running or multi-turn conversation</div><div>LangGraph + a persistent checkpointer</div><div>State must survive restarts, approval pauses, days between turns</div></div>
      <div class="dt-row"><div class="dt-name">Just need a document loader/splitter/vector-store wrapper</div><div>LangChain components, no LangGraph</div><div>LangGraph adds no value if there's no control flow to manage</div></div>
    </div>
    <div class="warn-box">⚠️ Common trap: reaching for LangGraph by default "because it's more powerful." If the RAG flow is genuinely one retrieve-then-generate pass, a LangGraph graph with one node per LangChain step just adds boilerplate and a dependency with no behavioral gain over a plain LCEL chain.</div>
  </div>
</div>
`;
