import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard';
import BoardSwitcher from '../components/BoardSwitcher';
import SprintGoals from '../components/SprintGoals';
import SprintHistory from '../components/SprintHistory';
import SprintNavigator from '../components/SprintNavigator';
import { useSprint } from '../context/SprintContext';

type InternalBoardType = 'project' | 'devops' | 'youtube' | 'admin';

const BOARD_METADATA: Record<InternalBoardType, { title: string; description: string }> = {
    project: {
        title: 'Project Board',
        description: "A transparent look at the lifecycle of every app I've built or planned. From initial backlog to long-term retirement.",
    },
    devops: {
        title: 'Engineering Board',
        description: 'The backend of my digital world. Tracking migrations, infrastructure upgrades, and core engineering milestones.',
    },
    youtube: {
        title: 'Content Board',
        description: 'Tracking the pipeline of engineering videos, project breakdowns, and build-in-public sessions for the jemmy8oy channel.',
    },
    admin: {
        title: 'Platform Board',
        description: 'Managing the jemmy8oy brand presence. Tracking social media setups, newsletter launches, and platform growth.',
    }
};

const Board: React.FC = () => {
    const [boardType, setBoardType] = useState<InternalBoardType>('project');
    const { activeSprintId } = useSprint();

    const metadata = BOARD_METADATA[boardType];

    return (
        <div style={{ marginTop: '80px', width: '100%' }}>
            <header className="container" style={{ marginBottom: '48px' }}>
                <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                    ← Back to Portfolio
                </Link>
                
                <SprintNavigator />

                <SprintGoals />

                <BoardSwitcher currentType={boardType} onTypeChange={setBoardType} />

                <div style={{ marginBottom: '48px' }}>
                    <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)', marginBottom: '16px' }}>{metadata.title}</h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '32px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        {metadata.description}
                    </p>

                    <SprintHistory boardFilter={boardType} sprintId={activeSprintId} />
                </div>
            </header>

            <KanbanBoard initialType={boardType} />
        </div>
    );
};

export default Board;
