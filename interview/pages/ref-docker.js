window.Pages['ref-docker'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Docker</span></div>
  <h1>🐳 Docker — Containers &amp; Images</h1>
  <p>Image Layers · Dockerfile · Multi-Stage Builds · Networking · Volumes · Registry</p>
</div>

<div class="ref-section">
  <div class="ref-title">Image Layers &amp; How Docker Builds Work</div>
  <div class="ref-body">
    <div class="code-box">Docker Image = stack of read-only layers.
Container = image layers + thin writable layer on top.

Each Dockerfile instruction creates a layer:
  FROM dotnet:8-sdk      ← Layer 1 (large — base OS + .NET SDK)
  WORKDIR /app           ← Layer 2 (metadata only)
  COPY *.csproj .        ← Layer 3 (project files)
  RUN dotnet restore     ← Layer 4 (NuGet packages) — cached if .csproj unchanged
  COPY . .               ← Layer 5 (source code)
  RUN dotnet publish     ← Layer 6 (build output)

Layer Cache: if layer N changes, all layers below N are rebuilt.
  → Put rarely-changing things FIRST (base image, restore)
  → Put frequently-changing things LAST (source code)</div>
    <div class="tip-box">✅ Caching trick: COPY *.csproj first → RUN dotnet restore → COPY . . This caches the restore step when only source code changes (most common case).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Multi-Stage Build — Production Best Practice</div>
  <div class="ref-body">
    <div class="code-box"># Stage 1: Build (SDK image — large, ~800MB)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime (runtime image — small, ~220MB)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
# Only copy build output from Stage 1
COPY --from=build /app/publish .

# Security: run as non-root user
RUN adduser --disabled-password appuser
USER appuser

EXPOSE 8080
ENTRYPOINT ["dotnet", "MyApp.dll"]</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Why Multi-Stage?</div>
        <ul>
          <li><strong>Final image has NO SDK</strong> — only runtime (~220MB vs ~800MB)</li>
          <li><strong>No source code</strong> in production image — security</li>
          <li><strong>No build tools</strong> (compilers, git) in production</li>
          <li><strong>Smaller attack surface</strong> — fewer installed packages</li>
          <li><strong>Faster pull</strong> — smaller image downloads faster</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Security Hardening</div>
        <div class="code-box"># Non-root user
USER appuser

# Read-only filesystem
docker run --read-only myapp

# No new privileges
--security-opt=no-new-privileges

# Drop all Linux capabilities
--cap-drop ALL --cap-add NET_BIND_SERVICE

# Distroless base (Google):
FROM gcr.io/distroless/dotnet:8
# No shell, no package manager, minimal attack surface</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Docker Networking</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Network Mode</div><div>Behavior</div><div>Use Case</div></div>
      <div class="pt-row"><div class="pt-name">bridge (default)</div><div>Containers on private virtual network. Communicate by name. NAT to host.</div><div>docker-compose, local development</div></div>
      <div class="pt-row"><div class="pt-name">host</div><div>Container shares host network stack. No network isolation.</div><div>High performance, low latency tools. Not for prod.</div></div>
      <div class="pt-row"><div class="pt-name">none</div><div>No network interface. Fully isolated.</div><div>Batch processing, no network needed</div></div>
      <div class="pt-row"><div class="pt-name">overlay</div><div>Multi-host networking (Docker Swarm). Containers on different hosts communicate.</div><div>Docker Swarm, multi-node clusters</div></div>
    </div>
    <div class="code-box" style="margin-top:12px;">docker-compose container communication:
  services:
    api:
      image: myapi
    db:
      image: postgres

  # api can reach db via hostname "db"
  # API connection string: Server=db;Database=mydb...
  # docker-compose creates a bridge network automatically</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Volumes — Persistent Data</div>
  <div class="ref-body">
    <div class="three-col">
      <div>
        <div class="ans-label">Named Volume</div>
        <div class="code-box">docker run -v mydata:/var/lib/postgresql mydb

Managed by Docker.
Stored in /var/lib/docker/volumes/
Persists container restarts &amp; deletion.
Portable (backup, migrate).

✅ Recommended for DB data,
   app state, config.</div>
      </div>
      <div>
        <div class="ans-label">Bind Mount</div>
        <div class="code-box">docker run -v /host/path:/container/path myapp

Maps host directory into container.
Host file changes = instant in container.
Container writes = visible on host.

✅ Dev: mount source code for hot reload.
❌ Prod: host path may not exist.</div>
      </div>
      <div>
        <div class="ans-label">tmpfs Mount</div>
        <div class="code-box">docker run --tmpfs /tmp myapp

In-memory only.
Cleared when container stops.
Never written to disk.

✅ Sensitive temp files (tokens, certs).
✅ High-speed temp storage.
❌ No persistence.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Container Registry &amp; Image Management</div>
  <div class="ref-body">
    <div class="code-box">Registry: stores and distributes Docker images.

Azure Container Registry (ACR):
  az acr build --registry myacr --image myapp:v1.0 .

Tag convention:
  myacr.azurecr.io/myapp:latest          ← floating tag (avoid in prod!)
  myacr.azurecr.io/myapp:1.2.3           ← semantic version (✅ preferred)
  myacr.azurecr.io/myapp:git-abc123def   ← commit SHA (✅ immutable)

ACR Tasks: build on code push (CI/CD without Docker installed locally)
ACR Geo-replication: replicate images to multiple regions for fast pull
ACR RBAC: grant AKS Workload Identity "AcrPull" role (no registry credentials needed)</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Image Scanning</div>
        <div class="code-box">Trivy: scan image layers for OS CVEs.
  trivy image myacr.azurecr.io/myapp:1.0
  → lists vulnerabilities by severity

ACR built-in: Microsoft Defender for Containers
  auto-scans on push.
  Alerts on Critical/High CVEs.

CI/CD gate:
  trivy image --exit-code 1 \
    --severity CRITICAL myapp:latest
  → fails pipeline if critical CVE found</div>
      </div>
      <div>
        <div class="ans-label">Docker vs VM comparison</div>
        <div class="code-box">VM:
  Full OS per VM (GBs)
  Minutes to start
  Strong isolation (hypervisor)
  High resource usage

Container:
  Shares host OS kernel (MBs)
  Seconds to start
  Process-level isolation (namespaces/cgroups)
  Low resource usage
  Portable: same image runs dev → prod

Not mutually exclusive:
  AKS nodes = VMs running containers
  Best of both: VM isolation at node level,
  container efficiency at workload level</div>
      </div>
    </div>
  </div>
</div>
`;
