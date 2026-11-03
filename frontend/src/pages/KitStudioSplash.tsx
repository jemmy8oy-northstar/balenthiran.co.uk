import React from 'react';
import ProjectInterestForm from '../components/ProjectInterestForm';

const KitStudioSplash: React.FC = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <section className="container" style={{
                textAlign: 'center',
                padding: '96px 20px 48px',
                maxWidth: '640px'
            }}>
                <h1 style={{
                    fontSize: 'clamp(4rem, 16vw, 7rem)',
                    marginBottom: '16px',
                    background: 'linear-gradient(to bottom right, var(--text-primary) 30%, rgba(148, 163, 184, 0.5))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.1
                }}>
                    Kit
                </h1>
                <p style={{
                    fontSize: 'clamp(1.15rem, 4.5vw, 1.5rem)',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    margin: '0 auto 24px'
                }}>
                    Describe the app. Kit specs it, builds it and ships it.
                </p>
                <p style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    margin: '0 auto 40px'
                }}>
                    Kit turns your notes into a living spec, and an AI engineer builds from that spec while you sleep. Early access is opening soon.
                </p>
                <div style={{ textAlign: 'left' }}>
                    <ProjectInterestForm projectSlug="kit" projectTitle="Kit" />
                </div>
            </section>
            <footer className="container" style={{
                padding: '32px 0',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem'
            }}>
                <p>© {new Date().getFullYear()} James Balenthiran</p>
            </footer>
        </div>
    );
};

export default KitStudioSplash;
