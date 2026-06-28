window.Pages['ref-eventdriven'] = `
<div class="page-header">
  <div class="breadcrumb">Architect Reference › <span>Event-Driven &amp; Messaging</span></div>
  <h1>⚡ Event-Driven Architecture &amp; Messaging</h1>
  <p>Kafka · Service Bus · Event Hub · Patterns · Batch Processing · Scaling · Decision Framework</p>
</div>

<div class="ref-section">
  <div class="ref-title">Why Event-Driven Architecture?</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Synchronous (API-based) Problems</div>
        <div class="code-box">Order Service → HTTP → Payment Service
                   → HTTP → Inventory Service
                   → HTTP → Notification Service

Problems:
  Payment down? → Order fails
  Slow Inventory? → Order times out
  All services tightly coupled
  Cannot scale independently</div>
      </div>
      <div>
        <div class="ans-label">Event-Driven Solution</div>
        <div class="code-box">Order Service → publishes OrderCreated
                     ↓ (Kafka topic)
          Payment Service    (subscribes)
          Inventory Service  (subscribes)
          Notification Service (subscribes)

Benefits:
  Order Service doesn't know/care
  what happens next. Decoupled.
  Each consumer scales independently.</div>
      </div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Use events when: multiple consumers, async processing, high throughput, loose coupling needed.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Kafka vs Azure Service Bus vs Azure Event Hub — Decision Guide</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Feature</div><div>Kafka</div><div>Azure Service Bus</div><div>Azure Event Hub</div></div>
      <div class="pt-row"><div class="pt-name">Type</div><div>Distributed log</div><div>Enterprise message broker</div><div>Event streaming platform</div></div>
      <div class="pt-row"><div class="pt-name">Throughput</div><div>Millions/sec (very high)</div><div>Thousands/sec (moderate)</div><div>Millions/sec (very high)</div></div>
      <div class="pt-row"><div class="pt-name">Message Retention</div><div>Days to forever (configurable)</div><div>Up to 14 days</div><div>Up to 90 days</div></div>
      <div class="pt-row"><div class="pt-name">Ordering</div><div>Per partition</div><div>Per session</div><div>Per partition</div></div>
      <div class="pt-row"><div class="pt-name">Dead Letter Queue</div><div>Manual (separate topic)</div><div class="dt-yes">Built-in DLQ</div><div>Manual</div></div>
      <div class="pt-row"><div class="pt-name">Consumer Model</div><div>Pull — consumer groups</div><div>Push or Pull</div><div>Pull — consumer groups</div></div>
      <div class="pt-row"><div class="pt-name">Best For</div><div>IoT, logs, event sourcing, high-volume streaming</div><div>Enterprise workflows, ordered processing, retry/DLQ</div><div>Telemetry, IoT ingest, Azure Functions trigger</div></div>
      <div class="pt-row"><div class="pt-name">Managed on Azure</div><div>Azure HDInsight Kafka / Confluent</div><div class="dt-yes">Native Azure PaaS</div><div class="dt-yes">Native Azure PaaS</div></div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Rule of thumb: Service Bus for business workflows (orders, payments). Event Hub for high-volume telemetry/IoT. Kafka when you need replay, high scale, or on-prem portability.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Kafka Architecture — Core Concepts</div>
  <div class="ref-body">
    <div class="code-box">Kafka Cluster
├── Broker 1
├── Broker 2  ← replicas for fault tolerance
└── Broker 3

Topic: "order-events"
├── Partition 0  [msg0, msg1, msg2, ...]  → Broker 1
├── Partition 1  [msg0, msg1, msg2, ...]  → Broker 2
└── Partition 2  [msg0, msg1, msg2, ...]  → Broker 3

Producer → writes to partition (by key hash or round-robin)
Consumer Group → each partition read by exactly ONE consumer in group
               → guarantees ordering within a partition
               → enables parallel processing across partitions</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Partition Key Strategy</div>
        <div class="code-box">// Same OrderId → same partition → ordering
producer.send("order-events",
  key: orderId,    // partition key
  value: event);

// All events for one order go to
// same partition → strict ordering</div>
      </div>
      <div>
        <div class="ans-label">Consumer Group Scaling</div>
        <div class="code-box">Topic: 6 partitions
Consumer Group A (payment):
  consumer-1 → partition 0, 1
  consumer-2 → partition 2, 3
  consumer-3 → partition 4, 5

Max parallelism = number of partitions.
Adding more consumers than partitions
= idle consumers (no benefit).</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">Offset &amp; Checkpointing — Avoiding Duplicates</div>
    <div class="code-box">Each message has an offset (sequence number in partition).
Consumer commits offset after processing → "checkpoint"

At-most-once:  commit before processing → possible data loss
At-least-once: commit after processing  → possible duplicate (handle idempotency)
Exactly-once:  Kafka transactions + idempotent producer (complex)</div>
    <div class="tip-box" style="margin-top:8px;">✅ Production pattern: At-least-once delivery + idempotent consumer (check if already processed).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Batch Processing Pattern — High Volume Inserts</div>
  <div class="ref-body">
    <div class="code-box">Problem: 10,000 records/sec arriving. Each one hitting DB = 10,000 DB calls/sec → bottleneck.

Solution: Buffer → Batch → Bulk Insert

API → accepts request → publishes to Kafka (fast, non-blocking)
                              ↓
             Consumer reads N messages at once (batch)
                              ↓
             Single bulk INSERT for N records
                              ↓
                           Database</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Azure Function Batching Config</div>
        <div class="code-box">// host.json
{
  "extensions": {
    "eventHub": {
      "maxBatchSize": 100,
      "prefetchCount": 300
    }
  }
}
// Function receives 100 events at once
// 1 DB round-trip instead of 100</div>
      </div>
      <div>
        <div class="ans-label">On-Prem / Custom Consumer</div>
        <div class="code-box">// .NET Background Worker
var batch = new List&lt;Record&gt;();
while (consuming) {
  batch.Add(consumer.Poll());
  if (batch.Count >= 100 ||
      timer.Elapsed > 5sec) {
    db.BulkInsert(batch);
    consumer.Commit();
    batch.Clear();
  }
}</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">No-Code Option — Kafka Connect</div>
    <div class="code-box">Kafka → Kafka Connect JDBC Sink Connector → Database
No application code needed.
Configure batch.size, poll.interval in connector config.
Industry-grade, battle-tested.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">KEDA — Kubernetes Event-Driven Autoscaling</div>
  <div class="ref-body">
    <div class="code-box">Without KEDA: HPA waits for CPU spike → lag in scaling
With KEDA:   Scale pods BEFORE CPU spikes based on queue depth

KEDA ScaledObject:
  trigger: Kafka topic lag > 1000 messages
  minReplicas: 0    ← scale to zero when idle
  maxReplicas: 50   ← max scale

Flow:
  Queue fills up (lag = 5000)
        ↓
  KEDA detects lag via metrics
        ↓
  Scales from 2 pods → 25 pods
        ↓
  Pods consume queue fast
        ↓
  Queue drains (lag = 0)
        ↓
  KEDA scales back to 0 (saves cost)</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Supported KEDA Triggers</div>
        <div class="tag-grid">
          <span class="tag blue">Kafka</span><span class="tag blue">Azure Service Bus</span>
          <span class="tag blue">Azure Event Hub</span><span class="tag blue">RabbitMQ</span>
          <span class="tag blue">Redis</span><span class="tag blue">PostgreSQL query</span>
          <span class="tag blue">HTTP requests</span><span class="tag blue">Azure Storage Queue</span>
        </div>
      </div>
      <div>
        <div class="ans-label">KEDA vs HPA</div>
        <div class="code-box">HPA:  CPU > 70% → add pods
      (reactive, after load hits)

KEDA: Queue > 1000 → add pods
      (proactive, before CPU spikes)
      Can scale to ZERO (cost saving)</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Dead Letter Queue (DLQ) — Handling Failed Messages</div>
  <div class="ref-body">
    <div class="code-box">Normal Flow:
  Message → Consumer → Process → Commit

Failure Flow:
  Message → Consumer → Process fails → Retry (3x)
                                          ↓ (still failing)
                                     Dead Letter Queue (DLQ)
                                          ↓
                               Alert → Manual review / reprocess

Azure Service Bus DLQ:
  Built-in. Auto-moves after maxDeliveryCount exceeded.
  Access via: queue/$deadletterqueue

Kafka DLQ (manual):
  Consumer catches exception → publishes to "order-events-dlq" topic
  Separate consumer monitors DLQ + alerts</div>
    <div class="warn-box" style="margin-top:10px;">⚠️ Always implement DLQ. Without it, one bad message can block the entire queue forever.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Event-Driven Patterns — Architect Toolkit</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Pattern</div><div>Description</div><div>Use Case</div></div>
      <div class="pt-row"><div class="pt-name">Pub/Sub</div><div>Publisher sends to topic, multiple subscribers consume</div><div>Order events → payment + inventory + notification</div></div>
      <div class="pt-row"><div class="pt-name">Event Sourcing</div><div>Store events instead of current state. Replay to rebuild state.</div><div>Audit trails, financial ledgers, undo/redo</div></div>
      <div class="pt-row"><div class="pt-name">Outbox Pattern</div><div>Write event to DB table atomically, background process publishes</div><div>Guarantees event published if DB write succeeds</div></div>
      <div class="pt-row"><div class="pt-name">Inbox Pattern</div><div>Store incoming events in DB before processing (idempotency)</div><div>Prevents duplicate processing on consumer restart</div></div>
      <div class="pt-row"><div class="pt-name">Competing Consumers</div><div>Multiple consumers read from same queue for parallel processing</div><div>Scale out background job workers</div></div>
      <div class="pt-row"><div class="pt-name">Priority Queue</div><div>Separate queues/topics for high vs normal priority</div><div>Premium customers processed before free-tier users</div></div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Outbox Pattern is the most important for production — guarantees at-least-once event delivery without 2-phase commit.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Interview Summary — Architect-Level Answer</div>
  <div class="ref-body">
    <div class="code-box">Q: How do you design an event-driven system for high-volume order processing?

A: The API accepts the request and immediately returns 202 Accepted.
   It publishes an OrderCreated event to Kafka — fast, non-blocking.

   Downstream services subscribe independently:
   Payment Service, Inventory Service, Notification Service.
   Each scales based on its own queue lag via KEDA.

   For high-volume inserts, consumers batch messages (100 at a time)
   and do a single bulk DB insert — reduces DB round-trips 100x.

   For reliability: At-least-once delivery with idempotent consumers.
   Failed messages go to a Dead Letter Queue with alerting.

   For ordering guarantees: partition by OrderId in Kafka —
   all events for one order land on the same partition, same consumer.

   For guaranteed event publishing: Outbox Pattern —
   write event to DB table in same transaction as business data,
   background process publishes to Kafka.</div>
  </div>
</div>
`;
