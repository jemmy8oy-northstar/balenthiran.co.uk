import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import devopsData from '../data/devops.json';

const PROJECT_COLUMNS = [
    'Backlog',
    'Planning',
    'In Progress',
    'On Hold',
    'On Going - Active',
    'On Going - Passive',
    'Complete',
    'Retired'
];

const DEVOPS_COLUMNS = [
    'Backlog',
    'In Progress',
    'Done'
];

interface KanbanBoardProps {
    initialType: 'project' | 'devops';
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialType }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const columns = useMemo(() => {
        return initialType === 'project' ? PROJECT_COLUMNS : DEVOPS_COLUMNS;
    }, [initialType]);

    const data = useMemo(() => {
        return initialType === 'project' ? projectsData : devopsData;
    }, [initialType]);

    const filteredItems = useMemo(() => {
        // Project board uses 'kanbanStatus', DevOps board uses 'status'
        const statusKey = initialType === 'project' ? 'kanbanStatus' : 'status';
        return data.reduce((acc, item: any) => {
            const status = item[statusKey];
            if (!acc[status]) acc[status] = [];
            acc[status].push(item);
            return acc;
        }, {} as Record<string, any[]>);
    }, [data, initialType]);

    return (
        <section id="kanban" style={{ width: '100%' }}>
            <div
                ref={scrollContainerRef}
                style={{
                    display: 'flex',
                    gap: '24px',
                    overflowX: 'auto',
                    paddingBottom: '24px',
                    scrollbarWidth: 'auto'
                }}
            >
                {columns.map(col => (
                    <div key={col} style={{
                        flex: '0 0 320px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0 12px'
                        }}>
                            <h3 style={{
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: 'var(--text-secondary)'
                            }}>
                                {col}
                            </h3>
                            <span style={{
                                fontSize: '0.7rem',
                                color: 'var(--text-secondary)',
                                background: 'var(--bg-card)',
                                padding: '2px 8px',
                                borderRadius: '10px'
                            }}>
                                {filteredItems[col]?.length || 0}
                            </span>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            minHeight: '100px'
                        }}>
                            {filteredItems[col]?.map(item => (
                                <div key={item.id}>
                                    {item.path ? (
                                        <Link to={item.path} style={{ textDecoration: 'none' }}>
                                            <KanbanCard item={item} />
                                        </Link>
                                    ) : (
                                        <KanbanCard item={item} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const KanbanCard: React.FC<{ item: any }> = ({ item }) => (
    <div className="glass glass-hover" style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        borderLeft: item.status === 'Ongoing' || item.status === 'In Progress' ? '4px solid var(--accent-primary)' : '1px solid var(--glass-border)'
    }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {item.media?.icon && (
                <img
                    src={item.media.icon}
                    alt=""
                    style={{ width: '24px', height: '24px', borderRadius: '4px' }}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/balenthiran.svg'; }}
                />
            )}
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{item.title}</h4>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            {item.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
            <span style={{
                fontSize: '0.65rem',
                color: 'var(--accent-primary)',
                fontWeight: 700,
                textTransform: 'uppercase'
            }}>
                {item.category}
            </span>
        </div>
    </div>
);

export default KanbanBoard;
