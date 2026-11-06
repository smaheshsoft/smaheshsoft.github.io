window.Pages = window.Pages || {};
window.Pages['epam2'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>EPAM – Round 2</span></div>
    <h1>🎓 EPAM — Round 2: DevOps, Release, and the University Online Learning Platform Case Study</h1>
    <p>DevOps CI/CD role · release process · requirements clarification and system design · subscription model · offline-to-online migration pipeline · delivery approach and one-year plan · ROI · APIs · choosing a model · AI in the SDLC · common architect issues · event-driven result preparation · modular monolith versus microservices · initial offline-to-online data load · evaluating technology and design choices</p>
  </div>
  <div class="stats-bar" style="margin-bottom:20px;">
    <div class="stat-box"><div class="num">16</div><div class="label">Questions</div></div>
    <div class="stat-box"><div class="num">1</div><div class="label">Design Case Study</div></div>
  </div>
  <div class="alert" style="margin-bottom:16px;">
    <strong>🎯 What this round tests</strong>
    <p>It combines delivery credibility (your DevOps and release role) with a solution-architect case study where the interviewers are the stakeholders. The expected behaviour is to ask clarifying questions first, state assumptions out loud, identify the architecturally significant requirements, and only then sketch the architecture. For the experience questions, use only claims on your resume: Azure DevOps, GitHub, Docker, Kubernetes and Terraform; CI/CD standards that sped up delivery by 50% across teams; and an Agile and DevOps transformation that cut release cycles from 6 weeks to 2 weeks.</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">What is your role in DevOps and CI/CD contribution?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — as the architect I set the standards and the target pipeline, enable the teams, and measure the result; the platform and DevOps engineers build and run it with me</div>
          <div class="qa-answer">"I treat delivery as part of the architecture. I established CI/CD standards and DevOps automation across teams — reusable pipeline templates in Azure DevOps and GitHub, containerisation with Docker, deployment to Kubernetes, and infrastructure as code with Terraform — which sped up delivery by about 50% across the teams. Earlier, I led an Agile and DevOps transformation for a 20-member engineering organisation that cut release cycles from six weeks to two. My contribution is the design of the pipeline and quality gates, the environment and release strategy, the security and cost controls inside it, and then coaching teams to adopt it and tracking delivery metrics."</div></div>

          <div class="ans-block"><div class="ans-label">The pipeline I would describe</div>
          <div class="flow-box">
            <div class="flow-step">Commit / pull request</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Build + unit tests</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Static analysis + dependency and secret scan</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Container image + image scan</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step blue">Deploy to test, integration and security tests</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step green">Promote to staging, then production (approval, progressive rollout)</div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">Monitor, alert, learn</div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Where an architect contributes — and where the DevOps team leads</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.3fr 1.2fr;"><div>Area</div><div>Architect's contribution</div><div>Resume-backed?</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.3fr 1.2fr;"><div class="dt-name">CI/CD standards</div><div>Pipeline templates, stage definitions, quality gates, branching strategy, definition of done including non-functional checks</div><div class="dt-yes">Yes — standards and automation across teams</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.3fr 1.2fr;"><div class="dt-name">Tooling</div><div>Azure DevOps and GitHub pipelines, Docker, Kubernetes</div><div class="dt-yes">Yes — listed skills</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.3fr 1.2fr;"><div class="dt-name">Infrastructure as code</div><div>Terraform modules for environments so they are repeatable and reviewed like code</div><div class="dt-yes">Yes — Terraform listed</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.3fr 1.2fr;"><div class="dt-name">Environment and release strategy</div><div>Environment ladder, promotion rules, progressive delivery, database migration approach, rollback</div><div>Describe what you used</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.3fr 1.2fr;"><div class="dt-name">Security in the pipeline (DevSecOps)</div><div>Static analysis, dependency and container scanning, secret scanning, signed images, least-privilege deployment identities</div><div>Describe what you used</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.3fr 1.2fr;"><div class="dt-name">Observability and cost</div><div>Logs, metrics and traces designed in; deployment and cost dashboards; FinOps tagging and budgets</div><div>Describe what you used</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.3fr 1.2fr;"><div class="dt-name">Enabling teams</div><div>Documentation, templates, coaching, architecture conformance checks, reviews</div><div class="dt-yes">Yes — transformation led</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.3fr 1.2fr;"><div class="dt-name">Measuring delivery</div><div>Deployment frequency, lead time for changes, change failure rate, time to restore (the DORA metrics)</div><div>Describe what you tracked</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">A representative pipeline definition (Azure DevOps style)</div>
          <div class="code-box">trigger: [ main ]
stages:
- stage: CI
  jobs:
  - job: build_test
    steps:
    - script: dotnet restore &amp;&amp; dotnet build --no-restore -c Release
    - script: dotnet test --no-build -c Release --collect "XPlat Code Coverage"
    - script: trivy fs --exit-code 1 --severity HIGH,CRITICAL .        # dependency and secret scan
    - script: docker build -t $(registry)/app:$(Build.BuildId) .
    - script: trivy image --exit-code 1 --severity HIGH,CRITICAL $(registry)/app:$(Build.BuildId)
    - script: docker push $(registry)/app:$(Build.BuildId)
- stage: Test
  dependsOn: CI
  jobs: [ deploy_to_test_then_run_integration_and_security_tests ]
- stage: Prod
  dependsOn: Test
  condition: succeeded()
  jobs:
  - deployment: release                  # uses an environment with a manual approval check
    environment: production
    strategy: { runOnce: { deploy: { steps: [ { script: ./deploy.sh canary } ] } } }</div></div>

          <div class="ans-block"><div class="ans-label">Principles I apply</div>
          <ul>
            <li><strong>Build once, promote the same artifact</strong> through every environment — never rebuild for production.</li>
            <li><strong>Everything as code</strong> — pipelines, infrastructure and configuration are versioned and reviewed.</li>
            <li><strong>Shift security and quality left</strong> — fail fast in the pull request, not in production.</li>
            <li><strong>Small, frequent changes</strong> — they are easier to test, release and roll back.</li>
            <li><strong>Measure and improve</strong> — treat the DORA metrics as the scoreboard for the delivery system.</li>
          </ul></div>
          <div class="warn-box">⚠️ Do not claim to have personally operated every pipeline. Say you designed the standards, built or reviewed the templates, and worked with the DevOps or platform engineers. Quote only the two figures on your resume (about 50% faster delivery; release cycles from 6 weeks to 2 weeks) and say which project each came from.</div>
          <div class="tip-box">✅ Related pages: CI/CD and DevSecOps, Deployment Strategies (Blue-Green and Canary), IaC with Terraform, and the Agentic SDLC page.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">What kind of release process do you follow?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — trunk-based development, an automated pipeline that builds once and promotes through environments, progressive delivery with feature flags, and rollback built in</div></div>

          <div class="ans-block"><div class="ans-label">The release flow</div>
          <div class="code-box">1  Short-lived branches off main; every change goes through a pull request
      checks: build, unit tests, static analysis, security scan, review approvals
2  Merge to main  -&gt; the pipeline builds ONE versioned artifact (container image)
3  Deploy automatically to  DEV  -&gt; automated smoke tests
4  Promote to  TEST / QA      -&gt; integration, contract and regression tests
5  Promote to  STAGING        -&gt; production-like: performance and security tests, UAT
6  Change approval            -&gt; automatic for low risk; manual gate for high-risk changes
7  Release to  PRODUCTION     -&gt; progressive: canary or blue-green, behind a feature flag
8  Post-release verification  -&gt; health checks, error rate, latency, business KPIs
9  Auto-rollback or roll forward if a threshold is breached
10 Release notes, change record, and a short retrospective</div></div>

          <div class="ans-block"><div class="ans-label">Environments and gates</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 1.8fr 1.8fr;"><div>Environment</div><div>Purpose</div><div>Gate to leave it</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.8fr 1.8fr;"><div class="dt-name">Dev</div><div>Fast feedback for developers</div><div>Build and unit tests pass; smoke tests pass</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.8fr 1.8fr;"><div class="dt-name">Test / QA</div><div>Integration and regression testing</div><div>Integration, contract and regression suites pass</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.8fr 1.8fr;"><div class="dt-name">Staging</div><div>Production-like rehearsal</div><div>Performance and security tests pass; UAT sign-off; the deployment itself is rehearsed</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.8fr 1.8fr;"><div class="dt-name">Production</div><div>Live service</div><div>Progressive rollout with automatic checks; approval for high-risk change</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Deployment strategies — and when I use each</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2fr 1.5fr;"><div>Strategy</div><div>How it works</div><div>Best for</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2fr 1.5fr;"><div class="dt-name">Rolling</div><div>Replace instances gradually</div><div>Low-risk, backward-compatible changes</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2fr 1.5fr;"><div class="dt-name">Blue-green</div><div>Run old and new side by side, switch traffic at once, keep the old for instant rollback</div><div>Changes needing a clean, fast switch</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2fr 1.5fr;"><div class="dt-name">Canary</div><div>Send a small share of traffic to the new version, watch the metrics, then increase</div><div>Risky or high-traffic changes</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2fr 1.5fr;"><div class="dt-name">Feature flags</div><div>Deploy code switched off; turn it on for chosen users</div><div>Separating deployment from release; dark launches</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">The details that make releases safe</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Concern</div><div>Practice</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Database changes</div><div>Expand-then-contract migrations so old and new versions run together; migrations run as part of the pipeline and are reversible or forward-fixable</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Rollback</div><div>Keep the previous artifact ready; automatic rollback on error-rate or latency thresholds; flags allow an instant off switch</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Hotfixes</div><div>The same pipeline with a shortened path — never a manual change to production</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Change management</div><div>Pipeline records each deployment as the audit trail; risk-based approval instead of a blanket committee</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Release cadence</div><div>On demand for most services; a regular train for tightly coupled releases. Shorter cycles lower risk per release</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Communication</div><div>Release notes, a status channel, support briefed, and a post-release review</div></div>
          </div></div>
          <div class="warn-box">⚠️ Describe the release process you actually used. The resume supports a release-cycle reduction from six weeks to two weeks on a 20-member organisation, so anchor the answer in that and add the practices you really applied.</div>
          <div class="tip-box">✅ Interview line: "Trunk-based development with pull-request gates, one artifact built once and promoted through dev, test and staging, then a progressive production rollout — canary or blue-green behind feature flags — with automatic rollback on health thresholds and expand-then-contract database changes. It turned six-week release cycles into two-week ones."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">Design the online learning platform for National University of city X — offline lab materials (videos, articles, ebooks) become an online portal for internal and external students, with automated grading, cost-efficiently. As Solution Architect, ask the stakeholders clarifying questions, identify the architecturally significant requirements and sketch the target architecture.</div>
        <div class="qa-answer">

          <div class="ans-block"><div class="ans-label">Step 1 — Restate the problem and the goal</div>
          <div class="code-box">TODAY:  lab-only access for the university's own students (about 5k users)
          video lectures, articles and ebooks available in the lab
GOAL:   a global online platform for internal AND external (paying) students
          - high-quality videos, articles and books online
          - automated grading of solutions to course problems
          - web and mobile
          - up to ~150k users, growing about 25% per year (confirm what the figures mean)
          - cost-efficient to build and run</div>
          <div class="warn-box">⚠️ The figures "5k users, 150k, 25% every year" are ambiguous. State your interpretation and ask: is 150k the launch target or the end state, and is the 25% growth per year on top of it? Below I assume 150k users at maturity with 25% annual growth afterwards, and design for headroom either way.</div></div>

          <div class="ans-block"><div class="ans-label">Step 2 — Questions to ask the stakeholders (the interviewers)</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.8fr;"><div>Area</div><div>Questions</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Users and scale</div><div>What do 5k and 150k mean — registered or active users? Peak concurrent users? When must we reach the target? Which countries and languages? Typical sessions at deadlines and exams?</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Content</div><div>How much video, how many articles and ebooks? What formats? Who owns the rights, and do licences allow online distribution (especially ebooks)? Will new content be created continuously? Captions and translations needed?</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Auto-grading</div><div>Which programming languages? Types of problems (algorithmic, projects, SQL)? Time and memory limits? Is grading final or reviewed by faculty? Plagiarism detection? Feedback expected — pass or fail, or hints?</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Business model</div><div>Free for university students and paid for external ones? Pricing, free tier, certificates, regions and currencies, taxes, refunds?</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Integration</div><div>Existing student information system, learning management system, single sign-on, library system? Do we need to follow learning-tool interoperability standards?</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Security and compliance</div><div>Student-data privacy laws, minors, data residency, accessibility standards, exam integrity and proctoring?</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Experience</div><div>Native mobile apps or a responsive web app first? Offline downloads for mobile? Accessibility needs?</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Operations</div><div>Availability expected, support model, who runs it after launch, existing IT staff and skills, existing cloud contracts?</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Constraints</div><div>Budget, timeline, preferred cloud, procurement rules, reuse of existing lab hardware or software?</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Step 3 — Architecturally significant requirements and drivers</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.8fr 1.7fr;"><div>Driver</div><div>Requirement (targets to confirm)</div><div>Architectural consequence</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.7fr;"><div class="dt-name">Elastic scale and spikes</div><div>Steady growth plus sharp peaks at deadlines and exam periods</div><div>Stateless services, autoscaling, queue-based grading, CDN</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.7fr;"><div class="dt-name">Global video delivery</div><div>Smooth playback worldwide on varied networks</div><div>Adaptive-bitrate streaming, CDN, multiple renditions</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.7fr;"><div class="dt-name">Secure execution of untrusted code</div><div>Students submit arbitrary programs</div><div>Isolated sandboxes with strict resource limits and no network</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.7fr;"><div class="dt-name">Cost efficiency</div><div>Cost per active student kept low and predictable</div><div>Serverless and spot capacity, storage tiering, CDN offload, modular monolith first</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.7fr;"><div class="dt-name">Two audiences</div><div>University students (verified) and external subscribers</div><div>Federated sign-in plus public sign-up; entitlement service for access</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.7fr;"><div class="dt-name">Content rights</div><div>Protect licensed ebooks and videos</div><div>Signed short-lived URLs, DRM or licence controls, audit</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.7fr;"><div class="dt-name">Privacy and accessibility</div><div>Student data protected; usable by everyone</div><div>Data minimisation, encryption, regional storage if required; accessible UI and captions</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.7fr;"><div class="dt-name">Availability</div><div>Reliable especially in term time and at deadlines</div><div>Multi-zone deployment, graceful degradation, no single point of failure</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.7fr;"><div class="dt-name">Evolvability</div><div>New courses, features and markets over time</div><div>Modular design with clear boundaries, API-first, interoperability standards</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Step 4 — Sizing (illustrative arithmetic on stated assumptions — confirm with the stakeholders)</div>
          <div class="code-box">Users:        150,000 registered; growth 25% per year afterwards
                year 1: 187,500    year 2: 234,375    year 3: ~292,969    -&gt; design for 2-3x headroom
Concurrency:  assume 10% of users online at peak  = 15,000 concurrent
API load:     15,000 users x one request per 10 s  = ~1,500 requests/s   (mostly cacheable reads)
Video:        15,000 viewers x ~2.5 Mbps average   = ~37.5 Gbps peak egress
                -&gt; this MUST be served from a CDN, not from the origin
Grading:      assume 20% of 150,000 submit in the deadline hour = 30,000 / 3,600 = ~8.3 per second
                at ~20 s per run -&gt; 8.3 x 20 = ~167 sandboxes running at once -&gt; autoscaled workers on a queue
Storage:      library size (hours of video x renditions + articles + ebooks) — ask for the real inventory</div>
          <div class="tip-box">✅ The shape matters more than the numbers: video bandwidth dominates and belongs on a CDN; grading is bursty and belongs on a queue with autoscaled workers; the API is read-heavy and cacheable.</div></div>

          <div class="ans-block"><div class="ans-label">Step 5 — The target architecture</div>
          <div class="lyr-wrap"><div class="lyr-box" style="max-width:700px;">
            <div class="lyr-grid c3">
              <div class="lyr-mini"><b>🌐 Web app</b><span>responsive, accessible, PWA</span></div>
              <div class="lyr-mini"><b>📱 Mobile app</b><span>iOS and Android, downloads</span></div>
              <div class="lyr-mini"><b>🛠️ Admin / content portal</b><span>faculty and staff</span></div>
            </div>
            <div class="lyr-down">↓</div>
            <div class="lyr-card"><b>Edge</b><span>CDN (video, static content) · WAF · API gateway — TLS, rate limits, authentication</span></div>
            <div class="lyr-down">↓</div>
            <div class="lyr-two" style="gap:12px;">
              <div class="lyr-card"><b>🔐 Identity</b><span>campus single sign-on for students · public sign-up for external users · roles and entitlements in tokens</span></div>
              <div class="lyr-card"><b>🔗 Integrations</b><span>student information system · payment gateway · email and SMS · learning-tool interoperability (LTI)</span></div>
            </div>
            <div class="lyr-down">↓</div>
            <div class="lyr-grp"><b>Application services (modular — start as a modular monolith, split where needed)</b>
              <div class="lyr-grid c3">
                <div class="lyr-mini"><b>Catalogue and content</b><span>courses, materials, metadata</span></div>
                <div class="lyr-mini"><b>Enrolment and entitlements</b><span>who may access what</span></div>
                <div class="lyr-mini"><b>Learning progress</b><span>completion, bookmarks, history</span></div>
                <div class="lyr-mini"><b>Assessment and grading</b><span>submissions, results, feedback</span></div>
                <div class="lyr-mini"><b>Subscription and billing</b><span>plans, payments, invoices</span></div>
                <div class="lyr-mini"><b>Search</b><span>courses and content</span></div>
                <div class="lyr-mini"><b>Notifications</b><span>email, push, in-app</span></div>
                <div class="lyr-mini"><b>Analytics and reporting</b><span>learning and business metrics</span></div>
                <div class="lyr-mini"><b>Support / moderation</b><span>forums, help, reports</span></div>
              </div>
            </div>
            <div class="lyr-down">↓ events and queues</div>
            <div class="lyr-two" style="gap:12px;">
              <div class="lyr-grp"><b>Grading workers</b><div class="lyr-grid c2"><div class="lyr-mini"><b>Queue</b><span>submissions</span></div><div class="lyr-mini"><b>Sandboxed runners</b><span>autoscaled on queue depth</span></div></div></div>
              <div class="lyr-grp"><b>Media pipeline</b><div class="lyr-grid c2"><div class="lyr-mini"><b>Transcode</b><span>adaptive-bitrate renditions</span></div><div class="lyr-mini"><b>Captions</b><span>speech-to-text, thumbnails</span></div></div></div>
            </div>
            <div class="lyr-down">↓</div>
            <div class="lyr-grp hl"><b>Data</b>
              <div class="lyr-grid c3">
                <div class="lyr-mini"><b>PostgreSQL</b><span>users, courses, enrolments, grades</span></div>
                <div class="lyr-mini"><b>Object storage</b><span>videos, ebooks, articles, submissions</span></div>
                <div class="lyr-mini"><b>Redis</b><span>cache, sessions, rate limits</span></div>
                <div class="lyr-mini"><b>Search index</b><span>content discovery</span></div>
                <div class="lyr-mini"><b>Data warehouse</b><span>analytics, ROI reporting</span></div>
                <div class="lyr-mini"><b>Secrets and keys</b><span>vault, per-purpose keys</span></div>
              </div>
            </div>
          </div></div></div>

          <div class="ans-block"><div class="ans-label">Automated grading — the design that matters most</div>
          <div class="code-box">Student submits code
   |  POST /assignments/{id}/submissions   -&gt; 202 Accepted + submission id
   v
API stores the source in object storage, writes a row (status = Queued), puts a message on the queue
   v
Grader worker picks it up (autoscaled on queue length)
   v
SANDBOX  (one fresh, disposable container or micro-VM per run)
   - no network access        - read-only file system except a temp folder
   - CPU, memory, process and time limits      - non-root user, restricted system calls
   - runs the hidden and visible test cases against the submission
   v
Results: pass or fail per test, score, runtime, memory, feedback
   v
Store the result, update progress and the grade, notify the student (push, email or in-app)

Poll or push for the result; the student never waits on an open request.</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.6fr;"><div>Concern</div><div>Approach</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Security</div><div>Treat every submission as hostile: isolation per run, resource limits, no network, destroy the sandbox afterwards, run on separate nodes from the main application</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Fairness and correctness</div><div>Grade by deterministic test cases, with the same limits for everyone; keep hidden tests; allow faculty review and appeals</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Spikes</div><div>The queue absorbs bursts; workers scale out with queue depth; show estimated waiting time</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Cost</div><div>Run workers on discounted interruptible capacity (safe because a failed run is simply retried); scale to near zero off-peak</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Idempotency</div><div>A submission id makes retries safe; a result is written once</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Integrity</div><div>Similarity checks between submissions to detect plagiarism; rate limits on resubmission</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Video and content delivery</div>
          <div class="code-box">Upload (signed URL, direct to storage) -&gt; virus scan -&gt; validate
   -&gt; transcode to adaptive-bitrate renditions (HLS or DASH)
   -&gt; thumbnails + captions (speech-to-text) -&gt; store -&gt; index metadata -&gt; publish
Playback: the app asks the API for access -&gt; API checks the entitlement -&gt; returns a SHORT-LIVED signed URL
          -&gt; the player streams from the CDN, never from the origin
Ebooks: licence rules enforced (for example concurrent-access limits), watermarking or DRM where the publisher requires it</div></div>

          <div class="ans-block"><div class="ans-label">Cost efficiency — where the savings come from</div>
          <ul>
            <li><strong>CDN offload</strong> — the largest cost is video egress; a high cache-hit ratio keeps origin cost small.</li>
            <li><strong>Storage tiering</strong> — keep popular content hot, move old or rarely watched material to cheaper tiers.</li>
            <li><strong>Right-sized renditions</strong> — do not transcode every video into every resolution; produce the ladder that the audience actually uses.</li>
            <li><strong>Autoscaling and scale-to-zero</strong> — pay for peaks only; the platform is quiet outside term time.</li>
            <li><strong>Interruptible capacity for grading and transcoding</strong> — cheap, and safe because work is retried.</li>
            <li><strong>Modular monolith first</strong> — fewer moving parts and a smaller operations team; split a service out only when scale or ownership demands it.</li>
            <li><strong>Managed services</strong> where they replace operations effort; reserved capacity for the steady baseline.</li>
            <li><strong>FinOps</strong> — tagging, budgets and a monthly cost-per-active-student metric.</li>
          </ul></div>

          <div class="ans-block"><div class="ans-label">Security, privacy, availability</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.6fr;"><div>Area</div><div>Design</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Identity</div><div>Federated campus sign-in for students, public sign-up with email or social sign-in for external users, multi-factor authentication for staff</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Data protection</div><div>TLS everywhere, encryption at rest, minimal personal data, retention rules, regional storage where law requires it</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Access control</div><div>Role-based access for staff and faculty; entitlement checks for content; signed URLs for media</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Availability</div><div>Multi-zone deployment, health checks, graceful degradation (for example grading delayed but content still available), backups and a tested recovery plan</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Accessibility</div><div>Accessible interface, captions and transcripts, keyboard and screen-reader support</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Key decisions, recorded as short ADRs</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.5fr 2fr;"><div>Decision</div><div>Choice</div><div>Reason</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2fr;"><div class="dt-name">Architecture style</div><div>Modular monolith with separate workers</div><div>Small team, fast delivery, lowest operating cost; clear module boundaries allow later extraction</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2fr;"><div class="dt-name">Video delivery</div><div>Object storage plus CDN with adaptive streaming</div><div>Video bandwidth would otherwise dominate cost and latency</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2fr;"><div class="dt-name">Grading</div><div>Queue plus sandboxed workers</div><div>Safe execution of untrusted code and elastic handling of deadline spikes</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2fr;"><div class="dt-name">Build versus buy</div><div>Buy or adopt open-source for the learning management, video and payment components where they fit; build what differentiates (grading, entitlements)</div><div>Shorter delivery and lower risk — confirm after a fit assessment</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2fr;"><div class="dt-name">Mobile</div><div>Responsive web and PWA first; native apps where offline and push justify it</div><div>One codebase to start, native only where the value is clear</div></div>
          </div></div>

          <div class="tip-box">✅ Interview line: "I would begin by asking the stakeholders about the user numbers and what they mean, the content volume and rights, the grading languages and limits, the business model, integrations and compliance. The architecturally significant drivers are video delivery at global scale, safe auto-grading under deadline spikes, two audiences with different access rules, and cost efficiency. So: a CDN-backed media pipeline, a queue-and-sandbox grading service, federated identity with an entitlement service, a modular monolith to keep the team and cost small, and autoscaling with interruptible capacity for the bursty work. I would record each of those as an ADR and revisit the sizing once the real numbers are confirmed." Related pages: Architecture Decision Records, NFR and Quality Attributes, Netflix and YouTube system designs.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">How would the subscription model work for the students who are not part of the college?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — separate WHO the user is from WHAT they may access: plans grant entitlements, entitlements control content, and billing events keep them in step</div></div>

          <div class="ans-block"><div class="ans-label">Audiences and access</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div>Audience</div><div>How they get access</div><div>Verification</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">University students</div><div>Free, through the course enrolment</div><div>Campus single sign-on or the student information system</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">External learners</div><div>Free tier (limited content) or a paid subscription or purchase</div><div>Public sign-up with email verification</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Organisations (optional)</div><div>Group licence bought by a company or institution</div><div>Domain or invitation, seat management</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.6fr;"><div class="dt-name">Scholarship or sponsored</div><div>Access granted by a coupon or administrator</div><div>Admin approval, expiry</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Plan design — options to propose, to be confirmed with the university</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.6fr;"><div>Element</div><div>Possibilities</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Plans</div><div>Free tier; monthly or annual subscription; per-course purchase; bundles or learning paths; certificates as an add-on</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Trials and promotions</div><div>Time-limited trial, coupons, discounts for regions or students, referral credit</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">What is paid</div><div>Premium content, auto-grading with feedback, certificates, mentor or faculty support, offline downloads</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Lifecycle</div><div>Upgrade, downgrade, proration, pause, cancel, grace period on failed payment, reactivation</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Money</div><div>Multi-currency, taxes by country, invoices and receipts, refunds, local payment methods</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Architecture</div>
          <div class="code-box">User -&gt; Subscription and Billing service -&gt; Payment gateway (hosted checkout; card data never touches us)
                              |  webhooks: payment succeeded / failed / renewed / cancelled
                              v
                    SubscriptionChanged event  -&gt;  Entitlement service updates what the user may access
                              |
                              v
Content API asks: "may user U play lesson L?"  -&gt;  entitlement check (cached, short TTL)  -&gt;  signed media URL

Also: dunning (retry failed payments with notices), reminders before renewal, churn and revenue reporting.</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Component</div><div>Responsibility</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Billing service</div><div>Plans, subscriptions, invoices, tax, renewals; talks to the payment provider; stores references and tokens, never card numbers</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Entitlement service</div><div>The single source of truth for "who can access what", derived from enrolments, subscriptions, coupons and licences</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Payment provider</div><div>Hosted payment pages, local methods, fraud checks, webhooks (verify signatures and process each event once)</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Reporting</div><div>Conversion, churn, lifetime value, revenue by plan and region — feeds the ROI case (Q8)</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">In code — a cached entitlement check</div>
          <div class="code-box">public async Task&lt;bool&gt; CanAccessAsync(string userId, string resourceId, CancellationToken ct)
{
    var entitlements = await _cache.GetOrCreateAsync($"ent:{userId}",
        async token =&gt; await _entitlementStore.LoadAsync(userId, token),    // enrolments + subscription + coupons
        new HybridCacheEntryOptions { Expiration = TimeSpan.FromMinutes(5) }, cancellationToken: ct);

    return entitlements.Allows(resourceId) &amp;&amp; entitlements.IsActive(DateTimeOffset.UtcNow);
}
// A SubscriptionChanged event invalidates the cache entry so access changes within seconds, not minutes.</div></div>

          <div class="warn-box">⚠️ Common traps: mixing billing logic into the content service, trusting the client to enforce access, processing the same payment webhook twice, and having no grace period — a failed card should not instantly lock a student out mid-course. Use hosted payment pages so the platform stays out of the heaviest payment-compliance scope.</div>
          <div class="tip-box">✅ Interview line: "Free for verified university students through enrolment; paid plans for external learners. Plans grant entitlements; one entitlement service decides access for every request; billing events from the payment provider update it; and media is served only through short-lived signed URLs."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">How do we get from the offline lab application to the online application? How will the data be moved, and what kind of data pipeline will be created?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — inventory and rights-check the content, build an automated ingestion pipeline for new and existing materials, and run a separate migration for student records, in phases</div></div>

          <div class="ans-block"><div class="ans-label">Step 1 — Inventory and rights</div>
          <ul>
            <li><strong>Catalogue what exists</strong>: videos, articles, ebooks, formats, sizes, quality, language, owner, course mapping.</li>
            <li><strong>Check rights</strong>: licences for lab use often do not allow online distribution. Ebooks and third-party videos may need new licences, restricted access or replacement. This can block the schedule, so start early.</li>
            <li><strong>Prioritise</strong>: migrate the most used and the course-critical material first; decide what to retire.</li>
            <li><strong>Digitise</strong> physical or non-digital material (scanning, optical character recognition, re-recording where needed).</li>
          </ul></div>

          <div class="ans-block"><div class="ans-label">Step 2 — The content ingestion pipeline (event-driven, idempotent, restartable)</div>
          <div class="code-box">Source (lab servers, drives, scanned files)
   |  bulk transfer: over the network (AzCopy-style tools) or an offline transfer appliance for very large volumes
   v
Landing zone (raw storage)  -&gt;  event: FileArrived
   v
1 VALIDATE      format, size, checksum, naming, duplicate detection
2 SCAN          malware scan
3 CLASSIFY      attach metadata: course, week, author, language, licence, rights flags
4 TRANSFORM     video: transcode to adaptive-bitrate renditions + thumbnails + captions (speech-to-text)
                ebooks and articles: convert to web formats, extract text for search, apply DRM or watermark
5 ENRICH        extract text and keywords, generate transcripts, link to the course catalogue
6 STORE         publish to content storage; register in the catalogue database
7 INDEX         add to the search index
8 PUBLISH       make visible to the right audience after review
   |  failures at any step
   v
Retry -&gt; quarantine store -&gt; dashboard and alerts; every step can be re-run safely (idempotent)

Orchestration: workflow or queue-based workers, one message per item; progress tracked per item.</div></div>

          <div class="ans-block"><div class="ans-label">Step 3 — Move the student and course data</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Data</div><div>Approach</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Student records and enrolments</div><div>Integrate with the existing student information system rather than copying and diverging: initial load, then ongoing synchronisation through change capture or scheduled feeds; map identities to the new platform accounts</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Grades and history</div><div>One-time migration with validation (counts, checksums, sampled checks), then the new platform is the system of record for online activity</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Course structure</div><div>Import syllabus, modules and assignments into the catalogue using a defined schema</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Personal data</div><div>Minimise, mask in lower environments, apply retention and consent rules</div></div>
          </div>
          <div class="tip-box">✅ The same single-writer and parity-validation ideas as in AM Tech Round 4 apply here: decide which system is the source of truth for each data set during the transition, and prove the data matches before switching.</div></div>

          <div class="ans-block"><div class="ans-label">Step 4 — Phased rollout from lab to online</div>
          <div class="code-box">Phase A   core catalogue and the most-used content online for internal students (pilot courses)
Phase B   remaining content migrated in batches by course; lab keeps working in parallel
Phase C   external access opened (subscription), starting with a limited set of courses
Phase D   lab-only distribution retired once online usage and quality are proven
Throughout: usage analytics and feedback decide what to migrate next</div></div>

          <div class="ans-block"><div class="ans-label">Data and quality controls</div>
          <ul>
            <li>A <strong>metadata schema</strong> agreed up front (course, topic, level, language, licence, accessibility flags) — search and recommendations depend on it.</li>
            <li><strong>Quality gates</strong>: playback test, caption accuracy sampling, broken-link and format checks, accessibility checks.</li>
            <li><strong>Audit and lineage</strong>: where each item came from, who approved it, which licence applies.</li>
            <li><strong>Continuous pipeline</strong>: the same pipeline serves new content created by faculty after launch.</li>
          </ul></div>
          <div class="tip-box">✅ Interview line: "I would first inventory the material and clear the rights, because licences can block online use. Then I would build one event-driven ingestion pipeline — validate, scan, classify, transcode, caption, index, publish — that handles both the backlog and future content, plus a separate, validated migration or integration for student and enrolment data. The rollout is phased by course with the lab running in parallel."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">What kind of development approach would you follow for the university project?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — Agile delivery in phases with an MVP, governed by milestones that suit a university's budget cycle, on a DevOps foundation</div></div>

          <div class="ans-block"><div class="ans-label">Why Agile with milestone governance</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Factor</div><div>Implication</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Requirements will evolve</div><div>Faculty, students and external learners will react to real software; iterate rather than specify everything upfront</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Fixed time and budget</div><div>Keep the date and cost fixed; flex the scope using a prioritised backlog and a clear MVP</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Public-sector style governance</div><div>Use milestone reviews, a steering group, and transparent reporting on top of Scrum teams</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">High-risk items</div><div>Auto-grading security, video cost and licensing need early spikes and prototypes</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">The approach</div>
          <ul>
            <li><strong>Scrum teams with a product owner from the university</strong>, two-week sprints, demos to faculty and a student pilot group every sprint.</li>
            <li><strong>Dual track</strong>: discovery (requirements, prototypes, user research) one step ahead of delivery.</li>
            <li><strong>MVP first</strong>: sign-in, catalogue, content playback, enrolment, then grading and subscriptions.</li>
            <li><strong>Architecture runway</strong>: the key decisions (identity, content delivery, grading sandbox) made early, recorded as ADRs, and proven by spikes.</li>
            <li><strong>Modular design with domain boundaries</strong> so teams work in parallel and services can be split later.</li>
            <li><strong>DevOps and quality built in</strong>: trunk-based development, CI/CD, feature flags, a test pyramid, automated security checks, accessibility checks, performance tests before each phase.</li>
            <li><strong>Lightweight documentation</strong>: C4 diagrams, ADRs, API specifications, and runbooks kept next to the code.</li>
            <li><strong>Risk register and regular architecture reviews</strong> with the university's IT and security teams.</li>
          </ul></div>

          <div class="ans-block"><div class="ans-label">Delivery rhythm</div>
          <div class="code-box">Each sprint:   plan -&gt; build -&gt; test -&gt; demo -&gt; retrospective        (2 weeks)
Every ~3 sprints (a release): deployable increment to a pilot cohort, with feedback and KPIs reviewed
Every phase:   milestone review with the steering group, scope re-prioritised, risks and budget reviewed
Definition of done includes: tests, security scan, accessibility check, documentation, monitoring in place</div></div>
          <div class="tip-box">✅ Interview line: "Agile in two-week sprints with a university product owner and a student pilot group, delivering an MVP first, with milestone governance for the budget holders and DevOps practices — trunk-based development, CI/CD, feature flags — underneath. Risky items such as the grading sandbox and video cost get early spikes recorded as ADRs."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q7</div>
      <div class="qa-body">
        <div class="qa-question">This is a one-year project. How would you plan to deliver it?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — five phases with clear exit criteria, MVP in about the first third, a pilot before the external launch, and hypercare after go-live</div></div>

          <div class="ans-block"><div class="ans-label">The plan on one page</div>
          <div class="code-box">Month           1   2   3   4   5   6   7   8   9  10  11  12
Inception       ##
Foundation      ####
MVP build           ########
Grading + billing           ############
Mobile + analytics                  ############
Content migration       ##################
Hardening + pilot                           ########
Launch + hypercare                                  ########
(content migration runs alongside, in batches by course)</div></div>

          <div class="ans-block"><div class="ans-label">Phases, deliverables and exit criteria</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:0.9fr 0.8fr 2.2fr 1.6fr;"><div>Phase</div><div>When</div><div>Deliverables</div><div>Exit criteria</div></div>
            <div class="dt-row" style="grid-template-columns:0.9fr 0.8fr 2.2fr 1.6fr;"><div class="dt-name">1 Inception</div><div>Month 1</div><div>Clarified requirements and ASRs, assumptions, target architecture and ADRs, risks, team and governance, estimate and plan</div><div>Scope and architecture approved by the steering group</div></div>
            <div class="dt-row" style="grid-template-columns:0.9fr 0.8fr 2.2fr 1.6fr;"><div class="dt-name">2 Foundation</div><div>Months 1-2</div><div>Environments, CI/CD and infrastructure as code, identity and sign-in, base services, observability, security baseline, spikes: grading sandbox, video pipeline</div><div>Pipeline deploys to all environments; spikes proven</div></div>
            <div class="dt-row" style="grid-template-columns:0.9fr 0.8fr 2.2fr 1.6fr;"><div class="dt-name">3 MVP</div><div>Months 2-5</div><div>Catalogue, content playback via CDN, enrolment and entitlements for internal students, web app, first migrated courses</div><div>Pilot cohort of internal students can learn end to end</div></div>
            <div class="dt-row" style="grid-template-columns:0.9fr 0.8fr 2.2fr 1.6fr;"><div class="dt-name">4 Grading, subscriptions, mobile</div><div>Months 4-9</div><div>Automated grading with feedback, subscription and billing for external learners, mobile app, notifications, analytics, admin and content portal</div><div>Grading accuracy and security validated; payment flow certified; mobile in the stores</div></div>
            <div class="dt-row" style="grid-template-columns:0.9fr 0.8fr 2.2fr 1.6fr;"><div class="dt-name">5 Hardening and pilot</div><div>Months 8-10</div><div>Performance and load tests at target scale, security testing, accessibility audit, disaster-recovery drill, external beta, support readiness</div><div>NFR targets met; go-live criteria signed off</div></div>
            <div class="dt-row" style="grid-template-columns:0.9fr 0.8fr 2.2fr 1.6fr;"><div class="dt-name">6 Launch and hypercare</div><div>Months 10-12</div><div>Staged external launch, monitoring and support, rapid fixes, KPI review, handover and training, backlog for the next year</div><div>Stable operation; handover accepted</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">How the plan is kept honest</div>
          <ul>
            <li><strong>Critical path</strong>: content rights and licences, the grading sandbox and the payment integration — start them in the first two months.</li>
            <li><strong>Release every sprint</strong> to a pilot environment; real users from month three.</li>
            <li><strong>Contingency</strong> built in (for example the last two months are a buffer for hardening and surprises) rather than hidden in task estimates.</li>
            <li><strong>Scope management</strong>: a prioritised backlog and a must-have, should-have, could-have split; defer could-haves if the date is at risk.</li>
            <li><strong>Reporting</strong>: burn-up chart, milestone status, risk register and budget each month to the steering group.</li>
            <li><strong>Team</strong>: product owner, solution architect, tech leads, backend, frontend, mobile, DevOps and platform, QA and automation, UX and accessibility, data engineer, security, and a project manager. Size it from the estimate, not from a fixed number.</li>
          </ul></div>

          <div class="ans-block"><div class="ans-label">Main risks and mitigations</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.6fr;"><div>Risk</div><div>Mitigation</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Content licences block online use</div><div>Start the rights review in month one; have a fallback to replace or restrict content</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Unsafe or unreliable grading</div><div>Early spike, security review, load test at deadline volumes, faculty review path</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Video cost higher than planned</div><div>Measure with real content early; tune renditions and CDN caching; budget alerts</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Requirement changes</div><div>Prioritised backlog, change control through the product owner</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Integration delays with university systems</div><div>Early interface agreements, stubs and sandboxes so teams are not blocked</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Low adoption</div><div>Student pilot group, feedback loops, usage analytics, communication plan</div></div>
          </div></div>
          <div class="tip-box">✅ Interview line: "Month one is inception and the architecture; months one to two lay the foundation and prove the risky spikes; an MVP for internal students by about month five; grading, subscriptions and mobile through month nine; hardening and an external beta in months eight to ten; staged launch and hypercare to month twelve. Content migration runs alongside in batches, and the critical-path items — licences, the sandbox and payments — start first."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q8</div>
      <div class="qa-body">
        <div class="qa-question">How do you justify the ROI for the platform?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — compare total cost with quantified benefits over a defined period, state the assumptions, show scenarios, and agree the measurements before launch</div></div>

          <div class="ans-block"><div class="ans-label">Costs (what we spend)</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.6fr;"><div>Type</div><div>Items</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">One-time</div><div>Design and build, content digitisation and licensing, data migration, integrations, security and accessibility work, training, launch</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Recurring</div><div>Cloud (compute, storage, CDN egress), licences, payment fees, support and operations staff, content updates, marketing, continuous improvement</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Benefits (what we gain)</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 1.7fr 1.6fr;"><div>Benefit</div><div>How it is created</div><div>How to measure</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.7fr 1.6fr;"><div class="dt-name">New revenue</div><div>Subscriptions and course purchases from external learners</div><div>Subscribers x price, conversion rate, churn</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.7fr 1.6fr;"><div class="dt-name">Capacity without buildings</div><div>No longer limited by lab seats and opening hours</div><div>Students served per year versus lab capacity</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.7fr 1.6fr;"><div class="dt-name">Faculty time saved</div><div>Automated grading and feedback</div><div>Grading hours before and after</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.7fr 1.6fr;"><div class="dt-name">Lower cost per student</div><div>Scale economics, shared content</div><div>Total cost divided by active students</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.7fr 1.6fr;"><div class="dt-name">Better outcomes and retention</div><div>Anytime access, faster feedback</div><div>Completion rates, grades, satisfaction</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.7fr 1.6fr;"><div class="dt-name">Strategic value</div><div>Global reach, reputation, partnerships</div><div>Enrolment enquiries, partnerships, rankings (qualitative)</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">The financial model</div>
          <div class="code-box">ROI              = (total benefit - total cost) / total cost
Payback period   = time until cumulative benefit equals cumulative cost
NPV              = sum over years of (benefit - cost) / (1 + discount rate) ^ year

Unit economics (for the subscription side)
  Revenue per subscriber   = price x months retained
  Customer acquisition cost  = marketing and sales spend / new subscribers
  Lifetime value             = revenue per subscriber x margin
  Rule of thumb              = lifetime value comfortably above acquisition cost
  Cost per active student    = (cloud + support + content) / active students

Illustrative structure only (replace with the university's own data):
  Year 1: heavy build cost, little benefit      Year 2: run cost + growing subscription revenue
  Year 3: benefit exceeds cost, payback reached somewhere in years 2 to 4 depending on conversion</div></div>

          <div class="ans-block"><div class="ans-label">How to make the case credible</div>
          <ul>
            <li><strong>Baseline first</strong>: measure today's lab capacity, grading hours and cost per student, so the benefit is a comparison, not a guess.</li>
            <li><strong>Three scenarios</strong> — conservative, expected, optimistic — and a sensitivity analysis on the biggest drivers (conversion rate, churn, video cost).</li>
            <li><strong>Separate hard from soft benefits</strong>: cash savings and revenue are hard; reputation and outcomes are soft but still reported.</li>
            <li><strong>Phase the investment</strong>: fund the MVP, then release further funding when the pilot KPIs are met — it limits risk and makes the ROI testable.</li>
            <li><strong>Agree KPIs and a dashboard before launch</strong>: active users, completion rate, conversion, churn, grading turnaround, support tickets, cost per active student.</li>
            <li><strong>Review regularly</strong> and use the data to adjust pricing, content and spending.</li>
          </ul></div>
          <div class="warn-box">⚠️ Do not present invented figures. Show the model, the assumptions and the data you still need, and use the stakeholders' own numbers. A credible range with stated assumptions beats a precise number nobody can defend.</div>
          <div class="tip-box">✅ Interview line: "I would build a simple model: total cost over the horizon versus quantified benefits — subscription revenue, faculty time saved, capacity beyond the lab, lower cost per student — calculate ROI, payback and NPV for three scenarios, and phase the funding against pilot KPIs. Before launch I would agree the baseline and the dashboard so the benefits can actually be measured."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q9</div>
      <div class="qa-body">
        <div class="qa-question">How are you using APIs in the project?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — API-first: clear, versioned contracts for clients, between services and for partners, all behind a gateway with common security and limits</div></div>

          <div class="ans-block"><div class="ans-label">The kinds of API in this platform</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2fr 1.5fr;"><div>Kind</div><div>Purpose</div><div>Style</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2fr 1.5fr;"><div class="dt-name">Client APIs (backends for frontends)</div><div>Web, mobile and admin apps get exactly the data a screen needs in one call</div><div>REST and JSON, versioned</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2fr 1.5fr;"><div class="dt-name">Internal service APIs</div><div>Modules and services call each other: entitlements, catalogue, grading</div><div>REST or gRPC, plus events</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2fr 1.5fr;"><div class="dt-name">Integration APIs (inbound and outbound)</div><div>Student information system, payment gateway, email and SMS, identity provider</div><div>REST, webhooks, files</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2fr 1.5fr;"><div class="dt-name">Learning-tool interoperability</div><div>Plug third-party tools into the platform and expose content to other learning systems</div><div>LTI standard (and xAPI for learning activity)</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2fr 1.5fr;"><div class="dt-name">Public or partner APIs</div><div>Let partners and other universities integrate</div><div>REST with a developer portal and API keys</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2fr 1.5fr;"><div class="dt-name">Event APIs</div><div>Notify other parts of the system of changes: SubmissionGraded, SubscriptionChanged</div><div>Events on a broker or webhooks</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Standards and practices</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Concern</div><div>Practice</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Contract first</div><div>Design the API in OpenAPI before coding; generate clients, documentation and mock servers from it</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Security</div><div>OAuth 2.0 and OpenID Connect; token validation at the gateway; scopes per client; least privilege between services</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Gateway</div><div>One front door for authentication, rate limits, quotas, versioning, routing, response caching and analytics</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Long-running work</div><div>Return 202 Accepted with an id and let the client poll or be notified — grading is not a synchronous call</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Reliability</div><div>Idempotency keys for payments and submissions, timeouts, retries with backoff, consistent error format (problem details), pagination</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Versioning and change</div><div>Backward-compatible changes first, explicit versions for breaking ones, deprecation policy, consumer-driven contract tests</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Performance</div><div>HTTP caching and ETags for catalogue data, compression, CDN for static content</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Observability</div><div>Correlation ids, per-API dashboards, alerts on error rate and latency</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Example contract — submitting an assignment</div>
          <div class="code-box">paths:
  /assignments/{id}/submissions:
    post:
      summary: Submit a solution for grading
      parameters:
        - { name: id, in: path, required: true, schema: { type: string } }
        - { name: Idempotency-Key, in: header, required: true, schema: { type: string } }
      requestBody:
        content:
          application/json:
            schema: { $ref: '#/components/schemas/SubmissionRequest' }
      responses:
        '202':
          description: Accepted for grading
          headers: { Location: { schema: { type: string } } }    # /submissions/{submissionId}
        '429': { description: Too many submissions, retry later }
  /submissions/{submissionId}:
    get:
      summary: Status and result (Queued, Running, Graded, Failed)</div></div>

          <div class="ans-block"><div class="ans-label">In my own project</div>
          <p>Your resume lists API strategy and system integration as skills and describes platform integrations on the Battery Swapping platform. Describe the APIs you actually designed: the gateway in front of the services, versioned contracts, authentication, and how consumers were onboarded. Use the same vocabulary as above and say which parts you personally owned.</p></div>
          <div class="tip-box">✅ Interview line: "I design API-first — contracts in OpenAPI, versioned, behind a gateway that handles authentication, limits and caching. Clients get backends-for-frontends, services use REST or events, partners get documented APIs, long-running work like grading returns 202 with a status resource, and every write is idempotent." Related pages: REST vs gRPC, Event-Driven and Messaging, and AM Tech Round 3 Q10 (integration reliability).</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q10</div>
      <div class="qa-body">
        <div class="qa-question">How do you choose which model to use?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Reading of the question</div>
          <p>In this AI-focused part of the interview "model" most likely means an AI model (large language, speech or embedding model). If the interviewer meant the delivery or process model (Agile, waterfall) see Q6; if they meant an architecture or tenancy model, say so and ask. The answer below is for AI models.</p></div>

          <div class="ans-block"><div class="ans-label">Short answer — start from the task and its success measure, shortlist a few models, test them on your own evaluation set for quality, latency and cost, and pick the cheapest one that meets the bar</div></div>

          <div class="ans-block"><div class="ans-label">The decision process</div>
          <div class="code-box">1  DEFINE the task and how success is measured (accuracy, helpfulness, time, cost per request)
2  LIST hard constraints: data privacy and residency, licence, latency limit, budget, languages
3  SHORTLIST 2-4 candidates across types: closed API model, open-weight model, small versus large
4  BUILD an evaluation set of real examples with expected answers (and edge cases)
5  TEST each candidate: quality, latency, cost per request, failure behaviour
6  DECIDE: the cheapest model that clears the quality bar; consider routing simple requests to a small model
7  KEEP it behind your own interface; monitor quality and cost; re-evaluate regularly as models change</div></div>

          <div class="ans-block"><div class="ans-label">Selection criteria</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Criterion</div><div>What to check</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Quality on your task</div><div>Your own evaluation set, not a public leaderboard</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Cost</div><div>Price per input and output token or per audio minute, at your expected volume</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Latency</div><div>Is an interactive answer needed, or can it run in the background?</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Privacy and compliance</div><div>Student data: where is it processed, is it kept or used for training, regional hosting, contractual terms</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Open versus closed</div><div>Open-weight models give control and self-hosting but more operations; managed models are easier but less controllable</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Capabilities</div><div>Code, languages, long context, vision, speech, tool calling, structured output</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Reliability and limits</div><div>Availability, rate limits, versioning and deprecation</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Safety</div><div>Content filtering, behaviour under adversarial prompts</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Applied to the learning platform</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.6fr 2fr;"><div>Use case</div><div>Model type</div><div>Guidance</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 2fr;"><div class="dt-name">Grading correctness</div><div class="dt-no">No model — deterministic test cases</div><div>Grades must be reproducible and fair; do not let a language model decide the score</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 2fr;"><div class="dt-name">Feedback and hints on a failed submission</div><div>Code-capable language model</div><div>Explain the failing test; constrain it so it never reveals full solutions; mid-tier model is usually enough</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 2fr;"><div class="dt-name">Questions about course material</div><div>Embedding model plus a language model (retrieval-augmented)</div><div>Answer only from the course content with citations; a small or mid-size model keeps cost low</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 2fr;"><div class="dt-name">Captions and transcripts</div><div>Speech-to-text model</div><div>Batch process in the media pipeline; check accuracy per language</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 2fr;"><div class="dt-name">Translation</div><div>Translation or language model</div><div>Human review for high-stakes content</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 2fr;"><div class="dt-name">Plagiarism similarity</div><div>Embeddings and code-similarity techniques</div><div>Flag for faculty review; never auto-penalise</div></div>
          </div></div>
          <div class="tip-box">✅ Interview line: "I choose a model from the task and its success measure, not from a leaderboard. I shortlist a few candidates, run them on an evaluation set of our own data for quality, latency and cost, check privacy and licence terms because this is student data, and pick the cheapest that clears the bar — often routing simple requests to a small model. For grading itself I use deterministic tests, not a language model." Related page: AI and LLM Engineering → Public Model Landscape and Comparison.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q11</div>
      <div class="qa-body">
        <div class="qa-question">How do you optimise the development life cycle using AI?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — apply AI assistance at each stage of the lifecycle where it removes toil, keep a human accountable for every output, and measure the effect on delivery metrics</div></div>

          <div class="ans-block"><div class="ans-label">Where AI helps, stage by stage</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.1fr 1.7fr;"><div>Stage</div><div>How AI helps</div><div>Human control</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.1fr 1.7fr;"><div class="dt-name">Requirements</div><div>Summarise interviews and documents, draft user stories and acceptance criteria, find gaps and conflicts</div><div>Product owner confirms intent</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.1fr 1.7fr;"><div class="dt-name">Design</div><div>Draft options and trade-offs, ADRs, diagrams-as-code, threat-model prompts</div><div>Architect decides and owns the decision</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.1fr 1.7fr;"><div class="dt-name">Coding</div><div>Code completion, boilerplate, refactoring, explaining unfamiliar code, migration help</div><div>Developer reviews and understands every line</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.1fr 1.7fr;"><div class="dt-name">Code review</div><div>First-pass review for bugs, style and security, using team conventions and static-analysis results</div><div>Human approval, especially for sensitive changes</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.1fr 1.7fr;"><div class="dt-name">Testing</div><div>Generate unit and edge-case tests, test data, regression scenarios; summarise failures</div><div>Review test quality; coverage is not correctness</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.1fr 1.7fr;"><div class="dt-name">CI/CD and release</div><div>Triage failed builds, summarise changes into release notes, suggest pipeline fixes</div><div>Pipeline gates stay deterministic</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.1fr 1.7fr;"><div class="dt-name">Operations</div><div>Summarise incidents, correlate logs and metrics, draft post-incident reports, suggest runbook steps</div><div>On-call engineer decides the action</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.1fr 1.7fr;"><div class="dt-name">Documentation and knowledge</div><div>Generate and update docs, answer questions over the codebase and ADRs (retrieval-augmented)</div><div>Owners keep it accurate</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.1fr 1.7fr;"><div class="dt-name">Technical debt</div><div>Find duplication, risky hotspots and outdated dependencies; propose and rank refactoring</div><div>Team prioritises</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Adoption approach</div>
          <div class="code-box">1  PICK 2-3 high-toil use cases (for example test generation, review assistance, documentation)
2  PILOT with a small team; agree what "better" means before starting
3  SET guardrails: approved tools, no secrets or personal data in prompts, licence and IP rules, mandatory human review
4  MEASURE: lead time for changes, pull-request cycle time, defect rate, change failure rate, developer feedback
5  SHARE what works: prompt libraries, templates, short training
6  EXPAND or STOP based on the evidence</div></div>

          <div class="ans-block"><div class="ans-label">Risks to name</div>
          <ul>
            <li><strong>Confidentiality</strong> — source code, credentials and student data must not leave approved boundaries.</li>
            <li><strong>Correctness</strong> — generated code can look right and be wrong or insecure; invented APIs and subtle bugs are common.</li>
            <li><strong>Licensing and provenance</strong> of generated code.</li>
            <li><strong>Over-reliance</strong> — skills can erode; keep reviews and learning habits.</li>
            <li><strong>False productivity</strong> — more code is not better delivery; judge by the metrics, not by lines written.</li>
          </ul></div>
          <div class="warn-box">⚠️ Describe what you have actually used and measured. Your resume lists Generative AI, Agentic AI, RAG and MCP architecture work; for lifecycle tooling say which assistants or practices you used and what changed, and use "I would" for the rest.</div>
          <div class="tip-box">✅ Interview line: "I use AI where it removes toil — drafting stories and ADRs, code assistance and first-pass review, test generation, pipeline failure triage and incident summaries — with a human accountable for every output, guardrails on data and licensing, and the DORA metrics to prove it helps." Related page: AI and LLM Engineering → Agentic SDLC, a multi-agent factory.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q12</div>
      <div class="qa-body">
        <div class="qa-question">What are the common issues faced as an architect?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — most are people and clarity problems, not technology problems: unclear requirements, competing priorities, change, and keeping the architecture real as delivery pressure builds</div></div>

          <div class="ans-block"><div class="ans-label">Issue, impact, and what I do about it</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div>Issue</div><div>Impact</div><div>What I do</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Unclear or changing requirements</div><div>Rework, wrong design</div><div>Ask clarifying questions early, write assumptions, prototype, keep the design modular so change is cheap</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Non-functional requirements missing</div><div>Surprises at scale, security or availability</div><div>Make quality attributes explicit with targets, trace them to design, test them early</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Competing stakeholder priorities</div><div>Stalled decisions, scope creep</div><div>Map stakeholders and concerns, use trade-off analysis and ADRs, escalate with options and a recommendation</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Cost, time and quality trade-offs</div><div>Pressure to cut corners</div><div>Fix the date and cost, flex scope; make the risk of each shortcut visible and owned</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Technical debt versus delivery</div><div>Slowdown over time</div><div>Track debt in a register, reserve capacity for it, link it to business risk</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Technology hype and preferences</div><div>Wrong tool, complexity</div><div>Decide on criteria and evidence — a weighted matrix and a short spike — and record the decision</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Legacy integration</div><div>Hidden coupling, slow progress</div><div>Anti-corruption layers, strangler approach, early integration tests</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Security and compliance late in the day</div><div>Costly redesign</div><div>Threat model in design, security baselines in the pipeline, early reviews with the security team</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Estimation uncertainty</div><div>Missed dates, disputes</div><div>Ranges with assumptions, spikes for unknowns, explicit contingency, re-estimate at milestones</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Team skill gaps</div><div>Quality and speed suffer</div><div>Pairing, training, templates and reference implementations, pick technology the team can operate</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Architecture drift</div><div>Implementation diverges from the design</div><div>Lightweight governance, automated conformance checks, regular reviews, living documentation</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Cloud cost overruns</div><div>Budget shocks</div><div>Cost model up front, tagging and budgets, FinOps reviews, right-sizing</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Dependencies on third parties</div><div>Outages and delays</div><div>Contracts and service levels, resilience patterns, fallbacks, mocks for development</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Scaling surprises in production</div><div>Incidents</div><div>Capacity model, load tests at target scale, observability, gradual rollout</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Communication gaps</div><div>Misaligned teams</div><div>Clear diagrams and decision records, regular architecture forums, explain at the right level for each audience</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.5fr 2.1fr;"><div class="dt-name">Governance too heavy or too light</div><div>Slow delivery or chaos</div><div>Right-size by risk: full review only for high-impact decisions; light checklists for the rest</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">How to answer well</div>
          <ul>
            <li><strong>Pick three</strong> issues and tell each as a short story: situation, what you did, result.</li>
            <li><strong>Choose ones from your real projects</strong> — for example the multi-tenant and multi-region design decisions, cost governance, or the release-cycle transformation on your resume.</li>
            <li><strong>Show the pattern</strong>: you make problems visible early, decide with evidence, and keep stakeholders aligned.</li>
          </ul></div>
          <div class="tip-box">✅ Interview line: "The recurring issues are unclear and changing requirements, missing quality attributes, stakeholder trade-offs, technical debt against delivery pressure, and architecture drifting from the design. My approach is to make assumptions and risks explicit early, decide with evidence and record decisions, keep the design modular so change is cheap, and use right-sized governance so the architecture stays real without slowing delivery."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q13</div>
      <div class="qa-body">
        <div class="qa-question">How do we bring event-driven design into assessment result preparation?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — treat every step of result preparation as a fact that happened, publish it as an event, let the next step react, and use a small process manager for the parts that need ordering, deadlines and approval</div>
          <div class="qa-answer">"Result preparation is a chain of business facts: a submission arrived, it was graded, the score was finalised, the grade was calculated, the results were approved, the results were published. I model each as an event. The grading service publishes GradingCompleted, the gradebook reacts by aggregating scores and applying the course rules, and publishes GradeCalculated. A result-preparation process for each course and term waits until every assessment is finalised, asks faculty to moderate, and then publishes ResultsPublished. Notifications, transcript updates, analytics and certificates all subscribe independently. Events are written with an outbox so a grade and its event are saved together, and every consumer is idempotent, so retries and duplicates are safe."</div></div>

          <div class="ans-block"><div class="ans-label">The flow</div>
          <div class="code-box">Student submits
   |  SubmissionReceived
   v
Assessment service (queues the work)
   |  SubmissionQueued
   v
Grading workers (sandboxed)             -&gt;  GradingCompleted { score per test, total, version }
   |
   v
Gradebook service  (aggregates per student and course; applies late penalties, weights, drop-lowest)
   |  AssessmentScoreFinalized  -&gt;  GradeCalculated { student, course, grade, version }
   v
Result-preparation process  (one per course and term — see below)
   |  waits for: all assessments finalised AND the deadline passed
   |  RequestModeration  -&gt;  faculty review and approval  -&gt;  ResultsApproved
   |  ResultsPublished { course, term }
   v
Independent subscribers
   Notifications (email, push)   Student record / transcript sync   Analytics and reports
   Certificates                  Progress and recommendations       Audit log</div></div>

          <div class="ans-block"><div class="ans-label">Events versus commands — keep them apart</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 1.8fr 1.8fr;"><div></div><div>Event</div><div>Command</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.8fr 1.8fr;"><div class="dt-name">Meaning</div><div>Something that already happened (past tense)</div><div>A request to do something (imperative)</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.8fr 1.8fr;"><div class="dt-name">Examples</div><div>GradingCompleted, GradeCalculated, ResultsPublished</div><div>GradeSubmission, PublishResults, RequestModeration</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.8fr 1.8fr;"><div class="dt-name">Receivers</div><div>Any number; the sender does not know them</div><div>Exactly one owner</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.8fr 1.8fr;"><div class="dt-name">Can be rejected?</div><div>No — it is a fact</div><div>Yes</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Choreography or orchestration — use each where it fits</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div>Part</div><div>Pattern</div><div>Why</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Submission to graded to score</div><div>Choreography: each service reacts to the previous event</div><div>Simple, independent steps with no coordination needed</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Result preparation and publication</div><div>Orchestration: a process manager (saga) per course and term</div><div>It has ordering, waiting, deadlines, approval, timeouts and exceptions — it needs one place that knows the state</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">After publication (notify, sync, analyse)</div><div>Choreography: publish and subscribe</div><div>New consumers can be added without changing the publisher</div></div>
          </div>
          <div class="code-box">Result-preparation process (per course and term)
  Open
    -&gt; (all assessments finalised AND deadline passed)  -&gt;  Calculating
    -&gt; (grades calculated for every student)            -&gt;  AwaitingModeration   [timer: remind faculty]
    -&gt; (faculty approves)                               -&gt;  Approved
    -&gt; (publish)                                        -&gt;  Published            [emits ResultsPublished]
  Exceptions: missing scores -&gt; escalate to faculty     appeal received -&gt; reopen affected students only</div>
          <div class="tip-box">✅ Related page: Choreography vs Orchestration and Multi-Phase Commit.</div></div>

          <div class="ans-block"><div class="ans-label">Making it reliable</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Concern</div><div>Technique</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Never lose an event</div><div>Outbox pattern: write the grade and the event in one database transaction; a publisher sends outbox rows to the broker</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Duplicates</div><div>Delivery is at-least-once, so consumers are idempotent: record processed event ids and ignore versions older than the stored one</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Ordering</div><div>Partition or session by student and course so one student's events are processed in order; different students run in parallel</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Failures</div><div>Retry with backoff, then a dead-letter queue with a replay tool and alerts; a bad record must not block the others</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Regrades and appeals</div><div>A GradeChanged event with a new version; dependent calculations recompute, and older versions are ignored</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Audit</div><div>Keep grade changes as an append-only history (event-sourced gradebook or an audit table) so every result can be explained during an appeal</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Deadline bursts</div><div>The queue absorbs the peak; consumers autoscale on queue depth; students see a "processing" state until the grade is ready</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Schema changes</div><div>Versioned event contracts, additive changes first, a schema registry or contract tests</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Visibility</div><div>Correlation id on every event, tracing across services, a dashboard of process states and dead-letter depth</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">In code — outbox on write, idempotent handler on read</div>
          <div class="code-box">// Producer: the grade and its event are saved together or not at all
await using var tx = await _db.Database.BeginTransactionAsync(ct);
grade.Finalize(score);
_db.Grades.Update(grade);
_db.Outbox.Add(OutboxMessage.From(new AssessmentScoreFinalized(
    EventId: Guid.NewGuid(), StudentId: grade.StudentId, CourseId: grade.CourseId,
    AssessmentId: grade.AssessmentId, Score: score, Version: grade.Version)));
await _db.SaveChangesAsync(ct);
await tx.CommitAsync(ct);                       // a separate publisher sends outbox rows to the broker</div>
          <div class="code-box">// Consumer: safe to run twice, ignores older versions
public async Task Handle(AssessmentScoreFinalized e, CancellationToken ct)
{
    if (await _processed.ExistsAsync(e.EventId, ct)) return;                 // duplicate delivery

    var book = await _gradebooks.GetAsync(e.StudentId, e.CourseId, ct);
    book.Apply(e.AssessmentId, e.Score, e.Version);                          // ignored if the version is older
    var grade = _rules.Calculate(book);                                      // weights, late penalties, drop-lowest

    await _gradebooks.SaveAsync(book, ct);
    await _outbox.AddAsync(new GradeCalculated(Guid.NewGuid(), e.StudentId, e.CourseId, grade, book.Version), ct);
    await _processed.MarkAsync(e.EventId, ct);                               // same transaction as the save
}</div>
          <div class="code-box">// An event contract: small, versioned, with a unique id and the data consumers need
{ "eventId": "9a1c...e4", "type": "GradeCalculated", "version": 3,
  "occurredAt": "2026-11-20T10:15:00Z",
  "studentId": "S-48213", "courseId": "CS101", "term": "2026-autumn",
  "grade": "B+", "score": 84.5 }</div></div>

          <div class="ans-block"><div class="ans-label">What stays synchronous</div>
          <ul>
            <li><strong>Reading a result</strong> — the student's current grade comes from a read model (a projection built from the events), not by calling five services.</li>
            <li><strong>Submitting work</strong> — the API stores the submission and returns 202 Accepted immediately; grading continues asynchronously.</li>
            <li><strong>Faculty actions</strong> such as approving results are commands with an immediate acknowledgement; the consequences flow as events.</li>
          </ul></div>

          <div class="ans-block"><div class="ans-label">Technology choices</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.6fr;"><div>Option</div><div>When it fits</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Message broker with topics (for example Azure Service Bus)</div><div>Business events at this volume: per-student ordering with sessions, dead-letter queues, scheduled messages for deadlines and reminders</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Event streaming (Event Hubs or Kafka)</div><div>Very high-volume streams and analytics feeds, replay for new consumers</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">In-process events plus outbox</div><div>Inside a modular monolith — the same events, no network hop, publish to a broker later (see Q14)</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Workflow engine (durable workflows, a saga library)</div><div>The result-preparation process with timers, approvals and compensation</div></div>
          </div>
          <div class="tip-box">✅ The volumes here are modest — for example about 8 grading events a second even at a deadline peak on the earlier sizing — so a broker with topics is enough; reserve high-throughput streaming for analytics.</div></div>

          <div class="warn-box">⚠️ Common mistakes: events that are really commands in disguise; publishing without an outbox so a crash loses events; assuming ordering or exactly-once delivery; events carrying too little data (every consumer calls back) or too much (tight coupling); and chains of services reacting to each other that nobody can follow — the reason to use a process manager for the main workflow.</div>
          <div class="tip-box">✅ Interview line: "I model result preparation as business events — submission received, grading completed, score finalised, grade calculated, results published. Fan-out steps are plain publish and subscribe; the publication workflow is a small orchestrated process with deadlines and faculty approval. Events are written with an outbox, consumers are idempotent and version-aware, and students read from a projection, so the system absorbs deadline spikes and every grade stays explainable."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q14</div>
      <div class="qa-body">
        <div class="qa-question">Why go to modular microservices instead of a modular monolith? Can the same thing be achieved with a modular monolith?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — largely yes. A modular monolith gives you the modularity and the event-driven design; microservices add independent deployment, scaling and isolation at a real cost. For this platform I would start with a modular monolith and deploy separately only the parts with genuinely different needs</div>
          <div class="qa-answer">"I would not go to microservices everywhere. Clear module boundaries, internal events and independent development of modules can all be done in a modular monolith, with far less operational complexity — and our team and release cadence do not justify more at the start. Microservices earn their cost when a part needs to scale independently, run in a different security or technology context, or be owned and released by a separate team. In this platform that is true for the grading runners, which execute untrusted code and spike at deadlines, and for the media pipeline, which is CPU-heavy and bursty. So the design is a modular monolith for the core domains plus a few separately deployed workers, and anything else is extracted later on evidence."</div></div>

          <div class="ans-block"><div class="ans-label">What each approach actually gives you</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.6fr 1.6fr 1.5fr;"><div>Driver</div><div>Modular monolith</div><div>Microservices</div><div>For this platform</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.6fr 1.5fr;"><div class="dt-name">Clear boundaries</div><div class="dt-yes">Yes, if enforced (modules, public contracts, tests)</div><div class="dt-yes">Yes, enforced by the network</div><div>Monolith is enough</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.6fr 1.5fr;"><div class="dt-name">Event-driven design</div><div class="dt-yes">Yes — in-process events plus an outbox, or a broker</div><div class="dt-yes">Yes — usually through a broker</div><div>Monolith is enough</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.6fr 1.5fr;"><div class="dt-name">Independent scaling</div><div>Scale the whole app horizontally; heavy work moved to separate workers</div><div class="dt-yes">Scale each service alone</div><div>Only grading and media need it</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.6fr 1.5fr;"><div class="dt-name">Independent deployment</div><div class="dt-no">One deployable; a release carries everything</div><div class="dt-yes">Each service on its own schedule</div><div>Valuable only with several teams</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.6fr 1.5fr;"><div class="dt-name">Fault isolation</div><div class="dt-no">A crash or memory leak can affect everything</div><div class="dt-yes">Contained to one service</div><div>Important for the sandbox and media</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.6fr 1.5fr;"><div class="dt-name">Security isolation</div><div class="dt-no">Same process and trust boundary</div><div class="dt-yes">Separate runtime, network and identity</div><div class="dt-yes">Required for running student code</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.6fr 1.5fr;"><div class="dt-name">Technology choice</div><div class="dt-no">One stack</div><div class="dt-yes">Best tool per service</div><div>Rarely needed here</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.6fr 1.5fr;"><div class="dt-name">Team autonomy</div><div>Good for one or two teams</div><div class="dt-yes">Good for many teams</div><div>Depends on team size</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.6fr 1.5fr;"><div class="dt-name">Simplicity and speed to first release</div><div class="dt-yes">Much simpler</div><div class="dt-no">Distributed-system overhead from day one</div><div class="dt-yes">Favours monolith</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.6fr 1.5fr;"><div class="dt-name">Transactions and consistency</div><div class="dt-yes">One database transaction</div><div class="dt-no">Eventual consistency, sagas</div><div class="dt-yes">Favours monolith for the core</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.6fr 1.5fr;"><div class="dt-name">Operations and cost</div><div class="dt-yes">One thing to deploy, monitor, debug</div><div class="dt-no">Many deployments, networking, tracing, platform skills</div><div class="dt-yes">Favours monolith</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 1.6fr 1.5fr;"><div class="dt-name">Latency</div><div class="dt-yes">In-process calls</div><div class="dt-no">Network hops</div><div>Favours monolith</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">The architecture I would propose — a hybrid</div>
          <div class="lyr-wrap"><div class="lyr-box" style="max-width:700px;">
            <div class="lyr-card"><b>Edge</b><span>CDN · API gateway · authentication</span></div>
            <div class="lyr-down">↓</div>
            <div class="lyr-grp hl"><b>Core platform — a modular monolith (one deployable, scaled horizontally)</b>
              <div class="lyr-grid c3">
                <div class="lyr-mini"><b>Catalogue</b><span>own schema</span></div>
                <div class="lyr-mini"><b>Enrolment and entitlements</b><span>own schema</span></div>
                <div class="lyr-mini"><b>Learning progress</b><span>own schema</span></div>
                <div class="lyr-mini"><b>Assessment and gradebook</b><span>own schema</span></div>
                <div class="lyr-mini"><b>Subscription and billing</b><span>own schema</span></div>
                <div class="lyr-mini"><b>Notifications</b><span>own schema</span></div>
              </div>
              <div class="lyr-cap" style="margin-top:8px;">modules talk through public contracts and in-process events with an outbox — never through each other's tables</div>
            </div>
            <div class="lyr-down">↓ events and queues (a broker)</div>
            <div class="lyr-two" style="gap:12px;">
              <div class="lyr-card"><b>Grading runners — separate deployable</b><span>untrusted code · own cluster and identity · autoscaled on queue depth</span></div>
              <div class="lyr-card"><b>Media pipeline — separate deployable</b><span>CPU-heavy transcoding · interruptible capacity</span></div>
            </div>
            <div class="lyr-down">↓</div>
            <div class="lyr-card"><b>Data</b><span>one database server with a schema per module · object storage · cache · search · warehouse</span></div>
          </div></div></div>

          <div class="ans-block"><div class="ans-label">How to build the monolith so that extraction is easy later</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Practice</div><div>Why it keeps the door open</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">One module per business domain</div><div>Boundaries follow the domain (bounded contexts), not technical layers</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Public contract per module</div><div>Other modules use only a small interface and its messages; internals are not visible</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Data ownership</div><div>Each module owns its schema and its own data context; no joins across module tables; no shared entities</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Events between modules</div><div>The same event contracts that would later cross a network; an outbox so publishing is reliable</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Enforced rules</div><div>Architecture tests fail the build if a module references another's internals</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Replaceable transport</div><div>An event-bus interface with an in-process implementation today and a broker implementation tomorrow</div></div>
          </div>
          <div class="code-box">src/
  Platform.Host/                  composition root, API, startup
  Modules/
    Catalogue/        Catalogue.Contracts   Catalogue.Core   Catalogue.Data (own schema)
    Enrolment/        Enrolment.Contracts   Enrolment.Core   Enrolment.Data
    Gradebook/        Gradebook.Contracts   Gradebook.Core   Gradebook.Data
    Billing/          Billing.Contracts     Billing.Core     Billing.Data
  Shared/             building blocks only (event bus abstraction, outbox, common types)
Rule: a module may reference another module's .Contracts project and nothing else.</div>
          <div class="code-box">// Architecture test: the build fails if Gradebook reaches into Enrolment's internals
[Fact]
public void Gradebook_must_not_depend_on_Enrolment_internals()
{
    var result = Types.InAssembly(typeof(GradebookModule).Assembly)
        .ShouldNot().HaveDependencyOn("Enrolment.Core")
        .And().ShouldNot().HaveDependencyOn("Enrolment.Data")
        .GetResult();
    Assert.True(result.IsSuccessful);
}

// The transport can change later without touching the modules
public interface IEventBus { Task PublishAsync&lt;T&gt;(T @event, CancellationToken ct); }
// InProcessEventBus today  ->  ServiceBusEventBus when a module is extracted</div></div>

          <div class="ans-block"><div class="ans-label">When I WOULD extract a module into its own service — evidence-based triggers</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Trigger</div><div>Signal</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Different scaling profile</div><div>One module needs far more capacity than the rest, and scaling the whole application wastes cost</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Different security or compliance boundary</div><div>It handles untrusted code or especially sensitive data and needs its own network, identity or audit scope</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Release contention</div><div>Teams block each other because everything ships together</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Different technology need</div><div>The best implementation uses another runtime (for example a machine-learning component)</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Ownership</div><div>A separate team owns it end to end and needs its own lifecycle</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Reliability blast radius</div><div>Its failures keep taking down unrelated features</div></div>
          </div>
          <div class="tip-box">✅ Use measured evidence — load, deployment frequency, incident history — not a feeling that microservices are the modern choice. Extraction is then a mechanical step because the boundaries, data ownership and events already exist.</div></div>

          <div class="ans-block"><div class="ans-label">What microservices cost — say it out loud</div>
          <ul>
            <li><strong>Distributed-system complexity</strong>: network failure, latency, retries, timeouts, partial failure.</li>
            <li><strong>Data consistency</strong>: no single transaction; eventual consistency and sagas.</li>
            <li><strong>Operations</strong>: many pipelines, deployments, configurations, certificates and dashboards.</li>
            <li><strong>Testing and debugging</strong>: contract tests, end-to-end tracing, environments that mirror production.</li>
            <li><strong>Platform skills and cost</strong>: container platform, service discovery, observability — a team needs this maturity first.</li>
            <li><strong>The distributed monolith</strong>: services that must be deployed together and share a database give you all the cost and none of the benefit.</li>
          </ul></div>

          <div class="ans-block"><div class="ans-label">Why my own platform differs — context decides</div>
          <p>On the Battery Swapping platform the architecture is event-driven microservices on AKS behind an API gateway, with an IoT and event pipeline feeding them, because it has independent domains, high-volume device telemetry and multi-region needs. For the university platform the drivers are different — a smaller initial team, one fast-moving product and only two parts with distinct runtime needs — so I recommend the modular monolith plus separate workers. The principle is the same: match the deployment architecture to the evidence.</p></div>

          <div class="warn-box">⚠️ If the interviewer pushes for microservices, do not just give in or just refuse. Say the boundaries and events are designed so extraction is cheap, name the specific parts that are deployed separately and why, and offer the measurable triggers that would split more.</div>
          <div class="tip-box">✅ Interview line: "A modular monolith can give us the modularity and the event-driven design — the difference is independent deployment, scaling and isolation, and that costs distributed-system complexity. So I would keep the core as a modular monolith with strict module contracts, data ownership and an outbox, deploy the grading runners and media pipeline separately because they need isolation and burst scaling, and extract anything else only when load, release contention or ownership proves it is needed." Related pages: Architecture and DDD, Microservices Architecture, and AM Tech Round 4 (moving between architectures safely).</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q15</div>
      <div class="qa-body">
        <div class="qa-question">How do we move the offline data into the online platform initially — the first bulk load?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — inventory it, choose the transfer method by volume and bandwidth, move it in verified waves into a landing zone, run it through the same processing pipeline as new content, and keep the lab running until the online copy is proven</div></div>

          <div class="ans-block"><div class="ans-label">The sequence</div>
          <div class="code-box">0  PREPARE        inventory + manifest, rights check, priorities, target structure and metadata
1  PILOT BATCH    one small course end to end: transfer, process, publish, view as a student
2  BULK TRANSFER  in waves by course, into a landing zone, integrity-checked
3  PROCESS        validate, scan, transcode, caption, index  (the Q5 pipeline)
4  PUBLISH        release each wave after review; internal students first
5  RECONCILE      compare the manifest with what is online; fix gaps; sign-off
6  SWITCH         lab access moves to online; keep the offline source until the sign-off period ends

Afterwards the same pipeline handles new content, and a scheduled sync catches anything changed offline.</div></div>

          <div class="ans-block"><div class="ans-label">Step 0 — The manifest is the plan</div>
          <p>List every item once, with the information the pipeline needs. Nothing is transferred that is not in the manifest, and nothing is published unless its rights flag allows it.</p>
          <div class="code-box">[
  { "id": "cs101-w03-lecture", "type": "video", "path": "/mnt/lab/content/cs101/w03.mp4",
    "sizeBytes": 2147483648, "sha256": "ab12...", "course": "CS101", "week": 3,
    "language": "en", "licence": "owned", "online": "allowed", "priority": 1 },
  { "id": "cs101-textbook", "type": "ebook", "path": "/mnt/lab/content/cs101/book.pdf",
    "sizeBytes": 52428800, "sha256": "cd34...", "course": "CS101",
    "licence": "publisher-lab-only", "online": "blocked-until-licensed", "priority": 2 }
]</div></div>

          <div class="ans-block"><div class="ans-label">Step 1 — Choose the transfer method by volume and bandwidth</div>
          <div class="code-box">Transfer time = data size / effective bandwidth

Illustrative example (replace with the real inventory and link speed):
  20 TB = 160,000 gigabits;  at an effective 0.2 Gbps  ->  800,000 s = about 9 days of continuous transfer
  and the lab still needs that link during the day -> realistically two to three weeks</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div>Method</div><div>Use when</div><div>Notes</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Network upload (parallel, resumable tools such as AzCopy)</div><div>Moderate volume or a fast link; transfer time is acceptable</div><div>Throttle during lab hours, run overnight and at weekends, verify checksums</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Dedicated link (VPN or private circuit)</div><div>Ongoing sync as well as the first load</div><div>Better predictability and security than the public internet</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Offline transfer appliance (for example Azure Data Box) or shipped encrypted drives</div><div>Very large volume, or a slow or shared link, or transfer would take weeks</div><div>Encrypted at rest; ship, load into cloud storage, then verify against the manifest</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Hybrid</div><div>A large backlog plus continuing new content</div><div>Appliance for the bulk, network for the delta and everything new</div></div>
          </div>
          <div class="code-box">// Network upload: parallel, resumable, with an MD5 stored on each file for verification
azcopy copy "/mnt/lab/content/cs101/*" "https://&lt;account&gt;.blob.core.windows.net/landing/cs101?&lt;SAS&gt;" --recursive --put-md5
// Later: copy only what changed
azcopy sync "/mnt/lab/content/cs101" "https://&lt;account&gt;.blob.core.windows.net/landing/cs101?&lt;SAS&gt;"</div></div>

          <div class="ans-block"><div class="ans-label">Step 2 — Land it safely</div>
          <ul>
            <li><strong>A landing zone</strong> that is separate from published content and private; content moves forward only after checks.</li>
            <li><strong>Integrity</strong>: compare each file's checksum with the manifest; re-transfer anything that does not match.</li>
            <li><strong>Resumable and idempotent</strong>: an interrupted transfer continues; running it twice does not create duplicates.</li>
            <li><strong>Security</strong>: encrypted in transit and at rest, short-lived access tokens, least-privilege accounts, an audit trail of who moved what.</li>
            <li><strong>Minimal impact on the lab</strong>: schedule transfers outside teaching hours and cap bandwidth.</li>
          </ul></div>

          <div class="ans-block"><div class="ans-label">Step 3 — Process the backlog</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Item</div><div>How the backlog is handled</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Video</div><div>Transcode into adaptive-bitrate renditions, thumbnails and captions. This is a large one-time compute job: run it on scalable, interruptible capacity, prioritise the most-used courses, and cap the spend with a budget</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Ebooks and articles</div><div>Convert to web formats, extract text for search, apply licence restrictions or DRM where the publisher requires it</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Metadata</div><div>Attach course, week, level, language and licence from the manifest; index for search</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Failures</div><div>Items that fail validation go to a quarantine list with the reason; the batch continues</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Step 4 — Publish in waves, then reconcile</div>
          <div class="code-box">Wave 0   pilot course                 -&gt; internal staff review, fix the process
Wave 1   high-use, rights-cleared    -&gt; internal students
Wave 2   remaining rights-cleared    -&gt; internal students, in batches by course
Wave 3   newly licensed items        -&gt; as rights are obtained
Wave 4   external launch content     -&gt; opened to subscribers

Reconciliation after each wave:
  items in the manifest        = items transferred + items quarantined + items deliberately excluded
  items transferred            = items processed and published
  checksums match; every item playable and searchable; metadata complete; accessibility checks passed</div></div>

          <div class="ans-block"><div class="ans-label">Risks and how to handle them</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.6fr;"><div>Risk</div><div>Mitigation</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Licences forbid online use</div><div>Check rights first; publish only cleared items; replace, restrict or license the rest</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Corrupt or missing files</div><div>Checksums against the manifest, quarantine, re-transfer</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Transfer takes longer than planned</div><div>Measure real throughput in the pilot; switch to an appliance for the bulk</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Transcoding cost overrun</div><div>Budget and alerts, prioritise by usage, produce only the renditions needed</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Poor metadata</div><div>Agree the schema first; sample-check each wave; fix at the source</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Lost or overwritten originals</div><div>Never delete the offline source until the sign-off period ends; keep a backup</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Student and course records — a separate, smaller load</div>
          <p>Student, enrolment and grade data is not bulk files. Integrate with the student information system, do an initial load with validation (counts, checksums, sampled records), then keep it in step with change capture or scheduled feeds, deciding which system is the source of truth for each data set during the transition. The same approach is described in AM Tech Round 4.</p></div>

          <div class="tip-box">✅ Interview line: "I would start with a manifest of every item, with checksums, rights and priorities. For the first load I calculate transfer time from volume and link speed: over the network with parallel resumable tools if that is acceptable, or an offline appliance for a large backlog, with a hybrid for continuing content. Files land in a private zone, are verified against the manifest, go through the same validation, transcoding and indexing pipeline as new content, and are published in waves with reconciliation after each. The lab stays available until the online copy is signed off." Related page: Cloud Migration Strategy, and Q5 above.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q16</div>
      <div class="qa-body">
        <div class="qa-question">When a technology or design is chosen, how do you choose and evaluate the best fit? Which tools or methods do you follow?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — turn the needs into testable quality scenarios, compare a few real options against weighted criteria after knocking out the ones that fail a must-have, prove the risky points with a time-boxed prototype, and record the decision so it can be revisited</div>
          <div class="qa-answer">"I treat it as an evidence-based decision, not a preference. First I make the requirements testable — quality-attribute scenarios with measurable responses — and note how reversible the decision is, because that sets how much effort it deserves. Then I shortlist two to four real options, apply knock-out criteria for the must-haves, and score the rest with a weighted decision matrix whose weights were agreed before scoring. For the uncertain or high-risk points I run a time-boxed proof of concept with success criteria set in advance, and for large decisions I hold an ATAM-style workshop to expose trade-offs and risks. I cross-check cost with a total-cost model and security with a threat model, record the outcome as an ADR, and add fitness functions so the choice keeps being verified."</div></div>

          <div class="ans-block"><div class="ans-label">The process</div>
          <div class="code-box">1  FRAME      what is being decided, and how hard is it to reverse?  (sets the depth of evaluation)
2  DRIVERS    architecturally significant requirements -&gt; quality-attribute scenarios, constraints
3  OPTIONS    2-4 real alternatives, including "keep what we have"
4  KNOCK OUT  drop any option that fails a hard constraint (security, compliance, budget, skills)
5  CRITERIA   agree the criteria and their weights BEFORE scoring, with the stakeholders
6  EVIDENCE   documentation review, references, benchmarks, a prototype or spike for the risky points
7  SCORE      weighted matrix; trade-off analysis; sensitivity check (does the winner change if weights move?)
8  RISK       cost model, threat model, failure modes, exit or lock-in plan
9  DECIDE     with the decision owners; record an ADR with the alternatives and the reasons
10 VERIFY     fitness functions in the pipeline; review the decision when the assumptions change</div></div>

          <div class="ans-block"><div class="ans-label">Match the effort to the decision</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.6fr 2fr;"><div>Decision type</div><div>Examples</div><div>Method and depth</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 2fr;"><div class="dt-name">Easy to reverse, low impact</div><div>A library, a tool, an internal pattern</div><div>Quick team discussion, a short note or ADR, try it</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 2fr;"><div class="dt-name">Moderate impact</div><div>A messaging product, a cache, a framework</div><div>Weighted matrix, a spike on the riskiest point, a cost estimate, ADR</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.6fr 2fr;"><div class="dt-name">Hard to reverse, high impact</div><div>Cloud platform, database, tenancy model, architecture style</div><div>Quality scenarios, ATAM-style workshop, PoC with benchmarks, total-cost model, threat model, review board, ADR</div></div>
          </div>
          <div class="tip-box">✅ Think of one-way and two-way doors: spend evaluation effort in proportion to the cost of being wrong and how hard it is to undo.</div></div>

          <div class="ans-block"><div class="ans-label">Methods I use — and when each fits</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div>Method</div><div>What it does</div><div>Use when</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div class="dt-name">Quality-attribute scenarios and a utility tree</div><div>Turns vague needs ("fast", "secure") into testable scenarios with stimulus, environment, response and a measurable target, ranked by importance and difficulty</div><div>Always — it is the input to everything else</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div class="dt-name">Weighted decision matrix</div><div>Scores options against weighted criteria after knock-outs</div><div>Most technology and design choices</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div class="dt-name">Pugh matrix</div><div>Compares each option with a baseline as better, same or worse per criterion</div><div>A fast first filter, or choosing against the current solution</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div class="dt-name">ATAM (Architecture Tradeoff Analysis Method)</div><div>A structured workshop with stakeholders that analyses the architecture against quality scenarios and surfaces risks, non-risks, sensitivity points and trade-off points</div><div>Significant, hard-to-reverse architecture decisions</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div class="dt-name">Proof of concept or spike</div><div>A time-boxed experiment against the riskiest assumption, with success criteria fixed up front</div><div>Unknown performance, integration or feasibility</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div class="dt-name">Benchmarking and load testing</div><div>Measures latency, throughput and resource use with a representative workload</div><div>Performance-driven choices</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div class="dt-name">Total-cost-of-ownership model</div><div>Build, run, licences, people, support and exit cost over several years, in scenarios</div><div>Build-versus-buy and cloud service choices</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div class="dt-name">Threat modelling (for example STRIDE)</div><div>Finds how each option can be attacked and what controls it needs</div><div>Anything touching identity, data or untrusted input</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div class="dt-name">Well-Architected review</div><div>Checks the design against reliability, security, cost, operations and performance pillars</div><div>Cloud designs before and after build</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div class="dt-name">Vendor and market evaluation</div><div>Roadmap, support and service levels, reference customers, licensing, exit plan, community health</div><div>Buying products or adopting open source</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div class="dt-name">Pre-mortem and risk register</div><div>Assume it failed in a year and list why; add mitigations</div><div>Before committing to a big choice</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div class="dt-name">Fitness functions</div><div>Automated checks in the pipeline that keep an architectural characteristic true over time</div><div>After the decision, to prevent drift</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.1fr 1.5fr;"><div class="dt-name">Technology radar</div><div>A shared view of what the organisation adopts, trials, assesses or holds</div><div>Consistency across teams</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">A quality-attribute scenario — the testable form of a requirement</div>
          <div class="code-box">Source:        a student submits a solution at the assignment deadline
Stimulus:      30,000 submissions arrive within one hour
Environment:   normal operation, term time
Artifact:      the grading service
Response:      each submission is graded and the result stored
Measure:       95% of results available within 2 minutes; no submission lost; no cross-submission access

Each candidate technology is then judged on how well it supports scenarios like this one.</div></div>

          <div class="ans-block"><div class="ans-label">Worked example — choosing how to isolate the student-code grading runners</div>
          <p>Step 1 is a knock-out: the runners execute untrusted code, so strong isolation is a must-have. Only then do the weights decide.</p>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.6fr 0.6fr 0.9fr 0.9fr 0.9fr 0.8fr;"><div>Criterion (score 1-5)</div><div>Weight</div><div>Hardened containers</div><div>Sandboxed containers</div><div>MicroVMs</div><div>Full VMs</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 0.6fr 0.9fr 0.9fr 0.9fr 0.8fr;"><div class="dt-name">Isolation strength</div><div>5</div><div class="dt-no">2</div><div>4</div><div>5</div><div>5</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 0.6fr 0.9fr 0.9fr 0.9fr 0.8fr;"><div class="dt-name">Start-up time</div><div>3</div><div>5</div><div>4</div><div>4</div><div>1</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 0.6fr 0.9fr 0.9fr 0.9fr 0.8fr;"><div class="dt-name">Cost per run</div><div>4</div><div>5</div><div>4</div><div>3</div><div>1</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 0.6fr 0.9fr 0.9fr 0.9fr 0.8fr;"><div class="dt-name">Operational simplicity</div><div>3</div><div>4</div><div>3</div><div>2</div><div>3</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 0.6fr 0.9fr 0.9fr 0.9fr 0.8fr;"><div class="dt-name">Language and tool support</div><div>3</div><div>5</div><div>4</div><div>4</div><div>5</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 0.6fr 0.9fr 0.9fr 0.9fr 0.8fr;"><div class="dt-name">Team skills</div><div>2</div><div>5</div><div>3</div><div>2</div><div>4</div></div>
            <div class="dt-row" style="grid-template-columns:1.6fr 0.6fr 0.9fr 0.9fr 0.9fr 0.8fr;"><div class="dt-name">Weighted total</div><div>20</div><div>82</div><div>75</div><div>71</div><div>64</div></div>
          </div>
          <div class="code-box">Illustrative scores only — replace them with your own evidence.

Hardened containers score highest overall (82) but FAIL the knock-out: isolation 2 is not acceptable
for untrusted code. A weighted total can hide a fatal weakness, which is why knock-outs come first.

Remaining options: sandboxed containers 75 versus microVMs 71 — close.
Sensitivity check: if isolation matters more, or the team can operate microVMs, the order flips.
-&gt; Run a short PoC on both with a representative workload: start-up time, cost per run, escape tests.
-&gt; Decide, record the ADR with the scores, the PoC results and the trade-offs accepted.</div></div>

          <div class="ans-block"><div class="ans-label">Designing the proof of concept</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Element</div><div>Practice</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Question</div><div>One specific uncertainty, for example "can microVMs start fast enough at deadline volume?"</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Success criteria</div><div>Measurable and agreed before starting, taken from the quality scenarios</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Time-box</div><div>Days, not months; stop when the question is answered</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Representative workload</div><div>Real or realistic data and load — not a hello-world</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Repeatable</div><div>Infrastructure as code and scripted tests so every option is measured the same way</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Outcome</div><div>A decision or a rejection with evidence; the prototype is thrown away, not shipped</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">After the decision — fitness functions keep it true</div>
          <div class="code-box">// Performance fitness function in CI (k6): the build fails if the agreed scenario is no longer met
import http from 'k6/http';
export const options = {
  scenarios: { deadline: { executor: 'constant-arrival-rate', rate: 20, timeUnit: '1s',
                            duration: '10m', preAllocatedVUs: 200 } },
  thresholds: { http_req_duration: ['p(95)&lt;500'], http_req_failed: ['rate&lt;0.01'] },
};
export default function () { http.post(__ENV.API + '/assignments/42/submissions', JSON.stringify({ code: 'print(1)' })); }</div>
          <div class="code-box">// Structure fitness function (.NET): modules must not depend on each other's internals
[Fact]
public void Billing_must_not_reference_Gradebook_internals()
{
    var result = Types.InAssembly(typeof(BillingModule).Assembly)
        .ShouldNot().HaveDependencyOn("Gradebook.Core").GetResult();
    Assert.True(result.IsSuccessful);
}</div></div>

          <div class="ans-block"><div class="ans-label">Tools I use</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.6fr;"><div>Purpose</div><div>Tools</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Capture and compare</div><div>A shared spreadsheet or document for matrices and scenarios; diagrams-as-code (for example Structurizr or PlantUML) for the options</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Record decisions</div><div>Architecture Decision Records as markdown in the repository, linked from pull requests</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Cost</div><div>The cloud provider's pricing calculator and cost-management tools; a simple scenario model in a spreadsheet</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Performance</div><div>k6, JMeter or Locust, and a managed load-testing service; telemetry from the prototype</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Security</div><div>A threat-modelling tool and checklists (STRIDE), plus scanning of the prototype</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Cloud design review</div><div>The Azure Well-Architected Framework assessment</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Repeatable experiments</div><div>Terraform or Bicep for the prototype environment; containers for portable test rigs</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.6fr;"><div class="dt-name">Ongoing verification</div><div>Architecture tests (NetArchTest or ArchUnit), pipeline quality gates, a technology radar</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Pitfalls and how I avoid them</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 2.6fr;"><div>Pitfall</div><div>Countermeasure</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Choosing by preference or hype</div><div>Evidence from scenarios, a prototype and references; record the reasons</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Setting weights after seeing the scores</div><div>Agree criteria and weights first, with stakeholders, then score</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">A high total hiding a fatal flaw</div><div>Knock-out criteria before scoring</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Comparing features, not qualities</div><div>Judge options against quality scenarios and operability, not feature lists</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Ignoring skills, cost to run and exit</div><div>Include team skills, total cost of ownership and a lock-in or exit plan as criteria</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">Analysis paralysis</div><div>Time-box, scale effort to reversibility, and accept "good enough" for easy-to-reverse choices</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 2.6fr;"><div class="dt-name">A decision that is never revisited</div><div>Record the assumptions in the ADR and review when they change; keep fitness functions running</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Anchor it in your own experience</div>
          <p>Use a real choice from your work — for example choosing IoT Hub with Event Hub for station telemetry, or AKS for the domain services on the Battery Swapping platform — and walk through the same steps: the drivers, the options, the deciding factor and what you recorded. See EPAM Round 1, Q9, for that platform's choices; say what you actually evaluated and use "I would" for any method you have not yet used, such as a full ATAM workshop.</p></div>

          <div class="tip-box">✅ Interview line: "I make the needs testable with quality scenarios, shortlist real options, knock out any that fail a must-have, and score the rest with weights agreed beforehand. For the risky points I run a time-boxed proof of concept with success criteria set in advance, and for big decisions an ATAM-style workshop to surface trade-offs. I check cost with a total-cost model and security with a threat model, record the result as an ADR, and keep it honest with fitness functions in the pipeline. The effort is proportional to how hard the decision is to reverse." Related pages: Architecture Decision Records, NFR and Quality Attributes, Azure Well-Architected Framework, and EPAM Round 1 Q9.</div>
        </div>
      </div>
    </div>

  </div>
`;
