window.Pages['ref-ui-frameworks'] = `
<div class="page-header">
  <div class="breadcrumb">Deep Dive › <span>UI Frameworks</span></div>
  <h1>🎨 Angular &amp; React — Deep Dive</h1>
  <p>Architecture · Component Model · State · Routing · Forms · Performance · Angular vs React · Interview Q&amp;A</p>
</div>

<div class="ref-section">
  <div class="ref-title">Angular vs React — Head-to-Head</div>
  <div class="ref-body">
    <div class="pattern-table">
      <div class="pt-row pt-header"><div>Factor</div><div>Angular</div><div>React</div></div>
      <div class="pt-row"><div class="pt-name">Type</div><div>Full framework (opinionated)</div><div>UI library (unopinionated — you choose ecosystem)</div></div>
      <div class="pt-row"><div class="pt-name">Language</div><div>TypeScript (mandatory)</div><div>JavaScript or TypeScript (optional)</div></div>
      <div class="pt-row"><div class="pt-name">Component Model</div><div>Class-based + decorators (@Component, @Injectable)</div><div>Function components + hooks (useState, useEffect)</div></div>
      <div class="pt-row"><div class="pt-name">Data Binding</div><div>Two-way [(ngModel)], one-way [prop], event (event)</div><div>One-way (props down, events up). No built-in two-way.</div></div>
      <div class="pt-row"><div class="pt-name">State Management</div><div>Services + RxJS (built-in). NgRx for Redux pattern.</div><div>useState/useReducer/Context (built-in). Redux/Zustand/Jotai.</div></div>
      <div class="pt-row"><div class="pt-name">Routing</div><div>@angular/router (built-in, lazy loading, guards)</div><div>React Router (3rd party)</div></div>
      <div class="pt-row"><div class="pt-name">Forms</div><div>Template-driven + Reactive Forms (FormBuilder, validators)</div><div>Controlled components + libraries (React Hook Form, Formik)</div></div>
      <div class="pt-row"><div class="pt-name">DI</div><div>Built-in Dependency Injection container</div><div>No built-in DI. Context API or manual.</div></div>
      <div class="pt-row"><div class="pt-name">Rendering</div><div>Ivy engine. Zone.js change detection (transitioning to signals)</div><div>Virtual DOM diffing. Concurrent mode (React 18+)</div></div>
      <div class="pt-row"><div class="pt-name">Learning Curve</div><div>Steep — many concepts upfront (modules, DI, RxJS, decorators)</div><div>Gentle start, complex at scale (state management choices)</div></div>
      <div class="pt-row"><div class="pt-name">Bundle Size</div><div>Larger baseline (~130KB min)</div><div>Smaller baseline (~40KB min)</div></div>
      <div class="pt-row"><div class="pt-name">Use Cases</div><div>Enterprise apps, large teams, long-lived codebases</div><div>SPAs, startups, flexible ecosystem, React Native mobile</div></div>
    </div>
    <div class="tip-box">✅ Neither is "better" — Angular = batteries included, consistent, enterprise. React = flexible, large ecosystem, faster to prototype. Choose based on team, scale, and longevity.</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Angular — Core Architecture</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Component Anatomy</div>
        <div class="code-box">// order-list.component.ts
@Component({
  selector: 'app-order-list',
  standalone: true,           // Angular 17+ standalone
  imports: [CommonModule, RouterModule],
  template: \`
    &lt;div *ngFor="let order of orders$ | async"&gt;
      &lt;app-order-card [order]="order"
        (statusChange)="onStatusChange($event)"&gt;
      &lt;/app-order-card&gt;
    &lt;/div&gt;
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders$: Observable&lt;Order[]&gt;;

  // Inject service — DI
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orders$ = this.orderService.getOrders();
  }

  onStatusChange(event: StatusChangeEvent) {
    this.orderService.updateStatus(event.id, event.status)
      .subscribe();
  }
}</div>
        <div class="ans-label" style="margin-top:10px;">Angular Signals (v17+)</div>
        <div class="code-box">// Signals replace Zone.js change detection
export class OrderComponent {
  // Signal: reactive primitive
  count = signal(0);
  orders = signal&lt;Order[]&gt;([]);

  // Computed: derived signal (memoised)
  totalValue = computed(() =>
    this.orders().reduce((s, o) => s + o.total, 0));

  // Effect: side-effect on signal change
  constructor() {
    effect(() => {
      console.log('Orders changed:', this.orders().length);
    });
  }

  addOrder(order: Order) {
    this.orders.update(orders => [...orders, order]);
  }
}</div>
      </div>
      <div>
        <div class="ans-label">Services &amp; Dependency Injection</div>
        <div class="code-box">// order.service.ts
@Injectable({ providedIn: 'root' }) // Singleton
export class OrderService {
  private http = inject(HttpClient);  // functional DI (v14+)
  private apiUrl = inject(API_URL);   // injection token

  getOrders(): Observable&lt;Order[]&gt; {
    return this.http.get&lt;Order[]&gt;(\`\${this.apiUrl}/orders\`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(() => new Error(err.message));
  }
}

// DI Scopes:
// providedIn: 'root'     → singleton (app-wide)
// providedIn: 'any'      → one per lazy module
// component providers:[] → one per component instance</div>
        <div class="ans-label" style="margin-top:10px;">Routing &amp; Guards</div>
        <div class="code-box">// app.routes.ts (standalone)
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'orders',
    canActivate: [authGuard],   // functional guard
    loadChildren: () =>         // lazy loading
      import('./orders/orders.routes')
        .then(m => m.ORDER_ROUTES)
  },
  { path: '**', redirectTo: '' }
];

// Functional guard (Angular 15+)
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login'],
    { queryParams: { returnUrl: state.url } });
};</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">RxJS — Reactive Patterns</div>
    <div class="code-box">// Common RxJS operators used in Angular:
this.searchControl.valueChanges.pipe(
  debounceTime(300),        // wait 300ms after last keystroke
  distinctUntilChanged(),   // only if value actually changed
  switchMap(term =>         // cancel previous, start new request
    this.searchService.search(term).pipe(
      catchError(() => of([]))  // don't break on error
    )
  ),
  takeUntilDestroyed()      // auto-unsubscribe (Angular 16+)
).subscribe(results => this.results = results);

// Common operators:
// map, filter, switchMap (cancel prev), mergeMap (parallel),
// concatMap (ordered), combineLatest (zip signals), forkJoin (parallel + complete)</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">React — Core Architecture</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Hooks — useState, useEffect, useCallback</div>
        <div class="code-box">// OrderList.tsx
export function OrderList() {
  const [orders, setOrders]   = useState&lt;Order[]&gt;([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState&lt;string | null&gt;(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchOrders()
      .then(data => {
        if (!cancelled) {
          setOrders(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    // Cleanup — cancel on unmount
    return () => { cancelled = true; };
  }, []); // [] = run once on mount

  // Memoize callback (stable reference for child props)
  const handleStatusChange = useCallback((id: string, status: string) => {
    setOrders(prev =>
      prev.map(o => o.id === id ? { ...o, status } : o));
  }, []);

  if (loading) return &lt;Spinner /&gt;;
  if (error)   return &lt;Error message={error} /&gt;;
  return &lt;OrderGrid orders={orders} onStatusChange={handleStatusChange} /&gt;;
}</div>
      </div>
      <div>
        <div class="ans-label">Custom Hooks — Reusable Logic</div>
        <div class="code-box">// useOrders.ts — extract data-fetching logic
function useOrders(filter?: string) {
  const [orders, setOrders]   = useState&lt;Order[]&gt;([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState&lt;Error | null&gt;(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(\`/api/orders?\${filter}\`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => { setOrders(data); setLoading(false); })
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      });

    return () => controller.abort();
  }, [filter]);

  return { orders, loading, error };
}

// Usage in any component:
function MyComponent() {
  const { orders, loading } = useOrders('status=pending');
  ...
}</div>
        <div class="ans-label" style="margin-top:10px;">Performance — useMemo, React.memo</div>
        <div class="code-box">// useMemo — memoize expensive computation
const sortedOrders = useMemo(() =>
  [...orders].sort((a, b) => b.total - a.total),
  [orders]  // only recompute when orders changes
);

// React.memo — skip re-render if props unchanged
const OrderCard = React.memo(({ order, onClick }) => {
  return &lt;div onClick={() => onClick(order.id)}&gt;...&lt;/div&gt;;
});

// useRef — mutable ref, not tracked by React
const inputRef = useRef&lt;HTMLInputElement&gt;(null);
inputRef.current?.focus();

// When to avoid memo:
// Cheap components — memoization adds overhead.
// When props change on every render anyway.</div>
      </div>
    </div>
    <div class="ans-label" style="margin-top:14px;">State Management — Context, Redux, Zustand</div>
    <div class="code-box">Context API (built-in — for low-frequency updates, theme/auth):
  const AuthContext = createContext&lt;AuthState | null&gt;(null);
  export const useAuth = () => useContext(AuthContext)!;
  // Wrap app: &lt;AuthContext.Provider value={authState}&gt;&lt;App /&gt;&lt;/AuthContext.Provider&gt;
  // ⚠️ Context re-renders ALL consumers on every update — not for high-frequency state.

Zustand (simple, lightweight, modern — recommended for most apps):
  const useOrderStore = create&lt;OrderStore&gt;((set, get) => ({
    orders: [],
    loading: false,
    fetchOrders: async () => {
      set({ loading: true });
      const orders = await api.getOrders();
      set({ orders, loading: false });
    },
    updateStatus: (id, status) =>
      set(state => ({
        orders: state.orders.map(o => o.id === id ? {...o, status} : o)
      }))
  }));
  // Usage: const { orders, fetchOrders } = useOrderStore();

Redux Toolkit (RTK — for large apps, complex state, time-travel debug):
  const ordersSlice = createSlice({
    name: 'orders',
    initialState: { list: [], status: 'idle' },
    reducers: {
      orderUpdated: (state, action) => {
        const idx = state.list.findIndex(o => o.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload; // Immer handles immutability
      }
    },
    extraReducers: builder =>
      builder
        .addCase(fetchOrders.pending,  state => { state.status = 'loading'; })
        .addCase(fetchOrders.fulfilled, (state, action) => { state.list = action.payload; state.status = 'idle'; })
  });</div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Performance Optimisation</div>
  <div class="ref-body">
    <div class="two-col">
      <div>
        <div class="ans-label">Angular Performance</div>
        <div class="code-box">OnPush Change Detection:
  Only re-renders when:
  - @Input reference changes
  - Event emitted from component
  - Observable in async pipe emits
  changeDetection: ChangeDetectionStrategy.OnPush

Lazy Loading:
  loadChildren: () => import('./orders/...')
  → splits bundle, loads on navigation only

trackBy in ngFor:
  *ngFor="let o of orders; trackBy: trackById"
  trackById = (i, o) => o.id;
  → DOM reuse on list updates (no full re-render)

Virtual Scrolling:
  &lt;cdk-virtual-scroll-viewport itemSize="50"&gt;
    &lt;div *cdkVirtualFor="let o of orders"&gt;...
  → only renders visible items (10,000 rows = fast)

Standalone components (v17+):
  No NgModules overhead.
  Tree-shakeable: unused components excluded from bundle.</div>
      </div>
      <div>
        <div class="ans-label">React Performance</div>
        <div class="code-box">Code Splitting + Lazy:
  const OrderPage = lazy(() => import('./OrderPage'));
  &lt;Suspense fallback={&lt;Spinner /&gt;}&gt;
    &lt;OrderPage /&gt;
  &lt;/Suspense&gt;

React.memo + useCallback + useMemo:
  Prevent unnecessary child re-renders.
  Memoize expensive computed values.

React 18 — Concurrent Mode:
  useTransition: mark non-urgent updates.
  const [isPending, startTransition] = useTransition();
  startTransition(() => setFilter(value));  // doesn't block UI

  useDeferredValue: defer expensive renders.
  const deferred = useDeferredValue(searchTerm);

Virtualisation:
  react-window / tanstack-virtual
  → Only render visible rows in large lists.

Bundle:
  Next.js: automatic code splitting per route.
  Tree-shaking: only import what you use.
  Image optimisation: next/image (lazy, WebP, resize).</div>
      </div>
    </div>
  </div>
</div>

<div class="ref-section">
  <div class="ref-title">Key Interview Questions</div>
  <div class="ref-body">
    <div class="code-box">Q: Angular change detection — how does it work?
A: Angular's default change detection checks the entire component tree on every browser event (clicks,
   timers, HTTP responses) via Zone.js. OnPush restricts this — component only checked when its
   @Input reference changes, an event fires from within it, or an async pipe emits. Signals (v17+)
   replace Zone.js with fine-grained reactive tracking — only components that read a changed signal re-render.

Q: React — what causes re-renders?
A: State change (setState), prop change from parent, context value change.
   React re-renders a component and all its children by default.
   Prevent with: React.memo (skip if props unchanged), useMemo (memoize computed values),
   useCallback (stable function references). useTransition defers non-urgent updates.

Q: Angular vs React for large enterprise app?
A: Angular: consistent structure, mandatory TypeScript, built-in DI, routing, forms — reduces
   decision fatigue in large teams. React: more flexible, huge ecosystem, easier to integrate
   incrementally. I'd choose Angular for a 20-developer greenfield enterprise app needing
   long-term consistency, React for a product team needing rapid iteration and flexibility.

Q: How do you handle memory leaks in Angular?
A: Unsubscribe from Observables — use takeUntilDestroyed(), async pipe (auto-unsubscribes),
   or explicit takeUntil with a Subject. Detach event listeners in ngOnDestroy.
   With Signals — no subscription management needed.

Q: React hooks rules?
A: Only call hooks at top level (not in loops/conditions). Only call from function components
   or custom hooks. Reason: React relies on call order to track hook state across renders.</div>
  </div>
</div>
`;
