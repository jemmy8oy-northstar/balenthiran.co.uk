import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Northstar from '../components/Northstar';
import ProjectGrid from '../components/ProjectGrid';
import InterestForm from '../components/InterestForm';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <About />
            <Northstar />

            <section id="projects">
                <div className="container">
                    <div style={{ marginBottom: '64px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Projects & Ideas</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
                            <p style={{ color: 'var(--text-secondary)' }}>Ongoing apps, retired projects, and experiments.</p>
                            <Link to="/roadmap/projects" style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                                View Full Roadmap →
                            </Link>
                        </div>
                    </div>
                    <ProjectGrid />
                </div>
            </section>

            <section id="infrastructure" className="container">
                <div className="glass mobile-tight-padding" style={{ padding: '64px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Engineering & Platform</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                        The engine room of the ecosystem. Tracking technical infrastructure and jemmy8oy brand growth.
                    </p>
                    <div className="hero-actions" style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <Link to="/roadmap/devops" className="glass" style={{
                            padding: '16px 32px',
                            background: 'var(--accent-primary)',
                            color: '#fff',
                            fontWeight: 600,
                            borderRadius: '50px',
                            display: 'inline-block'
                        }}>
                            View Engineering Roadmap
                        </Link>
                        <Link to="/roadmap/admin" className="glass" style={{
                            padding: '16px 32px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: 'var(--text-primary)',
                            fontWeight: 600,
                            borderRadius: '50px',
                            display: 'inline-block',
                            border: '1px solid var(--glass-border)'
                        }}>
                            View Platform Roadmap
                        </Link>
                    </div>
                </div>
            </section>

            <InterestForm />
        </>
    );
};

export default Home;
