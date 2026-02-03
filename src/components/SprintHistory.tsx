import React, { useState } from 'react';
import sprintsData from '../data/sprints.json';

interface SprintHistoryProps {
    boardFilter?: 'project' | 'devops' | 'youtube' | 'admin';
}

const SprintHistory: React.FC<SprintHistoryProps> = ({ boardFilter }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (sprintsData.length === 0) return null;

    // Find latest with goals
    const latestWithGoals = [...sprintsData].reverse().find(s => s.goals && s.goals.length > 0);

    // Filter changes if a boardFilter is provided
    const getSprintChanges = (sprint: any) => {
        if (!boardFilter) return sprint.changes;
        return sprint.changes.filter((c: any) => c.board === boardFilter);
    };

    return (
        <div style={{ marginBottom: '48px' }}>
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: 0,
                    marginBottom: '16px'
                }}
            >
                {isExpanded ? '▼' : '►'} View Sprint History
            </button>

            {isExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {sprintsData.slice().reverse().map((sprint) => {
                        const changes = getSprintChanges(sprint);
                        if (changes.length === 0 && !boardFilter) return null; // Skip if no changes and no specific board

                        const isCurrent = sprint.id === latestWithGoals?.id;
                        const isPlanning = !sprint.goals || sprint.goals.length === 0;

                        return (
                            <div key={sprint.id} className="glass" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                                        Sprint {sprint.id} {isCurrent ? '(current)' : isPlanning ? '(planning)' : ''}
                                    </h3>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        {sprint.startDate} — {sprint.endDate}
                                    </span>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {changes.length > 0 ? (
                                        changes.map((change: any, idx: number) => (
                                            <div key={idx} style={{ fontSize: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>•</span>
                                                <span style={{ color: 'var(--text-primary)' }}>{change.itemId}</span>
                                                <span style={{ color: 'var(--text-secondary)' }}>
                                                    {change.from ? change.from : 'New'} → {change.to}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                            No changes recorded for this board.
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SprintHistory;
