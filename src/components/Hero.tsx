import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="container section-padding" style={{
            textAlign: 'center',
            marginTop: '60px'
        }}>
            <h1 style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                marginBottom: '24px',
                background: 'linear-gradient(to bottom right, #fff 30%, rgba(255,255,255,0.5))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>
                James Balenthiran
            </h1>
            <p style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                margin: '0 auto 48px',
                fontWeight: 400
            }}>
                Crafting digital experiences, building ambitious app ideas, and documenting the journey from concept to MVP.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <a href="#projects" className="glass" style={{
                    padding: '16px 32px',
                    background: 'var(--accent-primary)',
                    color: '#fff',
                    fontWeight: 600,
                    borderRadius: '50px',
                    border: 'none'
                }}>
                    Explore Projects
                </a>
                <a href="#about" className="glass" style={{
                    padding: '16px 32px',
                    fontWeight: 600,
                    borderRadius: '50px'
                }}>
                    About Me
                </a>
            </div>
        </section>
    );
};

export default Hero;
