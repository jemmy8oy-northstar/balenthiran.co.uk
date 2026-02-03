import React from 'react';
import { useSprint } from '../context/SprintContext';

const SprintGoals: React.FC = () => {
    const { currentSprint, isLatest } = useSprint();

    if (!currentSprint) return null;

    const hasGoals = currentSprint.goals && currentSprint.goals.length > 0;

    return (
        <div className="glass" style={{ padding: '24px', marginBottom: '48px', borderLeft: '4px solid var(--accent-primary)' }}>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 700 }}>
                Sprint {currentSprint.id} {isLatest && !hasGoals ? '(Planning)' : isLatest ? '(current)' : ''} Goals
            </h2>
            
            {hasGoals ? (
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {currentSprint.goals.map((goal, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <span style={{ 
                                color: 'var(--accent-primary)', 
                                fontWeight: 900,
                                marginTop: '-1px'
                            }}>›</span>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.4' }}>
                                {goal}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.95rem' }}>
                    Sprint goals haven't been set yet.
                </p>
            )}
        </div>
    );
};

export default SprintGoals;
