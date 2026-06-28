window.Pages['ref-iac'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Infrastructure as Code</span></div>
  <h1>🏗️ Infrastructure as Code — Terraform</h1>
  <p>Why IaC · HCL Core · State · Modules · Workspaces · CI/CD Pipeline · Azure · Best Practices</p>
</div>

<div class="ref-section">
  <div class="ref-title">Why IaC? — ClickOps vs Terraform</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">ClickOps Problems</div>
        <div class="code-box">❌ No audit trail — who changed what, when?
❌ Snowflake servers — every env differs slightly
❌ Impossible to reproduce exactly
❌ Human error on repeated manual steps
❌ No code review or peer approval
❌ Disaster recovery is slow and unreliable
❌ Knowledge lives in one person's head
❌ Drift — prod quietly diverges from staging</div>
      </div>
      <div>
        <div class="ans-label">IaC Benefits</div>
        <div class="code-box">✅ Version controlled — full git history = audit log
✅ Idempotent — run 100x, same result
✅ Reproducible environments (dev = prod shape)
✅ Code review enforces 4-eyes principle
✅ Self-documenting infrastructure
✅ Automated DR — rebuild from code in minutes
✅ Drift detection — terraform plan shows differences
✅ Peer reviewed — infra changes go through PR</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">Terraform vs Other IaC Tools</div>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Tool</div><div>Language</div><div>Cloud</div><div>Approach</div><div>Best For</div></div>
      <div class="pt-row"><div class="pt-name">Terraform</div><div>HCL (declarative)</div><div>Multi-cloud (3000+ providers)</div><div>Desired state — plan + apply</div><div>Multi-cloud, large teams, mature ecosystem</div></div>
      <div class="pt-row"><div class="pt-name">Bicep / ARM</div><div>Bicep DSL</div><div>Azure only</div><div>ARM template wrapper</div><div>Azure-only shops, tight Microsoft SLA</div></div>
      <div class="pt-row"><div class="pt-name">Pulumi</div><div>TypeScript / Python / Go</div><div>Multi-cloud</div><div>Imperative + desired state</div><div>Dev teams who prefer real languages over DSL</div></div>
      <div class="pt-row"><div class="pt-name">Ansible</div><div>YAML (procedural)</div><div>Multi-cloud</div><div>Push-based, procedural</div><div>Config management — NOT infra provisioning</div></div>
      <div class="pt-row"><div class="pt-name">CDK</div><div>TypeScript / Python</div><div>AWS only</div><div>Generates CloudFormation</div><div>AWS shops with strong developer culture</div></div>
    </div>
    <div class="tip-box">✅ Terraform wins on multi-cloud portability, huge ecosystem, and the plan/apply workflow — safe preview before changes land. OpenTofu is the open-source fork post BSL license change.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">HCL Building Blocks — Provider, Resource, Data Source</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Provider + Resource</div>
        <div class="code-box">terraform {
  required_version = ">= 1.6.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.90"    # pin — avoid breaking changes
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

# Resource — creates real infra
resource "azurerm_resource_group" "main" {
  name     = "&#36;{var.project}-&#36;{var.env}-rg"
  location = var.location
  tags     = local.common_tags
}

# Reference another resource's output
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-&#36;{var.env}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = var.project

  default_node_pool {
    name       = "system"
    node_count = var.node_count
    vm_size    = var.vm_size
  }
  identity { type = "SystemAssigned" }
}</div>
      </div>
      <div>
        <div class="ans-label">Variables + Outputs + Locals</div>
        <div class="code-box"># variables.tf
variable "env" {
  type = string
  validation {
    condition     = contains(["dev","staging","prod"], var.env)
    error_message = "Must be dev, staging, or prod."
  }
}

variable "subscription_id" {
  type      = string
  sensitive = true   # masked in plan/apply output
}

# outputs.tf
output "aks_name" {
  value = azurerm_kubernetes_cluster.aks.name
}
output "kube_config" {
  value     = azurerm_kubernetes_cluster.aks.kube_config_raw
  sensitive = true
}

# locals.tf — computed values (not overridable by caller)
locals {
  name_prefix = "&#36;{var.project}-&#36;{var.env}"
  common_tags = {
    Environment = var.env
    ManagedBy   = "Terraform"
    CostCenter  = "platform"
  }
  # Conditional sizing
  node_count = var.env == "prod" ? 5 : 2
  vm_size    = var.env == "prod" ? "Standard_D4s_v3" : "Standard_D2s_v3"
}</div>
        <div class="ans-label" style="margin-top:10px;">Data Source — Read Existing Infra</div>
        <div class="code-box"># Reads existing resource (not managed by this code)
data "azurerm_subnet" "aks" {
  name                 = "snet-aks"
  virtual_network_name = "vnet-hub"
  resource_group_name  = "rg-networking"
}

# Use in resource
resource "azurerm_kubernetes_cluster" "aks" {
  default_node_pool {
    vnet_subnet_id = data.azurerm_subnet.aks.id
  }
}</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Terraform State — The Source of Truth</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Remote State — Azure Backend</div>
        <div class="code-box">terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "mytfstate12345"
    container_name       = "tfstate"
    key                  = "prod/aks/terraform.tfstate"
    # Auth via Managed Identity in CI — no secrets!
    # ARM_CLIENT_ID / ARM_TENANT_ID / ARM_SUBSCRIPTION_ID
  }
}

