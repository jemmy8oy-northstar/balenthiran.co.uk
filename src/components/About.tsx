import React from 'react';

const About: React.FC = () => {
    return (
        <section id="about" className="container section-padding">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '3rem', marginBottom: '24px', lineHeight: 1.1 }}>
                        The Journey to <span style={{ color: 'var(--accent-primary)' }}>Millions</span>
                    </h2>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <p>
                            I've been writing code since I was 10 years old. What started as curiosity evolved into a professional career as a software engineer and a lifelong passion for building digital products.
                        </p>
                        <p>
                            My philosophy is simple: **transparency**. On my <a href="https://www.youtube.com/@JamesBalenthiran" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>YouTube channel</a>, I share the "good, the bad, and the ugly" of mobile app development. I'm not just here to show the final product; I'm here to document the whole story—from the first spark of an idea to marketing and navigating the hurdles of the App Store.
                        </p>
                        <p>
                            I've built four mobile apps so far, with one reaching over **60,000 downloads**. But I'm just getting started. My ultimate goal is the "Million User" dream—building an application that creates massive value for millions of people worldwide.
                        </p>
                    </div>

                    <div style={{ marginTop: '40px', display: 'flex', gap: '32px' }}>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>60k+</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Downloads</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>4</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Apps Built</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>15+</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years Coding</div>
                        </div>
                    </div>
                </div>

                <div className="glass" style={{
                    padding: '40px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <h3 style={{ marginBottom: '24px' }}>My Core Values</h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <li style={{ display: 'flex', gap: '16px' }}>
                            <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>01</span>
                            <div>
                                <strong style={{ display: 'block', color: '#fff' }}>Lifelong Learning</strong>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>I don't claim to know it all. I am committed to learning and growing alongside my community.</span>
                            </div>
                        </li>
                        <li style={{ display: 'flex', gap: '16px' }}>
                            <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>02</span>
                            <div>
                                <strong style={{ display: 'block', color: '#fff' }}>Authentic Storytelling</strong>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Documenting the roadblocks and overcome challenges, inspired by the transparency of creators like Code Bullet.</span>
                            </div>
                        </li>
                        <li style={{ display: 'flex', gap: '16px' }}>
                            <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>03</span>
                            <div>
                                <strong style={{ display: 'block', color: '#fff' }}>Holistic Development</strong>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Focusing on the entire lifecycle: idea, design, code, user testing, and marketing.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default About;
