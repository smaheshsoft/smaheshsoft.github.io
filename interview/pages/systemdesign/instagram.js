window.Pages['sd-instagram'] = `
<div class="page-header">
  <div class="breadcrumb">System Design › <span>Instagram (Photo/Video Sharing + Stories)</span></div>
  <h1>📸 Instagram — Photo/Video Sharing System Design</h1>
  <p>Media upload &amp; processing pipeline, asymmetric follow graph, ranked feed, ephemeral Stories, and Explore recommendations at global scale</p>
</div>

<div class="ref-section">
  <div class="ref-title">1. Executive Summary</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Problem</div>
        <p>Let users upload photos/videos and ephemeral Stories, process them into multiple renditions, distribute them through a ranked feed to followers, support an asymmetric follow graph (not mutual friendship), and power a discovery surface (Explore/Search) — all while keeping upload-to-visible latency low and media delivery fast worldwide.</p>
        <div class="ans-label" style="margin-top:12px;">Scale</div>
        <ul>
          <li>2B+ monthly active users, ~600M+ daily active users</li>
          <li>~95M+ photos/videos uploaded per day</li>
          <li>500M+ Stories posted per day (24-hour ephemeral lifecycle)</li>
          <li>Feed reads outnumber writes by roughly 1000:1</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Core Challenges</div>
        <ul>
          <li>Fan-out of a single post to millions of followers (celebrity accounts) without melting the feed service</li>
          <li>Heavy, latency-sensitive media processing pipeline (transcode, thumbnail, multiple resolutions) at upload volume</li>
          <li>Asymmetric follow graph makes "who sees this" a fan-out/fan-in graph problem, not a simple friend list</li>
          <li>Stories need automatic, reliable expiry (TTL) of both metadata and blobs at 500M+ items/day</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Functional Requirements</div>
        <ul>
          <li>Upload photo/video with caption, tags, location</li>
          <li>Process media into multiple resolutions/formats</li>
          <li>Follow/unfollow users (asymmetric, no approval needed for public accounts)</li>
          <li>Home feed ranked by relevance, not strictly chronological</li>
          <li>Stories: post, view, auto-expire after 24 hours</li>
          <li>Like, comment, share, save</li>
          <li>Search users, hashtags, locations; Explore/recommendations</li>
          <li>Push notifications for likes/comments/follows/mentions</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Non-Functional Requirements</div>
        <div class="pattern-table">
          <div class="pt-row pt-header"><div>NFR</div><div>Target</div><div>Why</div><div>Approach</div></div>
          <div class="pt-row"><div class="pt-name">Upload → visible latency</div><div>&lt; 5-10 sec for followers to see it</div><div>Users expect near-instant publish</div><div>Async processing pipeline + fast-path feed insert for small accounts</div></div>
          <div class="pt-row"><div class="pt-name">Feed read latency</div><div>&lt; 200ms P99</div><div>Feed opened dozens of times/day per user</div><div>Precomputed feed cache (fan-out-on-write) for most users</div></div>
          <div class="pt-row"><div class="pt-name">Availability</div><div>99.99%</div><div>Core engagement loop, revenue-critical (ads)</div><div>Multi-region active-active for read path</div></div>
          <div class="pt-row"><div class="pt-name">Durability of media</div><div>11 nines (object storage SLA)</div><div>User-generated content is irreplaceable</div><div>Blob storage with cross-region replication</div></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">2. Capacity Estimation</div>
  <div class="ref-body">
    <p>Assumptions stated explicitly — interviewers score the method, not the exact digits.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Metric</div><div>Assumption</div><div>Calculation</div><div>Result</div></div>
      <div class="pt-row"><div class="pt-name">DAU</div><div>600M daily active users</div><div>given</div><div>600M</div></div>
      <div class="pt-row"><div class="pt-name">MAU</div><div>2B monthly active users</div><div>given</div><div>2B</div></div>
      <div class="pt-row"><div class="pt-name">Posts/day</div><div>95M photos/videos uploaded/day</div><div>95M / 86,400s</div><div>~1,100 uploads/sec avg</div></div>
      <div class="pt-row"><div class="pt-name">Peak upload rate</div><div>4x average at evening peak</div><div>1,100 × 4</div><div>~4,400 uploads/sec peak</div></div>
      <div class="pt-row"><div class="pt-name">Feed reads/sec</div><div>600M DAU × 8 feed opens/day</div><div>(600M×8) / 86,400s</div><div>~55,500 reads/sec avg, ~220K/sec peak (4x)</div></div>
      <div class="pt-row"><div class="pt-name">Read:Write ratio</div><div>Feed reads vs posts</div><div>55,500 : 1,100</div><div>~50:1 (heavily read-dominant)</div></div>
      <div class="pt-row"><div class="pt-name">Stories/day</div><div>500M Stories/day, viewed ~20x more than posted</div><div>given</div><div>500M posts, ~10B views/day</div></div>
      <div class="pt-row"><div class="pt-name">Storage — new media/day</div><div>avg 2.5MB/photo (all renditions), 95M/day</div><div>95M × 2.5MB</div><div>~237 TB/day raw ingest</div></div>
      <div class="pt-row"><div class="pt-name">Storage — with renditions</div><div>5 renditions per photo (thumb, small, medium, large, original)</div><div>237TB × ~1.8x overhead</div><div>~425 TB/day stored</div></div>
      <div class="pt-row"><div class="pt-name">Storage — 5-year retention</div><div>425TB/day × 365 × 5, minus Stories (auto-deleted)</div><div>425TB × 1825</div><div>~775 PB over 5 years (before compression/tiering)</div></div>
      <div class="pt-row"><div class="pt-name">CDN egress (bandwidth)</div><div>10B story views + 5B feed impressions/day, ~300KB avg/asset</div><div>15B × 300KB / 86,400s</div><div>~52 GB/sec sustained CDN egress</div></div>
      <div class="pt-row"><div class="pt-name">Metadata storage/year</div><div>~1KB/post row × 95M/day × 365</div><div>95M × 365 × 1KB</div><div>~35 TB/year (metadata only, separate from blobs)</div></div>
      <div class="pt-row"><div class="pt-name">5-year growth</div><div>15% YoY user growth</div><div>2B × 1.15^5</div><div>~4B MAU by year 5</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Conclusion: this is a read-and-bandwidth-dominant system (50:1 read:write, 52 GB/sec CDN egress) — the entire architecture optimizes around cheap, fast reads (CDN + precomputed feed cache) while accepting a heavier, asynchronous write path (processing pipeline) since uploads are 3 orders of magnitude rarer than reads.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">3. APIs</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Endpoint</div><div>Method</div><div>Purpose</div><div>Auth</div></div>
      <div class="pt-row"><div class="pt-name">/v1/media/upload</div><div>POST</div><div>Initiate media upload (returns pre-signed blob URL)</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/posts</div><div>POST</div><div>Create post referencing uploaded media + caption/tags</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/feed</div><div>GET</div><div>Fetch ranked home feed (paginated)</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/stories/{userId}</div><div>GET</div><div>Fetch active (non-expired) stories for a user</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/users/{id}/follow</div><div>POST</div><div>Follow a user (asymmetric)</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/posts/{id}/like</div><div>POST</div><div>Like/unlike a post</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/search</div><div>GET</div><div>Search users/hashtags/locations</div><div>Bearer JWT</div></div>
      <div class="pt-row"><div class="pt-name">/v1/explore</div><div>GET</div><div>Personalized discovery feed</div><div>Bearer JWT</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Create Post — Request/Response</div>
        <div class="code-box">POST /v1/posts
Headers:
  Authorization: Bearer &lt;jwt&gt;
  Idempotency-Key: 7c2f-...
  X-Request-Id: req-5521

Request:
{
  "mediaIds": ["m-88213-orig"],
  "caption": "Sunset in Goa #travel",
  "location": { "lat": 15.2993, "lng": 74.1240 },
  "taggedUsers": ["u-4471"]
}

Response 201:
{
  "postId": "P-991823",
  "status": "PROCESSING",
  "estimatedReadyMs": 4000
}</div>
      </div>
      <div>
        <div class="ans-label">API Design Standards</div>
        <ul>
          <li><strong>Status codes:</strong> 201 created, 200 ok, 202 accepted (async processing), 400 bad request, 401 unauthorized, 404 not found, 409 conflict (duplicate upload), 413 payload too large, 429 rate limited</li>
          <li><strong>Auth:</strong> OAuth2 + short-lived JWT (1 hr) + refresh token; device-bound session tokens for mobile</li>
          <li><strong>Pagination:</strong> cursor-based for feed/comments (<code>?cursor=abc&amp;limit=20</code>) — offset pagination breaks under high write concurrency</li>
          <li><strong>Rate limiting:</strong> token bucket per user (e.g. 200 likes/hour, 50 follows/hour) to curb spam/bot behavior</li>
          <li><strong>Versioning:</strong> URI versioning (<code>/v1/</code>, <code>/v2/</code>) with 6-month deprecation window</li>
          <li><strong>Idempotency:</strong> required on POST /posts and /media/upload — prevents duplicate posts on client retry over flaky mobile networks</li>
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
      <div class="pt-row"><div class="pt-name">MySQL/PostgreSQL (sharded) — Users/Posts</div><div>User profiles, post metadata, comments</div><div>Relational integrity for core entities; mature sharding tooling (Vitess-style)</div><div>PK: user_id/post_id (snowflake ID); shard key: user_id</div></div>
      <div class="pt-row"><div class="pt-name">Cassandra/Wide-column — Follow Graph</div><div>Follower/following edges</div><div>Massive fan-out reads/writes, no joins needed, horizontally scalable</div><div>Partition key: user_id; Clustering key: follower_id (and inverse table for followee lookups)</div></div>
      <div class="pt-row"><div class="pt-name">Redis — Precomputed Feed</div><div>Ranked list of post_ids per user (fan-out-on-write)</div><div>Sub-ms reads for the single hottest query in the system</div><div>Sorted set per user_id, capped at ~800 entries, TTL refresh</div></div>
      <div class="pt-row"><div class="pt-name">Redis — Stories (ephemeral)</div><div>Active story metadata + view state</div><div>Natural TTL fit — data must vanish after 24h anyway</div><div>Key: story_id, native Redis TTL=24h; blob deleted via lifecycle rule</div></div>
      <div class="pt-row"><div class="pt-name">Blob/Object Storage</div><div>Original + processed media renditions</div><div>Cheapest durable storage for large immutable binary objects</div><div>Key: media_id/rendition (e.g. m-991-720p.webp); versioned bucket</div></div>
      <div class="pt-row"><div class="pt-name">Elasticsearch</div><div>User/hashtag/location search index</div><div>Full-text + fuzzy match + autocomplete</div><div>Indexed on username, hashtag, geo-point; updated async from CDC stream</div></div>
      <div class="pt-row"><div class="pt-name">Graph/OLAP store (e.g. columnar warehouse)</div><div>Engagement signals for ranking &amp; Explore ML</div><div>Feature computation needs large scans, not point lookups</div><div>Batch + streaming feature pipeline, partitioned by date</div></div>
    </div>
    <div class="code-box" style="margin-top:12px;">-- Posts table (sharded MySQL/PostgreSQL, shard key: user_id)
CREATE TABLE posts (
  post_id       BIGINT PRIMARY KEY,   -- snowflake ID (sortable by time)
  user_id       BIGINT NOT NULL,
  caption       VARCHAR(2200),
  media_refs    JSON,                 -- [{mediaId, type, renditions:[...]}]
  location_geo  GEOGRAPHY(POINT),
  like_count    BIGINT DEFAULT 0,     -- denormalized counter
  comment_count BIGINT DEFAULT 0,
  created_at    TIMESTAMP NOT NULL DEFAULT now(),
  INDEX idx_posts_user (user_id, created_at DESC)
);

-- Follow edges (Cassandra) — two tables for O(1) lookups both directions
CREATE TABLE followers_by_user (
  user_id       BIGINT,               -- partition key: whose followers
  follower_id   BIGINT,               -- clustering key
  followed_at   TIMESTAMP,
  PRIMARY KEY (user_id, follower_id)
);
CREATE TABLE following_by_user (
  user_id       BIGINT,               -- partition key: who they follow
  followee_id   BIGINT,
  followed_at   TIMESTAMP,
  PRIMARY KEY (user_id, followee_id)
);
-- Sharding key: user_id everywhere — co-locates a user's own data,
-- but follow-graph fan-out is inherently cross-shard (unavoidable for a social graph)</div>
    <div class="warn-box" style="margin-top:10px;">⚠️ Never store like/comment counts by counting rows at read time — at this scale COUNT(*) is a denial-of-service against your own DB. Use denormalized counters updated via async increment (Kafka consumer + periodic reconciliation job to fix drift).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">5. High-Level Architecture</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Mobile App / Web Client</div>
      <div class="flow-arrow">↓ DNS + CDN (media delivery)</div>
      <div class="flow-step">Load Balancer</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">API Gateway (auth, rate limit, routing)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Application Servers (stateless)</div>
      <div class="flow-arrow">↓ splits into core services</div>
      <div class="flow-step green">Media Upload/Processing Svc</div>
      <div class="flow-step">Feed Svc</div>
      <div class="flow-step">Stories Svc</div>
      <div class="flow-step">Follow-Graph Svc</div>
      <div class="flow-step">Explore/Recommendation Svc</div>
      <div class="flow-arrow">↓ reads/writes</div>
      <div class="flow-step">Redis (feed cache/Stories) ⇄ Cassandra (follow graph) ⇄ MySQL/Postgres (posts) ⇄ Blob Storage (media)</div>
      <div class="flow-arrow">↓ async events</div>
      <div class="flow-step">Kafka (post.created, like.added, follow.created, story.viewed)</div>
      <div class="flow-arrow">↓ consumed by</div>
      <div class="flow-step">Notification Svc · Analytics/ML Pipeline · Search Indexer</div>
    </div>
    <p style="margin-top:12px;">Cross-cutting: <strong>Monitoring</strong> (Prometheus/Grafana + OpenTelemetry on every service), <strong>Elasticsearch</strong> (search), <strong>ML feature store</strong> (feed &amp; Explore ranking).</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">6. Detailed Component Design</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Responsibility</div><div>Key Design Point</div><div>Scaling Model</div></div>
      <div class="pt-row"><div class="pt-name">Media Upload Service</div><div>Accepts raw photo/video, stores original, kicks off processing</div><div>Client uploads directly to blob storage via pre-signed URL — API servers never touch raw bytes</div><div>Stateless; scales with upload QPS, decoupled from processing</div></div>
      <div class="pt-row"><div class="pt-name">Media Processing Service</div><div>Generates thumbnails, resolution variants, format conversion, video transcoding</div><div>Kafka-driven worker pool; pipeline stages (decode → resize → encode → thumbnail) run as independent async steps</div><div>CPU/GPU-bound; horizontally scaled worker fleet, autoscaled on queue depth</div></div>
      <div class="pt-row"><div class="pt-name">Feed Service</div><div>Builds &amp; serves the ranked home feed</div><div>Hybrid fan-out: fan-out-on-write for normal users (push to follower feed caches), fan-out-on-read for celebrity/high-follower accounts (merge at read time)</div><div>Stateless read path; feed cache in Redis is the real scaling bottleneck to manage</div></div>
      <div class="pt-row"><div class="pt-name">Stories Service</div><div>Manages ephemeral (24h TTL) story lifecycle: post, view tracking, auto-expiry</div><div>Redis-native TTL for metadata; blob lifecycle policy auto-deletes media after 24-48h</div><div>Stateless; expiry is passive (TTL), no cron sweep needed for metadata</div></div>
      <div class="pt-row"><div class="pt-name">Follow-Graph Service</div><div>Manages follow/unfollow, follower/following lists</div><div>Asymmetric edges stored bidirectionally (followers_by_user + following_by_user) to avoid full-table scans in either direction</div><div>Stateless; graph store (Cassandra) scales horizontally by user_id</div></div>
      <div class="pt-row"><div class="pt-name">Explore/Recommendation Service</div><div>Personalized discovery feed of posts from non-followed accounts</div><div>Candidate generation (embedding similarity/collaborative filtering) + ranking model (engagement prediction)</div><div>Offline batch (candidate gen, nightly) + online ranking (low-latency inference service)</div></div>
      <div class="pt-row"><div class="pt-name">Notification Service</div><div>Push notifications for likes/comments/follows/mentions/story views</div><div>Consumes Kafka engagement events; batches/aggregates ("X and 12 others liked...") to avoid notification spam</div><div>Stateless, horizontally scaled consumer group</div></div>
      <div class="pt-row"><div class="pt-name">Search Service</div><div>User/hashtag/location search + autocomplete</div><div>Elasticsearch index kept in sync via CDC from primary DB</div><div>Stateless query layer over a sharded ES cluster</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">7. Sequence Diagrams</div>
  <div class="ref-body">
    <div class="ans-label">Happy Path — Upload to Appearing in Followers' Feeds</div>
    <div class="code-box">Client   UploadSvc   BlobStore   Kafka   ProcessingSvc   FeedSvc   FollowGraphSvc
  |--getUploadUrl->|              |         |              |          |
  |<--presignedUrl-|              |         |              |          |
  |--PUT media------------------->|         |              |          |
  |--createPost(mediaId)->|       |         |              |          |
  |                        |--publish(post.created)------->|          |
  |                        |                |--fetchOriginal-->|      |
  |                        |                |<--processed(renditions)-|
  |                        |                |--publish(media.ready)-->|
  |                        |                                 |--getFollowers(userId)-->|
  |                        |                                 |<--[f1,f2,...fN]---------|
  |                        |                                 |--pushToFeedCache(f1..fN)|
  |<--postStatus(READY)----|                                 |          |</div>

    <div class="ans-label" style="margin-top:14px;">Failure Path — Media Processing Fails</div>
    <div class="code-box">ProcessingSvc     TranscodeWorker      Kafka          PostRecord
   |--transcode(video)-->|                    |               |
   |<--error(corrupt file)|                    |               |
   |--publish(media.processing.failed)-------->|               |
   |                                            |--updateStatus(FAILED)-->|
   |--notifyUser("Upload failed, please retry")
   |  (original NOT deleted from blob store until success confirmed)</div>

    <div class="ans-label" style="margin-top:14px;">Retry — Feed Fan-out Write Failure</div>
    <div class="code-box">FeedSvc      Kafka        Redis (follower feed cache)
  |--consume(post.created)-->|                    |
  |--pushToFeedCache(f1)---------------------->|
  |                                    [Redis timeout]
  |<--retry(1)---------------------------------|  (exponential backoff: 100ms)
  |--pushToFeedCache(f1)---------------------->|
  |<--ack---------------------------------------|
  |  (if 3 retries fail -> DLQ; affected follower falls back
  |   to fan-out-on-read merge next time they open feed)</div>

    <div class="ans-label" style="margin-top:14px;">Timeout — Celebrity Post Fan-out Exceeds Budget</div>
    <div class="code-box">FeedSvc            FollowerFanoutWorker
   |--fanOut(celebrityPost, 50M followers)-->|
   |         (fan-out would take too long to push to every cache)
   |<--budgetExceeded(timeout 30s)-----------|
   |--switchStrategy(fanOutOnRead)
   |--markPost(highFanoutFlag=true)  -- merged at read-time instead of pushed</div>
    <div class="tip-box" style="margin-top:10px;">✅ The hybrid fan-out strategy is exactly why "celebrity problem" detection needs a hard timeout/budget — without it, a single post from a 50M-follower account could block the fan-out queue for everyone else.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">8. Database Scaling</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Sharding Strategy</div>
        <p><strong>Shard key: user_id.</strong> Co-locates a user's own posts/profile on one shard for fast profile-grid reads. The follow graph is inherently cross-shard (a user's followers live on many different shards) — this is accepted as an unavoidable cost of a social graph, mitigated by a dedicated wide-column store (Cassandra) built for exactly this access pattern.</p>
        <div class="ans-label" style="margin-top:12px;">Read Replicas</div>
        <p>MySQL/Postgres: 1 primary + multiple read replicas per shard for profile/post reads; writes (new posts, likes) go to primary, reads for feed rendering hit replicas.</p>
      </div>
      <div>
        <div class="ans-label">Replication</div>
        <p>Cassandra: replication factor 3 across AZs for the follow graph — a graph with billions of edges must tolerate node loss without data loss (quorum reads/writes).</p>
        <div class="ans-label" style="margin-top:12px;">CQRS</div>
        <p>Write model (normalized posts/graph tables) is separate from the read model (denormalized precomputed feed in Redis, search index in Elasticsearch) — the feed read path never touches the normalized write-side tables directly.</p>
      </div>
    </div>
    <div class="warn-box" style="margin-top:12px;">⚠️ Full event sourcing for posts/comments is intentionally NOT used — the write volume and access pattern don't need it. It IS used for the engagement-event stream (likes/views/comments) which naturally feeds the ranking ML pipeline as an append-only log.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">9. Cache Strategy</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Cache</div><div>Pattern</div><div>TTL</div><div>Why</div></div>
      <div class="pt-row"><div class="pt-name">Precomputed home feed</div><div>Write-through (fan-out-on-write pushes directly)</div><div>Rolling, capped at ~800 items/user</div><div>The single hottest read path in the system — must be pre-materialized, not computed per request</div></div>
      <div class="pt-row"><div class="pt-name">Post metadata (caption, counts)</div><div>Cache-aside</div><div>5 min</div><div>Like/comment counts change often but small staleness is acceptable</div></div>
      <div class="pt-row"><div class="pt-name">Stories</div><div>Write-through with native TTL</div><div>24 hours (hard expiry)</div><div>Data must vanish exactly at TTL — cache TTL is the source of truth for expiry, not a background job</div></div>
      <div class="pt-row"><div class="pt-name">User profile</div><div>Read-through</div><div>15 min</div><div>Changes rarely, extremely high read volume (every post render shows author info)</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Hot Key Problem — Viral Post / Celebrity Account</div>
        <p>A celebrity's post or a viral post becomes an extreme hot key — millions of reads/sec for one post_id or profile. Mitigated by (1) local in-process cache layer in front of Redis for the top-N hottest keys, (2) replicating the hot key across multiple Redis shards (key splitting: post:991823:shard0..N) with client-side random shard selection on read.</p>
      </div>
      <div>
        <div class="ans-label">Cache Stampede Prevention</div>
        <p>When a hot post's cache entry expires, thousands of concurrent requests would otherwise all hit the DB simultaneously. Mitigated with a distributed lock (Redis <code>SET NX PX</code>) so only one node recomputes/reloads; others serve the last-good stale value until the lock releases (stale-while-revalidate).</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">10. Messaging</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Broker</div><div>Used For</div><div>Why This One</div></div>
      <div class="pt-row"><div class="pt-name">Kafka</div><div>post.created, like.added, follow.created, story.viewed, media.processing events</div><div>Extreme throughput, replay for reprocessing/backfill (e.g. reprocessing all images with a new compression codec), log-based ordering per partition (by post_id/user_id)</div></div>
      <div class="pt-row"><div class="pt-name">RabbitMQ (or SQS-equivalent)</div><div>Push-notification dispatch queue</div><div>Simpler point-to-point queue semantics fit fire-and-forget notification jobs better than a log</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Delivery Guarantees</div>
        <ul>
          <li><strong>Feed fan-out events:</strong> at-least-once — a duplicate push to a follower's feed cache is deduped by post_id, so harmless</li>
          <li><strong>Media processing completion:</strong> exactly-once semantics via Kafka transactional producer + idempotent consumer (dedupe by media_id + stage)</li>
          <li><strong>Ordering:</strong> partition key = user_id for feed events, guaranteeing a user's own post/delete events are processed in order (a "post deleted" must never be processed before "post created")</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Retry / DLQ</div>
        <p>3 retries with exponential backoff (100ms → 400ms → 1.6s). After exhausting retries, message → Dead Letter Queue; on-call is paged if DLQ depth &gt; threshold. Poison messages (corrupt media metadata) go straight to DLQ without retry to avoid blocking the partition for every other user's uploads.</p>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">11. Storage</div>
  <div class="ref-body">
    <p>This is the core of Instagram's infrastructure — the media pipeline dominates both storage cost and processing complexity.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Stage</div><div>Detail</div></div>
      <div class="pt-row"><div class="pt-name">Original upload</div><div>Stored immutably in blob storage as-is (never modified), used only as the source for regenerating renditions if a new format/codec is adopted later</div></div>
      <div class="pt-row"><div class="pt-name">Image renditions</div><div>Multiple resolutions generated async: thumbnail (150x150), small (320px), medium (720px), large (1080px) — each in both JPEG and WebP/AVIF for smaller payloads on supporting clients</div></div>
      <div class="pt-row"><div class="pt-name">Video encoding</div><div>Transcoded to adaptive bitrate ladder (e.g. 480p/720p/1080p) using H.264 for compatibility + AV1/HEVC for bandwidth savings on supporting devices; segmented for progressive/adaptive streaming</div></div>
      <div class="pt-row"><div class="pt-name">Thumbnail generation</div><div>Extracted from first meaningful video frame (or a specified timestamp) for feed/grid preview before full video loads</div></div>
      <div class="pt-row"><div class="pt-name">Format conversion</div><div>HEIC (iOS native) converted to JPEG/WebP server-side for cross-platform compatibility on delivery</div></div>
      <div class="pt-row"><div class="pt-name">Compression</div><div>Perceptual-quality-aware compression (variable bitrate) to hit target file size without visible quality loss — reduces CDN egress substantially</div></div>
      <div class="pt-row"><div class="pt-name">CDN</div><div>All renditions served from edge CDN with long cache TTL (media is immutable once processed, so cache-forever + versioned URLs works perfectly)</div></div>
    </div>
    <div class="tip-box" style="margin-top:10px;">✅ Processing pipeline runs as an async, staged worker pipeline (decode → resize → encode → thumbnail → CDN push) so a slow video transcode never blocks the API response — the client gets an immediate "processing" status and a push/poll notification when ready.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">12. Search</div>
  <div class="ref-body">
    <p>Elasticsearch powers user-facing search (usernames, hashtags, locations) as well as autocomplete-as-you-type, distinct from the ML-driven Explore recommendation surface.</p>
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Feature</div><div>Approach</div></div>
      <div class="pt-row"><div class="pt-name">User search</div><div>Fuzzy match on username/display name, boosted by follower count &amp; mutual-follow proximity</div></div>
      <div class="pt-row"><div class="pt-name">Hashtag search</div><div>Exact + prefix match, ranked by recent post volume (trending) and total post count</div></div>
      <div class="pt-row"><div class="pt-name">Location search</div><div>Geo-point index, radius query combined with text match on place name</div></div>
      <div class="pt-row"><div class="pt-name">Autocomplete</div><div>Edge n-gram indexing in Elasticsearch for sub-50ms prefix suggestions as the user types</div></div>
      <div class="pt-row"><div class="pt-name">Ranking</div><div>Weighted blend of text relevance score + popularity signal + personalization (past search/follow behavior)</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">13. Scalability</div>
  <div class="ref-body">
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">H</div><div class="principle-name">Horizontal Scaling</div><p>Every service (Upload, Processing, Feed, Stories, Follow-Graph, Explore) is stateless and scales out independently by its own load profile.</p></div>
      <div class="principle-card"><div class="principle-icon">S</div><div class="principle-name">User-ID Sharding</div><p>user_id is the natural partition key for profile/post data; the follow graph gets its own purpose-built store since it doesn't shard the same way.</p></div>
      <div class="principle-card"><div class="principle-icon">A</div><div class="principle-name">Auto-Scaling</div><p>Media Processing workers auto-scale aggressively on Kafka queue depth — upload volume has sharp daily/regional peaks.</p></div>
      <div class="principle-card"><div class="principle-icon">B</div><div class="principle-name">Backpressure</div><p>Processing pipeline applies backpressure via queue depth — better to delay "ready" status briefly than crash workers under a viral-moment upload spike.</p></div>
      <div class="principle-card"><div class="principle-icon">R</div><div class="principle-name">Rate Limiting</div><p>Per-user throttling on likes/follows/comments prevents spam and bot abuse; per-IP throttling on uploads limits scraping/abuse vectors.</p></div>
      <div class="principle-card"><div class="principle-icon">C</div><div class="principle-name">CDN Offload</div><p>Virtually all read traffic (media bytes) never touches origin servers at all — CDN cache hit ratio is the single biggest scalability lever.</p></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">14. Reliability</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Pattern</div><div>Applied To</div><div>Behavior</div></div>
      <div class="pt-row"><div class="pt-name">Circuit Breaker</div><div>Feed Service → Recommendation/ML ranking service</div><div>Opens after 5 consecutive failures; feed falls back to reverse-chronological ordering</div></div>
      <div class="pt-row"><div class="pt-name">Retry</div><div>Media Processing → transcode worker calls</div><div>3 retries, exponential backoff, then DLQ + user notified of failure</div></div>
      <div class="pt-row"><div class="pt-name">Bulkhead</div><div>Processing worker pools</div><div>Separate pools for image vs video processing — one slow video codec can't starve image thumbnail generation</div></div>
      <div class="pt-row"><div class="pt-name">Timeout</div><div>Celebrity post fan-out</div><div>Hard budget (e.g. 30s); beyond it, switches to fan-out-on-read for that post</div></div>
      <div class="pt-row"><div class="pt-name">Idempotency</div><div>POST /posts, POST /media/upload</div><div>Idempotency-Key header prevents duplicate posts on client retry over flaky mobile networks</div></div>
      <div class="pt-row"><div class="pt-name">Graceful Degradation</div><div>Explore/ranking ML service down</div><div>Falls back to popularity-based or chronological ordering rather than blocking the feed entirely</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">15. Security</div>
  <div class="ref-body">
    <ul>
      <li><strong>AuthN:</strong> OAuth2 + JWT (short-lived access token + refresh token), optional 2FA (TOTP/SMS)</li>
      <li><strong>AuthZ:</strong> RBAC for internal moderation/admin tools; ABAC for private-account content visibility (only approved followers can view)</li>
      <li><strong>Encryption:</strong> TLS 1.2+ everywhere in transit; AES-256 at rest for private media and PII</li>
      <li><strong>Secrets:</strong> Key Vault/Secrets Manager for DB credentials, blob storage keys, third-party API keys — never in code/config</li>
      <li><strong>OWASP:</strong> strict content-type/file validation on uploads (prevent malicious payloads disguised as images), rate limiting mitigates credential stuffing and scraping</li>
      <li><strong>DDoS Protection:</strong> CDN/WAF edge layer absorbs volumetric attacks before they reach the API Gateway; signed URLs prevent hotlinking/unauthorized media access</li>
      <li><strong>Content moderation:</strong> automated (ML classifiers) + human review pipeline for policy-violating uploads, gated before wide fan-out where feasible</li>
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
          <li>Upload-to-visible latency (P50/P95/P99)</li>
          <li>Media processing pipeline queue depth &amp; worker throughput</li>
          <li>Feed cache hit ratio and fan-out lag</li>
          <li>CDN cache hit ratio and origin egress volume</li>
          <li>Kafka consumer lag on post/engagement topics</li>
        </ul>
      </div>
      <div>
        <div class="ans-label">Stack</div>
        <ul>
          <li><strong>Metrics:</strong> Prometheus + Grafana dashboards per service/region</li>
          <li><strong>Tracing:</strong> OpenTelemetry across Upload → Processing → Feed → Notification call chain</li>
          <li><strong>Logging:</strong> centralized structured logs (ELK or equivalent)</li>
          <li><strong>Alerts:</strong> PagerDuty on processing-queue depth breach, DLQ depth, CDN origin-egress spike (cache miss storm)</li>
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
      <div class="pt-row"><div class="pt-name">Application Servers</div><div>AKS (Kubernetes) for Feed/Stories/Upload/Follow-Graph services</div></div>
      <div class="pt-row"><div class="pt-name">Feed/Stories Cache</div><div>Azure Cache for Redis</div></div>
      <div class="pt-row"><div class="pt-name">Event Streaming</div><div>Azure Event Hubs (Kafka-compatible endpoint)</div></div>
      <div class="pt-row"><div class="pt-name">Notification Queue</div><div>Azure Service Bus</div></div>
      <div class="pt-row"><div class="pt-name">Posts/Users DB</div><div>Azure Database for MySQL/PostgreSQL (sharded)</div></div>
      <div class="pt-row"><div class="pt-name">Follow Graph</div><div>Cosmos DB (Cassandra API)</div></div>
      <div class="pt-row"><div class="pt-name">Media Storage</div><div>Azure Blob Storage (Hot/Cool/Archive tiers)</div></div>
      <div class="pt-row"><div class="pt-name">Media Processing</div><div>Azure Media Services / AKS GPU node pool for transcoding</div></div>
      <div class="pt-row"><div class="pt-name">Search</div><div>Azure AI Search</div></div>
      <div class="pt-row"><div class="pt-name">Monitoring</div><div>Application Insights + Azure Monitor</div></div>
      <div class="pt-row"><div class="pt-name">Secrets</div><div>Azure Key Vault</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">18. Kubernetes Deployment</div>
  <div class="ref-body">
    <div class="code-box">Deployment: media-processing-service
  replicas: 40 (per region cluster, GPU-enabled node pool for video)
  HPA: target queue-depth-per-pod 50, min 15 / max 200 pods
  readinessProbe: /healthz (checks blob storage + Kafka connectivity)

ConfigMap: media-processing-config
  - MAX_VIDEO_DURATION_SEC=60
  - IMAGE_RENDITIONS=thumb,small,medium,large
  - VIDEO_CODECS=h264,av1

Secret: media-processing-secrets
  - BLOB_STORAGE_CONNECTION_STRING
  - KAFKA_SASL_CREDENTIALS

Ingress: api-gateway-ingress
  - routes /v1/media/* -> media-upload-service
  - routes /v1/feed/* -> feed-service
  - TLS termination at ingress

Service: media-processing-service (ClusterIP) fronts the ReplicaSet
  managed via a Deployment object for rolling updates</div>
    <div class="tip-box" style="margin-top:10px;">✅ Media Processing gets GPU-backed nodes and the most aggressive HPA thresholds since video transcoding is by far the most compute-intensive step in the entire pipeline, unlike lightweight services like Follow-Graph which have flat, cheap workloads.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">19. Failure Scenarios</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Failure</div><div>Impact</div><div>Recovery</div></div>
      <div class="pt-row"><div class="pt-name">Primary DB (Posts/Users) down</div><div>Can't create posts, update profiles</div><div>Automatic failover to standby replica (&lt;30s); reads continue from read replicas</div></div>
      <div class="pt-row"><div class="pt-name">Redis (feed cache) down</div><div>Feed reads degrade or fail</div><div>Failover to Redis replica (Sentinel/Cluster); degrade to fan-out-on-read computed directly from Follow-Graph + Posts store if total outage</div></div>
      <div class="pt-row"><div class="pt-name">Kafka cluster down</div><div>Fan-out, notifications, and processing-completion events stop flowing</div><div>Producers buffer locally with backpressure; multi-broker replication (RF=3) tolerates single-broker loss transparently</div></div>
      <div class="pt-row"><div class="pt-name">Media processing pipeline failure</div><div>Uploaded media stuck in "processing" state</div><div>Original preserved in blob storage; retry queue reprocesses; user notified if permanently failed</div></div>
      <div class="pt-row"><div class="pt-name">Region-wide outage</div><div>Entire region's users affected</div><div>GeoDNS/traffic-manager fails over to nearest healthy region; media replicated cross-region for DR</div></div>
      <div class="pt-row"><div class="pt-name">CDN failure</div><div>Media fails to load for end users</div><div>Multi-CDN fallback (secondary provider) or direct-from-blob-storage-origin fallback</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">20. Cost Optimization</div>
  <div class="ref-body">
    <ul>
      <li><strong>Reserved Instances:</strong> baseline app-server and processing-worker capacity on 1-3yr reservations; burst capacity on-demand</li>
      <li><strong>Auto-scaling:</strong> scale Media Processing workers down aggressively during regional off-peak windows</li>
      <li><strong>Spot/Low-priority nodes:</strong> non-urgent batch jobs (ML model training, historical re-encoding to newer codecs) run on spot capacity</li>
      <li><strong>Caching:</strong> CDN cache-hit ratio directly reduces origin storage egress cost, the single largest infra line item at this traffic volume</li>
      <li><strong>Storage tiering:</strong> older posts' rarely-viewed original files move from hot to cool/archive blob tier after 90 days; Stories media is deleted outright at 24-48h TTL (near-zero long-term storage cost)</li>
      <li><strong>Compression:</strong> AV1/WebP adoption where client-supported cuts CDN egress substantially vs. legacy JPEG/H.264-only delivery</li>
    </ul>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">21. Trade-offs</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Decision</div><div>Chosen</div><div>Rejected Alternative &amp; Why</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Feed fan-out strategy</div><div>Hybrid: fan-out-on-write for most users, fan-out-on-read for celebrities</div><div>Pure fan-out-on-write — a 50M-follower post would need 50M cache writes per post, infeasible; pure fan-out-on-read — too slow for normal users at read time</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Follow-graph store</div><div>Cassandra (wide-column)</div><div>Relational join table — cannot horizontally scale fan-out reads/writes at billions-of-edges volume</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Stories expiry mechanism</div><div>Native Redis TTL + blob lifecycle policy</div><div>Cron-based sweep job — adds operational complexity and a window where expired-but-not-yet-deleted data is still visible</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Media processing timing</div><div>Async, post-upload (client sees "processing" status)</div><div>Synchronous processing before upload response — would make upload latency unacceptable (multi-second video transcode)</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Like/comment counters</div><div>Denormalized async counter, reconciled periodically</div><div>Real-time COUNT(*) query — would not scale, effectively a self-inflicted DoS at this read volume</div></div>
      <div class="dt-row" style="grid-template-columns:1.6fr 2fr 2fr;"><div class="dt-name">Sharding key for posts</div><div>user_id</div><div>post_id — would scatter a single user's posts across shards, breaking profile-grid query locality</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">22. Interview Questions (30)</div>
  <div class="ref-body">
    <ol>
      <li>How would you design the feed fan-out for a user with 50M followers vs one with 200?</li>
      <li>Walk through the full media upload-to-processing-to-visible pipeline.</li>
      <li>Why is the follow graph stored in a wide-column store instead of a relational join table?</li>
      <li>How would you implement Stories' 24-hour auto-expiry efficiently at 500M posts/day?</li>
      <li>Design the ranking algorithm inputs for the home feed — what signals matter?</li>
      <li>How do you prevent a viral post from becoming a cache hot-key bottleneck?</li>
      <li>What's your strategy for generating multiple image/video renditions without blocking the upload response?</li>
      <li>How would you detect and mitigate a celebrity-post fan-out storm in real time?</li>
      <li>Design the like/comment counter system — why not just COUNT(*) at read time?</li>
      <li>How would you guarantee ordering of a user's own post-create/delete events?</li>
      <li>Design an idempotent post-creation API for a flaky mobile network — what's the key and where's it checked?</li>
      <li>How would you architect the Explore/recommendation candidate generation and ranking split?</li>
      <li>What's your approach to content moderation without slowing down publish latency?</li>
      <li>How would you handle a full region outage affecting active uploads mid-flight?</li>
      <li>Explain the trade-off between strong and eventual consistency for the follow-graph.</li>
      <li>How do you scale the Media Processing Service independently from the Feed Service?</li>
      <li>Design the notification fan-out and batching logic for "X and 12 others liked your photo."</li>
      <li>How would you reduce CDN egress cost while keeping media quality acceptable?</li>
      <li>What monitoring signals would page you at 3 AM for this system?</li>
      <li>How do you handle a user account being made private mid-session — what happens to already-cached content?</li>
      <li>Design the unfollow flow — what has to be cleaned up (feed cache, notifications)?</li>
      <li>How would CQRS help the analytics/reporting use case for creator insights?</li>
      <li>What's the failure mode if the ML ranking service for Explore is completely down?</li>
      <li>How do you prevent cache stampede when a celebrity's profile page gets a traffic spike?</li>
      <li>Compare Kafka vs a simple message queue for the media-processing-completion pipeline.</li>
      <li>How would you migrate the posts database to a new sharding scheme with zero downtime?</li>
      <li>Design a circuit breaker policy for the Explore ranking service dependency.</li>
      <li>How would this design change for a market with poor mobile connectivity and expensive data?</li>
      <li>What would you change to support disappearing (view-once) direct messages alongside Stories?</li>
      <li>How would you design duplicate-upload detection (same photo uploaded twice accidentally)?</li>
    </ol>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">23. Follow-up Questions</div>
  <div class="ref-body">
    <ul>
      <li>"You said hybrid fan-out — what's the exact follower-count threshold, and how do you tune it?"</li>
      <li>"How would your design change if Stories needed to support replies that persist beyond 24 hours?"</li>
      <li>"What happens if two services try to update the same post's like count concurrently?"</li>
      <li>"How do you test the feed ranking algorithm's fairness/quality before shipping a change?"</li>
      <li>"Your media processing pipeline retries 3 times — what if the failure is deterministic (always fails on this file)?"</li>
    </ul>
    <div class="tip-box" style="margin-top:10px;">✅ Interviewers push on your first answer's weak point — always state the failure mode of your own solution before they ask.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">24. Real World Technologies</div>
  <div class="ref-body">
    <p><strong>Instagram/Meta</strong> uses Cassandra for the follow graph and feed-related data, TAO (Meta's distributed graph data store built on MySQL) for the social graph, Haystack (Meta's custom object storage system) for photo storage, and Kafka for event streaming. Video is processed through a custom transcoding pipeline similar in spirit to <strong>YouTube's</strong> and <strong>Netflix's</strong> encoding ladders. <strong>Pinterest</strong> and <strong>TikTok</strong> apply comparable hybrid fan-out and ML-driven recommendation patterns for their own feed/discovery surfaces.</p>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">25. Design Evolution by Scale</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Scale</div><div>Architecture</div></div>
      <div class="pt-row"><div class="pt-name">1K users</div><div>Single monolith, one PostgreSQL instance, media stored on local/single blob bucket, feed computed via simple SQL join at read time</div></div>
      <div class="pt-row"><div class="pt-name">100K users</div><div>Split into a few services; introduce Redis for feed cache and CDN for media; single-region deployment</div></div>
      <div class="pt-row"><div class="pt-name">1M users</div><div>Full microservices split (Upload/Processing/Feed/Follow-Graph); Kafka introduced; async media processing pipeline formalized</div></div>
      <div class="pt-row"><div class="pt-name">10M users</div><div>Sharding by user_id across DB and cache; dedicated wide-column store for follow graph; fan-out-on-write feed introduced</div></div>
      <div class="pt-row"><div class="pt-name">100M users</div><div>Hybrid fan-out (celebrity problem solved); Explore/recommendation ML pipeline; multi-region active-active for reads</div></div>
      <div class="pt-row"><div class="pt-name">1B+ users</div><div>Global edge-cached media delivery; region-isolated blast radius for services; custom-built storage systems (Haystack-style) replace generic object storage for cost/latency at this scale</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">26. Final Architecture Diagram</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step blue">Mobile App</div>
      <div class="flow-step blue">Web Client</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">CDN (media delivery) + GeoDNS (routes to nearest region)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">WAF / DDoS Protection → API Gateway (authn, rate limit)</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Load Balancer</div>
      <div class="flow-arrow">↓ fan-out to stateless services</div>
      <div class="flow-step green">Media Upload Svc</div>
      <div class="flow-step green">Media Processing Svc</div>
      <div class="flow-step green">Feed Svc</div>
      <div class="flow-step green">Stories Svc</div>
      <div class="flow-step green">Follow-Graph Svc</div>
      <div class="flow-step green">Explore Svc</div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">Redis (feed/Stories cache) · Cassandra (follow graph) · MySQL/Postgres (posts, sharded) · Blob Storage (media, tiered)</div>
      <div class="flow-arrow">↓ async</div>
      <div class="flow-step">Kafka event backbone → Notification Svc · Analytics/ML Pipeline · Elasticsearch (search)</div>
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
          <li>This is a read-and-bandwidth-dominant system (50:1 read:write) — CDN cache-hit ratio matters more than almost any other single metric</li>
          <li>The asymmetric follow graph forces a hybrid fan-out strategy; there is no single fan-out approach that works for both a 200-follower account and a 50M-follower account</li>
          <li>Media processing is fundamentally an async pipeline problem — never let transcoding/resizing sit in the synchronous upload request path</li>
        </ul>
        <div class="ans-label" style="margin-top:12px;">Pros of This Design</div>
        <ul><li>Scales read path near-infinitely via CDN + precomputed feed cache</li><li>Fault isolation between upload, processing, and serving paths prevents cascading failure</li><li>Stories' TTL-native design eliminates a whole class of cleanup-job complexity</li></ul>
      </div>
      <div>
        <div class="ans-label">Cons / Open Risks</div>
        <ul><li>Hybrid fan-out adds real complexity — two code paths (write-time vs read-time) must both be correct and tested</li><li>Operational complexity of running Kafka + Redis + Cassandra + MySQL/Postgres + Elasticsearch together</li></ul>
        <div class="ans-label" style="margin-top:12px;">Best Practices</div>
        <ul><li>Always design the "celebrity problem" fan-out fallback before the common-case happy path</li><li>Treat media processing renditions as an investment in future CDN cost savings, not just a UX nicety</li></ul>
      </div>
    </div>
  </div>
</div>
`;
