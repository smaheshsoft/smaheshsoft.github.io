window.Pages['cloud-compare'] = `
<div class="page-header">
  <div class="breadcrumb">Cloud Services › <span>Compare</span></div>
  <h1>⚖️ Azure vs AWS vs GCP — Service Equivalence Matrix</h1>
  <p>The same capability, three names — find the equivalent resource across all three clouds at a glance</p>
</div>

<style>
.cmp-table { border: 1px solid var(--border); border-radius: 8px; overflow: hidden; width: 100%; }
.cmp-row { display: grid; grid-template-columns: 2fr 1.6fr 1.6fr 1.6fr; border-bottom: 1px solid var(--border); }
.cmp-row:last-child { border-bottom: none; }
.cmp-row > div { padding: 9px 12px; font-size: 12px; color: var(--text2); border-right: 1px solid var(--border); line-height: 1.5; }
.cmp-row > div:last-child { border-right: none; }
.cmp-header { background: var(--bg); }
.cmp-header > div { color: var(--muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700; }
.cmp-row:nth-child(even):not(.cmp-header) { background: var(--surface2); }
.cmp-purpose { color: var(--text) !important; font-weight: 600 !important; }
.cmp-azure { color: #2563eb !important; font-weight: 600 !important; }
.cmp-aws { color: #ea580c !important; font-weight: 600 !important; }
.cmp-gcp { color: #16a34a !important; font-weight: 600 !important; }
</style>

<div class="alert tip">
  <strong>💡 How to read this page</strong>
  <p>Each row is one capability. Read across to see what Azure calls it, what AWS calls it, and what GCP calls it. For the full picture on each service (features, tiers, SKUs) open the dedicated
  <a href="#" onclick="showPage('cloud-azure',document.querySelector('[onclick*=cloud-azure]'));return false;">🔷 Azure</a>,
  <a href="#" onclick="showPage('cloud-aws',document.querySelector('[onclick*=cloud-aws]'));return false;">🟧 AWS</a> or
  <a href="#" onclick="showPage('cloud-gcp',document.querySelector('[onclick*=cloud-gcp]'));return false;">🟢 GCP</a> reference page.</p>
</div>

<div class="ref-section">
  <div class="ref-title">🖥️ Compute</div>
  <div class="ref-body">
    <div class="cmp-table">
      <div class="cmp-row cmp-header"><div>Purpose</div><div>Azure</div><div>AWS</div><div>GCP</div></div>
      <div class="cmp-row"><div class="cmp-purpose">IaaS virtual machines</div><div class="cmp-azure">Virtual Machines</div><div class="cmp-aws">EC2</div><div class="cmp-gcp">Compute Engine</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Auto-scaling VM groups</div><div class="cmp-azure">VM Scale Sets</div><div class="cmp-aws">EC2 Auto Scaling</div><div class="cmp-gcp">Managed Instance Groups</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Managed PaaS for web apps</div><div class="cmp-azure">App Service</div><div class="cmp-aws">Elastic Beanstalk</div><div class="cmp-gcp">App Engine</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Serverless functions (FaaS)</div><div class="cmp-azure">Azure Functions</div><div class="cmp-aws">Lambda</div><div class="cmp-gcp">Cloud Functions</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Serverless containers</div><div class="cmp-azure">Container Apps</div><div class="cmp-aws">App Runner / Fargate</div><div class="cmp-gcp">Cloud Run</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Batch job scheduling</div><div class="cmp-azure">Azure Batch</div><div class="cmp-aws">AWS Batch</div><div class="cmp-gcp">Cloud Batch</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">💾 Storage</div>
  <div class="ref-body">
    <div class="cmp-table">
      <div class="cmp-row cmp-header"><div>Purpose</div><div>Azure</div><div>AWS</div><div>GCP</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Object storage</div><div class="cmp-azure">Blob Storage</div><div class="cmp-aws">S3</div><div class="cmp-gcp">Cloud Storage</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Managed NFS/SMB file shares</div><div class="cmp-azure">Azure Files</div><div class="cmp-aws">EFS / FSx</div><div class="cmp-gcp">Filestore</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Block storage for VMs</div><div class="cmp-azure">Managed Disks</div><div class="cmp-aws">EBS</div><div class="cmp-gcp">Persistent Disk</div></div>
      <div class="cmp-row"><div class="cmp-purpose">High-perf enterprise NetApp storage</div><div class="cmp-azure">Azure NetApp Files</div><div class="cmp-aws">FSx for NetApp ONTAP</div><div class="cmp-gcp">NetApp Volumes</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Coldest / archive storage tier</div><div class="cmp-azure">Archive Storage Tier</div><div class="cmp-aws">S3 Glacier Deep Archive</div><div class="cmp-gcp">Cloud Storage Archive</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Hybrid on-prem ↔ cloud data transfer</div><div class="cmp-azure">Data Box / File Sync</div><div class="cmp-aws">Storage Gateway / DataSync</div><div class="cmp-gcp">Storage Transfer Service</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🗄️ Database</div>
  <div class="ref-body">
    <div class="cmp-table">
      <div class="cmp-row cmp-header"><div>Purpose</div><div>Azure</div><div>AWS</div><div>GCP</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Managed relational DB</div><div class="cmp-azure">Azure SQL Database / DB for MySQL-PG</div><div class="cmp-aws">RDS</div><div class="cmp-gcp">Cloud SQL</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Cloud-native high-performance relational</div><div class="cmp-azure">SQL Managed Instance (closest)</div><div class="cmp-aws">Aurora</div><div class="cmp-gcp">AlloyDB</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Globally distributed NoSQL</div><div class="cmp-azure">Cosmos DB</div><div class="cmp-aws">DynamoDB</div><div class="cmp-gcp">Firestore</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Petabyte-scale wide-column NoSQL</div><div class="cmp-azure">Cosmos DB (Cassandra API)</div><div class="cmp-aws">DynamoDB (at scale)</div><div class="cmp-gcp">Bigtable</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Globally consistent relational at scale</div><div class="cmp-azure">— (no direct equivalent)</div><div class="cmp-aws">Aurora Global Database (closest)</div><div class="cmp-gcp">Cloud Spanner</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Managed in-memory cache</div><div class="cmp-azure">Cache for Redis</div><div class="cmp-aws">ElastiCache</div><div class="cmp-gcp">Memorystore</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Cloud data warehouse</div><div class="cmp-azure">Synapse Analytics (SQL pool)</div><div class="cmp-aws">Redshift</div><div class="cmp-gcp">BigQuery</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🌍 Networking &amp; CDN</div>
  <div class="ref-body">
    <div class="cmp-table">
      <div class="cmp-row cmp-header"><div>Purpose</div><div>Azure</div><div>AWS</div><div>GCP</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Isolated private network</div><div class="cmp-azure">Virtual Network (VNet)</div><div class="cmp-aws">VPC</div><div class="cmp-gcp">VPC</div></div>
      <div class="cmp-row"><div class="cmp-purpose">L4 (network) load balancer</div><div class="cmp-azure">Load Balancer</div><div class="cmp-aws">NLB</div><div class="cmp-gcp">Cloud Load Balancing (network)</div></div>
      <div class="cmp-row"><div class="cmp-purpose">L7 (application) load balancer</div><div class="cmp-azure">Application Gateway</div><div class="cmp-aws">ALB</div><div class="cmp-gcp">Cloud Load Balancing (HTTP/S)</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Web Application Firewall</div><div class="cmp-azure">App Gateway / Front Door WAF</div><div class="cmp-aws">AWS WAF</div><div class="cmp-gcp">Cloud Armor</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Managed network firewall</div><div class="cmp-azure">Azure Firewall</div><div class="cmp-aws">AWS Network Firewall</div><div class="cmp-gcp">Cloud Firewall / Cloud NGFW</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Private dedicated connection (no internet)</div><div class="cmp-azure">ExpressRoute</div><div class="cmp-aws">Direct Connect</div><div class="cmp-gcp">Cloud Interconnect</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Encrypted site-to-site VPN</div><div class="cmp-azure">VPN Gateway</div><div class="cmp-aws">Site-to-Site VPN</div><div class="cmp-gcp">Cloud VPN</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Global CDN</div><div class="cmp-azure">Front Door / Azure CDN</div><div class="cmp-aws">CloudFront</div><div class="cmp-gcp">Cloud CDN</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Private connectivity to managed services</div><div class="cmp-azure">Private Link</div><div class="cmp-aws">AWS PrivateLink</div><div class="cmp-gcp">Private Service Connect</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Managed DNS</div><div class="cmp-azure">Azure DNS</div><div class="cmp-aws">Route 53</div><div class="cmp-gcp">Cloud DNS</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">☸️ Containers &amp; Orchestration</div>
  <div class="ref-body">
    <div class="cmp-table">
      <div class="cmp-row cmp-header"><div>Purpose</div><div>Azure</div><div>AWS</div><div>GCP</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Managed Kubernetes</div><div class="cmp-azure">AKS</div><div class="cmp-aws">EKS</div><div class="cmp-gcp">GKE</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Hands-off / node-less Kubernetes</div><div class="cmp-azure">Container Apps (closest)</div><div class="cmp-aws">Fargate (for EKS)</div><div class="cmp-gcp">GKE Autopilot</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Private container image registry</div><div class="cmp-azure">Azure Container Registry</div><div class="cmp-aws">ECR</div><div class="cmp-gcp">Artifact Registry</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Run a single container, no cluster</div><div class="cmp-azure">Container Instances</div><div class="cmp-aws">Fargate (task)</div><div class="cmp-gcp">Cloud Run (jobs)</div></div>
      <div class="cmp-row"><div class="cmp-purpose">AWS/GCP-native (non-K8s) orchestration</div><div class="cmp-azure">— (Container Apps closest)</div><div class="cmp-aws">ECS</div><div class="cmp-gcp">— (Cloud Run closest)</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🔌 Serverless, Integration &amp; Messaging</div>
  <div class="ref-body">
    <div class="cmp-table">
      <div class="cmp-row cmp-header"><div>Purpose</div><div>Azure</div><div>AWS</div><div>GCP</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Low-code workflow orchestration</div><div class="cmp-azure">Logic Apps</div><div class="cmp-aws">Step Functions</div><div class="cmp-gcp">Workflows</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Message queue (point-to-point)</div><div class="cmp-azure">Service Bus / Storage Queues</div><div class="cmp-aws">SQS</div><div class="cmp-gcp">Cloud Tasks</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Pub/sub fan-out messaging</div><div class="cmp-azure">Event Grid</div><div class="cmp-aws">SNS</div><div class="cmp-gcp">Pub/Sub</div></div>
      <div class="cmp-row"><div class="cmp-purpose">App/SaaS event bus &amp; routing</div><div class="cmp-azure">Event Grid</div><div class="cmp-aws">EventBridge</div><div class="cmp-gcp">Eventarc</div></div>
      <div class="cmp-row"><div class="cmp-purpose">High-throughput event streaming</div><div class="cmp-azure">Event Hubs</div><div class="cmp-aws">Kinesis Data Streams</div><div class="cmp-gcp">Pub/Sub (+ Dataflow)</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Stream processing engine</div><div class="cmp-azure">Stream Analytics</div><div class="cmp-aws">Kinesis Data Analytics</div><div class="cmp-gcp">Dataflow</div></div>
      <div class="cmp-row"><div class="cmp-purpose">API gateway / management</div><div class="cmp-azure">API Management</div><div class="cmp-aws">API Gateway</div><div class="cmp-gcp">Apigee / API Gateway</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🔐 Security &amp; Identity</div>
  <div class="ref-body">
    <div class="cmp-table">
      <div class="cmp-row cmp-header"><div>Purpose</div><div>Azure</div><div>AWS</div><div>GCP</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Identity provider / user directory</div><div class="cmp-azure">Microsoft Entra ID (Azure AD)</div><div class="cmp-aws">IAM Identity Center</div><div class="cmp-gcp">Cloud Identity</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Fine-grained access permissions</div><div class="cmp-azure">Azure RBAC</div><div class="cmp-aws">IAM policies</div><div class="cmp-gcp">Cloud IAM</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Secretless identity for a resource</div><div class="cmp-azure">Managed Identity</div><div class="cmp-aws">IAM Role (instance profile)</div><div class="cmp-gcp">Service Account</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Secrets / keys / certificates vault</div><div class="cmp-azure">Key Vault</div><div class="cmp-aws">Secrets Manager + KMS</div><div class="cmp-gcp">Secret Manager + Cloud KMS</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Org-wide policy enforcement</div><div class="cmp-azure">Azure Policy</div><div class="cmp-aws">AWS Config Rules / SCPs</div><div class="cmp-gcp">Organization Policy</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Cloud security posture management</div><div class="cmp-azure">Microsoft Defender for Cloud</div><div class="cmp-aws">Security Hub</div><div class="cmp-gcp">Security Command Center</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Managed threat detection</div><div class="cmp-azure">Defender for Cloud (threat protection)</div><div class="cmp-aws">GuardDuty</div><div class="cmp-gcp">Security Command Center (threat detection)</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Cloud-native SIEM/SOAR</div><div class="cmp-azure">Microsoft Sentinel</div><div class="cmp-aws">Amazon Security Lake</div><div class="cmp-gcp">Chronicle</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🚀 DevOps &amp; Infrastructure as Code</div>
  <div class="ref-body">
    <div class="cmp-table">
      <div class="cmp-row cmp-header"><div>Purpose</div><div>Azure</div><div>AWS</div><div>GCP</div></div>
      <div class="cmp-row"><div class="cmp-purpose">CI/CD pipeline orchestration</div><div class="cmp-azure">Azure Pipelines</div><div class="cmp-aws">CodePipeline</div><div class="cmp-gcp">Cloud Build</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Managed build/test compute</div><div class="cmp-azure">Azure Pipelines (agents)</div><div class="cmp-aws">CodeBuild</div><div class="cmp-gcp">Cloud Build</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Automated deployment (blue/green, canary)</div><div class="cmp-azure">Azure Pipelines (release)</div><div class="cmp-aws">CodeDeploy</div><div class="cmp-gcp">Cloud Deploy</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Native Infrastructure-as-Code</div><div class="cmp-azure">ARM Templates / Bicep</div><div class="cmp-aws">CloudFormation</div><div class="cmp-gcp">Infrastructure Manager / Config Connector</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Private Git repository hosting</div><div class="cmp-azure">Azure Repos</div><div class="cmp-aws">CodeCommit</div><div class="cmp-gcp">Cloud Source Repositories</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Package/artifact management</div><div class="cmp-azure">Azure Artifacts</div><div class="cmp-aws">CodeArtifact</div><div class="cmp-gcp">Artifact Registry</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Cloud-agnostic IaC (3rd party)</div><div class="cmp-azure">Terraform (azurerm provider)</div><div class="cmp-aws">Terraform (aws provider)</div><div class="cmp-gcp">Terraform (google provider)</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">📊 Monitoring &amp; Observability</div>
  <div class="ref-body">
    <div class="cmp-table">
      <div class="cmp-row cmp-header"><div>Purpose</div><div>Azure</div><div>AWS</div><div>GCP</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Unified metrics/logs/alerts platform</div><div class="cmp-azure">Azure Monitor</div><div class="cmp-aws">CloudWatch</div><div class="cmp-gcp">Cloud Monitoring</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Application Performance Monitoring (APM)</div><div class="cmp-azure">Application Insights</div><div class="cmp-aws">X-Ray</div><div class="cmp-gcp">Cloud Trace</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Central log store &amp; query engine</div><div class="cmp-azure">Log Analytics</div><div class="cmp-aws">CloudWatch Logs Insights</div><div class="cmp-gcp">Cloud Logging</div></div>
      <div class="cmp-row"><div class="cmp-purpose">API/account activity audit trail</div><div class="cmp-azure">Activity Log</div><div class="cmp-aws">CloudTrail</div><div class="cmp-gcp">Cloud Audit Logs</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Personalized best-practice advisor</div><div class="cmp-azure">Azure Advisor</div><div class="cmp-aws">Trusted Advisor</div><div class="cmp-gcp">Recommender</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">🤖 AI / ML &amp; Data Analytics</div>
  <div class="ref-body">
    <div class="cmp-table">
      <div class="cmp-row cmp-header"><div>Purpose</div><div>Azure</div><div>AWS</div><div>GCP</div></div>
      <div class="cmp-row"><div class="cmp-purpose">End-to-end ML platform</div><div class="cmp-azure">Azure Machine Learning</div><div class="cmp-aws">SageMaker</div><div class="cmp-gcp">Vertex AI</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Pre-built vision / NLP / speech APIs</div><div class="cmp-azure">Azure AI Services (Cognitive Services)</div><div class="cmp-aws">Rekognition / Comprehend / Textract</div><div class="cmp-gcp">Cloud Vision / NLP / Speech APIs</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Managed foundation / generative AI models</div><div class="cmp-azure">Azure OpenAI Service</div><div class="cmp-aws">Amazon Bedrock</div><div class="cmp-gcp">Vertex AI (Gemini)</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Cloud data warehouse</div><div class="cmp-azure">Synapse Analytics</div><div class="cmp-aws">Redshift</div><div class="cmp-gcp">BigQuery</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Managed Spark/Hadoop platform</div><div class="cmp-azure">Azure Databricks / HDInsight</div><div class="cmp-aws">EMR</div><div class="cmp-gcp">Dataproc</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Managed ETL / data integration</div><div class="cmp-azure">Data Factory</div><div class="cmp-aws">Glue</div><div class="cmp-gcp">Data Fusion / Dataflow</div></div>
      <div class="cmp-row"><div class="cmp-purpose">Serverless interactive SQL over data lake</div><div class="cmp-azure">Synapse Serverless SQL</div><div class="cmp-aws">Athena</div><div class="cmp-gcp">BigQuery</div></div>
    </div>
  </div>
</div>

<div class="alert" style="margin-top:24px;">
  <strong>⚠️ Common Interview Trap</strong>
  <p>
    Equivalence is rarely 1:1 — services differ in consistency model, pricing granularity, and operational maturity even when they solve the "same" problem
    (e.g. <strong>Cosmos DB</strong> vs <strong>DynamoDB</strong> vs <strong>Firestore</strong> all do global NoSQL, but their consistency models and scaling knobs are different).
    When asked to compare, name the equivalent <em>and</em> the one meaningful difference — that's what shows real hands-on experience, not memorization.
  </p>
</div>
`;
