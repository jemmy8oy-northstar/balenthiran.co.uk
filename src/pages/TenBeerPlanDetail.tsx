import React from 'react';
import { Link } from 'react-router-dom';

const TenBeerPlanDetail: React.FC = () => {
    return (
        <div className="container section-padding" style={{ marginTop: '80px' }}>
            <div style={{ maxWidth: '1100px' }}>
                <header style={{ marginBottom: '64px' }}>
                    <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                        ← Back to Portfolio
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--bg-card)', padding: '15px' }}>
                            <img src="/assets/images/tenbeerplan/tenbeerplan.png" alt="Ten Beer Plan" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>Ten Beer Plan</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            color: 'var(--accent-primary)',
                            fontWeight: 700
                        }}>
                            60,000+ Downloads
                        </span>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(168, 85, 247, 0.1)',
                            color: 'var(--accent-secondary)',
                            fontWeight: 700
                        }}>
                            Social Utility
                        </span>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px' }}>
                        My most successful project to date—a simple yet powerful tool for social coordination that captured a massive audience.
                    </p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '64px', marginBottom: '80px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>The Success Story</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Ten Beer Plan was born from a simple need: making it easier for groups of friends to coordinate social gatherings. By stripping away complexity and focusing on the core utility of "making a plan," the app resonated with users, eventually reaching over 60,000 downloads.
                            </p>
                        </section>

                        <section className="glass" style={{ padding: '32px' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Impact</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                This project taught me the power of simplicity. In a world of bloated social networks, Ten Beer Plan proved that a single-use tool done well can find a significant and loyal user base.
                            </p>
                        </section>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Future Strategy</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Following the **Project Northstar** philosophy, the lessons from Ten Beer Plan are being applied to all my future ventures: build for the user, confirm the demand, and focus on the core value proposition first.
                            </p>
                        </section>
                    </div>
                </div>

                <section className="glass" style={{ padding: '64px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>Coming Soon: Project Post-Mortem</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        I'll be releasing a dedicated video on the YouTube channel soon, breaking down exactly how Ten Beer Plan reached 60k downloads and the technical architecture behind it.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TenBeerPlanDetail;
