import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGetProjectsQuery } from '../api/staticDataApi';
import devopsData from '../data/devops.json';
import youtubeData from '../data/youtube.json';
import adminData from '../data/admin.json';
import reposData from '../data/repos.json';
import { useSprint } from '../context/SprintContext';

type ReposData = Record<string, { url: string; displayName: string }>;

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
    const { currentSprint, sprints } = useSprint();
    const { data: projectsData = [] } = useGetProjectsQuery();

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
    }, [initialType, projectsData]);

    const filteredItems = useMemo(() => {
        let displayData = rawData;
        
        // 1. Group items by status from the current snapshot
        const groups = displayData.reduce((acc, item: any) => {
            const snapshotItem = currentSprint?.boardSnapshots[initialType]?.find((s: any) => s.id === item.id);
            const status = snapshotItem?.status;
            if (status) {
                if (!acc[status]) acc[status] = [];
                acc[status].push({
                    ...item,
                    title: snapshotItem.title || item.title,
                    description: snapshotItem.description || item.description,
                    currentStatus: status 
                });
            }
            return acc;
        }, {} as Record<string, any[]>);

        // 2. Sort items within each column based on latest movement
        Object.keys(groups).forEach(status => {
            groups[status].sort((a, b) => {
                const getMovementScore = (item: any) => {
                    let topSprintIdx = -1;
                    let topChangeIdx = -1;

                    sprints.forEach((s, sIdx) => {
                        (s.changes || []).forEach((c: any, cIdx) => {
                            if (c.itemId === item.id && c.board === initialType) {
                                const toStatus = typeof c.to === 'object' ? c.to.status : c.to;
                                if (toStatus === item.currentStatus) {
                                    topSprintIdx = sIdx;
                                    topChangeIdx = cIdx;
                                }
                            }
                        });
                    });

                    return (topSprintIdx * 1000) + topChangeIdx;
                };

                return getMovementScore(b) - getMovementScore(a);
            });
        });

        return groups;
    }, [rawData, initialType, currentSprint, sprints]);

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
                            {filteredItems[col]?.map((item: any) => {
                                const isYoutube = initialType === 'youtube';
                                const singleRepoUrl = !isYoutube && !item.path && !item.youtubeUrl && item.repos?.length === 1
                                    ? (reposData as ReposData)[item.repos[0]]?.url
                                    : null;
                                const card = (
                                    <KanbanCard
                                        item={item}
                                        reposData={reposData as ReposData}
                                        showRepos={!isYoutube}
                                    />
                                );
                                return (
                                    <div key={item.id}>
                                        {item.path ? (
                                            <Link to={item.path} style={{ textDecoration: 'none' }}>{card}</Link>
                                        ) : item.youtubeUrl ? (
                                            <a href={item.youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{card}</a>
                                        ) : singleRepoUrl ? (
                                            <a href={singleRepoUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{card}</a>
                                        ) : (
                                            card
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const KanbanCard: React.FC<{ item: any; reposData?: ReposData; showRepos?: boolean }> = ({ item, reposData = {}, showRepos = false }) => (
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px', flexWrap: 'wrap', gap: '6px' }}>
            <span style={{
                fontSize: '0.6rem',
                color: 'var(--accent-primary)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>
                {item.category}
            </span>
            {showRepos && item.repos?.length > 0 && (
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {item.repos.map((slug: string) => {
                        const repo = reposData[slug];
                        if (!repo) return null;
                        return (
                            <a
                                key={slug}
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                style={{
                                    fontSize: '0.55rem',
                                    color: 'var(--text-secondary)',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '4px',
                                    padding: '2px 6px',
                                    textDecoration: 'none',
                                    fontFamily: 'monospace',
                                    lineHeight: '1.4'
                                }}
                            >
                                {repo.displayName}
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    </div>
);

export default KanbanBoard;
