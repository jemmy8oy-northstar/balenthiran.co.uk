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

            <section id="projects" className="section-padding">
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

            <section id="infrastructure" className="container section-padding">
                <div className="glass" style={{ padding: '64px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Engineering & DevOps</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                        The engine room of the ecosystem. I'm building a robust, transparent infrastructure for all my current and future apps.
                    </p>
                    <Link to="/roadmap/devops" className="glass" style={{
                        padding: '16px 32px',
                        background: 'var(--accent-primary)',
                        color: '#fff',
                        fontWeight: 600,
                        borderRadius: '50px'
                    }}>
                        View Engineering Roadmap
                    </Link>
                </div>
            </section>

            <InterestForm />
        </>
    );
};

export default Home;
