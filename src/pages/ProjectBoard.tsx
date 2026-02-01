import React from 'react';
import { Link } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard';
import BoardSwitcher from '../components/BoardSwitcher';
import SprintGoals from '../components/SprintGoals';

const ProjectBoard: React.FC = () => {
    return (
        <div style={{ marginTop: '80px', width: '100%' }}>
            <header className="container" style={{ marginBottom: '48px' }}>
                <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                    ← Back to Portfolio
                </Link>
                
                <SprintGoals />

                <BoardSwitcher initialType="project" />

                <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)' }}>Project Roadmap</h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '16px', marginBottom: '48px' }}>
                    A transparent look at the lifecycle of every app I've built or planned. From initial backlog to long-term retirement.
                </p>
            </header>

            <KanbanBoard initialType="project" />
        </div>
    );
};

export default ProjectBoard;
