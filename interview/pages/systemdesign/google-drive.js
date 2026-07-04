window.Pages['sd-google-drive'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>Google Drive (File Storage)</span></div>
  <h1>&#128193; Google Drive — File Storage &amp; Sync System Design</h1>
  <p>Chunked upload, delta-sync, conflict resolution, ACL enforcement, and full-text search at exabyte scale</p>
</div>

<div class="ref-section">
  <div class="ref-title">System Architecture Diagram</div>
  <div class="ref-body" style="overflow-x:auto;">
    <svg viewBox="0 0 900 420" style="width:100%;max-width:900px;display:block;margin:0 auto;border-radius:10px;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#4b5563"/>
        </marker>
      </defs>
      <rect width="900" height="420" fill="#0d1117" rx="10"/>

      <!-- Layer labels -->
      <text x="14" y="74" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,74)">CLIENT</text>
      <text x="14" y="164" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,164)">GATEWAY</text>
      <text x="14" y="270" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,270)">SERVICES</text>
      <text x="14" y="374" font-size="11" fill="#888" font-family="monospace" transform="rotate(-90,14,374)">DATA</text>

      <!-- Layer bands -->
      <rect x="30" y="18" width="860" height="70" rx="6" fill="#ffffff08"/>
      <rect x="30" y="98" width="860" height="58" rx="6" fill="#ffffff06"/>
      <rect x="30" y="166" width="860" height="130" rx="6" fill="#ffffff05"/>
      <rect x="30" y="306" width="860" height="100" rx="6" fill="#ffffff06"/>

      <!-- CLIENT LAYER -->
      <rect x="50" y="29" width="110" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="105" y="49" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#128187; Desktop</text>
      <text x="105" y="65" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Sync Client</text>

      <rect x="200" y="29" width="110" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="255" y="49" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#128241; Mobile</text>
      <text x="255" y="65" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">iOS / Android</text>

      <rect x="350" y="29" width="110" height="46" rx="8" fill="#1a2740" stroke="#4a9eff" stroke-width="1.5"/>
      <text x="405" y="49" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#127760; Web</text>
      <text x="405" y="65" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Browser App</text>

      <rect x="680" y="29" width="120" height="46" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="740" y="49" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#127760; CDN</text>
      <text x="740" y="65" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Thumbnails/Preview</text>

      <!-- GATEWAY LAYER -->
      <rect x="310" y="110" width="280" height="36" rx="8" fill="#1a2d20" stroke="#4ade80" stroke-width="1.5"/>
      <text x="450" y="125" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#127760; API Gateway</text>
      <text x="450" y="139" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Auth · Rate Limit · TLS Termination · Routing</text>

      <!-- SERVICES LAYER -->
      <rect x="40" y="178" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="95" y="198" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#128228; Upload</text>
      <text x="95" y="212" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Chunked/Resumable</text>

      <rect x="170" y="178" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="225" y="198" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#128196; Metadata</text>
      <text x="225" y="212" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Spanner/MySQL</text>

      <rect x="300" y="178" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="355" y="198" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#128260; Sync</text>
      <text x="355" y="212" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Delta/Conflict</text>

      <rect x="430" y="178" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="485" y="198" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#128274; Share/ACL</text>
      <text x="485" y="212" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Permission Svc</text>

      <rect x="558" y="178" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="613" y="198" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#128269; Search</text>
      <text x="613" y="212" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Elasticsearch</text>

      <rect x="686" y="178" width="110" height="46" rx="8" fill="#2a1f3d" stroke="#a78bfa" stroke-width="1.5"/>
      <text x="741" y="198" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#128247; Preview</text>
      <text x="741" y="212" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Thumbnail Gen</text>

      <!-- Kafka -->
      <rect x="310" y="240" width="280" height="36" rx="8" fill="#2d2a1a" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="450" y="255" font-size="11" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#128233; Kafka</text>
      <text x="450" y="269" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">file-events · sync-events · audit-log</text>

      <!-- DATA LAYER -->
      <rect x="40" y="318" width="130" height="46" rx="8" fill="#1f2d1a" stroke="#86efac" stroke-width="1.5"/>
      <text x="105" y="338" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#9749; GCS / S3</text>
      <text x="105" y="352" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">File Chunks</text>

      <rect x="195" y="318" width="130" height="46" rx="8" fill="#1a2040" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="260" y="338" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#128201; Spanner</text>
      <text x="260" y="352" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Metadata + ACL</text>

      <rect x="350" y="318" width="130" height="46" rx="8" fill="#1a2040" stroke="#34d399" stroke-width="1.5"/>
      <text x="415" y="338" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#128202; Bigtable</text>
      <text x="415" y="352" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Change Log</text>

      <rect x="505" y="318" width="120" height="46" rx="8" fill="#2d1a1a" stroke="#f87171" stroke-width="1.5"/>
      <text x="565" y="338" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#9889; Redis</text>
      <text x="565" y="352" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Active Sessions</text>

      <rect x="650" y="318" width="130" height="46" rx="8" fill="#2d1f1a" stroke="#fb923c" stroke-width="1.5"/>
      <text x="715" y="338" font-size="10" fill="#e2e8f0" font-family="monospace" font-weight="bold" text-anchor="middle">&#128202; Elastic</text>
      <text x="715" y="352" font-size="9" fill="#94a3b8" font-family="monospace" text-anchor="middle">Full-Text Search</text>

      <!-- ARROWS: Clients -> Gateway -->
      <line x1="105" y1="75" x2="370" y2="110" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="255" y1="75" x2="420" y2="110" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="405" y1="75" x2="450" y2="110" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- CDN side arrow -->
      <line x1="560" y1="52" x2="680" y2="52" stroke="#4b5563" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr)"/>

      <!-- ARROWS: Gateway -> Services -->
      <line x1="360" y1="146" x2="140" y2="178" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="390" y1="146" x2="265" y2="178" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="430" y1="146" x2="390" y2="178" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="470" y1="146" x2="510" y2="178" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="510" y1="146" x2="640" y2="178" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="530" y1="146" x2="768" y2="178" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Services -> Kafka -->
      <line x1="95" y1="224" x2="340" y2="240" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="355" y1="224" x2="400" y2="240" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="485" y1="224" x2="460" y2="240" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="613" y1="224" x2="530" y2="240" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Services -> Data direct -->
      <line x1="95" y1="224" x2="105" y2="318" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="225" y1="224" x2="260" y2="318" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="485" y1="224" x2="480" y2="318" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>

      <!-- ARROWS: Kafka -> Data -->
      <line x1="380" y1="276" x2="280" y2="318" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="430" y1="276" x2="415" y2="318" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
      <line x1="530" y1="276" x2="650" y2="318" stroke="#4b5563" stroke-width="1.5" marker-end="url(#arr)"/>
    </svg>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Problem</div>
        <p>Build a cloud file storage system where users can upload, download, organise, share, and sync files across multiple devices with automatic conflict resolution, fine-grained permissions, and full-text search — at global scale.</p>
        <div class="ans-label" style="margin-top:12px;">Scale Numbers</div>
        <ul>
          <li>3 billion registered users (Google accounts as of 2024)</li>
          <li>1 billion+ active Drive users monthly</li>
          <li>~4.8 petabytes of data uploaded to Google every day across all services</li>
          <li>15 GB free tier per user; pays scale to 2 TB+</li>
          <li>Median file size ~2 MB; P99 file ~500 MB (video)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Core Challenges</div>
        <ul>
          <li>Chunked, resumable upload for large files over unreliable networks</li>
          <li>Delta-sync: only transmit changed blocks, not full files</li>
          <li>Conflict resolution when two devices edit the same file offline</li>
          <li>ACL enforcement at read time without a central bottleneck</li>
          <li>Full-text search over billions of documents in &lt;500ms</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Functional Requirements</div>
        <ul>
          <li>Upload, download, delete, rename, and move files/folders</li>
          <li>Share files/folders with users or via public link (view/comment/edit roles)</li>
          <li>Auto-sync across desktop, mobile, and web clients</li>
          <li>Version history — restore any of the last 100 versions</li>
          <li>Full-text search of file names and document content</li>
          <li>Preview generation (thumbnails, PDF preview, Google Docs viewer)</li>
          <li>Collaborative editing for Google Docs/Sheets/Slides (out of scope here)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Non-Functional Requirements</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>NFR</div><div>Target</div><div>Why</div><div>Approach</div></div>
          <div class="pt-row"><div class="pt-name">Upload Latency (small file)</div><div>&lt; 200ms TTFB</div><div>Perceived responsiveness</div><div>Parallel chunk upload + S3 multi-part</div></div>
          <div class="pt-row"><div class="pt-name">Durability</div><div>99.999999999% (11 nines)</div><div>Users' irreplaceable files</div><div>3x geo-redundant replication in GCS</div></div>
          <div class="pt-row"><div class="pt-name">Availability</div><div>99.9% monthly uptime</div><div>Sync must survive AZ failure</div><div>Multi-region active-active</div></div>
          <div class="pt-row"><div class="pt-name">Sync Latency</div><div>&lt; 5 sec to propagate change</div><div>Collaborative feel</div><div>WebSocket push via Sync Engine</div></div>
          <div class="pt-row"><div class="pt-name">Search Latency</div><div>&lt; 500ms P95</div><div>Productivity tool</div><div>Elasticsearch with pre-built inverted index</div></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <p>Stated assumptions — interviewers value the reasoning, not the exact digits.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Metric</div><div>Assumption</div><div>Calculation</div><div>Result</div></div>
      <div class="pt-row"><div class="pt-name">DAU</div><div>500M active daily users</div><div>given</div><div>500M</div></div>
      <div class="pt-row"><div class="pt-name">Files uploaded/day</div><div>Avg 2 uploads/DAU</div><div>500M × 2</div><div>1 billion uploads/day</div></div>
      <div class="pt-row"><div class="pt-name">Avg file size</div><div>Median 2 MB across all types</div><div>given</div><div>2 MB</div></div>
      <div class="pt-row"><div class="pt-name">Daily ingestion volume</div><div>1B files × 2 MB</div><div>2 × 10^15 bytes</div><div>~2 PB/day</div></div>
      <div class="pt-row"><div class="pt-name">Uploads/sec (avg)</div><div>1B / 86,400</div><div>—</div><div>~11,600 uploads/sec</div></div>
      <div class="pt-row"><div class="pt-name">Peak uploads/sec</div><div>5x avg (business hours)</div><div>11,600 × 5</div><div>~58,000 uploads/sec</div></div>
      <div class="pt-row"><div class="pt-name">Metadata reads/sec</div><div>10x uploads (browse, sync check)</div><div>11,600 × 10</div><div>~116,000 reads/sec</div></div>
      <div class="pt-row"><div class="pt-name">Total storage (10 yr)</div><div>2 PB/day × 365 × 10</div><div>no dedup factor yet</div><div>~7.3 EB raw</div></div>
      <div class="pt-row"><div class="pt-name">After dedup + compression</div><div>~60% reduction (duplicate files, photos)</div><div>7.3 EB × 0.4</div><div>~2.9 EB effective</div></div>
      <div class="pt-row"><div class="pt-name">Replication factor</div><div>3-way geo replication in GCS</div><div>2.9 EB × 3</div><div>~8.7 EB physical capacity</div></div>
      <div class="pt-row"><div class="pt-name">Metadata DB size</div><div>500 bytes per file record × 10T files</div><div>—</div><div>~5 TB metadata</div></div>
      <div class="pt-row"><div class="pt-name">Bandwidth out (downloads)</div><div>3x more downloads than uploads</div><div>2 PB × 3</div><div>~6 PB egress/day</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">Key insight: the blob storage (GCS/S3) is the dominant cost. Deduplication using content-addressable storage (CAS — SHA-256 hash of chunk as key) is critical — identical files uploaded by millions of users only stored once.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. APIs</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Endpoint</div><div>Method</div><div>Purpose</div><div>Auth</div></div>
      <div class="pt-row"><div class="pt-name">/v3/files/initUpload</div><div>POST</div><div>Initiate resumable upload session, returns upload URL</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">/upload/v3/files/{uploadId}</div><div>PUT</div><div>Upload chunk (Content-Range header); returns 308 partial or 200 done</div><div>Upload session token</div></div>
      <div class="pt-row"><div class="pt-name">/v3/files/{fileId}</div><div>GET</div><div>Get file metadata (name, size, mimeType, parents, permissions)</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">/v3/files/{fileId}/content</div><div>GET</div><div>Download file bytes (supports Range header for partial download)</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">/v3/files/{fileId}/permissions</div><div>POST</div><div>Add share permission (user email + role: reader/writer/owner)</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">/v3/files/{fileId}/revisions</div><div>GET</div><div>List version history for a file</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">/v3/changes</div><div>GET</div><div>Poll changes since a pageToken (used by sync clients)</div><div>OAuth2 Bearer</div></div>
      <div class="pt-row"><div class="pt-name">/v3/files</div><div>GET</div><div>List/search files with q= query parameter (full-text + filter)</div><div>OAuth2 Bearer</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Initiate Resumable Upload</div>
        <div class="code-box">POST /v3/files/initUpload
