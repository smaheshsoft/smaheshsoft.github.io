window.Pages['sd-youtube'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>YouTube (Video Sharing Platform)</span></div>
  <h1>📺 YouTube — Video Sharing Platform System Design</h1>
  <p>Petabyte-scale video ingestion, adaptive-bitrate transcoding, global CDN delivery, and recommendation at planetary scale</p>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Problem</div>
        <p>Allow anyone to upload a video, transcode it into multiple resolutions/formats, store it durably, and stream it smoothly to billions of heterogeneous devices/networks worldwide — while surfacing the most relevant videos via search and recommendations.</p>
        <div class="ans-label" style="margin-top:12px;">Scale</div>
        <ul>
          <li>2.5B+ monthly active users, 1B+ hours watched per day</li>
          <li>~500 hours of video uploaded every minute</li>
          <li>Petabytes of new storage added daily; exabyte-scale total corpus</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Core Challenges</div>
        <ul>
          <li>Transcoding is the dominant compute cost — every upload becomes 5-10+ resolution/codec variants</li>
          <li>Streaming must adapt to network conditions in real time (adaptive bitrate)</li>
          <li>Read traffic (views) outweighs write traffic (uploads) by many orders of magnitude</li>
          <li>A single viral video can spike traffic on one object by 1000x within minutes (hot key)</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Functional Requirements</div>
        <ul>
          <li>Upload a video with title/description/tags/thumbnail</li>
          <li>Transcode into multiple resolutions (144p-4K) and formats (HLS/DASH)</li>
          <li>Stream video with adaptive bitrate based on client bandwidth</li>
          <li>Search videos by title/tags/transcript; browse recommendations</li>
          <li>Like/comment/subscribe; view count &amp; watch-time analytics</li>
          <li>Notify subscribers when a followed channel uploads</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Non-Functional Requirements</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>NFR</div><div>Target</div><div>Why</div><div>Approach</div></div>
          <div class="pt-row"><div class="pt-name">Upload-to-watchable latency</div><div>&lt; 2-5 min for 1080p</div><div>Creators expect near-immediate publish</div><div>Parallel chunk-based transcoding pipeline</div></div>
          <div class="pt-row"><div class="pt-name">Playback start latency</div><div>&lt; 200ms first byte</div><div>Users abandon on buffering/slow start</div><div>Edge CDN cache + adaptive bitrate manifest</div></div>
          <div class="pt-row"><div class="pt-name">Availability</div><div>99.95%+</div><div>Global always-on consumer product</div><div>Multi-region, multi-CDN redundancy</div></div>
          <div class="pt-row"><div class="pt-name">Durability</div><div>99.999999999% (11 nines)</div><div>Uploaded video is often the creator's only copy</div><div>Replicated object storage (erasure coding)</div></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <p>Assumptions stated explicitly — interviewers score the method, not the exact digits. Anchor number: <strong>~500 hours of video uploaded every minute</strong>.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Metric</div><div>Assumption</div><div>Calculation</div><div>Result</div></div>
      <div class="pt-row"><div class="pt-name">DAU</div><div>~500M daily active users</div><div>given</div><div>500M</div></div>
      <div class="pt-row"><div class="pt-name">MAU</div><div>~2.5B monthly active users</div><div>given</div><div>2.5B</div></div>
      <div class="pt-row"><div class="pt-name">Upload rate</div><div>500 hours uploaded/min (real-world figure)</div><div>500 × 60 min</div><div>~30,000 hours of raw video/hour</div></div>
      <div class="pt-row"><div class="pt-name">Uploads/sec</div><div>avg 10 min per uploaded video</div><div>(500 hrs × 60 min) / 10 min-per-video / 60 sec</div><div>~50 uploads/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">View requests/sec (avg)</div><div>1B hours watched/day, avg 10 min/view</div><div>(1B × 60 / 10) / 86,400s</div><div>~69,000 views started/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Peak requests/sec</div><div>3x average at evening peak</div><div>69,000 × 3</div><div>~207,000 views/sec peak</div></div>
      <div class="pt-row"><div class="pt-name">Read:Write ratio</div><div>views vs uploads</div><div>69,000 : 50</div><div>~1,380:1 (extremely read-heavy)</div></div>
      <div class="pt-row"><div class="pt-name">Raw storage/day</div><div>500 hrs/min × 60 × 24, ~1GB/hour raw 1080p</div><div>500 × 60 × 24 × 1GB</div><div>~720 TB/day raw ingest</div></div>
      <div class="pt-row"><div class="pt-name">Storage after transcode variants</div><div>~3x raw size across all resolution/codec variants combined</div><div>720 TB × 3</div><div>~2.1 PB/day stored</div></div>
      <div class="pt-row"><div class="pt-name">CDN egress bandwidth</div><div>207,000 concurrent streams × ~3 Mbps avg bitrate</div><div>207,000 × 3 Mbps</div><div>~620 Gbps peak egress</div></div>
      <div class="pt-row"><div class="pt-name">Thumbnail storage</div><div>4 thumbnails/video, ~50KB each, 50 uploads/sec</div><div>50 × 4 × 50KB × 86,400</div><div>~860 GB/day (thumbnails)</div></div>
      <div class="pt-row"><div class="pt-name">Metadata/message volume</div><div>view/like/comment events</div><div>207,000 views/sec × ~3 events each</div><div>~620,000 msgs/sec into Kafka at peak</div></div>
      <div class="pt-row"><div class="pt-name">5-year growth</div><div>15% YoY upload growth</div><div>2.1 PB/day × 1.15^5</div><div>~4.2 PB/day stored by year 5</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Conclusion: read:write ratio of ~1,380:1 means the system must be architected around cheap, massively-replicated reads (CDN-first) — while the ~2.1 PB/day write side is dominated entirely by transcoding compute cost, not storage cost. Transcoding, not storage, is the real bottleneck to budget for.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. APIs</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Endpoint</div><div>Method</div><div>Purpose</div><div>Auth</div></div>
      <div class="pt-row"><div class="pt-name">/v1/videos/upload/init</div><div>POST</div><div>Initiate resumable/chunked upload session</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/videos/upload/{sessionId}/chunk</div><div>PUT</div><div>Upload a video chunk</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/videos/{id}</div><div>GET</div><div>Get video metadata + playback manifest URL</div><div>Public/Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/videos/{id}/manifest.m3u8</div><div>GET</div><div>HLS master playlist for adaptive playback</div><div>Public (signed URL)</div></div>
      <div class="pt-row"><div class="pt-name">/v1/videos/{id}/view</div><div>POST</div><div>Register a view event (analytics)</div><div>Bearer JWT / anonymous</div></div>
      <div class="pt-row"><div class="pt-name">/v1/search</div><div>GET</div><div>Search videos by title/tags/transcript</div><div>Public</div></div>
      <div class="pt-row"><div class="pt-name">/v1/videos/{id}/comments</div><div>GET/POST</div><div>List or add comments</div><div>Bearer JWT for POST</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Upload Init — Request/Response</div>
        <div class="code-box">POST /v1/videos/upload/init
Headers:
  Authorization: Bearer &lt;jwt&gt;
  Idempotency-Key: 3fa2-...
  X-Request-Id: req-9931

Request:
{
  "title": "Building a CDN from Scratch",
  "sizeBytes": 4831838208,
  "mimeType": "video/mp4",
  "chunkSize": 8388608
}

Response 201:
{
  "sessionId": "up-7712x",
  "uploadUrl": "https://upload.yt.example/up-7712x",
  "chunkCount": 576,
  "status": "UPLOADING"
}</div>
      </div>
      <div>
        <div class="ans-label">API Design Standards</div>
        <ul>
          <li><strong>Status codes:</strong> 201 created, 200 ok, 206 partial content (chunked upload/range GET), 400 bad request, 401 unauthorized, 404 not found, 409 conflict (duplicate upload), 429 rate limited, 503 transcoding backlog</li>
          <li><strong>Auth:</strong> OAuth2 + short-lived JWT (15 min) + refresh token; signed CDN URLs with expiry for playback</li>
          <li><strong>Pagination:</strong> cursor-based for search results &amp; comments (<code>?cursor=abc&amp;limit=20</code>)</li>
          <li><strong>Rate limiting:</strong> token bucket per user (uploads capped at ~5/hour for free tier; view/search endpoints capped per-IP to blunt scraping)</li>
          <li><strong>Versioning:</strong> URI versioning (<code>/v1/</code>, <code>/v2/</code>) with 6-month deprecation window</li>
          <li><strong>Idempotency:</strong> required on upload-init and comment POST to prevent duplicate creation on client retry</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">4. Database Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Store</div><div>Data</div><div>Why This Store</div><div>Key Design</div></div>
      <div class="pt-row"><div class="pt-name">MySQL/PostgreSQL (Video Metadata)</div><div>Video title, description, owner, status, category</div><div>ACID for ownership/state transitions; well-understood relational joins for channel/playlist data</div><div>PK: video_id (UUID); Index: (channel_id, created_at), (status)</div></div>
      <div class="pt-row"><div class="pt-name">Cassandra / Bigtable-style (View Counts &amp; Watch Events)</div><div>Per-video view counters, watch-time events</div><div>Extreme write throughput (620K events/sec), time-series shape, horizontal scale</div><div>Partition key: video_id; Clustering key: timestamp; counters incremented async</div></div>
      <div class="pt-row"><div class="pt-name">Object/Blob Storage (S3-style)</div><div>Raw uploads, transcoded renditions, thumbnails</div><div>Petabyte scale, cheap, durable (11 nines), decoupled from compute</div><div>Key: video_id/resolution/segment_n.ts; lifecycle tiering by access frequency</div></div>
      <div class="pt-row"><div class="pt-name">Redis (Hot Metadata &amp; Counters)</div><div>Trending view counts, session data, rate-limit counters</div><div>Sub-ms reads for homepage/trending, absorbs hot-key spikes</div><div>String/Sorted-Set per video_id; TTL-based counters synced to Cassandra async</div></div>
      <div class="pt-row"><div class="pt-name">Elasticsearch</div><div>Video search index (title, tags, transcript, channel)</div><div>Full-text + relevance ranking + autocomplete</div><div>Indexed on title, tags, transcript_text, channel_id, upload_date</div></div>
      <div class="pt-row"><div class="pt-name">Graph/Key-Value (Subscriptions &amp; Recommendations)</div><div>User-channel subscription edges, watch-history graph</div><div>Natural graph shape for "users who watched X also watched Y"</div><div>Partition key: user_id; adjacency list of channel_id/video_id</div></div>
    </div>
    <div class="code-box" style="margin-top:12px;">-- Videos table (PostgreSQL/MySQL)
CREATE TABLE videos (
  video_id      UUID PRIMARY KEY,
  channel_id    UUID NOT NULL,
  title         VARCHAR(200) NOT NULL,
  description   TEXT,
  status        VARCHAR(20) NOT NULL,  -- UPLOADING/TRANSCODING/READY/FAILED/REMOVED
  duration_sec  INT,
  visibility    VARCHAR(10) DEFAULT 'PUBLIC',
  thumbnail_url VARCHAR(500),
  manifest_url  VARCHAR(500),          -- HLS/DASH master playlist
  created_at    TIMESTAMP NOT NULL DEFAULT now(),
  INDEX idx_videos_channel (channel_id, created_at DESC),
  INDEX idx_videos_status (status)
);
-- Sharding key: video_id hash (metadata access is video-scoped, not channel-scoped at read time)

-- Cassandra view_events (wide-column)
CREATE TABLE view_events (
  video_id      UUID,
  bucket_hour   TIMESTAMP,
  event_id      TIMEUUID,
  user_id       UUID,
  watch_seconds INT,
  PRIMARY KEY ((video_id, bucket_hour), event_id)
);</div>
    <div class="warn-box" style="margin-top:10px;">⚠️ Never increment view counts with a synchronous UPDATE on a relational row per view — at 207K views/sec peak this becomes an unresolvable hot-row lock. Use an in-memory counter (Redis INCR) batched/flushed to Cassandra, exactly like the location-write problem in ride-hailing systems.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. High-Level Architecture</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Users (Web / Mobile / TV / Embed)</div>
      <div class="flow-arrow">↓ GeoDNS + CDN (video segments, thumbnails, static assets)</div>
      <div class="flow-step">Load Balancer → API Gateway (auth, rate limit, routing)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Application Servers (stateless)</div>
      <div class="flow-arrow">↓ splits into core services</div>
      <div class="flow-step green">Upload Service</div>
      <div class="flow-step green">Transcoding Service</div>
      <div class="flow-step green">Streaming/Playback Service</div>
      <div class="flow-step green">Recommendation Service</div>
      <div class="flow-arrow">↓ reads/writes</div>
      <div class="flow-step">Redis Cache ⇄ Kafka/Queue ⇄ Elasticsearch ⇄ Blob Storage ⇄ MySQL/Cassandra</div>
      <div class="flow-arrow">↓ async events</div>
      <div class="flow-step">Kafka (video.uploaded, video.transcoded, view.recorded)</div>
      <div class="flow-arrow">↓ consumed by</div>
      <div class="flow-step">Analytics Pipeline · Notification Service · Search Indexer · Monitoring</div>
    </div>
    <p style="margin-top:12px;">Cross-cutting: <strong>CDN</strong> serves &gt;95% of watch-time bytes directly from edge (origin is only hit on cache miss), <strong>Monitoring</strong> (Prometheus/Grafana on every service), <strong>Search</strong> (Elasticsearch for discovery).</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Detailed Component Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Responsibility</div><div>Key Design Point</div><div>Scaling Model</div></div>
      <div class="pt-row"><div class="pt-name">Video Upload Service</div><div>Accepts chunked/resumable uploads, writes raw file to blob storage</div><div>Resumable upload protocol (tus-like) survives connection drops on multi-GB files</div><div>Stateless, scales with concurrent uploads</div></div>
      <div class="pt-row"><div class="pt-name">Video Transcoding/Encoding Service</div><div>Converts raw upload into adaptive-bitrate renditions (144p-4K, H.264/VP9/AV1)</div><div>Splits video into GOP-aligned chunks, transcodes in parallel across a worker fleet, reassembles into HLS/DASH segments</div><div>GPU/CPU-heavy worker pool, auto-scaled on queue depth; the single biggest compute cost center</div></div>
      <div class="pt-row"><div class="pt-name">Video Streaming/Delivery Service</div><div>Serves manifest + segment requests, picks best rendition</div><div>Adaptive bitrate: client requests next segment at a bitrate chosen from real-time buffer/bandwidth measurement</div><div>Almost entirely offloaded to CDN edge; origin only for cache misses</div></div>
      <div class="pt-row"><div class="pt-name">Recommendation Service</div><div>Ranks "up next" / homepage video candidates per user</div><div>Candidate generation (collaborative filtering/embeddings) + lightweight real-time re-ranking model</div><div>Batch offline model training + low-latency online inference tier</div></div>
      <div class="pt-row"><div class="pt-name">Comments Service</div><div>Stores/serves threaded comments, likes on comments</div><div>Denormalized read model per video for fast initial page load; write path moderates via async spam/abuse filter</div><div>Stateless, sharded by video_id</div></div>
      <div class="pt-row"><div class="pt-name">Search Service</div><div>Full-text + semantic search across title/tags/transcript</div><div>Elasticsearch index updated async from video-published event; transcript from speech-to-text pipeline</div><div>Stateless query tier in front of a sharded ES cluster</div></div>
      <div class="pt-row"><div class="pt-name">Analytics/View-Count Service</div><div>Aggregates views, watch-time, engagement per video/channel</div><div>Streaming aggregation (Kafka Streams/Flink) with Redis hot counters flushed to Cassandra</div><div>Horizontally scaled stream processors, partitioned by video_id</div></div>
      <div class="pt-row"><div class="pt-name">Notification Service</div><div>Alerts subscribers on new upload, alerts creator on milestones</div><div>Consumes Kafka video.published events; fans out to push/email</div><div>Stateless, horizontally scaled consumer group</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Sequence Diagrams</div>
  <div class="ref-body">
    <div class="ans-label">Happy Path — Upload Through Transcoding to Watchable</div>
    <div class="code-box">Creator   UploadSvc   BlobStore   Kafka   TranscodeSvc   CDN   Viewer
  |--upload chunks->|             |         |             |       |
  |                  |--store raw->|         |             |       |
  |                  |--publish(video.uploaded)->|         |       |
  |                  |             |         |--claim job->|       |
  |                  |             |         |             |--transcode all renditions
  |                  |             |<--store renditions----|       |
  |                  |             |         |--publish(video.transcoded)->|
  |                  |             |         |             |--push to edge->|
  |                                                                  |<--GET manifest.m3u8---|
  |                                                                  |--200 OK (adaptive playlist)-->|</div>

    <div class="ans-label" style="margin-top:14px;">Failure Path — Transcoding Worker Crashes Mid-Job</div>
    <div class="code-box">TranscodeSvc      Worker1        Worker2        BlobStore
   |--assign(job)-->|              |              |
   |                |--[crashes at 60% - OOM on 4K frame buffer]
   |<--heartbeat missed (15s)------|              |
   |--requeue(job)-------------------------------->|
   |--assign(job)------------------->|              |
   |                                  |--resume from last checkpointed segment
   |                                  |--complete-->|
   |<--publish(video.transcoded)-----|</div>

    <div class="ans-label" style="margin-top:14px;">Retry — Segment Upload to Blob Storage Fails</div>
    <div class="code-box">TranscodeSvc   BlobStore
  |--PUT segment_042.ts-->|
  |<--503 (throttled)-----|
  |--retry(1) after 200ms->|  (exponential backoff: 200ms -> 800ms -> 3.2s)
  |<--503-----------------|
  |--retry(2) after 800ms->|
  |<--201 Created----------|
  |  (if all retries fail -> job marked FAILED, moved to DLQ, alert on-call)</div>

    <div class="ans-label" style="margin-top:14px;">Timeout — Viewer's Segment Request Stalls on Slow Network</div>
    <div class="code-box">Player          CDN Edge
   |--GET segment_088.ts (bitrate=1080p)-->|
   |         (2.5s elapsed, no response - buffer running low)
   |<--client-side timeout at 2s-----------|
   |--abandon request, drop to next lower rendition
   |--GET segment_088.ts (bitrate=480p)--->|
   |<--200 OK (smaller segment, fast)------|</div>
    <div class="tip-box" style="margin-top:10px;">✅ Notice the timeout path is client-driven (ABR bitrate ladder), not server-driven — the player, not the server, decides to degrade quality, which is what makes adaptive bitrate resilient to network variance without any server-side awareness of the failure.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Database Scaling</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Sharding Strategy</div>
        <p><strong>Shard key: video_id (hashed).</strong> Metadata reads/writes are almost always scoped to a single video, so hashing video_id spreads load evenly and avoids hot shards from any one popular channel. Channel-level queries (list of a channel's videos) use a secondary index/read model.</p>
        <div class="ans-label" style="margin-top:12px;">Read Replicas</div>
        <p>MySQL/PostgreSQL: 1 primary + many read replicas per shard — video metadata is read orders of magnitude more than it's written, so replica fan-out is aggressive (5-10+ replicas per shard region).</p>
      </div>
      <div>
        <div class="ans-label">Replication</div>
        <p>Cassandra/Bigtable: replication factor 3 across AZs for view/watch events — tolerates a full AZ loss with zero data loss (quorum writes/reads); blob storage uses erasure coding for even higher durability at lower overhead than 3x replication.</p>
        <div class="ans-label" style="margin-top:12px;">CQRS</div>
        <p>Write model (normalized video/channel metadata in SQL) is separate from the read model (denormalized "video watch page" view combining metadata + live view count + top comments) served from cache/Elasticsearch — avoids OLTP contention from the extreme read fan-out.</p>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ View counts are intentionally eventually consistent — the number shown can lag reality by seconds. Event sourcing (append-only watch events) is used for analytics/ML training data, but the "current count" is a materialized, periodically-flushed aggregate, not derived live per-request.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Cache Strategy</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Cache</div><div>Pattern</div><div>TTL</div><div>Why</div></div>
      <div class="pt-row"><div class="pt-name">Video metadata (title/thumbnail/manifest URL)</div><div>Cache-aside</div><div>10 min</div><div>Changes rarely, extremely high read volume</div></div>
      <div class="pt-row"><div class="pt-name">View count (per video)</div><div>Write-back (batched flush to Cassandra every few sec)</div><div>N/A (in-memory authoritative until flush)</div><div>620K events/sec would overwhelm a durable store if written synchronously</div></div>
      <div class="pt-row"><div class="pt-name">CDN edge segment cache</div><div>Read-through (origin pull on miss)</div><div>Hours-days (segments are immutable once transcoded)</div><div>Immutable content is perfect for long-TTL caching</div></div>
      <div class="pt-row"><div class="pt-name">Trending/homepage feed</div><div>Read-through, precomputed</div><div>1-5 min</div><div>Recomputing ranked feed per-request is too expensive at this QPS</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Hot Key Problem — Viral Video</div>
        <p>A single video going viral can draw 100K+ concurrent segment requests within minutes. Mitigated at two layers: (1) CDN edge caching means the origin never sees per-view traffic for a popular video, and (2) view-count increments are sharded across multiple Redis counter keys (e.g. <code>views:{video_id}:{shard}</code>) and summed on read, avoiding a single hot key.</p>
      </div>
      <div>
        <div class="ans-label">Cache Stampede Prevention</div>
        <p>When a popular video's metadata cache entry expires, a distributed lock (Redis <code>SET NX PX</code>) ensures only one node repopulates it from the DB; concurrent requests read the stale-but-present value until refresh completes (stale-while-revalidate).</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Messaging</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Broker</div><div>Used For</div><div>Why This One</div></div>
      <div class="pt-row"><div class="pt-name">Kafka</div><div>Transcoding job pipeline, view/watch events, analytics feed</div><div>Extreme throughput (600K+ msg/sec), replay for reprocessing/backfill (e.g. re-transcode with a new codec), log-based ordering per partition (by video_id)</div></div>
      <div class="pt-row"><div class="pt-name">RabbitMQ / SQS-equivalent</div><div>Notification dispatch, thumbnail-generation jobs</div><div>Simpler point-to-point queue semantics fit fire-and-forget, lower-volume background jobs better than a log</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Delivery Guarantees</div>
        <ul>
          <li><strong>View events:</strong> at-least-once — duplicate view events are deduped downstream by event_id before aggregation, since undercounting is worse than a rare double-count edge case</li>
          <li><strong>Transcoding job completion:</strong> exactly-once semantics via idempotent job IDs + checkpointed progress (re-running a completed job is a costly no-op, so dedupe matters here)</li>
          <li><strong>Ordering:</strong> partition key = video_id, guaranteeing per-video event order (a "transcode completed" must never be processed before "transcode started")</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Retry / DLQ / Poison Queue</div>
        <p>3 retries with exponential backoff (200ms → 800ms → 3.2s) for transient failures (blob throttling, worker crash). After exhausting retries, job → Dead Letter Queue; on-call is paged if DLQ depth &gt; threshold. Poison messages (corrupt video container, unsupported codec) are detected by a fast validation pre-check and routed straight to DLQ without consuming a transcoding worker slot.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. Storage</div>
  <div class="ref-body">
    <p>This is the core of YouTube's system design — the video encoding pipeline dominates both cost and architectural complexity.</p>
    <div class="two-col">
      <div>
        <div class="ans-label">Ingestion &amp; Encoding Pipeline</div>
        <ul>
          <li><strong>1. Raw upload:</strong> chunked/resumable upload lands the source file in a "raw" blob container</li>
          <li><strong>2. Validation:</strong> container/codec sniff, malware scan, duration/resolution extraction</li>
          <li><strong>3. Segmentation:</strong> source split into GOP-aligned chunks (e.g. 2-10s) so chunks can be transcoded in parallel across many workers instead of one worker processing the whole file serially</li>
          <li><strong>4. Parallel transcode:</strong> each chunk transcoded into every target rendition (144p/240p/360p/480p/720p/1080p/4K) x codec (H.264 for compatibility, VP9/AV1 for bandwidth savings on supporting devices)</li>
          <li><strong>5. Reassembly:</strong> transcoded chunks reassembled into HLS (.m3u8 + .ts segments) and/or DASH (.mpd + .m4s segments) manifests per rendition</li>
          <li><strong>6. Thumbnail generation:</strong> frames extracted at multiple timestamps, resized to several sizes, stored alongside video</li>
          <li><strong>7. Publish:</strong> manifest + renditions pushed to CDN origin, video flips to READY</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Adaptive Bitrate Streaming (HLS/DASH)</div>
        <p>The player downloads a master manifest listing all available renditions, then continuously measures actual download throughput and switches between renditions segment-by-segment — never re-buffering the whole video, only the next few seconds. This is what makes a video playable on both a fiber connection and a congested 3G network without separate app logic.</p>
        <div class="ans-label" style="margin-top:12px;">Storage Classes</div>
        <ul>
          <li><strong>Blob/Object Storage:</strong> all renditions + thumbnails, replicated across regions with erasure coding for durability at lower overhead than full replication</li>
          <li><strong>CDN:</strong> caches segments at edge PoPs close to viewers — this is what actually serves &gt;95% of watch-time bytes, not the origin</li>
          <li><strong>Storage tiering:</strong> hot (frequently watched, recent) on fast SSD-backed tier; cold (old, rarely watched) moved to cheaper archive-class storage, re-hydrated on demand with slightly higher latency</li>
        </ul>
      </div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Interview tip: always mention that transcoding, not storage, is the dominant cost — a single 10-minute 4K upload can consume many CPU/GPU-hours generating all rendition variants, dwarfing the marginal storage cost of keeping the result.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Search</div>
  <div class="ref-body">
    <p>Elasticsearch (or equivalent) powers video discovery: search-by-title/tags/description, and increasingly search-by-transcript (auto-generated captions indexed as searchable text).</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Feature</div><div>Approach</div></div>
      <div class="pt-row"><div class="pt-name">Indexing</div><div>Async indexer consumes video.published Kafka events; transcript indexed once speech-to-text pipeline completes</div></div>
      <div class="pt-row"><div class="pt-name">Ranking</div><div>Relevance score (BM25-style text match) blended with engagement signals — view velocity, watch-time retention, freshness</div></div>
      <div class="pt-row"><div class="pt-name">Filters</div><div>upload date, duration, category, channel, language, resolution/HD availability</div></div>
      <div class="pt-row"><div class="pt-name">Autocomplete</div><div>Prefix-indexed trie/edge-ngram field fed by aggregated real query logs, refreshed periodically</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. Scalability</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">H</div><div class="principle-name">Horizontal Scaling</div><p>Every service (Upload, Transcode, Streaming, Search, Recommendation) is stateless and scales out independently by its own load profile.</p></div>
      <div class="principle-card"><div class="principle-icon">C</div><div class="principle-name">CDN-First Delivery</div><p>The overwhelming majority of read traffic (video bytes) never reaches origin servers at all — it's absorbed entirely at CDN edge, which is the real scaling lever for viewership.</p></div>
      <div class="principle-card"><div class="principle-icon">A</div><div class="principle-name">Auto-Scaling</div><p>Transcoding worker pool auto-scales on queue depth (uploads are bursty by time-of-day and by viral events), not CPU alone.</p></div>
      <div class="principle-card"><div class="principle-icon">B</div><div class="principle-name">Backpressure</div><p>Upload ingestion applies backpressure via queue-depth-based admission control — better to briefly delay accepting new uploads than to crash the transcoding pipeline.</p></div>
      <div class="principle-card"><div class="principle-icon">R</div><div class="principle-name">Rate Limiting</div><p>Per-user upload throttling prevents spam/abuse; per-IP view/search throttling blunts scraping and vote manipulation.</p></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Reliability</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Pattern</div><div>Applied To</div><div>Behavior</div></div>
      <div class="pt-row"><div class="pt-name">Circuit Breaker</div><div>Streaming Service → Recommendation Service calls</div><div>Opens after repeated failures; page falls back to a generic "trending" list instead of failing to load entirely</div></div>
      <div class="pt-row"><div class="pt-name">Retry</div><div>Transcoding Service → Blob Storage writes</div><div>3 retries, exponential backoff, then DLQ</div></div>
      <div class="pt-row"><div class="pt-name">Bulkhead</div><div>Transcoding worker pools</div><div>Isolated pool per priority tier (e.g. partner/monetized uploads vs regular) — one overloaded tier can't starve another</div></div>
      <div class="pt-row"><div class="pt-name">Timeout</div><div>Player segment fetch</div><div>Client-side 2s timeout triggers bitrate ladder step-down rather than stalling playback</div></div>
      <div class="pt-row"><div class="pt-name">Idempotency</div><div>POST /videos/upload/init, transcoding job execution</div><div>Idempotency-Key / job-id prevents duplicate upload sessions and duplicate re-transcode work on retry</div></div>
      <div class="pt-row"><div class="pt-name">Graceful Degradation</div><div>Recommendation engine down</div><div>Falls back to trending/most-recent list rather than blocking the homepage from loading</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. Security</div>
  <div class="ref-body">
    <ul>
      <li><strong>AuthN:</strong> OAuth2 + JWT (short-lived access token + refresh token); social/email login</li>
      <li><strong>AuthZ:</strong> RBAC for internal tools (support/ops/trust-and-safety roles); ABAC for creator-only endpoints (upload, monetization settings) vs viewer endpoints</li>
      <li><strong>Encryption:</strong> TLS 1.2+ everywhere in transit; AES-256 at rest for stored video assets and PII; DRM (Widevine/FairPlay-style) for licensed/premium content</li>
      <li><strong>Signed URLs:</strong> CDN playback URLs are time-limited and signed to prevent hotlinking/unauthorized redistribution of segment URLs</li>
      <li><strong>Secrets:</strong> Key Vault / Secrets Manager for DB credentials, CDN signing keys — never in code/config</li>
      <li><strong>OWASP:</strong> input validation/sanitization on comments (XSS), rate limiting mitigates credential stuffing and comment-spam bots</li>
      <li><strong>DDoS Protection:</strong> CDN/WAF edge layer absorbs volumetric attacks before they reach the API Gateway</li>
      <li><strong>Content-ID / Copyright Detection:</strong> uploaded audio/video fingerprinted (perceptual hashing) and matched against a rights-holder reference database asynchronously post-upload; matches trigger monetization-claim or takedown workflows without blocking publish</li>
    </ul>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">16. Monitoring</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Key Metrics</div>
        <ul>
          <li>Upload-to-watchable latency (P50/P95/P99) per resolution</li>
          <li>Transcoding queue depth &amp; worker utilization</li>
          <li>Playback start latency &amp; rebuffer ratio (client-reported)</li>
          <li>CDN cache hit ratio (origin offload %)</li>
          <li>Kafka consumer lag on view-events and transcode-job topics</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Stack</div>
        <ul>
          <li><strong>Metrics:</strong> Prometheus + Grafana dashboards per service/region</li>
          <li><strong>Tracing:</strong> OpenTelemetry across Upload → Transcode → Publish → CDN call chain</li>
          <li><strong>Logging:</strong> centralized structured logs (ELK or equivalent)</li>
          <li><strong>Alerts:</strong> PagerDuty on transcode-queue-depth breach, CDN cache-hit-ratio drop, DLQ depth</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">17. Azure Architecture Equivalent</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Component</div><div>Azure Service</div></div>
      <div class="pt-row"><div class="pt-name">CDN / Edge</div><div>Azure Front Door + Azure CDN</div></div>
      <div class="pt-row"><div class="pt-name">API Gateway</div><div>Azure API Management</div></div>
      <div class="pt-row"><div class="pt-name">Application Servers</div><div>AKS (Kubernetes) for Upload/Streaming/Recommendation services</div></div>
      <div class="pt-row"><div class="pt-name">Video Transcoding</div><div>Azure Media Services (or custom AKS GPU node pool running FFmpeg-based workers)</div></div>
      <div class="pt-row"><div class="pt-name">Cache</div><div>Azure Cache for Redis</div></div>
      <div class="pt-row"><div class="pt-name">Event Streaming</div><div>Azure Event Hubs (Kafka-compatible endpoint)</div></div>
      <div class="pt-row"><div class="pt-name">Background Queue</div><div>Azure Service Bus</div></div>
      <div class="pt-row"><div class="pt-name">Video Metadata DB</div><div>Azure SQL Database / Azure Database for PostgreSQL</div></div>
      <div class="pt-row"><div class="pt-name">View/Watch Events</div><div>Cosmos DB (Cassandra API) or Azure Data Explorer</div></div>
      <div class="pt-row"><div class="pt-name">Video/Thumbnail Storage</div><div>Azure Blob Storage (Hot/Cool/Archive tiers)</div></div>
      <div class="pt-row"><div class="pt-name">Search</div><div>Azure AI Search</div></div>
      <div class="pt-row"><div class="pt-name">Monitoring</div><div>Application Insights + Azure Monitor</div></div>
      <div class="pt-row"><div class="pt-name">Secrets</div><div>Azure Key Vault</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Azure Media Services provides managed adaptive-bitrate encoding, packaging, and DRM out of the box — a realistic answer to "how would you build this on Azure" is to lean on it rather than hand-rolling the entire transcoding pipeline, unless custom codec control is a hard requirement.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Kubernetes Deployment</div>
  <div class="ref-body">
    <div class="code-box">Deployment: transcoding-service
  replicas: 50 (per region cluster)
  nodeSelector: gpu-pool (NVIDIA T4/A10-backed nodes for hardware-accelerated encode)
  resources:
    requests: { cpu: "4", memory: "16Gi", nvidia.com/gpu: 1 }
    limits:   { cpu: "8", memory: "32Gi", nvidia.com/gpu: 1 }
  HPA: target queueDepth metric (custom), min 10 / max 200 pods
  readinessProbe: /healthz (checks blob storage + Kafka connectivity)

ConfigMap: transcoding-config
  - TARGET_RENDITIONS=144p,240p,360p,480p,720p,1080p,4K
  - CODEC_LADDER=h264,vp9,av1
  - SEGMENT_DURATION_SEC=6

Secret: transcoding-secrets
  - BLOB_STORAGE_CONNECTION_STRING
  - KAFKA_SASL_CREDENTIALS

Ingress: api-gateway-ingress
  - routes /v1/videos/upload/* -> upload-service
  - routes /v1/videos/*/manifest.m3u8 -> streaming-service
  - TLS termination at ingress

Service: transcoding-service (ClusterIP) fronts the ReplicaSet
  managed via a Deployment object for rolling updates</div>
    <div class="tip-box" style="margin-top:10px;">✅ The transcoding node pool is the one part of this system that genuinely needs GPU-backed nodes — hardware encode (NVENC-class) cuts transcode time dramatically versus pure CPU (x264/libvpx) at the cost of a specialized, more expensive node pool that must be scaled and bin-packed carefully.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Failure Scenarios</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Failure</div><div>Impact</div><div>Recovery</div></div>
      <div class="pt-row"><div class="pt-name">Video metadata DB down</div><div>Can't fetch title/manifest URL for new page loads</div><div>Automatic failover to standby replica (&lt;30s); already-cached video pages keep playing from CDN unaffected</div></div>
      <div class="pt-row"><div class="pt-name">Redis/cache down</div><div>View counters and hot metadata reads fall through to slower stores</div><div>Failover to Redis replica (Sentinel/Cluster); degrade to reading last-flushed count directly from Cassandra</div></div>
      <div class="pt-row"><div class="pt-name">Kafka down</div><div>Transcoding job dispatch and view-event ingestion stop flowing</div><div>Producers buffer locally with backpressure; multi-broker replication (RF=3) tolerates single-broker loss transparently</div></div>
      <div class="pt-row"><div class="pt-name">Transcoding API/worker failure</div><div>New uploads stuck in TRANSCODING state</div><div>Job requeued to a healthy worker with checkpointed resume; already-published videos are completely unaffected</div></div>
      <div class="pt-row"><div class="pt-name">Region-wide outage</div><div>Uploads/writes in that region blocked; reads for that region's users degrade</div><div>DNS/traffic-manager fails over to nearest healthy region; blob storage replicated cross-region for DR</div></div>
      <div class="pt-row"><div class="pt-name">CDN failure (single provider)</div><div>Video playback fails or slows for affected edge PoPs</div><div>Multi-CDN fallback (secondary provider) or direct-from-origin fallback with automatic rendition step-down</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">20. Cost Optimization</div>
  <div class="ref-body">
    <ul>
      <li><strong>Reserved Instances:</strong> baseline transcoding and app-server capacity on 1-3yr reservations; burst capacity on-demand for upload spikes</li>
      <li><strong>Auto-scaling:</strong> scale transcoding worker pool down aggressively during low-upload overnight windows (predictable regional traffic curves)</li>
      <li><strong>Spot/Low-priority nodes:</strong> non-urgent batch re-transcodes (e.g. adding a new codec to old catalog) run on spot capacity, tolerating preemption via checkpointing</li>
      <li><strong>Caching:</strong> CDN edge caching is itself the single biggest cost lever — every cache hit avoids origin egress and compute entirely</li>
      <li><strong>Storage tiering by view-frequency:</strong> hot (actively trending/recent) videos stay on fast storage near CDN origin; long-tail videos with near-zero views move to cheap cold/archive storage, re-hydrated on the rare access with acceptable added latency</li>
      <li><strong>Compression:</strong> newer codecs (AV1) trade extra encode-time compute for significantly less storage and egress bandwidth on playback — a worthwhile trade given how read-heavy the system is</li>
    </ul>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Trade-offs</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Decision</div><div>Chosen</div><div>Rejected Alternative &amp; Why</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Video delivery</div><div>CDN-first, edge-cached adaptive bitrate segments</div><div>Serving directly from origin — would need origin bandwidth/compute orders of magnitude larger and couldn't achieve low-latency global start times</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Transcoding architecture</div><div>Chunked, parallel transcoding across a worker fleet</div><div>Single-worker whole-file transcode — would make upload-to-watchable latency scale linearly with video length, unacceptable for long uploads</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">View count consistency</div><div>Eventual (in-memory counter, batched flush)</div><div>Strong consistency via synchronous DB increment — would create an unresolvable hot-row bottleneck at 200K+ views/sec on popular videos</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Sharding key (metadata)</div><div>video_id (hashed)</div><div>channel_id — would concentrate load onto shards hosting mega-channels, creating hot shards</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Codec ladder</div><div>Multi-codec (H.264 + VP9/AV1)</div><div>H.264-only — simpler pipeline but loses significant bandwidth savings on devices/browsers that support modern codecs, at scale that's real egress cost</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Recommendation freshness</div><div>Batch-trained embeddings + real-time re-ranking layer</div><div>Fully real-time model training — infeasible at this data volume; batch retraining with a thin online layer is the practical middle ground</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Interview Questions (30)</div>
  <div class="ref-body">
    <ol>
      <li>Walk through the full pipeline from video upload to it being watchable — where does the time go?</li>
      <li>Why is transcoding done in parallel chunks instead of on the whole file at once?</li>
      <li>How does adaptive bitrate streaming work, and why is it client-driven rather than server-driven?</li>
      <li>How would you design view-count tracking to survive 200K+ views/sec on a viral video?</li>
      <li>Why is CDN cache-hit ratio the single most important metric for this system's cost and latency?</li>
      <li>How would you choose a sharding key for video metadata, and why video_id over channel_id?</li>
      <li>Design the resumable/chunked upload protocol for multi-gigabyte files on unreliable networks.</li>
      <li>What happens if a transcoding worker crashes 60% of the way through a job?</li>
      <li>How would you detect and mitigate a hot-key scenario for a suddenly viral video?</li>
      <li>How do you guarantee ordering of transcoding pipeline events in Kafka?</li>
      <li>Design an idempotent transcoding job execution — what's the idempotency key?</li>
      <li>How would you architect Content-ID style copyright detection without blocking publish latency?</li>
      <li>What's your approach to A/B testing a new recommendation ranking model safely in production?</li>
      <li>How would you handle a full region outage affecting active uploads mid-transcode?</li>
      <li>Explain the trade-off between strong and eventual consistency for view counts.</li>
      <li>How do you scale the transcoding worker fleet independently from the streaming service?</li>
      <li>Design the notification fan-out when a subscribed channel publishes a new video.</li>
      <li>How would you estimate storage growth over 5 years and plan capacity accordingly?</li>
      <li>What monitoring signals would page you at 3 AM for this system?</li>
      <li>How do you handle video takedown/removal requests (legal/DMCA) across all cached copies?</li>
      <li>Design the search-by-transcript feature — where does the transcript come from and how is it indexed?</li>
      <li>How would CQRS help the "video watch page" read model?</li>
      <li>What's the failure mode if the recommendation service is completely down?</li>
      <li>How do you prevent cache stampede when a popular video's metadata cache entry expires?</li>
      <li>Compare Kafka vs RabbitMQ for the transcoding job pipeline vs the notification pipeline.</li>
      <li>How would you migrate the video metadata database to a new sharding scheme with zero downtime?</li>
      <li>Design a circuit breaker policy for the recommendation service dependency.</li>
      <li>How would this design change for a market with predominantly low-bandwidth mobile connections?</li>
      <li>What would you change to support live-streaming in addition to on-demand video?</li>
      <li>How do you decide which old videos get moved to cold/archive storage?</li>
    </ol>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Follow-up Questions</div>
  <div class="ref-body">
    <ul>
      <li>"You said CDN edge caching absorbs most reads — what happens on a cold cache in a new edge region during a launch?"</li>
      <li>"How would your design change if every video needed real-time content moderation before it goes live, not async?"</li>
      <li>"What if two transcoding jobs for the same video are accidentally dispatched at once?"</li>
      <li>"How do you test that a new codec doesn't silently degrade quality for a subset of devices?"</li>
      <li>"Your view counter flushes every few seconds — what's the actual undercount risk if the flush node crashes?"</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ Interviewers push on your first answer's weak point — always state the failure mode of your own solution before they ask.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Real World Technologies</div>
  <div class="ref-body">
    <p><strong>YouTube</strong> itself runs on Google's internal infrastructure: Google File System/Colossus for blob storage, Bigtable for view-count and metadata-style wide-column data, Borg (predecessor to Kubernetes) for orchestration, and VP9/AV1 codec development driven in-house for bandwidth savings at planetary scale. <strong>Netflix</strong> uses Open Connect, its own purpose-built CDN appliances placed inside ISPs, plus a similarly chunked parallel-transcoding pipeline. <strong>Twitch</strong> applies the same adaptive-bitrate HLS approach for live streams. <strong>Vimeo</strong> and <strong>Facebook/Meta Video</strong> use comparable transcode-then-CDN-distribute architectures.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Design Evolution by Scale</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Scale</div><div>Architecture</div></div>
      <div class="pt-row"><div class="pt-name">1K users</div><div>Single monolith, videos stored on local disk/single blob bucket, synchronous single-resolution transcode on upload</div></div>
      <div class="pt-row"><div class="pt-name">100K users</div><div>Split into upload/transcode/streaming services; introduce a queue for async transcoding; single CDN provider; single-region deployment</div></div>
      <div class="pt-row"><div class="pt-name">1M users</div><div>Full microservices split; Kafka introduced for the transcode pipeline; multi-resolution ladder; read replicas for metadata DB</div></div>
      <div class="pt-row"><div class="pt-name">10M users</div><div>Sharded metadata DB by video_id; multi-CDN; adaptive bitrate (HLS/DASH) becomes standard; Elasticsearch search introduced</div></div>
      <div class="pt-row"><div class="pt-name">100M users</div><div>Multi-region active-active; GPU-accelerated transcoding fleet; ML-based recommendation engine; storage tiering by view-frequency</div></div>
      <div class="pt-row"><div class="pt-name">1B+ users</div><div>Custom-built CDN/edge appliances embedded in ISPs; in-house codec development (AV1-class); global event backbone with regional isolation to contain blast radius; petabyte-scale cold storage with automated re-hydration</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Final Architecture Diagram</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Web / Mobile / TV / Embedded Player</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">GeoDNS (routes to nearest region) + Multi-CDN (video segments, thumbnails, static assets)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">WAF / DDoS Protection → API Gateway (authn, rate limit)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Load Balancer</div>
      <div class="flow-arrow">↓ fan-out to stateless services</div>
      <div class="flow-step green">Upload Svc</div>
      <div class="flow-step green">Transcoding Svc (GPU pool)</div>
      <div class="flow-step green">Streaming Svc</div>
      <div class="flow-step green">Recommendation Svc</div>
      <div class="flow-step green">Search Svc</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Redis Cache · Elasticsearch · Blob/Object Storage (renditions/thumbnails) · MySQL/PostgreSQL (metadata, sharded) · Cassandra/Bigtable (view/watch events)</div>
      <div class="flow-arrow">↓ async</div>
      <div class="flow-step">Kafka event backbone → Notification Svc · Analytics/Watch-Time Pipeline · Search Indexer · Content-ID Fingerprint Matcher</div>
      <div class="flow-arrow">↓ observability on every hop</div>
      <div class="flow-step red">Prometheus/Grafana · OpenTelemetry Tracing · Centralized Logging · Key Vault (secrets)</div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">27. Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Key Takeaways</div>
        <ul>
          <li>Transcoding compute, not storage, is the dominant cost and architectural driver</li>
          <li>The read:write ratio (~1,380:1) means the entire system should be optimized around cheap, CDN-absorbed reads</li>
          <li>View-count and analytics data are fundamentally an eventually-consistent streaming-aggregation problem, not a transactional database problem</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Pros of This Design</div>
        <ul><li>CDN-first delivery scales reads near-infinitely without touching origin capacity</li><li>Parallel chunked transcoding keeps upload-to-watchable latency roughly flat regardless of video length</li><li>Clear separation of concerns (upload vs transcode vs stream vs recommend)</li></ul>
      </div>
      <div>
        <div class="ans-label">Cons / Open Risks</div>
        <ul><li>Multi-codec, multi-resolution ladder multiplies both storage and compute cost per upload</li><li>Operational complexity of running Kafka + Redis + Cassandra + Elasticsearch + a GPU fleet together</li><li>Eventual consistency in view counts can be confusing for creators expecting real-time accuracy</li></ul>
        <div class="ans-label" style="margin-top:12px;">Best Practices</div>
        <ul><li>Always design the degrade/fallback path (lower bitrate, generic trending list) before the happy path</li><li>Treat CDN cache-hit ratio as a first-class SLO, not an afterthought — it drives both latency and cost</li></ul>
      </div>
    </div>
  </div>
</div>
`;
