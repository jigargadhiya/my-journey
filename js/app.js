/**
 * Jigar Gadhiya - Software Architect | Engineering Leader | Technology Consultant
 * Interactive Logic: Navigation, Modals, Search, Filtering & Architecture Visuals
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileDrawer();
  initBackgroundCanvas();
  initExpertiseFilter();
  initCaseStudyModals();
  initInsightModals();
  initCopyActions();
  initBackToTop();
  initDynamicYear();
});

/* ==========================================================================
   1. Navigation & ScrollSpy
   ========================================================================== */
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    [...navLinks, ...mobileLinks].forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   2. Mobile Drawer
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (!toggleBtn || !drawer) return;

  function toggleDrawer() {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    } else {
      drawer.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    }
  }

  toggleBtn.addEventListener('click', toggleDrawer);

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleDrawer();
    }
  });
}

/* ==========================================================================
   3. Technical Expertise Filter & Search
   ========================================================================== */
function initExpertiseFilter() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const searchInput = document.getElementById('expertise-search');
  const catCards = document.querySelectorAll('.expertise-cat-card');
  const skillTags = document.querySelectorAll('.skill-tag');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.category;

      catCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      skillTags.forEach(tag => {
        const text = tag.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          tag.style.opacity = '1';
          tag.style.borderColor = q ? 'var(--accent-primary)' : '';
        } else {
          tag.style.opacity = '0.22';
          tag.style.borderColor = '';
        }
      });
    });
  }
}

/* ==========================================================================
   4. Architecture Case Studies Modal Deep Dives (8-Point Engineering Structure)
   ========================================================================== */