# Separate state per environment:
# dev:     key = "dev/aks/terraform.tfstate"
# staging: key = "staging/aks/terraform.tfstate"
# prod:    key = "prod/aks/terraform.tfstate"

Why remote state:
  ✅ Shared across team (not on local laptop)
  ✅ State locking — Azure blob lease prevents
     two people applying simultaneously
  ✅ Versioning — restore on accidental corruption
  ✅ Secure — RBAC on storage account</div>
      </div>
      <div>
        <div class="ans-label">State Commands</div>
        <div class="code-box"># List all resources tracked in state
terraform state list

# Show state detail for one resource
terraform state show azurerm_kubernetes_cluster.aks

# Import existing Azure resource into state
# (resource exists in Azure but not in Terraform)
terraform import azurerm_resource_group.main \
  /subscriptions/xxx/resourceGroups/rg-prod

# Remove resource from state (without destroying it)
terraform state rm azurerm_resource_group.old

# Move resource after refactoring (no destroy/recreate)
terraform state mv \
  azurerm_kubernetes_cluster.old \
  module.aks.azurerm_kubernetes_cluster.main

# Preferred modern approach for rename:
moved {
  from = azurerm_resource_group.main
  to   = azurerm_resource_group.primary
}</div>
        <div class="warn-box">⚠️ State file contains secrets in plaintext. Enable encryption on Azure Storage. Never commit .tfstate to git — add to .gitignore. If lost → terraform import every resource back.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Terraform Modules — Reusable Infrastructure</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Folder Structure</div>
        <div class="code-box">modules/
  aks/
    main.tf        # AKS cluster resource
    variables.tf   # module inputs
    outputs.tf     # module outputs
    README.md      # document the module API
  acr/
    main.tf
    variables.tf
    outputs.tf
  networking/
    main.tf
    variables.tf
    outputs.tf

environments/
  dev/
    main.tf        # calls modules with dev values
    terraform.tfvars
    backend.tf
  prod/
    main.tf        # calls modules with prod values
    terraform.tfvars
    backend.tf</div>
        <div class="ans-label" style="margin-top:10px;">Calling a Module</div>
        <div class="code-box"># environments/prod/main.tf
module "networking" {
  source   = "../../modules/networking"
  env      = "prod"
  location = "uksouth"
  vnet_cidr = "10.0.0.0/8"
}

module "aks" {
  source         = "../../modules/aks"
  env            = "prod"
  node_count     = 5
  vm_size        = "Standard_D4s_v3"
  subnet_id      = module.networking.aks_subnet_id
  resource_group = azurerm_resource_group.main.name
}

module "acr" {
  source = "../../modules/acr"
  env    = "prod"
  sku    = "Premium"
}

# Grant AKS pull access to ACR
resource "azurerm_role_assignment" "aks_acr" {
  scope                = module.acr.registry_id
  role_definition_name = "AcrPull"
  principal_id         = module.aks.kubelet_identity_id
}</div>
      </div>
      <div>
        <div class="ans-label">AKS Module (modules/aks/main.tf)</div>
        <div class="code-box">resource "azurerm_kubernetes_cluster" "main" {
  name                = "aks-&#36;{var.env}"
  location            = var.location
  resource_group_name = var.resource_group
  dns_prefix          = "aks-&#36;{var.env}"
  kubernetes_version  = var.k8s_version

  default_node_pool {
    name                = "system"
    enable_auto_scaling = true
    min_count           = var.min_count
    max_count           = var.max_count
    vm_size             = var.vm_size
    vnet_subnet_id      = var.subnet_id
    os_disk_size_gb     = 128
  }

  identity { type = "SystemAssigned" }

  workload_identity_enabled = true
  oidc_issuer_enabled       = true

  network_profile {
    network_plugin    = "azure"
    network_policy    = "calico"
    load_balancer_sku = "standard"
  }

  oms_agent {
    log_analytics_workspace_id = var.log_analytics_id
  }

  tags = var.tags
}

