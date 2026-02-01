import React from 'react';
import { Link } from 'react-router-dom';

interface BoardSwitcherProps {
    initialType: 'project' | 'devops' | 'youtube' | 'admin';
}

const BoardSwitcher: React.FC<BoardSwitcherProps> = ({ initialType }) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
            justifyContent: 'flex-start'
        }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Switch View:</span>
            <div className="glass" style={{ display: 'flex', padding: '4px', gap: '4px', borderRadius: '12px' }}>
                <Link to="/roadmap/projects" style={{ textDecoration: 'none' }}>
                    <div style={{
                        padding: '6px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: initialType === 'project' ? 'var(--accent-primary)' : 'transparent',
                        color: initialType === 'project' ? '#fff' : 'var(--text-secondary)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease'
                    }}>
                        Project Board
                    </div>
                </Link>
                <Link to="/roadmap/devops" style={{ textDecoration: 'none' }}>
                    <div style={{
                        padding: '6px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: initialType === 'devops' ? 'var(--accent-primary)' : 'transparent',
                        color: initialType === 'devops' ? '#fff' : 'var(--text-secondary)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease'
                    }}>
                        Engineering Board
                    </div>
                </Link>
                <Link to="/roadmap/youtube" style={{ textDecoration: 'none' }}>
                    <div style={{
                        padding: '6px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: initialType === 'youtube' ? 'var(--accent-primary)' : 'transparent',
                        color: initialType === 'youtube' ? '#fff' : 'var(--text-secondary)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease'
                    }}>
                        Content Board
                    </div>
                </Link>
                <Link to="/roadmap/admin" style={{ textDecoration: 'none' }}>
                    <div style={{
                        padding: '6px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: initialType === 'admin' ? 'var(--accent-primary)' : 'transparent',
                        color: initialType === 'admin' ? '#fff' : 'var(--text-secondary)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease'
                    }}>
                        Platform Board
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default BoardSwitcher;
