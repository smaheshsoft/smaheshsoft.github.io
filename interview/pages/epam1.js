window.Pages = window.Pages || {};
window.Pages['epam1'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>EPAM – Round 1</span></div>
    <h1>🧩 EPAM — Round 1: Proposal and Pre-Sales Architecture</h1>
    <p>Battery Swapping platform · proposal structure · architecture artifacts · C4 model · cost estimation · customer communication · 4-hour time-boxed design · technology selection · AI adoption · upskilling · RAG cost estimation · security in transit and at rest · system integrations</p>
  </div>
  <div class="stats-bar" style="margin-bottom:20px;">
    <div class="stat-box"><div class="num">14</div><div class="label">Questions</div></div>
    <div class="stat-box"><div class="num">1</div><div class="label">Round</div></div>
  </div>
  <div class="alert" style="margin-bottom:16px;">
    <strong>🎯 What this round tests</strong>
    <p>This is a pre-sales and proposal conversation, not a coding round. The interviewer wants to see that you can turn a client's need into a structured proposal, decide what to document and how deeply, estimate honestly, justify technology choices, and communicate with a customer — all within time limits. Anchor every answer in your Battery Swapping platform experience, and use only figures that are on your resume (99.99% availability, 20% infrastructure cost saving). Do not quote numbers you cannot back up.</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">Explain the Battery Swapping platform.</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Two-minute answer — business first, then architecture, then your role</div>
          <div class="qa-answer">"It is a cloud-native platform for battery swapping and energy management. Instead of waiting to charge, a rider or fleet vehicle swaps a depleted battery for a charged one at a station, so the platform has to manage stations, the battery inventory and its lifecycle, the swap transactions, billing in multiple currencies, and real-time visibility of everything. Each station streams telemetry through Azure IoT Hub into Event Hub for high-throughput ingestion; Azure Functions handle event-driven processing; and the domain logic — station and fleet management, battery lifecycle, billing, alerts and analytics — runs as microservices on AKS. PostgreSQL holds transactional data, Redis the hot cache, and Blob Storage the large telemetry archives, all behind Azure API Management with observability through Application Insights and Log Analytics. On top of that I added a GenAI layer: operational and knowledge data is embedded into a vector store on Azure AI Search, retrieved with RAG, and an assistant reaches other services through MCP under identity-scoped access and guardrails. I was the Principal Architect — I defined the enterprise architecture roadmap for multi-region deployment, 99.99% availability and multi-currency billing, and drove cost governance that delivered about 20% infrastructure savings."</div></div>
          <div class="ans-block"><div class="ans-label">The architecture in one picture</div>
          <div class="flow-box">
            <div class="flow-step">Swapping Stations<br><span style="font-weight:400;font-size:11px;">battery telemetry</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Azure IoT Hub</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Event Hub<br><span style="font-weight:400;font-size:11px;">high-throughput ingestion</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Azure Functions<br><span style="font-weight:400;font-size:11px;">event-driven processing</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-step green">AKS Microservices<br><span style="font-weight:400;font-size:11px;">stations · fleet · battery · billing</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-step green">PostgreSQL · Redis · Blob</div>
          </div></div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.6fr;"><div>Capability</div><div>What the platform does</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Real-time monitoring</div><div>Live battery and station state from IoT telemetry</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Fleet and station management</div><div>Stations, batteries, availability, operations</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Battery lifecycle</div><div>Tracking a battery through use, charging and retirement</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Billing and payments</div><div>Automated billing with multi-currency support</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Alerts and analytics</div><div>Notifications, reporting, operational insight</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">GenAI assistant</div><div>RAG over operational data, MCP-based tool access, guardrails and governance</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Quality attributes</div><div>Multi-region deployment, 99.99% availability, cost optimisation</div></div>
          </div>
          <div class="tip-box">✅ Keep the first pass at this altitude and let the interviewer pull you deeper. Related pages: Solera Q9 (platform architecture) and Solera Q1 and Q4 (the RAG and agentic layers).</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">How do you prepare a proposal? What aspects does the architecture design cover during the proposal?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">The principle: enough design to estimate and de-risk — not detailed design</div>
          A proposal is a promise about scope, approach, time and cost. The architecture inside it must be deep enough that the estimate is defensible and the main risks are visible, and no deeper — detailed design is paid-for work that comes after the client says yes.</div>
          <div class="code-box">PROPOSAL PREPARATION — the flow
  1  Understand the ask         RFP or brief, business goals, success criteria, constraints
  2  Ask clarifying questions   scale, integrations, compliance, timeline, budget, team
  3  Write assumptions          every gap you could not close becomes a written assumption
  4  Shape the solution         options, then one recommended architecture and why
  5  Estimate                   effort, cost and run-cost as ranges (see Q5)
  6  Plan the delivery          phases, team, governance, milestones
  7  Call out risks             and what you will do about each
  8  Review and submit          peer architecture review, commercial review, executive summary</div>
          <div class="ans-block"><div class="ans-label">Proposal outline</div>
          <div class="code-box">1  Executive summary              the problem, the approach, the value — one page
2  Understanding of the need     goals, scope, out-of-scope, assumptions, constraints
3  Solution overview             capabilities, user journeys, MVP versus later phases
4  Architecture                  context, containers, key flows, deployment (C4 level 1-2)
5  Non-functional approach       targets and HOW each is met
6  Technology choices            options considered and the reasons for the pick
7  Security and compliance       identity, data protection, residency, audit
8  Delivery approach             phases, team structure, DevOps, quality, governance
9  Estimate and commercials      effort, cost ranges, pricing model, contingency
10 Risks, assumptions, dependencies
11 Why us                         relevant experience, accelerators, references</div></div>
          <div class="ans-block"><div class="ans-label">Aspects the architecture covers at proposal time</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div>Aspect</div><div>What you show</div><div>Depth</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">Business context and scope</div><div>Who uses it, what is in and out of scope, success measures</div><div>Full</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">Key requirements</div><div>Major capabilities, plus the quality attributes that will shape the design</div><div>Headline level</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">Architecture style</div><div>For example event-driven microservices versus a modular monolith, with the reason</div><div>Decision and rationale</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">Logical architecture</div><div>Context and container views; main components and their responsibilities</div><div>C4 level 1-2</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">Data architecture</div><div>Main data stores, ownership, volumes and retention at a ballpark level</div><div>Sketch</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">Integration</div><div>Third-party and legacy systems, protocols, who owns which interface</div><div>List and approach</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">Technology stack</div><div>The chosen platforms and why (see Q9)</div><div>Table with rationale</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">Security and compliance</div><div>Identity, encryption, data residency, regulatory needs</div><div>Principles and controls</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">Deployment and operations</div><div>Cloud topology, regions, availability and disaster recovery approach, monitoring</div><div>Deployment view</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">DevOps and quality</div><div>CI/CD, environments, test strategy, release approach</div><div>Approach</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">Migration or transition</div><div>If replacing something: strangler approach, data migration, cut-over</div><div>Approach</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">Risks and assumptions</div><div>Technical and delivery risks, mitigations, assumptions you made</div><div>Register</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">Cost drivers</div><div>What makes cost go up or down, and the estimate range</div><div>Model (see Q5)</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr 1.2fr;"><div class="dt-name">Roadmap</div><div>Phases: discovery, MVP, scale-out, with what is delivered in each</div><div>Plan</div></div>
          </div></div>
          <div class="warn-box">⚠️ A common mistake is over-designing the proposal — spending days on detailed class and database design for work that may not be won, and committing the team to decisions made without the client's input. Equally bad is under-designing: a vague diagram and a confident price, which leads to a bad estimate and scope disputes later.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">What architecture artifacts are created other than UML and NFR documents?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Group them by the question each one answers</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div>Artifact</div><div>What it answers</div><div>When</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Architecture vision / statement of work</div><div>What are we building, for whom, and what does success look like?</div><div>Proposal</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Stakeholder map and concerns</div><div>Who cares about what, and who decides?</div><div>Proposal</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Capability map and requirements catalogue</div><div>What must the business be able to do; what is MVP?</div><div>Proposal</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Architecture principles</div><div>Which rules guide every decision (for example cloud-native, API-first, secure by default)?</div><div>Proposal</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">C4 model diagrams</div><div>What is the structure at context, container, component level?</div><div>Proposal, design</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Solution architecture document (SAD) / HLD</div><div>The whole design in prose and pictures, mapped to the NFRs</div><div>Design</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Architecture Decision Records (ADRs)</div><div>Why did we choose this, and what did we reject?</div><div>Throughout</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Technology selection matrix</div><div>How were the options scored against the criteria?</div><div>Proposal, design</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Data model and data-flow diagrams</div><div>What data exists, who owns it, how does it move?</div><div>Design</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">API specifications and event catalogue</div><div>What are the interface contracts (OpenAPI, AsyncAPI)?</div><div>Design, build</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Integration matrix</div><div>Which systems connect, how, and who owns each interface?</div><div>Proposal, design</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Deployment and infrastructure diagrams</div><div>Where does it run — regions, networks, environments?</div><div>Design</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Security architecture and threat model</div><div>How is it protected, and what could go wrong?</div><div>Design</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">DR / business-continuity plan</div><div>How do we recover, and within what recovery time and data loss?</div><div>Design</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Capacity and sizing model</div><div>What load do we design for, and what does it need?</div><div>Proposal, design</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Cost model</div><div>What will it cost to build and to run?</div><div>Proposal</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Risk register and assumptions log</div><div>What might go wrong, and what did we assume?</div><div>Throughout</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Roadmap and phasing plan</div><div>What is delivered when?</div><div>Proposal</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">PoC / spike reports</div><div>Did the risky idea actually work?</div><div>Proposal, design</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Requirements traceability matrix (RTM)</div><div>Is every requirement designed, built and tested?</div><div>Design, test</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Observability and operations design, runbooks</div><div>How will we see and run it?</div><div>Design, handover</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Governance and review checklist</div><div>Does the design meet the standards (for example a Well-Architected review)?</div><div>Design</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.3fr;"><div class="dt-name">Glossary and domain model</div><div>Do we all use the same words for the same things?</div><div>Throughout</div></div>
          </div></div>
          <div class="tip-box">✅ Interview line: "Beyond UML and the NFR document I produce a vision and stakeholder map, a capability map, architecture principles, C4 diagrams, a solution architecture document, ADRs, a technology selection matrix, data and integration views, a security and threat model, a DR plan, a sizing and cost model, a risk and assumptions register, a roadmap, and PoC reports. Which of them I write at proposal time versus design time depends on how much the client needs to see to trust the estimate." Related pages: SDLC Governance Flow, ADR, SAD vs HLD vs LLD.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">What is the C4 model? How do you prepare C4-based documents?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">What it is</div>
          C4 is a way of drawing software architecture as four levels of zoom, created by Simon Brown: <strong>C</strong>ontext, <strong>C</strong>ontainers, <strong>C</strong>omponents and <strong>C</strong>ode. Like a map, you zoom from the whole country down to a street, and each level has one audience and one question. It uses a small set of abstractions — person, software system, container, component — instead of free-form boxes, so diagrams stay consistent and readable.</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:0.8fr 1.4fr 1.3fr 1.1fr;"><div>Level</div><div>Shows</div><div>Audience</div><div>Use it?</div></div>
            <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.3fr 1.1fr;"><div class="dt-name">1 Context</div><div>The system as one box, its users and the external systems it talks to</div><div>Everyone, including non-technical people</div><div class="dt-yes">Always</div></div>
            <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.3fr 1.1fr;"><div class="dt-name">2 Containers</div><div>The separately running or deployable units — web app, API, service, database, queue — with technology and protocols</div><div>Architects, developers, operations</div><div class="dt-yes">Always</div></div>
            <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.3fr 1.1fr;"><div class="dt-name">3 Components</div><div>The main building blocks inside ONE container</div><div>Developers on that container</div><div>Only for the containers that need it</div></div>
            <div class="dt-row" style="grid-template-columns:0.8fr 1.4fr 1.3fr 1.1fr;"><div class="dt-name">4 Code</div><div>Classes and UML-level detail</div><div>Developers</div><div class="dt-no">Rarely drawn by hand — generate from code if needed</div></div>
          </div>
          <div class="warn-box">⚠️ A C4 "container" is not necessarily a Docker container. It is any separately running or deployable unit: a single-page app, an API, a microservice, a database, a message broker.</div>
          <div class="ans-block"><div class="ans-label">How to prepare C4 documents — step by step</div>
          <div class="code-box">1  LIST people and external systems                      -&gt; Level 1 (context)
     rider, fleet driver, station operator, payment gateway, utility, ERP
2  DECOMPOSE the system into containers                -&gt; Level 2
     each with a name, its type, its technology, one-line responsibility
3  LABEL every arrow with the intent and the protocol
     "Sends telemetry (MQTT)"   "Charges card (HTTPS/REST)"
4  CHOOSE which containers deserve a component diagram -&gt; Level 3
     only the complex or risky ones — not all of them
5  SKIP Level 4 unless asked
6  ADD the supplementary diagrams that matter
     Deployment (regions, nodes)   Dynamic (a key scenario, step by step)
     System landscape (how this system sits among the others)
7  ADD to every diagram: title, key/legend, and the date or version</div></div>
          <div class="ans-block"><div class="ans-label">Worked example — Battery Swapping platform</div>
          <div class="code-box">LEVEL 1 — System context
   [Rider / Fleet driver]   [Station operator]   [Operations team]
              |             |             |
              v             v             v
        +------------------------------------+
        |  Battery Swapping &amp; Energy Platform  |
        +------------------------------------+
          ^           |            |            |
   [Battery stations] [Payment gateway] [Utility / grid] [ERP / finance]

LEVEL 2 — Containers (inside the platform)
   Rider app (mobile) · Web portal · API Management (gateway)
   Station service · Battery lifecycle service · Swap and billing service
   Alerts service · Analytics · GenAI assistant service
   IoT Hub -&gt; Event Hub -&gt; Azure Functions (telemetry processing)
   PostgreSQL · Redis · Blob Storage · Azure AI Search (vector store)</div></div>
          <div class="ans-block"><div class="ans-label">Diagrams as code — keep them in the repository</div>
          <div class="code-box">workspace {
  model {
    rider    = person "Rider"
    operator = person "Station operator"
    payments = softwareSystem "Payment Gateway"

    bsp = softwareSystem "Battery Swapping Platform" {
      gateway  = container "API Gateway" "Auth, routing" "API Management"
      swap     = container "Swap + Billing" "Swaps, billing" "ASP.NET Core, AKS"
      stations = container "Station Service" "Batteries" "ASP.NET Core, AKS"
      ingest   = container "Telemetry" "Routes telemetry" "Azure Functions"
      db       = container "Database" "Transactions" "PostgreSQL"
    }

    rider    -&gt; gateway  "Requests a swap"   "HTTPS"
    operator -&gt; gateway  "Manages stations"  "HTTPS"
    gateway  -&gt; swap     "Routes requests"   "REST"
    swap     -&gt; payments "Charges the rider" "HTTPS"
    swap     -&gt; db       "Reads, writes"     "SQL"
    ingest   -&gt; stations "Battery state"     "Events"
  }
  views {
    systemContext bsp { include * autoLayout }
    container     bsp { include * autoLayout }
  }
}</div>
          <div class="tip-box">✅ Tools: Structurizr (a DSL like the one above — one model, many views), PlantUML with the C4 library, Mermaid C4, or draw.io with C4 templates. Whatever the tool, version the diagrams in the repository next to the code so they are reviewed and updated like code. Naming rule for every box: name, type, technology, one-line description.</div></div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">How do you do cost estimation? Is any approach or model used?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">There are three different costs — name them separately</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 1.6fr 1.6fr;"><div>Cost</div><div>What it covers</div><div>How to estimate</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.6fr 1.6fr;"><div class="dt-name">Build (effort)</div><div>People over time — analysis, design, development, test, DevOps, PM</div><div>Bottom-up work breakdown, validated against similar projects</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.6fr 1.6fr;"><div class="dt-name">Run (cloud and licences)</div><div>Compute, storage, network, managed services, monitoring, support plans, third-party licences</div><div>Sizing from the NFRs plus a cloud pricing calculator</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.6fr 1.6fr;"><div class="dt-name">Total cost of ownership</div><div>Build plus several years of run, support, upgrades and change</div><div>Year-by-year scenarios (year 1, 2, 3)</div></div>
          </div></div>
          <div class="ans-block"><div class="ans-label">Effort-estimation approaches — and when to use which</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.2fr 1.5fr;"><div>Approach</div><div>How it works</div><div>Best for</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.5fr;"><div class="dt-name">Analogy (top-down)</div><div>Compare with a similar past project and adjust for differences</div><div>Fast ballpark in the early proposal</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.5fr;"><div class="dt-name">Bottom-up work breakdown (WBS)</div><div>Break the solution into components and tasks, estimate each by complexity, then sum</div><div>The main estimate — traceable and explainable</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.5fr;"><div class="dt-name">Three-point (PERT)</div><div>For uncertain items estimate optimistic (O), most likely (M) and pessimistic (P); expected = (O + 4M + P) / 6</div><div>Items with real uncertainty</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.5fr;"><div class="dt-name">T-shirt sizing / story points</div><div>Relative sizes (S, M, L) mapped to effort ranges using past velocity</div><div>Early backlog-level estimates</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.5fr;"><div class="dt-name">Parametric (function points, COCOMO-style)</div><div>Use size measures and historical productivity rates</div><div>Large fixed-scope work with history to calibrate against</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.5fr;"><div class="dt-name">Expert / group estimation</div><div>Several architects and leads estimate independently, then reconcile differences</div><div>Cross-checking any of the above</div></div>
          </div></div>
          <div class="ans-block"><div class="ans-label">Bottom-up estimate — structure (the numbers come from your own data)</div>
          <div class="code-box">WBS by component x activity          rows: Station service, Battery lifecycle, Swap + billing,
                                          Telemetry pipeline, Alerts, Analytics, API gateway,
                                          Security, DevOps, GenAI layer (if in scope)
                                    columns: Design, Build, Test, Deploy, Docs
For each cell:  size (S/M/L) -&gt; effort range -&gt; risk flag
Then add:       integration effort, non-functional work (security, performance, DR),
                environments, data migration, PM and governance
Then roles:     effort x role mix x rate card = cost
Then:           an explicit CONTINGENCY agreed with the client, tied to the risk register

Three-point example (illustrative numbers only):  O = 10, M = 15, P = 30 days
   expected = (10 + 4 x 15 + 30) / 6 = 16.7 days</div></div>
          <div class="ans-block"><div class="ans-label">Run-cost model (cloud)</div>
          <div class="code-box">1  SIZE from the NFRs and the capacity model
     messages per second, storage growth, concurrent users, regions, availability target
2  PRICE each service with the cloud pricing calculator
     compute (AKS nodes), IoT Hub / Event Hub units, databases, cache, storage, network egress,
     API Management, monitoring and log ingestion, support plan
3  MULTIPLY by environments
     dev, test, staging, production, and disaster recovery
4  APPLY discounts you can commit to
     reserved capacity or savings plans, right-sizing, autoscaling
5  EXPRESS as unit economics
     cost per swap, per station per month, per active rider
6  PROJECT three scenarios: low, expected, high growth — for years 1 to 3</div></div>
          <div class="ans-block"><div class="ans-label">How to present it</div>
          <ul>
            <li><strong>A range with assumptions, not a single number</strong> — low / likely / high, and what moves it.</li>
            <li><strong>Separate fixed from variable</strong> — build is mostly fixed; run scales with usage.</li>
            <li><strong>Pricing model</strong> — fixed price for well-defined phases, capped time-and-materials where scope is uncertain, milestone payments tied to deliverables.</li>
            <li><strong>Reconcile two views</strong> — top-down (analogy) and bottom-up (WBS); a large gap means a missing assumption.</li>
            <li><strong>FinOps from day one</strong> — tagging, budgets and alerts, and regular reviews. On the Battery Swapping platform cost governance contributed to about 20% infrastructure savings.</li>
          </ul></div>
          <div class="warn-box">⚠️ Common traps: estimating only build and forgetting the run cost; giving one precise number for something uncertain; hiding contingency inside task estimates instead of stating it; and not writing down the assumptions the estimate depends on.</div>
          <div class="tip-box">✅ Interview line: "I estimate bottom-up from a work breakdown of components and activities, use three-point estimates for the uncertain items, cross-check against similar past projects, and add an explicit contingency tied to the risk register. For run cost I size from the NFRs, price with the cloud calculator, multiply by environments including DR, and express it as cost per unit of business value. I always present ranges with the assumptions behind them."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">How do you present the design to the end customer other than giving diagrams?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Diagrams show structure; customers need to understand value, risk and what happens next</div>
          Different people in the customer organisation need different things, so the same design is presented in several forms.</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 1.6fr 1.8fr;"><div>Audience</div><div>What they care about</div><div>What you give them</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.6fr 1.8fr;"><div class="dt-name">Executives and sponsors</div><div>Value, cost, timeline, risk</div><div>One-page executive summary, roadmap, cost range, top risks</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.6fr 1.8fr;"><div class="dt-name">Business and operations</div><div>Will it do what we need? How will our people work with it?</div><div>Capability map, user-journey walkthroughs, a demo or prototype</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.6fr 1.8fr;"><div class="dt-name">IT, security and compliance</div><div>Does it fit our standards and rules?</div><div>Security architecture, data-protection and residency approach, NFR commitments table, compliance mapping</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.6fr 1.8fr;"><div class="dt-name">Engineering and integration teams</div><div>How do we connect to it and build with it?</div><div>API specifications and a sandbox, event catalogue, ADRs, a reference skeleton repository</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.6fr 1.8fr;"><div class="dt-name">Procurement and finance</div><div>What are we buying and how is it priced?</div><div>Scope, assumptions, pricing model, cost scenarios</div></div>
          </div>
          <div class="ans-block"><div class="ans-label">Ways to present beyond diagrams</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.5fr;"><div>Format</div><div>Why it works</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Narrative solution document</div><div>Explains the reasoning in words — what, why, trade-offs — which diagrams cannot</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Scenario walkthroughs</div><div>"A day in the life of a swap": rider arrives, battery is identified, swap happens, bill is generated — shows the design working end to end</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Workshops and architecture reviews</div><div>Interactive sessions where the customer challenges the design; builds ownership and surfaces missing requirements</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Decision log (ADRs)</div><div>Shows the options considered and why — builds trust in the recommendation</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">NFR commitment table</div><div>Each target, how the design meets it, and how it will be tested — makes promises checkable</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Prototype or PoC demo</div><div>Proves the riskiest part works; far more convincing than a slide</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Living documentation</div><div>Wiki or docs-as-code with diagrams generated from the model, so the customer always sees the current design</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">API contract and sandbox</div><div>Lets the customer's developers try the interface before it is built</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Roadmap and risk register</div><div>Shows what arrives when and what could slip, with owners</div></div>
          </div></div>
          <div class="tip-box">✅ Interview line: "I present the same design three ways: a short narrative and roadmap for sponsors, scenario walkthroughs and a demo for the business, and contracts, decision records and a sandbox for engineers. I run workshops rather than just sending documents, because the customer's challenges are how the design gets better and how they come to own it."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q7</div>
      <div class="qa-body">
        <div class="qa-question">If a client wants a Battery Swapping platform, how do you create the proposal, and what artifacts do you create?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Step 1 — Discovery: the questions that shape the solution</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.6fr;"><div>Area</div><div>Questions to ask</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Business model</div><div>Who owns the batteries — the operator, the rider, a battery-as-a-service provider? Pricing per swap, subscription, deposit? Single operator or multi-tenant?</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Scale and growth</div><div>How many stations, batteries and swaps per day now and in three years? Peak patterns? Which cities and countries?</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Hardware and telemetry</div><div>Which batteries and battery-management systems, which protocols, how often does each station report, what happens when connectivity drops?</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Integrations</div><div>Payment providers, ERP or finance, mapping, utility or grid, existing mobile apps, identity</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Money</div><div>Currencies, taxes, invoicing and settlement rules per country</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Compliance and safety</div><div>Data residency, privacy law, battery safety and incident reporting, audit needs</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Quality attributes</div><div>Availability target, swap-time target, recovery objectives, acceptable downtime windows</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Constraints</div><div>Preferred cloud, existing tech and skills, budget, deadline, team the client will provide</div></div>
          </div></div>
          <div class="ans-block"><div class="ans-label">Step 2 — Shape the solution</div>
          <div class="code-box">Capability map -&gt; MVP versus later
  Station management · Battery lifecycle · Swap transaction · Billing and payments
  Rider and fleet apps · Telemetry and monitoring · Alerts · Analytics · Identity
  (optional) GenAI assistant over operational data

Options: build / buy / hybrid  (for example buy payments and identity, build swap and lifecycle)
Recommendation: event-driven cloud-native — telemetry through IoT Hub and Event Hub, event-driven
processing, microservices for the domain, PostgreSQL / Redis / Blob, API gateway in front,
multi-region for availability, multi-currency billing designed in from the start</div></div>
          <div class="ans-block"><div class="ans-label">Step 3 — Artifacts for the proposal</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.5fr;"><div>Artifact</div><div>Content for a battery swapping proposal</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Executive summary</div><div>Problem, approach, benefits, phases, indicative cost range</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Assumptions and open questions</div><div>Everything the discovery could not settle, written down</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Capability map and MVP scope</div><div>What is in the first release and what is later</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">C4 level 1 and 2 diagrams</div><div>Context and containers; one deployment view; one dynamic view of the swap flow</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Key flows</div><div>Swap transaction, telemetry ingestion, billing, alert handling</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">NFR table</div><div>Availability, performance, scalability, security, recovery — each with the design approach</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Technology selection with rationale</div><div>The stack and the reasons (see Q9)</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Integration and data overview</div><div>External systems, main data stores, residency approach</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Security and compliance approach</div><div>Identity, encryption, audit, regional data rules</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Delivery plan</div><div>Phases (inception, MVP, scale-out), team shape, DevOps, governance</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Estimate and cost model</div><div>Build effort ranges, cloud run-cost scenarios, pricing model</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Risk register</div><div>Hardware integration, connectivity, regulation, data migration, with mitigations</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Relevant experience</div><div>Reference architecture from the platform you delivered, using only claims you can back up</div></div>
          </div></div>
          <div class="tip-box">✅ Interview line: "I start with discovery questions on the business model, scale, hardware and integrations, write down assumptions for what stays open, and then present a capability map with an MVP boundary. The architecture is shown as C4 context and container views plus the swap and telemetry flows, with an NFR table, a technology rationale, a phased delivery plan, a cost range and a risk register. Because I have delivered this platform, I can reuse a proven reference architecture to shorten the work and reduce the risk."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q8</div>
      <div class="qa-body">
        <div class="qa-question">You have to design the Battery Swapping platform in a 4-hour window. What documents do you create, and how, when time is limited?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Principles when time-boxed</div>
          <ul>
            <li><strong>Breadth over depth</strong> — cover every area at headline level; do not perfect one area.</li>
            <li><strong>Decisions over documentation</strong> — record the important decisions and their reasons; skip prose that nobody will read.</li>
            <li><strong>Assumptions are a deliverable</strong> — what you cannot ask, you assume and write down.</li>
            <li><strong>Reuse</strong> — start from a reference architecture, templates and a diagram-as-code skeleton rather than a blank page.</li>
            <li><strong>Say what is deferred</strong> — a clear "next phase" list is more credible than half-done detail.</li>
          </ul></div>
          <div class="ans-block"><div class="ans-label">The four-hour plan</div>
          <div class="code-box">0:00 - 0:30   FRAME           goals, users, scale, constraints; list assumptions and
                              open questions; pick the top 5 quality attributes
0:30 - 1:00   SCOPE           capability map; MVP boundary; decisions still to make
1:00 - 2:00   STRUCTURE       C4 level 1 context + level 2 containers;
                              two key flows: swap transaction and telemetry ingestion
2:00 - 2:30   QUALITIES       NFR table: each target and how the design meets it;
                              data, integration and security essentials
2:30 - 3:00   TECHNOLOGY      options and decision matrix for the 4-5 big choices;
                              3-5 lightweight ADRs
3:00 - 3:30   PLAN AND COST  phased roadmap; cost as ranges; top risks
3:30 - 4:00   ASSEMBLE       one-page executive summary; consistency check;
                              prepare the 10-minute walkthrough</div></div>
          <div class="ans-block"><div class="ans-label">What you produce in four hours</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.8fr 1fr;"><div>Deliverable</div><div>Form</div><div>Length</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1fr;"><div class="dt-name">Executive summary</div><div>Problem, approach, phases, cost range, key risks</div><div>1 page</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1fr;"><div class="dt-name">Assumptions and open questions</div><div>Numbered list, each with an owner</div><div>1 page</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1fr;"><div class="dt-name">C4 context and container diagrams</div><div>Diagrams as code from a template, plus one key-flow sequence</div><div>3 diagrams</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1fr;"><div class="dt-name">NFR-to-design table</div><div>Target, approach, how it will be verified</div><div>1 page</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1fr;"><div class="dt-name">Technology decisions</div><div>Decision matrix plus 3-5 short ADRs</div><div>2 pages</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1fr;"><div class="dt-name">Phased roadmap and cost ranges</div><div>Three phases with indicative effort and run-cost ranges</div><div>1 page</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1fr;"><div class="dt-name">Risk register</div><div>Top risks with mitigation</div><div>Half a page</div></div>
          </div></div>
          <div class="ans-block"><div class="ans-label">Deliberately NOT produced in four hours — and said so</div>
          <div class="code-box">Detailed low-level design and class models          -&gt; next phase
Full data model and every API specification        -&gt; next phase
Complete threat model and compliance mapping       -&gt; next phase (headline controls only)
Detailed bottom-up estimate with a full WBS        -&gt; after discovery workshops
Component-level C4 diagrams for every container    -&gt; only for the risky ones, later</div></div>
          <div class="ans-block"><div class="ans-label">How to go faster without losing quality</div>
          <ul>
            <li>Parallelise: ask a business analyst to firm up requirements, a DevOps engineer to size infrastructure, and a security lead to review the controls while you design.</li>
            <li>Timebox any spike — if a risky choice cannot be settled in about 20 minutes, record it as an open decision with the options and the test that will settle it.</li>
            <li>Keep one source of truth (the diagram-as-code model) and generate the views from it.</li>
            <li>Finish with a consistency check: do the NFR table, the diagrams, the technology list and the estimate all describe the same system?</li>
          </ul></div>
          <div class="tip-box">✅ Interview line: "In four hours I frame the problem and write down assumptions, define the MVP boundary, draw the C4 context and container views with the two key flows, map each NFR to a design approach, record the main technology decisions as short ADRs, and finish with a phased roadmap, cost ranges and the top risks — plus a one-page summary. I explicitly list what I did not do, such as detailed design and the full threat model, so the client knows what the next phase buys."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q9</div>
      <div class="qa-body">
        <div class="qa-question">How is technology choice made? On what basis is technology selected?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Start from constraints and requirements, not from favourites</div>
          First find out what is fixed — the client's cloud and standards, existing systems, team skills, licences, compliance — then match the options against the requirements that matter most. The goal is a justified choice that the client can defend, not the most fashionable technology.</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.5fr;"><div>Criterion</div><div>Questions it answers</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Fit to requirements</div><div>Does it meet the functional needs and the top quality attributes (scale, latency, availability)?</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Client constraints</div><div>Approved cloud, existing platforms, security and compliance rules, data residency</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Team skills and hiring</div><div>Can the delivery and run teams build and operate it, and can they hire for it?</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Maturity and support</div><div>Is it proven at this scale, with a healthy ecosystem and vendor support?</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Total cost of ownership</div><div>Licences, cloud cost, people effort, operations — not just the sticker price</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Operability</div><div>Managed service or self-hosted? Monitoring, upgrades, backup, incident handling</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Integration</div><div>Does it work with the systems and protocols around it?</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Lock-in and portability</div><div>How hard is it to leave, and is the risk acceptable?</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Longevity and risk</div><div>Roadmap, community health, end-of-support dates</div></div>
          </div>
          <div class="ans-block"><div class="ans-label">The process</div>
          <div class="code-box">1  List the DECISIONS that matter (not every library — the few that are expensive to reverse)
2  For each, shortlist 2-3 REAL options
3  Agree the CRITERIA and their WEIGHTS with the client
4  SCORE each option; keep the reasons, not just the numbers
5  PROVE the risky ones with a short PoC or spike
6  RECORD the decision as an ADR (context, options, decision, consequences)
7  REVIEW with the client and revisit when assumptions change</div></div>
          <div class="ans-block"><div class="ans-label">Weighted decision matrix — illustrative scores only</div>
          <div class="code-box">Decision: telemetry ingestion        weight   IoT Hub   Event Hubs only   Self-hosted Kafka
Per-device identity and management     5        5          2                 2
Fit to scale requirement               5        4          5                 5
Operational effort (managed)           4        5          5                 2
Team skills                            3        4          4                 2
Cost                                   3        3          4                 3
Weighted total                                  ...        ...               ...
(Scores are an example of the method. Real scores come from your own evidence and the client's priorities.)</div></div>
          <div class="ans-block"><div class="ans-label">Applied to the Battery Swapping platform — the choice and the deciding factor</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.2fr 2.2fr;"><div>Decision</div><div>Chosen</div><div>Deciding factor</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 2.2fr;"><div class="dt-name">Device telemetry entry point</div><div>Azure IoT Hub into Event Hub</div><div>Per-device identity and management for station hardware, then a high-throughput stream for processing</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 2.2fr;"><div class="dt-name">Event processing</div><div>Azure Functions</div><div>Event-driven, scales with the stream, little infrastructure to run</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 2.2fr;"><div class="dt-name">Domain services</div><div>Microservices on AKS</div><div>Many independently evolving domains, need for custom scaling and multi-region deployment</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 2.2fr;"><div class="dt-name">Transactional data</div><div>PostgreSQL</div><div>Billing and swaps need consistent transactions</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 2.2fr;"><div class="dt-name">Hot data</div><div>Redis</div><div>Low-latency reads for frequently accessed state</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 2.2fr;"><div class="dt-name">Large payloads and archives</div><div>Blob Storage</div><div>Cheap durable storage for telemetry archives</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 2.2fr;"><div class="dt-name">API front door</div><div>Azure API Management</div><div>Central authentication, rate limiting and routing</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.2fr 2.2fr;"><div class="dt-name">Vector search for RAG</div><div>Azure AI Search</div><div>Managed service in the same cloud, hybrid retrieval, identity-scoped access</div></div>
          </div></div>
          <div class="warn-box">⚠️ Traps: choosing technology because the team likes it, because it is new, or because a vendor demoed it well. Equally, ignoring the client's existing standards — a technically better option that the client cannot run or approve is the wrong option.</div>
          <div class="tip-box">✅ Interview line: "I choose technology from the client's constraints and the top quality attributes, not from preference. For each expensive-to-reverse decision I shortlist two or three real options, agree weighted criteria with the client, score them, prove the risky ones with a short PoC, and record the result as an ADR so the reasoning survives. On the Battery Swapping platform that gave IoT Hub for device identity, Event Hub and Functions for the event pipeline, AKS for domain services, and PostgreSQL, Redis and Blob for data — each with a stated deciding factor."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q10</div>
      <div class="qa-body">
        <div class="qa-question">How was AI adoption done in your current project?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — staged, starting with low-risk read-only value, with governance built in from the start</div>
          <div class="qa-answer">"We did not start with the technology; we started with a problem. Operations engineers had to query several systems to answer questions about stations, incidents and procedures. So the first use case was a read-only GenAI assistant using RAG: operational and knowledge data was embedded and indexed in Azure AI Search, retrieved with hybrid search, and answered by Azure OpenAI with citations and a refusal when the context did not contain the answer. Once that was trusted, we added bounded tool-calling through MCP so the assistant could fetch live data, behind identity-scoped access and guardrails, with human approval for anything that changes state. Governance, evaluation and cost controls were part of each stage rather than added at the end."</div></div>
          <div class="ans-block"><div class="ans-label">The adoption path, with a decision gate at each stage</div>
          <div class="code-box">1  PICK the use case          high value, low risk, data already exists
                              (engineers querying five systems -&gt; plain-language question)
2  CHECK data readiness       what data, who owns it, how current, who may see it
3  PILOT: read-only RAG       grounded answers, citations, refuse when unsure, small user group
   GATE: answers judged useful and correct on a fixed evaluation set
4  ADD bounded tools (MCP)    live station status, telemetry lookups; step cap and token budget
   GATE: security review of tool permissions and identity scoping
5  GOVERN                     guardrails, audit log, content filtering, prompt-injection defences,
                              human approval for state-changing actions
6  OPERATE AND SCALE          monitoring, cost budgets, re-indexing on change, feedback loop</div></div>
          <div class="ans-block"><div class="ans-label">What the AI layer looked like (resume-backed)</div>
          <div class="flow-box">
            <div class="flow-step">Operational and knowledge data</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Embeddings pipeline</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Vector store<br><span style="font-weight:400;font-size:11px;">Azure AI Search</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Semantic retrieval (RAG)</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step green">LLM answer with citations<br><span style="font-weight:400;font-size:11px;">MCP tools, guardrails, identity-scoped</span></div>
          </div></div>
          <div class="ans-block"><div class="ans-label">Adoption is people and process, not just architecture</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.6fr;"><div>Area</div><div>What was done or should be done</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Use-case selection</div><div>Rank candidates by value, risk, data availability and effort; start with the safest high-value one</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Governance</div><div>Access control at retrieval time, audit logging, guardrails, human approval for consequential actions, a clear owner for the AI layer</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Quality</div><div>A fixed evaluation set of real questions with expected answers, rerun whenever prompts, models or data change</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Security</div><div>Treat retrieved content as untrusted data; scope every tool to the caller's identity; no secrets in prompts</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Cost</div><div>Token budgets, caching, model tiering and usage metering per team from the pilot onward</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">People</div><div>Train users on what the assistant can and cannot do, appoint champions, collect feedback on wrong answers and feed it back into the evaluation set</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Measuring success</div><div>Adoption (active users), answer usefulness and correctness from the evaluation set, time saved on the target task, cost per question. Quote only measurements you actually have</div></div>
          </div></div>
          <div class="warn-box">⚠️ Do not claim full autonomous agents if what you built is a RAG assistant with bounded tool-calling. Describe the autonomy level precisely, and do not quote adoption numbers or savings that are not on your resume or in your own records.</div>
          <div class="tip-box">✅ Related pages: Solera Q3 (RAG pipeline and vector DB), Solera Q4 (agentic autonomy levels), and AI and LLM Engineering → RAG, MCP, Agentic AI and LLM Cost and Performance.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q11</div>
      <div class="qa-body">
        <div class="qa-question">How will you upskill yourself?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — a deliberate loop, not a reading list</div>
          <div class="qa-answer">"I treat upskilling as a loop: pick a capability gap that matters for my work, learn the fundamentals from primary sources, build something small to prove it, then teach or document it, and finally apply it on the project. I prioritise fundamentals over tools, because tools change every few months and fundamentals do not. Right now my focus is AI engineering — retrieval, evaluation, agents and cost — on top of cloud architecture and pre-sales skills such as estimation and communication. I keep it honest by measuring it: proofs of concept built, sessions delivered, decisions recorded, and what I applied in delivery."</div></div>
          <div class="ans-block"><div class="ans-label">The learning loop</div>
          <div class="code-box">1  IDENTIFY a gap           where does the next project or role need me to be stronger?
2  LEARN the fundamentals    official docs, specifications, a structured course, key papers or books
3  BUILD a small proof       a PoC or spike that exercises the idea against real constraints
4  RECORD and TEACH          write it up (an ADR or short note), present to the team
5  APPLY on the project      use it where it genuinely fits, then review what worked
6  REPEAT                    revisit the gap list every quarter</div></div>
          <div class="ans-block"><div class="ans-label">Skill areas — a T-shaped profile</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.2fr 1.5fr;"><div>Area</div><div>What to deepen</div><div>How to prove it</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.5fr;"><div class="dt-name">AI engineering</div><div>Embeddings, retrieval quality, evaluation, agents and MCP, prompt-injection and safety, LLM cost and performance</div><div>A PoC with an evaluation set and a cost model</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.5fr;"><div class="dt-name">Cloud architecture</div><div>Well-Architected reviews, multi-region design, resilience, FinOps, platform engineering</div><div>Design reviews and a cost-optimisation result</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.5fr;"><div class="dt-name">Security and governance</div><div>Threat modelling, identity, data protection, AI governance</div><div>A threat model for a real component</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.5fr;"><div class="dt-name">Pre-sales and communication</div><div>Proposals, estimation, C4 and diagrams-as-code, presenting to executives</div><div>Proposals written and walkthroughs delivered</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.2fr 1.5fr;"><div class="dt-name">Leadership</div><div>Mentoring, architecture governance, decision-making under uncertainty</div><div>Teams or engineers grown, ADRs adopted</div></div>
          </div></div>
          <div class="ans-block"><div class="ans-label">Example 90-day plan (adapt it to your own gaps)</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:0.8fr 2.4fr 1.6fr;"><div>Period</div><div>Focus</div><div>Output</div></div>
            <div class="dt-row" style="grid-template-columns:0.8fr 2.4fr 1.6fr;"><div class="dt-name">Days 1-30</div><div>LLM and RAG fundamentals; retrieval quality; building an evaluation set</div><div>A small RAG PoC with measured accuracy</div></div>
            <div class="dt-row" style="grid-template-columns:0.8fr 2.4fr 1.6fr;"><div class="dt-name">Days 31-60</div><div>Agents, MCP, tool security and guardrails; cost and token budgeting</div><div>A bounded tool-calling PoC and a cost model</div></div>
            <div class="dt-row" style="grid-template-columns:0.8fr 2.4fr 1.6fr;"><div class="dt-name">Days 61-90</div><div>Proposal craft: estimation, C4 models, technology selection, customer communication</div><div>A mock proposal and a team session</div></div>
          </div>
          <div class="code-box">Weekly rhythm (example):  3 h hands-on building · 1 h reading primary sources ·
                         1 h writing or teaching · a short review of what was applied at work</div></div>
          <div class="ans-block"><div class="ans-label">Filtering the noise</div>
          <ul>
            <li>Learn a new tool only when it solves a problem I have; try it with a time-boxed spike and record the outcome as a short ADR.</li>
            <li>Prefer primary sources — product documentation, specifications, papers — over summaries.</li>
            <li>Use certifications as milestones that force structured study, not as the goal. The goal is the ability to design and deliver.</li>
            <li>Learn in public inside the team: internal talks, design reviews, mentoring. Teaching exposes the gaps in my own understanding fastest.</li>
          </ul></div>
          <div class="tip-box">✅ Interview line: "I upskill through a loop of learn, build, teach and apply. My current focus is AI engineering and cost — retrieval, evaluation, agents, MCP — plus proposal skills. I measure it by the proofs of concept I built, the decisions I recorded and what I applied on the project, and I prefer fundamentals over chasing each new tool."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q12</div>
      <div class="qa-body">
        <div class="qa-question">How do you estimate the cost of an AI project with a RAG-based system?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — split it into build, run and improve, and build the run cost from a per-query token budget that you MEASURE in a pilot</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:0.9fr 2.2fr 1.6fr;"><div>Cost</div><div>What is in it</div><div>How to estimate</div></div>
            <div class="dt-row" style="grid-template-columns:0.9fr 2.2fr 1.6fr;"><div class="dt-name">Build (one-time)</div><div>Discovery and use-case scoping, data preparation and cleaning, ingestion and embedding pipeline, retrieval, prompts, application and API, security and guardrails, evaluation framework, testing, deployment</div><div>Bottom-up work breakdown with three-point estimates (see Q5)</div></div>
            <div class="dt-row" style="grid-template-columns:0.9fr 2.2fr 1.6fr;"><div class="dt-name">Run (recurring)</div><div>Model tokens, embeddings, vector search, re-ranking, compute, storage, networking, monitoring, content safety, support plans</div><div>Per-query token budget x volume, plus infrastructure sizing</div></div>
            <div class="dt-row" style="grid-template-columns:0.9fr 2.2fr 1.6fr;"><div class="dt-name">Improve (ongoing)</div><div>Re-indexing on data change, evaluation runs, prompt and model upgrades, human review of answers, feedback handling, FinOps reviews</div><div>A percentage of build plus a re-index and evaluation schedule</div></div>
          </div></div>
          <div class="ans-block"><div class="ans-label">The per-query cost model</div>
          <div class="code-box">Tokens per query
  input  = system prompt + retrieved context + conversation history + user question
           retrieved context = top-k chunks x tokens per chunk
  output = generated answer (capped by max output tokens)

Cost per query
  = input tokens  x input price per token
  + output tokens x output price per token
  + query embedding cost                   (small)
  + re-ranker call, if used                (per query)
  + content-safety / guardrail calls       (per query)
  + retrieval compute and search load      (share of the search tier)

Monthly run cost = cost per query x queries per day x 30
                 + vector store tier (storage and search capacity)
                 + application hosting, monitoring, logging
                 + one-time and delta embedding of the corpus</div></div>
          <div class="ans-block"><div class="ans-label">Worked example — structure with illustrative token counts (use your provider's current prices)</div>
          <div class="code-box">Assume (illustrative):  system 300 + history 300 + question 100 + context (4 chunks x 500) 2,000
  input  = 2,700 tokens        output = 400 tokens

  cost per query = 2,700 x P_in + 400 x P_out        (P_in, P_out = price per token from the price list)
  monthly        = cost per query x queries per day x 30

Why measure it: the real token counts depend on your chunk size, k, history length and
the answers users actually get. Run a pilot and log tokens per query, then replace the guesses.</div></div>
          <div class="code-box">def monthly_run_cost(queries_per_day, in_tokens, out_tokens, p_in, p_out,
                     rerank_cost=0.0, safety_cost=0.0, fixed_monthly=0.0):
    per_query = in_tokens * p_in + out_tokens * p_out + rerank_cost + safety_cost
    return per_query * queries_per_day * 30 + fixed_monthly

# fixed_monthly = vector store tier + hosting + monitoring + corpus embedding amortised
# Run three scenarios (low / expected / high volume) and show the range.</div>
          <div class="ans-block"><div class="ans-label">Components people forget</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.5fr;"><div>Item</div><div>Why it adds cost</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Corpus embedding and re-embedding</div><div>The whole corpus is embedded once, then again after a model change; document updates add a continuous delta</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Vector store capacity</div><div>Index size grows with chunk count and vector dimensions; managed search tiers are priced by capacity and replicas, which also drive availability</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Output tokens</div><div>Usually priced higher than input tokens, so verbose answers cost more than long contexts</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Conversation history growth</div><div>Each turn resends earlier turns unless trimmed or summarised</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Retries and agent loops</div><div>Multi-step or retried calls multiply tokens per user request</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Evaluation and testing</div><div>Evaluation runs and dev/test environments call the model too</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Guardrails and safety</div><div>Content filtering and prompt-injection checks are extra calls</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Logging prompts and responses</div><div>Storage and monitoring ingestion for audit and debugging</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Human in the loop</div><div>Review and feedback time is a real operating cost</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Capacity commitments</div><div>Pay-as-you-go suits uncertain volume; reserved or provisioned throughput suits steady high volume — decide once you have measured usage</div></div>
          </div></div>
          <div class="ans-block"><div class="ans-label">Levers that change the cost — and the trade-off of each</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.4fr;"><div>Lever</div><div>Effect and trade-off</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">Fewer or smaller chunks (lower k)</div><div>Cuts input tokens; risks missing the answer — verify with the evaluation set</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">Re-ranking before the prompt</div><div>Adds a small per-query cost but lets you send fewer, better chunks</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">Model tiering and routing</div><div>Send simple questions to a smaller model and hard ones to a larger one</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">Semantic and response caching</div><div>Repeated questions cost almost nothing; needs care so cached answers do not go stale</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">History trimming or summarisation</div><div>Stops input growing each turn</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">Cap max output tokens</div><div>Bounds the most expensive part of each call</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">Batch and off-peak embedding</div><div>Cheaper bulk ingestion; slower freshness</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.4fr;"><div class="dt-name">Budgets and metering per tenant or team</div><div>Makes cost visible and prevents a single user or bug from consuming the budget</div></div>
          </div></div>
          <div class="ans-block"><div class="ans-label">The estimation process</div>
          <div class="code-box">1  DEFINE the use case, users, queries per user per day, peak load, accuracy target
2  SIZE the corpus: documents, tokens, growth, update frequency
3  CHOOSE the architecture: chunking, retrieval, re-ranker, model tier, caching
4  BUILD a token budget per query, then price it
5  ADD infrastructure (search tier, hosting, monitoring) and people (build + improve)
6  RUN a pilot to MEASURE tokens per query, cache hit rate and answer quality
7  PRESENT low / expected / high scenarios and unit cost (per query, per user)
8  SET budgets, alerts and a review cadence before go-live</div></div>
          <div class="warn-box">⚠️ The biggest estimation mistake is a single precise number built on guessed token counts. Present a range with the assumptions behind it, validate it with a pilot, and never quote prices from memory — they change, so use the provider's current price list and pricing calculator.</div>
          <div class="tip-box">✅ Interview line: "I split the cost into build, run and improve. The run cost comes from a per-query token budget — system prompt, retrieved context, history and question for input, plus capped output — priced at current rates, multiplied by volume, plus the vector store tier, hosting and monitoring. I measure real tokens per query in a pilot, present low, expected and high scenarios as cost per query and per user, and then use caching, model tiering, fewer chunks and budgets to control it. I also include what people forget: re-embedding, evaluation runs, guardrail calls, logging and human review." Related page: AI and LLM Engineering → LLM Cost and Performance; see also Q5 on this page.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q13</div>
      <div class="qa-body">
        <div class="qa-question">How is application security handled for data in transit, in storage (secrets and keys) and at rest?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — classify the data, protect each state with the right control, and keep the keys separate from the data</div>
          <div class="qa-answer">"I start by classifying the data, because that decides how strong the controls must be. In transit, everything is encrypted: TLS 1.2 or higher on every external endpoint, MQTT over TLS with per-device certificates from the stations into IoT Hub, mutual TLS between services inside the cluster, and private endpoints so traffic to databases and storage never crosses the public internet. At rest, the data stores use platform encryption with AES-256, with customer-managed keys where compliance requires control, and highly sensitive fields get an extra layer of application-level envelope encryption. Secrets and keys never live in code or configuration: they sit in Key Vault, applications reach them through managed identities, and keys are rotated and protected with soft-delete and purge protection. Around that, identity-based access, network isolation, logging and policy checks make sure the controls stay in place and are provable."</div></div>
          <div class="warn-box">⚠️ Describe the controls you actually implemented. Your resume says secure and reliable, identity-scoped access and AI guardrails; the rest of this answer is the standard Azure pattern — claim only the parts you owned, and say "we used" or "I would" for the others.</div>

          <div class="ans-block"><div class="ans-label">Where each protection applies — the Battery Swapping platform end to end</div>
          <div class="lyr-wrap"><div class="lyr-box" style="max-width:640px;">
            <div class="lyr-card"><b>🔋 Battery stations</b><span>per-device X.509 certificate · secure element where available</span></div>
            <div class="lyr-down">↓ 🔒 MQTT over TLS, mutual authentication (device certificate)</div>
            <div class="lyr-card"><b>☁️ IoT Hub → Event Hub</b><span>TLS in transit · encrypted at rest · access by identity, not shared keys</span></div>
            <div class="lyr-down">↓ 🔒 TLS · managed identity</div>
            <div class="lyr-card"><b>⚡ Azure Functions</b><span>secrets from Key Vault through managed identity · private network integration</span></div>
            <div class="lyr-down">↓ 🔒 TLS · private endpoint</div>
            <div class="lyr-card"><b>⎈ AKS microservices</b><span>mutual TLS between services · network policies · workload identity</span></div>
            <div class="lyr-down">↓ 🔒 TLS enforced · private endpoints · no public access</div>
            <div class="lyr-grp hl"><b>Data stores — encrypted at rest</b>
              <div class="lyr-grid c3">
                <div class="lyr-mini"><b>PostgreSQL</b><span>AES-256 at rest · TLS required · encrypted backups</span></div>
                <div class="lyr-mini"><b>Redis</b><span>TLS only · no sensitive data kept longer than needed</span></div>
                <div class="lyr-mini"><b>Blob Storage</b><span>AES-256 at rest · private containers · secure transfer required</span></div>
              </div>
            </div>
            <div class="lyr-down">↕ keys and secrets</div>
            <div class="lyr-card hl"><b>🔑 Key Vault</b><span>secrets · keys · certificates · RBAC · soft delete and purge protection · private endpoint · access logging</span></div>
            <div class="lyr-down">in front of all of it</div>
            <div class="lyr-card"><b>🌐 Edge: Front Door / WAF → API Management</b><span>TLS termination with managed certificates · HSTS · JWT validation · rate limits</span></div>
          </div></div></div>

          <div class="ans-block"><div class="ans-label">1. Data in transit</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.2fr 1.4fr;"><div>Hop</div><div>Protection</div><div>Detail</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.4fr;"><div class="dt-name">Users and apps to the platform</div><div>HTTPS only with TLS 1.2 or higher (prefer 1.3); HTTP redirected; HSTS; old protocol versions and weak ciphers disabled</div><div>Front Door or API Management terminates TLS with managed, auto-renewed certificates</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.4fr;"><div class="dt-name">Stations to IoT Hub</div><div>MQTT, AMQP or HTTPS, all over TLS; per-device X.509 certificate so each device is mutually authenticated</div><div>Provision through the Device Provisioning Service; individually revoke a device; rotate certificates</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.4fr;"><div class="dt-name">Between services in AKS</div><div>Mutual TLS from a service mesh (for example Istio or Linkerd), so services prove who they are and traffic is encrypted inside the cluster; network policies limit who may talk to whom</div><div>Do not stop encryption at the gateway — plain HTTP behind the edge is a common gap</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.4fr;"><div class="dt-name">Services to PaaS (database, cache, storage, brokers)</div><div>TLS enforced on the service (database require-secure-transport, cache non-TLS port disabled, storage secure transfer required, minimum TLS version set); private endpoints so traffic stays on the private network</div><div>Client connection strings use certificate verification</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.4fr;"><div class="dt-name">Third parties (payment gateway, partners)</div><div>TLS, signed requests or webhooks (HMAC), IP allow-lists, mutual TLS where the partner supports it</div><div>Validate signatures before trusting a callback</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.4fr;"><div class="dt-name">Mobile app</div><div>TLS with certificate validation; optional certificate pinning for high-risk apps, with a rotation plan so pinning cannot lock users out</div><div>Short-lived tokens, never stored in plain text on the device</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.2fr 1.4fr;"><div class="dt-name">Highly sensitive payloads</div><div>Message-level encryption or signing on top of TLS, so the field stays protected even where intermediaries handle the message</div><div>Use only where the data justifies the extra complexity</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">2. Data at rest</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 1.9fr 1.9fr;"><div>Store</div><div>Default protection</div><div>Stronger option when required</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.9fr 1.9fr;"><div class="dt-name">PostgreSQL</div><div>Platform encryption at rest with AES-256, encrypted backups, TLS required</div><div>Customer-managed key in Key Vault; application-level field encryption for the most sensitive columns</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.9fr 1.9fr;"><div class="dt-name">Blob Storage</div><div>Service-side encryption with AES-256 on by default; private containers; no anonymous access</div><div>Customer-managed key; short-lived user-delegation SAS tokens; immutability for audit data</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.9fr 1.9fr;"><div class="dt-name">Event Hub / stream</div><div>Encrypted at rest by the platform; retention limited to what is needed</div><div>Customer-managed key where the tier supports it</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.9fr 1.9fr;"><div class="dt-name">Redis</div><div>Treat as a cache: short TTLs, no long-lived sensitive data; TLS only</div><div>Do not cache secrets or full personal data</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.9fr 1.9fr;"><div class="dt-name">AKS disks and node OS</div><div>Platform-managed disk encryption</div><div>Encryption at host; customer-managed disk encryption sets</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.9fr 1.9fr;"><div class="dt-name">Vector store (AI search)</div><div>Encrypted at rest; per-document access metadata so retrieval respects permissions</div><div>Customer-managed key; do not index data the user could not otherwise see</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.9fr 1.9fr;"><div class="dt-name">Backups and DR copies</div><div>Encrypted like the source; same access controls</div><div>Make sure the disaster-recovery region can also reach the keys</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.9fr 1.9fr;"><div class="dt-name">Logs and telemetry</div><div>Encrypted storage and restricted access</div><div>Do not write secrets or personal data into logs; mask at the source</div></div>
          </div>
          <div class="ans-block"><div class="ans-label">Beyond platform encryption</div>
          <ul>
            <li><strong>Data minimisation and classification</strong> — do not store what you do not need; mark personal, financial and operational data differently and apply retention rules.</li>
            <li><strong>Do not store card data</strong> — use payment-gateway tokens so the platform stays out of the heaviest compliance scope.</li>
            <li><strong>Field-level encryption</strong> for the most sensitive columns, using envelope encryption (below), so a database dump or an over-privileged administrator still sees ciphertext.</li>
            <li><strong>Passwords</strong> — if you ever store them, use a slow salted hash (Argon2, bcrypt or PBKDF2), never encryption; better, delegate to an identity provider such as Entra ID.</li>
          </ul></div></div>

          <div class="ans-block"><div class="ans-label">3. Storing secrets and keys</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.6fr;"><div>Control</div><div>How it works</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Key Vault for secrets, keys and certificates</div><div>One protected place with RBAC, audit logging, soft delete and purge protection, and a private endpoint; HSM-backed keys for the strictest cases</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Managed identities / workload identity</div><div>Services authenticate to Key Vault, databases and storage with an identity instead of a password, so there is no credential to leak or rotate by hand</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">No secrets in code, images or repositories</div><div>Secret scanning in CI; pipeline variables linked to Key Vault; secrets mounted into pods through the Secrets Store CSI driver rather than baked into images or long-lived environment variables</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Rotation</div><div>Automatic rotation for certificates and keys; short-lived tokens; rotation drills so a rotation never causes an outage</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Least privilege and separation of duties</div><div>People who administer the data stores cannot read the keys; applications get only the keys and secrets they use</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Recovery</div><div>Soft delete and purge protection plus backups of keys: losing a customer-managed key means losing the data it protects</div></div>
          </div>
          <div class="code-box">Envelope encryption — how field-level encryption uses Key Vault

   Key Vault holds the KEY ENCRYPTION KEY (KEK)   - never leaves the vault
        |  wraps / unwraps
        v
   a random DATA ENCRYPTION KEY (DEK) per record or per batch
        |  encrypts
        v
   the field value  (AES-GCM)

   Stored in the database:   ciphertext + nonce + tag + the WRAPPED DEK
   An attacker with a database dump has ciphertext and a wrapped key — useless without Key Vault access.
   Rotating the KEK only re-wraps the DEKs; the data does not have to be re-encrypted.</div></div>

          <div class="ans-block"><div class="ans-label">In code — the main pieces in ASP.NET Core</div>
          <div class="code-box">// Program.cs — TLS, HSTS and secrets from Key Vault through the managed identity
builder.WebHost.ConfigureKestrel(k =&gt; k.ConfigureHttpsDefaults(o =&gt;
    o.SslProtocols = System.Security.Authentication.SslProtocols.Tls12
                   | System.Security.Authentication.SslProtocols.Tls13));

builder.Configuration.AddAzureKeyVault(
    new Uri(builder.Configuration["KeyVault:Uri"]!),
    new DefaultAzureCredential());              // managed identity in Azure, developer login locally

var app = builder.Build();
app.UseHsts();                                  // tell browsers to use HTTPS only
app.UseHttpsRedirection();

// Connection strings — encrypted and verified in transit
//   PostgreSQL:  "Host=...;SSL Mode=VerifyFull;Trust Server Certificate=false"
//   Redis:       "...:6380,ssl=true,abortConnect=false"     (non-TLS port disabled on the service)</div>
          <div class="code-box">// Field-level envelope encryption (sketch)
public async Task&lt;EncryptedField&gt; EncryptAsync(string plaintext)
{
    var dek = RandomNumberGenerator.GetBytes(32);                  // new data key
    var nonce = RandomNumberGenerator.GetBytes(12);
    var data = Encoding.UTF8.GetBytes(plaintext);
    var cipher = new byte[data.Length];
    var tag = new byte[16];

    using (var aes = new AesGcm(dek, 16))
        aes.Encrypt(nonce, data, cipher, tag);                     // authenticated encryption

    var wrapped = await _keyClient.WrapKeyAsync(                   // KEK stays inside Key Vault
        KeyWrapAlgorithm.RsaOaep256, dek);

    CryptographicOperations.ZeroMemory(dek);                       // do not keep the plain key in memory
    return new EncryptedField(cipher, nonce, tag, wrapped.EncryptedKey, wrapped.KeyId);
}
// Decrypt: UnwrapKeyAsync(wrappedKey) -&gt; AesGcm.Decrypt(nonce, cipher, tag, plain)</div></div>

          <div class="ans-block"><div class="ans-label">What protects the data besides encryption</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.5fr;"><div>Layer</div><div>Control</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Identity and access</div><div>Entra ID with OAuth 2.0 / OpenID Connect; JWT validated at API Management; role-based and attribute-based access; least privilege; just-in-time admin access; for the AI layer, identity-scoped retrieval so users only get what they may see</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Network</div><div>Private endpoints for databases, storage and Key Vault; no public database access; network security groups, firewall and WAF; segmentation between environments</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Application</div><div>Input validation, parameterised queries, output encoding, rate limiting, secure session handling; threat modelling (for example STRIDE) in design</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">DevSecOps</div><div>Static analysis, dependency and container scanning, secret scanning, infrastructure-as-code scanning, signed images, security gates in the pipeline</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Monitoring and audit</div><div>Key Vault and data-access logs, Defender for Cloud, central logging and alerts on unusual access, an audit trail for sensitive operations</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Policy as code</div><div>Azure Policy that denies storage without secure transfer, databases without TLS, and public endpoints — so the controls cannot quietly be switched off</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Governance and compliance</div><div>Data classification, retention, residency per region, regular reviews and penetration tests, alignment with the standards the client needs (for example ISO 27001, SOC 2, GDPR)</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Common mistakes to call out</div>
          <ul>
            <li><strong>Encryption stops at the gateway</strong> — TLS to the edge, then plain HTTP inside the network.</li>
            <li><strong>Treating encryption at rest as access control</strong> — platform encryption protects stolen disks; it does not stop a compromised application identity from reading the data. Combine it with least privilege and field-level encryption for the crown jewels.</li>
            <li><strong>Secrets in environment variables, images or repositories</strong> — use Key Vault and managed identity.</li>
            <li><strong>Customer-managed keys without a recovery plan</strong> — without soft delete, purge protection and backups, a deleted key means permanently unreadable data.</li>
            <li><strong>Certificate expiry outages</strong> — automate renewal and alert well before expiry.</li>
            <li><strong>Sensitive data in logs, caches or AI prompts</strong> — mask at the source, and keep PII out of prompts and vector indexes unless access is scoped.</li>
          </ul></div>

          <div class="tip-box">✅ Interview line: "I protect each state of the data separately. In transit: TLS 1.2 or higher at the edge, per-device certificates and TLS from the stations, mutual TLS between services and private endpoints to the data stores. At rest: AES-256 platform encryption on every store with customer-managed keys where required, plus envelope-encrypted fields for the most sensitive data. For secrets and keys: Key Vault with managed identities, no credentials in code, rotation, and soft delete with purge protection. Then identity, network isolation, monitoring and policy-as-code keep those controls in place and provable." Related pages: Azure Security, Security Deep Dive, CTS (Key Vault, private endpoints, Workload Identity).</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q14</div>
      <div class="qa-body">
        <div class="qa-question">What integrations were done with the current system?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">How to answer — group the integrations by pattern, then say how each was made reliable and secure</div>
          <div class="qa-answer">"The platform integrates in a few distinct ways. Inbound, the swapping stations stream battery and station telemetry into Azure IoT Hub and then Event Hub, where Azure Functions process it before it reaches the microservices on AKS. Between our own services we use APIs behind a gateway plus asynchronous events. Outbound, the platform integrates with [payment provider] for automated multi-currency billing and payments, with [notification channels] for alerts, and feeds analytics and reporting. On the AI side, the assistant integrates with enterprise systems through MCP tools under identity-scoped access. For each integration I defined the contract, the protocol, how failures are handled — retries, idempotency, dead-letter queues — and how it is secured and monitored."</div></div>
          <div class="warn-box">⚠️ Fill the bracketed names from your own experience. Your resume backs: IoT integration with the stations, automated billing and payments, alerts and notifications, analytics and reporting, and MCP-based enterprise tool integration. It does not name specific third-party products for this project, so do not add names you did not integrate. If asked about a system you did not connect (for example an ERP or a utility grid), say how you would do it.</div>

          <div class="ans-block"><div class="ans-label">The integration landscape</div>
          <div class="lyr-wrap"><div class="lyr-box" style="max-width:660px;">
            <div class="lyr-card hl"><b>Battery Swapping and Energy Management Platform</b><span>event-driven microservices on AKS · API gateway in front · PostgreSQL, Redis, Blob</span></div>
            <div class="lyr-down">↕ integrated with</div>
            <div class="lyr-grid c3">
              <div class="lyr-mini"><b>📡 Battery stations</b><span>telemetry in · MQTT over TLS to IoT Hub, then Event Hub</span></div>
              <div class="lyr-mini"><b>🧩 Internal services</b><span>REST through the gateway plus asynchronous events</span></div>
              <div class="lyr-mini"><b>💳 Billing and payments</b><span>REST and webhooks · multi-currency</span></div>
              <div class="lyr-mini"><b>🔔 Alerts and notifications</b><span>outbound channels · retry and de-duplication</span></div>
              <div class="lyr-mini"><b>📊 Analytics and reporting</b><span>stream and batch feed to the analytics store</span></div>
              <div class="lyr-mini"><b>🤖 AI assistant to enterprise tools</b><span>MCP · identity-scoped · guardrails</span></div>
            </div>
            <div class="lyr-down">to confirm from your own experience</div>
            <div class="lyr-card"><b>ERP / finance · mapping · utility or grid · CRM · single sign-on</b><span>list only the ones you actually integrated</span></div>
          </div></div></div>

          <div class="ans-block"><div class="ans-label">Each integration — direction, pattern, protection</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.4fr 1.5fr 1.7fr 0.9fr;"><div>Integration</div><div>Direction and pattern</div><div>Protocol</div><div>Reliability and security</div><div>On your resume?</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr 1.7fr 0.9fr;"><div class="dt-name">Battery stations (IoT)</div><div>Inbound; device-to-cloud streaming</div><div>MQTT or AMQP over TLS to IoT Hub, then Event Hub, Functions, AKS</div><div>Per-device certificate; device buffering and retry; partitioned stream; idempotent processing</div><div class="dt-yes">Yes</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr 1.7fr 0.9fr;"><div class="dt-name">Internal microservices</div><div>Synchronous request-response plus asynchronous events</div><div>REST through the gateway; events on the broker</div><div>OAuth 2.0 / JWT at the gateway; timeouts and retries; dead-letter queues; versioned contracts</div><div>Confirm</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr 1.7fr 0.9fr;"><div class="dt-name">Billing and payments</div><div>Outbound calls; inbound callbacks</div><div>REST and signed webhooks</div><div>Idempotency keys; signature checks; reconciliation; multi-currency rules; no card data stored</div><div class="dt-yes">Capability yes — provider name: confirm</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr 1.7fr 0.9fr;"><div class="dt-name">Alerts and notifications</div><div>Outbound, event-triggered</div><div>Push, SMS or email provider APIs</div><div>Retry with backoff; de-duplication; drop stale alerts</div><div class="dt-yes">Capability yes — channels: confirm</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr 1.7fr 0.9fr;"><div class="dt-name">Analytics and reporting</div><div>Outbound data feed</div><div>Stream or batch export</div><div>Schema contract; replay from the stream; access control on reports</div><div class="dt-yes">Capability yes</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr 1.7fr 0.9fr;"><div class="dt-name">AI assistant to enterprise systems</div><div>Tool calls from the assistant</div><div>MCP tools, authenticated per user</div><div>Identity-scoped access; bounded loop; approval for state-changing actions; audit log</div><div class="dt-yes">Yes</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr 1.7fr 0.9fr;"><div class="dt-name">Identity / single sign-on</div><div>Authentication of users and services</div><div>OAuth 2.0 / OpenID Connect</div><div>Token validation at the gateway; managed identities between services</div><div>Confirm</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.4fr 1.5fr 1.7fr 0.9fr;"><div class="dt-name">ERP, CRM, grid, mapping</div><div>Depends on the system</div><div>Depends on the system</div><div>Only if you built them</div><div class="dt-no">Do not claim unless true</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Integration patterns and when each fits</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.5fr;"><div>Pattern</div><div>Use it for</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Streaming ingestion</div><div>High-volume device telemetry that must not block the sender (stations into IoT Hub and Event Hub)</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Asynchronous events</div><div>Letting services react to changes without being coupled — a swap completed, a battery state changed</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Request-response through an API gateway</div><div>Queries and commands that need an immediate answer, with central authentication, limits and versioning</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Webhooks and callbacks</div><div>Partners telling you something happened (payment succeeded) — verify the signature and make handling idempotent</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Batch and file exchange</div><div>Reconciliation, bulk exports and legacy systems that cannot do APIs</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Anti-corruption layer</div><div>Translating a partner's model into yours so their changes do not leak into the domain</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.5fr;"><div class="dt-name">Outbox and saga</div><div>Keeping a database change and an event consistent, and coordinating a multi-step process such as swap, charge and invoice, with compensation</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">What makes an integration production-ready</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.6fr;"><div>Concern</div><div>Practice</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Contracts</div><div>OpenAPI for REST and a schema for events, versioned; consumer-driven contract tests so a change cannot silently break a partner</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Idempotency</div><div>Idempotency keys on calls and event ids on messages, so retries and duplicates never double-charge or double-process</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Failure handling</div><div>Timeouts, retries with backoff and jitter, circuit breakers, dead-letter queues and replay</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Consistency</div><div>Outbox for events after a database write; reconciliation jobs for money; sagas with compensation for multi-step flows</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Security</div><div>OAuth 2.0 or mutual TLS, secrets in Key Vault, signed webhooks, least privilege, IP allow-lists where useful</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Rate limits and quotas</div><div>Respect the partner's limits and protect your own with throttling at the gateway</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Observability</div><div>Correlation ids across systems, per-integration dashboards, alerts on error rate and latency, agreed service levels</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Testing</div><div>Sandbox environments, mock servers for partner APIs, contract and end-to-end tests, failure-injection tests</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Ownership</div><div>A named owner and a runbook for each integration, and a documented fallback when a partner is down</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">In code — a resilient, idempotent payment call and a signed webhook</div>
          <div class="code-box">// Outbound: resilience handler (retry, circuit breaker, timeouts) plus an idempotency key
builder.Services.AddHttpClient&lt;IPaymentGatewayClient, PaymentGatewayClient&gt;(c =&gt;
{
    c.BaseAddress = new Uri(builder.Configuration["Payments:BaseUrl"]!);
})
.AddStandardResilienceHandler();                    // Microsoft.Extensions.Http.Resilience

public async Task&lt;ChargeResult&gt; ChargeAsync(ChargeRequest r, CancellationToken ct)
{
    using var msg = new HttpRequestMessage(HttpMethod.Post, "charges") { Content = JsonContent.Create(r) };
    msg.Headers.Add("Idempotency-Key", r.SwapId.ToString());   // a retried call cannot charge twice
    using var resp = await _http.SendAsync(msg, ct);
    resp.EnsureSuccessStatusCode();
    return (await resp.Content.ReadFromJsonAsync&lt;ChargeResult&gt;(cancellationToken: ct))!;
}</div>
          <div class="code-box">// Inbound: verify the signature, then process each event id only once
app.MapPost("/webhooks/payments", async (HttpRequest req, IProcessedEvents seen, IConfiguration cfg) =&gt;
{
    var body = await new StreamReader(req.Body).ReadToEndAsync();
    var secret = Encoding.UTF8.GetBytes(cfg["Payments:WebhookSecret"]!);          // from Key Vault
    var expected = Convert.ToHexString(HMACSHA256.HashData(secret, Encoding.UTF8.GetBytes(body))).ToLowerInvariant();
    var received = req.Headers["X-Signature"].ToString().ToLowerInvariant();

    if (!CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(expected), Encoding.UTF8.GetBytes(received)))
        return Results.Unauthorized();                                              // not from the provider

    var evt = JsonSerializer.Deserialize&lt;PaymentEvent&gt;(body)!;
    if (!await seen.TryMarkAsync(evt.EventId)) return Results.Ok();                // duplicate: already handled

    await HandleAsync(evt);
    return Results.Ok();
});</div>
          <div class="code-box">// An event contract between services — small, versioned, with a unique id
{ "eventId": "5f0c...e1", "type": "BatterySwapCompleted", "version": 1,
  "occurredAt": "2026-10-14T09:15:04Z",
  "stationId": "ST-102", "batteryId": "B-778", "swapId": "..." }</div></div>

          <div class="ans-block"><div class="ans-label">Follow-up questions to prepare for</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.4fr 2.4fr;"><div>Question</div><div>Answer in one line</div></div>
            <div class="dt-row" style="grid-template-columns:1.4fr 2.4fr;"><div class="dt-name">What if the third party is down?</div><div>Circuit breaker, queue the request durably, retry later, show the user a pending state, and reconcile when it returns.</div></div>
            <div class="dt-row" style="grid-template-columns:1.4fr 2.4fr;"><div class="dt-name">How do you avoid double processing?</div><div>Idempotency keys on calls and event ids on messages, with an idempotent consumer that records what it has handled.</div></div>
            <div class="dt-row" style="grid-template-columns:1.4fr 2.4fr;"><div class="dt-name">How do you change an interface safely?</div><div>Versioned contracts, backward-compatible changes first, consumer-driven contract tests, and a deprecation period.</div></div>
            <div class="dt-row" style="grid-template-columns:1.4fr 2.4fr;"><div class="dt-name">Synchronous or asynchronous — how do you choose?</div><div>Synchronous when the caller needs the answer now; asynchronous when the work can complete later or many services react to one change.</div></div>
            <div class="dt-row" style="grid-template-columns:1.4fr 2.4fr;"><div class="dt-name">How do you keep money data correct across systems?</div><div>Idempotent calls, an outbox for events, saga-style compensation, and a scheduled reconciliation against the provider's records.</div></div>
            <div class="dt-row" style="grid-template-columns:1.4fr 2.4fr;"><div class="dt-name">How do you secure partner traffic?</div><div>TLS or mutual TLS, OAuth 2.0 or signed requests, secrets in Key Vault, least privilege, and IP allow-lists where they help.</div></div>
          </div></div>

          <div class="tip-box">✅ Interview line: "I describe integrations by pattern. Stations stream telemetry into IoT Hub and Event Hub; our own services talk through the gateway and asynchronous events; billing and payments, notifications and analytics are outbound integrations with defined contracts; and the AI assistant reaches enterprise systems through MCP under identity-scoped access. For every one of them I define the contract, make calls idempotent, handle failure with retries, circuit breakers and dead-letter queues, secure it, and monitor it with a named owner and a fallback." Related pages: Event-Driven and Messaging, Choreography vs Orchestration, and Solera Q9 (platform architecture).</div>
        </div>
      </div>
    </div>

  </div>
`;
