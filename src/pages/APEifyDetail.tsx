import React from 'react';
import { Link } from 'react-router-dom';

const APEifyDetail: React.FC = () => {
    return (
        <div className="container section-padding" style={{ marginTop: '80px' }}>
            <header style={{ marginBottom: '64px' }}>
                <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                    ← Back to Portfolio
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--bg-card)', padding: '15px' }}>
                        <img src="/assets/images/apeify/apeify.png" alt="APEify" style={{ width: '100%', height: '100%' }} />
                    </div>
                    <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>APEify</h1>
                </div>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px' }}>
                    A robust character tracking and progression application built for power users.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '64px', marginBottom: '80px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <section>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Overview</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            APEify is designed to handle complex character data with ease. Whether you're tracking stats, progression milestones, or gear, APEify provides a streamlined, premium interface to manage your digital assets.
                        </p>
                    </section>

                    <section className="glass" style={{ padding: '32px' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Tech Stack</h2>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)' }}>
                            <li>• **Frontend**: High-performance mobile UI built with Flutter.</li>
                            <li>• **Backend**: Real-time data sync and authentication via Firebase.</li>
                            <li>• **UX**: Focus on speed, reliability, and "at a glance" information.</li>
                        </ul>
                    </section>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <section>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Key Features</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>✓</span>
                                <div>
                                    <strong style={{ color: 'var(--text-primary)' }}>Cloud Sync</strong>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your data is always with you, synced across devices in real-time.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>✓</span>
                                <div>
                                    <strong style={{ color: 'var(--text-primary)' }}>Premium UI</strong>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>A clean, modern aesthetic that makes tracking a joy, not a chore.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>✓</span>
                                <div>
                                    <strong style={{ color: 'var(--text-primary)' }}>Progression Insights</strong>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Visualize your growth with detailed character breakdowns.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <section className="glass" style={{ padding: '40px', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '32px', color: 'var(--text-primary)' }}>Development Insights</h2>
                <div style={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    overflow: 'hidden',
                    borderRadius: '16px',
                    background: '#000'
                }}>
                    <iframe
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        src="https://www.youtube.com/embed/8H3MIFCKje8"
                        title="APEify - Project Showcase"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>
        </div>
    );
};

export default APEifyDetail;
