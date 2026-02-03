import { useSprint } from '../context/SprintContext';

const SprintGoals: React.FC = () => {
    const { currentSprint, sprints, isLatest } = useSprint();

    // If viewing latest, show the absolute latest sprint goals (the one we are currently in)
    // If viewing historical, show that one
    const displaySprint = isLatest ? sprints[sprints.length - 1] : currentSprint;

    if (!displaySprint || !displaySprint.goals) return null;

    return (
        <div className="glass" style={{ padding: '24px', marginBottom: '48px', borderLeft: '4px solid var(--accent-primary)' }}>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 700 }}>
                Sprint {displaySprint.id} {isLatest && '(Live)'} Goals
            </h2>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {displaySprint.goals.map((goal, index) => (
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