Authorization: Bearer &lt;token&gt;
X-Upload-Content-Type: image/jpeg
X-Upload-Content-Length: 10485760

Body:
{
  "name": "vacation.jpg",
  "parents": ["folder-id-abc"],
  "mimeType": "image/jpeg"
}

Response 200:
Location: https://upload.googleapis.com/
  upload/v3/files?uploadType=resumable
  &amp;upload_id=xa298sd_sdlkj2

---
PUT /upload/v3/files?upload_id=xa298...
Content-Range: bytes 0-5242879/10485760
Content-Length: 5242880
[bytes 0..5242879]

Response: 308 Resume Incomplete
Range: 0-5242879</div>
      </div>
      <div>
        <div class="ans-label">API Design Standards</div>
        <ul>
          <li><strong>Auth:</strong> OAuth 2.0 with per-scope tokens (drive.file, drive.readonly, drive.metadata)</li>
          <li><strong>Resumable uploads:</strong> all files &gt; 5 MB must use resumable upload — client stores uploadId locally and resumes on network failure</li>
          <li><strong>Idempotency:</strong> chunk re-uploads are safe; server returns existing progress via 308 + Range header</li>
          <li><strong>Pagination:</strong> nextPageToken cursor on /files list and /changes</li>
          <li><strong>Rate limiting:</strong> per project (developer quota) and per user token; 429 with Retry-After header</li>
          <li><strong>Partial content:</strong> Range header support on download enables parallel chunk download by sync client</li>
          <li><strong>Versioning:</strong> URI versioning (/v3/); older versions sunset with 12-month notice</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">4. High-Level Architecture</div>
  <div class="ref-body">
    <div class="code-box">
[Web / Mobile / Desktop Sync Client]
         |
         v  (HTTPS, OAuth2)
    [API Gateway]  ← Auth · TLS · Rate Limit · Routing
    /    |    |    |      |       \
   /     |    |    |      |        \
[Upload  [Meta  [Sync  [Share/  [Search  [Preview
 Svc]    Svc]   Engine] ACL Svc] Svc]    Svc]
   \      |      |       |        |        |
    \     +------+-------+--------+--------+
     \                   |
      [Kafka: file-events, sync-events, audit-log]
              |           |          |
         [Bigtable:  [Spanner:   [Elasticsearch:
          ChangeLog]  Metadata     Full-Text Index]
                      + ACL]
   |
