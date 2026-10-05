window.Pages['ref-db-first-code-first'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>DB First vs Code First &amp; EDMX</span></div>
  <h1>🗄️ DB First vs Code First — And How EDMX Differs From Modern EF</h1>
  <p>Two workflows for the same problem — where the schema's source of truth lives — plus what EF Core actually removed</p>
</div>

<div class="ref-section">
  <div class="ref-title">At A Glance</div>
  <div class="ref-body">
    <div class="flow-box">
      <div class="flow-step">Code First: C# classes are the source of truth</div>
      <div class="flow-arrow">vs</div>
      <div class="flow-step blue">DB First: the database schema is the source of truth</div>
    </div>
    <div class="principle-grid">
      <div class="principle-card"><div class="principle-icon">💻</div><div class="principle-name">Code First</div><p>Write C# entity classes → migrations generate/evolve the schema</p></div>
      <div class="principle-card"><div class="principle-icon">🗄️</div><div class="principle-name">DB First</div><p>Database already exists → scaffold C# classes FROM it</p></div>
      <div class="principle-card"><div class="principle-icon">📄</div><div class="principle-name">EDMX (EF6 era)</div><p>A visual XML model + designer — removed entirely in EF Core</p></div>
      <div class="principle-card"><div class="principle-icon">⚙️</div><div class="principle-name">Scaffold-DbContext (EF Core)</div><p>DB First today — generates plain C# POCOs, no XML, no designer</p></div>
    </div>
    <div class="tip-box">✅ Interview framing: "Neither is universally better — the question is which direction owns the schema. Code First when the team should evolve the schema through reviewable migrations; DB First when the database already exists and isn't yours to redesign. EDMX is a separate, now-dead question — EF Core removed the visual designer entirely, DB First today means Scaffold-DbContext generating plain C#."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Workflow Diagram — Code First</div>
  <div class="ref-body">
    <div class="code-box">Developer writes C# entity classes
          │
          ▼
dotnet ef migrations add InitialCreate
          │  (EF Core diffs your model against the last migration
          │   snapshot, generates a C# migration file)
          ▼
Migration file reviewed in a PR — plain C#, diffs cleanly in git
          │
          ▼
dotnet ef database update
          │  (applies the migration — CREATE/ALTER TABLE statements
          │   run against the actual database)
          ▼
Database schema now matches the C# model</div>
    <div class="ans-block"><div class="ans-label">In code — Code First entity + migration</div>
    <div class="code-box">public class Order
{
    public int Id { get; set; }
    public string CustomerName { get; set; }
    public decimal Total { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class AppDbContext : DbContext
{
    public DbSet&lt;Order&gt; Orders { get; set; }
}

// Terminal:
//   dotnet ef migrations add AddOrders
//   dotnet ef database update
//
// Generated migration (auto-created, reviewable, git-tracked):
public partial class AddOrders : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Orders",
            columns: table =&gt; new
            {
                Id = table.Column&lt;int&gt;(nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                CustomerName = table.Column&lt;string&gt;(nullable: true),
                Total = table.Column&lt;decimal&gt;(nullable: false),
                CreatedAt = table.Column&lt;DateTime&gt;(nullable: false)
            },
            constraints: table =&gt; table.PrimaryKey("PK_Orders", x =&gt; x.Id));
    }

    protected override void Down(MigrationBuilder migrationBuilder)
        =&gt; migrationBuilder.DropTable(name: "Orders");
}</div></div>
    <div class="tip-box">✅ Every schema change is a reviewable C# file in git — a teammate can read exactly what a PR does to the database, same as any other code change.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Workflow Diagram — DB First (Modern EF Core)</div>
  <div class="ref-body">
    <div class="code-box">Existing database (already has tables, data, maybe years old)
          │
          ▼
dotnet ef dbcontext scaffold "Server=...;Database=...;" \\
    Microsoft.EntityFrameworkCore.SqlServer -o Models
          │  (reverse-engineers the schema into C# — NO XML,
          │   NO designer — just generated .cs files)
          ▼
Generated POCO classes + a generated DbContext
          │
          ▼
Reviewed/committed like any other generated code
(usually re-run the scaffold command when the DB changes,
 rather than hand-editing the generated files)</div>
    <div class="ans-block"><div class="ans-label">In code — what Scaffold-DbContext produces</div>
    <div class="code-box">// Auto-generated by EF Core tooling from an EXISTING "Orders" table —
// nobody wrote this class by hand; it was reverse-engineered.
public partial class Order
{
    public int Id { get; set; }
    public string CustomerName { get; set; }
    public decimal Total { get; set; }
    public DateTime CreatedAt { get; set; }
}

public partial class AppDbContext : DbContext
{
    public virtual DbSet&lt;Order&gt; Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity&lt;Order&gt;(entity =&gt;
        {
            entity.Property(e =&gt; e.CustomerName).HasMaxLength(200);
            entity.Property(e =&gt; e.Total).HasColumnType("decimal(18,2)");
        });
    }
}</div></div>
    <div class="warn-box">⚠️ DB First models are typically REGENERATED (not hand-edited) when the database changes — hand-editing a scaffolded file means the next scaffold run silently overwrites your edits unless you're careful to split customizations into a partial class.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Decision Table — Which Approach Fits</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Factor</div><div>DB First</div><div>Code First</div></div>
      <div class="dt-row"><div class="dt-name">Source of truth</div><div>Database schema — models generated FROM it</div><div class="dt-yes">C# classes — schema generated FROM them via migrations</div></div>
      <div class="dt-row"><div class="dt-name">Existing/legacy databases</div><div class="dt-yes">Natural fit — reverse-engineer a schema you don't control</div><div>Awkward — reconciling migrations against a DB that already has data and history</div></div>
      <div class="dt-row"><div class="dt-name">Greenfield projects</div><div>Overkill — there's no existing schema to reverse-engineer yet</div><div class="dt-yes">Natural fit — design the model, let migrations create the schema</div></div>
      <div class="dt-row"><div class="dt-name">Version control / diffing</div><div>Generated .cs files diff reasonably, but changes come from re-running scaffold, not hand edits</div><div class="dt-yes">Migration files are small, incremental, human-authored diffs — very reviewable</div></div>
      <div class="dt-row"><div class="dt-name">Team ownership model</div><div>DBA/platform team owns schema evolution; app re-generates models after DB changes</div><div class="dt-yes">Developers own schema evolution via code, DBA reviews generated migrations/SQL</div></div>
      <div class="dt-row"><div class="dt-name">Multiple apps sharing one DB</div><div class="dt-yes">Common pattern — each app scaffolds its own view of a shared schema</div><div>Risky — two apps independently migrating the same DB can conflict badly</div></div>
      <div class="dt-row"><div class="dt-name">Rollback story</div><div>N/A — the DB's history isn't tracked by this workflow at all</div><div class="dt-yes">'dotnet ef migrations remove' / Down() methods give a scripted rollback path</div></div>
    </div>
    <div class="tip-box">✅ Interview line: "I default to Code First for a new project because migrations give a reviewable, git-tracked history of every schema change and a scripted rollback path. I reach for DB First when the database already exists, is owned by someone else (a DBA team, a legacy system, a shared platform DB), and isn't something my codebase should be driving changes to."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">EDMX vs Modern EF Core — A Separate Question, Often Conflated</div>
  <div class="ref-body">
    <div class="code-box">EDMX (Entity Framework 6 and earlier):
  • A .edmx file — an XML document describing entities, their
    mappings to tables, and relationships
  • Came with a VISUAL DESIGNER in Visual Studio — drag tables onto
    a canvas, draw relationships, right-click "Update from Database"
  • Supported THREE workflows from one tool: DB First, Model First
    (design visually, generate the DB), and Code First (added later)

EF Core (current):
  • EDMX and the visual designer were REMOVED ENTIRELY — there is
    no XML model file and no drag-and-drop canvas in EF Core, ever
  • DB First today = Scaffold-DbContext — generates plain C# POCOs
    directly, no intermediate XML representation at all
  • Code First is now the PRIMARY, most-documented workflow —
    migrations are plain C#, not XML</div>
    <div class="decision-table">
      <div class="dt-row dt-header"><div>Aspect</div><div>EDMX (EF6)</div><div>EF Core (current)</div></div>
      <div class="dt-row"><div class="dt-name">Model representation</div><div>XML (.edmx) + designer-generated .cs files</div><div class="dt-yes">Plain C# classes only — no XML at all</div></div>
      <div class="dt-row"><div class="dt-name">Visual designer</div><div>Yes — drag/drop canvas in Visual Studio</div><div class="dt-no">None — EF Core never shipped one</div></div>
      <div class="dt-row"><div class="dt-name">Diffing in PRs</div><div class="dt-no">Painful — XML diffs are unreadable, frequent merge conflicts</div><div class="dt-yes">Clean — plain C# diffs like any other code</div></div>
      <div class="dt-row"><div class="dt-name">Model First workflow</div><div>Supported — design visually, generate DB from the model</div><div class="dt-no">Not supported — EF Core is Code First or DB First only</div></div>
      <div class="dt-row"><div class="dt-name">Cross-platform (.NET Core/5+)</div><div class="dt-no">EDMX designer is Windows/Visual-Studio-only, EF6-era</div><div class="dt-yes">Fully cross-platform — CLI tooling (dotnet ef) works anywhere</div></div>
    </div>
    <div class="warn-box">⚠️ A common interview confusion: "DB First" and "EDMX" are NOT synonyms. EDMX was EF6's tooling for ALL THREE workflows (DB First, Model First, and later Code First), built around an XML file and a visual designer. EF Core kept the DB First and Code First concepts but implemented DB First completely differently (Scaffold-DbContext, plain C#, no XML, no designer) and dropped Model First entirely.</div>
    <div class="tip-box">✅ Interview line: "EDMX was a tool — an XML model plus a visual designer in EF6 that happened to support three different workflows. EF Core kept two of those workflows conceptually — Code First and DB First — but reimplemented DB First from scratch as a code-generation command with zero XML and zero visual designer. If someone says 'we use DB First,' that tells you the schema's source of truth; it says nothing about EDMX, which is specifically an EF6 relic."</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Worked Example — Migrating From DB First to Code First (A Realistic Scenario)</div>
  <div class="ref-body">
    <div class="code-box">Scenario: inherited a legacy app using DB First (DBA owns the schema),
but the team wants migrations going forward for better change review.

1. Scaffold the CURRENT database once:
   dotnet ef dbcontext scaffold "..." Microsoft.EntityFrameworkCore.SqlServer

2. Generate a migration that matches the EXISTING schema exactly,
   without actually changing anything yet:
   dotnet ef migrations add InitialBaseline

3. Mark that migration as already applied (schema already matches it):
   dotnet ef database update InitialBaseline --connection "..."
   (or use the __EFMigrationsHistory table directly to record it as applied)

4. From this point forward, schema changes go through NEW migrations —
   the team has transitioned to Code First governance without
   rebuilding the database.</div>
    <div class="tip-box">✅ Interview line: "The two approaches aren't permanently locked in — I've migrated a team FROM DB First TO Code First by scaffolding once, generating a baseline migration that matches the current schema exactly, and marking it as already-applied. From there, all new changes go through reviewable migrations, without a risky full rebuild of an existing production database."</div>
  </div>
</div>
`;
