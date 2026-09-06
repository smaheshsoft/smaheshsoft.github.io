window.Pages['ref-cohesion'] = `
<div class="page-header">
  <div class="breadcrumb">Architecture › <span>Cohesion Types</span></div>
  <h1>🔗 The Seven Types of Cohesion</h1>
  <p>From accidental grouping to a single well-defined purpose — with a worked C# example at every level</p>
</div>

<div class="ref-section">
  <div class="ref-title">The Scale — Worst To Best</div>
  <div class="ref-body">
    <p>Cohesion is how strongly the responsibilities <em>inside one module</em> relate to each other. It runs on a scale from worst (accidental grouping) to best (one true purpose). Structured design named seven levels — knowing where your own code sits on this scale is the actual skill.</p>
    <div class="code-box">WORST ─────────────────────────────────────────────────────────► BEST

Coincidental → Logical → Temporal → Procedural → Communicational → Sequential → Functional

     ↑ grouped by accident              grouped by                    grouped by ONE
       or convenience                   real workflow                 well-defined purpose</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">The Seven Types</div>
  <div class="ref-body">
    <div class="decision-table">
      <div class="dt-row dt-header" style="grid-template-columns:1.3fr 1.7fr;">
        <div>Type</div><div>What it means</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
        <div class="dt-name">1. Coincidental</div><div>Elements grouped with NO meaningful relationship — pure convenience or accident. The worst kind.</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
        <div class="dt-name">2. Logical</div><div>Elements grouped because they fall in the same LOGICAL category, but do different things — a caller picks which one to run via a flag</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
        <div class="dt-name">3. Temporal</div><div>Elements grouped because they happen at the same TIME — e.g. "everything that runs at startup"</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
        <div class="dt-name">4. Procedural</div><div>Elements grouped because they follow a certain ORDER of execution, even if they don't share data</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
        <div class="dt-name">5. Communicational</div><div>Elements grouped because they operate on the SAME DATA — e.g. all functions reading/writing one record</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
        <div class="dt-name">6. Sequential</div><div>Output of one element feeds directly as INPUT to the next — a real pipeline, in order, on shared data</div>
      </div>
      <div class="dt-row" style="grid-template-columns:1.3fr 1.7fr;">
        <div class="dt-name">7. Functional</div><div class="dt-yes">Every element contributes to ONE single, well-defined task. Nothing extra, nothing unrelated. The goal.</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">In Code — Worst To Best</div>
  <div class="ref-body">
    <div class="code-box">// 1. COINCIDENTAL — genuinely no relationship. This actually happens
//    in real "Utils" or "Helpers" classes that grow without discipline.
public class Utils
{
    public static string FormatDate(DateTime d) { ... }
    public static decimal CalculateTax(decimal amount) { ... }
    public static void SendEmail(string to, string body) { ... }
    public static bool IsPrime(int n) { ... }
}

// 2. LOGICAL — same category, different behaviour picked by a flag
public class InputHandler
{
    public void Handle(string source, InputType type)
    {
        if (type == InputType.Keyboard) { ... }
        else if (type == InputType.Mouse) { ... }
        else if (type == InputType.Touch) { ... }
        // one method doing THREE unrelated jobs, selected by a switch
    }
}

// 3. TEMPORAL — bundled only because they all run "at startup"
public class ApplicationStartup
{
    public void Initialize()
    {
        LoadConfiguration();
        WarmUpCache();
        RegisterEventHandlers();
        SendStartupNotificationEmail();   // ← unrelated to the other three,
    }                                     //   just happens at the same time
}

// 4. PROCEDURAL — sequenced, but working on DIFFERENT data
public class ReportGenerator
{
    public void Run()
    {
        ValidateUserPermissions();   // works with User
        FetchSalesData();            // works with Sales
        FormatCurrency();            // works with a decimal
        // order matters, but they don't share a common data thread
    }
}

// 5. COMMUNICATIONAL — different operations, SAME underlying data
public class CustomerRecordProcessor
{
    public void Process(Customer c)
    {
        ValidateCustomer(c);
        UpdateCustomerAddress(c);
        LogCustomerAccess(c);
        // three different concerns, but all centred on the same Customer
    }
}

// 6. SEQUENTIAL — output of step N is the input to step N+1
public class OrderPipeline
{
    public Invoice Process(Order order)
    {
        var validated = Validate(order);
        var priced    = ApplyPricing(validated);
        var taxed     = ApplyTax(priced);
        return GenerateInvoice(taxed);   // each step feeds the next directly
    }
}

// 7. FUNCTIONAL — the gold standard: ONE clear purpose, nothing else
public class TaxCalculator
{
    public decimal CalculateTax(decimal amount, TaxRegion region)
        =&gt; amount * GetRate(region);
    // does exactly one job. Nothing here is unrelated to "calculating tax".
}</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Which One To Aim For — And Why It Matters In Practice</div>
  <div class="ref-body">
    <div class="code-box">AIM FOR: Functional cohesion (7), or Sequential (6) for pipeline-shaped code.

WHY LOW COHESION HURTS
  Coincidental/Logical/Temporal classes have MULTIPLE reasons to change
  → directly violates Single Responsibility Principle
  → a change for one reason risks breaking an unrelated reason
  → hard to name well ("Utils", "Manager", "Helper" are cohesion red flags)
  → hard to test in isolation, hard to reuse without dragging in the rest

WHY HIGH COHESION HELPS
  One clear purpose → one clear name → one reason to change
  → easy to unit test, easy to reuse, easy to reason about
  → naturally leads to LOW COUPLING too, because a focused class
    needs fewer, more specific collaborators</div>
    <div class="warn-box">⚠️ The interview trap: cohesion and SRP measure the SAME idea from two angles. Low cohesion is not a separate defect from an SRP violation — it is the symptom you can literally see. If you find yourself struggling to name a class without using "and" or "Manager"/"Utils"/"Helper", that is low cohesion talking.</div>
    <div class="tip-box">✅ Closing line: "I use the cohesion scale as a quick smell test, not just theory — if a class only has a fuzzy connective ('these all run at startup', 'these are all about users') rather than one real purpose, I know it will accumulate unrelated changes over time. I actively refactor toward functional or sequential cohesion, because that is also what makes SOLID's Single Responsibility Principle concrete instead of abstract."</div>
  </div>
</div>
`;