[GCS / S3: Blob chunks]   [Redis: Active Sessions + Delta Cache]
    </div>
    <div class="two-col" style="margin-top:12px;">
      <div>
        <div class="ans-label">Upload Path</div>
        <ul>
          <li>Client splits file into 256 KB–5 MB chunks, hashes each (SHA-256)</li>
          <li>Upload Service checks if chunk hash already exists in GCS (dedup)</li>
          <li>Only missing chunks are transferred (content-addressable storage)</li>
          <li>On completion, Metadata Service records file record in Spanner</li>
          <li>Kafka publishes file-created event consumed by Preview &amp; Search services</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Download / Sync Path</div>
        <ul>
          <li>Client polls /v3/changes with its stored pageToken to discover deltas</li>
          <li>Sync Engine returns list of changed chunk hashes since last sync</li>
          <li>Client downloads only the changed chunks — delta-sync</li>
          <li>Chunk served from CDN edge if already cached (thumbnails, previews)</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Key Services</div>
        <ul>
          <li><strong>Upload Service:</strong> chunked/resumable multipart, SHA-256 dedup, GCS write</li>
          <li><strong>Metadata Service:</strong> file tree, folder hierarchy, version history in Spanner</li>
          <li><strong>Sync Engine:</strong> per-device change token, delta computation, conflict detection</li>
          <li><strong>Share/ACL Service:</strong> role-based permissions (owner/writer/reader/commenter), link generation</li>
          <li><strong>Search Service:</strong> Elasticsearch index of file names + OCR/extracted text; near-real-time update via Kafka consumer</li>
          <li><strong>Preview Service:</strong> async thumbnail and PDF preview generation; output written to GCS and served via CDN</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. Core Service: Upload Service (Chunked &amp; Resumable)</div>
  <div class="ref-body">
    <p>The Upload Service is the most complex write path. It must handle multi-gigabyte files over unreliable mobile networks, guarantee exactly-once storage, and deduplicate content globally.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Chunking Strategy</div>
        <ul>
          <li>Client partitions file into fixed 5 MB chunks (last chunk may be smaller)</li>
          <li>SHA-256 hash computed per chunk client-side before transmission</li>
          <li>Client sends manifest: list of (chunkIndex, sha256, size) to Upload Service</li>
          <li>Service returns a diff: which chunk hashes are already in GCS (dedup hit) vs missing</li>
          <li>Client only uploads missing chunks — massive savings for common files (installers, shared templates)</li>
          <li>All chunks uploaded to same region bucket to minimise latency</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Resumable Upload Protocol</div>
        <ul>
          <li>Server creates an UploadSession record in Redis: {uploadId, userId, fileMetadata, chunkManifest, uploadedChunks[]}</li>
          <li>Client stores uploadId in local DB; on restart, re-reads session from server</li>
          <li>Server checks Content-Range header to validate and record each chunk</li>
          <li>Session TTL: 7 days (Google's own policy); after that, client restarts full upload</li>
          <li>308 Resume Incomplete response includes Range header showing highest consecutive byte received</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Content-Addressable Storage (Dedup)</div>
        <div class="code-box">// Dedup check (pseudo)
chunkKey = "chunk:" + sha256hex

if GCS.exists(chunkKey):
  // Already stored — skip upload
  return {status: "EXISTS"}

// Upload missing chunk
GCS.put(chunkKey, chunkBytes)
return {status: "UPLOADED"}

// Final assembly
fileRecord = {
  fileId: uuid(),
  chunkRefs: [sha256_1, sha256_2, ...],
  totalSize: N,
  mimeType: "...",
  ownerId: userId,
  ...
}
Spanner.insert("files", fileRecord)</div>
        <div class="ans-label" style="margin-top:12px;">Parallel Upload (Client)</div>
        <ul>
          <li>Client opens up to 8 parallel HTTP/2 connections per file</li>
          <li>Separate stream per chunk — saturates available bandwidth</li>
          <li>If a chunk fails: exponential backoff + retry that chunk only</li>
          <li>HTTP/2 multiplexing avoids head-of-line blocking of individual chunk streams</li>
        </ul>
      </div>
    </div>
    <div class="warn-box" style="margin-top:10px;">Edge case: what if the server crashes mid-upload and loses Redis state? — Upload sessions are checkpointed to Spanner (durable) on each chunk completion. Redis is warm cache only. Recovery reads from Spanner.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Core Service: Sync Engine (Delta-Sync &amp; Conflict Resolution)</div>
  <div class="ref-body">
    <p>The Sync Engine propagates changes between devices with minimum bandwidth usage and a deterministic conflict resolution policy.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Change Token Model</div>
        <ul>
          <li>Each change to any file owned by or shared with a user increments a global monotonic <strong>changeId</strong> in Bigtable</li>
          <li>Client stores its last synced <strong>pageToken</strong> locally (opaque cursor encoding a changeId)</li>
          <li>On wake-up, client calls GET /v3/changes?pageToken=X — server returns only changes after X</li>
          <li>Response includes nextPageToken for subsequent polling</li>
          <li>Bigtable change log: rowKey = (userId, changeId), value = {fileId, changeType, newVersion}</li>
          <li>TTL: change log retained 30 days; older clients forced to do full re-sync</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Delta Sync (Block-Level)</div>
        <ul>
          <li>For each changed file, sync client compares its local chunk-hash manifest vs. server manifest</li>
          <li>Only differing chunk indexes are downloaded — rsync-style algorithm</li>
          <li>For typical document edits (edit a paragraph), usually 1–2 chunks differ out of dozens</li>
          <li>Bandwidth reduction: ~90% vs full file download for incremental edits</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Conflict Resolution</div>
        <ul>
          <li><strong>Last-Write-Wins (LWW) by default:</strong> file has a server-side version vector; whichever write arrives last with a higher version wins</li>
          <li><strong>Conflict copy on true conflict:</strong> if two clients both edit the same file while offline and both push, server detects version fork — creates a "Conflicted copy (Device A, date)" alongside the winner</li>
          <li>Version fork detection: each file carries a parentRevisionId; if incoming upload's parentRevisionId doesn't match server's currentRevisionId → conflict</li>
          <li>User is notified; can manually pick or merge</li>
          <li>Google Docs uses OT (Operational Transformation) for real-time co-editing — different subsystem</li>
        </ul>
        <div class="code-box">// Conflict detection (pseudo)
upload.parentRevisionId == file.currentRevisionId
  ? accept_and_increment_revision()
  : create_conflict_copy(upload)
       + notify_user()</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Core Service: Share / ACL Service</div>
  <div class="ref-body">
    <p>Access control is evaluated on every file access. With billions of files and complex inherited permissions (folder → subfolder → file), the ACL service must be both correct and fast.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Permission Model</div>
        <ul>
          <li>Roles: <strong>owner</strong>, <strong>writer</strong>, <strong>commenter</strong>, <strong>reader</strong></li>
          <li>Permissions stored per file in Spanner: (fileId, principalType[user/group/domain/anyone], principalId, role)</li>
          <li>Inheritance: a folder permission propagates to all children unless overridden</li>
          <li>Inheritance stored as a materialised set per file (denormalised for read speed) — avoids tree traversal at read time</li>
          <li>Public link: generates a signed token embedding fileId + role; no account required</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">ACL Check at Read Time</div>
        <ul>
          <li>Every API request passes through ACL middleware before the handler</li>
          <li>First check: Redis cache — key (userId, fileId) → role. TTL: 60 seconds</li>
          <li>Cache miss: query Spanner permissions table (indexed on fileId + principalId)</li>
          <li>Group membership: pre-computed group-member list in Redis, refreshed hourly from Google Groups</li>
          <li>P99 ACL check latency: &lt;5ms (Redis hit), &lt;20ms (Spanner fallback)</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Spanner Schema (Permissions)</div>
        <div class="code-box">CREATE TABLE permissions (
  file_id       STRING(36) NOT NULL,
  principal_id  STRING(255) NOT NULL,
  principal_type ENUM('user','group',
                       'domain','anyone'),
  role          ENUM('owner','writer',
                     'commenter','reader'),
  created_at    TIMESTAMP,
  created_by    STRING(36),
  PRIMARY KEY (file_id, principal_id)
);

-- For ACL lookup:
CREATE INDEX idx_principal
  ON permissions (principal_id, file_id);</div>
        <div class="ans-label" style="margin-top:12px;">Link Sharing</div>
        <ul>
          <li>Signed URL: HMAC-SHA256(fileId + role + expiry + secret)</li>
          <li>Validated by ACL service at request time — no DB lookup needed</li>
          <li>Revocation: store revoked token hash in a Redis set; check on each request</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Database Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Store</div><div>Data</div><div>Why This Store</div><div>Key Design</div></div>
      <div class="pt-row"><div class="pt-name">GCS / S3 (Object Storage)</div><div>File chunks (keyed by SHA-256 hash)</div><div>Exabyte scale, 11-nines durability, cheap</div><div>Key: sha256hex; buckets sharded by first 2 hex chars for even distribution</div></div>
      <div class="pt-row"><div class="pt-name">Cloud Spanner (Metadata)</div><div>File records, folder hierarchy, version history, permissions</div><div>Globally consistent SQL, horizontally scalable, survives region failure</div><div>files table (fileId PK), parents table (folderId → fileId), permissions table</div></div>
      <div class="pt-row"><div class="pt-name">Bigtable (Change Log)</div><div>Per-user ordered change stream</div><div>Write-optimised wide-column, sorted by changeId, cheap time-series retention</div><div>Row key: userId#changeId (pad changeId to 20 digits for lexical sort)</div></div>
      <div class="pt-row"><div class="pt-name">Redis Cluster (Cache)</div><div>ACL cache (userId+fileId→role), active upload sessions, sync token cache</div><div>Sub-ms reads, TTL-based invalidation, small data</div><div>Cluster mode, 8 shards; ACL TTL 60s; session TTL 7 days</div></div>
      <div class="pt-row"><div class="pt-name">Elasticsearch</div><div>File name, MIME type, extracted text content, tags</div><div>Full-text inverted index, faceting, relevance ranking</div><div>Index per user's files; sharded on userId; updated via Kafka consumer</div></div>
    </div>
    <div class="code-box" style="margin-top:12px;">-- Spanner files table
CREATE TABLE files (
  file_id         STRING(36) NOT NULL,
  owner_id        STRING(36) NOT NULL,
  name            STRING(1024) NOT NULL,
  mime_type       STRING(255),
  size_bytes      INT64,
  current_rev_id  STRING(36),
  trashed         BOOL DEFAULT (FALSE),
  created_at      TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true),
  modified_at     TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true),
) PRIMARY KEY (file_id);

