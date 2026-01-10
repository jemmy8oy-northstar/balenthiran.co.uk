import React, { useState } from 'react';

const InterestForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            // Backend integration will happen later
            console.log('Interest registered for:', email);
            setSubmitted(true);
            setEmail('');
        }
    };

    return (
        <section id="contact" className="container section-padding">
            <div className="glass" style={{
                padding: '64px',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
                border: '1px solid var(--accent-primary)'
            }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Have an Idea or Interested?</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                    I'm always working on new concepts. If you're interested in being an early adopter or have your own ideas, drop your email below.
                </p>

                {!submitted ? (
                    <form onSubmit={handleSubmit} style={{
                        display: 'flex',
                        gap: '12px',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                flex: 1,
                                padding: '16px 24px',
                                borderRadius: '50px',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-primary)',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                        <button type="submit" className="glass" style={{
                            padding: '16px 32px',
                            background: 'var(--accent-primary)',
                            color: '#fff',
                            fontWeight: 600,
                            borderRadius: '50px'
                        }}>
                            Join Waitlist
                        </button>
                    </form>
                ) : (
                    <div style={{
                        fontSize: '1.2rem',
                        color: 'var(--accent-primary)',
                        fontWeight: 600
                    }}>
                        Thanks! I'll be in touch.
                    </div>
                )}
            </div>
        </section>
    );
};

export default InterestForm;
