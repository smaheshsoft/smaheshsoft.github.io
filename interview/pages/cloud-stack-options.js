window.Pages['cloud-stack-options'] = `
<div class="page-header">
  <div class="breadcrumb">Cloud Services › <span>System Stack Options</span></div>
  <h1>🧱 Build Any System — Cloud Stack Options</h1>
  <p>Every layer of a production system with all available cloud-native options across Azure, AWS, and GCP — pick your stack before you design</p>
</div>

<style>
.so-section { margin-bottom: 28px; }
.so-layer-title {
  font-size: 13px; font-weight: 800; color: var(--text);
  padding: 10px 14px; background: var(--surface2);
  border-left: 4px solid var(--accent);
  border-radius: 0 6px 6px 0; margin-bottom: 0;
  letter-spacing: 0.3px;
}
.so-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.so-table th {
  padding: 8px 12px; text-align: left; font-weight: 700; font-size: 11px;
  text-transform: uppercase; letter-spacing: 0.7px;
  border: 1px solid var(--border); background: var(--bg);
}
.so-table td {
  padding: 9px 12px; vertical-align: top;
  border: 1px solid var(--border); line-height: 1.6;
}
.so-table tr:nth-child(even) td { background: var(--surface2); }
.so-option { display: inline-block; margin: 2px 3px 2px 0; padding: 2px 8px;
  border-radius: 4px; font-size: 11px; font-weight: 600; white-space: nowrap; }
.opt-azure { background: #1e3a5f; color: #60a5fa; }
.opt-aws   { background: #3d1f0a; color: #fb923c; }
.opt-gcp   { background: #0f2d1a; color: #4ade80; }
.opt-oss   { background: #1e1e2e; color: #c084fc; }
.so-note   { font-size: 11px; color: var(--muted); margin-top: 4px; font-style: italic; }
.th-azure  { color: #60a5fa !important; }
.th-aws    { color: #fb923c !important; }
.th-gcp    { color: #4ade80 !important; }
.th-oss    { color: #c084fc !important; }
.th-layer  { color: var(--text) !important; width: 160px; }
.so-tag    { font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 3px; margin-left: 4px; vertical-align: middle; }
.tag-managed  { background: #14532d; color: #86efac; }
.tag-serverless { background: #4a044e; color: #f0abfc; }
.tag-oss      { background: #1e1b4b; color: #a5b4fc; }
</style>

<!-- HOW TO READ -->
<div class="alert tip" style="margin-bottom:20px;">
  <strong>💡 How to use this page</strong>
  <p>Each section is one <strong>architectural layer</strong> of any system. Each row is a sub-capability within that layer. Pick one option per row to form your stack. Mix clouds freely — most real systems are multi-cloud or use OSS tools alongside managed services.</p>
  <div style="display:flex;gap:12px;margin-top:8px;flex-wrap:wrap;">
    <span class="so-option opt-azure">Azure option</span>
    <span class="so-option opt-aws">AWS option</span>
    <span class="so-option opt-gcp">GCP option</span>
    <span class="so-option opt-oss">Open Source / Cloud-agnostic</span>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- 1. FRONTEND -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="ref-section so-section">
  <div class="ref-title">🖥️ 1. Frontend / UI Layer</div>
  <div class="ref-body" style="padding:0;">
    <table class="so-table">
      <thead><tr>
        <th class="th-layer">Sub-Layer</th>
        <th class="th-azure">🔷 Azure</th>
        <th class="th-aws">🟧 AWS</th>
        <th class="th-gcp">🟢 GCP</th>
        <th class="th-oss">🟣 OSS / Any Cloud</th>
      </tr></thead>
      <tbody>
        <tr><td><strong>Static Site Hosting</strong></td>
          <td><span class="so-option opt-azure">Static Web Apps</span><span class="so-option opt-azure">Blob Storage + CDN</span></td>
          <td><span class="so-option opt-aws">S3 + CloudFront</span><span class="so-option opt-aws">Amplify Hosting</span></td>
          <td><span class="so-option opt-gcp">Firebase Hosting</span><span class="so-option opt-gcp">Cloud Storage + CDN</span></td>
          <td><span class="so-option opt-oss">Vercel</span><span class="so-option opt-oss">Netlify</span><span class="so-option opt-oss">Cloudflare Pages</span></td>
        </tr>
        <tr><td><strong>Server-Side Rendering (SSR)</strong></td>
          <td><span class="so-option opt-azure">App Service</span><span class="so-option opt-azure">Container Apps</span></td>
          <td><span class="so-option opt-aws">App Runner</span><span class="so-option opt-aws">Elastic Beanstalk</span></td>
          <td><span class="so-option opt-gcp">Cloud Run</span><span class="so-option opt-gcp">App Engine</span></td>
          <td><span class="so-option opt-oss">Vercel (Next.js)</span><span class="so-option opt-oss">Fly.io</span></td>
        </tr>
        <tr><td><strong>CDN / Edge Delivery</strong></td>
          <td><span class="so-option opt-azure">Azure Front Door</span><span class="so-option opt-azure">Azure CDN</span></td>
          <td><span class="so-option opt-aws">CloudFront</span></td>
          <td><span class="so-option opt-gcp">Cloud CDN</span><span class="so-option opt-gcp">Media CDN</span></td>
          <td><span class="so-option opt-oss">Cloudflare</span><span class="so-option opt-oss">Fastly</span><span class="so-option opt-oss">Akamai</span></td>
        </tr>
        <tr><td><strong>Mobile Apps</strong></td>
          <td><span class="so-option opt-azure">App Center (CI/CD)</span></td>
          <td><span class="so-option opt-aws">Amplify (Auth/API)</span><span class="so-option opt-aws">Device Farm (testing)</span></td>
          <td><span class="so-option opt-gcp">Firebase (Auth/DB/Push)</span></td>
          <td><span class="so-option opt-oss">React Native</span><span class="so-option opt-oss">Flutter</span><span class="so-option opt-oss">Expo</span></td>
        </tr>
        <tr><td><strong>DNS</strong></td>
          <td><span class="so-option opt-azure">Azure DNS</span></td>
          <td><span class="so-option opt-aws">Route 53</span></td>
          <td><span class="so-option opt-gcp">Cloud DNS</span></td>
          <td><span class="so-option opt-oss">Cloudflare DNS</span><span class="so-option opt-oss">NS1</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- 2. API GATEWAY / EDGE -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="ref-section so-section">
  <div class="ref-title">🔀 2. API Gateway &amp; Load Balancing</div>
  <div class="ref-body" style="padding:0;">
    <table class="so-table">
      <thead><tr>
        <th class="th-layer">Sub-Layer</th>
        <th class="th-azure">🔷 Azure</th>
        <th class="th-aws">🟧 AWS</th>
        <th class="th-gcp">🟢 GCP</th>
        <th class="th-oss">🟣 OSS / Any Cloud</th>
      </tr></thead>
      <tbody>
        <tr><td><strong>API Gateway (REST/HTTP)</strong></td>
          <td><span class="so-option opt-azure">API Management</span></td>
          <td><span class="so-option opt-aws">API Gateway (REST)</span><span class="so-option opt-aws">API Gateway (HTTP)</span></td>
          <td><span class="so-option opt-gcp">Apigee</span><span class="so-option opt-gcp">Cloud Endpoints</span></td>
          <td><span class="so-option opt-oss">Kong</span><span class="so-option opt-oss">Traefik</span><span class="so-option opt-oss">NGINX</span></td>
        </tr>
        <tr><td><strong>L7 (HTTP) Load Balancer</strong></td>
          <td><span class="so-option opt-azure">Application Gateway</span><span class="so-option opt-azure">Front Door</span></td>
          <td><span class="so-option opt-aws">ALB</span></td>
          <td><span class="so-option opt-gcp">Cloud Load Balancing (HTTP/S)</span></td>
          <td><span class="so-option opt-oss">HAProxy</span><span class="so-option opt-oss">Envoy</span></td>
        </tr>
        <tr><td><strong>L4 (TCP) Load Balancer</strong></td>
          <td><span class="so-option opt-azure">Azure Load Balancer</span></td>
          <td><span class="so-option opt-aws">NLB</span></td>
          <td><span class="so-option opt-gcp">Cloud Load Balancing (network)</span></td>
          <td><span class="so-option opt-oss">HAProxy</span><span class="so-option opt-oss">MetalLB (K8s)</span></td>
        </tr>
        <tr><td><strong>WAF / DDoS Protection</strong></td>
          <td><span class="so-option opt-azure">App Gateway WAF</span><span class="so-option opt-azure">DDoS Protection</span></td>
          <td><span class="so-option opt-aws">AWS WAF</span><span class="so-option opt-aws">Shield</span></td>
          <td><span class="so-option opt-gcp">Cloud Armor</span></td>
          <td><span class="so-option opt-oss">Cloudflare WAF</span><span class="so-option opt-oss">ModSecurity</span></td>
        </tr>
        <tr><td><strong>Service Mesh (internal)</strong></td>
          <td><span class="so-option opt-azure">Open Service Mesh / Istio on AKS</span></td>
          <td><span class="so-option opt-aws">App Mesh</span><span class="so-option opt-aws">VPC Lattice</span></td>
          <td><span class="so-option opt-gcp">Traffic Director / Anthos Service Mesh</span></td>
          <td><span class="so-option opt-oss">Istio</span><span class="so-option opt-oss">Linkerd</span><span class="so-option opt-oss">Consul</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- 3. BACKEND / COMPUTE -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="ref-section so-section">
  <div class="ref-title">⚙️ 3. Backend / Compute</div>
  <div class="ref-body" style="padding:0;">
    <table class="so-table">
      <thead><tr>
        <th class="th-layer">Sub-Layer</th>
        <th class="th-azure">🔷 Azure</th>
        <th class="th-aws">🟧 AWS</th>
        <th class="th-gcp">🟢 GCP</th>
        <th class="th-oss">🟣 OSS / Any Cloud</th>
      </tr></thead>
      <tbody>
        <tr><td><strong>Virtual Machines (IaaS)</strong></td>
          <td><span class="so-option opt-azure">Virtual Machines</span><span class="so-option opt-azure">VM Scale Sets</span></td>
          <td><span class="so-option opt-aws">EC2</span><span class="so-option opt-aws">EC2 Auto Scaling</span></td>
          <td><span class="so-option opt-gcp">Compute Engine</span><span class="so-option opt-gcp">Managed Instance Groups</span></td>
          <td><span class="so-option opt-oss">Terraform provisioned</span></td>
        </tr>
        <tr><td><strong>Managed App Platform (PaaS)</strong></td>
          <td><span class="so-option opt-azure">App Service</span></td>
          <td><span class="so-option opt-aws">Elastic Beanstalk</span><span class="so-option opt-aws">App Runner</span></td>
          <td><span class="so-option opt-gcp">App Engine</span><span class="so-option opt-gcp">Cloud Run</span></td>
          <td><span class="so-option opt-oss">Heroku</span><span class="so-option opt-oss">Render</span><span class="so-option opt-oss">Railway</span></td>
        </tr>
        <tr><td><strong>Serverless Functions (FaaS)</strong></td>
          <td><span class="so-option opt-azure">Azure Functions</span></td>
          <td><span class="so-option opt-aws">Lambda</span></td>
          <td><span class="so-option opt-gcp">Cloud Functions</span><span class="so-option opt-gcp">Cloud Run (jobs)</span></td>
          <td><span class="so-option opt-oss">OpenFaaS</span><span class="so-option opt-oss">Knative</span></td>
        </tr>
        <tr><td><strong>Containers — Managed K8s</strong></td>
          <td><span class="so-option opt-azure">AKS</span></td>
          <td><span class="so-option opt-aws">EKS</span></td>
          <td><span class="so-option opt-gcp">GKE</span><span class="so-option opt-gcp">GKE Autopilot</span></td>
          <td><span class="so-option opt-oss">k3s</span><span class="so-option opt-oss">Rancher</span><span class="so-option opt-oss">OpenShift</span></td>
        </tr>
        <tr><td><strong>Containers — Serverless</strong></td>
          <td><span class="so-option opt-azure">Container Apps</span><span class="so-option opt-azure">Container Instances</span></td>
          <td><span class="so-option opt-aws">Fargate (ECS/EKS)</span></td>
          <td><span class="so-option opt-gcp">Cloud Run</span></td>
          <td><span class="so-option opt-oss">fly.io</span></td>
        </tr>
        <tr><td><strong>Batch / Job Processing</strong></td>
          <td><span class="so-option opt-azure">Azure Batch</span></td>
          <td><span class="so-option opt-aws">AWS Batch</span></td>
          <td><span class="so-option opt-gcp">Cloud Batch</span><span class="so-option opt-gcp">Dataflow</span></td>
          <td><span class="so-option opt-oss">Celery</span><span class="so-option opt-oss">Temporal</span><span class="so-option opt-oss">Airflow</span></td>
        </tr>
        <tr><td><strong>Workflow Orchestration</strong></td>
          <td><span class="so-option opt-azure">Logic Apps</span><span class="so-option opt-azure">Durable Functions</span></td>
          <td><span class="so-option opt-aws">Step Functions</span></td>
          <td><span class="so-option opt-gcp">Workflows</span></td>
          <td><span class="so-option opt-oss">Temporal</span><span class="so-option opt-oss">Conductor</span><span class="so-option opt-oss">Airflow</span><span class="so-option opt-oss">Prefect</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- 4. DATABASE -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="ref-section so-section">
  <div class="ref-title">🗄️ 4. Database</div>
  <div class="ref-body" style="padding:0;">
    <table class="so-table">
      <thead><tr>
        <th class="th-layer">Type</th>
        <th class="th-azure">🔷 Azure</th>
        <th class="th-aws">🟧 AWS</th>
        <th class="th-gcp">🟢 GCP</th>
        <th class="th-oss">🟣 OSS / Self-hosted</th>
      </tr></thead>
      <tbody>
        <tr><td><strong>Relational (SQL)</strong></td>
          <td><span class="so-option opt-azure">Azure SQL Database</span><span class="so-option opt-azure">DB for PostgreSQL</span><span class="so-option opt-azure">DB for MySQL</span></td>
          <td><span class="so-option opt-aws">RDS (MySQL/PG/Oracle)</span><span class="so-option opt-aws">Aurora (MySQL/PG)</span></td>
          <td><span class="so-option opt-gcp">Cloud SQL</span><span class="so-option opt-gcp">AlloyDB</span></td>
          <td><span class="so-option opt-oss">PostgreSQL</span><span class="so-option opt-oss">MySQL</span><span class="so-option opt-oss">MariaDB</span></td>
        </tr>
        <tr><td><strong>Global Distributed SQL</strong></td>
          <td><span class="so-option opt-azure">Cosmos DB (SQL API)</span></td>
          <td><span class="so-option opt-aws">Aurora Global DB</span></td>
          <td><span class="so-option opt-gcp">Cloud Spanner</span></td>
          <td><span class="so-option opt-oss">CockroachDB</span><span class="so-option opt-oss">YugabyteDB</span><span class="so-option opt-oss">TiDB</span></td>
        </tr>
        <tr><td><strong>Document (NoSQL)</strong></td>
          <td><span class="so-option opt-azure">Cosmos DB (NoSQL API)</span></td>
          <td><span class="so-option opt-aws">DynamoDB</span><span class="so-option opt-aws">DocumentDB</span></td>
          <td><span class="so-option opt-gcp">Firestore</span><span class="so-option opt-gcp">Datastore</span></td>
          <td><span class="so-option opt-oss">MongoDB</span><span class="so-option opt-oss">CouchDB</span><span class="so-option opt-oss">RavenDB</span></td>
        </tr>
        <tr><td><strong>Key-Value Store</strong></td>
          <td><span class="so-option opt-azure">Cosmos DB (Table API)</span></td>
          <td><span class="so-option opt-aws">DynamoDB</span><span class="so-option opt-aws">ElastiCache (Redis)</span></td>
          <td><span class="so-option opt-gcp">Firestore</span><span class="so-option opt-gcp">Memorystore</span></td>
          <td><span class="so-option opt-oss">Redis</span><span class="so-option opt-oss">Valkey</span><span class="so-option opt-oss">etcd</span></td>
        </tr>
        <tr><td><strong>Wide-Column (Cassandra)</strong></td>
          <td><span class="so-option opt-azure">Cosmos DB (Cassandra API)</span></td>
          <td><span class="so-option opt-aws">Keyspaces (managed Cassandra)</span></td>
          <td><span class="so-option opt-gcp">Bigtable</span></td>
          <td><span class="so-option opt-oss">Apache Cassandra</span><span class="so-option opt-oss">ScyllaDB</span></td>
        </tr>
        <tr><td><strong>Graph Database</strong></td>
          <td><span class="so-option opt-azure">Cosmos DB (Gremlin API)</span></td>
          <td><span class="so-option opt-aws">Neptune</span></td>
          <td><span class="so-option opt-gcp">— (Spanner w/ graph ext.)</span></td>
          <td><span class="so-option opt-oss">Neo4j</span><span class="so-option opt-oss">JanusGraph</span><span class="so-option opt-oss">ArangoDB</span></td>
        </tr>
        <tr><td><strong>Time-Series DB</strong></td>
          <td><span class="so-option opt-azure">Azure Data Explorer</span></td>
          <td><span class="so-option opt-aws">Timestream</span></td>
          <td><span class="so-option opt-gcp">Bigtable (time-series)</span></td>
          <td><span class="so-option opt-oss">InfluxDB</span><span class="so-option opt-oss">TimescaleDB</span><span class="so-option opt-oss">Prometheus</span></td>
        </tr>
        <tr><td><strong>In-Memory Cache</strong></td>
          <td><span class="so-option opt-azure">Azure Cache for Redis</span></td>
          <td><span class="so-option opt-aws">ElastiCache (Redis/Memcached)</span></td>
          <td><span class="so-option opt-gcp">Memorystore (Redis/Memcached)</span></td>
          <td><span class="so-option opt-oss">Redis</span><span class="so-option opt-oss">Memcached</span><span class="so-option opt-oss">Dragonfly</span></td>
        </tr>
        <tr><td><strong>Data Warehouse (OLAP)</strong></td>
          <td><span class="so-option opt-azure">Synapse Analytics</span></td>
          <td><span class="so-option opt-aws">Redshift</span></td>
          <td><span class="so-option opt-gcp">BigQuery</span></td>
          <td><span class="so-option opt-oss">ClickHouse</span><span class="so-option opt-oss">Apache Pinot</span><span class="so-option opt-oss">DuckDB</span><span class="so-option opt-oss">Druid</span></td>
        </tr>
        <tr><td><strong>Vector / AI Search DB</strong></td>
          <td><span class="so-option opt-azure">Azure AI Search (vector)</span></td>
          <td><span class="so-option opt-aws">OpenSearch (k-NN)</span></td>
          <td><span class="so-option opt-gcp">Vertex AI Vector Search</span></td>
          <td><span class="so-option opt-oss">pgvector</span><span class="so-option opt-oss">Pinecone</span><span class="so-option opt-oss">Weaviate</span><span class="so-option opt-oss">Qdrant</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- 5. MESSAGE BROKER / QUEUE -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="ref-section so-section">
  <div class="ref-title">📨 5. Messaging, Queues &amp; Event Streaming</div>
  <div class="ref-body" style="padding:0;">
    <table class="so-table">
      <thead><tr>
        <th class="th-layer">Type</th>
        <th class="th-azure">🔷 Azure</th>
        <th class="th-aws">🟧 AWS</th>
        <th class="th-gcp">🟢 GCP</th>
        <th class="th-oss">🟣 OSS / Any Cloud</th>
      </tr></thead>
      <tbody>
        <tr><td><strong>Message Queue (P2P)</strong></td>
          <td><span class="so-option opt-azure">Service Bus (Queue)</span><span class="so-option opt-azure">Storage Queues</span></td>
          <td><span class="so-option opt-aws">SQS (Standard)</span><span class="so-option opt-aws">SQS FIFO</span></td>
          <td><span class="so-option opt-gcp">Cloud Tasks</span><span class="so-option opt-gcp">Pub/Sub</span></td>
          <td><span class="so-option opt-oss">RabbitMQ</span><span class="so-option opt-oss">ActiveMQ</span><span class="so-option opt-oss">Celery + Redis</span></td>
        </tr>
        <tr><td><strong>Pub/Sub Fan-out</strong></td>
          <td><span class="so-option opt-azure">Event Grid</span><span class="so-option opt-azure">Service Bus (Topic)</span></td>
          <td><span class="so-option opt-aws">SNS</span></td>
          <td><span class="so-option opt-gcp">Pub/Sub</span></td>
          <td><span class="so-option opt-oss">NATS</span><span class="so-option opt-oss">Redis Pub/Sub</span><span class="so-option opt-oss">RabbitMQ (fanout)</span></td>
        </tr>
        <tr><td><strong>High-throughput Event Streaming</strong></td>
          <td><span class="so-option opt-azure">Event Hubs</span><span class="so-option opt-azure">Event Hubs (Kafka protocol)</span></td>
          <td><span class="so-option opt-aws">Kinesis Data Streams</span><span class="so-option opt-aws">MSK (managed Kafka)</span></td>
          <td><span class="so-option opt-gcp">Pub/Sub</span></td>
          <td><span class="so-option opt-oss">Apache Kafka</span><span class="so-option opt-oss">Redpanda</span><span class="so-option opt-oss">Pulsar</span></td>
        </tr>
        <tr><td><strong>Stream Processing</strong></td>
          <td><span class="so-option opt-azure">Stream Analytics</span></td>
          <td><span class="so-option opt-aws">Kinesis Data Analytics</span></td>
          <td><span class="so-option opt-gcp">Dataflow</span></td>
          <td><span class="so-option opt-oss">Apache Flink</span><span class="so-option opt-oss">Kafka Streams</span><span class="so-option opt-oss">Spark Structured Streaming</span></td>
        </tr>
        <tr><td><strong>Event Bus / Routing</strong></td>
          <td><span class="so-option opt-azure">Event Grid</span></td>
          <td><span class="so-option opt-aws">EventBridge</span></td>
          <td><span class="so-option opt-gcp">Eventarc</span></td>
          <td><span class="so-option opt-oss">NATS JetStream</span><span class="so-option opt-oss">Kafka + consumer groups</span></td>
        </tr>
        <tr><td><strong>Async Job / Task Queue</strong></td>
          <td><span class="so-option opt-azure">Service Bus + Azure Functions</span></td>
          <td><span class="so-option opt-aws">SQS + Lambda</span></td>
          <td><span class="so-option opt-gcp">Cloud Tasks + Cloud Run</span></td>
          <td><span class="so-option opt-oss">BullMQ (Node)</span><span class="so-option opt-oss">Celery (Python)</span><span class="so-option opt-oss">Sidekiq (Ruby)</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- 6. STORAGE -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="ref-section so-section">
  <div class="ref-title">💾 6. Storage</div>
  <div class="ref-body" style="padding:0;">
    <table class="so-table">
      <thead><tr>
        <th class="th-layer">Type</th>
        <th class="th-azure">🔷 Azure</th>
        <th class="th-aws">🟧 AWS</th>
        <th class="th-gcp">🟢 GCP</th>
        <th class="th-oss">🟣 OSS / Any Cloud</th>
      </tr></thead>
      <tbody>
        <tr><td><strong>Object / Blob Storage</strong></td>
          <td><span class="so-option opt-azure">Blob Storage</span></td>
          <td><span class="so-option opt-aws">S3</span></td>
          <td><span class="so-option opt-gcp">Cloud Storage</span></td>
          <td><span class="so-option opt-oss">MinIO</span><span class="so-option opt-oss">Ceph</span></td>
        </tr>
        <tr><td><strong>Block Storage (VM disks)</strong></td>
          <td><span class="so-option opt-azure">Managed Disks</span></td>
          <td><span class="so-option opt-aws">EBS</span></td>
          <td><span class="so-option opt-gcp">Persistent Disk</span><span class="so-option opt-gcp">Hyperdisk</span></td>
          <td><span class="so-option opt-oss">Ceph RBD</span><span class="so-option opt-oss">Longhorn (K8s)</span></td>
        </tr>
        <tr><td><strong>Shared File System (NFS)</strong></td>
          <td><span class="so-option opt-azure">Azure Files</span><span class="so-option opt-azure">Azure NetApp Files</span></td>
          <td><span class="so-option opt-aws">EFS</span><span class="so-option opt-aws">FSx</span></td>
          <td><span class="so-option opt-gcp">Filestore</span></td>
          <td><span class="so-option opt-oss">NFS</span><span class="so-option opt-oss">GlusterFS</span></td>
        </tr>
        <tr><td><strong>Archive / Cold Storage</strong></td>
          <td><span class="so-option opt-azure">Blob Archive Tier</span></td>
          <td><span class="so-option opt-aws">S3 Glacier Deep Archive</span></td>
          <td><span class="so-option opt-gcp">Cloud Storage Archive</span></td>
          <td><span class="so-option opt-oss">Tape / cold object storage</span></td>
        </tr>
        <tr><td><strong>Data Lake</strong></td>
          <td><span class="so-option opt-azure">Azure Data Lake Storage Gen2</span></td>
          <td><span class="so-option opt-aws">S3 + Lake Formation</span></td>
          <td><span class="so-option opt-gcp">Cloud Storage + Dataplex</span></td>
          <td><span class="so-option opt-oss">Delta Lake</span><span class="so-option opt-oss">Apache Iceberg</span><span class="so-option opt-oss">Apache Hudi</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- 7. SEARCH -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="ref-section so-section">
  <div class="ref-title">🔍 7. Search</div>
  <div class="ref-body" style="padding:0;">
    <table class="so-table">
      <thead><tr>
        <th class="th-layer">Type</th>
        <th class="th-azure">🔷 Azure</th>
        <th class="th-aws">🟧 AWS</th>
        <th class="th-gcp">🟢 GCP</th>
        <th class="th-oss">🟣 OSS / Any Cloud</th>
      </tr></thead>
      <tbody>
        <tr><td><strong>Full-Text Search</strong></td>
          <td><span class="so-option opt-azure">Azure AI Search</span></td>
          <td><span class="so-option opt-aws">OpenSearch Service</span><span class="so-option opt-aws">CloudSearch</span></td>
          <td><span class="so-option opt-gcp">Vertex AI Search</span></td>
          <td><span class="so-option opt-oss">Elasticsearch</span><span class="so-option opt-oss">Apache Solr</span><span class="so-option opt-oss">Meilisearch</span><span class="so-option opt-oss">Typesense</span></td>
        </tr>
        <tr><td><strong>Geo / Location Search</strong></td>
          <td><span class="so-option opt-azure">Azure Maps</span></td>
          <td><span class="so-option opt-aws">Location Service</span></td>
          <td><span class="so-option opt-gcp">Maps Platform / Geo search</span></td>
          <td><span class="so-option opt-oss">Elasticsearch geo_point</span><span class="so-option opt-oss">PostGIS</span></td>
        </tr>
        <tr><td><strong>Semantic / Vector Search</strong></td>
          <td><span class="so-option opt-azure">Azure AI Search (semantic)</span></td>
          <td><span class="so-option opt-aws">Kendra</span><span class="so-option opt-aws">OpenSearch k-NN</span></td>
          <td><span class="so-option opt-gcp">Vertex AI Vector Search</span></td>
          <td><span class="so-option opt-oss">Weaviate</span><span class="so-option opt-oss">Qdrant</span><span class="so-option opt-oss">Pinecone</span><span class="so-option opt-oss">pgvector</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- 8. AUTH & IDENTITY -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="ref-section so-section">
  <div class="ref-title">🔐 8. Auth &amp; Identity</div>
  <div class="ref-body" style="padding:0;">
    <table class="so-table">
      <thead><tr>
        <th class="th-layer">Type</th>
        <th class="th-azure">🔷 Azure</th>
        <th class="th-aws">🟧 AWS</th>
        <th class="th-gcp">🟢 GCP</th>
        <th class="th-oss">🟣 OSS / Any Cloud</th>
      </tr></thead>
      <tbody>
        <tr><td><strong>User Auth / Social Login</strong></td>
          <td><span class="so-option opt-azure">Entra External ID (B2C)</span></td>
          <td><span class="so-option opt-aws">Cognito</span></td>
          <td><span class="so-option opt-gcp">Firebase Auth</span><span class="so-option opt-gcp">Identity Platform</span></td>
          <td><span class="so-option opt-oss">Auth0</span><span class="so-option opt-oss">Keycloak</span><span class="so-option opt-oss">Supabase Auth</span></td>
        </tr>
        <tr><td><strong>Enterprise SSO / SAML / OIDC</strong></td>
          <td><span class="so-option opt-azure">Microsoft Entra ID</span></td>
          <td><span class="so-option opt-aws">IAM Identity Center</span></td>
          <td><span class="so-option opt-gcp">Cloud Identity</span></td>
          <td><span class="so-option opt-oss">Keycloak</span><span class="so-option opt-oss">Okta</span><span class="so-option opt-oss">Dex</span></td>
        </tr>
        <tr><td><strong>Secrets / API Keys</strong></td>
          <td><span class="so-option opt-azure">Key Vault</span></td>
          <td><span class="so-option opt-aws">Secrets Manager</span><span class="so-option opt-aws">Parameter Store</span></td>
          <td><span class="so-option opt-gcp">Secret Manager</span></td>
          <td><span class="so-option opt-oss">HashiCorp Vault</span><span class="so-option opt-oss">Doppler</span></td>
        </tr>
        <tr><td><strong>Encryption Keys (KMS)</strong></td>
          <td><span class="so-option opt-azure">Azure Key Vault (keys)</span></td>
          <td><span class="so-option opt-aws">KMS</span><span class="so-option opt-aws">CloudHSM</span></td>
          <td><span class="so-option opt-gcp">Cloud KMS</span><span class="so-option opt-gcp">Cloud HSM</span></td>
          <td><span class="so-option opt-oss">HashiCorp Vault (Transit)</span></td>
        </tr>
        <tr><td><strong>RBAC / Policy Engine</strong></td>
          <td><span class="so-option opt-azure">Azure RBAC</span><span class="so-option opt-azure">Azure Policy</span></td>
          <td><span class="so-option opt-aws">IAM Policies</span><span class="so-option opt-aws">SCP (Org)</span></td>
          <td><span class="so-option opt-gcp">Cloud IAM</span><span class="so-option opt-gcp">Org Policy</span></td>
          <td><span class="so-option opt-oss">Casbin</span><span class="so-option opt-oss">OPA (Open Policy Agent)</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- 9. REAL-TIME / NOTIFICATIONS -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="ref-section so-section">
  <div class="ref-title">⚡ 9. Real-time &amp; Notifications</div>
  <div class="ref-body" style="padding:0;">
    <table class="so-table">
      <thead><tr>
        <th class="th-layer">Type</th>
        <th class="th-azure">🔷 Azure</th>
        <th class="th-aws">🟧 AWS</th>
        <th class="th-gcp">🟢 GCP</th>
        <th class="th-oss">🟣 OSS / Any Cloud</th>
      </tr></thead>
      <tbody>
        <tr><td><strong>WebSocket / Real-time</strong></td>
          <td><span class="so-option opt-azure">Azure Web PubSub</span><span class="so-option opt-azure">SignalR Service</span></td>
          <td><span class="so-option opt-aws">API Gateway WebSocket</span><span class="so-option opt-aws">AppSync (subscriptions)</span></td>
          <td><span class="so-option opt-gcp">Firebase Realtime DB</span><span class="so-option opt-gcp">Firestore onSnapshot</span></td>
          <td><span class="so-option opt-oss">Socket.io</span><span class="so-option opt-oss">Ably</span><span class="so-option opt-oss">Pusher</span><span class="so-option opt-oss">Centrifugo</span></td>
        </tr>
        <tr><td><strong>Push Notifications (Mobile)</strong></td>
          <td><span class="so-option opt-azure">Notification Hubs</span></td>
          <td><span class="so-option opt-aws">SNS (mobile push)</span><span class="so-option opt-aws">Pinpoint</span></td>
          <td><span class="so-option opt-gcp">Firebase Cloud Messaging (FCM)</span></td>
          <td><span class="so-option opt-oss">OneSignal</span><span class="so-option opt-oss">Expo Push</span></td>
        </tr>
        <tr><td><strong>Email</strong></td>
          <td><span class="so-option opt-azure">Azure Communication Services</span></td>
          <td><span class="so-option opt-aws">SES</span></td>
          <td><span class="so-option opt-gcp">—</span></td>
          <td><span class="so-option opt-oss">SendGrid</span><span class="so-option opt-oss">Mailgun</span><span class="so-option opt-oss">Postmark</span></td>
        </tr>
        <tr><td><strong>SMS / OTP</strong></td>
          <td><span class="so-option opt-azure">Azure Communication Services</span></td>
          <td><span class="so-option opt-aws">SNS (SMS)</span><span class="so-option opt-aws">Pinpoint</span></td>
          <td><span class="so-option opt-gcp">—</span></td>
          <td><span class="so-option opt-oss">Twilio</span><span class="so-option opt-oss">MSG91</span><span class="so-option opt-oss">Vonage</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- 10. MONITORING & OBSERVABILITY -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="ref-section so-section">
  <div class="ref-title">📊 10. Monitoring &amp; Observability</div>
  <div class="ref-body" style="padding:0;">
    <table class="so-table">
      <thead><tr>
        <th class="th-layer">Type</th>
        <th class="th-azure">🔷 Azure</th>
        <th class="th-aws">🟧 AWS</th>
        <th class="th-gcp">🟢 GCP</th>
        <th class="th-oss">🟣 OSS / Any Cloud</th>
      </tr></thead>
      <tbody>
        <tr><td><strong>Metrics &amp; Dashboards</strong></td>
          <td><span class="so-option opt-azure">Azure Monitor</span></td>
          <td><span class="so-option opt-aws">CloudWatch</span></td>
          <td><span class="so-option opt-gcp">Cloud Monitoring</span></td>
          <td><span class="so-option opt-oss">Prometheus + Grafana</span><span class="so-option opt-oss">Datadog</span><span class="so-option opt-oss">New Relic</span></td>
        </tr>
        <tr><td><strong>Logs</strong></td>
          <td><span class="so-option opt-azure">Log Analytics (Azure Monitor)</span></td>
          <td><span class="so-option opt-aws">CloudWatch Logs</span></td>
          <td><span class="so-option opt-gcp">Cloud Logging</span></td>
          <td><span class="so-option opt-oss">ELK Stack</span><span class="so-option opt-oss">Loki + Grafana</span><span class="so-option opt-oss">Datadog Logs</span></td>
        </tr>
        <tr><td><strong>Distributed Tracing (APM)</strong></td>
          <td><span class="so-option opt-azure">Application Insights</span></td>
          <td><span class="so-option opt-aws">X-Ray</span></td>
          <td><span class="so-option opt-gcp">Cloud Trace</span></td>
          <td><span class="so-option opt-oss">Jaeger</span><span class="so-option opt-oss">Zipkin</span><span class="so-option opt-oss">OpenTelemetry</span><span class="so-option opt-oss">Tempo</span></td>
        </tr>
        <tr><td><strong>Alerting</strong></td>
          <td><span class="so-option opt-azure">Azure Monitor Alerts</span></td>
          <td><span class="so-option opt-aws">CloudWatch Alarms</span></td>
          <td><span class="so-option opt-gcp">Cloud Monitoring Alerting</span></td>
          <td><span class="so-option opt-oss">PagerDuty</span><span class="so-option opt-oss">OpsGenie</span><span class="so-option opt-oss">Alertmanager</span></td>
        </tr>
        <tr><td><strong>Error Tracking</strong></td>
          <td><span class="so-option opt-azure">Application Insights (exceptions)</span></td>
          <td><span class="so-option opt-aws">CloudWatch (custom metrics)</span></td>
          <td><span class="so-option opt-gcp">Cloud Error Reporting</span></td>
          <td><span class="so-option opt-oss">Sentry</span><span class="so-option opt-oss">Rollbar</span><span class="so-option opt-oss">Bugsnag</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- 11. CI/CD & DevOps -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="ref-section so-section">
  <div class="ref-title">🚀 11. CI/CD &amp; DevOps</div>
  <div class="ref-body" style="padding:0;">
    <table class="so-table">
      <thead><tr>
        <th class="th-layer">Type</th>
        <th class="th-azure">🔷 Azure</th>
        <th class="th-aws">🟧 AWS</th>
        <th class="th-gcp">🟢 GCP</th>
        <th class="th-oss">🟣 OSS / Any Cloud</th>
      </tr></thead>
      <tbody>
        <tr><td><strong>CI/CD Pipelines</strong></td>
          <td><span class="so-option opt-azure">Azure Pipelines</span></td>
          <td><span class="so-option opt-aws">CodePipeline + CodeBuild</span></td>
          <td><span class="so-option opt-gcp">Cloud Build</span><span class="so-option opt-gcp">Cloud Deploy</span></td>
          <td><span class="so-option opt-oss">GitHub Actions</span><span class="so-option opt-oss">GitLab CI</span><span class="so-option opt-oss">Jenkins</span><span class="so-option opt-oss">ArgoCD</span></td>
        </tr>
        <tr><td><strong>Container Registry</strong></td>
          <td><span class="so-option opt-azure">Azure Container Registry</span></td>
          <td><span class="so-option opt-aws">ECR</span></td>
          <td><span class="so-option opt-gcp">Artifact Registry</span></td>
          <td><span class="so-option opt-oss">Docker Hub</span><span class="so-option opt-oss">Harbor</span><span class="so-option opt-oss">GitHub Packages</span></td>
        </tr>
        <tr><td><strong>Infrastructure as Code</strong></td>
          <td><span class="so-option opt-azure">Bicep / ARM Templates</span></td>
          <td><span class="so-option opt-aws">CloudFormation</span><span class="so-option opt-aws">CDK</span></td>
          <td><span class="so-option opt-gcp">Infrastructure Manager</span></td>
          <td><span class="so-option opt-oss">Terraform</span><span class="so-option opt-oss">Pulumi</span><span class="so-option opt-oss">Ansible</span></td>
        </tr>
        <tr><td><strong>GitOps / K8s Delivery</strong></td>
          <td><span class="so-option opt-azure">Flux (AKS add-on)</span></td>
          <td><span class="so-option opt-aws">CodeDeploy + EKS</span></td>
          <td><span class="so-option opt-gcp">Cloud Deploy</span></td>
          <td><span class="so-option opt-oss">ArgoCD</span><span class="so-option opt-oss">FluxCD</span><span class="so-option opt-oss">Spinnaker</span></td>
        </tr>
        <tr><td><strong>Feature Flags</strong></td>
          <td><span class="so-option opt-azure">Azure App Configuration</span></td>
          <td><span class="so-option opt-aws">AppConfig</span></td>
          <td><span class="so-option opt-gcp">—</span></td>
          <td><span class="so-option opt-oss">LaunchDarkly</span><span class="so-option opt-oss">Unleash</span><span class="so-option opt-oss">Flagsmith</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════ -->
<!-- 12. AI / ML -->
<!-- ═══════════════════════════════════════════════════ -->
<div class="ref-section so-section">
  <div class="ref-title">🤖 12. AI / ML &amp; Generative AI</div>
  <div class="ref-body" style="padding:0;">
    <table class="so-table">
      <thead><tr>
        <th class="th-layer">Type</th>
        <th class="th-azure">🔷 Azure</th>
        <th class="th-aws">🟧 AWS</th>
        <th class="th-gcp">🟢 GCP</th>
        <th class="th-oss">🟣 OSS / Any Cloud</th>
      </tr></thead>
      <tbody>
        <tr><td><strong>ML Platform (end-to-end)</strong></td>
          <td><span class="so-option opt-azure">Azure ML</span></td>
          <td><span class="so-option opt-aws">SageMaker</span></td>
          <td><span class="so-option opt-gcp">Vertex AI</span></td>
          <td><span class="so-option opt-oss">MLflow</span><span class="so-option opt-oss">Kubeflow</span><span class="so-option opt-oss">Ray</span></td>
        </tr>
        <tr><td><strong>Generative AI / LLM APIs</strong></td>
          <td><span class="so-option opt-azure">Azure OpenAI Service</span></td>
          <td><span class="so-option opt-aws">Amazon Bedrock</span></td>
          <td><span class="so-option opt-gcp">Vertex AI (Gemini)</span></td>
          <td><span class="so-option opt-oss">Ollama (self-host)</span><span class="so-option opt-oss">vLLM</span><span class="so-option opt-oss">Anthropic Claude API</span></td>
        </tr>
        <tr><td><strong>Pre-built Vision / NLP APIs</strong></td>
          <td><span class="so-option opt-azure">Azure AI Services</span></td>
          <td><span class="so-option opt-aws">Rekognition / Comprehend / Textract</span></td>
          <td><span class="so-option opt-gcp">Vision AI / NLP API / Speech-to-Text</span></td>
          <td><span class="so-option opt-oss">HuggingFace (self-host)</span></td>
        </tr>
        <tr><td><strong>Data Pipeline / ETL</strong></td>
          <td><span class="so-option opt-azure">Data Factory</span><span class="so-option opt-azure">Synapse Pipelines</span></td>
          <td><span class="so-option opt-aws">Glue</span><span class="so-option opt-aws">EMR</span></td>
          <td><span class="so-option opt-gcp">Dataflow</span><span class="so-option opt-gcp">Dataproc</span></td>
          <td><span class="so-option opt-oss">Apache Spark</span><span class="so-option opt-oss">dbt</span><span class="so-option opt-oss">Airbyte</span><span class="so-option opt-oss">Dagster</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- QUICK PICK GUIDE -->
<div class="ref-section">
  <div class="ref-title">🗺️ Quick Stack Picks by System Type</div>
  <div class="ref-body">
    <table class="pattern-table">
      <tr class="pt-header"><th class="pt-name">System</th><th>Recommended Stack (AWS example)</th></tr>
      <tr class="pt-row"><td class="pt-name">Social Feed App</td><td>React (S3+CF) → ALB → ECS/Fargate → RDS + DynamoDB + ElastiCache → Kinesis → CloudWatch</td></tr>
      <tr class="pt-row"><td class="pt-name">E-Commerce</td><td>Next.js (Vercel) → API GW → Lambda + ECS → Aurora + DynamoDB → SQS/SNS → S3 + CloudFront → Cognito</td></tr>
      <tr class="pt-row"><td class="pt-name">Real-time Chat</td><td>React → API GW WebSocket → Lambda/ECS → DynamoDB + ElastiCache → SNS (push) → CloudWatch</td></tr>
      <tr class="pt-row"><td class="pt-name">Data Pipeline</td><td>S3 (raw) → Glue/EMR → Redshift/BigQuery → QuickSight/Grafana → Step Functions (orchestration)</td></tr>
      <tr class="pt-row"><td class="pt-name">IoT / Sensor Platform</td><td>IoT Core (MQTT) → Kinesis → Lambda → Timestream + DynamoDB → CloudWatch + SNS alerts</td></tr>
      <tr class="pt-row"><td class="pt-name">Payment System</td><td>React → ALB → ECS (Java) → Aurora (MySQL) + ElastiCache → SQS → SES/SNS → CloudTrail + GuardDuty</td></tr>
      <tr class="pt-row"><td class="pt-name">AI / RAG App</td><td>React → API GW → Lambda/ECS → OpenSearch (k-NN) + RDS → S3 (docs) → Bedrock (LLM) → CloudWatch</td></tr>
      <tr class="pt-row"><td class="pt-name">Video Streaming</td><td>S3 (raw) → MediaConvert → CloudFront (HLS) → DynamoDB (metadata) → Cognito → Kinesis (events)</td></tr>
    </table>
  </div>
</div>
`;
