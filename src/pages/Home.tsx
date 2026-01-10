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

            <section id="projects-section">
                <ProjectGrid />
                <div className="container" style={{ textAlign: 'center', marginTop: '-40px', marginBottom: '80px' }}>
                    <Link to="/roadmap/projects" className="glass" style={{
                        padding: '12px 24px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--accent-primary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        View Full Project Roadmap →
                    </Link>
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
