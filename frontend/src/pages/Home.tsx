import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Northstar from '../components/Northstar';
import ProjectGrid from '../components/ProjectGrid';
import InterestForm from '../components/InterestForm';

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
                        <p style={{ color: 'var(--text-secondary)' }}>Ongoing apps, retired projects, and experiments.</p>
                    </div>
                    <ProjectGrid />
                </div>
            </section>

            <InterestForm />
        </>
    );
};

export default Home;
