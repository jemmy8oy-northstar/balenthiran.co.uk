import React from 'react';
import { Link } from 'react-router-dom';
import appsData from '../data/apps.json';

interface AppEntry {
  id: string;
  name: string;
  description: string;
  path: string;
}

const apps = appsData.apps as AppEntry[];

const Card: React.FC<{ app: AppEntry }> = ({ app }) => (
  <div
    className="glass"
    data-testid="app-card"
    style={{
      padding: '20px 22px',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      height: '100%',
    }}
  >
    <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>{app.name}</h2>
    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, flexGrow: 1 }}>
      {app.description}
    </p>
    {/* Plain anchor: these are separate apps on the same host, not SPA routes. */}
    <a href={app.path} style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
      Open
    </a>
  </div>
);

const Apps: React.FC = () => (
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

      <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '12px' }}>Apps</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', fontSize: '1.05rem', lineHeight: 1.6 }}>
        Everything I'm building, live.
      </p>
    </header>

    <div className="container" style={{ paddingBottom: '80px' }}>
      <div
        data-testid="app-list"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '14px',
        }}
      >
        {apps.map((app) => (
          <Card key={app.id} app={app} />
        ))}
      </div>
    </div>
  </div>
);

export default Apps;
