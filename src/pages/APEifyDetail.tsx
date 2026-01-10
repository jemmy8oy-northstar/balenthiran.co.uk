import React from 'react';
import { Link } from 'react-router-dom';

const APEifyDetail: React.FC = () => {
    return (
        <div className="container section-padding" style={{ marginTop: '80px' }}>
            <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontWeight: 600 }}>
                ← Back to Portfolio
            </Link>

            <div style={{ maxWidth: '900px' }}>
                <header style={{ marginBottom: '64px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                        <img src="/balenthiran.svg" alt="APEify" style={{ width: '80px', height: '80px', borderRadius: '20px' }} />
                        <div>
                            <h1 style={{ fontSize: '3.5rem', marginBottom: '8px' }}>APEify</h1>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <span className="glass" style={{ padding: '4px 12px', fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>70,000+ Downloads</span>
                                <span className="glass" style={{ padding: '4px 12px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Flutter & Firebase</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '64px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>The lockdown success story</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                APEify was my second major project, born during the COVID-19 lockdown. A close friend from school had the initial spark for an avatar creator and had begun development, but reached out for technical support to take it to the next level.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                What followed was a true lesson in organic growth. We didn't spend a penny on marketing, yet the app found its audience naturally. People didn't just use the app; they identified with it, adopting their custom-created characters as profile pictures across social media.
                            </p>
                            <div className="glass" style={{ padding: '32px', borderLeft: '4px solid var(--accent-primary)' }}>
                                <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                                    "I've seen viral TikToks of users heading to Uniqlo specifically to print their APEify characters onto t-shirts. It was my first experience of making something that people actually lived with."
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Technical Reflection</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                From an engineering perspective, APEify is fascinating because it has no traditional backend. We used <strong>Flutter</strong> for the UI and <strong>Firebase</strong> as a "backend-as-a-service." The NoSQL database handled everything we needed.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                Looking back, it's an interesting reflection on efficiency vs. complexity. For a project that hit 70k+ users, the Firebase-only stack proved remarkably resilient, allowing us to focus entirely on the user experience rather than server maintenance.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>The Reality of Maintenance</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                Maintaining a successful app alongside life—first University and now a full-time 9-5 job—is a skill in itself. While the app is no longer actively maintained and has been removed from Google Play, its legacy lives on in the tens of thousands of characters still out there in the digital world.
                            </p>
                        </section>
                    </div>

                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div className="glass" style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Project Stats</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Downloads</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>70k+ (Organic)</div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Timeline</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Lockdown 2020</div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-primary)' }}>Retired</div>
                                </div>
                            </div>
                        </div>

                        <div className="glass" style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Tech Stack</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>Flutter</span>
                                <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>Firebase</span>
                                <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>NoSQL</span>
                                <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>App Store only</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default APEifyDetail;
