import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import statusData from '../data/status.json';

interface StatusItem {
  title: string;
  project: string;
  note?: string;
  link?: string;
  waiting?: string;
  desk?: boolean;
}

interface Lane {
  id: string;
  title: string;
  hint?: string;
  items: StatusItem[];
}

const WAITING_LABEL: Record<string, string> = {
  review: 'waiting on: your review',
  merge: 'waiting on: your merge',
  decision: 'waiting on: your decision',
};

const lanes = statusData.lanes as Lane[];

// Every distinct project across all lanes, for the filter chips.
const ALL_PROJECTS = Array.from(
  new Set(lanes.flatMap((lane) => lane.items.map((i) => i.project)))
).sort();

const chipBase: React.CSSProperties = {
  padding: '6px 14px',
  borderRadius: '999px',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
  border: '1px solid var(--glass-border)',
  background: 'transparent',
  color: 'var(--text-secondary)',
  transition: 'all 0.2s ease',
};

const Card: React.FC<{ item: StatusItem }> = ({ item }) => {
  const body = (
    <div
      className="glass"
      style={{
        padding: '16px 18px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
        <span style={{ fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35 }}>{item.title}</span>
        {item.desk && (
          <span
            title="Needs you at your desk"
            style={{
              flexShrink: 0,
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '999px',
              background: 'rgba(168, 85, 247, 0.15)',
              color: 'var(--accent-secondary)',
              whiteSpace: 'nowrap',
            }}
          >
            💻 desk
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '6px',
            background: 'var(--bg-card)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-secondary)',
          }}
        >
          {item.project}
        </span>
        {item.waiting && WAITING_LABEL[item.waiting] && (
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
            {WAITING_LABEL[item.waiting]}
          </span>
        )}
      </div>

      {item.note && (
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.note}</p>
      )}
    </div>
  );

  if (item.link) {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        {body}
      </a>
    );
  }
  return body;
};

const Status: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeProject = searchParams.get('project') || 'all';
  const deskOnly = searchParams.get('desk') === '1';

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value === null) next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  const filteredLanes = useMemo(() => {
    return lanes
      .map((lane) => ({
        ...lane,
        items: lane.items.filter(
          (i) => (activeProject === 'all' || i.project === activeProject) && (!deskOnly || i.desk)
        ),
      }))
      .filter((lane) => lane.items.length > 0);
  }, [activeProject, deskOnly]);

  return (
    <div style={{ marginTop: '80px', width: '100%' }}>
      <header className="container" style={{ marginBottom: '40px' }}>
        <Link
          to="/"
          style={{
            color: 'var(--accent-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            fontWeight: 600,
          }}
        >
          ← Back to Portfolio
        </Link>

        <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '12px' }}>Status board</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '4px' }}>
          {statusData.intro}
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', opacity: 0.7 }}>Updated {statusData.updated}</p>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '28px' }}>
          <button
            onClick={() => setParam('project', null)}
            style={{
              ...chipBase,
              ...(activeProject === 'all'
                ? { background: 'var(--accent-primary)', color: '#fff', borderColor: 'var(--accent-primary)' }
                : {}),
            }}
          >
            All projects
          </button>
          {ALL_PROJECTS.map((project) => (
            <button
              key={project}
              onClick={() => setParam('project', project)}
              style={{
                ...chipBase,
                ...(activeProject === project
                  ? { background: 'var(--accent-primary)', color: '#fff', borderColor: 'var(--accent-primary)' }
                  : {}),
              }}
            >
              {project}
            </button>
          ))}

          <span style={{ width: '1px', height: '24px', background: 'var(--glass-border)', margin: '0 6px' }} />

          <button
            onClick={() => setParam('desk', deskOnly ? null : '1')}
            style={{
              ...chipBase,
              ...(deskOnly
                ? { background: 'var(--accent-secondary)', color: '#fff', borderColor: 'var(--accent-secondary)' }
                : {}),
            }}
          >
            💻 Desk only
          </button>
        </div>
      </header>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingBottom: '80px' }}>
        {filteredLanes.length === 0 && (
          <p style={{ color: 'var(--text-secondary)' }}>Nothing matches this filter.</p>
        )}
        {filteredLanes.map((lane) => (
          <section key={lane.id}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0 }}>{lane.title}</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{lane.items.length}</span>
            </div>
            {lane.hint && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0 0 16px', opacity: 0.8 }}>{lane.hint}</p>
            )}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '14px',
              }}
            >
              {lane.items.map((item, idx) => (
                <Card key={`${item.project}-${item.title}-${idx}`} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Status;
