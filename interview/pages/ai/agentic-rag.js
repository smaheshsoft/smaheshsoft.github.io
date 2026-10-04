window.Pages['ai-agentic-rag'] = `
<div class="page-header">
  <div class="breadcrumb">AI &amp; LLM Engineering › <span>Agentic RAG Architecture (RAG²)</span></div>
  <h1>🧠 Agentic RAG Architecture (RAG²)</h1>
  <p>RAG with a reasoning loop, multi-agent retrieval, adversarial stress testing, and closed-loop evaluation</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance — Full Pipeline</div>
  <div class="ref-body">
    <div style="background:#0b0f19;border:1px solid #1f2937;border-radius:12px;padding:22px;overflow-x:auto;">
      <div style="min-width:760px;font-family:'Consolas','Courier New',monospace;">

        <!-- Row 0: user query -->
        <div style="display:flex;justify-content:center;margin-bottom:10px;">
          <div style="color:#cbd5e1;font-size:12px;border:1px solid #334155;border-radius:20px;padding:5px 16px;">👤 User Query</div>
        </div>

        <!-- Row 1: Reasoning Engine → Human Validation → Evaluation -->
        <div style="display:grid;grid-template-columns:1.2fr 1.1fr 1.1fr;gap:14px;align-items:stretch;">
          <div style="background:#1e1030;border:1px solid #7c3aed;border-radius:10px;padding:12px;">
            <div style="color:#c4b5fd;font-size:11px;font-weight:700;letter-spacing:.04em;margin-bottom:8px;">⬡ REASONING ENGINE</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <span style="background:#2a1850;color:#ddd6fe;font-size:10px;border-radius:6px;padding:4px 8px;">🗺️ Planner</span>
              <span style="background:#2a1850;color:#ddd6fe;font-size:10px;border-radius:6px;padding:4px 8px;">🔧 Tool Execution</span>
              <span style="background:#2a1850;color:#ddd6fe;font-size:10px;border-radius:6px;padding:4px 8px;">🧭 Conditional Router</span>
            </div>
          </div>
          <div style="background:#2a2008;border:1px solid #b45309;border-radius:10px;padding:12px;">
            <div style="color:#fcd34d;font-size:11px;font-weight:700;letter-spacing:.04em;margin-bottom:8px;">🛡️ HUMAN VALIDATION</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <span style="background:#3a2a0a;color:#fde68a;font-size:10px;border-radius:6px;padding:4px 8px;">🚧 Gatekeeper</span>
              <span style="background:#3a2a0a;color:#fde68a;font-size:10px;border-radius:6px;padding:4px 8px;">📋 Auditor</span>
              <span style="background:#3a2a0a;color:#fde68a;font-size:10px;border-radius:6px;padding:4px 8px;">🧠 Strategist</span>
            </div>
          </div>
          <div style="background:#0a2a26;border:1px solid #0d9488;border-radius:10px;padding:12px;">
            <div style="color:#5eead4;font-size:11px;font-weight:700;letter-spacing:.04em;margin-bottom:8px;">📊 EVALUATION</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <span style="background:#0e3934;color:#99f6e4;font-size:10px;border-radius:6px;padding:4px 8px;">⚖️ LLM Judges</span>
              <span style="background:#0e3934;color:#99f6e4;font-size:10px;border-radius:6px;padding:4px 8px;">🎯 Precision &amp; Recall</span>
              <span style="background:#0e3934;color:#99f6e4;font-size:10px;border-radius:6px;padding:4px 8px;">⏱️ Latency &amp; Cost</span>
            </div>
          </div>
        </div>

        <div style="text-align:center;color:#64748b;font-size:10px;padding:4px 0;">◀──────── feedback loop ────────▶</div>

        <!-- Row 2: Multi-Agent / Database / Stress Testing -->
        <div style="display:grid;grid-template-columns:1.2fr 1.1fr 1.1fr;gap:14px;align-items:stretch;">
          <div style="background:#07241f;border:1px solid #0d9488;border-radius:10px;padding:12px;">
            <div style="color:#5eead4;font-size:11px;font-weight:700;letter-spacing:.04em;margin-bottom:8px;">🧑‍🤝‍🧑 MULTI-AGENT SYSTEM</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <span style="background:#0e3934;color:#99f6e4;font-size:10px;border-radius:6px;padding:4px 8px;">Agent 1</span>
              <span style="background:#0e3934;color:#99f6e4;font-size:10px;border-radius:6px;padding:4px 8px;">Agent 2</span>
              <span style="background:#0e3934;color:#99f6e4;font-size:10px;border-radius:6px;padding:4px 8px;">Agent 3</span>
            </div>
          </div>
          <div style="background:#1e1030;border:1px solid #7c3aed;border-radius:10px;padding:12px;">
            <div style="color:#c4b5fd;font-size:11px;font-weight:700;letter-spacing:.04em;margin-bottom:8px;">🗄️ DATABASE LAYER</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <span style="background:#2a1850;color:#ddd6fe;font-size:10px;border-radius:6px;padding:4px 8px;">🧩 Vector Store</span>
              <span style="background:#2a1850;color:#ddd6fe;font-size:10px;border-radius:6px;padding:4px 8px;">🗂️ Relational DB</span>
            </div>
          </div>
          <div style="background:#2a0f14;border:1px solid #be123c;border-radius:10px;padding:12px;">
            <div style="color:#fda4af;font-size:11px;font-weight:700;letter-spacing:.04em;margin-bottom:8px;">⚠️ STRESS TESTING</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <span style="background:#3a151d;color:#fecdd3;font-size:10px;border-radius:6px;padding:4px 8px;">💬 Biased Opinion</span>
              <span style="background:#3a151d;color:#fecdd3;font-size:10px;border-radius:6px;padding:4px 8px;">🔓 Info Evasion</span>
              <span style="background:#3a151d;color:#fecdd3;font-size:10px;border-radius:6px;padding:4px 8px;">💉 Prompt Injection</span>
            </div>
          </div>
        </div>

        <div style="text-align:center;color:#64748b;font-size:10px;padding:4px 0;">▲──── adversarial testing feeds the router &amp; evaluation ────▲</div>

        <!-- Row 3: Data Processing, full width -->
        <div style="background:#0c2415;border:1px solid #16a34a;border-radius:10px;padding:12px;">
          <div style="color:#86efac;font-size:11px;font-weight:700;letter-spacing:.04em;margin-bottom:8px;">📁 DATA PROCESSING</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px;">
            <div style="background:#123820;border-radius:8px;padding:8px;">
              <div style="color:#bbf7d0;font-size:10px;font-weight:700;margin-bottom:4px;">Data Sources</div>
              <div style="color:#86efac;font-size:9px;">Documents · Code<br>Spreadsheets · Images</div>
            </div>
            <div style="background:#123820;border-radius:8px;padding:8px;">
              <div style="color:#bbf7d0;font-size:10px;font-weight:700;margin-bottom:4px;">Re-Structuring</div>
              <div style="color:#86efac;font-size:9px;">Document Parser<br>Structure Analyzer</div>
            </div>
            <div style="background:#123820;border-radius:8px;padding:8px;">
              <div style="color:#bbf7d0;font-size:10px;font-weight:700;margin-bottom:4px;">Structure-Aware Chunking</div>
              <div style="color:#86efac;font-size:9px;">Table Preserver · Heading &amp; Boundary Detector</div>
            </div>
            <div style="background:#123820;border-radius:8px;padding:8px;">
              <div style="color:#bbf7d0;font-size:10px;font-weight:700;margin-bottom:4px;">Metadata Creation</div>
              <div style="color:#86efac;font-size:9px;">Summary · Keyword · Question Generator</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">🧭</div><div class="principle-name">Reasoning Engine</div><p>Plans steps, calls tools, routes conditionally — not a single retrieve-then-generate call</p></div>
      <div class="principle-card"><div class="principle-icon">🧑‍⚖️</div><div class="principle-name">Human Validation</div><p>Gatekeeper/Auditor/Strategist checkpoints before high-stakes answers ship</p></div>
      <div class="principle-card"><div class="principle-icon">🛡️</div><div class="principle-name">Stress Testing</div><p>Adversarial red-teaming — prompt injection, evasion, bias — feeds back into the loop</p></div>
      <div class="principle-card"><div class="principle-icon">📊</div><div class="principle-name">Evaluation</div><p>LLM-judge + precision/recall + latency/cost, closing the loop back to the reasoning engine</p></div>
    </div>
    <div class="tip-box">✅ The name "RAG²" (or Agentic RAG) signals the shift from classic RAG's single retrieve → generate pass to a looped system: plan → retrieve/act → validate → evaluate → feed findings back in, with agents and adversarial testing built into the loop rather than bolted on after.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. Data Processing — Turning Raw Sources Into Retrievable Knowledge</div>
  <div class="ref-body">
    <div class="code-box">DATA SOURCES                RE-STRUCTURING          STRUCTURE-AWARE CHUNKING       METADATA CREATION
Documents, Code,      →     Document Parser,    →   Table Preserver,          →    Summary Generator,
Spreadsheets, Images         Structure Analyzer       Heading Detector,              Keyword Extractor,
                                                       Boundary Detector               Question Generator

Why "structure-aware" matters: naive fixed-size chunking slices a table
in half or separates a heading from its body — structure-aware chunking
keeps tables, sections and headings intact so retrieval returns a
COMPLETE, coherent unit instead of a fragment that reads as nonsense.</div>
    <div class="tip-box">✅ Interview line: "Chunking quality caps retrieval quality before the vector index even exists — I invest here first, because no amount of clever reasoning downstream fixes a chunk that cut a table in half."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1a. Re-Structuring Data — Document Parser &amp; Structure Analyzer</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Component</div><div>What It Does</div><div>Why It's Needed</div></div>
      <div class="dt-row"><div class="dt-name">Document Parser</div><div>Converts each source format (PDF, DOCX, HTML, code files, spreadsheets, images via OCR) into a single normalized representation — plain text plus positional/layout metadata</div><div>Downstream steps can't special-case every file format — one normalized shape keeps chunking/metadata logic format-agnostic</div></div>
      <div class="dt-row"><div class="dt-name">Structure Analyzer</div><div>Walks the normalized document and identifies its structural skeleton: heading levels, paragraphs, tables, lists, code blocks, captions</div><div>Without this, a PDF is just a flat stream of text — the analyzer is what makes "this is a table" or "this is an H2 section" a fact the pipeline can act on</div></div>
    </div>
    <div class="ans-block"><div class="ans-label">In code — Python, normalized parse output</div>
    <div class="code-box">from dataclasses import dataclass
from enum import Enum

class BlockType(Enum):
    HEADING = "heading"
    PARAGRAPH = "paragraph"
    TABLE = "table"
    LIST = "list"
    CODE = "code"

@dataclass
class DocBlock:
    type: BlockType
    text: str
    level: int | None = None        # heading level (H1=1, H2=2...)
    page: int | None = None
    bbox: tuple | None = None       # layout position, for tables/images

def parse_document(file_path: str) -> list[DocBlock]:
    # PDF → pdfplumber/PyMuPDF, DOCX → python-docx, HTML → BeautifulSoup —
    # each format's parser maps into the SAME DocBlock shape below.
    ext = file_path.rsplit(".", 1)[-1].lower()
    if ext == "pdf":
        return _parse_pdf(file_path)
    if ext == "docx":
        return _parse_docx(file_path)
    if ext in ("html", "htm"):
        return _parse_html(file_path)
    raise ValueError(f"Unsupported format: {ext}")

def analyze_structure(blocks: list[DocBlock]) -> list[DocBlock]:
    # Re-classifies ambiguous blocks: e.g. a PARAGRAPH that is short,
    # bold, and followed by body text gets reclassified as HEADING.
    for i, b in enumerate(blocks):
        if b.type == BlockType.PARAGRAPH and _looks_like_heading(b):
            b.type = BlockType.HEADING
            b.level = _infer_heading_level(b, blocks[:i])
    return blocks</div></div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1b. Structure-Aware Chunking — Table Preserver, Heading Detector, Boundary Detector</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Component</div><div>What It Does</div><div>Failure It Prevents</div></div>
      <div class="dt-row"><div class="dt-name">Table Preserver</div><div>Detects table boundaries from the Structure Analyzer's output and keeps the ENTIRE table as one chunk (or one chunk per logical row-group), never split mid-row</div><div>Naive fixed-size chunking cuts a table at a character count, landing retrieval on "Row 3: $42,000 | Q3" with no column headers — meaningless out of context</div></div>
      <div class="dt-row"><div class="dt-name">Heading Detector</div><div>Attaches the nearest parent heading(s) to every chunk as metadata, and avoids splitting a heading from the paragraph it introduces</div><div>A chunk that starts mid-paragraph with no heading context reads as disconnected trivia — the heading is often what makes the chunk's topic unambiguous</div></div>
      <div class="dt-row"><div class="dt-name">Boundary Detector</div><div>Finds safe split points — paragraph ends, sentence ends, list-item ends — never splitting inside a sentence or code block</div><div>Fixed-size token windows routinely cut a sentence in half, corrupting both the retrieved chunk and its embedding's meaning</div></div>
    </div>
    <div class="ans-block"><div class="ans-label">In code — structure-aware chunker</div>
    <div class="code-box">@dataclass
class RagChunk:
    text: str
    heading_path: list[str]     # e.g. ["Pricing", "Enterprise Tier"]
    block_type: BlockType
    source: str

def chunk_blocks(blocks: list[DocBlock], source: str, max_tokens: int = 400) -> list[RagChunk]:
    chunks: list[RagChunk] = []
    heading_stack: list[str] = []
    buffer: list[DocBlock] = []

    def flush():
        if buffer:
            text = "\\n".join(b.text for b in buffer)
            chunks.append(RagChunk(text, list(heading_stack), buffer[0].type, source))
            buffer.clear()

    for block in blocks:
        if block.type == BlockType.HEADING:
            flush()                                   # never span across a heading
            heading_stack[block.level - 1:] = [block.text]
        elif block.type == BlockType.TABLE:
            flush()
            chunks.append(RagChunk(block.text, list(heading_stack), BlockType.TABLE, source))
        elif _token_count(buffer) + _token_count([block]) > max_tokens:
            flush()                                   # boundary = safe paragraph edge, not a char count
            buffer.append(block)
        else:
            buffer.append(block)
    flush()
    return chunks</div></div>
    <div class="warn-box">⚠️ Notice the Table Preserver and Heading Detector both force a <code>flush()</code> rather than letting a table or heading get absorbed mid-chunk — that's the concrete mechanism behind "structure-aware," not a vague quality claim.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1c. Metadata Creation — Summary Generator, Keyword Extractor, Question Generator</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Component</div><div>What It Does</div><div>How Retrieval Uses It</div></div>
      <div class="dt-row"><div class="dt-name">Summary Generator</div><div>An LLM call that produces a 1-2 sentence summary of each chunk at ingest time</div><div>Embed the SUMMARY alongside (or instead of) the raw chunk — summaries often match a user's short query phrasing better than the raw dense text does</div></div>
      <div class="dt-row"><div class="dt-name">Keyword Extractor</div><div>Pulls named entities, product names, acronyms and domain terms out of each chunk</div><div>Powers hybrid search (keyword/BM25 + vector) and exact-match filters — vector similarity alone misses exact SKU/ID/acronym matches</div></div>
      <div class="dt-row"><div class="dt-name">Question Generator</div><div>An LLM call that generates 2-3 questions each chunk would answer (e.g. "What is the refund window for Enterprise customers?")</div><div>Embed the GENERATED QUESTIONS — a user's query is a question, so question-to-question similarity often retrieves more accurately than question-to-statement similarity</div></div>
    </div>
    <div class="ans-block"><div class="ans-label">In code — metadata creation at ingest time</div>
    <div class="code-box">@dataclass
class EnrichedChunk:
    chunk: RagChunk
    summary: str
    keywords: list[str]
    hypothetical_questions: list[str]
    embedding: list[float]          # embedded from chunk.text + summary + questions combined

def enrich_chunk(chunk: RagChunk, llm_client) -> EnrichedChunk:
    extraction = llm_client.chat.completions.create(
        model="gpt-4o-mini",                          # cheap model — this runs once per
        temperature=0,                                  # chunk at ingest, not per query
        response_format={"type": "json_object"},
        messages=[{
            "role": "user",
            "content": (
                "Return JSON with: summary (1-2 sentences), "
                "keywords (list of key terms/entities), "
                "questions (2-3 questions this text answers).\\n\\n"
                f"Text:\\n{chunk.text}"
            ),
        }],
    )
    data = json.loads(extraction.choices[0].message.content)

    # Embedding built from chunk text + generated metadata = multiple
    # "surfaces" a query can match against, not just the raw prose.
    embed_input = f"{chunk.text}\\n{data['summary']}\\n" + "\\n".join(data["questions"])
    embedding = embed(embed_input)

    return EnrichedChunk(chunk, data["summary"], data["keywords"], data["questions"], embedding)</div></div>
    <div class="tip-box">✅ Interview line: "Metadata creation is what turns a RAG system from 'match my query against raw document text' into 'match my query against the question it's most likely phrased as' — the question generator alone is usually the single biggest recall improvement in the whole pipeline, because it closes the phrasing gap between how documents are written and how users actually ask."</div>
    <div class="warn-box">⚠️ This step costs one LLM call per chunk at ingest time — for a 10,000-chunk knowledge base that's a real one-time cost (and a recurring one on re-ingestion). Budget for it explicitly rather than discovering it in a surprise bill; it only runs offline, never per user query.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. Database Layer — Vector + Relational, Not Either/Or</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Store</div><div>Holds</div><div>Queried For</div></div>
      <div class="dt-row"><div class="dt-name">Vector Store</div><div>Chunk embeddings + generated metadata (summary, keywords, Q&amp;A)</div><div>Semantic similarity search — "find relevant content"</div></div>
      <div class="dt-row"><div class="dt-name">Relational DB</div><div>Structured facts, entities, source provenance, access control</div><div>Exact lookups, joins, filters, audit trail</div></div>
    </div>
    <div class="tip-box">✅ Agentic RAG routes a query to whichever store (or both) answers it best — "what's the refund policy?" goes to the vector store; "what's order #4471's status?" goes to the relational DB. A single-store design forces one tool to do both jobs badly.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. Reasoning Engine — The Agentic Core</div>
  <div class="ref-body">
    <div class="code-box">User Query
   │
   ▼
PLANNER        decides: single retrieval enough, or multi-step?
   │
   ▼
TOOL EXECUTION  calls retrieval, calculators, APIs, DB lookups as needed
   │
   ▼
CONDITIONAL ROUTER   based on result quality/confidence:
   │                  - confident enough → proceed to answer
   │                  - low confidence → re-plan, retrieve again,
   │                    or escalate to Human Validation
   ▼
(loops back to Planner if the router decides more work is needed)</div>
    <div class="warn-box">⚠️ This is the key difference from classic RAG: classic RAG does ONE retrieve-then-generate pass. The Reasoning Engine can loop — re-plan, re-retrieve, call a different tool — until the Conditional Router is satisfied with confidence, or it hits a bounded iteration limit and escalates instead of guessing.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">4. Multi-Agent System — Specialist Retrieval/Reasoning Agents</div>
  <div class="ref-body">
    <div class="code-box">Agent 1   e.g. Document retrieval specialist (vector store expert)
Agent 2   e.g. Structured-data specialist (SQL/relational expert)
Agent 3   e.g. Verification/critic agent — checks Agent 1 &amp; 2's
          outputs against the source before they reach the user

Pattern: Reasoning Engine delegates sub-tasks to whichever agent
has the right tool/expertise, then merges their outputs before
Human Validation — the same "use multi-agent only for genuinely
different expertise" rule as any other agentic system.</div>
    <div class="tip-box">✅ Ties directly to the general multi-agent guidance: don't split into 3 agents "to feel organized" — split because retrieval-from-vectors, querying-structured-data, and verification are genuinely different tool/permission profiles.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. Human Validation — Gatekeeper, Auditor, Strategist</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Role</div><div>Checks</div></div>
      <div class="dt-row"><div class="dt-name">Gatekeeper</div><div>Should this answer even be released? (policy, scope, authorization)</div></div>
      <div class="dt-row"><div class="dt-name">Auditor</div><div>Is the answer actually grounded in the retrieved sources — any unsupported claims?</div></div>
      <div class="dt-row"><div class="dt-name">Strategist</div><div>Is this the RIGHT overall approach for this query, or should the Reasoning Engine re-plan?</div></div>
    </div>
    <div class="warn-box">⚠️ "Human Validation" in production doesn't mean a person reviews every query — it means these three checks exist as explicit gates (often automated policy + sampling-based human review), the same autonomy-matches-reversibility principle as any agentic pipeline: full automation for low-stakes queries, human-in-the-loop sampling or hard gates for high-stakes ones.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Stress Testing — Adversarial Red-Teaming Built Into The Loop</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Attack</div><div>What It Tests</div><div>Defense</div></div>
      <div class="dt-row"><div class="dt-name">Prompt Injection</div><div>Can retrieved content hijack the system prompt/instructions?</div><div>Treat retrieved content as data, never as instructions; sandboxed tool execution</div></div>
      <div class="dt-row"><div class="dt-name">Information Evasion</div><div>Can the system be tricked into leaking restricted data via indirect phrasing?</div><div>Access control at the retrieval layer, not just at the prompt layer</div></div>
      <div class="dt-row"><div class="dt-name">Biased Opinion</div><div>Does the system present a one-sided or unsupported view as fact?</div><div>Require citations, flag opinion vs grounded-fact in the Auditor check</div></div>
    </div>
    <div class="code-box">Stress Testing ──adversarial testing──▶ feeds results back into
                                        the Reasoning Engine's
                                        Conditional Router AND into
                                        Evaluation metrics — failures
                                        here are not a one-time audit,
                                        they continuously retrain what
                                        "confident enough" means.</div>
    <div class="tip-box">✅ Interview line: "Stress testing isn't a pre-launch checklist item here — it's wired into the same feedback loop as evaluation, so a new prompt-injection pattern discovered in red-teaming directly tightens the Conditional Router's confidence threshold going forward."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Evaluation — Closing The Loop</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Metric</div><div>Measures</div></div>
      <div class="dt-row"><div class="dt-name">LLM Judges</div><div>A separate model scores answer quality/faithfulness against the source — scalable alternative to manual review</div></div>
      <div class="dt-row"><div class="dt-name">Precision &amp; Recall</div><div>Did retrieval return the right chunks, and only the right chunks?</div></div>
      <div class="dt-row"><div class="dt-name">Latency &amp; Cost</div><div>Is the reasoning loop's extra accuracy worth its extra round-trips and tokens?</div></div>
    </div>
    <div class="warn-box">⚠️ The feedback loop (dashed line back to the Reasoning Engine / Human Validation in the diagram) is what separates "we measure RAG quality" from "our RAG system improves itself" — evaluation results should automatically inform the Conditional Router's thresholds and flag chunks/sources needing re-processing, not just populate a dashboard nobody acts on.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answer — Classic RAG vs Agentic RAG (RAG²)</div>
  <div class="ref-body">
    <div class="qa-card">
      <div class="qa-question">How is Agentic RAG different from classic RAG, and when would you justify the added complexity?</div>
      <div class="qa-answer">"Classic RAG is one pass: retrieve top-k chunks, stuff them in a prompt, generate. Agentic RAG wraps that in a reasoning loop — a planner decides whether one retrieval is even enough, a conditional router checks confidence and can re-retrieve or call a different tool, specialist agents handle vector vs structured-data vs verification work, and human-validation gates plus an LLM-judge evaluation layer close the loop back into the router's thresholds. I'd justify that complexity when queries are genuinely multi-hop or multi-source, when wrong answers are costly enough to need an Auditor/Gatekeeper step, or when the system is exposed to adversarial input and needs stress-testing wired into the feedback loop rather than bolted on as a one-time audit. For a simple FAQ bot over one document set, classic RAG is the right call — Agentic RAG earns its cost on complex, high-stakes, or adversarially-exposed use cases."</div>
    </div>
  </div>
</div>
`;