# modules/aks/outputs.tf
output "cluster_name"       { value = azurerm_kubernetes_cluster.main.name }
output "kubelet_identity_id" {
  value = azurerm_kubernetes_cluster.main.kubelet_identity[0].object_id
}</div>
        <div class="tip-box">✅ Modules are a public API — document every input/output. Use validation blocks on variables. Pin module versions when referencing registry modules: source = "Azure/aks/azurerm" version = "~> 7.0"</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Workspaces — Multiple Environments</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Workspace Commands</div>
        <div class="code-box"># Create workspaces
terraform workspace new dev
terraform workspace new staging
terraform workspace new prod

# Switch workspace
terraform workspace select prod

# Show current
terraform workspace show

# Use in config
resource "azurerm_resource_group" "main" {
  name = "rg-&#36;{terraform.workspace}-orders"
  # → rg-dev-orders / rg-prod-orders
}

locals {
  settings = {
    dev     = { node_count = 1, vm_size = "Standard_B2s"   }
    staging = { node_count = 2, vm_size = "Standard_D2s_v3" }
    prod    = { node_count = 5, vm_size = "Standard_D4s_v3" }
  }
  cfg = local.settings[terraform.workspace]
}

# State files are auto-isolated per workspace:
# env:/dev/terraform.tfstate
# env:/prod/terraform.tfstate</div>
      </div>
      <div>
        <div class="ans-label">Workspaces vs Separate Directories</div>
        <div class="code-box">Workspaces:
  ✅ Single codebase, isolated state files
  ✅ Simple to switch environments
  ❌ All envs share same variables.tf
  ❌ Risky — easy to run plan in wrong workspace
  ❌ Hard to have per-env structural differences
  Best for: identical small envs, small teams

Separate directories (recommended for prod):
  environments/dev/    → own state, own tfvars
  environments/prod/   → own state, own tfvars
  ✅ Fully isolated — cannot accidentally target prod
  ✅ Different configs per env
  ✅ Separate pipeline with separate approvals
  ❌ Some duplication (mitigate with shared modules)
  Best for: enterprise, regulated environments

Terragrunt (DRY wrapper):
  Eliminates directory duplication.
  environments/prod/aks/terragrunt.hcl:
    → references module + injects prod vars
    → auto-configures remote backend per env</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Terraform CI/CD Pipeline</div>
  <div class="ref-body">
    <div class="code-box">PR / Feature Branch (no apply — read-only):
  1. terraform fmt --check        ← formatting check
  2. terraform validate           ← syntax validation
  3. tfsec . --minimum-severity HIGH   ← security scan
  4. checkov -d . --framework terraform
  5. terraform plan -out=tfplan   ← generate plan
  6. Post plan diff as PR comment ← reviewer sees exact changes

Merge to main → Dev auto-deploy:
  7. terraform apply tfplan        ← auto apply (dev only)

Staging Deploy:
  8. terraform plan -out=tfplan
  9. Manual approval gate (architect reviews plan in PR)
  10. terraform apply tfplan

Production Deploy:
  11. terraform plan -out=tfplan
  12. Change Advisory Board approval
  13. terraform apply tfplan
  14. Post-apply: terraform show → verify resources created</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Azure DevOps YAML Pipeline</div>
        <div class="code-box">stages:
  - stage: Validate
    jobs:
      - job: TFValidate
        steps:
          - task: TerraformInstaller@1
            inputs: { terraformVersion: '1.6.0' }
          - task: TerraformTaskV4@4
            displayName: Init
            inputs:
              command: init
              backendServiceArm: 'tf-state-connection'
          - task: TerraformTaskV4@4
            displayName: Validate
            inputs: { command: validate }
          - script: |
              tfsec . --minimum-severity HIGH \
                      --format junit > tfsec.xml
            displayName: tfsec security scan

  - stage: Plan
    jobs:
      - job: TFPlan
        steps:
          - task: TerraformTaskV4@4
            inputs:
              command: plan
              commandOptions: '-out=tfplan'
              environmentServiceNameAzureRM: 'azure-sp'

  - stage: Apply
    condition: and(succeeded(),
      eq(variables['Build.SourceBranch'], 'refs/heads/main'))
    jobs:
      - deployment: TFApply
        environment: 'prod'  # requires manual approval in ADO
        steps:
          - task: TerraformTaskV4@4
            inputs:
              command: apply
              commandOptions: 'tfplan'</div>
      </div>
      <div>
        <div class="ans-label">Complete Azure Stack Example</div>
        <div class="code-box">locals {
  name_prefix = "myapp-prod"
  common_tags = { Environment = "prod", ManagedBy = "Terraform" }
}

