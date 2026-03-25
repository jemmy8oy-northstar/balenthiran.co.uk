import { Link } from 'react-router-dom';

const phases = [
  {
    number: 1,
    title: 'Vision & High-Level Planning',
    subtitle: 'In chat',
    description: 'Align on what we are building and why before any decomposition.',
    activities: [
      'Define the product vision in 2–3 sentences',
      'List the core problems being solved',
      'Identify the primary user personas',
      'Agree on MVP scope boundaries — what is explicitly out of scope for POC',
    ],
    outputs: ['Vision statement', 'High-level backlog (epics + top-level features)', 'Initial out-of-scope list'],
  },
  {
    number: 2,
    title: 'Feature Breakdown & User Stories',
    subtitle: 'In chat',
    description: 'Decompose features into user stories at a high level — establishing what the app needs to do, not how.',
    activities: [
      'Write high-level user stories: As a [persona], I want to [action] so that [outcome]',
      'Flag stories that are unclear or need design input',
      'Identify obvious technical risks or unknowns',
    ],
    outputs: ['Story list per feature', 'List of open questions / unknowns'],
  },
  {
    number: 3,
    title: 'UI/UX Design',
    subtitle: 'In chat — ASCII + Mermaid',
    description: 'Fully design the user-facing product before touching a component. Every meaningful page state and user journey should be covered.',
    activities: [
      'User journey mapping — narrative descriptions of key workflows',
      'ASCII mockups — for each page / modal / drawer, iterate until signed off',
      'Data flow consideration — what data is displayed, where it comes from, what mutations occur',
      'UI user stories — written as each screen is signed off',
    ],
    outputs: ['Signed-off ASCII mockup per page/state', 'Data flow notes (Mermaid where appropriate)', 'UI user stories attached to features'],
  },
  {
    number: 4,
    title: 'UI + Skeleton Backend',
    subtitle: 'Implementation',
    description: 'Build a fully navigable, fully wired-up frontend backed by faked endpoints. The app should look and behave like the real thing — just no real data.',
    activities: [
      'Scaffold routes in .NET — one controller action per endpoint, returning Faker-generated DTOs',
      'Generate OpenAPI spec from the running skeleton app',
      'Run codegen to produce RTK Query hooks from the OpenAPI spec',
      'Implement the frontend using generated hooks — no hardcoded data',
      'Deploy to scratch environment for interactive QA and sign-off',
      'Write backend user stories as each route is faked',
    ],
    outputs: ['Fully functional skeleton app (deployed to scratch)', 'Complete OpenAPI spec', 'Backend user stories for every endpoint'],
  },
  {
    number: 5,
    title: 'Backend Architecture & DB Design',
    subtitle: 'In chat',
    description: 'Now that the full scope of business contracts is known, design the backend before writing any implementation code.',
    activities: [
      'Entity design — identify domain entities from API contracts, draw ER diagram in Mermaid',
      'EF Core model design — define entities, relationships, indexes and constraints',
      'Service/repository architecture — agree on layering and cross-cutting concerns',
      'Architectural Decision Records (ADRs) — capture significant decisions as short notes',
    ],
    outputs: ['Mermaid ER diagram', 'EF Core entity list with key properties', 'Service layer outline', 'ADR notes for significant decisions'],
  },
  {
    number: 6,
    title: 'Backend Implementation',
    subtitle: 'Story by story',
    description: 'Replace faked skeleton endpoints with real business logic, backed by the designed database.',
    activities: [
      'Work story by story from the backend user story list',
      'Each story: implement service logic → wire to repository → write EF Core migration',
      'Verify against the frontend in the scratch environment',
      'The OpenAPI spec should not change during this phase — flag any contract changes explicitly',
    ],
    outputs: ['Production-ready backend', 'EF Core migrations', 'Verified end-to-end feature set'],
  },
];

const tooling = [
  { concern: 'UI Mockups', tool: 'ASCII (in-chat)' },
  { concern: 'Architecture / Data flow', tool: 'Mermaid diagrams' },
  { concern: 'API contract generation', tool: 'OpenAPI (.NET routes)' },
  { concern: 'Frontend API client', tool: 'RTK Query (codegen)' },
  { concern: 'Fake data', tool: 'Faker (.NET skeleton controllers)' },
  { concern: 'PR / QA review', tool: 'Scratch environment deployment' },
];

const SDDPage: React.FC = () => {
  return (
    <div className="container" style={{ marginTop: '100px', paddingBottom: '80px' }}>

      {/* Header */}
      <header style={{ marginBottom: '64px' }}>
        <Link
          to="/"
          style={{
            color: 'var(--accent-primary)',
            fontSize: '0.9rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '32px',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          ← Back to Home
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span style={{
            padding: '6px 16px',
            borderRadius: '100px',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            color: '#fff',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            Workflow
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          marginBottom: '20px',
          background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent-primary) 60%, var(--accent-secondary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.15,
        }}>
          Spec Driven Development
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          maxWidth: '680px',
          lineHeight: 1.7,
        }}>
          A structured, iterative development process designed to maximise in-chat planning before any code is written — ensuring the full scope of the application is understood before committing to implementation.
        </p>
      </header>

      {/* Main grid */}
      <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '64px', alignItems: 'start' }}>

        {/* LEFT — Phases */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          {/* Core Philosophy */}
          <section className="glass" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>
              Core Philosophy
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '💬', text: 'Iterate in chat first — decisions made in chat are cheap; decisions made in code are expensive.' },
                { icon: '⏳', text: 'Defer implementation details — don\'t think about databases or frameworks until the product shape is fully understood.' },
                { icon: '📄', text: 'Let the spec drive the code — user stories, mockups and API contracts are the source of truth.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '0.95rem' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Phases */}
          {phases.map((phase) => (
            <section key={phase.number} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  flexShrink: 0,
                }}>
                  {phase.number}
                </span>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {phase.title}
                  </h2>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {phase.subtitle}
                  </span>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '0.95rem' }}>
                {phase.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="glass" style={{ padding: '20px' }}>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-primary)', marginBottom: '12px' }}>
                    Activities
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {phase.activities.map((a, i) => (
                      <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>›</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass" style={{ padding: '20px' }}>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-secondary)', marginBottom: '12px' }}>
                    Outputs
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {phase.outputs.map((o, i) => (
                      <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--accent-secondary)', flexShrink: 0 }}>✓</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* RIGHT — Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '100px' }}>

          {/* Summary Flow */}
          <section className="glass" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>
              Summary Flow
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                'Vision & Planning',
                'Feature Breakdown & Stories',
                'UI/UX Design',
                'UI + Skeleton Backend',
                'Backend Architecture & DB Design',
                'Backend Implementation',
              ].map((step, i, arr) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>{step}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{
                      width: '2px',
                      height: '20px',
                      background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary))',
                      marginLeft: '13px',
                      opacity: 0.4,
                    }} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Tooling Table */}
          <section className="glass" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>
              Tooling Conventions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tooling.map((row, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 0',
                  borderBottom: i < tooling.length - 1 ? '1px solid var(--glass-border)' : 'none',
                }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{row.concern}</span>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                    background: 'rgba(99,102,241,0.1)',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    whiteSpace: 'nowrap',
                  }}>{row.tool}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Why ASCII callout */}
          <section className="glass" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
              Why ASCII mockups?
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              ASCII mockups can be reviewed, critiqued and iterated entirely within the chat window — no screenshots, no build steps, no rendering pipeline. Once the design is locked in ASCII, translating it to React is straightforward because the component structure is already implicit in the layout.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default SDDPage;
