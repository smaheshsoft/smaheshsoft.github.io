window.Pages['ref-sdlc-governance-flow'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>SDLC Architecture-Governance Flow</span></div>
  <h1>🧭 SDLC Architecture-Governance Flow — BRD to Production</h1>
  <p>How BRD (Business Requirements Document), PRD (Product Requirements Document), SRS (Software Requirements Specification), NFR (Non-Functional Requirements), RFC (Request for Comments), SAD/HLD/LLD (Software Architecture Document / High-Level Design / Low-Level Design), ADR (Architecture Decision Record), RFR (Request for Review), PR (Pull Request) and RTM (Requirements Traceability Matrix) actually relate — and where each gate sits</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">BRD<br><span style="font-weight:400;font-size:11px;">Business Requirements Document — WHY</span></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">PRD<br><span style="font-weight:400;font-size:11px;">Product Requirements Document — WHAT product</span></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">SRS + NFR<br><span style="font-weight:400;font-size:11px;">Software Requirements Specification + Non-Functional Requirements</span></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">RFC / POC<br><span style="font-weight:400;font-size:11px;">Request for Comments / Proof of Concept</span></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step blue">SAD + HLD + ADR<br><span style="font-weight:400;font-size:11px;">Software Architecture Document + High-Level Design + Architecture Decision Record</span></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step blue">Architecture Review (RFR)<br><span style="font-weight:400;font-size:11px;">Request for Review</span></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">LLD<br><span style="font-weight:400;font-size:11px;">Low-Level Design</span></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Dev + PR + CI/CD<br><span style="font-weight:400;font-size:11px;">Pull Request + Continuous Integration / Continuous Delivery</span></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Test + RTM<br><span style="font-weight:400;font-size:11px;">Requirements Traceability Matrix</span></div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Release → Prod → Monitor</div>
    </div>
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">💬</div><div class="principle-name">RFC = discuss</div><p>Request for Comments — early proposal: "here is the problem, which technical approach?"</p></div>
      <div class="principle-card"><div class="principle-icon">🏛️</div><div class="principle-name">SAD = describe</div><p>Software Architecture Document — the architecture we propose to build, with NFR mapping</p></div>
      <div class="principle-card"><div class="principle-icon">📝</div><div class="principle-name">ADR = record</div><p>Architecture Decision Record — why a specific decision was made, with trade-offs</p></div>
      <div class="principle-card"><div class="principle-icon">🚦</div><div class="principle-name">RFR = gate</div><p>Request for Review — formal request for architecture review and approval</p></div>
    </div>
    <div class="tip-box">✅ Interview framing: "Architecture governance is a chain of artifacts with gates between them — requirements feed a proposal (RFC), the proposal becomes an architecture (SAD/HLD/ADR), the architecture passes a review gate (RFR), and only then do detailed design and code start. A Pull Request governs code; an architecture review governs design — they are different gates at different altitudes."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Glossary — Short Form &amp; Full Meaning</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div>Short Form</div><div>Full Meaning</div><div>One-Line Purpose</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">BRD</div><div>Business Requirements Document</div><div>WHY the business needs this — goals, scope, success criteria</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">PRD</div><div>Product Requirements Document</div><div>WHAT product to build — features, user stories, priorities, MVP scope</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">SRS</div><div>Software Requirements Specification</div><div>WHAT the system must do (functional) and how well (non-functional)</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">FRD</div><div>Functional Requirements Document</div><div>Detailed system behaviour — use cases, business rules, acceptance criteria</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">NFR</div><div>Non-Functional Requirements</div><div>Quality attributes — availability, performance, security, scalability, compliance</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">RFC</div><div>Request for Comments</div><div>Early technical proposal that compares options before a direction is chosen</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">POC</div><div>Proof of Concept</div><div>Small experiment that proves a technical approach is feasible</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">SAD</div><div>Software Architecture Document</div><div>Describes the whole proposed architecture and maps it to the NFRs</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">HLD</div><div>High-Level Design</div><div>Major components, services, infrastructure, network and data — and how they interact</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">LLD</div><div>Low-Level Design</div><div>How each component is implemented — classes, sequences, schema, API contracts</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">ADR</div><div>Architecture Decision Record</div><div>Records WHY a significant decision was made, with alternatives and trade-offs</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">RFR</div><div>Request for Review (organization-specific meaning)</div><div>Formal submission asking the Architecture Council to review and approve</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">PR</div><div>Pull Request</div><div>Code-review mechanism before a change merges into the main branch</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">RTM</div><div>Requirements Traceability Matrix</div><div>Traces each requirement to design, implementation, test case and result</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">C4</div><div>Context, Containers, Components, Code</div><div>Four zoom levels for drawing architecture diagrams</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">UML</div><div>Unified Modeling Language</div><div>Standard notation for class, sequence and component diagrams</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">CI/CD</div><div>Continuous Integration / Continuous Delivery (or Deployment)</div><div>Automated build, test and release pipeline</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">SAST</div><div>Static Application Security Testing</div><div>Scans source code for vulnerabilities without running it</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">UAT</div><div>User Acceptance Testing</div><div>Business users confirm the system meets their needs before release</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">CAB</div><div>Change Advisory Board</div><div>Approves high-risk production changes</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">SRE</div><div>Site Reliability Engineering</div><div>Runs and improves production reliability using SLOs and automation</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">SLO</div><div>Service Level Objective</div><div>Target reliability level, for example 99.9% of requests succeed</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">DR / BCP</div><div>Disaster Recovery / Business Continuity Plan</div><div>How the system and business keep running through a major failure</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">RPO / RTO</div><div>Recovery Point Objective / Recovery Time Objective</div><div>Acceptable data loss window / acceptable downtime</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">TPS</div><div>Transactions Per Second</div><div>Throughput measure used in scalability NFRs</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">RBAC</div><div>Role-Based Access Control</div><div>Permissions granted by role rather than per individual</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">AZ</div><div>Availability Zone</div><div>Physically separate datacenter within a cloud region</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">CDN</div><div>Content Delivery Network</div><div>Edge caches that serve content close to users</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">BA / PO / PM</div><div>Business Analyst / Product Owner / Product Manager</div><div>The roles that usually own BRD, PRD and SRS</div></div>
      <div class="dt-row" style="grid-template-columns:0.7fr 1.6fr 2.4fr;"><div class="dt-name">ERP</div><div>Enterprise Resource Planning</div><div>Back-office system (finance, inventory, HR) a solution often integrates with</div></div>
    </div>
    <div class="tip-box">✅ Interview habit: expand an acronym the first time you say it ("the RFR — Request for Review — in our process"), then use the short form. It shows precision and avoids confusion because several of these (RFR especially) vary between organizations.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">0. BRD vs PRD vs SRS — The Requirements Chain</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:0.8fr 1.4fr 1.4fr 1.4fr;"><div></div><div>BRD (Business Requirements Document)</div><div>PRD (Product Requirements Document)</div><div>SRS (Software Requirements Specification)</div></div>
      <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.4fr 1.4fr;"><div class="dt-name">Question</div><div>WHY are we doing this?</div><div>WHAT product should we build?</div><div>WHAT must the system do, and how well?</div></div>
      <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.4fr 1.4fr;"><div class="dt-name">Owner</div><div>Business Analyst (BA) / Business Owner</div><div>Product Manager (PM) / Product Owner (PO)</div><div>Business Analyst with architect and QA input</div></div>
      <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.4fr 1.4fr;"><div class="dt-name">Contains</div><div>Business problem, objectives, scope, out-of-scope, stakeholders, business rules, assumptions, constraints, success criteria</div><div>Product vision, personas, user journeys, features, user stories, acceptance criteria, product KPIs, priorities, MVP / release scope</div><div>Functional requirements plus NFRs, interfaces, constraints, data requirements</div></div>
      <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.4fr 1.4fr;"><div class="dt-name">Audience</div><div>Executives, business sponsors</div><div>Product, design, engineering leads</div><div>Architects, developers, testers</div></div>
      <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.4fr 1.4fr;"><div class="dt-name">Example (loan platform)</div><div>"Cut loan approval from 2 days to 2 hours; reduce operating cost by 30%"</div><div>"AI document verification, credit assessment, approval workflow, customer notification"</div><div>"On PDF upload: validate, extract, score; availability 99.99%; API under 500 ms"</div></div>
      <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.4fr 1.4fr;"><div class="dt-name">Architect's role</div><div>Understand drivers; judge feasibility and rough cost</div><div>Validate feasibility; flag architectural impact early</div><div class="dt-yes">Co-own the NFRs; identify services and integrations</div></div>
    </div>
    <div class="code-box">BRD  →  PRD  →  SRS (FRD + NFR)  →  architecture work begins
WHY      WHAT product    WHAT system + HOW WELL

In many Agile organizations the PRD and the functional part of the SRS live
as epics and user stories in Jira / Azure DevOps plus Confluence, rather than
as separate Word documents — the questions they answer are still the same.</div>
    <div class="warn-box">⚠️ Common confusion: treating BRD and PRD as the same document. The BRD is written from the business's point of view (outcome and money); the PRD is written from the product's point of view (features and users). One BRD can spawn several PRDs — for example one per product line or release.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Diagram — The End-To-End Flow With Gates</div>
  <div class="ref-body">
    <div style="background:#0b0f19;border:1px solid #1f2937;border-radius:12px;padding:22px;overflow-x:auto;">
      <div style="min-width:780px;font-family:'Consolas','Courier New',monospace;">

        <div style="background:#2a2008;border:1px solid #b45309;border-radius:10px;padding:12px;margin-bottom:8px;">
          <div style="color:#fcd34d;font-size:11px;font-weight:700;letter-spacing:.04em;">① BUSINESS / PRODUCT — BRD (Business Requirements Document), PRD (Product Requirements Document), Business Case</div>
          <div style="color:#fde68a;font-size:10px;margin-top:2px;">Why are we building it, and what product? Gate: stakeholder review</div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="background:#2a2008;border:1px solid #b45309;border-radius:10px;padding:12px;margin-bottom:8px;">
          <div style="color:#fcd34d;font-size:11px;font-weight:700;letter-spacing:.04em;">② REQUIREMENTS — SRS (Software Requirements Specification) = Functional Requirements + NFRs (Non-Functional Requirements) / Quality Attributes</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;">
            <span style="background:#3a2a0a;color:#fde68a;font-size:10px;border-radius:6px;padding:4px 8px;">Availability</span>
            <span style="background:#3a2a0a;color:#fde68a;font-size:10px;border-radius:6px;padding:4px 8px;">Scalability</span>
            <span style="background:#3a2a0a;color:#fde68a;font-size:10px;border-radius:6px;padding:4px 8px;">Performance</span>
            <span style="background:#3a2a0a;color:#fde68a;font-size:10px;border-radius:6px;padding:4px 8px;">Security</span>
            <span style="background:#3a2a0a;color:#fde68a;font-size:10px;border-radius:6px;padding:4px 8px;">Reliability</span>
            <span style="background:#3a2a0a;color:#fde68a;font-size:10px;border-radius:6px;padding:4px 8px;">Compliance</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="background:#1e1030;border:1px solid #7c3aed;border-radius:10px;padding:12px;margin-bottom:8px;">
          <div style="color:#c4b5fd;font-size:11px;font-weight:700;letter-spacing:.04em;">③ TECHNICAL ANALYSIS — RFC (Request for Comments) / Technical Proposal</div>
          <div style="color:#ddd6fe;font-size:10px;margin-top:2px;">Alternatives · POC (Proof of Concept) / feasibility · technology options · initial trade-offs. Gate: technical review</div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="background:#1e1030;border:1px solid #7c3aed;border-radius:10px;padding:12px;margin-bottom:8px;">
          <div style="color:#c4b5fd;font-size:11px;font-weight:700;letter-spacing:.04em;">④ ARCHITECTURE DESIGN</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;">
            <span style="background:#2a1850;color:#ddd6fe;font-size:10px;border-radius:6px;padding:4px 8px;">SAD — Software Architecture Document (principles, context, components, data flow, security, deployment, NFR mapping)</span>
            <span style="background:#2a1850;color:#ddd6fe;font-size:10px;border-radius:6px;padding:4px 8px;">HLD — High-Level Design (services, infra, network, data)</span>
            <span style="background:#2a1850;color:#ddd6fe;font-size:10px;border-radius:6px;padding:4px 8px;">ADRs — Architecture Decision Records (why)</span>
            <span style="background:#2a1850;color:#ddd6fe;font-size:10px;border-radius:6px;padding:4px 8px;">C4 (Context, Containers, Components, Code) / UML (Unified Modeling Language) diagrams</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="background:#2a0f14;border:1px solid #be123c;border-radius:10px;padding:12px;margin-bottom:8px;">
          <div style="color:#fda4af;font-size:11px;font-weight:700;letter-spacing:.04em;">⑤ GATE — ARCHITECTURE REVIEW via RFR (Request for Review) to the Architecture Council</div>
          <div style="color:#fecdd3;font-size:10px;margin-top:2px;">Security · Infrastructure/Cloud · Data · Compliance · Engineering reviewers</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;">
            <span style="background:#123820;color:#bbf7d0;font-size:10px;border-radius:6px;padding:4px 8px;">Approved</span>
            <span style="background:#3a2a0a;color:#fde68a;font-size:10px;border-radius:6px;padding:4px 8px;">Approved with Conditions</span>
            <span style="background:#3a151d;color:#fecdd3;font-size:10px;border-radius:6px;padding:4px 8px;">Rework Required → back to ④</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓ (approved)</div>

        <div style="background:#07241f;border:1px solid #0d9488;border-radius:10px;padding:12px;margin-bottom:8px;">
          <div style="color:#5eead4;font-size:11px;font-weight:700;letter-spacing:.04em;">⑥ DETAILED DESIGN — LLD (Low-Level Design), API (Application Programming Interface) specs, DB (database) design</div>
          <div style="color:#99f6e4;font-size:10px;margin-top:2px;">Gate: engineering review</div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="background:#0c2415;border:1px solid #16a34a;border-radius:10px;padding:12px;margin-bottom:8px;">
          <div style="color:#86efac;font-size:11px;font-weight:700;letter-spacing:.04em;">⑦ DEVELOPMENT — PR (Pull Requests) + CI/CD (Continuous Integration / Continuous Delivery)</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;">
            <span style="background:#123820;color:#bbf7d0;font-size:10px;border-radius:6px;padding:4px 8px;">Code review</span>
            <span style="background:#123820;color:#bbf7d0;font-size:10px;border-radius:6px;padding:4px 8px;">SonarQube</span>
            <span style="background:#123820;color:#bbf7d0;font-size:10px;border-radius:6px;padding:4px 8px;">SAST (Static Application Security Testing)</span>
            <span style="background:#123820;color:#bbf7d0;font-size:10px;border-radius:6px;padding:4px 8px;">Dependency scan</span>
            <span style="background:#123820;color:#bbf7d0;font-size:10px;border-radius:6px;padding:4px 8px;">Unit tests</span>
          </div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="background:#07241f;border:1px solid #0d9488;border-radius:10px;padding:12px;margin-bottom:8px;">
          <div style="color:#5eead4;font-size:11px;font-weight:700;letter-spacing:.04em;">⑧ TEST / VALIDATION — functional · integration · performance · security · UAT (User Acceptance Testing) → RTM</div>
          <div style="color:#99f6e4;font-size:10px;margin-top:2px;">RTM (Requirements Traceability Matrix) closes the loop: requirement → design → implementation → test → result</div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="background:#2a0f14;border:1px solid #be123c;border-radius:10px;padding:12px;margin-bottom:8px;">
          <div style="color:#fda4af;font-size:11px;font-weight:700;letter-spacing:.04em;">⑨ GATE — RELEASE / CHANGE APPROVAL (release plan, deployment plan, rollback plan)</div>
        </div>
        <div style="text-align:center;color:#64748b;font-size:14px;">↓</div>

        <div style="background:#0c2415;border:1px solid #16a34a;border-radius:10px;padding:12px;">
          <div style="color:#86efac;font-size:11px;font-weight:700;letter-spacing:.04em;">⑩ PRODUCTION → OPERATIONS / MONITORING → ⑪ ARCHITECTURE FEEDBACK</div>
          <div style="color:#bbf7d0;font-size:10px;margin-top:2px;">Dashboards, runbooks, SLOs (Service Level Objectives) → ADR updates, periodic architecture review, technical-debt register → feeds the NEXT RFC</div>
        </div>
      </div>
    </div>
    <div class="code-box">Simplest way to remember it:

BRD → PRD → SRS + NFR → RFC / POC → SAD + HLD + ADR → Architecture Review (RFR)
  → Architecture Approval → LLD → Development → PR + CI/CD
  → Testing + RTM → Release Approval → Production → Monitoring &amp; Improvement

Spelled out:
Business Requirements Document → Product Requirements Document
  → Software Requirements Specification + Non-Functional Requirements
  → Request for Comments / Proof of Concept
  → Software Architecture Document + High-Level Design + Architecture Decision Record
  → Architecture Review (Request for Review) → Architecture Approval
  → Low-Level Design → Development → Pull Request + Continuous Integration / Continuous Delivery
  → Testing + Requirements Traceability Matrix → Release Approval → Production
  → Monitoring &amp; Continuous Improvement</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. SRS (Software Requirements Specification) vs NFR (Non-Functional Requirements) — Not Always Separate Documents</div>
  <div class="ref-body">
    <div class="code-box">SRS (Software Requirements Specification) can contain BOTH:

SRS
 ├── Functional Requirements
 │    ├── User login
 │    ├── Order creation
 │    └── Payment processing
 │
 └── Non-Functional Requirements
      ├── Availability: 99.99%
      ├── Response time: &lt; 500 ms
      ├── Throughput: 5,000 TPS (Transactions Per Second)
      ├── Security: OAuth2 (Open Authorization 2.0) / RBAC (Role-Based Access Control)
      └── Scalability: 10M (million) users

Some enterprises keep a separate NFR document/catalog, but conceptually
NFRs are requirements exactly like functional ones — just about HOW WELL
the system behaves rather than WHAT it does.</div>
    <div class="ans-block"><div class="ans-label">Why this matters to the architect — NFR → architecture decision</div>
    <div class="code-box">Requirement: "10 million users, 99.99% availability, API latency &lt; 500 ms"

NFR
 │
 ├── 10M users
 │      ↓  Horizontal scaling · Caching · CDN (Content Delivery Network) · Database scaling
 │
 ├── 99.99% availability
 │      ↓  Multi-AZ (Availability Zone) / Multi-region · Load balancing · Health probes · Failover
 │
 └── &lt; 500 ms
        ↓  Redis · Async processing · DB indexing · Connection pooling
           · API optimization</div></div>
    <div class="tip-box">✅ Interview line: "The NFR-to-decision translation is the heart of the architect's job — each number removes a class of designs. 99.99% availability alone rules out a single-region deployment before I draw a box." See also the NFR &amp; Quality Attributes page.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. RFC (Request for Comments) vs SAD (Software Architecture Document) vs ADR (Architecture Decision Record) — The Trio People Confuse</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:0.8fr 1.4fr 1.4fr 1.4fr;"><div></div><div>RFC (Request for Comments)</div><div>SAD (Software Architecture Document)</div><div>ADR (Architecture Decision Record)</div></div>
      <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.4fr 1.4fr;"><div class="dt-name">Think</div><div>"Here is the problem — which technical approach should we take?"</div><div>"This is the architecture we propose to build."</div><div>"Why did we make this particular decision?"</div></div>
      <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.4fr 1.4fr;"><div class="dt-name">Verb</div><div class="dt-yes">Discuss</div><div class="dt-yes">Describe</div><div class="dt-yes">Record</div></div>
      <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.4fr 1.4fr;"><div class="dt-name">Timing</div><div>Early — before the architecture is finalized</div><div>After the approach is chosen</div><div>At the moment each significant decision is made</div></div>
      <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.4fr 1.4fr;"><div class="dt-name">Contains</div><div>Problem, options compared, POC findings, trade-offs, recommendation</div><div>Principles, context, components, data flow, integration, security, deployment, DR, observability, NFR mapping, risks</div><div>Context, options, decision, reasons, trade-offs, consequences</div></div>
      <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.4fr 1.4fr;"><div class="dt-name">Lifespan</div><div>Closed once a direction is chosen</div><div>Living document, updated as design evolves</div><div>Immutable — superseded by a newer ADR, never edited away</div></div>
    </div>
    <div class="ans-block"><div class="ans-label">Worked RFC example — comparing options before committing</div>
    <div class="code-box">RFC: "We process ~4,000 Event Hub events/sec on Azure Functions at a high
monthly cost (illustrative figure). Should we move the workload to AKS?"

  Option             Cost     Scalability   Operational complexity
  Azure Functions    High     High          Low
  AKS                Lower    High          Medium
  Container Apps     Medium   High          Low/Medium

→ Team discusses BEFORE the architecture is finalized.
→ The outcome becomes an ADR: "ADR-007: Move Event Hub processing to AKS"
→ The chosen design is then described in the SAD.</div></div>
    <div class="ans-block"><div class="ans-label">Worked ADR example</div>
    <div class="code-box">ADR-007: Use PostgreSQL instead of MongoDB

Context:    Customer transaction data requires ACID transactions.
Options:    1. PostgreSQL   2. MongoDB   3. Cassandra
Decision:   Use PostgreSQL.
Reasons:    Strong transactional consistency · existing PostgreSQL
            expertise · complex relational queries · existing ops tooling
Trade-off:  Horizontal scaling needs additional architecture.</div></div>
    <div class="tip-box">✅ One-liner: "RFC = discuss, SAD = describe, ADR = record." The ADR page covers the format in depth; the RFC is the step that usually comes first and produces the decision the ADR captures.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. SAD vs HLD (High-Level Design) vs LLD (Low-Level Design) — And Where C4 (Context, Containers, Components, Code) / UML (Unified Modeling Language) Fit</div>
  <div class="ref-body">
    <div class="code-box">"SAD vs HLD" depends heavily on the organization:
  • Some companies treat SAD ≈ HLD (one document)
  • Others keep them separate — a practical enterprise structure is:

SAD
 ├── Executive Summary
 ├── Requirements / NFRs
 ├── Architecture Principles
 ├── Context Diagram
 ├── HLD
 │    ├── Application architecture
 │    ├── Data architecture
 │    ├── Integration architecture
 │    └── Infrastructure architecture
 ├── Security Architecture
 ├── Deployment Architecture
 ├── DR (Disaster Recovery) / BCP (Business Continuity Plan)
 ├── Observability
 ├── Risks
 ├── ADR references
 └── NFR mapping

Then:   HLD → LLD → Code

HLD (High-Level Design) answers: "What are the major components and how do they interact?"
LLD (Low-Level Design) answers:  "How exactly will this component be implemented?"

HLD:  Order API → Order Service → PostgreSQL
LLD:  POST /orders
        OrderController → OrderService.CreateOrder()
                        → OrderRepository.InsertAsync() → PostgreSQL
      Tables: Orders, OrderItems, Customers</div>
    <div class="decision-table">
      <div class="dt-row dt-header"><div>C4 Level</div><div>Shows</div><div>Audience</div></div>
      <div class="dt-row"><div class="dt-name">1. Context</div><div>The system as one box, its users and external systems (payment gateway, ERP, notifications)</div><div>Everyone, including non-technical stakeholders</div></div>
      <div class="dt-row"><div class="dt-name">2. Container</div><div>Deployable units — web app, Order API, Payment Service, database</div><div>Architects, engineers, ops</div></div>
      <div class="dt-row"><div class="dt-name">3. Component</div><div>Major building blocks inside one container</div><div>Engineers working on that container</div></div>
      <div class="dt-row"><div class="dt-name">4. Code</div><div>Classes / UML detail — usually generated or skipped</div><div>Rarely drawn by hand</div></div>
    </div>
    <div class="warn-box">⚠️ C4 and UML are modeling and visualization techniques, not separate lifecycle documents. They live INSIDE the SAD/HLD/LLD to help reviewers understand the architecture quickly — saying "we produce a C4 document" as a lifecycle stage overstates what they are.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">4. RFR (Request for Review) — Define It Explicitly, It Is Not A Universal Acronym</div>
  <div class="ref-body">
    <div class="warn-box">⚠️ RFR is NOT a standardized SDLC artifact like SRS or ADR. Organizations expand it differently: Request for Review, Architecture Review Request, Review for Release, Request for Recommendation. In an interview, state which meaning you are using ("RFR = Request for Review, our formal architecture-review submission") rather than assuming the interviewer shares it.</div>
    <div class="code-box">Architect completes SAD
        │
        ▼
Creates RFR  (the review package)
        │
        ├── SAD attached          ├── NFR mapping
        ├── HLD attached          ├── Security assessment
        ├── ADRs attached         ├── Cost estimate
        └── Risk assessment       └── Compliance notes
        │
        ▼
Architecture Council
        │
        ├── Approved
        ├── Approved with Conditions
        └── Rework Required   → back to SAD / HLD</div>
    <div class="tip-box">✅ Say it like this: "The architecture is submitted through an RFR process for formal architecture review and approval" — NOT "the RFR passes." An RFR is a request, and the outcome is one of three decisions.</div>
    <div class="ans-block"><div class="ans-label">What the Architecture Council actually asks</div>
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Area</div><div>Typical Question</div></div>
      <div class="dt-row"><div class="dt-name">Architecture</div><div>Why microservices instead of a modular monolith?</div></div>
      <div class="dt-row"><div class="dt-name">Scalability</div><div>What happens when traffic goes from 1,000 TPS (Transactions Per Second) to 10,000 TPS?</div></div>
      <div class="dt-row"><div class="dt-name">Availability</div><div>What happens if an Azure region fails?</div></div>
      <div class="dt-row"><div class="dt-name">Security</div><div>Where are authentication and authorization enforced?</div></div>
      <div class="dt-row"><div class="dt-name">Data</div><div>Why PostgreSQL instead of Cosmos DB?</div></div>
      <div class="dt-row"><div class="dt-name">Cost</div><div>What is the estimated monthly cloud cost, and what drives it?</div></div>
      <div class="dt-row"><div class="dt-name">Operations</div><div>How will we monitor and support this system?</div></div>
      <div class="dt-row"><div class="dt-name">Disaster Recovery</div><div>What are the RPO (Recovery Point Objective) and RTO (Recovery Time Objective), and how were they validated?</div></div>
      <div class="dt-row"><div class="dt-name">Performance</div><div>How did you arrive at the 500 ms latency requirement?</div></div>
      <div class="dt-row"><div class="dt-name">Governance</div><div>Does this comply with enterprise technology standards?</div></div>
    </div></div>
    <div class="code-box">Typical attendees:  Solution Architect · Security · Infrastructure/Cloud
                    · Data · DevOps · Engineering
They do NOT review every line of code — they review decisions, risks,
trade-offs and compliance with enterprise standards.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. PR (Pull Request) ≠ Architecture Review</div>
  <div class="ref-body">
    <div class="code-box">ARCHITECTURE LEVEL (governs DESIGN)          IMPLEMENTATION LEVEL (governs CODE)
────────────────────────────────          ───────────────────────────────────
SAD                                        Code
 │                                          │
 └── Architecture Review / RFR              └── Pull Request
            │                                        │
            ▼                                        ├── Code Review
         Approved                                    ├── SonarQube
            │                                        ├── SAST
            ▼                                        ├── Unit Tests
   (then LLD and development begin)                  └── Build</div>
    <div class="warn-box">⚠️ A common incorrect claim: "implementation triggers a programmatic RFR via a Pull Request." A PR is a code-review mechanism; an architecture review is a governance mechanism. A PR MAY verify the code follows the approved architecture (for example through architecture-conformance checks), but it does not replace architecture governance.</div>
    <div class="tip-box">✅ Interview line: "PR gates protect code quality; architecture reviews protect design integrity. I make the PR pipeline reinforce the approved architecture with automated conformance checks, but I would never treat a merged PR as architectural approval."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. RTM (Requirements Traceability Matrix)</div>
  <div class="ref-body">
    <div class="code-box">Business Requirement → Requirement → Design → Implementation → Test Case → Test Result

RTM establishes TRACEABILITY across those links. It does not "map every
line of code" — that overstates it. It answers: "for each requirement, which
design element satisfies it, what implements it, and which test proves it?"</div>
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Requirement</div><div>Design</div><div>Implementation</div><div>Test</div></div>
      <div class="dt-row"><div class="dt-name">Login</div><div>OAuth2 architecture</div><div>Auth Service</div><div>TC-001</div></div>
      <div class="dt-row"><div class="dt-name">99.99% availability</div><div>Multi-region design</div><div>AKS + Front Door</div><div>DR-001</div></div>
      <div class="dt-row"><div class="dt-name">&lt; 500 ms API</div><div>Redis + indexing</div><div>Order API</div><div>PERF-001</div></div>
      <div class="dt-row"><div class="dt-name">RBAC</div><div>Entra ID + RBAC</div><div>Authorization middleware</div><div>SEC-001</div></div>
    </div>
    <div class="tip-box">✅ RTM is most valuable in regulated or large enterprise settings (healthcare, finance, rail) where you must PROVE every requirement was designed, built and tested — and where a missing test for an NFR such as DR is an audit finding, not a nice-to-have.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. The Professional Lifecycle — Use This In Interviews</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.7fr 1.3fr 1.5fr;"><div>Phase</div><div>Main Artifacts</div><div>Review / Gate</div><div>Primary Question</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr 1.5fr;"><div class="dt-name">1. Business &amp; Product</div><div>BRD (Business Requirements Document), PRD (Product Requirements Document), Business Case</div><div>Stakeholder Review</div><div>Why are we building it, and what product?</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr 1.5fr;"><div class="dt-name">2. Requirements</div><div>SRS (Software Requirements Specification), Functional Requirements, NFRs (Non-Functional Requirements)</div><div>Product / BA (Business Analyst) Review</div><div>What must the system do?</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr 1.5fr;"><div class="dt-name">3. Technical Analysis</div><div>RFC (Request for Comments), POC (Proof of Concept), Alternatives Analysis</div><div>Technical Review</div><div>What approaches are possible?</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr 1.5fr;"><div class="dt-name">4. Architecture</div><div>SAD (Software Architecture Document), HLD (High-Level Design), C4 / UML diagrams, ADRs (Architecture Decision Records)</div><div>Architecture Review</div><div>How should the system be structured?</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr 1.5fr;"><div class="dt-name">5. Governance</div><div>RFR (Request for Review), Risk Assessment, Security Assessment, Cost Model</div><div>Architecture Council</div><div>Is the architecture acceptable?</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr 1.5fr;"><div class="dt-name">6. Detailed Design</div><div>LLD (Low-Level Design), API (Application Programming Interface) Specs, DB (database) Design</div><div>Engineering Review</div><div>How will each component be implemented?</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr 1.5fr;"><div class="dt-name">7. Development</div><div>Source Code, PRs (Pull Requests)</div><div>Code Review + CI (Continuous Integration)</div><div>Does implementation follow the design?</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr 1.5fr;"><div class="dt-name">8. Testing</div><div>Test Cases, RTM (Requirements Traceability Matrix), Performance/Security Tests</div><div>QA (Quality Assurance) / UAT (User Acceptance Testing)</div><div>Does the system satisfy requirements?</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr 1.5fr;"><div class="dt-name">9. Release</div><div>Release Plan, Deployment Plan, Rollback Plan</div><div>Release / Change Approval (CAB — Change Advisory Board, for high-risk changes)</div><div>Can we safely deploy?</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr 1.5fr;"><div class="dt-name">10. Production</div><div>Monitoring, Dashboards, Runbooks</div><div>Operations / SRE (Site Reliability Engineering)</div><div>Is the system healthy?</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.3fr 1.5fr;"><div class="dt-name">11. Continuous Governance</div><div>ADR updates, Architecture Review, Technical Debt</div><div>Periodic Review</div><div>Does the architecture still meet business needs?</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Often-Missing Pieces — Add These To Your Answer</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div>Missing Piece</div><div>What To Say</div><div>Why It Matters</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Right-sized governance</div><div>Not every change needs a full Council review. Route by risk: a new service, a new data store, a new external integration, or a security-boundary change goes to the Council; a change inside an approved pattern is reviewed by the team's architect or a lightweight checklist.</div><div>Heavy gates on every change slow delivery and teach teams to bypass governance.</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Agile / continuous flow</div><div>In iterative delivery the SAD is a living document and the RFR is a recurring checkpoint (per epic or per major decision), not a one-time waterfall gate. Keep an architecture runway ahead of the teams.</div><div>Avoids the "big design up front" criticism while keeping control.</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">ADR lifecycle</div><div>ADR statuses: Proposed → Accepted → Deprecated / Superseded. A reversed decision creates a NEW ADR that supersedes the old one; the old ADR is never deleted.</div><div>Preserves the history of why the architecture changed.</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Architecture conformance in CI</div><div>Automate parts of governance: dependency-direction rules (for example NetArchTest / ArchUnit — libraries that assert architecture rules in unit tests), policy-as-code for cloud resources (Azure Policy), and fitness functions that fail the build when an NFR (Non-Functional Requirement) budget is violated.</div><div>Turns the approved architecture into an enforced contract instead of a document that drifts.</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Release / change approval</div><div>Release approval covers the release plan, deployment plan, rollback plan and risk. High-blast-radius changes may go to a CAB (Change Advisory Board); low-risk, pre-approved changes flow automatically.</div><div>Separates "is the design acceptable" from "is this release safe to ship now".</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Risk register &amp; exceptions</div><div>The RFR outcome "Approved with Conditions" produces tracked actions. A deliberate deviation from a standard is a time-boxed exception/waiver with an owner and a remediation date.</div><div>Conditions that nobody tracks are the same as no conditions.</div></div>
      <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.6fr;"><div class="dt-name">Feedback loop</div><div>Production telemetry (SLO breaches, incidents, cost overruns) triggers an architecture review and ADR updates; recurring findings feed the next RFC.</div><div>Governance continues after go-live — the architecture is validated by reality, not just by review.</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Answer — Walk Me Through Your Architecture Governance Process</div>
  <div class="ref-body">
    <div class="qa-card">
      <div class="qa-question">How does architecture governance work from requirements to production, and what is the difference between RFC, SAD, ADR, RFR, PR and RTM?</div>
      <div class="qa-answer">"I start from the business side — the BRD (Business Requirements Document) says why we are building it and the PRD (Product Requirements Document) says what product we build. From those comes the SRS (Software Requirements Specification) with functional requirements and NFRs (Non-Functional Requirements), because the NFRs are what actually shape the architecture: 99.99% availability rules out single-region before I draw anything. Where the approach is not obvious I write an RFC (Request for Comments) with alternatives and a POC (Proof of Concept) to discuss options. The chosen approach is described in the SAD (Software Architecture Document) and HLD (High-Level Design), with C4 diagrams inside them, and each significant decision is recorded as an ADR (Architecture Decision Record) with its trade-offs. The architecture is then submitted through an RFR — in our process, a Request for Review — to the Architecture Council, which returns Approved, Approved with Conditions, or Rework Required. Only after approval do we write the LLD (Low-Level Design) and start development. Pull Requests then govern the code with code review, SonarQube, SAST (Static Application Security Testing) and tests — a different gate from the architecture review, though I add conformance checks so the PR pipeline reinforces the approved design. Testing produces the RTM (Requirements Traceability Matrix), which traces each requirement through design and implementation to a passing test, which matters most for regulated work. Release approval covers the deployment and rollback plan, and after go-live monitoring feeds ADR updates and periodic reviews. I also right-size the process by risk, so only high-impact changes need the full Council."</div>
    </div>
  </div>
</div>
`;