resource "azurerm_resource_group" "main" {
  name     = "&#36;{local.name_prefix}-rg"
  location = "uksouth"
  tags     = local.common_tags
}

resource "azurerm_virtual_network" "main" {
  name                = "&#36;{local.name_prefix}-vnet"
  address_space       = ["10.0.0.0/8"]
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
}

resource "azurerm_subnet" "aks" {
  name                 = "snet-aks"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.1.0.0/16"]
}

resource "azurerm_container_registry" "main" {
  name                = "acrprodmyapp"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Premium"
  admin_enabled       = false
}

resource "azurerm_kubernetes_cluster" "main" {
  name                = "&#36;{local.name_prefix}-aks"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "myapp-prod"

  default_node_pool {
    name                = "system"
    enable_auto_scaling = true
    min_count = 2 ; max_count = 5
    vm_size   = "Standard_D4s_v3"
    vnet_subnet_id = azurerm_subnet.aks.id
  }

  identity                  { type = "SystemAssigned" }
  workload_identity_enabled = true
  oidc_issuer_enabled       = true

  lifecycle { prevent_destroy = true }
}

# AKS pull access to ACR (no credentials needed)
resource "azurerm_role_assignment" "aks_acr" {
  scope                = azurerm_container_registry.main.id
  role_definition_name = "AcrPull"
  principal_id = azurerm_kubernetes_cluster.main
                   .kubelet_identity[0].object_id
}</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Best Practices — Architect Checklist</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Area</div><div>Practice</div><div>Why</div></div>
      <div class="pt-row"><div class="pt-name">Code</div><div>Separate files: main.tf, variables.tf, outputs.tf, locals.tf, versions.tf</div><div>Standard layout — any Terraform dev navigates immediately</div></div>
      <div class="pt-row"><div class="pt-name">Code</div><div>Pin provider AND module versions (~&gt; 3.90)</div><div>Prevent surprise breaking changes on terraform init</div></div>
      <div class="pt-row"><div class="pt-name">Code</div><div>Add validation blocks to variables</div><div>Fail fast with clear messages, not obscure API errors</div></div>
      <div class="pt-row"><div class="pt-name">State</div><div>Remote state, separate file per environment</div><div>Blast radius isolation — prod failure can't corrupt dev</div></div>
      <div class="pt-row"><div class="pt-name">State</div><div>terraform plan -out=tfplan → apply tfplan</div><div>Apply matches exactly the reviewed plan — no surprises</div></div>
      <div class="pt-row"><div class="pt-name">State</div><div>Enable versioning on state storage blob</div><div>Roll back to previous state after bad apply</div></div>
      <div class="pt-row"><div class="pt-name">Security</div><div>sensitive = true on secret variables/outputs</div><div>Prevents secrets appearing in plan/apply console log</div></div>
      <div class="pt-row"><div class="pt-name">Security</div><div>Managed Identity in CI — no client secrets</div><div>No long-lived credentials to rotate or leak</div></div>
      <div class="pt-row"><div class="pt-name">Security</div><div>Run tfsec/Checkov on every PR, block on HIGH</div><div>Catch CIS benchmark violations before they reach prod</div></div>
      <div class="pt-row"><div class="pt-name">Ops</div><div>lifecycle { prevent_destroy = true } on DBs/KVs</div><div>Protect critical resources from accidental destruction</div></div>
      <div class="pt-row"><div class="pt-name">Ops</div><div>Tag every resource: Environment, ManagedBy, Team</div><div>Cost allocation, drift detection, ownership clarity</div></div>
      <div class="pt-row"><div class="pt-name">Ops</div><div>Use moved {} blocks when renaming resources</div><div>Avoid destroy/recreate when refactoring module structure</div></div>
    </div>
    <div class="tip-box">✅ Interview answer: "Terraform's killer feature is plan/apply separation — always save plan to -out=tfplan, have a human review the exact diff, then apply that plan. Paired with tfsec in CI and prevent_destroy on stateful resources, this gives a safe, auditable IaC process."</div>
  </div>
</div>
`;
