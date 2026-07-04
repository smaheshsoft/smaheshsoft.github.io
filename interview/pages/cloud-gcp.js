window.Pages['cloud-gcp'] = `
<div class="page-header">
  <div class="breadcrumb">Cloud Services › <span>Google Cloud Platform</span></div>
  <h1>🟢 Google Cloud Platform (GCP) — Services Reference</h1>
  <p>What each GCP service is for, grouped by category — with its Azure &amp; AWS equivalent alongside</p>
</div>

<div class="ref-section">
  <div class="ref-title">🖥️ Compute</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · AWS)</div></div>
      <div class="pt-row"><div class="pt-name">Compute Engine</div><div>IaaS — full control VMs (Windows/Linux)</div><div>Custom machine types, preemptible/Spot VMs, live migration</div><div>Virtual Machines · EC2</div></div>
      <div class="pt-row"><div class="pt-name">Managed Instance Groups (MIG)</div><div>Auto-scaling groups of identical VMs</div><div>Autohealing, rolling updates, regional distribution</div><div>VM Scale Sets · EC2 Auto Scaling</div></div>
      <div class="pt-row"><div class="pt-name">App Engine</div><div>Fully managed PaaS for web apps (Standard/Flexible)</div><div>Zero server management, automatic scaling to zero</div><div>App Service · Elastic Beanstalk</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Functions</div><div>Serverless, event-driven compute (FaaS)</div><div>Pay-per-invocation, 1st/2nd gen (built on Cloud Run)</div><div>Azure Functions · Lambda</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Run</div><div>Fully managed serverless containers</div><div>Scale-to-zero, any language/runtime in a container, HTTP or events</div><div>Container Apps · App Runner / Fargate</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Batch</div><div>Large-scale parallel &amp; batch job scheduling</div><div>Fully managed batch scheduling on Compute Engine</div><div>Azure Batch · AWS Batch</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">💾 Storage</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · AWS)</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Storage</div><div>Object storage for unstructured data (files, media, backups)</div><div>Standard/Nearline/Coldline/Archive classes, single unified API</div><div>Blob Storage · S3</div></div>
      <div class="pt-row"><div class="pt-name">Filestore</div><div>Fully managed NFS file storage</div><div>High performance, low latency for stateful apps</div><div>Azure Files · EFS</div></div>
      <div class="pt-row"><div class="pt-name">Persistent Disk</div><div>Block storage (persistent disks) for VMs</div><div>Standard/Balanced/SSD/Extreme, regional replication</div><div>Managed Disks · EBS</div></div>
      <div class="pt-row"><div class="pt-name">NetApp Volumes</div><div>High-performance enterprise NFS/SMB file storage</div><div>Sub-ms latency for SAP/HPC/VDI workloads</div><div>Azure NetApp Files · FSx for NetApp ONTAP</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Storage Archive Class</div><div>Coldest, cheapest tier for rarely-accessed data</div><div>Milliseconds access time, but with a min-storage-duration cost</div><div>Archive Storage Tier · S3 Glacier Deep Archive</div></div>
      <div class="pt-row"><div class="pt-name">Storage Transfer Service</div><div>Managed data migration into/between cloud storage</div><div>Scheduled transfers from on-prem, S3, Azure Blob, HTTP</div><div>Azure Data Box / File Sync · AWS DataSync / Storage Gateway</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🗄️ Database</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · AWS)</div></div>
      <div class="pt-row"><div class="pt-name">Cloud SQL</div><div>Managed relational DB (MySQL, PostgreSQL, SQL Server)</div><div>Automated backups, HA, read replicas</div><div>Azure SQL / DB for MySQL-PG · RDS</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Spanner</div><div>Globally distributed, strongly consistent relational DB</div><div>Horizontal scale with ACID transactions &amp; SQL — unique to GCP</div><div>Cosmos DB (closest, different model) · Aurora (closest, different model)</div></div>
      <div class="pt-row"><div class="pt-name">Firestore</div><div>Serverless document NoSQL database</div><div>Real-time sync, offline support, mobile/web SDKs</div><div>Cosmos DB · DynamoDB</div></div>
      <div class="pt-row"><div class="pt-name">Bigtable</div><div>Petabyte-scale wide-column NoSQL database</div><div>Extremely high throughput, low latency — used for IoT/time-series</div><div>Cosmos DB (Cassandra API) · DynamoDB (at scale)</div></div>
      <div class="pt-row"><div class="pt-name">Memorystore</div><div>Managed in-memory cache/data store</div><div>Redis or Memcached engines, fully managed</div><div>Cache for Redis · ElastiCache</div></div>
      <div class="pt-row"><div class="pt-name">AlloyDB</div><div>PostgreSQL-compatible DB built for demanding workloads</div><div>4x faster than standard Postgres for analytics, HTAP</div><div>SQL Managed Instance (closest) · Aurora</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🌍 Networking &amp; CDN</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · AWS)</div></div>
      <div class="pt-row"><div class="pt-name">VPC</div><div>Isolated private network in the cloud</div><div>Global resource by default (subnets are regional), firewall rules</div><div>Virtual Network · VPC</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Load Balancing (Network)</div><div>L4 (TCP/UDP) traffic distribution</div><div>Global anycast IP, passthrough or proxy modes</div><div>Load Balancer · NLB</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Load Balancing (HTTP/S) + Cloud Armor</div><div>L7 global load balancer with WAF/DDoS protection</div><div>Single global anycast IP, edge-based, integrated CDN</div><div>Application Gateway + WAF · ALB + AWS WAF</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Interconnect</div><div>Private dedicated connection to GCP (not over internet)</div><div>Dedicated or Partner Interconnect options</div><div>ExpressRoute · Direct Connect</div></div>
      <div class="pt-row"><div class="pt-name">Cloud VPN</div><div>Encrypted site-to-site connectivity</div><div>HA VPN with 99.99% SLA, IPsec tunnels</div><div>VPN Gateway · Site-to-Site VPN</div></div>
      <div class="pt-row"><div class="pt-name">Cloud CDN</div><div>Global content delivery network</div><div>Built on Google's edge network, integrates with HTTP(S) LB</div><div>Front Door / Azure CDN · CloudFront</div></div>
      <div class="pt-row"><div class="pt-name">Private Service Connect</div><div>Private connectivity to services (no public IP)</div><div>Consume/publish services privately within Google's network</div><div>Private Link · AWS PrivateLink</div></div>
      <div class="pt-row"><div class="pt-name">Cloud DNS</div><div>Managed authoritative DNS hosting</div><div>Public/private zones, DNSSEC, low-latency anycast</div><div>Azure DNS · Route 53</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">☸️ Containers &amp; Orchestration</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · AWS)</div></div>
      <div class="pt-row"><div class="pt-name">GKE (Google Kubernetes Engine)</div><div>Managed Kubernetes control plane</div><div>Built by the creators of Kubernetes — most mature managed K8s</div><div>AKS · EKS</div></div>
      <div class="pt-row"><div class="pt-name">GKE Autopilot</div><div>Fully managed, hands-off Kubernetes mode</div><div>No node management at all — pay per pod resource request</div><div>Container Apps (closest) · Fargate (for EKS)</div></div>
      <div class="pt-row"><div class="pt-name">Artifact Registry</div><div>Private Docker/OCI &amp; language package registry</div><div>Vulnerability scanning, regional replication, multi-format</div><div>Azure Container Registry · ECR</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Run (jobs)</div><div>Run a single container task without a cluster</div><div>Serverless, per-second billing, scale-to-zero</div><div>Container Instances · Fargate</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🔌 Serverless, Integration &amp; Messaging</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · AWS)</div></div>
      <div class="pt-row"><div class="pt-name">Workflows</div><div>Serverless workflow orchestration</div><div>YAML/JSON-defined steps calling any HTTP API or GCP service</div><div>Logic Apps · Step Functions</div></div>
      <div class="pt-row"><div class="pt-name">Pub/Sub</div><div>Global, at-least-once messaging (pub/sub + queue)</div><div>Auto-scaling, no shard management, push or pull delivery</div><div>Service Bus / Event Grid · SNS + SQS</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Tasks</div><div>Managed distributed task queue</div><div>Rate control, retries, scheduling for async work</div><div>Storage Queues · SQS</div></div>
      <div class="pt-row"><div class="pt-name">Eventarc</div><div>Event routing across GCP &amp; custom sources</div><div>Standardizes on CloudEvents, routes to Cloud Run/Functions/Workflows</div><div>Event Grid · EventBridge</div></div>
      <div class="pt-row"><div class="pt-name">Dataflow</div><div>Unified stream &amp; batch data processing (Apache Beam)</div><div>Auto-scaling, exactly-once streaming semantics</div><div>Stream Analytics · Kinesis Data Analytics</div></div>
      <div class="pt-row"><div class="pt-name">API Gateway / Apigee</div><div>Managed API front door &amp; full API management</div><div>API Gateway = lightweight; Apigee = full lifecycle/monetization</div><div>API Management · API Gateway</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🔐 Security &amp; Identity</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · AWS)</div></div>
      <div class="pt-row"><div class="pt-name">Cloud IAM</div><div>Users, roles &amp; fine-grained permission bindings</div><div>Predefined/custom roles, resource-hierarchy inheritance (org→folder→project)</div><div>Entra ID + RBAC · IAM</div></div>
      <div class="pt-row"><div class="pt-name">Cloud KMS</div><div>Managed encryption key creation &amp; control</div><div>CMEK, HSM &amp; external key support, automatic rotation</div><div>Key Vault (keys) · KMS</div></div>
      <div class="pt-row"><div class="pt-name">Secret Manager</div><div>Secrets storage with versioning</div><div>IAM-controlled access, audit logging, automatic replication</div><div>Key Vault (secrets) · Secrets Manager</div></div>
      <div class="pt-row"><div class="pt-name">Organization Policy</div><div>Enforce organizational constraints across the resource hierarchy</div><div>Centralized guardrails (e.g., restrict regions, disable external IPs)</div><div>Azure Policy · AWS Config Rules / SCPs</div></div>
      <div class="pt-row"><div class="pt-name">Security Command Center</div><div>Cloud security posture management (CSPM) + threat detection</div><div>Asset inventory, vulnerability &amp; misconfiguration findings</div><div>Defender for Cloud · Security Hub</div></div>
      <div class="pt-row"><div class="pt-name">Identity-Aware Proxy (IAP)</div><div>Zero-trust access control to apps without a VPN</div><div>Context-aware access based on identity + device posture</div><div>Azure AD App Proxy · Verified Access</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🚀 DevOps &amp; Infrastructure as Code</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · AWS)</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Build</div><div>Managed CI/CD build &amp; pipeline service</div><div>Serverless, container-native build steps, triggers on git push</div><div>Azure Pipelines · CodeBuild + CodePipeline</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Deploy</div><div>Managed continuous delivery to GKE/Cloud Run</div><div>Delivery pipelines with approvals, canary/rollout strategies</div><div>Azure Pipelines (release) · CodeDeploy</div></div>
      <div class="pt-row"><div class="pt-name">Infrastructure Manager / Config Connector</div><div>Native GCP Infrastructure-as-Code</div><div>Infra Manager runs Terraform natively; Config Connector = K8s-style IaC</div><div>ARM Templates / Bicep · CloudFormation</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Source Repositories</div><div>Private Git repository hosting</div><div>Integrates natively with Cloud Build triggers</div><div>Azure Repos · CodeCommit</div></div>
      <div class="pt-row"><div class="pt-name">Terraform (on GCP)</div><div>Cloud-agnostic Infrastructure-as-Code (3rd party, HashiCorp)</div><div>Declarative HCL, state file, works identically across all 3 clouds</div><div>Terraform (Azure provider) · Terraform (AWS provider)</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">📊 Monitoring &amp; Observability</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · AWS)</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Monitoring</div><div>Unified metrics, dashboards, alerting platform</div><div>Uptime checks, SLOs, auto-discovers GCP resources</div><div>Azure Monitor · CloudWatch</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Trace</div><div>Distributed tracing / latency analysis</div><div>Automatic latency sampling for App Engine/GKE/Cloud Run</div><div>Application Insights · X-Ray</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Logging</div><div>Central log store &amp; query engine</div><div>Powers Monitoring, Security Command Center; log-based metrics</div><div>Log Analytics · CloudWatch Logs</div></div>
      <div class="pt-row"><div class="pt-name">Recommender</div><div>Personalized best-practice recommendations</div><div>Cost, security, performance suggestions per resource</div><div>Azure Advisor · AWS Trusted Advisor</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🤖 AI / ML &amp; Data Analytics</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · AWS)</div></div>
      <div class="pt-row"><div class="pt-name">Vertex AI</div><div>End-to-end ML platform — build, train, deploy models</div><div>Unified AutoML + custom training + MLOps + Model Garden</div><div>Azure Machine Learning · SageMaker</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Vision / Natural Language / Speech APIs</div><div>Pre-built AI APIs — vision, NLP, speech</div><div>Ready-to-call REST APIs, no training required</div><div>Azure AI Services (Cognitive Services) · Rekognition/Comprehend</div></div>
      <div class="pt-row"><div class="pt-name">Vertex AI — Gemini / Generative AI</div><div>Managed access to Google's foundation models</div><div>Multimodal (text/image/video), grounding, RAG-ready</div><div>Azure OpenAI Service · Amazon Bedrock</div></div>
      <div class="pt-row"><div class="pt-name">BigQuery</div><div>Serverless, highly scalable data warehouse</div><div>Petabyte-scale SQL analytics, no infrastructure, BQML built-in</div><div>Synapse Analytics · Redshift</div></div>
      <div class="pt-row"><div class="pt-name">Dataproc</div><div>Managed Hadoop/Spark big-data platform</div><div>Fast cluster spin-up/down, integrates with GCS &amp; BigQuery</div><div>Azure Databricks / HDInsight · EMR</div></div>
      <div class="pt-row"><div class="pt-name">Data Fusion</div><div>Managed, visual ETL / data-integration service</div><div>Code-free pipeline builder (built on CDAP)</div><div>Data Factory · Glue</div></div>
    </div>
  </div>
</div>

<div class="alert tip" style="margin-top:8px;">
  <strong>💡 Interview Tip</strong>
  <p>GCP's strengths are data analytics/BigQuery, Kubernetes (GKE is the reference implementation), and AI/ML (Vertex AI, Gemini). When asked "why GCP," lead with: best-in-class data warehouse (BigQuery), strongest Kubernetes/GKE experience, global network backbone, and per-second billing granularity.</p>
</div>
`;
