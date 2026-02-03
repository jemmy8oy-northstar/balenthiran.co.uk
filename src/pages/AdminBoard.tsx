import React from 'react';
import { Link } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard';
import BoardSwitcher from '../components/BoardSwitcher';
import SprintGoals from '../components/SprintGoals';
import SprintHistory from '../components/SprintHistory';
import SprintNavigator from '../components/SprintNavigator';

const AdminBoard: React.FC = () => {
    return (
        <div style={{ marginTop: '80px', width: '100%' }}>
            <header className="container" style={{ marginBottom: '48px' }}>
                <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                    ← Back to Portfolio
                </Link>

                <SprintNavigator />

                <SprintGoals />

                <SprintHistory boardFilter="admin" />

                <BoardSwitcher initialType="admin" />

                <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)' }}>Platform & Brand</h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '16px', marginBottom: '48px' }}>
                    Managing the jemmy8oy brand presence. Tracking social media setups, newsletter launches, and platform growth.
                </p>
            </header>

            <KanbanBoard initialType="admin" />
        </div>
    );
};

export default AdminBoard;
