/**
 * Jigar Gadhiya - AI Software Architect | Engineering Leader | Technology Consultant
 * Interactive Logic: Navigation, Modals, Search, Filtering & Coding/AI Background System
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
   4. Architecture Case Studies Modal Deep Dives (11-Point Structure)
   ========================================================================== */
const caseStudiesData = {
  'case-catena-x': {
    category: 'Decentralized Data Ecosystems & Enterprise Identity',
    title: 'Catena-X Automotive Dataspace & SSI Integration',
    content: `
      <h4>1. Project Overview</h4>
      <p>Implementation of sovereign, decentralized automotive data exchange components aligned with the European Gaia-X standard and the Catena-X Automotive Network ecosystem.</p>

      <h4>2. Business Problem</h4>
      <p>Global automotive supply chain participants needed to exchange bill-of-materials, carbon footprint, and traceability data without giving custody of proprietary operational databases to a single centralized cloud vendor.</p>

      <h4>3. Existing Architecture</h4>
      <p>Fragmented, point-to-point bespoke FTP/API integrations with disconnected credentialing models and no cryptographic governance over participant data sovereign rights.</p>

      <h4>4. Engineering Challenges</h4>
      <ul>
        <li>Adhering strictly to Eclipse Dataspace Components (EDC) contract negotiation and transfer protocols.</li>
        <li>Integrating decentralized identity (DID-web) and Verifiable Credentials (VC) into enterprise IAM.</li>
        <li>Writing high-performance custom authentication SPI plugins for Keycloak to evaluate dataspace execution policies.</li>
      </ul>

      <h4>5. My Role &amp; Responsibilities</h4>
      <p>Sr. Software Engineer &amp; Technical Lead. Architected Keycloak OIDC SPI extensions, integrated EDC connectors, implemented verifiable credential verification pipelines, and led weekly client architectural syncs.</p>

      <h4>6. Architecture Schema</h4>
      <pre>
[Automotive Supplier A]                       [Automotive OEM B]
        |                                             |
[EDC Control Plane]  <=== Contract Negotiation ===>  [EDC Control Plane]
        |                                             |
[EDC Data Plane]     <=== Sovereign Data Stream ==>  [EDC Data Plane]
        |                                             |
[Keycloak SPI (OIDC)]                         [Keycloak SPI (OIDC)]
        |                                             |
[DID-web / VC Auth]                           [DID-web / VC Auth]
        v                                             v
[Internal Kafka Bus]                          [Internal Enterprise Services]
      </pre>

      <h4>7. Architectural Decisions</h4>
      <ul>
        <li><strong>Hexagonal / Ports-and-Adapters Architecture:</strong> Isolated EDC protocol adapters from internal business microservices to allow easy upgrading of dataspace protocol revisions.</li>
        <li><strong>Custom Keycloak SPIs:</strong> Implemented policy enforcement at the identity gateway rather than scattering token inspection across distributed backend services.</li>
        <li><strong>Kafka Event Bus:</strong> Offloaded internal synchronization and cross-component notifications asynchronously.</li>
      </ul>

      <h4>8. Technical Trade-Offs</h4>
      <p><strong>Decentralized vs. Direct REST:</strong> Decentralized contract negotiation introduces a slight round-trip negotiation latency prior to data transfer; mitigated by aggressive caching of active contract agreements.</p>

      <h4>9. Implementation Approach</h4>
      <p>Built using Java, Spring Boot, Keycloak SPI, EDC, Docker, Kubernetes, Helm charts, and ArgoCD for predictable multi-environment deployments.</p>

      <h4>10. Results &amp; Measurable Outcomes</h4>
      <ul>
        <li>Successfully achieved Gaia-X compliance certification for service catalog offerings.</li>
        <li>Enabled verifiable sovereign data transfer across multiple enterprise supply chain nodes.</li>
        <li>Zero security vulnerabilities reported during independent security audits of custom Keycloak SPIs.</li>
      </ul>

      <h4>11. Lessons Learned</h4>
      <p>Standardization in decentralized ecosystems evolves rapidly; decoupling protocol negotiation from enterprise domain logic is critical to prevent breaking downstream applications during protocol version bumps.</p>
    `
  },
  'case-opensearch': {
    category: 'High-Throughput Search & Cloud Platforms',
    title: 'High-Throughput OpenSearch & Dynamic Ingestion Platform',
    content: `
      <h4>1. Project Overview</h4>
      <p>Architecting an enterprise-wide search platform with dynamic schema indexing, real-time sync, autocomplete, and sub-100ms response times across millions of records.</p>

      <h4>2. Business Problem</h4>
      <p>Heavy enterprise content library queries were directly hitting relational databases, resulting in slow page loads (>1.8s), database lock contention during business hours, and customer dissatisfaction.</p>

      <h4>3. Existing Architecture</h4>
      <p>Monolithic MySQL database executing heavy <code>LIKE '%query%'</code> operations with joins across multiple normalization tables.</p>

      <h4>4. Engineering Challenges</h4>
      <ul>
        <li>Maintaining near-zero ingestion lag between transactional MySQL records and search indices.</li>
        <li>Implementing multi-entity autocomplete with typo tolerance without degrading cluster throughput.</li>
        <li>Managing multi-tenant data isolation and index lifecycle policies.</li>
      </ul>

      <h4>5. My Role &amp; Responsibilities</h4>
      <p>Sr. Software Engineer. Designed the OpenSearch cluster indexing architecture, Redis hot-query caching layer, Spring Data JPA integration, and automated Flyway migrations.</p>

      <h4>6. Architecture Schema</h4>
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
  |                           | (Async Sync Event)
[Transactional MySQL] --------+
      </pre>

      <h4>7. Architectural Decisions</h4>
      <ul>
        <li><strong>Edge N-gram Analyzers:</strong> Applied custom edge n-gram tokenizers to optimize instant prefix and infix auto-completion.</li>
        <li><strong>Two-Tier Caching:</strong> Cached top 20% most frequent queries in Redis with a 5-minute TTL, absorbing 65% of repetitive search traffic.</li>
        <li><strong>Index Aliasing:</strong> Used OpenSearch index aliases to enable zero-downtime full index re-indexing and schema migrations.</li>
      </ul>

      <h4>8. Technical Trade-Offs</h4>
      <p><strong>Storage Overhead vs. Query Speed:</strong> Multi-index edge-ngram indexing increased cluster storage by ~25%, but brought median query latency down from 1800ms to under 80ms.</p>

      <h4>9. Implementation Approach</h4>
      <p>Built with Java, Spring Boot, Spring Data JPA, AWS OpenSearch, Redis, AWS S3, CloudWatch, and Docker on automated Jenkins CI/CD.</p>

      <h4>10. Results &amp; Measurable Outcomes</h4>
      <ul>
        <li>Median search latency dropped from ~1.8 seconds to sub-80ms.</li>
        <li>Relational database CPU utilization reduced by over 50% during peak hours.</li>
        <li>Zero downtime during index schema upgrades using alias swapping.</li>
      </ul>

      <h4>11. Lessons Learned</h4>
      <p>Separating read-heavy search models from transactional write models (CQRS) provides immediate relief for relational bottlenecks and simplifies scaling independent system facets.</p>
    `
  },
  'case-monolith-migration': {
    category: 'Legacy Modernization & Cloud Architecture',
    title: 'Legacy Struts/EJB to Cloud-Native Microservices Migration',
    content: `
      <h4>1. Project Overview</h4>
      <p>Incremental decomposition of mission-critical legacy enterprise systems (Struts 2.0 / EJB) into modular, cloud-ready Spring Boot microservices using the Strangler Fig pattern.</p>

      <h4>2. Business Problem</h4>
      <p>Monolithic codebases in telecom and enterprise HRMS hindered deployment speed, prevented mobile application consumption, and posed significant deployment regression risks with every release.</p>

      <h4>3. Existing Architecture</h4>
      <p>Monolithic Java EE WAR deployments running Struts 2.0 JSP actions and tightly coupled EJB session beans backed by stored procedures.</p>

      <h4>4. Engineering Challenges</h4>
      <ul>
        <li>Migrating active enterprise modules without interrupting daily billing and payroll operations.</li>
        <li>Safely extracting complex business logic locked inside database stored procedures and triggers.</li>
        <li>Introducing RESTful contract-first APIs compatible with upcoming mobile applications.</li>
      </ul>

      <h4>5. My Role &amp; Responsibilities</h4>
      <p>Software Engineer / Technical Lead. Designed migration roadmaps, extracted Struts actions into Spring REST controllers, refactored database cursors, and managed production hypercare.</p>

      <h4>6. Architecture Schema</h4>
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

      <h4>7. Architectural Decisions</h4>
      <ul>
        <li><strong>Strangler Fig Pattern:</strong> Routed traffic via an edge gateway, migrating one functional slice (Time Management, Billing reporting, ATS) at a time.</li>
        <li><strong>Event-Driven Synchronization:</strong> Used message queues (JMS / Kafka) to ensure state synchronization between legacy and modern databases during the transition.</li>
        <li><strong>Contract-First REST APIs:</strong> Standardized on OpenAPI/Swagger contracts before coding endpoints to unblock mobile frontend teams.</li>
      </ul>

      <h4>8. Technical Trade-Offs</h4>
      <p><strong>Temporary Dual-Run Overhead vs. Big Bang Risk:</strong> Dual-running both systems during migration required data synchronization routines, but completely eliminated the catastrophic failure risk of a single-day cutover.</p>

      <h4>9. Implementation Approach</h4>
      <p>Executed across phased releases: Core Java, Spring Boot, Spring Security, Hibernate, MySQL, JMS, and Oracle DB.</p>

      <h4>10. Results &amp; Measurable Outcomes</h4>
      <ul>
        <li>100% business continuity with zero unintended downtime during module cutovers.</li>
        <li>Deployment cycle time reduced from monthly risky releases to weekly independent service updates.</li>
        <li>Fully enabled mobile application integration via unified REST endpoints.</li>
      </ul>

      <h4>11. Lessons Learned</h4>
      <p>Legacy modernization is primarily a risk management exercise. Small, reversible, incremental changes with strong contract testing win every time over large-scale rewrites.</p>
    `
  },
  'case-ai-workflows': {
    category: 'AI Systems & Autonomous Toolchains',
    title: 'Autonomous Multi-Agent Development Pipeline & Quality Governance',
    content: `
      <h4>1. Project Overview</h4>
      <p>Designing, implementing, and productionizing an automated AI pipeline for end-to-end software engineering. The system features multiple specialized agents, sub-agents, skills, custom Model Context Protocol (MCP) servers, dual-model reviewers (Claude + Codex), evaluation gates, and safety guardrails.</p>

      <h4>2. Business Problem</h4>
      <p>While generative AI assistants accelerate raw code generation, unconstrained LLMs frequently introduce subtle hallucinations, deviate from enterprise architectural boundaries, and generate untested code that bloats technical debt.</p>

      <h4>3. Existing Architecture</h4>
      <p>Uncoordinated developer usage of ad-hoc chat interfaces with copy-pasting, lack of structured repository context, zero automated validation gates, and manual code review bottlenecks.</p>

      <h4>4. Engineering Challenges</h4>
      <ul>
        <li>Orchestrating primary planning agents with specialized sub-agents and discrete domain skills without context window saturation.</li>
        <li>Designing secure, scoped Model Context Protocol (MCP) servers to grant agents read/write access to schemas, repositories, and build tools safely.</li>
        <li>Eliminating single-model bias by establishing automated cross-model review pipelines (Claude + Codex).</li>
        <li>Enforcing deterministic evaluation gates (linting, contract validation, security scans, Testcontainers suites) prior to git commits.</li>
      </ul>

      <h4>5. My Role &amp; Responsibilities</h4>
      <p>AI Software Architect &amp; Engineering Lead. Designed the multi-agent hierarchy, authored custom MCP servers, built RAG grounding indexing, formulated cross-model validation protocols, and integrated deterministic CI evaluation gates.</p>

      <h4>6. Architecture Schema</h4>
      <pre>
[Human Architect Directives & ADRs]
                |
                v
  [Primary Orchestrator Agent]
                |
    +-----------+-------------------------+
    | (Delegates Task)                    | (Context Grounding)
    v                                     v
[Specialized Sub-Agents & Skills]       [RAG Vector & Schema Index]
- Scaffolding & API Sub-Agent           - OpenAPI Contracts
- Database Migration Sub-Agent          - Architecture Decision Records
- Unit & Integration Test Sub-Agent     - Repository Graph
    |                                     |
    +-----------------+-------------------+
                      | (Invokes Tools via Stdio)
                      v
            [Custom MCP Server Hub]
            - GitHub & Git Workspace Tools
            - Database Schema & Migration Tools
            - Docker & Test Execution Tools
                      |
                      v
         [Generated Code & Test Suites]
                      |
                      v
      [Cross-Model Reviewer Agent]
      (Claude 3.7 + OpenAI Codex Dual-Pass)
      - Enforces SOLID & Architectural Boundaries
      - Audits Edge Cases & Error Handling
                      |
                      v
      [Automated Evaluation Gates & Guardrails]
      - Static AST & Security Guardrail Checks
      - Docker Testcontainers Integration Suite
      - 100% Deterministic Green Verification
                      |
                      v
        [Clean, Verified Pull Request]
      </pre>

      <h4>7. Architectural Decisions</h4>
      <ul>
        <li><strong>Role-Separated Sub-Agents:</strong> Decomposed large tasks into isolated sub-agents with bounded context to prevent context drift and hallucinations.</li>
        <li><strong>Model Context Protocol (MCP) Boundary:</strong> Built stdio MCP servers ensuring tools operate with deterministic parameters and audit logs rather than unrestricted shell access.</li>
        <li><strong>Cross-Model Dual-Pass Review:</strong> Used an independent Claude + Codex reviewing agent to inspect code generated by another agent, exposing subtle logic flaws that self-reviewing models overlook.</li>
        <li><strong>Eval Gates & Guardrails:</strong> Hard evaluation gates that automatically reject pull requests if architectural linting or integration tests fail.</li>
      </ul>

      <h4>8. Technical Trade-Offs</h4>
      <p><strong>Latency & Token Consumption vs. Code Correctness:</strong> Multi-agent orchestration and dual-pass cross-model reviews take longer than single-prompt generation (~2-3 minutes per feature slice), but yield 98%+ pass rates on first-run integration tests with zero architectural degradation.</p>

      <h4>9. Implementation Approach</h4>
      <p>Implemented with Claude Code, Antigravity CLI, Model Context Protocol (MCP) SDK, n8n workflow engines, Python/Node.js, Docker Testcontainers, and GitHub Actions CI.</p>

      <h4>10. Results &amp; Measurable Outcomes</h4>
      <ul>
        <li>Accelerated production API scaffolding and test generation by 3.5x with zero regressions.</li>
        <li>Cross-model reviewer caught 100% of missing edge-case validations and unhandled exception paths before code review.</li>
        <li>Eliminated manual test setup effort through automated Testcontainers integration suites.</li>
      </ul>

      <h4>11. Lessons Learned</h4>
      <p>The true power of AI in engineering is not a chat prompt; it is an orchestrated pipeline of specialized agents operating through strict tool protocols, cross-model checks, and deterministic evaluation gates.</p>
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
   5. Engineering Insights Reader Modal
   ========================================================================== */
const insightsData = {
  'insight-ai': {
    category: 'AI & Autonomous Engineering',
    title: 'Building Multi-Agent Pipelines with MCP, Cross-Model Reviewers & Eval Gates',
    content: `
      <h4>Executive Summary</h4>
      <p>Autonomous AI coding agents are shifting engineering workflows from interactive chatting to orchestrated multi-agent systems. This article outlines the architectural blueprint for building automated development pipelines using sub-agents, Model Context Protocol (MCP), cross-model verification (Claude + Codex), and deterministic evaluation gates.</p>

      <h4>1. The Limits of Single-Prompt AI Assistance</h4>
      <p>Early AI adoption treated LLMs as autocomplete engines or chat buddies. In enterprise systems, this quickly fails because large codebases overwhelm single context windows, leading to hallucinated dependencies and pattern violations.</p>

      <h4>2. Multi-Agent Hierarchy & Sub-Agents</h4>
      <p>Modern agentic architecture divides responsibilities:</p>
      <ul>
        <li><strong>Orchestrator Agent:</strong> Interprets high-level user directives and breaks them down into an execution plan.</li>
        <li><strong>Specialized Sub-Agents:</strong> Execute discrete scopes (e.g., Domain Scaffolder, DB Migration Agent, Unit Test Agent). Each sub-agent runs with curated prompt instructions and tailored skills.</li>
      </ul>

      <h4>3. Model Context Protocol (MCP) as the Secure Tool Boundary</h4>
      <p>Rather than giving agents arbitrary shell execution, custom MCP servers expose structured, audited tool APIs: inspecting database schemas, running AST parsers, reading git diffs, and querying internal RAG vector stores.</p>

      <h4>4. Cross-Model Quality Review: Claude + Codex</h4>
      <p>A crucial breakthrough in autonomous reliability is the <em>cross-model reviewer</em> pattern. Code generated by one agent is audited by a peer reviewer agent running an alternate model family (e.g., Claude 3.7 reviewing Codex or vice versa). This complementary perspective immediately surfaces unhandled null states, concurrency hazards, and architectural deviations.</p>

      <h4>5. Deterministic Evaluation Gates & Safety Guardrails</h4>
      <p>AI generation must culminate in deterministic validation: compiling with strict linters, executing Docker-based Testcontainers integration tests, and validating OpenAPI contract adherence. Only code that passes 100% of evaluation gates is permitted to advance to human pull request review.</p>
    `
  },
  'insight-keycloak': {
    category: 'Identity & Security',
    title: 'Building Custom Keycloak SPI Plugins for Enterprise Identity',
    content: `
      <h4>Executive Summary</h4>
      <p>Keycloak is the de facto standard for open-source identity and access management. However, enterprise requirements often demand proprietary token transformations, external directory federation, or decentralized Verifiable Credential evaluation. Service Provider Interfaces (SPIs) allow developers to customize Keycloak cleanly without modifying its core.</p>

      <h4>Core SPI Extension Points</h4>
      <ul>
        <li><strong>Authenticator SPI:</strong> Injecting custom authentication steps into browser and direct grant flows (e.g., decentralized credential validation).</li>
        <li><strong>User Storage SPI:</strong> Federating identities from legacy databases or sovereign decentralized identity registries (DID-web).</li>
        <li><strong>Protocol Mapper SPI:</strong> Dynamically decorating OIDC JWT tokens with organizational claims, Catena-X dataspace scopes, or multi-tenant metadata.</li>
        <li><strong>Event Listener SPI:</strong> Emitting authentication audit events to Kafka for centralized security monitoring.</li>
      </ul>

      <h4>Architectural Best Practices</h4>
      <p>Keep SPI execution lightweight and non-blocking. Database queries within authenticators should use connection pools with strict timeouts, and token mappers should avoid redundant external HTTP lookups by utilizing Keycloak user session caching.</p>
    `
  },
  'insight-saas': {
    category: 'Architecture Strategy',
    title: 'Designing Multi-Tenant SaaS Applications with Spring Boot',
    content: `
      <h4>Executive Summary</h4>
      <p>Multi-tenancy is one of the most critical foundational decisions for enterprise SaaS products. Choosing the wrong isolation strategy early can lead to expensive rewrites, security leaks, or unsustainable operational costs.</p>

      <h4>The Three Isolation Models</h4>
      <ul>
        <li><strong>Database-per-Tenant:</strong> Highest isolation, easiest compliance, but highest resource cost and complex connection pooling at scale.</li>
        <li><strong>Schema-per-Tenant:</strong> Excellent balance for PostgreSQL/MySQL; isolated tables with shared database instance overhead.</li>
        <li><strong>Shared-Schema with Discriminator Column:</strong> Lowest infrastructure cost, highest density, but requires bulletproof application-level security filters (Hibernate <code>@Filter</code> or Spring Data JPA tenant resolvers).</li>
      </ul>

      <h4>Dynamic Tenant Resolution</h4>
      <p>Resolve tenant context early in the request pipeline using an HTTP Filter or Interceptor that extracts the tenant identifier from JWT claims, subdomains, or custom request headers, storing it in a <code>ThreadLocal</code> (or Reactor Context for reactive architectures) to drive dynamic data source routing.</p>
    `
  },
  'insight-legacy': {
    category: 'Modernization',
    title: 'Migrating Legacy Applications to Microservices Using the Strangler Fig Pattern',
    content: `
      <h4>Executive Summary</h4>
      <p>Big-bang rewrites of enterprise monoliths fail at an alarming rate. The Strangler Fig pattern provides a disciplined, incremental migration path that modernizes legacy systems while preserving daily business operations.</p>

      <h4>The Step-by-Step Modernization Playbook</h4>
      <ol>
        <li><strong>Establish the Facade:</strong> Deploy an API Gateway in front of the existing monolith to route all incoming client traffic.</li>
        <li><strong>Identify High-Value Bounded Contexts:</strong> Pick a domain slice that changes frequently or experiences specific scaling bottlenecks.</li>
        <li><strong>Implement Modern Cloud Service:</strong> Build the new service using modern patterns (Spring Boot, clean domain interfaces, containerization).</li>
        <li><strong>Dual-Run & Synchronize:</strong> Replicate data between legacy and new databases using asynchronous messaging (Kafka/JMS) to ensure consistency.</li>
        <li><strong>Flip Gateway Traffic:</strong> Redirect client routes to the modern microservice and monitor observability telemetry.</li>
        <li><strong>Decommission:</strong> Safely prune legacy code and stored procedures once traffic is fully stabilized.</li>
      </ol>
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
   Subtle interconnected agent nodes + drifting coding & AI syntax tokens
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

  // Agent network nodes
  const nodeCount = Math.min(Math.floor(window.innerWidth / 36), 34);
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 1.2,
      isAgent: i % 4 === 0 // Agent hub node
    });
  }

  // Floating coding & AI tokens
  const tokensList = [
    '<mcp>', '{rag}', '[agent]', 'subagent()', 'eval_gate',
    'guardrail', 'claude+codex', '0x7F', '() => {}', 'async',
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

    // 2. Draw floating code / AI tokens
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

    // 3. Draw interconnected agent network
    const dotColor = 'rgba(37, 99, 235, 0.45)';
    const agentColor = 'rgba(124, 58, 237, 0.55)';
    const lineColor = 'rgba(37, 99, 235, 0.08)';

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.isAgent ? n.radius + 1.2 : n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.isAgent ? agentColor : dotColor;
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
