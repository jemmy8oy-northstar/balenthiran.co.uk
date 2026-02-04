import React, { useState, useMemo } from 'react';
import sprintsData from '../data/sprints.json';
import projectsData from '../data/projects.json';
import devopsData from '../data/devops.json';
import youtubeData from '../data/youtube.json';
import adminData from '../data/admin.json';

interface SprintHistoryProps {
    boardFilter?: 'project' | 'devops' | 'youtube' | 'admin';
    sprintId?: string; // Optional: Only show for this specific sprint
}

const SprintHistory: React.FC<SprintHistoryProps> = ({ boardFilter, sprintId }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Create a lookup for items
    const itemMap = useMemo(() => {
        const map: Record<string, any> = {};
        [...projectsData, ...devopsData, ...youtubeData, ...adminData].forEach(item => {
            map[item.id] = item;
        });
        return map;
    }, []);

    if (sprintsData.length === 0) return null;

    // Filter changes based on sprintId or boardFilter
    const getSprintChanges = (sprint: any) => {
        let changes = sprint.changes || [];
        if (boardFilter) {
            changes = changes.filter((c: any) => c.board === boardFilter);
        }
        return changes;
    };

    // If sprintId is provided, we render a simplified "Sprint Log"
    if (sprintId) {
        const specificSprint = sprintsData.find(s => s.id === sprintId);
        if (!specificSprint) return null;

        const changes = getSprintChanges(specificSprint);
        if (changes.length === 0 && !boardFilter) return null;

        return (
            <div className="glass" style={{ padding: '16px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ opacity: 0.6 }}>📝</span> Sprint Log
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {changes.length > 0 ? (
                        changes.map((change: any, idx: number) => (
                            <SprintChangeRow key={idx} change={change} itemMap={itemMap} boardFilter={boardFilter} />
                        ))
                    ) : (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                            No movements recorded for this board in this sprint.
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default full history view
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
                {isExpanded ? '▼' : '►'} View Global History
            </button>

            {isExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {sprintsData.slice().reverse().map((sprint) => {
                        const changes = getSprintChanges(sprint);
                        if (changes.length === 0 && !boardFilter) return null;
                        if (!sprint.goals || sprint.goals.length === 0) return null;

                        return (
                            <div key={sprint.id} className="glass" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                                        Sprint {sprint.id}
                                    </h3>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        {sprint.startDate} — {sprint.endDate}
                                    </span>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {changes.map((change: any, idx: number) => (
                                        <SprintChangeRow key={idx} change={change} itemMap={itemMap} boardFilter={boardFilter} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const SprintChangeRow: React.FC<{ change: any, itemMap: any, boardFilter?: string }> = ({ change, itemMap, boardFilter }) => (
    <div style={{ fontSize: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>•</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {itemMap[change.itemId]?.youtubeUrl ? (
                <a 
                    href={itemMap[change.itemId].youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                        color: 'var(--accent-primary)', 
                        textDecoration: 'none',
                        fontWeight: 600,
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                >
                    {itemMap[change.itemId]?.title || change.itemId}
                </a>
            ) : (
                <span style={{ color: 'var(--text-primary)' }}>{itemMap[change.itemId]?.title || change.itemId}</span>
            )}
            {!boardFilter && (
                <span style={{ 
                    fontSize: '0.6rem', 
                    color: 'var(--text-secondary)', 
                    textTransform: 'uppercase',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '1px 4px',
                    borderRadius: '3px',
                    letterSpacing: '0.05em'
                }}>{change.board}</span>
            )}
        </div>
        <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {typeof change.to === 'object' && change.to !== null ? (
                <>
                    <span style={{ 
                        fontSize: '0.65rem', 
                        background: 'rgba(52, 211, 153, 0.1)', 
                        color: '#34d399', 
                        padding: '2px 6px', 
                        borderRadius: '4px',
                        fontWeight: 800,
                        border: '1px solid rgba(52, 211, 153, 0.2)'
                    }}>NEW Task</span>
                    <span>— {change.to.status}</span>
                </>
            ) : change.field && change.field !== 'status' ? (
                <>
                    <span style={{ 
                        fontSize: '0.6rem', 
                        color: 'var(--accent-primary)', 
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        background: 'rgba(var(--accent-primary-rgb), 0.1)',
                        padding: '1px 4px',
                        borderRadius: '3px'
                    }}>{change.field} Changed</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{change.from} →</span>
                    <span style={{ fontWeight: 600 }}>{change.to}</span>
                </>
            ) : (
                <>
                    {!change.from ? (
                        <span style={{ 
                            fontSize: '0.65rem', 
                            background: 'rgba(52, 211, 153, 0.1)', 
                            color: '#34d399', 
                            padding: '2px 6px', 
                            borderRadius: '4px',
                            fontWeight: 800,
                            border: '1px solid rgba(52, 211, 153, 0.2)'
                        }}>NEW</span>
                    ) : (
                        <span>{change.from} →</span>
                    )}
                    <span>{change.to}</span>
                </>
            )}
        </span>
    </div>
);

export default SprintHistory;
