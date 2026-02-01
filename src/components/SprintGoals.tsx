import React from 'react';

const SprintGoals: React.FC = () => {
    const goals = [
        "begin earn your vices app store onboarding",
        "begin to move earn your vides into beta testing",
        "add new app idea video"
    ];

    return (
        <div className="glass" style={{ padding: '24px', marginBottom: '48px', borderLeft: '4px solid var(--accent-primary)' }}>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 700 }}>
                Sprint 26Q1W5/6 Goals
            </h2>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {goals.map((goal, index) => (
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
        </div>
    );
};

export default SprintGoals;