const caseStudiesData = {
  'case-catena-x': {
    category: 'Decentralized Data Ecosystems & Enterprise Identity',
    title: 'Catena-X Automotive Dataspace & SSI Integration',
    content: `
      <h4>1. Business Problem</h4>
      <p>Global automotive supply chain participants needed to exchange bill-of-materials, carbon footprint and quality traceability data without transferring custody of proprietary operational databases to a single centralized cloud vendor.</p>

      <h4>2. Technical Constraints &amp; Existing Architecture</h4>
      <p>Data exchanges previously relied on fragmented point-to-point bespoke integrations with disconnected credentialing models and no cryptographic governance over participant sovereign rights. The system had to strictly comply with European Gaia-X standards and Eclipse Dataspace Components (EDC) contract negotiation protocols.</p>

      <h4>3. My Individual Role &amp; Contribution</h4>
      <p>Sr. Software Engineer &amp; Technical Lead. Led the architectural design of Keycloak OIDC SPI extensions, integrated EDC connectors, implemented verifiable credential verification pipelines, and conducted technical alignment reviews with European ecosystem stakeholders.</p>

      <h4>4. Architecture &amp; Implementation</h4>
      <pre>
[Automotive Supplier Node]                     [Automotive OEM Node]
            |                                           |
    [EDC Control Plane]  &lt;=== Contract Negotiation ===&gt;  [EDC Control Plane]
            |                                           |
    [EDC Data Plane]     &lt;=== Sovereign Data Stream ==&gt;  [EDC Data Plane]
            |                                           |
    [Keycloak SPI (OIDC)]                       [Keycloak SPI (OIDC)]
            |                                           |
    [DID-web / VC Auth]                         [DID-web / VC Auth]
            v                                           v
    [Internal Kafka Bus]                        [Enterprise Domain Services]
      </pre>
      <p>Built using Java, Spring Boot, Keycloak SPI, EDC, Docker, Kubernetes, Helm charts, and ArgoCD for predictable multi-environment deployments.</p>

      <h4>5. Key Engineering Decisions</h4>
      <ul>
        <li><strong>Hexagonal / Ports-and-Adapters Architecture:</strong> Isolated EDC protocol adapters from internal enterprise business microservices to allow protocol upgrades without touching core domain code.</li>
        <li><strong>Custom Keycloak SPIs:</strong> Implemented decentralized policy enforcement directly at the identity gateway rather than scattering token inspection across distributed backend services.</li>
        <li><strong>Kafka Event Bus:</strong> Offloaded internal synchronization and cross-component notifications asynchronously.</li>
      </ul>

      <h4>6. Trade-Offs &amp; Alternatives</h4>
      <p><strong>Decentralized Contract Negotiation vs. Direct REST APIs:</strong> Cryptographic contract negotiation introduces a slight round-trip negotiation latency prior to data transfer; mitigated by aggressive caching of active contract agreements to preserve high throughput.</p>

      <h4>7. Results &amp; Measurement Context</h4>
      <ul>
        <li>Successfully achieved Gaia-X compliance certification for service catalog offerings in verification testing.</li>
        <li>Enabled verifiable sovereign data transfer across multiple enterprise supply chain nodes without centralized data custody.</li>
        <li>Zero security vulnerabilities reported during independent security audits of custom Keycloak SPIs.</li>
      </ul>

      <h4>8. Lessons Learned</h4>
      <p>Decoupling protocol negotiation from enterprise business logic is critical in emerging ecosystems where dataspace specifications evolve rapidly between release cycles.</p>
    `
  },
  'case-opensearch': {
    category: 'High-Throughput Search & Cloud Platforms',
    title: 'High-Throughput OpenSearch & Dynamic Ingestion Platform',
    content: `
      <h4>1. Business Problem</h4>
      <p>Heavy enterprise content library queries were directly hitting relational databases, resulting in slow page loads (>1.8s) during peak business hours and customer dissatisfaction.</p>

      <h4>2. Technical Constraints &amp; Existing Architecture</h4>
      <p>Monolithic MySQL database executing heavy <code>LIKE '%query%'</code> operations with joins across multiple normalization tables. Write traffic could not be throttled, requiring near-zero ingestion lag between transactional records and search indices.</p>

      <h4>3. My Individual Role &amp; Contribution</h4>
      <p>Sr. Software Engineer. Designed the OpenSearch cluster indexing architecture, Redis hot-query caching layer, Spring Data JPA integration, and automated Flyway schema migrations.</p>

      <h4>4. Architecture &amp; Implementation</h4>
      <pre>
[Web / Angular Client]
         |
[Spring Boot API Gateway]
         |
  +------+--------------------+
  |                           |
[Redis Cache]        [AWS OpenSearch Cluster]
(Hot query cache)    - Content Multi-Index
                     - Autocomplete Edge-Ngram Index
  |                           ^
  |                           | (Async Ingestion Event)
[Transactional MySQL] --------+
      </pre>
      <p>Implemented with Java, Spring Boot, Spring Data JPA, AWS OpenSearch, Redis, AWS S3, CloudWatch, and Docker on automated Jenkins CI/CD.</p>

      <h4>5. Key Engineering Decisions</h4>
      <ul>
        <li><strong>Edge N-gram Analyzers:</strong> Applied custom edge n-gram tokenizers to optimize instant prefix and infix auto-completion.</li>
        <li><strong>Two-Tier Caching:</strong> Cached top frequent queries in Redis with a 5-minute TTL, absorbing repetitive search traffic.</li>
        <li><strong>Index Aliasing:</strong> Used OpenSearch index aliases to enable zero-downtime full index re-indexing and schema migrations.</li>
      </ul>

      <h4>6. Trade-Offs &amp; Alternatives</h4>
      <p><strong>Storage Overhead vs. Query Speed:</strong> Multi-index edge-ngram indexing increased cluster storage by ~25%, but brought median query response times in production benchmarks down to under 80ms.</p>

      <h4>7. Results &amp; Measurement Context</h4>
      <ul>
        <li>Median query latency dropped from ~1.8 seconds to sub-80ms in production benchmarks.</li>
        <li>Relational database CPU utilization reduced by over 50% during peak hours by offloading read queries.</li>
        <li>Zero downtime during index schema upgrades using alias swapping.</li>
      </ul>

      <h4>8. Lessons Learned</h4>
      <p>Separating read-heavy search models from transactional write models (CQRS) provides immediate relief for relational bottlenecks and simplifies scaling independent system facets.</p>
    `
  },
  'case-monolith-migration': {
    category: 'Legacy Modernization & Cloud Architecture',
    title: 'Legacy Struts/EJB to Cloud-Native Microservices Migration',
    content: `
      <h4>1. Business Problem</h4>
      <p>Monolithic codebases in telecom and enterprise HRMS hindered deployment speed, prevented mobile application consumption, and posed significant deployment regression risks with every release.</p>

      <h4>2. Technical Constraints &amp; Existing Architecture</h4>
      <p>Monolithic Java EE WAR deployments running Struts 2.0 JSP actions and tightly coupled EJB session beans backed by database stored procedures. Zero downtime was required for active billing and payroll cycles.</p>

      <h4>3. My Individual Role &amp; Contribution</h4>
      <p>Software Engineer / Technical Lead. Designed migration roadmaps, extracted Struts actions into Spring REST controllers, refactored database cursors, and managed production hypercare.</p>

      <h4>4. Architecture &amp; Implementation</h4>
      <pre>
                    [Client Traffic]
                           |
               [Strangler API Proxy / Gateway]
                           |
            +--------------+--------------+
            | (Legacy Routes)             | (Modernized Routes)
            v                             v
[Legacy Struts / EJB Monolith]   [Spring Cloud Microservices]
            |                             |
    [Shared Stored Procs]         [Independent DB Schemas]
            |                             |
            +------- Data Sync Layer -----+
      </pre>
      <p>Executed across phased releases: Core Java, Spring Boot, Spring Security, Hibernate, MySQL, JMS, and Oracle DB.</p>

      <h4>5. Key Engineering Decisions</h4>
      <ul>
        <li><strong>Strangler Fig Pattern:</strong> Routed traffic via an edge gateway, migrating one functional slice (Time Management, Billing reporting, ATS) at a time.</li>
        <li><strong>Event-Driven Synchronization:</strong> Used message queues (JMS / Kafka) to ensure state synchronization between legacy and modern databases during the transition.</li>
        <li><strong>Contract-First REST APIs:</strong> Standardized on OpenAPI/Swagger contracts before coding endpoints to unblock frontend and mobile teams.</li>
      </ul>

      <h4>6. Trade-Offs &amp; Alternatives</h4>
      <p><strong>Temporary Dual-Run Overhead vs. Big Bang Risk:</strong> Dual-running both systems during migration required data synchronization routines, but completely eliminated the catastrophic failure risk of a single-day cutover.</p>

      <h4>7. Results &amp; Measurement Context</h4>
      <ul>
        <li>100% business continuity with zero unplanned downtime during module cutovers.</li>
        <li>Deployment cycle time reduced from monthly risky releases to weekly independent service updates.</li>
        <li>Fully enabled mobile application integration via unified REST endpoints.</li>
      </ul>

      <h4>8. Lessons Learned</h4>
      <p>Legacy modernization is primarily a risk management exercise. Small, reversible, incremental changes with strong contract testing win every time over large-scale rewrites.</p>
    `
  },
  'case-ai-workflows': {
    category: 'AI-Augmented Engineering & Toolchains',
    title: 'AI-Augmented Engineering Workflows & Toolchains',
    content: `
      <h4>1. Business Problem &amp; Context</h4>
      <p>Engineering teams frequently spend excessive time on repetitive boilerplate scaffolding, manual integration test configuration, and schema synchronization rather than core business logic and systems architecture.</p>

      <h4>2. Technical Constraints &amp; Scope</h4>
      <p><em>Scope Note:</em> Unlike the production customer systems detailed above, this project represents developer toolchain engineering and team workflows. The constraint was ensuring AI-assisted code generation adheres strictly to human architectural patterns, zero security leakage, and deterministic test passes.</p>

      <h4>3. My Individual Role &amp; Contribution</h4>
      <p>Software Architect &amp; Engineering Lead. Designed custom Model Context Protocol (MCP) tool integrations, engineered workflow automation pipelines, established cross-model review practices, and validated code generation through automated test harnesses.</p>

      <h4>4. Architecture &amp; Implementation</h4>
      <pre>
[Architect Directives & ADRs]
             |
             v
[AI Coding Agents (Antigravity / Claude Code)]
             |
   +---------+-------------------------+
   | (Tool Protocol via Stdio)         | (Code & Test Generation)
   v                                   v
[Custom MCP Server Hub]       [Spring Boot / Angular Codebase]
- Git Workspace Tools                  |
- Schema & Migration Tools             v
- Telemetry Tools              [Automated Test Harness]
                               (Docker Testcontainers)
                                       |
                                       v
                          [Cross-Model Review Gate]
      </pre>
      <p>Built using Claude Code, Antigravity CLI, Model Context Protocol (MCP) SDK, n8n workflow engines, Testcontainers, and GitHub Actions CI.</p>

      <h4>5. Key Engineering Decisions</h4>
      <ul>
        <li><strong>Model Context Protocol (MCP) Boundary:</strong> Implemented stdio-based MCP servers ensuring agents operate within structured, audited tool APIs rather than arbitrary shell access.</li>
        <li><strong>Cross-Model Dual-Pass Review:</strong> Used an independent second model review to catch unhandled edge cases and enforce architectural boundaries.</li>
        <li><strong>Deterministic Test Harnesses:</strong> Mandated Docker-based Testcontainers verification before any AI-generated PR slice is accepted.</li>
      </ul>

      <h4>6. Trade-Offs &amp; Alternatives</h4>
      <p><strong>Upfront Tooling Investment vs. Ad-hoc Prompts:</strong> Building custom MCP tools and structured prompts required initial engineering effort, but yielded predictable code generation without continuous prompt tweaking.</p>

      <h4>7. Results &amp; Measurement Context</h4>
      <ul>
        <li>Improved engineering throughput for proof-of-concept prototyping and boilerplate API scaffolding while maintaining architectural quality.</li>
        <li>Automated repetitive integration and schema validation tasks via n8n and MCP workflows.</li>
        <li>Maintained zero regressions through automated Testcontainers integration suites.</li>
      </ul>

      <h4>8. Lessons Learned</h4>
      <p>AI tools augment but do not replace engineering judgment. Grounding agents in strict architectural specifications, tool boundaries, and deterministic testing makes AI development practical in enterprise environments.</p>
    `
  }
};

