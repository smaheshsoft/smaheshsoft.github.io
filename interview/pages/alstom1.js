window.Pages = window.Pages || {};
window.Pages['alstom1'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>Alstom – Round 1</span></div>
    <h1>🚄 Alstom – Round 1</h1>
    <p>Builder Pattern · HTTPS/TLS · Certificates · Encryption · DevOps · High Availability</p>
  </div>
  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">What is the Builder Design Pattern?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Definition</div><p>Builder Pattern is a <strong>Creational Design Pattern</strong> used to construct complex objects step-by-step instead of a large constructor with many parameters.</p></div>
          <div class="ans-block"><div class="ans-label">Problems Solved</div><ul><li>Too many constructor parameters</li><li>Optional properties</li><li>Better readability</li><li>Immutable objects</li></ul></div>
          <div class="ans-block"><div class="ans-label">Without Builder vs With Builder</div>
            <div class="code-box">// Without Builder
var emp = new Employee("Mahesh", 35, "IT");

// With Builder
var emp = new EmployeeBuilder()
            .SetName("Mahesh")
            .SetAge(35)
            .SetDepartment("IT")
            .Build();</div>
          </div>
          <div class="tip-box">✅ Advantages: Readable · Maintainable · Flexible · Avoids Constructor Explosion</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">Build Custom System Properties (Name, Value, Unit) using Builder Pattern</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">C# Implementation</div>
            <div class="code-box">public class SystemProperty
{
    public string Name  { get; private set; }
    public string Value { get; private set; }
    public string Unit  { get; private set; }

    private SystemProperty() { }

    public class Builder
    {
        private readonly SystemProperty _p = new SystemProperty();

        public Builder WithName(string name)   { _p.Name  = name;  return this; }
        public Builder WithValue(string value) { _p.Value = value; return this; }
        public Builder WithUnit(string unit)   { _p.Unit  = unit;  return this; }

        public SystemProperty Build() { return _p; }
    }
}

// Usage
var property = new SystemProperty.Builder()
                    .WithName("Temperature")
                    .WithValue("35")
                    .WithUnit("Celsius")
                    .Build();</div>
          </div>
          <div class="ans-block"><div class="ans-label">Output</div><div class="code-box">Name  = Temperature
Value = 35
Unit  = Celsius</div></div>
          <div class="tip-box">✅ Validation can be added inside Build() method. Easy to extend with new fields later.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">What is HTTPS and TLS?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">HTTPS = HTTP + TLS/SSL — provides</div><ul><li>Encryption</li><li>Authentication</li><li>Data Integrity</li></ul></div>
          <div class="ans-block"><div class="ans-label">TLS Handshake Steps</div>
            <div class="flow-box">
              <div class="flow-step">1. Client Hello</div><div class="flow-arrow">↓</div>
              <div class="flow-step">2. Server Hello + Certificate</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">3. Client Verifies Certificate</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">4. Session Key Generated</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">5. Encrypted Communication Starts</div>
            </div>
          </div>
          <div class="code-box">HTTP  = Port 80
HTTPS = Port 443</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">What is a Digital Certificate?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">A certificate proves server identity — contains</div><ul><li>Public Key</li><li>Domain Name</li><li>Issuer Information</li><li>Expiry Date</li><li>Digital Signature</li></ul></div>
          <div class="ans-block"><div class="ans-label">Issued by Certificate Authority (CA)</div>
            <div class="tag-grid"><span class="tag blue">DigiCert</span><span class="tag blue">GlobalSign</span><span class="tag blue">Let's Encrypt</span></div>
          </div>
          <div class="ans-block"><div class="ans-label">Certificate Chain</div>
            <div class="flow-box">
              <div class="flow-step">Root CA</div><div class="flow-arrow">↓</div>
              <div class="flow-step blue">Intermediate CA</div><div class="flow-arrow">↓</div>
              <div class="flow-step green">Server Certificate — Browser verifies the chain</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">Symmetric vs Asymmetric Encryption — and how does HTTPS use both?</div>
        <div class="qa-answer">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="ans-block"><div class="ans-label">Symmetric Encryption</div>
              <p>Same key for encryption &amp; decryption</p>
              <div class="code-box">Plain Text → Secret Key → Cipher Text</div>
              <ul style="margin-top:8px;"><li>Fast, Less CPU</li><li>Algorithms: AES, DES, 3DES</li><li>Problem: How to share the key securely?</li></ul>
            </div>
            <div class="ans-block"><div class="ans-label">Asymmetric Encryption</div>
              <p>Two keys: Public Key + Private Key</p>
              <div class="code-box">Encrypt: Public Key → Cipher Text
Decrypt: Private Key → Original Text</div>
              <ul style="margin-top:8px;"><li>Secure key exchange</li><li>Algorithms: RSA, ECC</li><li>Slower than symmetric</li></ul>
            </div>
          </div>
          <div class="ans-block" style="margin-top:12px;"><div class="ans-label">How HTTPS Uses Both</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <div class="flow-box"><div class="flow-step blue">Asymmetric → TLS Handshake (exchange session key)</div></div>
              <div class="flow-box"><div class="flow-step green">Symmetric → Actual Data Transfer (fast)</div></div>
            </div>
          </div>
          <div class="tip-box">✅ TLS uses asymmetric during handshake and symmetric for actual communication.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">DevOps, Microservices and High Availability — how do they work together?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">CI/CD Pipeline (DevOps)</div>
            <div class="flow-box"><div class="flow-step">Commit → Build → Unit Tests → Code Quality → Container Build → Deploy</div></div>
            <div class="tag-grid" style="margin-top:8px;"><span class="tag blue">Azure DevOps</span><span class="tag blue">GitHub Actions</span><span class="tag blue">Jenkins</span></div>
          </div>
          <div class="ans-block"><div class="ans-label">Microservices Benefits</div><ul><li>Independent deployment</li><li>Independent scaling</li><li>Fault isolation</li></ul></div>
          <div class="ans-block"><div class="ans-label">High Availability Checklist</div><ul>
            <li>Multiple Pods per service (Pod-1, Pod-2, Pod-3)</li>
            <li>Multiple Nodes across zones</li>
            <li>Multi-Zone Deployment (AZ-1, AZ-2, AZ-3)</li>
            <li>Load Balancer — distributes traffic</li>
            <li>Liveness &amp; Readiness Probes</li>
            <li>Database HA — Azure SQL / PostgreSQL HA / Cosmos DB</li>
            <li>HPA (CPU/Memory) + KEDA (Queue-based) auto scaling</li>
          </ul></div>
          <div class="tip-box">✅ HA = Multiple Pods + Multiple Nodes + Load Balancer + Multi-Zone + Auto Scaling</div>
        </div>
      </div>
    </div>

  </div>
`;
