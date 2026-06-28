window.Pages['ref-storage'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Storage</span></div>
  <h1>💾 Storage Systems</h1>
  <p>Blob · File Storage · NAS · SAN · NFS · SMB · DFS · Object Storage · Tiering</p>
</div>

<div class="ref-section">
  <div class="ref-title">Storage Types Overview</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Type</div><div>What</div><div>Access</div><div>Use Case</div></div>
      <div class="pt-row"><div class="pt-name">Block Storage</div><div>Raw disk blocks. OS sees it as a disk.</div><div>Low-level I/O (iSCSI, FC)</div><div>OS volumes, databases (high IOPs)</div></div>
      <div class="pt-row"><div class="pt-name">File Storage (NAS)</div><div>Shared file system with directory tree.</div><div>NFS, SMB/CIFS</div><div>Shared config, home dirs, media</div></div>
      <div class="pt-row"><div class="pt-name">Object Storage</div><div>Flat namespace. Key → binary blob + metadata.</div><div>HTTP REST API</div><div>Images, videos, backups, logs, ML datasets</div></div>
      <div class="pt-row"><div class="pt-name">SAN</div><div>Storage Area Network — dedicated storage network.</div><div>Fibre Channel / iSCSI</div><div>Enterprise databases, VMware datastores</div></div>
      <div class="pt-row"><div class="pt-name">DFS</div><div>Distributed File System — aggregates multiple shares.</div><div>SMB namespace</div><div>Unified namespace across multiple file servers</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Azure Blob Storage (Object Storage)</div>
  <div class="ref-body">
    <div class="code-box">Hierarchy: Storage Account → Container → Blob
  Blob types:
    Block Blob: large files, uploaded in blocks (up to 190 TB)
    Append Blob: log files, write-only append
    Page Blob: random read/write access (VHD disks)

Access tiers (cost vs latency):
  Hot:    frequent access, highest cost, instant access
  Cool:   infrequent (30 days+), lower cost, instant access
  Cold:   rare (90 days+), even lower cost
  Archive: rarely (180 days+), very low cost, 1-15 hour rehydration

Lifecycle policy (auto-tier):
  {
    "rules": [{
      "name": "MoveToCool",
      "definition": {
        "filters": { "blobTypes": ["blockBlob"] },
        "actions": {
          "baseBlob": {
            "tierToCool": { "daysAfterModificationGreaterThan": 30 },
            "tierToArchive": { "daysAfterModificationGreaterThan": 90 },
            "delete": { "daysAfterModificationGreaterThan": 365 }
          }
        }
      }
    }]
  }</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Upload / Download (.NET)</div>
        <div class="code-box">var client = new BlobServiceClient(
    new Uri("https://myacct.blob.core.windows.net"),
    new DefaultAzureCredential());

var container = client.GetContainerClient("orders");

// Upload
await container.UploadBlobAsync("order-123.pdf", stream);

// Download
var blob = container.GetBlobClient("order-123.pdf");
var response = await blob.DownloadAsync();
using var file = File.Create(localPath);
await response.Value.Content.CopyToAsync(file);

// SAS URL (time-limited, no credentials)
var sas = blob.GenerateSasUri(
    BlobSasPermissions.Read,
    DateTimeOffset.UtcNow.AddHours(1));</div>
      </div>
      <div>
        <div class="ans-label">Security &amp; Performance</div>
        <div class="code-box">Security:
  Private: no public access (default, best)
  Blob: public read for blobs
  Container: public read for container + blobs

Managed Identity access (no keys!):
  Grant "Storage Blob Data Contributor" role
  Use DefaultAzureCredential() — no connection string

Performance:
  Partition key = first chars of blob name.
  Random prefix = better distribution.
  ❌ date-prefix/2024/01/01/ → all on same partition
  ✅ hash-prefix/ab/cd/file.txt → spread load

CDN integration:
  Front Door / CDN → cache blobs at edge
  Static website hosting: $web container</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">NAS — Network Attached Storage</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">NFS (Network File System)</div>
        <div class="code-box">NFS: Unix/Linux standard for network file shares.

# Mount NFS share
mount -t nfs 192.168.1.10:/exports/data /mnt/data

# /etc/fstab (permanent mount)
192.168.1.10:/exports/data /mnt/data nfs defaults,_netdev 0 0

Azure NetApp Files: enterprise NFS in Azure.
  Supports: NFSv3, NFSv4.1, SMB
  Ultra low latency (&lt;1ms) for SAP, Oracle.

Azure Files NFS:
  Azure Files with NFS protocol.
  Premium tier only (SSD-backed).
  Use: Linux workloads, POSIX compliance.</div>
      </div>
      <div>
        <div class="ans-label">SMB (Server Message Block)</div>
        <div class="code-box">SMB: Windows standard for file shares.
  SMB 3.x: encryption, multichannel, pre-auth integrity.

Azure Files (SMB):
  Fully managed SMB file share.
  Mount as drive on Windows/Linux.

# Windows mount
net use Z: \\myacct.file.core.windows.net\myshare /user:AZURE\myacct &lt;key&gt;

# Linux mount (SMB)
mount -t cifs //myacct.file.core.windows.net/myshare /mnt/share \
  -o vers=3.0,username=myacct,password=&lt;key&gt;

Use cases:
  Lift &amp; shift: replace on-prem file servers
  App config/profiles shared across multiple VMs
  Azure AD integrated access (no keys)</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">SAN vs NAS vs Object Storage</div>
  <div class="ref-body">
    <div class="code-box">SAN (Storage Area Network):
  Network dedicated to storage (separate from LAN).
  Protocols: Fibre Channel (FC), iSCSI (TCP/IP), FCoE
  Server sees SAN disk as local disk (block device).
  ✅ Highest performance, lowest latency
  ✅ SQL Server, Oracle, VMware VMFS
  ❌ Expensive, complex to manage, specialist knowledge

NAS vs SAN:
  NAS: file-level (share folders, NFS/SMB) — easy to set up
  SAN: block-level (raw disk) — higher perf, more complex

Object Storage vs File Storage:
  Object: flat namespace, HTTP API, massive scale (petabytes), no in-place edit
  File: hierarchical, POSIX, in-place edit, familiar OS interface

Choose:
  ✅ Object (Blob): images, videos, backups, ML data, web assets
  ✅ File (NFS/SMB): shared config, home directories, legacy app "needs a file share"
  ✅ Block (SAN/Premium Disk): databases, VMs, low-latency random I/O</div>
    <div class="ans-label" style="margin-top:14px;">DFS (Distributed File System)</div>
    <div class="code-box">Windows DFS: virtual namespace over multiple file servers.

DFS Namespace:
  \\company.com\data\reports → actually on \\server1\reports
  Transparent to users — one unified path.

DFS Replication (DFSR):
  Replicate folders between servers for redundancy.
  Multi-master: changes on any server replicate to others.
  Conflict resolution: last-writer-wins.

Use cases:
  Branch office replication (local copy for fast access)
  Disaster recovery for file shares
  Load distribution across file servers</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Storage Selection Guide</div>
  <div class="ref-body">
    <div class="code-box">Scenario → Recommended Storage:

User profile images/videos           → Azure Blob Storage (Hot tier)
Application logs archive             → Azure Blob Storage (Cool/Archive + lifecycle policy)
Shared config files across VMs       → Azure Files (SMB) or NFS
Database data files                  → Azure Premium Disk (SSD, block storage)
Container persistent volumes (K8s)   → Azure Disk (RWO) or Azure Files (RWX)
SAP HANA / Oracle high-perf          → Azure NetApp Files (ultra-low latency NFS)
Large-scale ML training data         → Azure Data Lake Storage Gen2 (ADLS2 = Blob + hierarchical namespace)
Static website assets + CDN          → Azure Blob static website + Azure Front Door
Backup &amp; DR                         → Azure Backup / blob Archive tier</div>
  </div>
</div>
`;
