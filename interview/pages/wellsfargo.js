window.Pages = window.Pages || {};
window.Pages['wellsfargo'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>Wells Fargo</span></div>
    <h1>🏦 Wells Fargo Interview</h1>
    <p>Principal Engineer / Microservices / AKS — 15 Questions &amp; Answers</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">Service-to-Service Communication in Kubernetes — how do microservices communicate?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Synchronous</div><ul><li>REST API (HTTP/HTTPS)</li><li>gRPC</li><li>GraphQL</li></ul></div>
          <div class="ans-block"><div class="ans-label">Asynchronous</div><ul><li>Kafka</li><li>RabbitMQ</li><li>Azure Service Bus</li><li>Azure Event Hub</li></ul></div>
          <div class="ans-block"><div class="ans-label">Service Discovery</div><div class="code-box">http://payment-service.namespace.svc.cluster.local</div></div>
          <div class="tip-box">✅ Best Practice: REST/gRPC for request-response. Kafka/Service Bus for event-driven.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">Where should Authentication happen in Kubernetes-based Microservices?</div>
        <div class="qa-answer">
          <div class="flow-box">
            <div class="flow-step">User</div><div class="flow-arrow">↓</div>
            <div class="flow-step blue">API Gateway — Validate JWT, OAuth2, OpenID Connect</div><div class="flow-arrow">↓</div>
            <div class="flow-step green">Microservice — Validate Roles, Permissions, Claims</div>
          </div>
          <div class="ans-block"><div class="ans-label">Examples of API Gateway</div><ul><li>Azure API Management</li><li>Kong</li><li>NGINX Ingress</li><li>Istio Gateway</li></ul></div>
          <div class="tip-box">✅ Authentication at Gateway. Authorization at Service.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">Does every microservice need Authentication and Authorization?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Authentication</div><p>Usually centralized at API Gateway — not repeated in every service.</p></div>
          <div class="ans-block"><div class="ans-label">Authorization</div><p>Must be inside each microservice — each service owns its own business rules.</p></div>
          <div class="code-box">Admin → Delete Order
Customer → View Order</div>
          <div class="tip-box">✅ Each service enforces what roles can do what actions.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">Singleton Pattern — What are the drawbacks?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Problems</div><ul>
            <li><strong>Global State</strong> — difficult to track modifications</li>
            <li><strong>Unit Testing Issues</strong> — mocking becomes hard</li>
            <li><strong>Tight Coupling</strong> — many components depend on same object</li>
            <li><strong>Thread Safety</strong> — race conditions in multithreaded apps</li>
            <li><strong>Memory Retention</strong> — lives for entire application lifetime</li>
            <li><strong>Violates Dependency Inversion Principle</strong></li>
          </ul></div>
          <div class="ans-block"><div class="ans-label">Better Approach — Dependency Injection</div><div class="code-box">services.AddSingleton&lt;IMyService, MyService&gt;();</div></div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">Behavioral Design Patterns — when are they used?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">1. Strategy Pattern — Multiple algorithms at runtime</div><p>Example: Payment — Credit Card / UPI / Net Banking</p></div>
          <div class="ans-block"><div class="ans-label">2. Observer Pattern — One-to-many notification</div><p>Example: Order Created Event → Email Service + SMS Service + Audit Service</p></div>
          <div class="ans-block"><div class="ans-label">3. Command Pattern — Encapsulates requests as objects</div><p>Example: Approve Loan / Reject Loan</p></div>
          <div class="ans-block"><div class="ans-label">4. State Pattern — Behavior changes based on state</div><p>Example: Order states: Pending → Approved → Rejected</p></div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">What Design Patterns are used in Microservices?</div>
        <div class="qa-answer">
          <div class="tag-grid">
            <span class="tag blue">API Gateway</span><span class="tag blue">Circuit Breaker</span>
            <span class="tag blue">Retry Pattern</span><span class="tag blue">Bulkhead</span>
            <span class="tag blue">Saga Pattern</span><span class="tag blue">CQRS</span>
            <span class="tag blue">Event Sourcing</span><span class="tag blue">Sidecar</span>
            <span class="tag blue">Strangler</span><span class="tag blue">Ambassador</span>
          </div>
          <div class="ans-block" style="margin-top:12px;"><div class="ans-label">Tools</div><ul><li>Polly (.NET)</li><li>Resilience4j (Java)</li><li>Istio Sidecar</li></ul></div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q7</div>
      <div class="qa-body">
        <div class="qa-question">When to use Event-Based vs API-Based Design?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">API-Based (Synchronous)</div><ul><li>Immediate response needed</li><li>Get Customer Details</li><li>Get Account Balance</li></ul></div>
            <div class="ans-block"><div class="ans-label">Event-Based (Asynchronous)</div><ul><li>Multiple services react independently</li><li>Order Created → Billing + Inventory + Email</li></ul></div>
          </div>
          <div class="tip-box">✅ Use API for synchronous. Use Events for async workflows.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q8</div>
      <div class="qa-body">
        <div class="qa-question">How do AKS Microservices connect to Azure resources (Key Vault, DB, Storage)?</div>
        <div class="qa-answer">
          <div class="flow-box">
            <div class="flow-step">AKS Pod</div><div class="flow-arrow">↓</div>
            <div class="flow-step blue">Managed Identity / Workload Identity</div><div class="flow-arrow">↓</div>
            <div class="flow-step green">Azure Resource (Key Vault / SQL / Storage)</div>
          </div>
          <div class="ans-block"><div class="ans-label">Required Configuration</div><ul><li>Workload Identity / Managed Identity</li><li>RBAC Permissions</li><li>Environment Variables / ConfigMaps</li><li>Kubernetes Secrets / Key Vault Secrets</li></ul></div>
          <div class="warn-box">⚠️ Never store secrets in source code.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q9</div>
      <div class="qa-body">
        <div class="qa-question">How to protect Services hosted in Kubernetes?</div>
        <div class="qa-answer">
          <div class="tag-grid">
            <span class="tag blue">Private Endpoint</span><span class="tag blue">Private Link</span>
            <span class="tag blue">API Gateway</span><span class="tag blue">Service Mesh (Istio)</span>
            <span class="tag blue">Network Policies</span><span class="tag blue">Kubernetes RBAC</span>
            <span class="tag blue">Azure Key Vault</span><span class="tag blue">WAF</span>
          </div>
          <div class="tip-box" style="margin-top:12px;">✅ Best Answer: Private Endpoint + API Gateway + mTLS + Network Policies + RBAC + Key Vault</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q10</div>
      <div class="qa-body">
        <div class="qa-question">API is unable to handle high traffic — how to solve it?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Solution 1 — Horizontal Pod Autoscaler (HPA)</div><div class="code-box">CPU &gt; 70% → Scale Pods: 3 Pods → 10 Pods</div></div>
          <div class="ans-block"><div class="ans-label">Solution 2 — Cluster Autoscaler</div><p>Add nodes automatically when pods can't be scheduled.</p></div>
          <div class="ans-block"><div class="ans-label">Solution 3 — Redis Cache</div><p>Reduce DB load by caching frequent reads.</p></div>
          <div class="ans-block"><div class="ans-label">Follow-up: Event-Driven Approach</div>
            <div class="flow-box">
              <div class="flow-step">API</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Kafka / Service Bus</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Worker Pods — No timeout, Better scalability</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q11</div>
      <div class="qa-body">
        <div class="qa-question">What are all the ways microservices can communicate?</div>
        <div class="qa-answer">
          <div class="tag-grid">
            <span class="tag blue">REST API</span><span class="tag blue">gRPC</span>
            <span class="tag blue">Kafka</span><span class="tag blue">RabbitMQ</span>
            <span class="tag blue">Azure Service Bus</span><span class="tag blue">Event Hub</span>
            <span class="tag blue">WebSocket</span><span class="tag blue">GraphQL</span><span class="tag blue">Service Mesh</span>
          </div>
          <div class="tip-box" style="margin-top:12px;">✅ REST/gRPC for synchronous. Kafka/Service Bus for asynchronous.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q12</div>
      <div class="qa-body">
        <div class="qa-question">How is CI/CD configured and how does a production release work?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">CI Pipeline</div>
              <div class="flow-box compact">
                <div class="flow-step">Commit</div><div class="flow-arrow">↓</div>
                <div class="flow-step">Build</div><div class="flow-arrow">↓</div>
                <div class="flow-step">Unit Tests</div><div class="flow-arrow">↓</div>
                <div class="flow-step">SonarQube / CodeQL</div><div class="flow-arrow">↓</div>
                <div class="flow-step">Docker Build</div><div class="flow-arrow">↓</div>
                <div class="flow-step">Trivy Scan</div><div class="flow-arrow">↓</div>
                <div class="flow-step green">Push to ACR</div>
              </div>
            </div>
            <div class="ans-block"><div class="ans-label">CD Pipeline</div>
              <div class="flow-box compact">
                <div class="flow-step">Deploy Dev</div><div class="flow-arrow">↓</div>
                <div class="flow-step">Integration Tests</div><div class="flow-arrow">↓</div>
                <div class="flow-step">Deploy QA</div><div class="flow-arrow">↓</div>
                <div class="flow-step">Perf + Security Tests</div><div class="flow-arrow">↓</div>
                <div class="flow-step">Approval</div><div class="flow-arrow">↓</div>
                <div class="flow-step green">Production</div>
              </div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Deployment Strategies</div><ul><li>Rolling Update</li><li>Blue-Green Deployment</li><li>Canary Deployment (preferred)</li></ul></div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q13</div>
      <div class="qa-body">
        <div class="qa-question">CAP Theorem — explain it. Can you achieve all 3?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div class="ans-block" style="text-align:center;"><div class="ans-label">C</div><p>Consistency</p></div>
            <div class="ans-block" style="text-align:center;"><div class="ans-label">A</div><p>Availability</p></div>
            <div class="ans-block" style="text-align:center;"><div class="ans-label">P</div><p>Partition Tolerance</p></div>
          </div>
          <div class="ans-block"><div class="ans-label">CP — Consistency + Partition Tolerance</div><p>Examples: etcd, ZooKeeper, Consul — may sacrifice availability</p></div>
          <div class="ans-block"><div class="ans-label">AP — Availability + Partition Tolerance</div><p>Examples: Cassandra, DynamoDB — may return stale data</p></div>
          <div class="warn-box">⚠️ You CANNOT achieve all 3 simultaneously during a network partition.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q14</div>
      <div class="qa-body">
        <div class="qa-question">How are Distributed Transactions handled? How do you track them?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Solution: Saga Pattern</div>
            <div class="flow-box">
              <div class="flow-step green">Order Created</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Payment Success</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Inventory Reserved</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Shipping</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Compensation (if Inventory Fails)</div>
            <div class="flow-box">
              <div class="flow-step red">Inventory Failed</div><div class="flow-arrow">↓</div>
              <div class="flow-step red">Refund Payment</div><div class="flow-arrow">↓</div>
              <div class="flow-step red">Cancel Order</div>
            </div>
          </div>
          <div class="ans-block"><div class="ans-label">Tracking: Correlation ID + Distributed Tracing</div>
            <div class="code-box">Correlation-ID: ABC123  // passed across all services</div>
            <p style="margin-top:8px;">Tools: OpenTelemetry, Jaeger, Zipkin, Azure Application Insights</p>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q15</div>
      <div class="qa-body">
        <div class="qa-question">A service runs in a pod — which node is it on? Which component stores this?</div>
        <div class="qa-answer">
          <div class="flow-box">
            <div class="flow-step">API Server</div><div class="flow-arrow">↓</div>
            <div class="flow-step blue">Scheduler — picks node based on CPU, Memory, Affinity</div><div class="flow-arrow">↓</div>
            <div class="flow-step blue">etcd — stores nodeName: worker-node-3</div><div class="flow-arrow">↓</div>
            <div class="flow-step green">Kubelet — creates and manages pod on that node</div>
          </div>
          <div class="ans-block"><div class="ans-label">etcd stores</div>
            <div class="tag-grid">
              <span class="tag blue">Pods</span><span class="tag blue">Nodes</span>
              <span class="tag blue">Deployments</span><span class="tag blue">Services</span>
              <span class="tag blue">Secrets</span><span class="tag blue">ConfigMaps</span>
            </div>
          </div>
          <div class="tip-box">✅ Scheduler selects node. Assignment stored in etcd. Kubelet manages the pod.</div>
        </div>
      </div>
    </div>

    <div class="qa-card bonus">
      <div class="qa-num">BONUS</div>
      <div class="qa-body">
        <div class="qa-question">HPA vs KEDA / API Gateway vs Service Mesh / OAuth2 vs OIDC / Blue-Green vs Canary</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">HPA vs KEDA</div><ul><li>HPA: CPU/Memory based</li><li>KEDA: Event-based (Kafka queue length)</li></ul></div>
            <div class="ans-block"><div class="ans-label">API Gateway vs Service Mesh</div><ul><li>API Gateway: North-South (external)</li><li>Service Mesh: East-West (internal)</li></ul></div>
            <div class="ans-block"><div class="ans-label">OAuth2 vs OpenID Connect</div><ul><li>OAuth2: Authorization</li><li>OIDC: Authentication + Identity</li></ul></div>
            <div class="ans-block"><div class="ans-label">Blue-Green vs Canary</div><ul><li>Blue-Green: Entire traffic switched at once</li><li>Canary: Gradual (10% new → 100%)</li></ul></div>
          </div>
        </div>
      </div>
    </div>

  </div>
`;
