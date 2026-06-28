window.Pages['ref-messaging-advanced'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Messaging Systems</span></div>
  <h1>📨 Messaging Systems — Deep Dive</h1>
  <p>Kafka Internals · Redpanda · RabbitMQ · Azure Messaging — Architecture &amp; Decision Guide</p>
</div>

<div class="ref-section">
  <div class="ref-title">Kafka Internals — Must Know for Architects</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Broker &amp; Replication</div>
        <div class="code-box">Kafka Cluster = multiple brokers

Topic Partition replication:
  Partition 0:
    Leader → Broker 1   (handles all reads/writes)
    Replica → Broker 2  (ISR - In-Sync Replica)
    Replica → Broker 3  (ISR)

ISR (In-Sync Replicas):
  Replicas that are caught up with leader.
  acks=all → leader waits for ALL ISRs to ack
  acks=1   → only leader ack (faster, can lose data)
  acks=0   → fire and forget (fastest, can lose)

If leader fails → one ISR promoted to leader automatically.</div>
      </div>
      <div>
        <div class="ans-label">Producer Guarantees &amp; Idempotency</div>
        <div class="code-box">At Most Once:  producer.send() — no retry
  → message can be lost

At Least Once: retry on failure
  → message can be duplicated

Exactly Once (Kafka 0.11+):
  enable.idempotence=true
  → producer gets epoch + sequence number
  → broker deduplicates within session

  transactional.id=my-producer
  → atomic writes across multiple partitions
  → consumer reads only committed messages
     (isolation.level=read_committed)</div>
      </div>
    </div>
    <div class="three-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Log Compaction</div>
        <div class="code-box">Retention: delete old messages after time/size.

Compaction: keep LATEST value per key.
  Useful for: change data capture (CDC),
  event sourcing snapshots, config topics.

Key=userId, Value=profile
  Before compaction: [user1:v1][user1:v2][user2:v1]
  After compaction:  [user1:v2][user2:v1]
  → Latest state per key preserved indefinitely</div>
      </div>
      <div>
        <div class="ans-label">Kafka Streams</div>
        <div class="code-box">Stream processing library (runs in your app).
No separate cluster needed.

Operations:
  filter, map, join, aggregate, windowing

Example:
  KStream&lt;String, Order&gt; orders =
    builder.stream("orders");
  orders
    .filter((k, v) -&gt; v.amount &gt; 1000)
    .mapValues(v -&gt; enrich(v))
    .to("high-value-orders");</div>
      </div>
      <div>
        <div class="ans-label">KRaft vs ZooKeeper</div>
        <div class="code-box">Old: Kafka relied on ZooKeeper
  for metadata + leader election.
  Separate cluster to manage.
  Operational complexity.

New (Kafka 3.3+): KRaft mode
  Kafka manages its own metadata.
  No ZooKeeper dependency.
  Simpler ops, faster startup.
  Required for Kafka 4.0+

Redpanda: never used ZooKeeper.
  Built-in Raft from day one.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Redpanda — Kafka-Compatible Alternative</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">What is Redpanda?</div>
        <div class="code-box">Redpanda is a Kafka-compatible streaming platform
written in C++ (Kafka is Java/JVM).

100% Kafka API compatible:
  → Drop-in replacement — no app code changes.
  → Works with all Kafka clients, Kafka Connect,
    Kafka Streams, Mirror Maker.

Key differences from Kafka:
  No JVM     → lower latency (no GC pauses)
  No ZooKeeper → built-in Raft consensus
  Simpler ops → single binary deployment
  Thread-per-core model → predictable performance</div>
      </div>
      <div>
        <div class="ans-label">Performance Advantages</div>
        <div class="code-box">Kafka JVM:
  GC pauses → p99 latency spikes
  Memory tuning required (heap settings)
  JVM warmup time

Redpanda C++:
  No GC → consistent low latency
  ~10x lower p99 latency vs Kafka
  10x lower CPU for same throughput
  3x lower memory usage

When to choose Redpanda:
  ✅ Need very low latency (&lt;1ms)
  ✅ Want simpler operations (no JVM tuning)
  ✅ Financial trading, gaming, real-time systems
  ✅ Already using Kafka → want drop-in improvement</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">RabbitMQ — Exchange &amp; Routing Architecture</div>
  <div class="ref-body">
    <div class="code-box">RabbitMQ uses AMQP protocol.
Message flow: Producer → Exchange → Binding → Queue → Consumer

Exchange Types:
  Direct  → route by exact routing key match
  Fanout  → broadcast to ALL bound queues (ignore routing key)
  Topic   → routing key pattern matching (*.error, order.#)
  Headers → route by message headers (not routing key)</div>
    <div class="three-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Dead Letter Exchange (DLX)</div>
        <div class="code-box">Configure queue with:
  x-dead-letter-exchange: dlx.orders

Messages go to DLX when:
  • Message rejected (nack)
  • Message TTL expired
  • Queue length limit exceeded

DLX → DLQ (Dead Letter Queue)
Monitor DLQ → alert + manual review</div>
      </div>
      <div>
        <div class="ans-label">Retry with Exponential Backoff</div>
        <div class="code-box">Queue → consumer fails
  → nack(requeue=false)
  → goes to DLX

Retry queue with TTL:
  x-message-ttl: 5000 (5 sec wait)
  x-dead-letter-exchange: original.exchange

After 5sec → republished to original queue
→ 3 retries: 5s, 30s, 5min
→ Then → permanent DLQ</div>
      </div>
      <div>
        <div class="ans-label">RabbitMQ vs Kafka</div>
        <div class="code-box">RabbitMQ:
  Message broker model
  Messages deleted after consume
  Built-in DLQ, priority queues
  Better for: task queues,
  RPC patterns, routing logic

Kafka:
  Distributed log model
  Messages retained (replayable)
  Consumer groups with offsets
  Better for: event streaming,
  high throughput, replay, CDC</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Azure Messaging — When to Use Which</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Service</div><div>Type</div><div>Ordering</div><div>Retention</div><div>Best For</div></div>
      <div class="pt-row"><div class="pt-name">Service Bus</div><div>Message broker (AMQP)</div><div>Per session (FIFO)</div><div>Max 14 days</div><div>Business workflows, ordered processing, enterprise integration, DLQ built-in</div></div>
      <div class="pt-row"><div class="pt-name">Event Hub</div><div>Event streaming (Kafka-compatible)</div><div>Per partition</div><div>Max 90 days</div><div>High-volume telemetry, IoT ingest, log streaming, Kafka migration</div></div>
      <div class="pt-row"><div class="pt-name">Event Grid</div><div>Event routing (serverless)</div><div>No guarantee</div><div>24 hours retry</div><div>React to Azure resource events, webhook delivery, serverless triggers</div></div>
      <div class="pt-row"><div class="pt-name">Storage Queue</div><div>Simple message queue</div><div>FIFO approx.</div><div>Max 7 days</div><div>Simple decoupling, when Service Bus features not needed, very cheap</div></div>
      <div class="pt-row"><div class="pt-name">IoT Hub</div><div>Device-to-cloud messaging</div><div>Per device</div><div>Configurable</div><div>Device management, D2C + C2D messaging, device twins, telemetry ingestion</div></div>
    </div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Service Bus — Key Features</div>
        <div class="code-box">Sessions: ordered processing per session key
  e.g. all messages for OrderId=123 → same consumer

Dead Letter Queue: built-in, auto-populated on:
  maxDeliveryCount exceeded
  Message TTL expired
  Explicitly deadlettered

Topics &amp; Subscriptions:
  One topic → multiple subscriptions (fan-out)
  Each subscription = independent consumer with filter</div>
      </div>
      <div>
        <div class="ans-label">Event Hub — Kafka Compatibility</div>
        <div class="code-box">Event Hub Premium = Kafka-compatible endpoint.
  Use standard Kafka SDK → points to Event Hub.
  Bootstrap.servers = your-eh.servicebus.windows.net:9093

Migration: Existing Kafka → Event Hub
  Change bootstrap servers only.
  No app code change.

Event Hub Capture:
  Auto-archive events to Blob Storage
  Format: Avro
  Use for: batch analytics, backup, compliance</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Summary — Messaging Decision Framework</div>
  <div class="ref-body">
    <div class="code-box">Q: When do you choose Service Bus vs Event Hub vs Kafka?

A: I ask three questions:
   1. Do I need ordered processing with DLQ and retry? → Service Bus
   2. Do I need high-volume event streaming with replay? → Event Hub or Kafka
   3. Do I need Kafka ecosystem (Connect, Streams) or on-prem portability? → Kafka

   Service Bus: payment processing, order workflows, enterprise integration.
     Guaranteed ordering per session. Built-in DLQ. Max 14 days retention.

   Event Hub: IoT telemetry, log streaming, high volume.
     Kafka-compatible. Up to 90 days retention. Millions/sec throughput.

   Kafka: When you need log compaction, Kafka Streams, Kafka Connect,
     cross-cloud portability, or very long retention.

   RabbitMQ: When you need complex routing logic, priority queues,
     or RPC-style patterns with direct/topic/fanout exchanges.</div>
  </div>
</div>
`;
