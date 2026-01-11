import React from 'react';
import { Link } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard';

const YouTubeBoard: React.FC = () => {
    return (
        <div style={{ marginTop: '80px', width: '100%' }}>
            <header className="container" style={{ marginBottom: '48px' }}>
                <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                    ← Back to Portfolio
                </Link>
                <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)' }}>Content Roadmap</h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '16px' }}>
                    Tracking the pipeline of engineering videos, project breakdowns, and build-in-public sessions for the jemmy8oy channel.
                </p>
            </header>

            <KanbanBoard initialType="youtube" />
        </div>
    );
};

export default YouTubeBoard;
