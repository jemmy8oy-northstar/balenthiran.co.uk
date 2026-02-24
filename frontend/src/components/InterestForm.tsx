import React, { useState } from 'react';
import { useRegisterGeneralInterestMutation } from '../api/generatedApi';

const InterestForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [registerGeneralInterest, { isLoading, isError }] = useRegisterGeneralInterestMutation();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            try {
                await registerGeneralInterest({
                    registerInterestRequest: { email }
                }).unwrap();
                setSubmitted(true);
                setEmail('');
            } catch (err) {
                console.error('Failed to register interest:', err);
            }
        }
    };

    return (
        <section id="contact" className="container">
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
                    <>
                        <form onSubmit={handleSubmit} className="contact-form" style={{
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
                                disabled={isLoading}
                                style={{
                                    flex: 1,
                                    padding: '16px 24px',
                                    borderRadius: '50px',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--glass-border)',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    opacity: isLoading ? 0.7 : 1
                                }}
                            />
                            <button type="submit" className="glass" disabled={isLoading} style={{
                                padding: '16px 32px',
                                background: 'var(--accent-primary)',
                                color: '#fff',
                                fontWeight: 600,
                                borderRadius: '50px',
                                opacity: isLoading ? 0.7 : 1,
                                cursor: isLoading ? 'not-allowed' : 'pointer'
                            }}>
                                {isLoading ? 'Joining...' : 'Join Waitlist'}
                            </button>
                        </form>
                        {isError && (
                            <div style={{ color: '#ef4444', marginTop: '16px', fontSize: '0.9rem' }}>
                                Something went wrong. Please try again.
                            </div>
                        )}
                    </>
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