function initCaseStudyModals() {
  const modalBackdrop = document.getElementById('case-modal');
  const closeBtn = document.getElementById('case-modal-close');
  const catEl = document.getElementById('case-modal-cat');
  const titleEl = document.getElementById('case-modal-title');
  const bodyEl = document.getElementById('case-modal-body');
  const openBtns = document.querySelectorAll('.open-case-modal');

  if (!modalBackdrop) return;

  function openModal(caseId) {
    const data = caseStudiesData[caseId];
    if (!data) return;

    catEl.textContent = data.category;
    titleEl.textContent = data.title;
    bodyEl.innerHTML = data.content;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const caseId = btn.dataset.caseId;
      openModal(caseId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. Engineering Insights Reader Modal (Point 5)
   ========================================================================== */
const insightsData = {
  'insight-saas': {
    category: 'Enterprise Architecture',
    title: 'Designing Multi-Tenant SaaS Applications with Spring Boot',
    content: `
      <h4>Executive Summary</h4>
      <p>Multi-tenancy is one of the most critical foundational decisions for enterprise SaaS products. Choosing the wrong isolation strategy early can lead to expensive rewrites, security leaks, or unsustainable operational costs. This article explores practical architecture and design decisions for building multi-tenant applications with Spring Boot.</p>

      <h4>1. Shared Schema vs. Schema-per-Tenant vs. Database-per-Tenant</h4>
      <ul>
        <li><strong>Database-per-Tenant:</strong> Highest isolation and easiest regulatory compliance, but highest operational cost and complex connection pooling across thousands of tenants.</li>
        <li><strong>Schema-per-Tenant:</strong> An effective sweet spot for enterprise applications on PostgreSQL/MySQL. Tenants have isolated namespaces with shared database instance resources.</li>
        <li><strong>Shared-Schema with Discriminator Column:</strong> Lowest infrastructure cost, but requires rigorous application-level security filters (Hibernate <code>@Filter</code> or Spring Data JPA tenant resolvers).</li>
      </ul>

      <h4>2. Tenant Resolution Strategies</h4>
      <p>Resolve tenant context early in the request pipeline using an HTTP Filter or Interceptor that inspects JWT claims, subdomains, or custom request headers, storing the resolved tenant identifier in a <code>ThreadLocal</code> (or Reactor Context for reactive architectures) to drive dynamic data source routing.</p>

      <h4>3. Database Isolation &amp; Routing</h4>
      <p>In Spring Boot, implement <code>AbstractRoutingDataSource</code> to dynamically route database connections based on the current thread's tenant context. This decouples service logic from physical database lookup.</p>

      <h4>4. Spring Boot, JPA &amp; Hibernate Integration</h4>
      <p>Configure Hibernate multi-tenancy modes (<code>MultiTenancyStrategy.SCHEMA</code> or <code>MultiTenancyStrategy.DATABASE</code>) alongside custom <code>CurrentTenantIdentifierResolver</code> and <code>MultiTenantConnectionProvider</code> implementations to ensure queries are automatically bound to the tenant scope.</p>

      <h4>5. Flyway / Liquibase Migrations at Scale</h4>
      <p>When running schema-per-tenant, migrations must run iteratively across all active tenant schemas upon application startup or via an out-of-band migration runner to prevent schema drift.</p>

      <h4>6. Security &amp; Compliance Considerations</h4>
      <p>Strictly validate tenant membership against user identity tokens (preventing cross-tenant IDOR vulnerabilities), configure tenant-aware connection pool quotas, and enforce audit logging for all cross-tenant administrative operations.</p>
    `
  },
  'insight-keycloak': {
    category: 'Identity & Security',
    title: 'Extending Keycloak with Custom SPI',
    content: `
      <h4>Executive Summary</h4>
      <p>Keycloak is the de facto standard for open-source identity and access management. However, enterprise requirements often demand proprietary token transformations, external directory federation, or custom credential evaluation. Service Provider Interfaces (SPIs) allow developers to customize Keycloak cleanly without modifying its core codebase.</p>

      <h4>1. Keycloak SPI Architecture</h4>
      <p>Keycloak is built on a modular SPI plugin system powered by Java ServiceLoader. Developers implement factory interfaces (e.g. <code>AuthenticatorFactory</code>) and provider interfaces (e.g. <code>Authenticator</code>) packaged as JARs and deployed directly into Keycloak's provider directory.</p>

      <h4>2. Custom Authenticators</h4>
      <p>Custom authenticators allow you to inject proprietary validation steps into browser and direct grant flows, such as evaluating external device trust, verifying decentralized credentials, or integrating hardware security tokens.</p>

      <h4>3. Authentication Flows</h4>
      <p>Authentication execution flows in Keycloak evaluate providers based on requirements: <code>REQUIRED</code>, <code>ALTERNATIVE</code>, <code>OPTIONAL</code>, or <code>DISABLED</code>. Understanding flow execution trees is crucial to preventing authentication bypasses.</p>

      <h4>4. Custom User Attributes &amp; Protocol Mappers</h4>
      <p>Use <code>ProtocolMapper</code> SPIs to dynamically extract enterprise claims or decentralized identity attributes and inject them into OpenID Connect (OIDC) JWT ID and access tokens for downstream microservices consumption.</p>

      <h4>5. Security and Maintainability Considerations</h4>
      <ul>
        <li>Keep SPI execution lightweight and non-blocking. Database queries within authenticators must use connection pools with strict timeouts.</li>
        <li>Avoid blocking external HTTP calls during token mapping; utilize Keycloak user session caching whenever possible.</li>
        <li>Write comprehensive unit and integration tests using Keycloak Testcontainers to verify SPI behavior against actual Keycloak server releases before production deployment.</li>
      </ul>
    `
  }
};

function initInsightModals() {
  const modalBackdrop = document.getElementById('case-modal');
  const catEl = document.getElementById('case-modal-cat');
  const titleEl = document.getElementById('case-modal-title');
  const bodyEl = document.getElementById('case-modal-body');
  const openBtns = document.querySelectorAll('.open-insight-modal');

  if (!modalBackdrop) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const insightId = btn.dataset.insightId;
      const data = insightsData[insightId];
      if (!data) return;

      catEl.textContent = data.category;
      titleEl.textContent = data.title;
      bodyEl.innerHTML = data.content;
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* ==========================================================================
   6. Copy to Clipboard & Toast
   ========================================================================== */
function initCopyActions() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('jigar.gadhiya@gmail.com').then(() => {
        showToast('Email (jigar.gadhiya@gmail.com) copied to clipboard');
      });
    });
  });
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   7. Back to Top Control
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   8. Dynamic Copyright Year
   ========================================================================== */
