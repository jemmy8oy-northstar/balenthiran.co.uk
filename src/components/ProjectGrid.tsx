import React from 'react';
import projects from '../data/projects.json';

const ProjectGrid: React.FC = () => {
    return (
        <section id="projects" className="container section-padding">
            <div style={{ marginBottom: '64px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Projects & Ideas</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Ongoing apps, retired projects, and experiments.</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '32px'
            }}>
                {projects.map((project) => (
                    <div key={project.id} className="glass glass-hover" style={{
                        padding: '32px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px'
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '16px',
                            background: 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={project.media.icon}
                                alt={project.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => { (e.target as HTMLImageElement).src = '/balenthiran.svg'; }}
                            />
                        </div>

                        <div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            }}>
                                <h3 style={{ fontSize: '1.5rem' }}>{project.title}</h3>
                                <span style={{
                                    fontSize: '0.7rem',
                                    padding: '4px 12px',
                                    borderRadius: '100px',
                                    background: 'rgba(99, 102, 241, 0.1)',
                                    color: 'var(--accent-primary)',
                                    fontWeight: 600,
                                    textTransform: 'uppercase'
                                }}>
                                    {project.status}
                                </span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                {project.description}
                            </p>
                        </div>

                        <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                            {project.links.appStore && (
                                <a href={project.links.appStore} target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/images/shared/app_store.svg" alt="App Store" style={{ height: '32px' }} />
                                </a>
                            )}
                            {project.links.playStore && (
                                <a href={project.links.playStore} target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/images/shared/google_play.png" alt="Play Store" style={{ height: '32px' }} />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectGrid;