CREATE TABLE file_revisions (
  file_id      STRING(36) NOT NULL,
  rev_id       STRING(36) NOT NULL,
  chunk_refs   ARRAY&lt;STRING(64)&gt;,  -- SHA-256 hashes of chunks
  size_bytes   INT64,
  created_at   TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true),
  created_by   STRING(36),
) PRIMARY KEY (file_id, rev_id),
  INTERLEAVE IN PARENT files ON DELETE CASCADE;

CREATE TABLE parents (
  file_id    STRING(36) NOT NULL,
  parent_id  STRING(36) NOT NULL,
) PRIMARY KEY (file_id, parent_id);</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Data Flow — Key Scenarios</div>
  <div class="ref-body">
    <div class="ans-label">Scenario A: File Upload (Resumable)</div>
    <div class="flow-box">
      <div class="flow-step">1. Client splits file into 5 MB chunks, computes SHA-256 per chunk, sends manifest to POST /v3/files/initUpload</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. Upload Service checks GCS for each chunk hash (dedup check). Returns list of missing hashes. Creates UploadSession in Redis + Spanner.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Client uploads missing chunks via PUT with Content-Range header. Server stores each chunk in GCS keyed by SHA-256. Updates UploadSession.uploadedChunks[].</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. Final chunk received → Upload Service writes file record to Spanner (file_id, chunk_refs[], owner_id, size). Commits atomically.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. Kafka publishes {event: "file.created", fileId, ownerId}. Preview Service consumes → generates thumbnail → stores in GCS → CDN-cacheable. Search Service consumes → indexes file name + extracted text in Elasticsearch.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">6. Bigtable change log updated: (ownerId, changeId++) → {fileId, "CREATED"}. Sync Engine pushes SSE/WebSocket notification to other active sessions of the same user.</div>
    </div>

    <div class="ans-label" style="margin-top:18px;">Scenario B: Cross-Device Sync on Wake-Up</div>
    <div class="flow-box">
      <div class="flow-step">1. Mobile client wakes, sends GET /v3/changes?pageToken=last_stored_token</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. Sync Engine reads Bigtable change log for userId from stored changeId. Returns list of changed fileIds + new nextPageToken.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Client fetches metadata for changed files (GET /v3/files/{id}). Compares server chunk manifest vs. local chunk manifest.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. Only differing chunks downloaded from GCS (Range request). CDN serves cached chunks if available — avoids origin hit.</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">5. Client stores new pageToken. File on device updated. UI reflects changes.</div>
    </div>

    <div class="ans-label" style="margin-top:18px;">Scenario C: File Share &amp; Access</div>
    <div class="flow-box">
      <div class="flow-step">1. Owner calls POST /v3/files/{id}/permissions with {type:"user", email:"bob@example.com", role:"reader"}</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">2. ACL Service inserts row into Spanner permissions table. Publishes share event to Kafka (for audit log).</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">3. Bob's next API request to GET /v3/files/{id} hits ACL middleware → cache miss → Spanner lookup → role: reader. Stores in Redis (TTL 60s).</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">4. File metadata returned. Bob requests download → ACL check (now cache hit) → GCS signed URL generated → Bob downloads directly from GCS.</div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Caching Strategy</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>What</div><div>Where</div><div>TTL</div><div>Strategy &amp; Eviction</div></div>
      <div class="pt-row"><div class="pt-name">ACL / Permission check</div><div>Redis Cluster (per API pod)</div><div>60 seconds</div><div>Cache-aside. Write-through on permission change (immediate invalidation). LRU eviction.</div></div>
      <div class="pt-row"><div class="pt-name">File metadata (hot files)</div><div>Redis (read-through via Metadata Service)</div><div>5 minutes</div><div>Cache-aside. Invalidate on any metadata write. LRU. ~80% hit rate for recently accessed files.</div></div>
      <div class="pt-row"><div class="pt-name">Thumbnails / previews</div><div>CDN edge (Cloudflare / Cloud CDN)</div><div>7 days (immutable content hash URL)</div><div>Content-addressed key = sha256. Cache never stale — new file version = new key. Near-infinite CDN TTL safe.</div></div>
      <div class="pt-row"><div class="pt-name">Chunk blobs (downloads)</div><div>CDN edge for hot content</div><div>30 days for thumbnail chunks; no CDN for raw large files</div><div>Large file chunks served directly from GCS signed URL. Only thumbnails/previews go through CDN.</div></div>
      <div class="pt-row"><div class="pt-name">Search query results</div><div>Application-level LRU in Search Service</div><div>30 seconds</div><div>Short TTL due to live index updates. Not Redis — query result sets too variable.</div></div>
      <div class="pt-row"><div class="pt-name">Group membership (ACL)</div><div>Redis (per ACL Service instance)</div><div>1 hour</div><div>Background refresh. Stale reads briefly tolerated — group membership changes are rare.</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">Content-addressed storage makes CDN caching trivially safe: the URL contains the SHA-256 of the content — if content changes, the URL changes. No explicit cache invalidation needed for immutable chunk URLs.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. Message Queue / Event Streaming</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Kafka Topics</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>Topic</div><div>Producers</div><div>Consumers</div></div>
          <div class="pt-row"><div class="pt-name">file.events</div><div>Upload Svc, Metadata Svc</div><div>Preview Svc, Search Svc, Audit Svc, Quota Svc</div></div>
          <div class="pt-row"><div class="pt-name">sync.events</div><div>Sync Engine</div><div>Notification Svc (WebSocket push to clients)</div></div>
          <div class="pt-row"><div class="pt-name">acl.events</div><div>Share/ACL Svc</div><div>Audit Svc, Notification Svc (share notifications)</div></div>
          <div class="pt-row"><div class="pt-name">audit.log</div><div>All services</div><div>Compliance store (BigQuery cold analytics)</div></div>
        </div>
        <div class="ans-label" style="margin-top:12px;">Why Kafka (vs SQS)</div>
        <ul>
          <li><strong>Fan-out:</strong> multiple consumer groups independently consume the same file.events (Search, Preview, Audit) — Kafka consumer groups trivialise this; SQS needs topic duplication</li>
          <li><strong>Replay:</strong> Search re-indexing after schema change can replay all file events from offset 0</li>
          <li><strong>Ordering:</strong> per-partition ordering ensures change log is processed in order per file</li>
          <li><strong>Throughput:</strong> Kafka handles millions of events/sec with horizontal partition scaling</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Partitioning Strategy</div>
        <ul>
          <li><strong>file.events:</strong> partitioned by fileId — ensures all events for a file processed in order by Preview/Search</li>
          <li><strong>sync.events:</strong> partitioned by userId — all sync events for a user land in same partition, preserving change order</li>
          <li><strong>acl.events:</strong> partitioned by fileId</li>
          <li>Partition count: 200 partitions per topic (allows 200-way parallelism per consumer group)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Consumer Design</div>
        <ul>
          <li>Preview Service: idempotent — if thumbnail already exists in GCS (keyed by sha256), skip</li>
          <li>Search Service: upsert on fileId — repeated events safe</li>
          <li>All consumers checkpoint offset to Kafka (at-least-once delivery) + idempotency key to handle duplicates</li>
          <li>DLQ (Dead Letter Queue) for poison messages — manual intervention for corrupt payloads</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Real-time Communication</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Why Server-Sent Events (SSE) for Sync</div>
        <ul>
          <li>Drive sync is server-push dominant: server tells client about new changes</li>
          <li>Client does not need to send messages over the real-time channel (that goes via REST)</li>
          <li>SSE over HTTP/2 is simpler than WebSocket: unidirectional, reconnect handled by browser EventSource API</li>
          <li>Works through corporate HTTP proxies and firewalls that block WS upgrades</li>
          <li>Each client maintains one long-lived SSE connection to Notification Service</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Push Architecture</div>
        <ul>
          <li>Notification Service subscribes to sync.events Kafka topic</li>
          <li>In-memory map: userId → Set&lt;SSE connection&gt; (handles multiple tabs/devices)</li>
          <li>On receiving a sync event for userId: push JSON event to all open SSE connections</li>
          <li>Client receives event, triggers GET /v3/changes to fetch the actual delta</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Polling Fallback</div>
        <ul>
          <li>Mobile background sync cannot maintain persistent SSE (iOS/Android background kills connections)</li>
          <li>Fallback: push notification (FCM/APNs) wakes app → app polls /v3/changes</li>
          <li>Desktop sync client uses SSE while foreground; long-polling (30s timeout) as fallback</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Scaling SSE Connections</div>
        <ul>
          <li>SSE connections are stateful — load balancer must use consistent hashing (sticky sessions) by userId to route to correct Notification Service pod</li>
          <li>Alternatively: each Notification Service pod subscribes to all Kafka partitions, filters by its own connected userIds — no sticky routing needed (preferred for resilience)</li>
          <li>Each pod can sustain ~50,000 SSE connections (mostly idle connections, cheap)</li>
          <li>100 pods × 50K = 5M concurrent SSE connections — sufficient for 500M DAU with ~1% simultaneously connected</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. Consistency &amp; Transactions</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Where Strong Consistency is Required</div>
        <ul>
          <li><strong>Upload completion:</strong> file record creation in Spanner must be atomic with chunk manifest — Spanner provides serialisable transactions</li>
          <li><strong>Permission write:</strong> granting access must be immediately visible to that user — read-your-own-writes consistency in Spanner</li>
          <li><strong>Quota enforcement:</strong> user must not exceed storage quota — Spanner transaction decrements quota atomically with file creation</li>
          <li><strong>Conflict detection:</strong> parentRevisionId check vs. currentRevisionId must be atomic — Spanner serialisable read-write transaction</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Where Eventual Consistency is Acceptable</div>
        <ul>
          <li><strong>Search index:</strong> new file visible in search within ~10 seconds (async Kafka consumer)</li>
          <li><strong>Change log:</strong> Bigtable write is async after Spanner commit — sync client may be 1-2 seconds behind</li>
          <li><strong>ACL cache:</strong> Redis TTL 60s — revoked access can persist for up to 60s (documented SLA)</li>
          <li><strong>Preview/Thumbnail:</strong> generated asynchronously after upload; placeholder shown in UI until ready</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Distributed Locking (Conflict)</div>
        <div class="code-box">// Spanner optimistic concurrency for
