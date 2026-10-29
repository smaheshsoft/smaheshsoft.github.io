window.Pages['ref-c4-model'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>C4 Model</span></div>
  <h1>🧩 C4 Model — Context, Containers, Components, Code</h1>
  <p>A zoom-lens notation for describing software architecture at the right level of detail for the right audience</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">Level 1 — System Context</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Level 2 — Containers</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step blue">Level 3 — Components</div>
      <div class="flow-arrow">→</div>
      <div class="flow-step">Level 4 — Code</div>
    </div>
    <div class="tip-box">✅ C4 is to software architecture what Google Maps zoom levels are to geography — each level shows the same system with more or less detail, for a different audience, using the same small notation instead of a different diagramming style each time.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">The Four Levels</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Level</div><div>Shows</div><div>Audience</div></div>
      <div class="dt-row"><div class="dt-name">1. System Context</div><div>Your system as one box, the people and other systems it talks to</div><div>Everyone — business &amp; technical, including non-engineers</div></div>
      <div class="dt-row"><div class="dt-name">2. Container</div><div>The deployable/runnable units inside the system — web app, API, database, queue, mobile app</div><div>Technical stakeholders, architects, ops</div></div>
      <div class="dt-row"><div class="dt-name">3. Component</div><div>The major structural building blocks inside one container and how they interact</div><div>Developers working on that container</div></div>
      <div class="dt-row"><div class="dt-name">4. Code</div><div>Class/interface diagrams for a component — usually generated from code, not hand-drawn</div><div>Developers, and only when it adds value</div></div>
    </div>
    <div class="tip-box">✅ "Container" here means a deployable/runnable unit (an app, a service, a database, a queue) — it predates and is unrelated to Docker containers.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Level 1 — System Context Diagram</div>
  <div class="ref-body">
    <div class="code-box">          [Customer]
              │ places orders
              ▼
     ┌─────────────────────┐        ┌───────────────────┐
     │   E-Commerce System  │──────▶│  Payment Gateway    │
     │   (our system)        │        │  (external system)  │
     └─────────────────────┘◀──────└───────────────────┘
              │ sends shipment events
              ▼
     [Shipping Provider (external system)]</div>
    <div class="ref-list">
      <div class="ref-item"><strong>People (actors):</strong> real users of the system — customer, admin, support agent</div>
      <div class="ref-item"><strong>Software systems:</strong> your system (one box, no internals) and the external systems/third parties it integrates with</div>
      <div class="ref-item"><strong>Purpose:</strong> answer "what does this system do, and what does it depend on?" without any technology detail</div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Level 2 — Container Diagram</div>
  <div class="ref-body">
    <div class="code-box">E-Commerce System
┌───────────────────────────────────────────────────────────┐
│  [Web App — React/SPA]      [Mobile App — Flutter]           │
│          │ HTTPS/JSON              │ HTTPS/JSON               │
│          ▼                         ▼                          │
│            [API — .NET/Node, REST+gRPC]                        │
│          │                         │                           │
│          ▼                         ▼                          │
│  [SQL Database]            [Message Queue — Kafka/RabbitMQ]     │
│                                     │                           │
│                                     ▼                          │
│                        [Order Worker — background service]      │
└───────────────────────────────────────────────────────────┘</div>
    <div class="ref-list">
      <div class="ref-item"><strong>Container =</strong> anything that must be running for the system to work — a web app, SPA, API, mobile app, database, file system, message broker, or background worker</div>
      <div class="ref-item"><strong>Each box</strong> names its technology choice (React, .NET, PostgreSQL, Kafka) — this is where tech-stack decisions become visible</div>
      <div class="ref-item"><strong>Purpose:</strong> shows the high-level shape of the solution, how responsibilities are distributed, and how containers communicate (protocol, sync/async)</div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Level 3 — Component Diagram</div>
  <div class="ref-body">
    <div class="code-box">API Container
┌─────────────────────────────────────────────────────────┐
│  [Order Controller] → [Order Service] → [Order Repository] │
│                             │                               │
│                             ▼                               │
│                    [Payment Client]  [Event Publisher]        │
└─────────────────────────────────────────────────────────┘</div>
    <div class="ref-list">
      <div class="ref-item"><strong>Component =</strong> a grouping of related functionality behind a well-defined interface — roughly a module/package, not a single class</div>
      <div class="ref-item"><strong>Purpose:</strong> maps the internal structure of one container for the team that owns it — controllers, services, repositories, clients</div>
      <div class="ref-item"><strong>Often skipped</strong> for simple containers, or auto-generated from code annotations, since it drifts quickly if maintained by hand</div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Level 4 — Code Diagram</div>
  <div class="ref-body">
    <div class="ref-list">
      <div class="ref-item">Standard UML class/interface diagram for a single component — attributes, methods, relationships</div>
      <div class="ref-item">C4's authors recommend generating this from the IDE on demand rather than maintaining it by hand — code changes faster than any diagram can track</div>
    </div>
    <div class="warn-box">⚠️ Common trap: teams that draw Level 4 diagrams for everything. C4's guidance is to stop at Level 2 or 3 for most systems — Level 4 is optional and rarely worth the maintenance cost.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Supplementary Diagrams</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Diagram</div><div>Purpose</div></div>
      <div class="dt-row"><div class="dt-name">System Landscape</div><div>Zoomed-out view across multiple systems — how several C4 system-context diagrams relate to each other</div></div>
      <div class="dt-row"><div class="dt-name">Dynamic</div><div>Sequence/collaboration view of one specific use case or scenario, using the same notation</div></div>
      <div class="dt-row"><div class="dt-name">Deployment</div><div>Maps containers onto infrastructure — nodes, regions, Kubernetes clusters, cloud services</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">C4 vs UML vs ArchiMate</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Notation</div><div>Strength</div><div>Weakness</div></div>
      <div class="dt-row"><div class="dt-name">C4</div><div>Small, learnable in minutes; zoom levels keep each diagram legible to its audience</div><div>Not a full enterprise-architecture standard — pairs well with TOGAF, doesn't replace it</div></div>
      <div class="dt-row"><div class="dt-name">UML</div><div>Rich, precise, tool-standardized for code-level detail</div><div>Too heavy/verbose for whole-system communication with non-architects</div></div>
      <div class="dt-row"><div class="dt-name">ArchiMate</div><div>Covers business, application, and technology layers formally</div><div>Steep learning curve; overkill for a single solution's architecture</div></div>
    </div>
    <div class="tip-box">✅ Interview line: "I use C4 for the diagrams that go in an SAD/HLD — Context and Container levels — because stakeholders at every level can read them without training, then drop to UML or code-level detail only where a component's internal design needs it."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Where C4 Fits In The SDLC</div>
  <div class="ref-body">
    <div class="ref-list">
      <div class="ref-item"><strong>SAD / HLD:</strong> System Context + Container diagrams communicate scope and tech stack to stakeholders and reviewers</div>
      <div class="ref-item"><strong>LLD:</strong> Component diagrams (and occasionally code diagrams) for the team implementing a specific container</div>
      <div class="ref-item"><strong>ADR:</strong> container-level technology choices (e.g. "Kafka vs RabbitMQ for the Container diagram's message queue") are natural candidates for an Architecture Decision Record</div>
    </div>
    <div class="tip-box">✅ See also: <span onclick="showPage('ref-sad-hld-lld',document.querySelector('[onclick*=ref-sad-hld-lld]'))" style="cursor:pointer;text-decoration:underline;">SAD vs HLD vs LLD</span> and <span onclick="showPage('ref-adr',document.querySelector('[onclick*=ref-adr]'))" style="cursor:pointer;text-decoration:underline;">Architecture Decision Records</span>.</div>
  </div>
</div>
`;
