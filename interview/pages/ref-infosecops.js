window.Pages['ref-infosecops'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>InfoSec Ops</span></div>
  <h1>🛡️ Information Security Operations</h1>
  <p>SOC · SIEM · Threat Intelligence · Incident Response · Zero Trust · Vulnerability Mgmt · Compliance</p>
</div>

<div class="ref-section">
  <div class="ref-title">InfoSec Operations Framework</div>
  <div class="ref-body">
    <div class="code-box">Information Security = Confidentiality · Integrity · Availability (CIA Triad)

  Confidentiality: only authorised parties can access data.
    Controls: encryption, access control, MFA, least privilege.

  Integrity: data is accurate and unaltered.
    Controls: checksums, digital signatures, audit logs, immutable logs.

  Availability: systems are accessible when needed.
    Controls: HA, DR, DDoS protection, backups, redundancy.

Security Operations disciplines:
  Security Operations Centre (SOC): 24/7 monitoring, detect &amp; respond.
  Vulnerability Management:         find and fix weaknesses before attackers do.
  Identity &amp; Access Management:     who can access what, when.
  Application Security (AppSec):    code and design-level security.
  Cloud Security (CloudSec):        Azure/AWS security posture.
  Incident Response (IR):           structured response to breaches.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">SOC — Security Operations Centre</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">SOC Tiers</div>
        <div class="code-box">Tier 1 — Alert Analyst:
  Monitor SIEM dashboards 24/7.
  Triage incoming alerts (genuine vs false positive).
  Run initial investigation playbook.
  Escalate confirmed incidents to Tier 2.

Tier 2 — Incident Responder:
  Deep investigation of escalated incidents.
  Correlate events across multiple systems.
  Contain and eradicate threats.
  Forensic analysis.

Tier 3 — Threat Hunter / Expert:
  Proactive threat hunting (no alert triggered).
  Hypothesis: "Are we already compromised?"
  Malware reverse engineering.
  Develop new detection rules.

SOC metrics:
  MTTD: Mean Time to Detect (minutes/hours)
  MTTR: Mean Time to Respond (hours/days)
  Alert fatigue: too many false positives → analysts miss real threats.
  False positive rate: goal &lt;10% of alerts are genuine.</div>
      </div>
      <div>
        <div class="ans-label">SIEM — Security Information &amp; Event Management</div>
        <div class="code-box">SIEM: centralise, correlate, and alert on security events.

Collect logs from:
  Firewalls, IDS/IPS, VPN, AD/Entra ID
  Web servers, application logs
  Cloud: Azure Activity Log, AWS CloudTrail
  Endpoints: Windows Event Log, Syslog

Normalise: parse different log formats to common schema.

Correlate: detect patterns across multiple sources.
  Single source: "1 failed login" = noise.
  Correlated: "100 failed logins from same IP in 1 min"
              + "then 1 success" = credential stuffing!

Alert / Detect: predefined rules + ML anomaly detection.

Examples:
  Microsoft Sentinel (Azure-native SIEM + SOAR)
  Splunk (most widely deployed enterprise SIEM)
  IBM QRadar
  Elastic SIEM (open-source based)

Microsoft Sentinel features:
  UEBA: User &amp; Entity Behaviour Analytics.
  Fusion AI: correlates low-fidelity signals into incidents.
  Playbooks (Azure Logic Apps): automated response.
  Threat Intelligence: import IoC feeds.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Incident Response — The 6-Phase Framework</div>
  <div class="ref-body">
    <div class="code-box">NIST SP 800-61 Incident Response Lifecycle:

Phase 1 — PREPARATION
  Policies, playbooks, tools, training in place BEFORE an incident.
  IR runbooks for: ransomware, data breach, credential compromise, DDoS.
  CSIRT (Computer Security IR Team) defined with clear roles.
  IR retainer: pre-contracted forensics firm (CrowdStrike, Mandiant).

Phase 2 — IDENTIFICATION (Detection)
  SIEM alert, user report, threat intelligence feed.
  Triage: Is this a real incident? What is the scope?
  Classify severity: P1 (data breach, ransomware), P2 (compromise, malware), P3 (policy violation).
  Notify: CSIRT, management, legal (if breach).

Phase 3 — CONTAINMENT
  Short-term: isolate affected systems NOW. Stop the spread.
    → Quarantine infected VM, disable compromised AD account, block malicious IP.
  Long-term: maintain evidence, keep systems running for forensics if possible.
  Do NOT power off: live memory contains artefacts (encryption keys, malware).

Phase 4 — ERADICATION
  Remove the threat: malware, backdoors, compromised credentials.
  Patch the vulnerability that was exploited.
  Re-image affected systems (don't trust cleaned VMs).
  Reset all credentials that may have been exposed.

Phase 5 — RECOVERY
  Restore systems from clean backups.
  Verify integrity: no re-infection.
  Monitor closely for recurrence.
  Incremental return to production (don't rush).

Phase 6 — POST-INCIDENT (Lessons Learned)
  Blameless post-mortem within 2 weeks.
  Root cause analysis (5 Whys).
  Update playbooks, detection rules, controls.
  Report to board/regulator if required (GDPR: 72 hours).</div>
    <div class="two-col" style="margin-top:14px;">
      <div>
        <div class="ans-label">Ransomware Response Playbook</div>
        <div class="code-box">Detection signals:
  Mass file encryption (file extensions change).
  Ransom note files appearing.
  Backup deletion commands (vssadmin, wbadmin).
  CrowdStrike / Defender alert: ransomware behaviour.

Immediate actions (first 30 minutes):
  1. Isolate: disconnect infected VMs from network.
             (Azure: remove from NSG, isolate VNet)
  2. Identify: which systems? Which accounts used?
  3. Preserve: snapshot infected VMs for forensics.
  4. Notify: CSIRT + legal + management.
  5. DO NOT pay ransom immediately (assess first).

Parallel streams:
  Technical: isolate → forensics → clean restore from backup.
  Business: invoke DR plan, assess impact, communicate.
  Legal: regulatory notification (GDPR 72h), law enforcement.
  PR: customer communication if data exposed.</div>
      </div>
      <div>
        <div class="ans-label">Breach Notification (GDPR)</div>
        <div class="code-box">GDPR Article 33: 72-hour notification rule.
  If personal data breached →
  notify Data Protection Authority within 72 hours.
  "Without undue delay" — clock starts at detection.

Article 34: notify affected individuals "without undue
  delay" if high risk to their rights and freedoms.

What to include in DPA notification:
  Nature of breach (what happened)
  Categories of data affected (names, emails, health)
  Approximate number of individuals affected
  Likely consequences
  Measures taken/proposed

GDPR penalties:
  Up to 4% of global annual turnover OR €20M (whichever higher).
  BA fined £20M (2020), Marriott £18.4M (2020).

ICO (UK) / supervisory authorities:
  Report via: ico.org.uk/report-a-breach (UK)</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Zero Trust Architecture</div>
  <div class="ref-body">
    <div class="code-box">Zero Trust principle: "Never trust, always verify."
  Traditional perimeter model: trust everything inside the network.
  Zero Trust: assume breach. Verify every request, every time, from anywhere.

Three core pillars:
  1. Verify explicitly:    authenticate and authorise every user, device, app, location.
  2. Least privilege:      just-in-time, just-enough access. No standing privileged accounts.
  3. Assume breach:        minimise blast radius. Encrypt everything. Monitor everywhere.

Zero Trust in practice:

  IDENTITY:
    MFA mandatory for all users.
    Conditional Access: if user is in new location → require MFA + compliant device.
    Privileged Identity Management (PIM): request elevation → approval → time-limited.
    No persistent admin accounts. Admin on-demand via PIM.

  DEVICE:
    Intune: device compliance policy. Non-compliant device → blocked from resources.
    Conditional Access: "only allow access from Intune-managed devices."

  NETWORK:
    Micro-segmentation: VNet + NSG isolate workloads.
    No implicit trust between VNets.
    Private Endpoints: PaaS services not on public internet.
    All traffic encrypted (TLS 1.3, mTLS between services).

  APPLICATION:
    APIM / WAF in front of all APIs.
    OAuth2 + OIDC: every API call must present valid token.
    Service-to-service: Managed Identity (no credentials).

  DATA:
    Classify: Public / Internal / Confidential / Restricted.
    Encrypt at rest (AES-256) + in transit (TLS).
    Purview: data governance, DLP (Data Loss Prevention).

  MONITORING:
    Log everything. SIEM (Sentinel) correlates signals.
    UEBA: detect anomalous user behaviour.
    Assume breach: hunt for indicators even without alert.</div>
    <div class="tip-box">✅ Microsoft Zero Trust model maps directly to Azure services: Entra ID (identity), Intune (device), Azure Firewall + NSG (network), APIM (application), Purview (data), Sentinel (monitoring).</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Vulnerability Management</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Vulnerability Management Lifecycle</div>
        <div class="code-box">1. DISCOVER
   Asset inventory: know what you have.
   Scan: Qualys, Nessus, Microsoft Defender for Cloud.
   Include: VMs, containers, code dependencies, IaC.

2. ASSESS / PRIORITISE
   Not all vulns are equal. Use CVSS score + context.
   CVSS Critical (9.0-10): fix within 24-48 hours.
   CVSS High (7.0-8.9):    fix within 7 days.
   CVSS Medium (4.0-6.9):  fix within 30 days.
   CVSS Low (&lt;4.0):        fix in next release.

   Context matters: critical vuln on internet-facing
   service &gt;&gt; critical vuln on isolated dev machine.

3. REMEDIATE
   Patch OS / packages. Update dependencies.
   Temporary: WAF rule to block exploitation.
   Code fix: SAST finding remediation.

4. VERIFY
   Re-scan after patch. Confirm closed.

5. REPORT
   Dashboard: open vulns by severity, trending over time.
   SLA compliance: % fixed within target time.</div>
      </div>
      <div>
        <div class="ans-label">Tooling Stack</div>
        <div class="code-box">Infrastructure scanning:
  Microsoft Defender for Cloud:
    Secure Score: % of recommendations implemented.
    Just-in-time VM access: ports open only when needed.
    Regulatory compliance: CIS, ISO 27001, PCI DSS.

  Qualys / Tenable Nessus:
    Agent-based scanning on every VM.
    Authenticated network scans.

Container / Image scanning:
  Microsoft Defender for Containers.
  Trivy (open source): scan in CI/CD pipeline.
  ACR integration: scan on push.

Code / Dependency scanning:
  GitHub Advanced Security / Azure DevOps:
    Dependabot: auto-PR for vulnerable packages.
    CodeQL: SAST for code vulnerabilities.
  Snyk: SCA for NuGet, npm, Maven.
  SonarQube: code quality + security hotspots.

Penetration testing:
  Annual external pen test (required for PCI DSS, SOC2).
  Bug bounty programme (continuous).
  Red team exercises: simulate real attacker TTPs.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Security Frameworks &amp; Compliance</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Framework</div><div>What It Is</div><div>Who Needs It</div><div>Key Requirements</div></div>
      <div class="pt-row"><div class="pt-name">ISO 27001</div><div>International standard for Information Security Management System (ISMS)</div><div>Enterprise, government, any org wanting certification</div><div>Risk assessment, security controls, PDCA cycle, annual audit</div></div>
      <div class="pt-row"><div class="pt-name">SOC 2 Type II</div><div>AICPA standard. Audits controls over 6-12 month period.</div><div>SaaS providers selling to US enterprise</div><div>Security, Availability, Confidentiality, Privacy, Processing Integrity</div></div>
      <div class="pt-row"><div class="pt-name">PCI DSS v4</div><div>Payment Card Industry Data Security Standard</div><div>Any org handling card payments</div><div>Network segmentation, encryption, access control, pen test annually</div></div>
      <div class="pt-row"><div class="pt-name">GDPR</div><div>EU/UK data protection regulation</div><div>Any org handling EU/UK personal data</div><div>Consent, data minimisation, right to erasure, 72h breach notification</div></div>
      <div class="pt-row"><div class="pt-name">HIPAA</div><div>US healthcare data protection</div><div>US healthcare orgs and their vendors</div><div>PHI encryption, access audit log, BAA agreements</div></div>
      <div class="pt-row"><div class="pt-name">NIST CSF 2.0</div><div>US framework: Govern, Identify, Protect, Detect, Respond, Recover</div><div>US federal, large enterprises (voluntary but widely adopted)</div><div>Risk-based framework, map controls to 6 functions</div></div>
      <div class="pt-row"><div class="pt-name">CIS Controls v8</div><div>18 prioritised security controls, practical implementation guide</div><div>Any organisation, good starting point</div><div>IG1 (basic hygiene), IG2 (intermediate), IG3 (advanced)</div></div>
    </div>
    <div class="tip-box">✅ Azure Defender for Cloud maps your posture to ISO 27001, PCI DSS, CIS, NIST automatically via built-in regulatory compliance dashboards. Start there before manual gap analysis.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Threat Intelligence &amp; MITRE ATT&amp;CK</div>
  <div class="ref-body">
    <div class="code-box">MITRE ATT&amp;CK: knowledge base of adversary tactics, techniques, and procedures (TTPs).
  Tactics: WHY (the goal) — Initial Access, Persistence, Privilege Escalation, Lateral Movement, Exfiltration.
  Techniques: HOW — Phishing (T1566), Pass-the-Hash (T1550.002), RDP hijacking (T1563.002).
  Procedures: specific malware/group implementation.

Using ATT&amp;CK for defence:
  Map your detection rules to ATT&amp;CK techniques.
  Find coverage gaps: which techniques have no detection?
  Threat hunting: hunt for TTPs used by groups targeting your industry.

Threat Intelligence feeds:
  STIX/TAXII: standard format for threat intel sharing.
  Microsoft Sentinel: free + paid TI connectors.
  AlienVault OTX: open-source IoC feeds.
  ISAC (Information Sharing and Analysis Centre):
    FS-ISAC (finance), H-ISAC (healthcare), E-ISAC (energy).

IoCs (Indicators of Compromise):
  IP addresses, domain names, file hashes, URLs.
  Import to SIEM → auto-alert when IoC seen in logs.
  ⚠️ IoCs are reactive — ATT&amp;CK TTPs are more durable (attackers change IPs, not techniques).</div>
    <div class="warn-box">⚠️ Key interview point: Security is never 100%. The goal is to raise the cost and difficulty for attackers, detect quickly, and respond faster than the attacker can complete their objective. MTTD and MTTR are your most important metrics.</div>
  </div>
</div>
`;
