window.Pages['ref-networking'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Networking</span></div>
  <h1>🌐 Networking Fundamentals</h1>
  <p>TCP · UDP · HTTP/1.1 vs HTTP/2 vs HTTP/3 · TLS · DNS · CDN · Proxy · Load Balancing</p>
</div>

<div class="ref-section">
  <div class="ref-title">TCP vs UDP</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">TCP (Transmission Control Protocol)</div>
        <div class="code-box">Connection-oriented: 3-way handshake before data.
  SYN → SYN-ACK → ACK

Guarantees:
  ✅ Delivery (retransmits lost packets)
  ✅ Order (sequence numbers)
  ✅ No duplicates
  ✅ Flow control &amp; congestion control

Cost:
  Higher latency (handshake + ack overhead)
  Connection state maintained

Use: HTTP, HTTPS, databases, file transfer,
     anything where data must arrive correctly</div>
      </div>
      <div>
        <div class="ans-label">UDP (User Datagram Protocol)</div>
        <div class="code-box">Connectionless: no handshake, fire and forget.

Characteristics:
  ❌ No delivery guarantee
  ❌ No ordering guarantee
  ✅ Very low latency
  ✅ No connection state
  ✅ Supports multicast/broadcast

Use: Video streaming (better late than never),
     DNS queries, VoIP, gaming, IoT telemetry,
     QUIC (HTTP/3 runs on UDP!)</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">HTTP Evolution: 1.1 → 2 → 3</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Feature</div><div>HTTP/1.1</div><div>HTTP/2</div><div>HTTP/3</div></div>
      <div class="pt-row"><div class="pt-name">Transport</div><div>TCP</div><div>TCP</div><div>UDP (QUIC)</div></div>
      <div class="pt-row"><div class="pt-name">Multiplexing</div><div>No — one request per connection (pipelining unreliable)</div><div>Yes — multiple streams on one connection</div><div>Yes — improved, no head-of-line blocking</div></div>
      <div class="pt-row"><div class="pt-name">Header Compression</div><div>None — repeated headers every request</div><div>HPACK compression</div><div>QPACK compression</div></div>
      <div class="pt-row"><div class="pt-name">Server Push</div><div>No</div><div>Yes (push assets before browser asks)</div><div>Yes</div></div>
      <div class="pt-row"><div class="pt-name">Head-of-Line Blocking</div><div>Yes — at HTTP level</div><div>No HTTP blocking, but TCP-level blocking remains</div><div>No — QUIC eliminates TCP HOL blocking</div></div>
      <div class="pt-row"><div class="pt-name">Connection Establishment</div><div>1 RTT (+ TLS 2 RTT)</div><div>1 RTT (+ TLS)</div><div>0-RTT possible (resumes instantly)</div></div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ HTTP/2 is standard for internal microservice communication. HTTP/3 is emerging for public APIs/CDN. gRPC uses HTTP/2 for multiplexed streaming.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">TLS — Transport Layer Security</div>
  <div class="ref-body">
    <div class="code-box">TLS 1.3 Handshake (simplified):

Client Hello: supported cipher suites, TLS version, random + key share
              ↓
Server Hello: chosen cipher, certificate (public key), key share
              ↓
Key Exchange: both sides derive session keys (ECDH)
              ↓
Finished: encrypted with derived keys → verify handshake integrity
              ↓
Application Data: encrypted with symmetric session key (AES-256-GCM)

TLS 1.3 improvements over 1.2:
  1-RTT handshake (vs 2-RTT in 1.2)
  0-RTT session resumption (faster reconnect)
  Removed weak ciphers (RSA key exchange, RC4, 3DES)
  Forward Secrecy mandatory (ECDHE)</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Certificate Chain</div>
        <div class="code-box">Root CA (self-signed, trusted by OS/browser)
  └── Intermediate CA (signed by Root)
        └── Server Certificate (signed by Intermediate)
              Domain: api.company.com
              Public Key + Validity period

Browser validation:
  1. Check server cert signature (by Intermediate)
  2. Check Intermediate cert signature (by Root)
  3. Root is in trusted store → valid chain
  4. Check expiry, domain match (SAN)</div>
      </div>
      <div>
        <div class="ans-label">mTLS (Mutual TLS)</div>
        <div class="code-box">Standard TLS: server proves identity to client.
mTLS: BOTH sides prove identity.

Flow:
  Client → presents client certificate
  Server → validates client cert against CA
  Server → presents server certificate
  Client → validates server cert against CA
  Mutual authentication established.

Use case: Service-to-service in microservices.
  Istio service mesh: auto-injects mTLS between pods.
  No code changes needed — Envoy proxy handles it.
  Zero-Trust: even internal services prove identity.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">DNS &amp; CDN</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">DNS Resolution</div>
        <div class="code-box">Browser cache → OS cache → Resolver (ISP)
   ↓ (cache miss)
Root nameserver (.) → returns .com NS
   ↓
.com TLD nameserver → returns company.com NS
   ↓
Authoritative NS (company.com) → returns IP 1.2.3.4
   ↓
Browser connects to 1.2.3.4

TTL: how long to cache the answer.
  Low TTL (60s): fast failover, more DNS queries
  High TTL (3600s): fewer queries, slow failover

Azure DNS: globally distributed, anycast routing.
Azure Traffic Manager: DNS-based global load balancing.</div>
      </div>
      <div>
        <div class="ans-label">CDN (Content Delivery Network)</div>
        <div class="code-box">CDN = distributed edge servers globally.

Request flow:
  User (London) → nearest CDN edge (Amsterdam)
  → Cache HIT → served from edge (fast!)
  → Cache MISS → origin server (slow, one time)

Benefits:
  Reduced latency (user served from nearby node)
  Origin offload (fewer requests to origin)
  DDoS protection (traffic absorbed at edge)
  TLS termination at edge
  Brotli/Gzip compression at edge

Azure: Azure Front Door (CDN + WAF + LB)
       Azure CDN (Akamai/Verizon backends)
What to cache: static assets, images, CSS/JS,
               API responses with cache headers</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Reverse Proxy vs Forward Proxy vs Load Balancer</div>
  <div class="ref-body">
    <div class="three-col">
      <div>
        <div class="ans-label">Forward Proxy</div>
        <div class="code-box">Client → Proxy → Internet

Client knows about proxy.
Internet sees proxy IP, not client.

Use:
  Corporate firewall
  Privacy/anonymity
  Content filtering
  Cache outbound requests</div>
      </div>
      <div>
        <div class="ans-label">Reverse Proxy</div>
        <div class="code-box">Internet → Proxy → Backend Servers

Client doesn't know about backends.
Backend servers hidden behind proxy.

Use:
  SSL termination
  Load balancing
  Caching
  WAF / DDoS protection
  URL rewriting

Examples: NGINX, HAProxy, Azure APIM</div>
      </div>
      <div>
        <div class="ans-label">L4 vs L7 Load Balancer</div>
        <div class="code-box">L4 (Transport Layer):
  Routes by IP + port.
  Doesn't inspect content.
  Faster (no packet inspection).
  Use: TCP load balancing.

L7 (Application Layer):
  Inspects HTTP headers/URL.
  Path-based routing:
    /api → API servers
    /     → web servers
  SSL termination.
  Sticky sessions (cookie).
  Use: HTTP/HTTPS workloads.
Examples: NGINX, Azure App Gateway</div>
      </div>
    </div>
    <div class="tip-box" style="margin-top:12px;">✅ Kubernetes Ingress = L7 reverse proxy. Azure Load Balancer = L4. Azure Application Gateway = L7. Azure Front Door = global L7 with CDN + WAF.</div>
  </div>
</div>
`;
