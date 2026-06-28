window.Pages['ref-security-advanced'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>Security</span></div>
  <h1>🔐 Security — Deep Dive</h1>
  <p>OAuth2 · OIDC · JWT · SAML · mTLS · OWASP Top 10 · Encryption · Secret Management</p>
</div>

<div class="ref-section">
  <div class="ref-title">OAuth2 &amp; OIDC — The Full Flow</div>
  <div class="ref-body">
    <div class="code-box">OAuth2: Authorization framework (who can access what).
OIDC: Identity layer on top of OAuth2 (who you ARE).

Authorization Code Flow + PKCE (recommended for all clients):

1. User clicks "Login" → app redirects to Identity Provider (IdP):
   GET /authorize?
     response_type=code
     &client_id=myapp
     &redirect_uri=https://myapp.com/callback
     &scope=openid profile email
     &code_challenge=BASE64(SHA256(code_verifier))   ← PKCE
     &state=random-csrf-token

2. User logs in at IdP → IdP redirects back:
   GET /callback?code=AUTH_CODE&state=random-csrf-token

3. App exchanges code for tokens (back-channel — never exposed to browser):
   POST /token
     grant_type=authorization_code
     &code=AUTH_CODE
     &code_verifier=original_random          ← PKCE proof
     &redirect_uri=https://myapp.com/callback

4. IdP returns:
   { "access_token": "...", "id_token": "...", "refresh_token": "..." }

5. App uses access_token to call APIs.
   APIs validate token with IdP's public key (JWKS endpoint).</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Token Types</div>
        <div class="code-box">Access Token: grants access to resources.
  Short-lived (15 min - 1 hour).
  Sent as: Authorization: Bearer &lt;token&gt;
  Opaque or JWT format.

ID Token: proves user's identity (OIDC).
  Contains: sub, email, name, iat, exp.
  Always JWT format.
  Only for the client, not for APIs.

Refresh Token: get new access tokens.
  Long-lived (days/weeks).
  Stored securely (httpOnly cookie, secure storage).
  Rotated on use (rotation + reuse detection).</div>
      </div>
      <div>
        <div class="ans-label">Token Validation (.NET)</div>
        <div class="code-box">builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o => {
        o.Authority = "https://login.microsoftonline.com/{tenant}/v2.0";
        o.Audience  = "api://my-api-client-id";
        o.TokenValidationParameters = new() {
            ValidateIssuer   = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            // Keys auto-fetched from /.well-known/jwks.json
            // and cached + auto-rotated
        };
    });

// Policy-based authorization
builder.Services.AddAuthorization(o => {
    o.AddPolicy("OrdersRead", p =>
        p.RequireClaim("scp", "orders.read"));
    o.AddPolicy("AdminOnly", p =>
        p.RequireRole("Admin"));
});</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">JWT — Structure &amp; Security</div>
  <div class="ref-body">
    <div class="code-box">JWT = Header.Payload.Signature (Base64url encoded, dot-separated)

Header: { "alg": "RS256", "typ": "JWT", "kid": "key-id-123" }
Payload: {
  "sub": "user-uuid",           ← subject (user id)
  "iss": "https://idp.company.com",  ← issuer
  "aud": "api://my-api",        ← audience
  "exp": 1735689600,            ← expiry (Unix timestamp)
  "iat": 1735686000,            ← issued at
  "scp": "orders.read orders.write",  ← scopes
  "roles": ["OrderManager"]
}
Signature: RS256(base64(header) + "." + base64(payload), privateKey)

