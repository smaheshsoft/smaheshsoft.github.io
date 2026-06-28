window.Pages = window.Pages || {};
window.Pages['alstom2'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>Alstom – Round 2</span></div>
    <h1>🚄 Alstom – Round 2</h1>
    <p>CORS · High Volume Inserts · Large File Processing · JSON Storage Decision</p>
  </div>
  <div class="alert" style="margin-bottom:20px;">
    <strong>🎯 Key Interviewer Feedback</strong>
    <p>Interviewer kept pushing away from code-level fixes toward <strong>Architecture-Level Solutions</strong>. Focus on throughput, scalability, queue-based design, and async processing — not code changes.</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">CORS error — I have one UI and one API. How to resolve it?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Why CORS Happens</div>
            <div class="code-box">UI:  https://app.company.com
API: https://api.company.com
→ Browser blocks request — different origins</div>
          </div>
          <div class="ans-block"><div class="ans-label">Where to Fix — Backend API (NOT the UI)</div>
            <div class="code-box">// .NET — Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowUI", policy =>
    {
        policy.WithOrigins("https://app.company.com")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
app.UseCors("AllowUI");</div>
          </div>
          <div class="ans-block"><div class="ans-label">Other places you can configure CORS</div>
            <div class="tag-grid"><span class="tag blue">NGINX Ingress</span><span class="tag blue">API Gateway</span><span class="tag blue">Azure API Management</span></div>
          </div>
          <div class="tip-box">✅ CORS is enabled in the API layer, API Gateway, or Ingress. No UI code changes needed.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">Continuous records inserting into system — server slows down. CPU/Memory/DB all fine. When traffic stops, server recovers. How to fix?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Solution: Batching via Message Broker</div>
            <div class="flow-box">
              <div class="flow-step">API receives request</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Kafka / Service Bus / Event Hub</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Consumer reads batch (e.g. 100 at a time)</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Single bulk INSERT to DB</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Azure Function Batching Config</div>
            <div class="code-box">batchSize: 100
prefetchCount: 200
// 1000 messages → read 100 at once → 1 bulk DB insert</div>
          </div>
          <div class="ans-block"><div class="ans-label">On-Prem (No Azure Function) — Best Option</div>
            <div class="code-box">Kafka Connect JDBC Sink
→ No custom code needed
→ Kafka → Kafka Connect → Database (industry-grade)</div>
          </div>
          <div class="tip-box">✅ API → Kafka → Batch Consumer → Bulk Insert → Database</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">Large file with millions of records — works for 100 users, crashes at 1000 users (OutOfMemory). How to handle?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Correct Architecture</div>
            <div class="flow-box">
              <div class="flow-step">API accepts request — returns immediately (202 Accepted)</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Upload file to Blob Storage</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Add entry to Queue / Message Broker</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Background Worker picks up job</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Validate each record → Insert to Database</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">How to Notify User When Done</div><ul>
            <li><strong>Option 1 — Polling:</strong> User checks status endpoint later</li>
            <li><strong>Option 2 — Email:</strong> Send notification on completion</li>
            <li><strong>Option 3 — SignalR (Best):</strong> Real-time progress updates → 20% → 50% → Completed</li>
          </ul></div>
          <div class="tip-box">✅ Never process large files in API memory. Use Blob + Queue + Background Worker + SignalR.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">JSON data needs to be stored — PostgreSQL (JSONB) vs MongoDB vs Redis. Which to choose?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div class="ans-block"><div class="ans-label">PostgreSQL (JSONB)</div><ul><li>ACID compliant</li><li>Strong consistency</li><li>Index support on JSON fields</li><li>Joins + Transactions</li></ul></div>
            <div class="ans-block"><div class="ans-label">MongoDB</div><ul><li>Schema flexibility</li><li>JSON native storage</li><li>Fast document retrieval</li><li>No joins needed</li></ul></div>
            <div class="ans-block"><div class="ans-label">Redis</div><ul><li>Extremely fast</li><li>Memory-based — not persistent</li><li>Not a primary datastore</li></ul></div>
          </div>
          <div class="ans-block" style="margin-top:12px;"><div class="ans-label">SQL vs NoSQL Decision Factors</div>
            <div class="code-box">Structured data + Transactions + Joins     → SQL (PostgreSQL)
Flexible schema + Massive scale + Documents → NoSQL (MongoDB)
Cache / Session / Temp data                → Redis</div>
          </div>
          <div class="tip-box">✅ Most important factor: How is data READ and WRITTEN — design DB around access patterns.</div>
        </div>
      </div>
    </div>

  </div>
`;
