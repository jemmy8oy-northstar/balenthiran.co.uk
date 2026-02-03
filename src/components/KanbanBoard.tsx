import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import devopsData from '../data/devops.json';
import youtubeData from '../data/youtube.json';
import adminData from '../data/admin.json';
import { useSprint } from '../context/SprintContext';

const PROJECT_COLUMNS = [
    'Backlog',
    'Planning',
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

const YOUTUBE_COLUMNS = [
    'Backlog',
    'Needs Editing',
    'Needs Thumbnail',
    'Uploaded'
];

const ADMIN_COLUMNS = [
    'Backlog',
    'In Progress',
    'Done'
];

interface KanbanBoardProps {
    initialType: 'project' | 'devops' | 'youtube' | 'admin';
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialType }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { currentSprint, isLatest } = useSprint();

    const columns = useMemo(() => {
        if (initialType === 'project') return PROJECT_COLUMNS;
        if (initialType === 'devops') return DEVOPS_COLUMNS;
        if (initialType === 'admin') return ADMIN_COLUMNS;
        return YOUTUBE_COLUMNS;
    }, [initialType]);

    const rawData = useMemo(() => {
        if (initialType === 'project') return projectsData;
        if (initialType === 'devops') return devopsData;
        if (initialType === 'admin') return adminData;
        return youtubeData;
    }, [initialType]);

    const filteredItems = useMemo(() => {
        const statusKey = initialType === 'project' ? 'kanbanStatus' : 'status';
        
        let displayData = rawData;
        let snapshotMap: Record<string, string> = {};

        if (!isLatest && currentSprint) {
            const snapshot = currentSprint.boardSnapshots[initialType];
            if (snapshot) {
                if (typeof snapshot[0] === 'object') {
                    snapshotMap = snapshot.reduce((acc, s: any) => {
                        acc[s.id] = s.status;
                        return acc;
                    }, {} as Record<string, string>);
                }
                displayData = rawData.filter(item => snapshotMap[item.id] !== undefined);
            }
        }

        return displayData.reduce((acc, item: any) => {
            const status = snapshotMap[item.id] || item[statusKey];
            if (!acc[status]) acc[status] = [];
            acc[status].push(item);
            return acc;
        }, {} as Record<string, any[]>);
    }, [rawData, initialType, isLatest, currentSprint]);

    return (
        <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', overflow: 'hidden' }}>
            <div
                ref={scrollContainerRef}
                style={{
                    display: 'flex',
                    gap: '20px',
                    overflowX: 'auto',
                    padding: '0 4vw 40px 4vw',
                    scrollbarWidth: 'auto',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {columns.map(col => (
                    <div key={col} style={{
                        flex: '0 0 260px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0 8px',
                            marginBottom: '4px'
                        }}>
                            <h3 style={{
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: 'var(--text-secondary)',
                                fontWeight: 700
                            }}>
                                {col}
                            </h3>
                            <span style={{
                                fontSize: '0.65rem',
                                color: 'var(--text-secondary)',
                                background: 'var(--bg-card)',
                                padding: '2px 8px',
                                borderRadius: '10px',
                                border: '1px solid var(--glass-border)'
                            }}>
                                {filteredItems[col]?.length || 0}
                            </span>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
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
        </div>
    );
};

const KanbanCard: React.FC<{ item: any }> = ({ item }) => (
    <div className="glass glass-hover" style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        borderLeft: item.status === 'Ongoing' || item.status === 'In Progress' ? '3px solid var(--accent-primary)' : '1px solid var(--glass-border)'
    }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {item.media?.icon && (
                <img
                    src={item.media.icon}
                    alt=""
                    style={{ width: '20px', height: '20px', borderRadius: '4px' }}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/balenthiran.svg'; }}
                />
            )}
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>{item.title}</h4>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            {item.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
            <span style={{
                fontSize: '0.6rem',
                color: 'var(--accent-primary)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>
                {item.category}
            </span>
        </div>
    </div>
);

export default KanbanBoard;