// version conflict detection:

BEGIN TRANSACTION (serializable);
  current = READ files
    WHERE file_id = @fid
    FOR UPDATE;

  IF current.rev_id != @parent_rev_id:
    // Conflict — create conflict copy
    INSERT file_revisions (conflict_copy)
    ROLLBACK;  // return 409 to client
  ELSE:
    UPDATE files
      SET current_rev_id = @new_rev_id,
          modified_at = CURRENT_TIMESTAMP
    WHERE file_id = @fid;
    INSERT file_revisions ...;
COMMIT;</div>
        <div class="ans-label" style="margin-top:12px;">Idempotency</div>
        <ul>
          <li>Upload sessions are keyed by (userId, sha256(fileMetadata)) — re-initiating same upload returns existing sessionId</li>
          <li>Each chunk PUT is idempotent — re-uploading an already-received chunk returns 200 without re-writing to GCS</li>
          <li>Kafka consumers use (fileId, eventId) dedup key — at-least-once delivery made safe</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Search Architecture</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">What Gets Indexed</div>
        <ul>
          <li><strong>File metadata:</strong> name, MIME type, folder path, owner, shared-with list, created/modified dates, labels</li>
          <li><strong>Document content:</strong> OCR output for images/PDFs, extracted text from DOCX/XLSX, plain text from .txt files</li>
          <li><strong>Google Workspace docs:</strong> real-time content extracted by a separate pipeline (Docs content is not stored as blobs)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Indexing Pipeline</div>
        <ul>
          <li>Kafka consumer receives file.events</li>
          <li>Content Extractor workers pull file from GCS, run OCR (for images) or text extraction (for PDFs/Office docs)</li>
          <li>Extracted text truncated to 500KB (very large files indexed partially)</li>
          <li>Elasticsearch upsert: document keyed on fileId, contains name (keyword + text), content (text), ownerId, sharedWith[], mimeType, modifiedAt</li>
          <li>Indexing latency target: P95 &lt; 30 seconds after upload</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Elasticsearch Design</div>
        <ul>
          <li><strong>Sharding:</strong> index per logical shard of userId (not one index per user — too many shards). 64 shards total, userId mod 64 determines shard.</li>
          <li><strong>Routing:</strong> every query uses routing=userId so Elasticsearch only hits 1 shard — avoids scatter-gather across 64</li>
          <li><strong>Mapping:</strong> name field as both keyword (exact) and text (full-text analyzed). content as text only.</li>
          <li><strong>ACL in query:</strong> every search appended with bool filter: {ownerId:X OR sharedWith:X} — enforces access at query time</li>
        </ul>
        <div class="code-box">GET /files_index/_search
{
  "routing": "&lt;userId&gt;",
  "query": {
    "bool": {
      "must": { "multi_match": {
        "query": "quarterly report",
        "fields": ["name^3", "content"]
      }},
      "filter": [
        { "terms": {
          "access_principals": ["&lt;userId&gt;"]
        }}
      ]
    }
  }
}</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. CDN &amp; Media Delivery</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">What is CDN-Served</div>
        <ul>
          <li><strong>Thumbnails:</strong> image previews (128×128, 256×256, 512×512) generated by Preview Service, stored in GCS, served via Cloud CDN / Cloudflare</li>
          <li><strong>PDF previews:</strong> first-page PNG renderings for documents</li>
          <li><strong>Shared public files:</strong> files with link-sharing enabled can be CDN-cached for anonymous access</li>
          <li><strong>NOT CDN-served:</strong> private file downloads require ACL check → GCS signed URL issued per-request (30-minute expiry). CDN cannot cache private content safely.</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Cache Key Design</div>
        <ul>
          <li>Thumbnail URL: <code>https://cdn.example.com/thumb/{sha256hex}/{width}x{height}.jpg</code></li>
          <li>SHA-256 of the file's content chunk is part of the URL — content-addressed → immutable URL → safe infinite CDN TTL</li>
          <li>New file version → new SHA-256 → new URL → old CDN entry naturally expires or is simply never hit again</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Cache Invalidation</div>
        <ul>
          <li>No explicit CDN purge needed for thumbnails (content-addressed)</li>
          <li>For public shared files: on permission revocation (unshare), CDN cache must be purged — call Cloud CDN tag-based invalidation API keyed on fileId</li>
          <li>CDN edge PoPs: 200+ global PoPs ensure &lt;50ms TTFB for thumbnails globally</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">GCS Signed URLs for Private Downloads</div>
        <ul>
          <li>API Gateway issues a signed GCS URL after ACL check passes</li>
          <li>Signed URL embeds expiry (30 min), fileId, and HMAC signature</li>
          <li>Client downloads directly from GCS (or CDN if public) — Upload/Download Service is not in the hot path for bytes</li>
          <li>GCS streaming for large files: client can use Range requests against signed URL to support pause/resume</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">16. Security</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Authentication &amp; Authorization</div>
        <ul>
          <li><strong>OAuth 2.0:</strong> users authenticate via Google Identity. Access tokens (1-hour expiry) + refresh tokens. Scopes: drive.file, drive.readonly, drive.metadata.readonly</li>
          <li><strong>Service accounts:</strong> server-to-server calls (e.g., Preview Service → GCS) use Google IAM service account keys</li>
          <li><strong>ACL enforcement:</strong> every API call checks permissions before any data access — mandatory, not opt-in</li>
          <li><strong>Signed URLs:</strong> direct GCS access requires server-issued signed URL — no anonymous bucket access</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Encryption</div>
        <ul>
          <li><strong>In transit:</strong> TLS 1.3 enforced everywhere — client to API, API to GCS, inter-service via mTLS</li>
          <li><strong>At rest:</strong> GCS encrypts all objects with AES-256. Customer-managed keys (CMEK) available for enterprise</li>
          <li><strong>Client-side encryption (CSE):</strong> Enterprise tier allows client-side AES-256 encryption before upload — Google never sees plaintext</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Rate Limiting &amp; Abuse Prevention</div>
        <ul>
          <li>Per-project API quota (developer key): 1,000 req/100s default</li>
          <li>Per-user token bucket: 100 req/sec per user for metadata APIs</li>
          <li>Upload throttling: max 10 concurrent resumable sessions per user</li>
          <li>Quota service checks storage quota before accepting upload manifest</li>
          <li>Virus scanning: all uploaded files scanned async by Cloud DLP / ClamAV before being flagged as safe; infected files quarantined</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Audit Logging</div>
        <ul>
          <li>All file access, share, delete, and download events streamed to audit.log Kafka topic</li>
          <li>Retained in BigQuery for 7 years (compliance)</li>
          <li>Admins can query: "who accessed file X between dates A-B"</li>
          <li>GDPR: data deletion request triggers async pipeline to purge all chunks + metadata + audit log entries for that userId (soft delete first, then hard delete after 30-day grace period)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">17. Scalability Patterns</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Horizontal Scaling</div>
        <ul>
          <li><strong>Upload Service:</strong> stateless pods behind a load balancer. Upload session state in Redis (not local). Scale to 1,000+ pods during peak.</li>
          <li><strong>Metadata Service:</strong> stateless read replicas of Spanner in each region. Spanner auto-scales splits at hotspot ranges.</li>
          <li><strong>Sync Engine:</strong> stateless; scales horizontally. Change log read directly from Bigtable.</li>
          <li><strong>Search Service:</strong> Elasticsearch cluster with 64 shards + 1 replica each = 128 physical shards. Add data nodes to scale.</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Sharding Strategy</div>
        <ul>
          <li><strong>GCS blobs:</strong> sharded by first 2 hex chars of SHA-256 — gives 256 natural shards, prevents hotspotting on upload burst by single user</li>
          <li><strong>Spanner:</strong> interleaved file_revisions inside files by file_id — co-locate file + its revisions on same Spanner node. Hotspot avoidance via UUID primary keys (random distribution).</li>
          <li><strong>Bigtable change log:</strong> row key prefixed with userId — each user's changes co-located. Salted if single user generates extreme write volume.</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Read Replicas &amp; Read Scaling</div>
        <ul>
          <li>Spanner multi-region config: read replicas in US, EU, APAC. Reads served from nearest region with &lt;10ms latency.</li>
          <li>Metadata Service caches hot file records in Redis — ~80% cache hit rate means 80% of reads never hit Spanner</li>
          <li>Elasticsearch: replica shards serve read traffic; writes go to primary shards only</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Connection Pooling</div>
        <ul>
          <li>Each Upload Service pod maintains a connection pool to GCS (not per-request connections)</li>
          <li>Spanner client library maintains session pool (default 10–100 sessions per client) — Spanner sessions are expensive, must be reused</li>
          <li>Redis cluster: connection pooling via client library (e.g., go-redis Pool with maxActive=50 per pod)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Fault Tolerance &amp; Reliability</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Circuit Breaker</div>
        <ul>
          <li>Metadata Service → Spanner: circuit breaker (Hystrix / Resilience4j) opens after 5 consecutive failures, returns stale cache for 30s, then probes half-open</li>
          <li>Upload Service → GCS: retry with exponential backoff (100ms, 200ms, 400ms, max 3 retries); if all fail, return 503 to client — client retries resumable upload later</li>
          <li>Notification Service → Kafka: if Kafka unavailable, SSE push silently dropped — sync clients fall back to polling /v3/changes (graceful degradation)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Bulkhead Pattern</div>
        <ul>
          <li>Upload Service and Metadata Service are separate process pools — a Metadata Service overload does not affect ongoing uploads</li>
          <li>Preview generation (CPU intensive) runs in a separate worker pool with its own Kafka consumer group — isolated from latency-sensitive sync path</li>
          <li>Search indexing on separate consumer group — indexing backlog does not affect search query path</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Retry &amp; Idempotency</div>
        <ul>
          <li>Clients must implement exponential backoff with jitter on 429 / 503 responses</li>
          <li>Resumable upload protocol inherently handles retries — no data loss, no duplication</li>
          <li>Kafka consumers: at-least-once delivery + idempotent processing (check if thumbnail already exists before generating)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Multi-Region Redundancy</div>
        <ul>
          <li>GCS: multi-region bucket (US-MULTI-REGION) automatically replicates to 3+ data centres</li>
          <li>Spanner multi-region: 1 leader + 2 follower regions. Leader election automatic on region failure. RTO &lt; 2 minutes.</li>
          <li>Kafka: 3-broker cluster per region + cross-region MirrorMaker for disaster recovery</li>
          <li>Redis: Cluster mode with 3 master + 3 replica nodes across AZs. Automatic failover via Redis Sentinel.</li>
        </ul>
        <div class="tip-box" style="margin-top:8px;">GCS object writes are strongly consistent as of 2021 — no read-your-own-write inconsistency to worry about for blob storage.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Monitoring &amp; Observability</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Metrics (Prometheus + Grafana)</div>
        <ul>
          <li><strong>Upload Service:</strong> upload_throughput_bytes_total, upload_chunk_errors_total, resumable_sessions_active, dedup_hit_ratio</li>
          <li><strong>Metadata Service:</strong> spanner_query_latency_p99, cache_hit_rate, file_creates_per_sec, acl_check_latency_p99</li>
          <li><strong>Sync Engine:</strong> change_propagation_latency_p95, active_sse_connections, changes_per_sec</li>
          <li><strong>Kafka:</strong> consumer_lag per topic+partition — critical for detecting search indexing backlog</li>
          <li><strong>GCS:</strong> bytes_stored_total, object_create_rate, signed_url_generation_rate</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">SLO / SLA Targets</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>SLI</div><div>SLO</div><div>Alert Threshold</div></div>
          <div class="pt-row"><div class="pt-name">Upload API success rate</div><div>99.9%</div><div>Alert if &lt; 99.5% over 5 min</div></div>
          <div class="pt-row"><div class="pt-name">Download API P99 latency</div><div>&lt; 500ms</div><div>Alert if P99 &gt; 800ms over 5 min</div></div>
          <div class="pt-row"><div class="pt-name">Sync propagation P95</div><div>&lt; 5 sec</div><div>Alert if P95 &gt; 10s over 10 min</div></div>
          <div class="pt-row"><div class="pt-name">Search P95 latency</div><div>&lt; 500ms</div><div>Alert if P95 &gt; 1s over 5 min</div></div>
        </div>
      </div>
      <div>
        <div class="ans-label">Distributed Tracing (OpenTelemetry)</div>
        <ul>
          <li>Trace propagation via W3C Trace-Context header across all services</li>
          <li>Every upload traced end-to-end: API Gateway → Upload Svc → GCS → Kafka → Preview Svc</li>
          <li>Traces stored in Cloud Trace (or Jaeger) — sampled at 1% for normal traffic, 100% for errors</li>
          <li>Trace-based alerting: alert if P95 GCS write latency exceeds 200ms (traced per span)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Structured Logging (Cloud Logging)</div>
        <ul>
          <li>JSON structured logs: {timestamp, traceId, spanId, userId, fileId, event, durationMs}</li>
          <li>Log-based metrics: Elasticsearch indexing errors surface as metric (counter + alert)</li>
          <li>Security events (unauthorised access attempts) routed to Cloud Security Command Centre</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Dashboards</div>
        <ul>
          <li>Operational: upload/download rates, error rates, active sessions</li>
          <li>Business: daily uploads, storage consumed by tier, dedup ratio</li>
          <li>SLO burn rate dashboards: 1-hour and 6-hour burn rate for each SLO</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">20. Deployment Architecture</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Multi-Region Active-Active</div>
        <ul>
          <li>Three primary regions: us-central1 (Iowa), europe-west1 (Belgium), asia-southeast1 (Singapore)</li>
          <li>Users routed to nearest region via global Anycast load balancer (Cloud Load Balancing)</li>
          <li>Spanner multi-region leader election — writes accepted in any region and globally replicated</li>
          <li>GCS multi-region replication: objects written to closest region bucket, async replicated globally</li>
          <li>Kafka: regional clusters + MirrorMaker cross-region replication for DR</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Kubernetes / GKE</div>
        <ul>
          <li>All microservices deployed as Kubernetes Deployments on GKE Autopilot</li>
          <li>HPA (Horizontal Pod Autoscaler) on CPU + custom metric (Kafka consumer lag for async workers)</li>
          <li>Pod disruption budgets: minAvailable=2 for all production services — rolling update never takes all replicas down</li>
          <li>Resource requests/limits set per service; QoS class Guaranteed for Metadata Service (latency sensitive)</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Deployment Strategy</div>
        <ul>
          <li><strong>Blue-Green:</strong> for major API version changes (v2 → v3). Traffic shifted 0% → 10% → 50% → 100% with automated rollback on error rate spike</li>
          <li><strong>Canary:</strong> default for minor service updates. 1% → 5% → 25% → 100% over 2 hours. Prometheus alert gates progression.</li>
          <li><strong>Feature flags:</strong> LaunchDarkly / internal flag service gates new features (e.g., new chunking algorithm) independently of code deploy</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Service Mesh</div>
        <ul>
          <li>Istio service mesh for inter-service mTLS, traffic policies, and retries</li>
          <li>Envoy sidecar handles service discovery, circuit breaking, and telemetry — services themselves have no networking code</li>
          <li>Traffic policies: Upload Service → GCS maximum 10 retries with exponential backoff configured in Envoy VirtualService</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Performance Optimisations</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Upload Performance</div>
        <ul>
          <li><strong>Parallel chunk uploads:</strong> client uses 8 parallel HTTP/2 streams — reduces upload time by ~8x vs sequential</li>
          <li><strong>Dedup skips:</strong> if 90% of chunks already exist in GCS (common for document edits), only 10% of bytes are transferred</li>
          <li><strong>Compression:</strong> text-based files compressed (gzip/zstd) before chunking. Binary (JPEG, MP4) not recompressed — already compressed.</li>
          <li><strong>Pre-signed upload URLs:</strong> client uploads directly to GCS, bypassing Upload Service for bytes — eliminates a hop for the data plane</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Metadata Read Performance</div>
        <ul>
          <li>Spanner session pool: reuse sessions (session creation is expensive ~50ms)</li>
          <li>Batch metadata fetches: sync client fetches up to 100 file metadata records per API call vs. N individual calls</li>
          <li>Redis cache for hot files: 80%+ hit rate; P99 metadata read &lt;5ms from cache</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Download Performance</div>
        <ul>
          <li><strong>Parallel chunk downloads:</strong> sync client downloads 8 chunks in parallel — saturates available bandwidth</li>
          <li><strong>Range requests:</strong> allows pause/resume and selective chunk download</li>
          <li><strong>CDN for thumbnails:</strong> &lt;50ms global TTFB from CDN edge vs ~200ms from GCS origin</li>
          <li><strong>Read-ahead:</strong> sync client pre-fetches metadata for files likely to be accessed (recently modified, opened in last 7 days)</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Search Performance</div>
        <ul>
          <li>Routing key (userId mod 64) ensures every query hits exactly 1 shard — avoids cross-shard scatter-gather</li>
          <li>Filter before full-text: ACL filter (bit-set intersection) applied before expensive BM25 scoring — reduces docs scored by 99%+</li>
          <li>Query result pagination: search_after (keyset) instead of from+size — prevents deep pagination memory blow-up</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Cost Optimisation</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Storage Tiering</div>
        <ul>
          <li><strong>Standard (hot):</strong> recently accessed files (&lt;30 days). Full GCS price (~\$0.02/GB/month).</li>
          <li><strong>Nearline:</strong> files not accessed in 30 days. \$0.01/GB/month + retrieval fee. Automatic lifecycle rule in GCS.</li>
          <li><strong>Coldline:</strong> files not accessed in 90 days. \$0.004/GB/month. Retrieval in hours.</li>
          <li><strong>Archive:</strong> files not accessed in 365 days. \$0.0012/GB/month. Retrieval in days.</li>
          <li>Lifecycle rules: GCS Object Lifecycle Management moves objects automatically — no application code change needed</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Deduplication Savings</div>
        <ul>
          <li>Content-addressable storage means one copy of each unique chunk regardless of how many users uploaded it</li>
          <li>Common files (OS installers, popular documents, stock images) stored once — estimated 40-60% storage reduction</li>
          <li>Version history dedup: unchanged chunks between revisions share GCS objects — only changed chunks consume additional storage</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Compute Cost</div>
        <ul>
          <li><strong>Preemptible / Spot VMs:</strong> Preview (thumbnail) generation is batch-tolerant — run on Spot GKE node pool at 70% discount</li>
          <li><strong>Search indexing workers:</strong> Kafka consumer workers for search can run on Spot instances — consumer lag is acceptable</li>
          <li><strong>Autoscaling:</strong> HPA scales pods down to 20% of peak capacity overnight — significant Kubernetes node cost savings</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Network Cost</div>
        <ul>
          <li>Egress is the dominant network cost — CDN served content doesn't incur GCS egress fees for Google CDN (same network)</li>
          <li>Cross-region replication: minimise by keeping user data in their home region; only replicate to DR region asynchronously</li>
          <li>Compression before transfer: Brotli compression on API responses reduces metadata bandwidth by ~70%</li>
        </ul>
        <div class="tip-box" style="margin-top:8px;">Rule of thumb: storage is the top cost. Dedup + lifecycle tiering typically halves the effective GCS bill.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Disaster Recovery</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Component</div><div>RTO Target</div><div>RPO Target</div><div>Strategy</div></div>
      <div class="pt-row"><div class="pt-name">GCS (Blobs)</div><div>Immediate (multi-region)</div><div>0 (synchronous replication)</div><div>Multi-region bucket auto-replicates. No manual failover needed.</div></div>
      <div class="pt-row"><div class="pt-name">Spanner (Metadata)</div><div>&lt; 2 min (auto leader election)</div><div>0 (synchronous multi-region)</div><div>Spanner multi-region config. Leader election automatic. No data loss.</div></div>
      <div class="pt-row"><div class="pt-name">Bigtable (Change Log)</div><div>&lt; 5 min</div><div>&lt; 30 sec (async replication lag)</div><div>Bigtable cross-region replication. Sync clients fall back to full re-sync on stale change log.</div></div>
      <div class="pt-row"><div class="pt-name">Redis (Cache)</div><div>&lt; 1 min (automatic failover)</div><div>Up to 1 min (async replication)</div><div>Redis Sentinel auto-promotes replica. Cache miss on failover — Spanner serves cold traffic transiently.</div></div>
      <div class="pt-row"><div class="pt-name">Elasticsearch</div><div>&lt; 10 min (restore from snapshot)</div><div>&lt; 1 hour (snapshot frequency)</div><div>Daily snapshot to GCS. In DR, restore snapshot + replay Kafka from last snapshot offset. Acceptable for search.</div></div>
      <div class="pt-row"><div class="pt-name">Kafka</div><div>&lt; 5 min</div><div>&lt; 30 sec</div><div>3-broker cluster. MirrorMaker2 async cross-region replication. Consumer groups reconnect to DR cluster.</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Backup Strategy</div>
        <ul>
          <li>GCS: no separate backup needed — multi-region is the backup</li>
          <li>Spanner: automated managed backups (PITR) retained for 7 days; weekly export to GCS for long-term</li>
          <li>Bigtable: scheduled table export to GCS every 6 hours</li>
          <li>Elasticsearch: daily snapshots to GCS repository</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Failover Runbook (Region Loss)</div>
        <ul>
          <li>1. Global load balancer detects region health check failure → stops routing to failed region (automatic, ~30s)</li>
          <li>2. Spanner auto-elects new leader in surviving region (~2 min)</li>
          <li>3. On-call team confirms Kafka consumer groups reconnect to DR broker</li>
          <li>4. Bigtable lag checked — if &gt; 1 minute, trigger manual sync client re-sync notification</li>
          <li>5. Chaos testing: quarterly GameDay drills simulating region failure using Gremlin</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Migration Strategy</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">From Monolith to Microservices</div>
        <ul>
          <li><strong>Phase 1 — Strangler Fig:</strong> Extract Upload Service first (highest load, most isolated). New uploads go through new Upload Svc; existing download path unchanged. Run both in parallel for 2 months.</li>
          <li><strong>Phase 2 — Dual Write:</strong> Metadata writes go to both old monolith DB and new Spanner. Validate consistency via reconciliation job. Gradually shift reads to Spanner.</li>
          <li><strong>Phase 3 — Traffic Migration:</strong> Shift 1% → 5% → 25% → 100% of traffic to new services per endpoint with feature flag. Rollback flag available.</li>
          <li><strong>Phase 4 — Decommission:</strong> Old code paths removed after 3 months of stable new-path operation. Old DB archived.</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Data Migration (Blob Storage)</div>
        <ul>
          <li>Existing blobs in old storage migrated to GCS using a background migration job</li>
          <li>Migration job reads old storage object → writes to GCS (content-addressed key = SHA-256) → marks record as migrated in migration_state table</li>
          <li>Downloads: check migration_state first; if migrated, serve from GCS; else serve from old storage</li>
          <li>After 100% migration: old storage marked read-only for 30 days (safety net), then decommissioned</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Zero-Downtime Schema Changes</div>
        <ul>
          <li>Spanner: add columns as nullable first → backfill → add NOT NULL constraint → drop old column in a later release</li>
          <li>Never rename columns directly — use expand-contract pattern</li>
          <li>Elasticsearch index changes: create new index with new mapping → reindex in background → alias switch (atomic) → delete old index</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Interview Questions &amp; Answers</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Question</div><div>Answer</div><div>Insight / Nuance</div></div>
      <div class="pt-row"><div class="pt-name">Why chunked upload vs. single PUT?</div><div>Resumability: if upload fails at 90%, only the last chunk needs re-sending. Also enables parallelism (8 concurrent chunk streams) and deduplication at chunk level.</div><div>Single PUT over unreliable mobile networks = catastrophic UX on failure. Chunked upload is a standard pattern for any file &gt; a few MB.</div></div>
      <div class="pt-row"><div class="pt-name">How do you handle two users editing the same file offline?</div><div>Detect via parentRevisionId mismatch. First write wins; second becomes a "Conflicted copy". User is notified. No merge attempted for binary files.</div><div>OT (Operational Transformation) or CRDT can handle collaborative text editing (Google Docs) but overkill for generic file sync. LWW + conflict copy is practical.</div></div>
      <div class="pt-row"><div class="pt-name">How do you prevent quota bypass (user uploads more than 15 GB)?</div><div>Quota Service maintains used_bytes in Spanner. Upload Service reads quota before accepting manifest. Quota decremented atomically with file record creation in a Spanner transaction.</div><div>Must be a transactional check, not eventual — user could launch parallel uploads from multiple clients to race past quota with eventual consistency.</div></div>
      <div class="pt-row"><div class="pt-name">Why Spanner over MySQL for metadata?</div><div>Spanner is globally distributed, horizontally scalable, and strongly consistent across regions. MySQL would need manual sharding and struggle with cross-shard transactions. Spanner handles 1M+ QPS natively.</div><div>At Google's scale, MySQL would require hundreds of shards with complex middleware. Spanner was literally built for this use case.</div></div>
      <div class="pt-row"><div class="pt-name">How do you make ACL checks fast without a central bottleneck?</div><div>Two-tier: Redis cache (60s TTL, &lt;1ms), falls back to Spanner (&lt;20ms). Groups pre-expanded. Permission set materialised per-file at write time.</div><div>Without caching, ACL check on every read would hammer Spanner. The 60s TTL means revocation takes up to 60s to take effect — a documented and acceptable trade-off.</div></div>
      <div class="pt-row"><div class="pt-name">How does dedup work for user privacy?</div><div>Dedup is based on SHA-256 hash of chunk bytes. Two users who upload the same file share the underlying GCS object but never see each other's data — metadata and ACL are separate. Neither user can infer if the chunk is shared.</div><div>From a legal/compliance perspective: user data at rest is encrypted per-bucket, even if chunks are shared. CMEK mitigates cross-customer key risk.</div></div>
      <div class="pt-row"><div class="pt-name">How do you handle search indexing lag after a bulk upload?</div><div>Kafka consumer lag is monitored. Search returns partial results during high lag — file is discoverable via /files list (metadata) immediately, search catches up within 30s under normal load. UI shows "Search index updating..." indicator.</div><div>Users typically search shortly after upload — 30s indexing lag is acceptable. Real-time search (0-lag) would require synchronous indexing in the upload hot path, adding 50-100ms latency.</div></div>
      <div class="pt-row"><div class="pt-name">How do you scale the Sync Engine to 500M users?</div><div>Sync Engine is stateless — horizontally scalable. Bigtable change log partitioned by userId. SSE connections use consistent-hash routing or per-pod userId subscription. Kafka sync.events fan-out naturally parallelises.</div><div>The key insight: sync is per-user, not per-file. Partition on userId and the entire sync path for a user is localised to one Bigtable row group and one Kafka partition.</div></div>
      <div class="pt-row"><div class="pt-name">How do you handle a viral public file (10M downloads in 1 hour)?</div><div>CDN absorbs the load if file is publicly shared. Preview/thumbnail served from CDN edge. For raw file download: GCS multi-region bucket has effectively unlimited egress bandwidth. Signed URL issued per client (no single bottleneck).</div><div>The Download Service does NOT sit in the bytes path for GCS — it generates signed URLs that clients use to pull directly from GCS (or CDN). The service can scale to 100K req/sec just issuing URLs.</div></div>
      <div class="pt-row"><div class="pt-name">How does version history work without blowing up storage?</div><div>Version = new file_revision record pointing to a new chunk manifest. Chunks shared across versions (dedup). Only changed chunks consume new storage. 100 versions of a document with 1% change per version uses ~1x + 1% × 99 ≈ 2x storage, not 100x.</div><div>This is the power of content-addressed chunked storage for versioning. Without dedup, version history would be cost-prohibitive at scale.</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Trade-off Summary</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Decision</div><div class="dt-yes">Chose / Pro</div><div class="dt-no">Alternative / Con</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Content-Addressed Storage (CAS) for chunks</div>
        <div class="dt-yes">Global dedup: identical chunks stored once; version history is cheap; resumable uploads trivially idempotent</div>
        <div class="dt-no">Hash computation cost client-side; privacy concern (data sharing must be access-controlled); SHA-256 collision (theoretical)</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Spanner over sharded MySQL for metadata</div>
        <div class="dt-yes">Global strong consistency; auto-sharding; no cross-shard transaction complexity; PITR built-in</div>
        <div class="dt-no">Higher cost than MySQL; vendor lock-in (Google Cloud); cold-start latency for session setup</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">SSE over WebSocket for sync notifications</div>
        <div class="dt-yes">Simpler (HTTP, no upgrade); native browser reconnect; works through corporate firewalls; sufficient for server-push only</div>
        <div class="dt-no">Unidirectional only; no binary framing; limited to HTTP/1.1 max connection count without HTTP/2</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Async search indexing via Kafka</div>
        <div class="dt-yes">Decoupled; upload path not slowed by indexing; Kafka replay for re-indexing; backpressure handled naturally</div>
        <div class="dt-no">Up to 30s indexing lag; file invisible to search immediately after upload; consumer lag monitoring required</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Last-Write-Wins conflict resolution</div>
        <div class="dt-yes">Simple; predictable; no merge complexity for binary files; user always has a copy (conflict copy preserved)</div>
        <div class="dt-no">Potential data loss if LWW discards meaningful offline work; user must manually reconcile conflict copies</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">GCS signed URLs for download (vs. proxied download)</div>
        <div class="dt-yes">Bytes never pass through our servers; massive bandwidth savings; GCS scales independently; no egress cost (intra-Google)</div>
        <div class="dt-no">ACL checked only at URL generation time (30-min window); harder to revoke mid-download; URL can be shared by recipient</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;">
        <div class="dt-name">Bigtable for change log (over Spanner)</div>
        <div class="dt-yes">Optimised for append-heavy time-series writes; cheap; natural key-range scans by (userId, changeId)</div>
        <div class="dt-no">No SQL; no joins; eventual consistency (not serialisable); 30-day TTL means old clients must full re-sync</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">27. Key Takeaways</div>
  <div class="ref-body">
    <div class="tip-box">
      <ul>
        <li><strong>Content-Addressed Storage is the cornerstone design pattern:</strong> chunking files and keying on SHA-256 unlocks global dedup, cheap versioning, efficient delta-sync, and trivially idempotent resumable uploads — all from a single architectural decision.</li>
        <li><strong>The upload path and the metadata path are separate concerns:</strong> bytes flow directly from client to GCS (via signed URL after ACL check); metadata flows through services. Never let blob bytes pass through your application tier if you can avoid it.</li>
        <li><strong>Sync is a change-log problem, not a polling problem:</strong> the Bigtable change log with monotonic changeIds and client-side pageTokens makes sync efficient and bandwidth-minimal — only fetch what changed since your last sync, not the full file tree.</li>
        <li><strong>ACL must be fast at read time, correct at write time:</strong> Redis cache + Spanner fallback achieves &lt;5ms ACL check in steady state. The 60-second TTL is an intentional availability-vs-revocation-speed trade-off, not a bug.</li>
        <li><strong>Conflict resolution strategy must match the data type:</strong> LWW + conflict copy is correct for binary/opaque files. Only collaborative text documents warrant the complexity of OT/CRDT (Google Docs is a separate subsystem for this reason).</li>
        <li><strong>Decouple the async fan-out (search, preview, audit) from the sync hot path:</strong> Kafka ensures upload latency is not affected by thumbnail generation speed or Elasticsearch indexing lag. Each consumer group scales independently.</li>
        <li><strong>Cost dominates at exabyte scale:</strong> GCS storage tiering (Standard → Nearline → Coldline → Archive) and content dedup are not optimisations — they are first-class architectural requirements that must be designed in from the start, not retrofitted.</li>
      </ul>
    </div>
  </div>
</div>
`;
