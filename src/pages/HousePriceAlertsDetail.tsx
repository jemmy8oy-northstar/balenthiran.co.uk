import React from 'react';
import { Link } from 'react-router-dom';

const HousePriceAlertsDetail: React.FC = () => {
    return (
        <div className="container section-padding" style={{ marginTop: '80px' }}>
            <div style={{ maxWidth: '1100px' }}>
                <header style={{ marginBottom: '64px' }}>
                    <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                        ← Back to Portfolio
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--bg-card)', padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h1 style={{ margin: 0, fontSize: '2rem' }}>🏠</h1>
                        </div>
                        <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>House Price Alerts</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(34, 197, 94, 0.1)',
                            color: '#22c55e',
                            fontWeight: 700
                        }}>
                            95% Complete
                        </span>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(234, 179, 8, 0.1)',
                            color: '#eab308',
                            fontWeight: 700
                        }}>
                            Pending Validation
                        </span>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px' }}>
                        Real-time alerts for property market shifts, built for those looking to rent or buy in a fast-moving market.
                    </p>
                </header>

                <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '64px', marginBottom: '80px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>The "User-First" Pause</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                Technically, House Price Alerts is almost at the finish line. The core engine—which tracks price fluctuations and sends notifications—is functional. However, in line with the Project Northstar philosophy, I've chosen to pause development until there's proven user demand.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                This project is designed to be a heavy lifter in terms of background processing and real-time data ingestion. To ensure the engineering effort matches market interest, the official release is pending community validation.
                            </p>
                        </section>

                        <section className="glass" style={{ padding: '32px' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Planned Features</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Area Subscriptions</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        Follow specific postcodes or customized map areas to get hyper-local data.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Daily Price Checks</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        Automated scrapers check for shifts, reductions, or new listings every 24 hours.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Instant Notifications</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        Get push notifications the moment a property in your watch-list changes price.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>Market Insights</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        View historical trends for areas to determine if it's a "buyer's" or "seller's" market.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <section className="glass" style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Technical Stack</h3>
                            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                <li><strong>Backend</strong>: Node.js / .NET Core worker services.</li>
                                <li><strong>Data Ingestion</strong>: Custom scraping engine with proxy rotation.</li>
                                <li><strong>Database</strong>: PostgreSQL for efficient spatial queries.</li>
                                <li><strong>Notifications</strong>: Firebase Cloud Messaging (FCM).</li>
                            </ul>
                        </section>

                        <section>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Project Status</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></div>
                                <span>On Hold (Awaiting Validation)</span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HousePriceAlertsDetail;
