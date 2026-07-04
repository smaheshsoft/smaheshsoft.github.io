window.Pages['cloud-azure'] = `
<div class="page-header">
  <div class="breadcrumb">Cloud Services › <span>Microsoft Azure</span></div>
  <h1>🔷 Microsoft Azure — Services Reference</h1>
  <p>What each Azure service is for, grouped by category — with its AWS &amp; GCP equivalent alongside</p>
</div>

<div class="ref-section">
  <div class="ref-title">🖥️ Compute</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (AWS · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">Virtual Machines (VM)</div><div>IaaS — full control VMs (Windows/Linux)</div><div>Custom sizing, images, availability sets/zones</div><div>EC2 · Compute Engine</div></div>
      <div class="pt-row"><div class="pt-name">VM Scale Sets (VMSS)</div><div>Auto-scaling groups of identical VMs</div><div>Scale rules, rolling upgrades, spot instances</div><div>EC2 Auto Scaling · Managed Instance Groups</div></div>
      <div class="pt-row"><div class="pt-name">App Service</div><div>Fully managed PaaS for web apps &amp; APIs</div><div>Built-in CI/CD, slots, auto-scale, no OS management</div><div>Elastic Beanstalk · App Engine</div></div>
      <div class="pt-row"><div class="pt-name">Azure Functions</div><div>Serverless, event-driven compute (FaaS)</div><div>Pay-per-execution, triggers &amp; bindings, Durable Functions</div><div>Lambda · Cloud Functions</div></div>
      <div class="pt-row"><div class="pt-name">Container Apps</div><div>Serverless containers with microservices/K8s features</div><div>KEDA scaling, Dapr, revisions — no cluster to manage</div><div>App Runner / Fargate · Cloud Run</div></div>
      <div class="pt-row"><div class="pt-name">Azure Batch</div><div>Large-scale parallel &amp; batch job scheduling</div><div>Auto-provisions VM pools, job queues</div><div>AWS Batch · Cloud Batch</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">💾 Storage</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (AWS · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">Blob Storage</div><div>Object storage for unstructured data (files, media, backups)</div><div>Hot/Cool/Archive tiers, lifecycle policies, versioning</div><div>S3 · Cloud Storage</div></div>
      <div class="pt-row"><div class="pt-name">Azure Files</div><div>Fully managed SMB/NFS file shares</div><div>Mountable from on-prem &amp; cloud, snapshots</div><div>EFS/FSx · Filestore</div></div>
      <div class="pt-row"><div class="pt-name">Managed Disks</div><div>Block storage (persistent disks) for VMs</div><div>Standard HDD/SSD, Premium SSD, Ultra Disk</div><div>EBS · Persistent Disk</div></div>
      <div class="pt-row"><div class="pt-name">Data Lake Storage Gen2</div><div>Hierarchical-namespace storage for big data analytics</div><div>POSIX ACLs on top of Blob Storage, huge throughput</div><div>S3 (Lake Formation) · Cloud Storage (Dataproc)</div></div>
      <div class="pt-row"><div class="pt-name">Azure NetApp Files</div><div>High-performance enterprise NFS/SMB file storage</div><div>Sub-ms latency, used for SAP/HPC/VDI workloads</div><div>FSx for NetApp ONTAP · NetApp Volumes</div></div>
      <div class="pt-row"><div class="pt-name">Archive Storage Tier</div><div>Coldest, cheapest tier for rarely-accessed data</div><div>Hours-long rehydration time, lowest $/GB</div><div>S3 Glacier Deep Archive · Cloud Storage Archive</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🗄️ Database</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (AWS · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">Azure SQL Database</div><div>Managed relational DB (SQL Server engine)</div><div>Serverless tier, auto-tuning, built-in HA</div><div>RDS (SQL Server) · Cloud SQL</div></div>
      <div class="pt-row"><div class="pt-name">Azure SQL Managed Instance</div><div>Near-100% SQL Server compatible PaaS</div><div>Lift-and-shift from on-prem SQL Server with minimal changes</div><div>RDS Custom for SQL Server · —</div></div>
      <div class="pt-row"><div class="pt-name">Cosmos DB</div><div>Globally distributed multi-model NoSQL DB</div><div>Multi-region writes, 5 consistency levels, SLA-backed latency</div><div>DynamoDB · Firestore / Spanner</div></div>
      <div class="pt-row"><div class="pt-name">Database for PostgreSQL / MySQL</div><div>Managed open-source relational databases</div><div>Flexible Server, auto-scaling storage, HA</div><div>RDS (Postgres/MySQL) · Cloud SQL</div></div>
      <div class="pt-row"><div class="pt-name">Azure Cache for Redis</div><div>Managed in-memory cache/data store</div><div>Clustering, geo-replication, Redis modules</div><div>ElastiCache · Memorystore</div></div>
      <div class="pt-row"><div class="pt-name">Table Storage</div><div>Simple NoSQL key-value store</div><div>Schema-less, low cost, part of Storage Account</div><div>DynamoDB (simple use) · Bigtable (at scale)</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🌍 Networking &amp; CDN</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (AWS · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">Virtual Network (VNet)</div><div>Isolated private network in the cloud</div><div>Subnets, NSGs, peering, service endpoints</div><div>VPC · VPC</div></div>
      <div class="pt-row"><div class="pt-name">Load Balancer</div><div>L4 (TCP/UDP) traffic distribution</div><div>Public/internal, zone-redundant, health probes</div><div>NLB · Cloud Load Balancing (network)</div></div>
      <div class="pt-row"><div class="pt-name">Application Gateway</div><div>L7 load balancer with WAF</div><div>Path-based routing, SSL offload, autoscaling</div><div>ALB + AWS WAF · Cloud Load Balancing (HTTP) + Cloud Armor</div></div>
      <div class="pt-row"><div class="pt-name">Azure Firewall</div><div>Managed, stateful network firewall</div><div>Centralized policy, threat intelligence filtering</div><div>AWS Network Firewall · Cloud Firewall / Cloud NGFW</div></div>
      <div class="pt-row"><div class="pt-name">ExpressRoute</div><div>Private dedicated connection to Azure (not over internet)</div><div>Low latency, high throughput, SLA</div><div>Direct Connect · Cloud Interconnect</div></div>
      <div class="pt-row"><div class="pt-name">VPN Gateway</div><div>Encrypted site-to-site / point-to-site connectivity</div><div>IPsec/IKE tunnels over the public internet</div><div>Site-to-Site VPN · Cloud VPN</div></div>
      <div class="pt-row"><div class="pt-name">Front Door / Azure CDN</div><div>Global HTTP(S) load balancing + content delivery</div><div>Edge caching, WAF, SSL, anycast routing</div><div>CloudFront · Cloud CDN</div></div>
      <div class="pt-row"><div class="pt-name">Private Link</div><div>Private connectivity to PaaS services (no public IP)</div><div>Traffic stays on Microsoft backbone</div><div>AWS PrivateLink · Private Service Connect</div></div>
      <div class="pt-row"><div class="pt-name">Azure DNS</div><div>Managed authoritative DNS hosting</div><div>Private &amp; public zones, alias records</div><div>Route 53 · Cloud DNS</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">☸️ Containers &amp; Orchestration</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (AWS · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">Azure Kubernetes Service (AKS)</div><div>Managed Kubernetes control plane</div><div>Free control plane, node pools, Azure AD integration</div><div>EKS · GKE</div></div>
      <div class="pt-row"><div class="pt-name">Azure Container Registry (ACR)</div><div>Private Docker/OCI image registry</div><div>Geo-replication, vulnerability scanning, ACR Tasks</div><div>ECR · Artifact Registry</div></div>
      <div class="pt-row"><div class="pt-name">Container Instances (ACI)</div><div>Run a single container without a cluster/VM</div><div>Per-second billing, fast startup</div><div>Fargate (task) · Cloud Run (jobs)</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🔌 Serverless, Integration &amp; Messaging</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (AWS · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">Logic Apps</div><div>Low-code workflow orchestration / integration</div><div>400+ connectors, visual designer</div><div>Step Functions · Workflows</div></div>
      <div class="pt-row"><div class="pt-name">Service Bus</div><div>Enterprise message broker (queues &amp; topics)</div><div>FIFO, sessions, dead-lettering, transactions</div><div>SQS + SNS · Pub/Sub (+ Cloud Tasks)</div></div>
      <div class="pt-row"><div class="pt-name">Event Grid</div><div>Event routing service (pub/sub for discrete events)</div><div>Reactive, near real-time, push-based fan-out</div><div>EventBridge · Eventarc</div></div>
      <div class="pt-row"><div class="pt-name">Event Hubs</div><div>Big-data event streaming (millions of events/sec)</div><div>Kafka-compatible endpoint, partitions, capture to storage</div><div>Kinesis Data Streams · Pub/Sub (+ Dataflow)</div></div>
      <div class="pt-row"><div class="pt-name">API Management</div><div>API gateway, developer portal, policy engine</div><div>Rate limiting, transformation, versioning, monetization</div><div>API Gateway · Apigee / API Gateway</div></div>
      <div class="pt-row"><div class="pt-name">Storage Queues</div><div>Simple, low-cost queue storage</div><div>Basic FIFO-ish queuing, part of Storage Account</div><div>SQS (basic) · Cloud Tasks</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🔐 Security &amp; Identity</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (AWS · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">Microsoft Entra ID (Azure AD)</div><div>Identity provider — users, groups, SSO</div><div>Conditional Access, MFA, B2C/B2B</div><div>IAM Identity Center · Cloud Identity</div></div>
      <div class="pt-row"><div class="pt-name">Key Vault</div><div>Secrets, keys &amp; certificate management</div><div>HSM-backed keys, auto-rotation, Managed Identity access</div><div>Secrets Manager + KMS · Secret Manager + Cloud KMS</div></div>
      <div class="pt-row"><div class="pt-name">Managed Identity</div><div>Auto-managed AD identity for a resource — no secrets</div><div>System- or user-assigned, used for RBAC to other services</div><div>IAM Role (instance profile) · Service Account</div></div>
      <div class="pt-row"><div class="pt-name">Azure Policy</div><div>Enforce organizational standards &amp; compliance at scale</div><div>Deny/audit/deploy-if-not-exists effects</div><div>AWS Config Rules / SCPs · Organization Policy</div></div>
      <div class="pt-row"><div class="pt-name">Microsoft Defender for Cloud</div><div>Cloud security posture management (CSPM) + workload protection</div><div>Secure score, threat detection across resources</div><div>Security Hub + GuardDuty · Security Command Center</div></div>
      <div class="pt-row"><div class="pt-name">Microsoft Sentinel</div><div>Cloud-native SIEM / SOAR</div><div>AI-based threat detection, automated playbooks</div><div>—  (Amazon Security Lake / GuardDuty) · Chronicle</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🚀 DevOps &amp; Infrastructure as Code</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (AWS · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">Azure DevOps (Boards/Repos/Pipelines)</div><div>End-to-end ALM — planning, source control, CI/CD</div><div>YAML pipelines, self-hosted or Microsoft-hosted agents</div><div>CodeCommit+Pipeline+CodeBuild · Cloud Build + Source Repos</div></div>
      <div class="pt-row"><div class="pt-name">ARM Templates / Bicep</div><div>Native Azure Infrastructure-as-Code</div><div>Bicep = simplified DSL that compiles to ARM JSON</div><div>CloudFormation · Deployment Manager / Config Connector</div></div>
      <div class="pt-row"><div class="pt-name">Azure Artifacts</div><div>Package management (NuGet, npm, Maven, etc.)</div><div>Private feeds, upstream sources</div><div>CodeArtifact · Artifact Registry</div></div>
      <div class="pt-row"><div class="pt-name">Terraform (on Azure)</div><div>Cloud-agnostic Infrastructure-as-Code (3rd party, HashiCorp)</div><div>Declarative HCL, state file, works identically across all 3 clouds</div><div>Terraform (AWS provider) · Terraform (GCP provider)</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">📊 Monitoring &amp; Observability</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (AWS · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">Azure Monitor</div><div>Unified metrics, logs, alerts platform</div><div>Metrics explorer, Log Analytics workspace, alert rules</div><div>CloudWatch · Cloud Monitoring</div></div>
      <div class="pt-row"><div class="pt-name">Application Insights</div><div>Application Performance Monitoring (APM)</div><div>Distributed tracing, live metrics, dependency maps</div><div>X-Ray (+ CloudWatch APM) · Cloud Trace / Cloud Profiler</div></div>
      <div class="pt-row"><div class="pt-name">Log Analytics</div><div>Central log store &amp; query engine (KQL)</div><div>Powers Azure Monitor, Sentinel, Defender for Cloud</div><div>CloudWatch Logs Insights · Cloud Logging</div></div>
      <div class="pt-row"><div class="pt-name">Azure Advisor</div><div>Personalized best-practice recommendations</div><div>Cost, security, reliability, performance pillars</div><div>Trusted Advisor · Recommender</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🤖 AI / ML &amp; Data Analytics</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (AWS · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">Azure Machine Learning</div><div>End-to-end ML platform — train, deploy, manage models</div><div>AutoML, MLOps pipelines, model registry</div><div>SageMaker · Vertex AI</div></div>
      <div class="pt-row"><div class="pt-name">Azure AI Services (Cognitive Services)</div><div>Pre-built AI APIs — vision, speech, language</div><div>Ready-to-call REST APIs, no training required</div><div>Rekognition/Comprehend/Textract · Cloud Vision/NLP/Speech APIs</div></div>
      <div class="pt-row"><div class="pt-name">Azure OpenAI Service</div><div>Enterprise access to GPT / embeddings models</div><div>Private networking, data stays in your tenant, RAI filters</div><div>Amazon Bedrock · Vertex AI (Gemini)</div></div>
      <div class="pt-row"><div class="pt-name">Synapse Analytics</div><div>Unified big-data + data-warehousing platform</div><div>Combines SQL pools, Spark pools, pipelines in one workspace</div><div>Redshift + Glue · BigQuery + Dataproc</div></div>
      <div class="pt-row"><div class="pt-name">Azure Databricks</div><div>Managed Apache Spark analytics platform</div><div>Collaborative notebooks, Delta Lake, MLflow</div><div>EMR (+ Databricks on AWS) · Dataproc (+ Databricks on GCP)</div></div>
      <div class="pt-row"><div class="pt-name">Data Factory</div><div>Managed ETL / data-integration pipeline service</div><div>200+ connectors, visual pipeline designer</div><div>Glue · Data Fusion / Dataflow</div></div>
    </div>
  </div>
</div>

<div class="alert tip" style="margin-top:8px;">
  <strong>💡 Interview Tip</strong>
  <p>Azure's naming favors business-friendly terms (App Service, Container Apps) over infra-first names (EC2, GKE). When asked "why Azure over AWS," lead with: native Active Directory / hybrid integration (ExpressRoute, Arc), enterprise agreement bundling with Microsoft 365, and first-class .NET tooling.</p>
</div>
`;
