window.Pages['cloud-aws'] = `
<div class="page-header">
  <div class="breadcrumb">Cloud Services › <span>Amazon Web Services</span></div>
  <h1>🟧 Amazon Web Services (AWS) — Services Reference</h1>
  <p>What each AWS service is for, grouped by category — with its Azure &amp; GCP equivalent alongside</p>
</div>

<div class="ref-section">
  <div class="ref-title">🖥️ Compute</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">EC2 (Elastic Compute Cloud)</div><div>IaaS — full control VMs (Windows/Linux)</div><div>Instance families/types, AMIs, placement groups</div><div>Virtual Machines · Compute Engine</div></div>
      <div class="pt-row"><div class="pt-name">EC2 Auto Scaling</div><div>Auto-scaling groups of identical instances</div><div>Scaling policies, launch templates, health checks</div><div>VM Scale Sets · Managed Instance Groups</div></div>
      <div class="pt-row"><div class="pt-name">Elastic Beanstalk</div><div>Fully managed PaaS for web apps</div><div>Upload code, Beanstalk handles capacity/LB/scaling</div><div>App Service · App Engine</div></div>
      <div class="pt-row"><div class="pt-name">Lambda</div><div>Serverless, event-driven compute (FaaS)</div><div>Pay-per-invocation, 200+ event sources, Step Functions integration</div><div>Azure Functions · Cloud Functions</div></div>
      <div class="pt-row"><div class="pt-name">App Runner</div><div>Fully managed container/source-to-URL service</div><div>Auto-builds &amp; deploys from source or image, autoscaling</div><div>Container Apps · Cloud Run</div></div>
      <div class="pt-row"><div class="pt-name">AWS Batch</div><div>Large-scale parallel &amp; batch job scheduling</div><div>Dynamically provisions optimal compute (EC2/Spot/Fargate)</div><div>Azure Batch · Cloud Batch</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">💾 Storage</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">S3 (Simple Storage Service)</div><div>Object storage for unstructured data (files, media, backups)</div><div>Storage classes, lifecycle rules, versioning, 11 9's durability</div><div>Blob Storage · Cloud Storage</div></div>
      <div class="pt-row"><div class="pt-name">EFS (Elastic File System)</div><div>Fully managed, elastic NFS file storage</div><div>Auto-scales, multi-AZ, mountable across many EC2s</div><div>Azure Files · Filestore</div></div>
      <div class="pt-row"><div class="pt-name">EBS (Elastic Block Store)</div><div>Block storage (persistent disks) for EC2</div><div>gp3/io2 volume types, snapshots, encryption</div><div>Managed Disks · Persistent Disk</div></div>
      <div class="pt-row"><div class="pt-name">FSx</div><div>Managed high-performance file systems (Windows/Lustre/NetApp)</div><div>Choose the native file system your workload needs</div><div>Azure Files / NetApp Files · Filestore</div></div>
      <div class="pt-row"><div class="pt-name">S3 Glacier / Deep Archive</div><div>Coldest, cheapest tier for rarely-accessed data</div><div>Minutes-to-hours retrieval, lowest $/GB</div><div>Archive Storage Tier · Cloud Storage Archive</div></div>
      <div class="pt-row"><div class="pt-name">AWS Storage Gateway</div><div>Hybrid on-prem ↔ cloud storage bridge</div><div>File, volume &amp; tape gateway modes</div><div>Azure File Sync / StorSimple · Storage Transfer Service</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🗄️ Database</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">RDS (Relational Database Service)</div><div>Managed relational DB (multiple engines)</div><div>SQL Server, MySQL, Postgres, MariaDB, Oracle — automated backups/HA</div><div>Azure SQL / DB for MySQL-PG · Cloud SQL</div></div>
      <div class="pt-row"><div class="pt-name">Aurora</div><div>AWS-built, cloud-native MySQL/Postgres-compatible DB</div><div>5x MySQL throughput, storage auto-scales to 128TB, global DB</div><div>SQL Managed Instance (closest) · AlloyDB</div></div>
      <div class="pt-row"><div class="pt-name">DynamoDB</div><div>Fully managed key-value / document NoSQL DB</div><div>Single-digit ms latency at any scale, on-demand or provisioned</div><div>Cosmos DB · Firestore / Bigtable</div></div>
      <div class="pt-row"><div class="pt-name">ElastiCache</div><div>Managed in-memory cache/data store</div><div>Redis or Memcached engines, clustering, replication</div><div>Cache for Redis · Memorystore</div></div>
      <div class="pt-row"><div class="pt-name">DocumentDB</div><div>MongoDB-compatible managed document database</div><div>Drop-in MongoDB API compatibility</div><div>Cosmos DB (Mongo API) · Firestore</div></div>
      <div class="pt-row"><div class="pt-name">Redshift</div><div>Managed cloud data warehouse</div><div>Columnar storage, massively parallel processing (MPP)</div><div>Synapse Analytics (SQL pool) · BigQuery</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🌍 Networking &amp; CDN</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">VPC (Virtual Private Cloud)</div><div>Isolated private network in the cloud</div><div>Subnets, route tables, security groups, NACLs</div><div>Virtual Network · VPC</div></div>
      <div class="pt-row"><div class="pt-name">NLB (Network Load Balancer)</div><div>L4 (TCP/UDP) ultra-low-latency load balancing</div><div>Millions of requests/sec, static IP, preserves source IP</div><div>Load Balancer · Cloud Load Balancing (network)</div></div>
      <div class="pt-row"><div class="pt-name">ALB (Application Load Balancer)</div><div>L7 load balancer</div><div>Path/host-based routing, integrates with WAF</div><div>Application Gateway · Cloud Load Balancing (HTTP)</div></div>
      <div class="pt-row"><div class="pt-name">AWS WAF</div><div>Web Application Firewall</div><div>Rules against SQLi/XSS, rate-based rules, bot control</div><div>App Gateway WAF / Front Door WAF · Cloud Armor</div></div>
      <div class="pt-row"><div class="pt-name">Direct Connect</div><div>Private dedicated connection to AWS (not over internet)</div><div>Low latency, high throughput, consistent performance</div><div>ExpressRoute · Cloud Interconnect</div></div>
      <div class="pt-row"><div class="pt-name">Site-to-Site VPN</div><div>Encrypted site-to-site connectivity</div><div>IPsec tunnels over the public internet</div><div>VPN Gateway · Cloud VPN</div></div>
      <div class="pt-row"><div class="pt-name">CloudFront</div><div>Global CDN + edge compute</div><div>Lambda@Edge, Shield integration, low-latency caching</div><div>Front Door / Azure CDN · Cloud CDN</div></div>
      <div class="pt-row"><div class="pt-name">AWS PrivateLink</div><div>Private connectivity to services (no public IP / no peering)</div><div>Traffic stays on AWS backbone via VPC endpoints</div><div>Private Link · Private Service Connect</div></div>
      <div class="pt-row"><div class="pt-name">Route 53</div><div>Managed authoritative DNS + domain registration</div><div>Health checks, latency/geo/failover routing policies</div><div>Azure DNS · Cloud DNS</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">☸️ Containers &amp; Orchestration</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">EKS (Elastic Kubernetes Service)</div><div>Managed Kubernetes control plane</div><div>Upstream-conformant K8s, integrates with IAM/VPC</div><div>AKS · GKE</div></div>
      <div class="pt-row"><div class="pt-name">ECS (Elastic Container Service)</div><div>AWS-native container orchestration (non-K8s)</div><div>Simpler than K8s, tight IAM/CloudWatch integration</div><div>Container Apps (closest) · Cloud Run</div></div>
      <div class="pt-row"><div class="pt-name">ECR (Elastic Container Registry)</div><div>Private Docker/OCI image registry</div><div>Image scanning, replication, lifecycle policies</div><div>Azure Container Registry · Artifact Registry</div></div>
      <div class="pt-row"><div class="pt-name">Fargate</div><div>Serverless compute engine for containers (ECS/EKS)</div><div>No EC2/nodes to manage, pay per task/pod resource</div><div>Container Instances / Container Apps · Cloud Run</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🔌 Serverless, Integration &amp; Messaging</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">Step Functions</div><div>Serverless workflow orchestration (state machines)</div><div>Visual workflow, retries/catch, direct service integrations</div><div>Logic Apps · Workflows</div></div>
      <div class="pt-row"><div class="pt-name">SQS (Simple Queue Service)</div><div>Managed message queue (point-to-point)</div><div>Standard (at-least-once) &amp; FIFO queues, DLQ support</div><div>Service Bus / Storage Queues · Pub/Sub (+ Cloud Tasks)</div></div>
      <div class="pt-row"><div class="pt-name">SNS (Simple Notification Service)</div><div>Pub/sub messaging &amp; fan-out notifications</div><div>Push to SQS/Lambda/HTTP/email/SMS subscribers</div><div>Event Grid · Pub/Sub</div></div>
      <div class="pt-row"><div class="pt-name">EventBridge</div><div>Serverless event bus for app-to-app / SaaS events</div><div>Schema registry, rules-based routing, replay</div><div>Event Grid · Eventarc</div></div>
      <div class="pt-row"><div class="pt-name">Kinesis Data Streams</div><div>Real-time, high-throughput data streaming</div><div>Shards, ordered records, integrates with Firehose/Analytics</div><div>Event Hubs · Pub/Sub (+ Dataflow)</div></div>
      <div class="pt-row"><div class="pt-name">API Gateway</div><div>Managed API front door (REST/HTTP/WebSocket)</div><div>Throttling, auth (Cognito/IAM/Lambda authorizers), caching</div><div>API Management · Apigee / API Gateway</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🔐 Security &amp; Identity</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">IAM (Identity and Access Management)</div><div>Users, roles &amp; fine-grained permission policies</div><div>Policy JSON, roles for services (no long-lived secrets)</div><div>Entra ID + RBAC · Cloud IAM</div></div>
      <div class="pt-row"><div class="pt-name">KMS (Key Management Service)</div><div>Managed encryption key creation &amp; control</div><div>CMKs, envelope encryption, automatic key rotation</div><div>Key Vault (keys) · Cloud KMS</div></div>
      <div class="pt-row"><div class="pt-name">Secrets Manager</div><div>Secrets storage with automatic rotation</div><div>Native rotation for RDS/Redshift/DocumentDB credentials</div><div>Key Vault (secrets) · Secret Manager</div></div>
      <div class="pt-row"><div class="pt-name">AWS Config</div><div>Resource inventory, configuration history &amp; compliance rules</div><div>Continuous compliance evaluation against rules/conformance packs</div><div>Azure Policy · Organization Policy</div></div>
      <div class="pt-row"><div class="pt-name">Security Hub</div><div>Cloud security posture management (CSPM), aggregated findings</div><div>Consolidates GuardDuty/Inspector/Macie findings, security score</div><div>Defender for Cloud · Security Command Center</div></div>
      <div class="pt-row"><div class="pt-name">GuardDuty</div><div>Managed intelligent threat detection</div><div>ML-based anomaly detection across accounts/VPC/logs</div><div>Defender for Cloud (threat protection) · Chronicle / SCC threat detection</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🚀 DevOps &amp; Infrastructure as Code</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">CodePipeline</div><div>Managed CI/CD orchestration service</div><div>Stage-based pipeline, integrates with CodeBuild/Deploy</div><div>Azure Pipelines · Cloud Build (+ Cloud Deploy)</div></div>
      <div class="pt-row"><div class="pt-name">CodeBuild</div><div>Managed build/test compute service</div><div>Pay-per-build-minute, custom build environments</div><div>Azure Pipelines (agents) · Cloud Build</div></div>
      <div class="pt-row"><div class="pt-name">CodeDeploy</div><div>Automated application deployment service</div><div>Blue/green &amp; rolling deployments to EC2/Lambda/ECS</div><div>Azure Pipelines (release) · Cloud Deploy</div></div>
      <div class="pt-row"><div class="pt-name">CloudFormation</div><div>Native AWS Infrastructure-as-Code</div><div>Declarative JSON/YAML templates, stacks, drift detection</div><div>ARM Templates / Bicep · Deployment Manager / Config Connector</div></div>
      <div class="pt-row"><div class="pt-name">CodeArtifact</div><div>Package management (npm, Maven, PyPI, NuGet)</div><div>Private repos with upstream public proxy</div><div>Azure Artifacts · Artifact Registry</div></div>
      <div class="pt-row"><div class="pt-name">Terraform (on AWS)</div><div>Cloud-agnostic Infrastructure-as-Code (3rd party, HashiCorp)</div><div>Declarative HCL, state file, works identically across all 3 clouds</div><div>Terraform (Azure provider) · Terraform (GCP provider)</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">📊 Monitoring &amp; Observability</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">CloudWatch</div><div>Unified metrics, logs, alarms platform</div><div>Custom metrics, dashboards, log groups, alarms → SNS/Lambda</div><div>Azure Monitor · Cloud Monitoring</div></div>
      <div class="pt-row"><div class="pt-name">X-Ray</div><div>Distributed tracing / APM</div><div>Service maps, trace analysis for microservices/Lambda</div><div>Application Insights · Cloud Trace</div></div>
      <div class="pt-row"><div class="pt-name">CloudTrail</div><div>API call audit logging across the account</div><div>Who did what, when, from where — governance/forensics</div><div>Activity Log · Cloud Audit Logs</div></div>
      <div class="pt-row"><div class="pt-name">AWS Trusted Advisor</div><div>Personalized best-practice recommendations</div><div>Cost, security, fault tolerance, performance checks</div><div>Azure Advisor · Recommender</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🤖 AI / ML &amp; Data Analytics</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Purpose</div><div>Key Capability</div><div>Equivalent (Azure · GCP)</div></div>
      <div class="pt-row"><div class="pt-name">SageMaker</div><div>End-to-end ML platform — build, train, deploy models</div><div>Studio notebooks, Autopilot AutoML, model registry/pipelines</div><div>Azure Machine Learning · Vertex AI</div></div>
      <div class="pt-row"><div class="pt-name">Rekognition / Comprehend / Textract</div><div>Pre-built AI APIs — vision, NLP, document extraction</div><div>Ready-to-call REST APIs, no training required</div><div>Azure AI Services (Cognitive Services) · Cloud Vision/NLP APIs</div></div>
      <div class="pt-row"><div class="pt-name">Amazon Bedrock</div><div>Managed access to foundation models (Claude, Titan, etc.)</div><div>Serverless, no infra, model choice, RAG/agents support</div><div>Azure OpenAI Service · Vertex AI (Gemini)</div></div>
      <div class="pt-row"><div class="pt-name">EMR (Elastic MapReduce)</div><div>Managed Hadoop/Spark big-data platform</div><div>Runs open-source frameworks on managed clusters</div><div>Azure Databricks / HDInsight · Dataproc</div></div>
      <div class="pt-row"><div class="pt-name">Glue</div><div>Managed ETL / data-integration &amp; data catalog service</div><div>Serverless Spark ETL jobs, crawlers, Data Catalog</div><div>Data Factory · Data Fusion / Dataflow</div></div>
      <div class="pt-row"><div class="pt-name">Athena</div><div>Serverless interactive SQL query over S3 data</div><div>Pay-per-query, no infrastructure, standard SQL</div><div>Synapse Serverless SQL · BigQuery</div></div>
    </div>
  </div>
</div>

<div class="alert tip" style="margin-top:8px;">
  <strong>💡 Interview Tip</strong>
  <p>AWS has the broadest and most mature service catalog with the largest market share. When asked "why AWS," lead with: largest ecosystem/community, most mature managed services (S3/DynamoDB SLAs), broadest region/AZ footprint, and first-mover maturity in most service categories.</p>
</div>
`;