Validation steps (MUST do all):
  1. Signature valid? (use public key from JWKS endpoint)
  2. exp > now? (not expired)
  3. iss matches expected issuer?
  4. aud matches your API's audience?
  5. Required claims present (scp, roles)?</div>
    <div class="warn-box">⚠️ Never store JWTs in localStorage (XSS vulnerable). Use httpOnly cookies for web apps. Never use alg: "none" — always validate algorithm. Always validate audience to prevent token misuse across APIs.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">OWASP Top 10 — Prevention</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Vulnerability</div><div>Example</div><div>Prevention</div></div>
      <div class="pt-row"><div class="pt-name">A01: Broken Access Control</div><div>/orders/123 — can user 456 access it?</div><div>Authorize every endpoint. Check resource ownership. Deny by default.</div></div>
      <div class="pt-row"><div class="pt-name">A02: Cryptographic Failures</div><div>Passwords in plaintext, MD5 hashing</div><div>bcrypt/Argon2 for passwords. TLS 1.3. AES-256 at rest. No MD5/SHA1.</div></div>
      <div class="pt-row"><div class="pt-name">A03: Injection</div><div>SQL: ' OR 1=1-- . XSS: &lt;script&gt;</div><div>Parameterized queries. ORM. Input validation. Output encoding.</div></div>
      <div class="pt-row"><div class="pt-name">A04: Insecure Design</div><div>No rate limiting, no audit log</div><div>Threat modeling. Security in design phase. Defense in depth.</div></div>
      <div class="pt-row"><div class="pt-name">A05: Security Misconfiguration</div><div>Default passwords, verbose errors, open S3</div><div>Least privilege. Disable defaults. No stack traces in prod. IaC scanning.</div></div>
      <div class="pt-row"><div class="pt-name">A06: Vulnerable Components</div><div>Log4Shell, Spring4Shell</div><div>Trivy/Snyk in CI. Dependabot. Keep dependencies updated.</div></div>
      <div class="pt-row"><div class="pt-name">A07: Auth Failures</div><div>Brute force, credential stuffing, weak JWT</div><div>MFA. Account lockout. Strong tokens. Secure session management.</div></div>
      <div class="pt-row"><div class="pt-name">A08: Data Integrity Failures</div><div>Unsigned serialized objects, CI/CD pipeline attack</div><div>Verify signatures. Secure CI/CD. Package integrity checks.</div></div>
      <div class="pt-row"><div class="pt-name">A09: Logging Failures</div><div>No audit log, no alerting on breach</div><div>Log all auth events, failures, privilege changes. Alert on anomalies.</div></div>
      <div class="pt-row"><div class="pt-name">A10: SSRF</div><div>App fetches attacker-controlled URL → accesses internal services</div><div>Allowlist URLs. Block internal IP ranges (169.254.x.x, 10.x.x.x).</div></div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Common Attacks &amp; Defenses</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">SQL Injection</div>
        <div class="code-box">// ❌ Vulnerable
var sql = $"SELECT * FROM users WHERE name = '{input}'";
// input: ' OR '1'='1  → returns all users!

// ✅ Parameterized query
var sql = "SELECT * FROM users WHERE name = @name";
cmd.Parameters.AddWithValue("@name", input);

// ✅ EF Core (always parameterized)
var user = await _db.Users
    .Where(u => u.Name == input)
    .FirstOrDefaultAsync();</div>
        <div class="ans-label" style="margin-top:10px;">XSS (Cross-Site Scripting)</div>
        <div class="code-box">// ❌ Vulnerable (Razor)
@Html.Raw(userInput)  // injects raw HTML!

// ✅ Safe (auto-encoded by Razor)
@userInput  // encodes &lt; &gt; " ' &amp;

// Content Security Policy header:
app.Use((ctx, next) => {
    ctx.Response.Headers.Append(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'");
    return next();
});</div>
      </div>
      <div>
        <div class="ans-label">CSRF &amp; Defense</div>
        <div class="code-box">CSRF: attacker tricks logged-in user's browser
into making requests to your site.

Defense 1: Anti-forgery tokens (.NET)
  @Html.AntiForgeryToken()  // in form
  [ValidateAntiForgeryToken]  // on action

Defense 2: SameSite cookies
  Set-Cookie: session=...; SameSite=Strict; HttpOnly; Secure

Defense 3: Custom request header
  APIs: require X-Requested-With: XMLHttpRequest
  (simple cross-origin requests can't set custom headers)</div>
        <div class="ans-label" style="margin-top:10px;">Secrets Management</div>
        <div class="code-box">// ❌ Never: secrets in code / appsettings.json
"ConnectionStrings": { "Db": "Server=...;Password=secret" }

// ✅ Azure Key Vault
builder.Configuration.AddAzureKeyVault(
    new Uri("https://myvault.vault.azure.net/"),
    new DefaultAzureCredential());
// Access: config["MyConnectionString"]

// ✅ Kubernetes Secrets
env:
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef: { name: db-secret, key: password }

// Key rotation: rotate without redeploying app
// Managed Identity: no credentials at all</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Encryption — At Rest &amp; In Transit</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Encryption In Transit</div>
        <div class="code-box">TLS 1.3: mandatory for all external traffic.
mTLS: service-to-service (Istio auto-injects).

HSTS: force HTTPS (header):
  Strict-Transport-Security: max-age=31536000; includeSubDomains

Certificate pinning: mobile apps pin expected cert.
  Prevents MITM even with trusted CA.

Internal services: even internal calls should use TLS.
  Zero Trust: never assume internal network is safe.</div>
      </div>
      <div>
        <div class="ans-label">Encryption At Rest</div>
        <div class="code-box">Azure storage: AES-256 by default (platform-managed keys).
Customer-managed keys (CMK): keys in Key Vault.
  Compliance: PCI DSS, HIPAA may require CMK.

Column-level encryption (sensitive data):
  PII fields: SSN, credit card → encrypt before storing.
  // .NET: use AES-256-GCM
  using var aes = Aes.Create();
  aes.Key = Convert.FromBase64String(keyFromKeyVault);

Password hashing (one-way, NOT encryption):
  // ✅ bcrypt (built-in cost factor)
  BCrypt.Net.BCrypt.HashPassword(password, workFactor: 12);
  BCrypt.Net.BCrypt.Verify(password, hash);</div>
      </div>
    </div>
  </div>
</div>
`;
