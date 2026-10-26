window.Pages = window.Pages || {};
window.Pages['amtech4'] = `
  <div class="page-header">
    <div class="breadcrumb">Home › <span>AM Tech Software – Round 4</span></div>
    <h1>🔄 AM Tech Software — Round 4: Legacy On-Premises to Multi-Tenant SaaS Migration</h1>
    <p>Multi-tenant migration · data migration · synchronisation · tenant isolation · cutover with minimal downtime · rollback and reverse sync · schema differences, conflicts, duplicates and failures</p>
  </div>
  <div class="stats-bar" style="margin-bottom:20px;">
    <div class="stat-box"><div class="num">7</div><div class="label">Questions</div></div>
    <div class="stat-box"><div class="num">1</div><div class="label">Migration Scenario</div></div>
  </div>
  <div class="alert" style="margin-bottom:16px;">
    <strong>🎯 The one idea behind every answer in this round</strong>
    <p>At any moment, each tenant has exactly ONE system of record — either the legacy database or the SaaS database — and a durable change-capture pipeline carries changes from the writer to the other side. That single-writer rule prevents most conflicts, the pipeline prevents lost updates, parity checks prove the data matches before cutover, and a time-boxed rollback window keeps a way back. Migration is done per tenant in waves, never as one big bang.</p>
  </div>

  <div class="ref-section">
    <div class="ref-title">The Migration Lifecycle — Who Is The System Of Record At Each Phase</div>
    <div class="ref-body">
      <div class="flow-box">
        <div class="flow-step">0 Assess and design</div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">1 Build the SaaS</div>
        <div class="flow-arrow">→</div>
        <div class="flow-step blue">2 Initial load + change capture</div>
        <div class="flow-arrow">→</div>
        <div class="flow-step blue">3 Shadow and parity validation</div>
        <div class="flow-arrow">→</div>
        <div class="flow-step green">4 CUTOVER</div>
        <div class="flow-arrow">→</div>
        <div class="flow-step blue">5 Hypercare + reverse sync</div>
        <div class="flow-arrow">→</div>
        <div class="flow-step">6 Close and decommission</div>
      </div>
      <div class="decision-table">
        <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.7fr 1fr 1.1fr 1.2fr;"><div>Phase</div><div>What happens</div><div>System of record</div><div>Sync direction</div><div>Can we go back?</div></div>
        <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1fr 1.1fr 1.2fr;"><div class="dt-name">0 Assess and design</div><div>Inventory the app, customisations, integrations, data; choose the tenancy model; write the mapping</div><div>Legacy</div><div>None</div><div class="dt-yes">Nothing has changed</div></div>
        <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1fr 1.1fr 1.2fr;"><div class="dt-name">1 Build the SaaS</div><div>Tenant model, provisioning, security, migration tooling, monitoring</div><div>Legacy</div><div>None</div><div class="dt-yes">Nothing has changed</div></div>
        <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1fr 1.1fr 1.2fr;"><div class="dt-name">2 Initial load + change capture (per tenant)</div><div>Bulk copy, then continuous capture of changes until the copy has caught up</div><div>Legacy</div><div>Legacy to SaaS</div><div class="dt-yes">Yes — just stop</div></div>
        <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1fr 1.1fr 1.2fr;"><div class="dt-name">3 Shadow and parity validation</div><div>Compare data, run client acceptance tests and performance tests on the SaaS copy</div><div>Legacy</div><div>Legacy to SaaS</div><div class="dt-yes">Yes — just stop</div></div>
        <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1fr 1.1fr 1.2fr;"><div class="dt-name">4 Cutover</div><div>Short write freeze, final delta, parity check, switch traffic, enable reverse capture</div><div>Moves to SaaS</div><div>Final delta, then reverse</div><div>Go / no-go decision point</div></div>
        <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1fr 1.1fr 1.2fr;"><div class="dt-name">5 Hypercare (rollback window)</div><div>SaaS is live; every change is also carried back to legacy</div><div>SaaS</div><div>SaaS to Legacy</div><div class="dt-yes">Yes — through reverse sync</div></div>
        <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1fr 1.1fr 1.2fr;"><div class="dt-name">6 Close</div><div>Stop reverse sync, archive the legacy database, decommission</div><div>SaaS</div><div>None</div><div class="dt-no">Point of no return</div></div>
      </div>
    </div>
  </div>

  <div class="qa-list">

    <div class="qa-card">
      <div class="qa-num">Q1</div>
      <div class="qa-body">
        <div class="qa-question">How do we migrate a legacy client-deployed application to a multi-tenant SaaS solution?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer</div>
          <div class="qa-answer">"I would not rewrite and switch everything at once. I assess the application and each client's customisations, choose a tenancy model, turn per-client code differences into configuration, and move clients in waves — a friendly pilot tenant first. Each tenant is migrated with an initial data load plus continuous change capture, validated in shadow mode, cut over in a short window, and kept on a rollback path for a defined period. Tenant isolation, identity, observability and tenant provisioning are built into the platform before the first client moves."</div></div>

          <div class="ans-block"><div class="ans-label">Step 1 — Assess before designing</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Area</div><div>What to find out</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Application</div><div>Architecture, dependencies on the client's environment (file shares, local services, OS), what is shared across clients and what differs</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Customisations</div><div>Per-client code forks, custom reports, custom fields, integrations — the biggest obstacle to a single multi-tenant codebase</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Data</div><div>Volume per client, quality, duplicates, personal data, retention rules, residency requirements</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Integrations</div><div>What each client connects to on-premises, and which of those links must keep working</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Commercial and operational</div><div>SLAs, maintenance windows, contracts, support model, security and compliance obligations</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Step 2 — Choose the tenancy model</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 1.6fr 1.5fr 1.5fr;"><div>Model</div><div>Isolation</div><div>Cost and operations</div><div>Best for</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.6fr 1.5fr 1.5fr;"><div class="dt-name">Database per tenant</div><div class="dt-yes">Strongest — own data, backup, restore, encryption key, residency</div><div>Highest cost and many databases to manage; elastic pools and automation help</div><div>Large or regulated clients; the first target when each legacy client already has its own database</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.6fr 1.5fr 1.5fr;"><div class="dt-name">Schema per tenant</div><div>Good logical separation inside one database</div><div>Medium; many schemas make migrations and tooling heavier</div><div>Mid-size tenants with moderate isolation needs</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.6fr 1.5fr 1.5fr;"><div class="dt-name">Shared schema with a tenant id</div><div>Weakest by default — needs row-level security and discipline</div><div class="dt-yes">Most efficient; noisy-neighbour risk; ids must be unique across tenants</div><div>A long tail of small tenants</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 1.6fr 1.5fr 1.5fr;"><div class="dt-name">Hybrid by tier</div><div>Matches the client's needs</div><div>Most flexible, most complex to operate</div><div>A mixed customer base</div></div>
          </div>
          <div class="tip-box">✅ A practical path: because each legacy install already has its own database, start with database-per-tenant. It maps one to one, avoids id collisions and keeps a client's data separable. Consolidate the small tenants into a shared schema later if cost requires it.</div></div>

          <div class="ans-block"><div class="ans-label">Step 3 — Make the application multi-tenant</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Concern</div><div>Approach</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Tenant resolution</div><div>Identify the tenant from the sub-domain or a token claim on every request and carry it in a tenant context</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Per-client customisations</div><div>Replace code forks with configuration, feature flags and extension points so one codebase serves everyone</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Identity</div><div>Per-tenant users and single sign-on; roles scoped to the tenant</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Data isolation</div><div>Enforced in the platform, not left to every developer (see Q4)</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Noisy neighbours</div><div>Rate limits, quotas and resource governance per tenant</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Provisioning</div><div>An automated pipeline that creates a tenant: database, configuration, keys, users, monitoring</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Operations</div><div>Per-tenant logging, metrics, billing or metering, backup and restore</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Step 4 — Migrate in waves, application by application where needed</div>
          <div class="code-box">Wave 0   internal or friendly pilot tenant   -> prove the pipeline, find the gaps
Wave 1   a few small, low-risk clients       -> refine runbooks and automation
Wave 2   mid-size clients in batches         -> scale the process
Wave 3   large or regulated clients          -> most rehearsal, longest hypercare

Per wave: rehearse on production-like data -> migrate -> validate -> cut over -> hypercare -> close

For the application itself, use the strangler pattern where a full move is risky:
  put a routing layer in front, move one module or capability at a time to the SaaS,
  and use an anti-corruption layer so the new code does not inherit the legacy model.</div></div>

          <div class="ans-block"><div class="ans-label">In code — tenant context and enforced isolation</div>
          <div class="code-box">// Resolve the tenant once per request
public class TenantMiddleware
{
    private readonly RequestDelegate _next;
    public TenantMiddleware(RequestDelegate next) =&gt; _next = next;

    public async Task InvokeAsync(HttpContext ctx, ITenantAccessor tenant)
    {
        var tenantId = ctx.User.FindFirst("tid")?.Value ?? TenantFromHost(ctx.Request.Host.Host);
        if (tenantId is null) { ctx.Response.StatusCode = 400; return; }   // never default to a tenant
        tenant.Set(tenantId);
        await _next(ctx);
    }
}

// EF Core: every query is automatically filtered to the current tenant
modelBuilder.Entity&lt;Order&gt;().HasQueryFilter(o =&gt; o.TenantId == _tenant.Id);</div>
          <div class="code-box">-- PostgreSQL row-level security: the database refuses cross-tenant reads even if the app has a bug
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders FORCE ROW LEVEL SECURITY;               -- applies to the table owner too
CREATE POLICY tenant_isolation ON orders
    USING (tenant_id = current_setting('app.tenant_id')::uuid);

-- per request, inside the transaction (works with connection pooling):
SET LOCAL app.tenant_id = '0b9d...';
-- the application connects with a role that is NOT the table owner or a superuser</div></div>

          <div class="tip-box">✅ Interview line: "I treat this as a product transformation, not a lift-and-shift. I choose the tenancy model from the clients' isolation needs — often database-per-tenant first, because it maps to the legacy installs — turn customisations into configuration, build tenant provisioning and isolation into the platform, and migrate in waves with a rehearsed, per-tenant runbook." Related page: Cloud Migration Strategy (6Rs).</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q2</div>
      <div class="qa-body">
        <div class="qa-question">How should existing client data be migrated from on-premises databases to cloud databases?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — clean it first, then an initial bulk load plus continuous change capture, validated at every step, per tenant, and rehearsed</div></div>

          <div class="ans-block"><div class="ans-label">Choose the approach by data size and the downtime the client can accept</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.8fr 1.6fr;"><div>Approach</div><div>How it works</div><div>Use when</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.6fr;"><div class="dt-name">Offline bulk (backup and restore, export and import)</div><div>Stop writes, copy everything, start on the new side</div><div>Small data or a generous maintenance window</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.6fr;"><div class="dt-name">Online: initial load + change data capture</div><div>Copy while the legacy system keeps running, then stream changes until the target has caught up; cut over in minutes</div><div class="dt-yes">Large data or tight downtime — the usual choice</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.6fr;"><div class="dt-name">ETL / ELT pipeline</div><div>Extract, transform to the new schema, load in batches</div><div>Significant schema or model differences</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.8fr 1.6fr;"><div class="dt-name">Application-level migration</div><div>Use the application's own APIs or import functions to recreate data</div><div>When business rules must run during import</div></div>
          </div>
          <p>Tools commonly used: Azure Database Migration Service, native replication (SQL Server replication or log shipping, PostgreSQL logical replication), Debezium with a broker for change capture, Azure Data Factory or SSIS for ETL, and schema conversion tools. Choose by source and target engines and the downtime budget.</p></div>

          <div class="ans-block"><div class="ans-label">The steps, per tenant</div>
          <div class="code-box">1  PROFILE     size, row counts, data quality, duplicates, orphaned rows, personal data
2  CLEANSE     fix or flag bad data in the SOURCE first (or in a staging area), de-duplicate
3  MAP         source schema to target schema; add tenant id; plan id mapping (see Q7)
4  CONNECT     private, encrypted link (VPN or ExpressRoute); least-privilege migration account
5  REHEARSE    full dry run on a copy: measure duration, find failures, fix mapping
6  INITIAL LOAD   batched, ordered by foreign-key dependencies, checkpointed and re-runnable
7  CAPTURE     start change capture BEFORE the load begins, so no change falls in a gap
8  CATCH UP    apply captured changes until lag is near zero
9  VALIDATE    counts, checksums, business totals, sampled records (below)
10 CUT OVER    short freeze, final delta, validate, switch (see Q4)</div></div>

          <div class="ans-block"><div class="ans-label">Validation — prove the data matches</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Check</div><div>What it proves</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Row counts per table</div><div>Nothing was dropped or duplicated</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Checksums or hashes per table or partition</div><div>Contents match, not only counts</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Business reconciliation</div><div>Totals that matter match: balances, order values, inventory, open items</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Referential integrity</div><div>Every foreign key resolves in the target</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Sampled record comparison</div><div>Field-by-field equality, including dates, precision and encoding</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Client acceptance testing</div><div>The client confirms their own reports and workflows on the migrated copy</div></div>
          </div>
          <div class="code-box">-- Run the same query on both sides for one tenant and compare the results
SELECT COUNT(*)                                             AS row_count,
       SUM(amount)                                          AS total_amount,
       MD5(STRING_AGG(id::text || ':' || updated_at::text, ',' ORDER BY id)) AS content_hash
FROM   orders
WHERE  tenant_id = :tenant;      -- on the legacy side use that client's whole database</div></div>

          <div class="ans-block"><div class="ans-label">In code — a re-runnable, checkpointed batch copy</div>
          <div class="code-box">// Idempotent: running it twice produces the same result
long lastId = await _checkpoints.GetAsync(tenant, "orders");            // resume point
while (true)
{
    var batch = await _legacy.QueryAsync&lt;OrderRow&gt;(
        "SELECT TOP (@n) * FROM Orders WHERE Id &gt; @last ORDER BY Id", new { n = 5000, last = lastId });
    if (batch.Count == 0) break;

    var mapped = batch.Select(r =&gt; _mapper.ToSaas(r, tenant));       // add tenant id, map ids, convert types
    await _saas.UpsertAsync(mapped);                                  // upsert, so a retry is harmless

    lastId = batch.Max(r =&gt; r.Id);
    await _checkpoints.SaveAsync(tenant, "orders", lastId);           // checkpoint after each batch
}</div></div>

          <div class="warn-box">⚠️ Common mistakes: starting change capture AFTER the bulk load (changes made in between are lost), migrating dirty data and fixing it later, skipping rehearsals, loading without a way to resume, and validating only row counts. Add indexes and re-enable constraints after the bulk load, but before validation.</div>
          <div class="tip-box">✅ Interview line: "I migrate per tenant with an online approach: profile and clean the source, rehearse, start change capture before the bulk load, load in resumable batches, catch up the delta, and validate with counts, checksums and business reconciliation. Only when parity is proven do we cut over."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q3</div>
      <div class="qa-body">
        <div class="qa-question">How do we synchronise on-premises data with the cloud database during migration and ongoing operations?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — change data capture through a durable pipeline, applied idempotently, with ONE writer per tenant so conflicts do not arise</div></div>

          <div class="ans-block"><div class="ans-label">The synchronisation pipeline</div>
          <div class="code-box">Source database
   |  change data capture (reads the transaction log)
   v
Durable stream  (Event Hubs / Kafka)          partitioned by tenant + entity key  -&gt; per-key order
   |
   v
Transform  (map the source schema to the target schema, add tenant id, map ids)
   |
   v
Idempotent apply to the target  (skip anything already applied; guard with version or log position)
   |   failures
   v
Retry with backoff  -&gt;  dead-letter store  -&gt;  replay tool + alerts

Plus: lag monitoring, a periodic reconciliation job, and a position checkpoint so it can resume.</div></div>

          <div class="ans-block"><div class="ans-label">How to capture changes — the options</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div>Method</div><div>Strength</div><div>Weakness</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Log-based CDC (SQL Server CDC or change tracking, PostgreSQL logical decoding, Debezium)</div><div class="dt-yes">Low impact on the source; captures every committed change in order, including deletes</div><div>Needs log access and enabling features on the legacy server</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Trigger-based</div><div>Works where log access is not possible</div><div>Adds load and risk to the legacy database; easy to break</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Timestamp or row-version polling</div><div>Simple</div><div>Misses hard deletes; needs reliable timestamps; polling lag</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Application events / outbox</div><div>Business-level events with meaning</div><div>Requires changing the legacy application</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.7fr 1.7fr;"><div class="dt-name">Managed replication service (for example Database Migration Service in online mode)</div><div>Less to build and operate</div><div>Limited transformation and fewer controls</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Single writer per tenant — the rule that prevents conflicts</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 1.3fr 1.3fr 1.4fr;"><div>Phase</div><div>Writer for the tenant</div><div>Direction</div><div>Other side is</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.3fr 1.3fr 1.4fr;"><div class="dt-name">Before cutover</div><div>Legacy</div><div>Legacy to SaaS</div><div>Read-only replica; clients do not write to it</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.3fr 1.3fr 1.4fr;"><div class="dt-name">After cutover (rollback window)</div><div>SaaS</div><div>SaaS to Legacy</div><div>Legacy is kept current but read-only</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 1.3fr 1.3fr 1.4fr;"><div class="dt-name">After the window closes</div><div>SaaS</div><div>None</div><div>Legacy archived and decommissioned</div></div>
          </div>
          <div class="warn-box">⚠️ Avoid true two-way (active-active) sync unless there is a hard business need. It requires conflict detection and resolution on every entity and is the most common source of data corruption in migrations. Make the writer a per-tenant flag, flip it at cutover, and the problem largely disappears.</div></div>

          <div class="ans-block"><div class="ans-label">Ongoing operations — keeping things in step after the first migration</div>
          <ul>
            <li><strong>Per-tenant authority flag</strong> — a single configuration says which side is the system of record; the pipeline direction follows it.</li>
            <li><strong>Client on-premises systems</strong> that still integrate: give them stable APIs or event feeds from the SaaS, and a hybrid connector or gateway for on-premises access.</li>
            <li><strong>Reconciliation</strong> — a scheduled job that compares counts, checksums and business totals on both sides and reports differences, so silent drift is found early.</li>
            <li><strong>Monitoring</strong> — replication lag, dead-letter depth, apply error rate and reconciliation differences, with alerts.</li>
            <li><strong>Schema changes</strong> — version the mapping and change both sides in a controlled order (expand, then contract) so the pipeline never breaks on a new column.</li>
          </ul></div>

          <div class="ans-block"><div class="ans-label">In code — idempotent apply with an id map and a version guard</div>
          <div class="code-box">public async Task ApplyAsync(ChangeEvent e, CancellationToken ct)
{
    if (await _applied.ExistsAsync(e.EventId, ct)) return;          // already applied: skip (idempotent)

    var saasId = await _idMap.GetOrCreateAsync(e.Tenant, e.Entity, e.SourceId, ct);   // legacy id -&gt; saas id

    await using var tx = await _db.BeginTransactionAsync(ct);
    var current = await _repo.GetVersionAsync(e.Tenant, saasId, ct);
    if (current is null || current &lt; e.Version)                      // never apply an older change over a newer one
        await _repo.UpsertAsync(_mapper.ToTarget(e), ct);

    await _applied.MarkAsync(e.EventId, ct);                        // record in the SAME transaction
    await tx.CommitAsync(ct);
}</div></div>

          <div class="tip-box">✅ Interview line: "I synchronise with log-based change data capture into a durable stream, partitioned so each key stays ordered, and apply changes idempotently with an id map and a version guard. I make each tenant single-writer — legacy before cutover, SaaS after — so there are no conflicts to resolve, and I run reconciliation and lag alerts to catch drift." Related page: Event-Driven and Messaging.</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q4</div>
      <div class="qa-body">
        <div class="qa-question">How do we ensure data consistency, tenant isolation, minimal downtime and a safe cutover between legacy and SaaS systems?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — four goals, each with its own mechanism</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2.8fr;"><div>Goal</div><div>Mechanism</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Data consistency</div><div>Single writer per tenant; ordered, idempotent change capture; parity validation gates; a write freeze for the final delta</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Tenant isolation</div><div>Isolation built into the data model and platform, tested explicitly, and kept intact during the migration itself</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Minimal downtime</div><div>Online migration with change capture, so the only outage is the short final freeze, in a quiet window</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2.8fr;"><div class="dt-name">Safe cutover</div><div>A rehearsed runbook, explicit go and no-go criteria, a rollback decision point, and hypercare with reverse sync</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Data consistency</div>
          <ul>
            <li><strong>One writer per tenant at a time</strong> — flipped deliberately at cutover.</li>
            <li><strong>Ordering and idempotency</strong> — changes per key apply in order; applying one twice changes nothing.</li>
            <li><strong>Parity gates</strong> — counts, checksums and business totals must match before the go decision (see Q2).</li>
            <li><strong>Freeze for the final delta</strong> — a brief moment with no writes, so the last changes can be drained and verified.</li>
            <li><strong>Post-cutover verification</strong> — repeat the checks on the live SaaS data and keep monitoring.</li>
          </ul></div>

          <div class="ans-block"><div class="ans-label">Tenant isolation — in the platform and during the migration</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Layer</div><div>Control</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Data</div><div>Database or schema per tenant, or tenant id with row-level security enforced by the database; the application role cannot bypass it</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Identity and access</div><div>Tenant claim in every token; authorisation always evaluated against the tenant context</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Encryption</div><div>Per-tenant keys in Key Vault where required, so one tenant's key cannot decrypt another's data</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Caches and queues</div><div>Tenant id in every cache key and message; never a shared key without it</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Files and blobs</div><div>Tenant-specific containers or prefixes with scoped access tokens</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Logs and telemetry</div><div>Tenant id on every entry; access to logs limited by tenant</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Resource governance</div><div>Per-tenant rate limits and quotas against noisy neighbours</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">During migration</div><div>Migrate one tenant at a time; stage data with a tenant id; use a distinct id mapping per tenant because legacy installs had overlapping ids; check afterwards that no row references another tenant</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Verification</div><div>Automated cross-tenant tests: tenant A must never read, update or even detect tenant B's data, including through search, exports and error messages</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Minimal downtime — how the freeze is kept short</div>
          <div class="code-box">Hours or days before:   initial load + change capture running; lag near zero
                        client acceptance testing on the SaaS copy; rehearsal completed
Cutover window:        pick the client's quietest period; communicate in advance
                        pre-warm the SaaS: scale up, warm caches, verify connections
Freeze starts:         legacy goes read-only (or maintenance page); drain in-flight work
Final delta:           wait until change-capture lag is zero; apply the last changes
Check:                 run parity checks (counts, checksums, business totals)
Switch:                point traffic to the SaaS tenant (DNS, gateway rule or feature flag)
Smoke tests:           key journeys, integrations, reports; the writer flag is now SaaS
Freeze ends:           SaaS accepts writes; reverse capture is running

Typical outage = the freeze duration only (minutes), because everything else happened beforehand.</div></div>

          <div class="ans-block"><div class="ans-label">Safe cutover — go / no-go criteria and the runbook</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Gate</div><div>Condition to proceed</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Parity</div><div>All validation checks match; reconciliation differences are zero or explained and accepted</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Replication health</div><div>Lag near zero; dead-letter store empty or understood</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Acceptance</div><div>Client has signed off their key workflows and reports on the SaaS</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Performance and capacity</div><div>Load tested for the tenant's real volume; capacity pre-provisioned</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Rollback readiness</div><div>Reverse sync tested; rollback steps rehearsed; owners named</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">People and communication</div><div>Support on standby, client informed, status channel ready, decision maker available</div></div>
          </div>
          <div class="code-box">Rollback triggers (agree BEFORE the cutover, with a time-box):
  data discrepancy above the threshold · critical workflow failing · error rate or latency above the limit ·
  security or isolation incident · integration with a client system broken with no quick fix
If a trigger fires within the decision window: roll back (Q5 and Q6). Otherwise: forward-fix.</div></div>

          <div class="tip-box">✅ Interview line: "Consistency comes from a single writer per tenant plus ordered, idempotent capture and parity gates; isolation is built into the platform, tested with cross-tenant tests, and preserved during the migration; downtime is just the final freeze because everything else is done online beforehand; and the cutover is a rehearsed runbook with explicit go and no-go criteria and a rollback decision point."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q5</div>
      <div class="qa-body">
        <div class="qa-question">What happens to data if we need to roll back from SaaS to the legacy on-premises application?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">The problem in one sentence</div>
          After cutover, users create and change data in the SaaS. If we then go back to the legacy system and do nothing, everything written since cutover is missing from legacy — that is data loss. So the rollback plan must carry those changes back, or accept and manage the loss deliberately.</div>

          <div class="ans-block"><div class="ans-label">The data fate depends on WHEN the rollback happens</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div>When</div><div>What is in the SaaS that legacy does not have</div><div>What to do</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">Before cutover</div><div>Nothing — legacy is still the system of record and the SaaS is only a replica</div><div class="dt-yes">Stop the pipeline; no data issue</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">After cutover, inside the rollback window</div><div>New and changed records written by users since cutover</div><div>Reverse sync keeps legacy current, so legacy already holds them; drain it and switch back (Q6)</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.6fr;"><div class="dt-name">After the window closes</div><div>Everything, plus SaaS-only features and data shapes</div><div class="dt-no">Rollback is no longer supported; fix forward</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">Options when something goes wrong after cutover</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1fr 2fr 1.6fr;"><div>Option</div><div>How it works</div><div>Data risk</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2fr 1.6fr;"><div class="dt-name">A. Fix forward</div><div>Correct the SaaS defect, keep the SaaS as system of record</div><div class="dt-yes">Lowest — preferred when the problem is fixable quickly</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2fr 1.6fr;"><div class="dt-name">B. Roll back with reverse sync</div><div>Legacy was kept current by reverse capture; freeze, drain, reconcile, switch back</div><div>Low if reverse sync was running from the moment of cutover</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2fr 1.6fr;"><div class="dt-name">C. Roll back and replay</div><div>Switch back to a snapshot, then re-enter or replay the changes made since from the event log or request log</div><div>Medium — depends on how complete and replayable the logs are</div></div>
            <div class="dt-row" style="grid-template-columns:1fr 2fr 1.6fr;"><div class="dt-name">D. Roll back and accept loss</div><div>Return to legacy as it was at the last sync</div><div class="dt-no">High — only a deliberate business decision for a very short window</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">What makes a rollback possible at all — decide these BEFORE cutover</div>
          <ul>
            <li><strong>Reverse change capture starts at cutover (or earlier, in shadow mode)</strong> so there is no gap in which SaaS writes are not recorded.</li>
            <li><strong>Compatibility mode during the window</strong> — the SaaS writes only data legacy can represent. New SaaS-only fields, features and schema changes wait until the window closes, otherwise they have nowhere to go on rollback.</li>
            <li><strong>A defined rollback window</strong> with an end date (the point of no return), and criteria for using it (Q4).</li>
            <li><strong>Legacy kept running but read-only</strong> and fed by reverse sync, with its sequences and identities kept ahead of anything SaaS created.</li>
            <li><strong>Preserve the SaaS data</strong> — snapshot or archive the SaaS tenant before switching back, so the work can be re-migrated later.</li>
            <li><strong>Side effects cannot be rolled back</strong> — emails sent, payments taken, external calls made. Record them and compensate manually or with a process.</li>
          </ul></div>

          <div class="warn-box">⚠️ A rollback plan that was never tested is not a plan. Rehearse the reverse path — capture, apply, freeze, reconcile, switch — in the same dry run as the forward migration.</div>
          <div class="tip-box">✅ Interview line: "If we roll back after cutover, the data written in the SaaS must come with us. So reverse change capture runs from the moment of cutover, the SaaS operates in a legacy-compatible mode during the rollback window, and the window has a defined end. Inside it, rollback is freeze, drain the reverse pipeline, reconcile and switch back; after it, we fix forward."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q6</div>
      <div class="qa-body">
        <div class="qa-question">How do we synchronise SaaS data back to the legacy database during rollback without losing transactions or updates?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — capture every SaaS change durably from the start, apply it to legacy in order and idempotently, then freeze, drain and reconcile before switching back</div></div>

          <div class="ans-block"><div class="ans-label">The reverse pipeline</div>
          <div class="code-box">SaaS database  (system of record after cutover)
   |  change capture  (logical decoding / CDC / outbox events) - started AT or BEFORE cutover
   v
Durable stream            partitioned by tenant + entity key; retained long enough to replay
   |
   v
Reverse transform         SaaS model -&gt; legacy schema; drop or park SaaS-only fields; map ids back
   |
   v
Idempotent apply to legacy   through the legacy application's own rules where possible
   |   failures
   v
Retry -&gt; dead-letter -&gt; replay tool -&gt; alert

Position checkpoint (log position) is stored so the pipeline can resume exactly where it stopped.</div></div>

          <div class="ans-block"><div class="ans-label">Why nothing is lost</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Risk</div><div>Protection</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Changes made before capture started</div><div>Start reverse capture BEFORE or AT cutover, not after the first problem appears</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">A crash or restart in the pipeline</div><div>Durable log plus a stored position; at-least-once delivery with idempotent apply</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Out-of-order delivery</div><div>Partition by entity key; version or log-position guard so an older change never overwrites a newer one</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">The legacy database being unavailable</div><div>Buffer in the stream and pause the applier; replay when it returns</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Writes still arriving during the switch-back</div><div>Freeze SaaS writes first, then drain to zero lag</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Silent drift</div><div>Reconciliation of counts, checksums and business totals before the switch</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Identity values clashing</div><div>Advance legacy sequences and identity columns past any value the SaaS created, and keep the id map</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">The rollback procedure</div>
          <div class="code-box">1  DECIDE      rollback criteria met inside the window; decision maker approves
2  FREEZE      put the SaaS tenant in maintenance or read-only mode (no new writes)
3  DRAIN       wait until reverse-sync lag is zero; empty or resolve the dead-letter store
4  RECONCILE   counts, checksums and business totals: SaaS versus legacy; resolve any difference
5  SNAPSHOT    archive the SaaS tenant data (so it can be re-migrated later)
6  VERIFY      smoke-test legacy with the synchronised data; advance sequences
7  SWITCH      point traffic back to legacy; the writer flag becomes Legacy
8  COMMUNICATE tell the client; record what happened and why
9  AFTERWARDS  fix the cause, rehearse again, schedule a new cutover</div></div>

          <div class="ans-block"><div class="ans-label">In code — idempotent upsert into the legacy database</div>
          <div class="code-box">-- SQL Server shown (use INSERT ... ON CONFLICT in PostgreSQL). Safe to run twice.
MERGE dbo.Orders AS t
USING (SELECT @LegacyId AS Id, @Amount AS Amount, @Status AS Status, @Version AS Version) AS s
   ON t.Id = s.Id
WHEN MATCHED AND t.SyncVersion &lt; s.Version                -- apply only if newer
     THEN UPDATE SET Amount = s.Amount, Status = s.Status, SyncVersion = s.Version
WHEN NOT MATCHED
     THEN INSERT (Id, Amount, Status, SyncVersion) VALUES (s.Id, s.Amount, s.Status, s.Version);

-- and record the processed event id in the same transaction so a replay is skipped:
INSERT INTO dbo.SyncLog (EventId, AppliedAt) VALUES (@EventId, SYSUTCDATETIME());   -- EventId is the primary key</div></div>

          <div class="warn-box">⚠️ Prefer applying changes through the legacy application's own business logic or stored procedures where practical, so legacy triggers, validations and derived data stay correct. Writing straight into tables is faster but can bypass rules the legacy system depends on.</div>
          <div class="tip-box">✅ Interview line: "The reverse path is the forward path mirrored: capture every SaaS change from the moment of cutover into a durable log, transform it back to the legacy schema, and apply it idempotently with a version guard. To roll back we freeze SaaS writes, drain the pipeline to zero lag, reconcile, advance the identity sequences and switch traffic — so no committed transaction is lost."</div>
        </div>
      </div>
    </div>

    <div class="qa-card">
      <div class="qa-num">Q7</div>
      <div class="qa-body">
        <div class="qa-question">How do we handle schema differences, data conflicts, duplicate records and synchronisation failures during rollback?</div>
        <div class="qa-answer">
          <div class="ans-block"><div class="ans-label">Short answer — a versioned mapping layer for schema differences, a single-writer rule plus detection for conflicts, id maps and idempotent keys for duplicates, and a dead-letter, replay and reconciliation process for failures</div></div>

          <div class="ans-block"><div class="ans-label">1. Schema differences</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Difference</div><div>How to handle it</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Tenant column</div><div>The SaaS has a tenant id the legacy does not — drop it on the way back (one tenant per legacy database) and add it on the way in</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Identifiers</div><div>Legacy integers or identity values versus SaaS GUIDs — keep a permanent id mapping table in both directions</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Data types</div><div>Decimal precision, string length, date and time zone (store UTC in SaaS, convert for legacy), enumerations versus code tables, encodings</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">SaaS-only fields</div><div>Nowhere to go in legacy: park in an extension table or an overflow column, or drop with a logged report — and restrict new SaaS-only fields during the rollback window</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Structure</div><div>Different normalisation: split or merge tables in the transform; keep the mapping rules in code and documented</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Deletes</div><div>Soft delete in SaaS versus hard delete in legacy — decide and implement one rule per entity</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Business rules</div><div>Triggers and validations in legacy — apply through the legacy application or procedures where practical</div></div>
          </div>
          <div class="tip-box">✅ Keep the mapping in ONE versioned layer (an anti-corruption layer or canonical model) used by migration, forward sync and reverse sync, so the three never drift apart.</div></div>

          <div class="ans-block"><div class="ans-label">2. Data conflicts</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Strategy</div><div>How it works</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Prevent them</div><div>Single writer per tenant: during rollback the SaaS is frozen before legacy takes over, so the two never accept writes at the same time</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Detect them</div><div>Every record carries a version or row-version; a change whose base version no longer matches is flagged as a conflict instead of being applied blindly</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Resolve by rule</div><div>The designated system of record wins; or field-level merge for independent fields; or last-writer-wins only for low-value data and only with an audit trail</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Review queue</div><div>Anything that cannot be resolved by rule goes to a human review queue with both versions shown, and is logged</div></div>
          </div></div>

          <div class="ans-block"><div class="ans-label">3. Duplicate records</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.1fr 2.6fr;"><div>Source of duplicates</div><div>Prevention</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Replayed or retried changes</div><div>Idempotent apply: unique event id recorded in the same transaction; upsert by key, never a blind insert</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">The same business entity created on both sides</div><div>An id mapping table plus a business key with a unique constraint; match on the business key before inserting</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Pre-existing duplicates in legacy data</div><div>De-duplicate before migration with exact and fuzzy matching and agreed survivorship rules (which record wins, which fields merge)</div></div>
            <div class="dt-row" style="grid-template-columns:1.1fr 2.6fr;"><div class="dt-name">Re-running a migration batch</div><div>Checkpointed, upsert-based loads so a second run produces the same result</div></div>
          </div>
          <div class="code-box">CREATE TABLE IdMap (
    Tenant      uniqueidentifier NOT NULL,
    Entity      varchar(50)      NOT NULL,
    LegacyId    bigint           NOT NULL,
    SaasId      uniqueidentifier NOT NULL,
    PRIMARY KEY (Tenant, Entity, LegacyId),
    UNIQUE      (Tenant, Entity, SaasId)
);
-- every apply looks up or creates the mapping first; the unique keys make duplicates impossible</div></div>

          <div class="ans-block"><div class="ans-label">4. Synchronisation failures</div>
          <div class="decision-table">
            <div class="dt-row dt-header" style="grid-template-columns:1.2fr 1.6fr 1.8fr;"><div>Failure</div><div>Detected by</div><div>Response</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.8fr;"><div class="dt-name">Legacy database unavailable</div><div>Apply errors, rising lag</div><div>Circuit breaker pauses the applier; events wait in the stream; resume and replay</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.8fr;"><div class="dt-name">A poison message (bad data, mapping gap)</div><div>Repeated failures on one event</div><div>Move to the dead-letter store after a retry limit so it does not block the partition; alert; fix the mapping; replay</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.8fr;"><div class="dt-name">Constraint violation in legacy</div><div>Apply error</div><div>Dead-letter with the reason; resolve data or rule; replay</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.8fr;"><div class="dt-name">Pipeline or broker outage</div><div>Capture lag, health checks</div><div>Resume from the stored log position; the source log retention must outlast the outage</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.8fr;"><div class="dt-name">Partial failure inside a multi-table change</div><div>Reconciliation difference</div><div>Apply each logical change in one transaction; if impossible, a repair job re-derives the entity from the source</div></div>
            <div class="dt-row" style="grid-template-columns:1.2fr 1.6fr 1.8fr;"><div class="dt-name">Silent drift</div><div>Scheduled reconciliation</div><div>Diff report; repair job; fix the cause so it does not recur</div></div>
          </div>
          <div class="code-box">Failure-handling toolkit
  retry with backoff and jitter -&gt; dead-letter store -&gt; replay tool (re-queue after the fix)
  idempotent apply so a replay is always safe
  alerts on: lag, dead-letter depth, apply error rate, reconciliation difference
  runbook for each failure above, and a named owner
  reconciliation job: counts + checksums + business totals, per tenant, on a schedule</div></div>

          <div class="tip-box">✅ Interview line: "Schema differences are absorbed by one versioned mapping layer with a permanent id map; conflicts are prevented by the single-writer rule and detected with version checks if they ever occur; duplicates are prevented with idempotent event ids and unique business keys; and failures go to retry, a dead-letter store and a replay tool, with scheduled reconciliation to catch silent drift."</div>
        </div>
      </div>
    </div>

  </div>
`;
