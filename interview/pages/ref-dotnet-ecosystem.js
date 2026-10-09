window.Pages['ref-dotnet-ecosystem'] = (function () {
  // Every item from the "Modern .NET Backend Ecosystem" infographic, grouped by its 11 categories.
  var cats = [
    { name: "Web & APIs", icon: "🌐", tag: "How requests get in", items: [
      ["ASP.NET Core", "Cross-platform web framework on Kestrel — MVC controllers, Razor, Minimal APIs and the middleware pipeline", "The default foundation for almost every .NET web or API workload"],
      ["Minimal APIs", "Lightweight endpoint style (MapGet / MapPost) without controllers", "Small services and microservices — less ceremony, fast startup"],
      ["FastEndpoints", "Endpoint-per-class library (REPR pattern) built on the minimal-API pipeline", "Vertical-slice structure with binding and validation built in"],
      ["Carter", "Module-based routing on top of minimal APIs (ICarterModule)", "Organise minimal APIs into modules without going back to controllers"],
      ["gRPC .NET", "HTTP/2 plus Protobuf RPC (Grpc.AspNetCore)", "Internal service-to-service calls needing low latency and strict contracts"],
      ["Hot Chocolate", "GraphQL server for .NET", "Clients need to shape their own queries across several data sources"],
      ["SignalR", "Real-time messaging over WebSockets, with Server-Sent Events / long-polling fallback", "Live dashboards, notifications, chat — scale out with a Redis or Azure SignalR backplane"],
      ["YARP", "Yet Another Reverse Proxy — Microsoft's configurable reverse-proxy library", "API gateway or BFF (Backend For Frontend), routing and load balancing in code you own"],
      ["Scalar", "Modern interactive API reference UI for OpenAPI documents", "An alternative to Swagger UI on top of the built-in OpenAPI document generation"]
    ]},
    { name: "Data Access", icon: "🗄️", tag: "Talking to the database", items: [
      ["EF Core", "Entity Framework Core — the full ORM (Object-Relational Mapper) with LINQ, change tracking and migrations", "Default for most CRUD and domain models; productive and well supported"],
      ["Dapper", "Micro-ORM — you write SQL, it maps rows to objects", "Hot read paths, reporting queries and stored procedures where you want full SQL control"],
      ["Npgsql", "The PostgreSQL ADO.NET driver, also the EF Core provider for PostgreSQL", "Required whenever the database is PostgreSQL"],
      ["linq2db", "LINQ to DB — a thin, fast LINQ-based data layer closer to SQL than EF Core", "When you want LINQ but need leaner SQL and bulk operations"],
      ["Marten", "Document database and event store built on PostgreSQL", "Document storage or event sourcing without adding a separate NoSQL database"],
      ["SqlKata", "Fluent SQL query builder", "Building dynamic SQL safely without string concatenation"],
      ["EFCore.BulkExtensions", "Bulk insert / update / delete extensions for EF Core", "Large batch writes where SaveChanges one row at a time is too slow"],
      ["FluentMigrator", "Code-based database migrations written in C#", "Schema versioning independent of an ORM, or alongside Dapper"]
    ]},
    { name: "Messaging", icon: "📨", tag: "Async communication between services", items: [
      ["MassTransit", "Message-bus abstraction over RabbitMQ, Azure Service Bus, Amazon SQS and others, with sagas and the outbox", "Event-driven services without coding against each broker SDK — check current licensing for newer major versions"],
      ["Wolverine", "Messaging plus mediator framework from the Marten / JasperFx team with a durable outbox", "Handler-based messaging with low ceremony, pairs naturally with Marten"],
      ["NServiceBus", "Mature commercial service bus with strong saga, retry and monitoring tooling", "Enterprise systems that value tooling and vendor support — commercial licence"],
      ["Rebus", "Lean, simple service bus", "When MassTransit feels heavy and you want a small footprint"],
      ["Brighter", "Command processor and dispatcher implementing CQRS (Command Query Responsibility Segregation) with an outbox", "Command-oriented designs with pluggable transports"],
      ["CAP", "DotNetCore.CAP — event bus built on the local message table (outbox) pattern", "Keeping a database write and an event publish consistent without a distributed transaction"],
      ["RabbitMQ Client", "The official RabbitMQ.Client library", "Direct control of exchanges, queues and channels with no abstraction layer"],
      ["Confluent Kafka", "Confluent.Kafka — the .NET client for Apache Kafka", "High-throughput event streaming and replayable logs"]
    ]},
    { name: "Caching", icon: "⚡", tag: "Avoid repeating expensive work", items: [
      ["HybridCache", "Built-in two-level cache (in-memory L1 plus distributed L2) with stampede protection", "The modern default for new code on .NET 9 and later"],
      ["FusionCache", "Hybrid cache with fail-safe, soft timeouts and a backplane for syncing nodes", "Resilience-focused caching across multiple instances"],
      ["IMemoryCache", "Built-in in-process memory cache", "Single-instance apps or per-pod data that is cheap to rebuild"],
      ["Output Caching", "ASP.NET Core middleware that caches whole HTTP responses", "Caching rendered endpoint responses by route, query and tag"],
      ["StackExchange.Redis", "The standard .NET Redis client", "Shared distributed cache, locks and pub/sub — create one ConnectionMultiplexer and reuse it"],
      ["Garnet", "Redis-compatible cache store from Microsoft Research, written in C#", "A high-performance Redis-protocol alternative you can host yourself"],
      ["EasyCaching", "Caching abstraction over several providers", "Switching cache providers behind one API"]
    ]},
    { name: "Resilience", icon: "🛡️", tag: "Surviving failures and overload", items: [
      ["Polly", "Retry, circuit breaker, timeout, bulkhead, hedging and fallback strategies", "Any outbound call that can fail transiently"],
      ["Http Resilience", "Microsoft.Extensions.Http.Resilience — ready-made Polly pipelines for HttpClient", "Standard resilience on HttpClient with one line of configuration"],
      ["Simmy Chaos", "Chaos-engineering strategies (fault, latency, outcome injection) for Polly", "Proving your resilience policies actually work before production does"],
      ["Rate Limiter", "System.Threading.RateLimiting and the ASP.NET Core rate-limiting middleware", "Protecting your API from abuse and noisy neighbours"],
      ["Health Checks", "Liveness and readiness endpoints (Microsoft.Extensions.Diagnostics.HealthChecks)", "Kubernetes probes and load-balancer decisions"],
      ["Service Discovery", "Microsoft.Extensions.ServiceDiscovery — resolve service names to endpoints", "Service-to-service calls without hard-coded URLs"],
      ["Steeltoe", "Cloud-native libraries for configuration, discovery and management endpoints", "Spring-Cloud-style patterns in .NET, often in existing enterprise estates"]
    ]},
    { name: "Observability", icon: "🔭", tag: "Seeing what the system is doing", items: [
      ["OpenTelemetry", "Vendor-neutral traces, metrics and logs", "The standard instrumentation layer — export to any backend"],
      ["Serilog", "Structured logging with many sinks", "Default structured logger for most teams"],
      ["NLog", "Mature, flexible logging framework", "Existing NLog estates, or teams that prefer its configuration model"],
      ["Seq", "Structured-log server with search and dashboards", "Searching Serilog output, especially in development and small environments"],
      ["Aspire Dashboard", "Standalone dashboard for OpenTelemetry (OTLP) traces, metrics and logs", "Local development and lightweight observability with no extra stack"],
      ["prometheus-net", "Prometheus metrics exporter for .NET", "Exposing custom metrics to Prometheus and Grafana"],
      ["dotnet-counters", "CLI tool for live runtime counters", "Watching ThreadPool, GC and request counters on a running process — used when diagnosing starvation"]
    ]},
    { name: "Security", icon: "🔐", tag: "Who you are and what you may do", items: [
      ["ASP.NET Identity", "Built-in user, password, role and external-login membership system", "Apps that own their own user store"],
      ["Duende IdentityServer", "OpenID Connect and OAuth 2.0 server framework", "Running your own identity provider — commercial licence above certain thresholds"],
      ["OpenIddict", "Open-source OpenID Connect server framework", "A free alternative for hosting your own OpenID Connect / OAuth server"],
      ["Keycloak", "Open-source identity and access management server (not .NET)", "Self-hosted IdP with SSO, federation and admin UI"],
      ["Entra ID", "Microsoft's cloud identity platform (formerly Azure AD)", "Managed identity for Azure-centred or Microsoft 365 organisations"],
      ["JWT Bearer", "Microsoft.AspNetCore.Authentication.JwtBearer — validates access tokens on APIs", "Protecting APIs with tokens issued by any OpenID Connect provider"],
      ["Data Protection", "ASP.NET Core Data Protection APIs for encrypting cookies, tokens and anti-forgery data", "Needs a shared key ring when running multiple instances"]
    ]},
    { name: "Background Jobs", icon: "⏱️", tag: "Work outside the request", items: [
      ["Hangfire", "Persistent background jobs with retries and a built-in dashboard", "Fire-and-forget, delayed and recurring jobs that must survive restarts"],
      ["Quartz.NET", "Full-featured scheduler with cron expressions and clustering", "Complex schedules and clustered job execution"],
      ["TickerQ", "Newer background-task scheduler for .NET", "Evaluate as a modern, lighter alternative — check maturity for your needs"],
      ["Coravel", "Lightweight scheduling, queueing and mailing helpers", "Small apps wanting simple recurring tasks with little setup"],
      ["NCronJob", "Minimal cron-job scheduler for .NET", "Straightforward cron schedules without a persistent store"],
      ["BackgroundService", "Built-in hosted-service base class (IHostedService)", "Long-running workers inside the host, no extra library"],
      ["Channels", "System.Threading.Channels — in-memory async producer/consumer queues", "Handing work from request threads to a BackgroundService without blocking"]
    ]},
    { name: "App Layer", icon: "🧩", tag: "Structuring application code", items: [
      ["FluentValidation", "Fluent rule-based validation", "Keeping input validation out of controllers and handlers"],
      ["Mapperly", "Source-generator object mapper — mapping code is generated at compile time", "Fast, reflection-free mapping that is easy to debug"],
      ["Mapster", "Fast object mapper with simple configuration", "A lightweight alternative to AutoMapper"],
      ["AutoMapper", "Convention-based reflection mapper", "Existing codebases — check licensing for current versions before adopting in new work"],
      ["MediatR", "In-process mediator (request / handler / notification) pattern — flagged in the infographic as paid from v13", "Decoupling handlers from callers; weigh licence cost and whether you need it at all"],
      ["Mediator", "Source-generated mediator library", "A MediatR-style API with generated code, for teams avoiding the paid option"],
      ["ErrorOr", "Result type that returns either a value or errors", "Expected failures as return values instead of exceptions"],
      ["Scrutor", "Assembly scanning and decoration for the DI container", "Registering many services by convention and wrapping them with decorators"]
    ]},
    { name: "Testing", icon: "🧪", tag: "Proving it works", items: [
      ["xUnit v3", "Widely used test framework, now at version 3", "Default choice for most .NET projects"],
      ["TUnit", "Modern source-generated test framework with parallelism built in", "New projects wanting a newer model; check team familiarity"],
      ["NUnit", "Long-established test framework", "Existing NUnit suites or teams that prefer its attributes"],
      ["Testcontainers", "Disposable Docker containers started from test code", "Integration tests against real databases and brokers instead of mocks"],
      ["WireMock.Net", "HTTP mock server", "Faking third-party APIs in integration tests"],
      ["Respawn", "Resets database state between tests by clearing data", "Fast clean slate for database integration tests"],
      ["NSubstitute", "Friendly mocking library", "Unit tests that isolate a class from its dependencies"],
      ["Bogus", "Fake data generator", "Realistic test data and seeding"]
    ]},
    { name: "Cloud & DevOps", icon: "☁️", tag: "Packaging, running and shipping", items: [
      ["Aspire", "Application model and tooling for composing distributed .NET apps — formerly .NET Aspire", "Local orchestration of services, databases and observability during development"],
      ["Dapr", "Distributed Application Runtime — sidecar APIs for state, pub/sub, bindings and secrets", "Portable building blocks across languages and brokers, at the cost of an extra sidecar"],
      ["Docker", "Container packaging", "Standard unit of deployment for .NET services"],
      ["Kubernetes", "Container orchestration platform", "Many services, custom scaling and portability — see the AKS vs App Service comparison"],
      ["Azure Container Apps", "Managed serverless container platform with KEDA scaling and Dapr support", "Container workloads without running a Kubernetes cluster"],
      ["AWS Lambda", "AWS serverless functions with a .NET runtime", "Event-driven code on AWS; mind cold starts"],
      ["GitHub Actions", "CI/CD (Continuous Integration / Continuous Delivery) workflows in GitHub", "Build, test, scan and deploy pipelines next to the code"],
      ["Native AOT", "Ahead-of-time compilation to a native binary", "Fast startup and small footprint for serverless; restricts reflection-heavy libraries"],
      ["Pulumi", "Infrastructure as Code in general-purpose languages including C#", "Defining cloud infrastructure in the same language as the app"]
    ]}
  ];

  var total = cats.reduce(function (n, c) { return n + c.items.length; }, 0);

  var glance = cats.map(function (c) {
    return '<div class="principle-card"><div class="principle-icon">' + c.icon + '</div>' +
      '<div class="principle-name">' + c.name.replace("&", "&amp;") + ' (' + c.items.length + ')</div><p>' + c.tag + '</p></div>';
  }).join("");

  var tables = cats.map(function (c, i) {
    var cols = "grid-template-columns:1fr 2.2fr 2fr;";
    var rows = c.items.map(function (it) {
      return '<div class="dt-row" style="' + cols + '"><div class="dt-name">' + it[0] + '</div><div>' + it[1] + '</div><div>' + it[2] + '</div></div>';
    }).join("");
    return '<div class="ref-section"><div class="ref-title">' + (i + 1) + '. ' + c.icon + ' ' + c.name.replace("&", "&amp;") + ' — ' + c.tag + '</div>' +
      '<div class="ref-body"><div class="decision-table">' +
      '<div class="dt-row dt-header" style="' + cols + '"><div>Tool</div><div>What It Is</div><div>Pick It When</div></div>' + rows +
      '</div></div></div>';
  }).join("");

  var head =
    '<div class="page-header"><div class="breadcrumb">Deep Dive › <span>Modern .NET Backend Ecosystem</span></div>' +
    '<h1>🧰 The Modern .NET Backend Ecosystem</h1>' +
    '<p>' + total + ' libraries and tools across 11 categories — what each one is and when to reach for it</p></div>' +

    '<div class="ref-section"><div class="ref-title">At A Glance</div><div class="ref-body">' +
    '<div class="principle-grid">' + glance + '</div>' +
    '<div class="tip-box">✅ Interview framing: "The .NET backend ecosystem is rich enough that the skill is not knowing every library — it is knowing which layer each one solves, picking one per layer, and being able to say why. I default to the built-in option first and add a library only when it removes real work or risk."</div>' +
    '<div class="tip-box">Source: infographic by Abhishek Suman. Descriptions below are written for interview preparation — check the official docs and licence terms before adopting a library.</div>' +
    '</div></div>' +

    '<div class="ref-section"><div class="ref-title">Diagram — How The Layers Fit Together In One Service</div><div class="ref-body">' +
    '<div class="code-box">                         Client / Browser / Other Services\n' +
    '                                   │\n' +
    '   ┌───────────────────────────────▼────────────────────────────────┐\n' +
    '   │ WEB &amp; APIs   YARP · ASP.NET Core · Minimal APIs · gRPC · SignalR │\n' +
    '   │ SECURITY     Entra ID / OpenIddict · JWT Bearer · Data Protection │\n' +
    '   │ RESILIENCE   Rate Limiter · Health Checks · Polly / Http Resilience │\n' +
    '   └───────────────────────────────┬────────────────────────────────┘\n' +
    '                                   │\n' +
    '   ┌───────────────────────────────▼────────────────────────────────┐\n' +
    '   │ APP LAYER    FluentValidation · Mapperly · ErrorOr · Scrutor    │\n' +
    '   └──────┬──────────────────┬──────────────────┬───────────────────┘\n' +
    '          │                  │                  │\n' +
    '   ┌──────▼──────┐   ┌───────▼───────┐   ┌──────▼────────────┐\n' +
    '   │ DATA ACCESS │   │   CACHING     │   │    MESSAGING      │\n' +
    '   │ EF Core     │   │ HybridCache   │   │ MassTransit /     │\n' +
    '   │ Dapper      │   │ Redis/Garnet  │   │ Wolverine →       │\n' +
    '   │ Npgsql      │   └───────────────┘   │ RabbitMQ / Kafka  │\n' +
    '   └─────────────┘                       └──────┬────────────┘\n' +
    '                                                │\n' +
    '                                   ┌────────────▼────────────┐\n' +
    '                                   │ BACKGROUND JOBS         │\n' +
    '                                   │ BackgroundService +     │\n' +
    '                                   │ Channels / Hangfire     │\n' +
    '                                   └─────────────────────────┘\n\n' +
    '   Across ALL layers:  OBSERVABILITY  OpenTelemetry · Serilog · Seq · Aspire Dashboard\n' +
    '   Around the service: TESTING  xUnit · Testcontainers · Respawn · NSubstitute · Bogus\n' +
    '                       CLOUD &amp; DEVOPS  Docker · Kubernetes / Container Apps · GitHub Actions · Aspire</div>' +
    '</div></div>' +

    '<div class="ref-section"><div class="ref-title">Quick Recall — One Line Per Category (Memory Aid)</div><div class="ref-body">' +
    '<div class="code-box">1. Web &amp; APIs        ASP.NET Core • Minimal APIs • FastEndpoints • Carter • gRPC • SignalR • YARP\n' +
    '2. Data Access       EF Core • Dapper • Npgsql • Marten • SqlKata • FluentMigrator\n' +
    '3. Messaging         MassTransit • Wolverine • NServiceBus • Rebus • RabbitMQ • Kafka\n' +
    '4. Caching           HybridCache • FusionCache • IMemoryCache • Output Caching • StackExchange.Redis\n' +
    '5. Resilience        Polly • HTTP Resilience • Rate Limiting • Health Checks • Service Discovery\n' +
    '6. Observability     OpenTelemetry • Serilog • NLog • Seq • Aspire Dashboard • Prometheus\n' +
    '7. Security          ASP.NET Identity • Duende IdentityServer • OpenIddict • Keycloak • JWT Bearer\n' +
    '8. Background Jobs   Hangfire • Quartz.NET • Coravel • BackgroundService • Channels\n' +
    '9. App Layer         FluentValidation • Mapperly • Mapster • MediatR • ErrorOr • Scrutor\n' +
    '10. Testing          xUnit • NUnit • TUnit • Testcontainers • WireMock.Net • Respawn\n' +
    '11. Cloud &amp; DevOps   Aspire • Docker • Kubernetes • Azure • AWS Lambda • GitHub Actions</div>' +
    '<div class="tip-box">✅ This is the short version to memorise — the sections below give the full list for each category with what every tool is and when to pick it.</div>' +
    '</div></div>' +

    tables +

    '<div class="ref-section"><div class="ref-title">Pick One Per Layer — Overlapping Choices</div><div class="ref-body">' +
    '<div class="decision-table">' +
    '<div class="dt-row dt-header" style="grid-template-columns:1fr 2fr 2.2fr;"><div>Layer</div><div>Overlapping Options</div><div>How To Decide</div></div>' +
    '<div class="dt-row" style="grid-template-columns:1fr 2fr 2.2fr;"><div class="dt-name">Object mapping</div><div>Mapperly · Mapster · AutoMapper</div><div>Prefer compile-time generation (Mapperly) for speed and debuggability; AutoMapper mostly for existing code</div></div>' +
    '<div class="dt-row" style="grid-template-columns:1fr 2fr 2.2fr;"><div class="dt-name">Mediator pattern</div><div>MediatR · Mediator · Wolverine</div><div>Ask whether you need it at all — plain services are often enough. Weigh licensing</div></div>' +
    '<div class="dt-row" style="grid-template-columns:1fr 2fr 2.2fr;"><div class="dt-name">Message bus</div><div>MassTransit · Wolverine · NServiceBus · Rebus · Brighter · CAP</div><div>Match to team skill, licensing, outbox and saga needs; use raw RabbitMQ / Kafka clients only when you need full broker control</div></div>' +
    '<div class="dt-row" style="grid-template-columns:1fr 2fr 2.2fr;"><div class="dt-name">Caching</div><div>HybridCache · FusionCache · IMemoryCache · EasyCaching</div><div>HybridCache by default; FusionCache when you need fail-safe and a backplane</div></div>' +
    '<div class="dt-row" style="grid-template-columns:1fr 2fr 2.2fr;"><div class="dt-name">Data access</div><div>EF Core · Dapper · linq2db · SqlKata</div><div>EF Core for the write model, Dapper or raw SQL for hot reads — mixing both is normal</div></div>' +
    '<div class="dt-row" style="grid-template-columns:1fr 2fr 2.2fr;"><div class="dt-name">Logging</div><div>Serilog · NLog</div><div>Pick one per solution; both work with OpenTelemetry</div></div>' +
    '<div class="dt-row" style="grid-template-columns:1fr 2fr 2.2fr;"><div class="dt-name">Job scheduling</div><div>Hangfire · Quartz.NET · TickerQ · Coravel · NCronJob · BackgroundService</div><div>Need persistence and a dashboard: Hangfire or Quartz. Simple in-process loop: BackgroundService plus Channels</div></div>' +
    '<div class="dt-row" style="grid-template-columns:1fr 2fr 2.2fr;"><div class="dt-name">Identity provider</div><div>Entra ID · Keycloak · OpenIddict · Duende IdentityServer</div><div>Managed (Entra ID) unless you must self-host; then licence cost decides Duende vs OpenIddict</div></div>' +
    '<div class="dt-row" style="grid-template-columns:1fr 2fr 2.2fr;"><div class="dt-name">Test framework</div><div>xUnit · NUnit · TUnit</div><div>Follow the team default; do not mix frameworks in one solution</div></div>' +
    '</div>' +
    '<div class="warn-box">⚠️ Licensing is changing in this ecosystem. The infographic itself flags MediatR as paid from v13. Libraries such as AutoMapper, MassTransit (newer major versions), NServiceBus and Duende IdentityServer have commercial terms or have moved toward them — verify the current licence for the exact version before putting any of them in a new project.</div>' +
    '</div></div>' +

    '<div class="ref-section"><div class="ref-title">A Sensible Default Stack (Opinion — Adjust To Your Team)</div><div class="ref-body">' +
    '<div class="code-box">Web &amp; APIs      ASP.NET Core + Minimal APIs (or controllers) · YARP at the edge\n' +
    'Data Access     EF Core for writes · Dapper for hot reads · Npgsql for PostgreSQL\n' +
    'Messaging       MassTransit or Wolverine over Azure Service Bus / RabbitMQ · Kafka for streams\n' +
    'Caching         HybridCache + Redis\n' +
    'Resilience      Http Resilience (Polly) · Health Checks · Rate Limiter\n' +
    'Observability   OpenTelemetry + Serilog + Seq (Aspire Dashboard locally)\n' +
    'Security        Entra ID + JWT Bearer · Data Protection with a shared key ring\n' +
    'Background      BackgroundService + Channels · Hangfire when persistence is needed\n' +
    'App Layer       FluentValidation · Mapperly · ErrorOr\n' +
    'Testing         xUnit + Testcontainers + Respawn + NSubstitute + Bogus\n' +
    'Cloud &amp; DevOps  Docker · AKS or Container Apps · GitHub Actions · Aspire for local orchestration</div>' +
    '</div></div>' +

    '<div class="ref-section"><div class="ref-title">Interview Answers</div><div class="ref-body">' +
    '<div class="qa-card"><div class="qa-body"><div class="qa-question">Which .NET libraries would you choose to build a new microservice, and why?</div>' +
    '<div class="qa-answer">"I start with the built-in pieces — ASP.NET Core with minimal APIs, HybridCache, Health Checks, the rate limiter and BackgroundService — and only add a library when it removes real work or risk. EF Core for the write model with Dapper for hot read paths, MassTransit or Wolverine for messaging with an outbox so a database write and an event publish stay consistent, Http Resilience on every outbound HttpClient, and OpenTelemetry with Serilog for observability so I can trace a request across services. Identity comes from Entra ID with JWT Bearer validation. For tests I use xUnit with Testcontainers and Respawn so integration tests hit a real database. I keep each choice behind an abstraction where it is volatile, and I check licensing on anything commercial before adopting it."</div></div></div>' +
    '<div class="qa-card"><div class="qa-body"><div class="qa-question">EF Core or Dapper?</div>' +
    '<div class="qa-answer">"Both, for different jobs. EF Core gives productivity, change tracking and migrations for the write model and domain logic. Dapper gives full SQL control and lower overhead for hot read paths, reports and stored procedures. Mixing them in one service is normal — the discipline is keeping data-access behind repositories or query handlers so the choice stays local."</div></div></div>' +
    '<div class="qa-card"><div class="qa-body"><div class="qa-question">Should every project use MediatR and AutoMapper?</div>' +
    '<div class="qa-answer">"No. They add indirection, and both now have licensing considerations for current versions. A mediator is worth it when you genuinely want a pipeline of cross-cutting behaviours around handlers; for many services a plain application service is simpler. For mapping I prefer source-generated options like Mapperly, which are faster and show the mapping code at compile time. I treat both as optional, not as defaults."</div></div></div>' +
    '</div></div>';

  return head;
})();