function initDynamicYear() {
  const yearEl = document.getElementById('dynamic-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   9. Coding & AI Interactive Canvas Background (Light Theme Design)
   Subtle interconnected network nodes + drifting coding & AI syntax tokens
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Network nodes
  const nodeCount = Math.min(Math.floor(window.innerWidth / 36), 34);
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 1.2,
      isHub: i % 4 === 0
    });
  }

  // Floating coding & architecture tokens
  const tokensList = [
    '<mcp>', '{rag}', '[agent]', 'subagent()', 'eval_gate',
    'guardrail', '0x7F', '() => {}', 'async',
    '// verify', 'schema.json', 'keycloak.spi', 'kafka.stream', 'testcontainers'
  ];

  const floatingTokens = [];
  const tokenCount = Math.min(Math.floor(window.innerWidth / 120), 14);
  for (let i = 0; i < tokenCount; i++) {
    floatingTokens.push({
      text: tokensList[i % tokensList.length],
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(Math.random() * 0.22 + 0.15),
      vx: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.12 + 0.14,
      fontSize: Math.floor(Math.random() * 3 + 12)
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // 1. Draw subtle background coordinate crosshairs / micro-dots
    const gridSpacing = 160;
    ctx.fillStyle = 'rgba(148, 163, 184, 0.25)';
    for (let x = gridSpacing; x < width; x += gridSpacing) {
      for (let y = gridSpacing; y < height; y += gridSpacing) {
        ctx.fillRect(x - 1, y - 1, 2, 2);
      }
    }

    // 2. Draw floating code / architecture tokens
    ctx.font = '500 12px "JetBrains Mono", monospace';
    floatingTokens.forEach(t => {
      t.y += t.vy;
      t.x += t.vx;

      if (t.y < -30) {
        t.y = height + 20;
        t.x = Math.random() * width;
      }
      if (t.x < -40) t.x = width + 20;
      if (t.x > width + 40) t.x = -20;

      ctx.fillStyle = `rgba(37, 99, 235, ${t.opacity})`;
      ctx.fillText(t.text, t.x, t.y);
    });

    // 3. Draw interconnected network
    const dotColor = 'rgba(37, 99, 235, 0.45)';
    const hubColor = 'rgba(124, 58, 237, 0.55)';
    const lineColor = 'rgba(37, 99, 235, 0.08)';

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.isHub ? n.radius + 1.2 : n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.isHub ? hubColor : dotColor;
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
        if (dist < 135) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
