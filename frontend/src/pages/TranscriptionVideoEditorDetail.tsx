import { Link } from 'react-router-dom';
import ProjectInterestForm from '../components/ProjectInterestForm';

const TranscriptionVideoEditorDetail: React.FC = () => {
    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div style={{ maxWidth: '1100px' }}>
                <header style={{ marginBottom: '64px' }}>
                    <Link to="/" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 600 }}>
                        ← Back to Portfolio
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--bg-card)', padding: '15px' }}>
                            <img src="/balenthiran.svg" alt="Transcription Video Editor" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>Transcription Driven Video Editor</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            color: '#818cf8',
                            fontWeight: 700
                        }}>
                            Productivity
                        </span>
                        <span style={{
                            fontSize: '0.8rem',
                            padding: '6px 16px',
                            borderRadius: '100px',
                            background: 'rgba(251, 191, 36, 0.1)',
                            color: '#fbbf24',
                            fontWeight: 700
                        }}>
                            Planning
                        </span>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '800px' }}>
                        Edit video by editing text. AI transcribes your footage — delete a sentence in the transcript, cut the clip. No timeline scrubbing required.
                    </p>
                </header>

                <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '64px', marginBottom: '80px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>The Problem</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                Video editing is a chore. Scrubbing through a timeline to find the exact moment you stumbled over a word, trimming frame-by-frame, hunting for filler sounds — it's friction that stands between an idea and a published video.
                            </p>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                The solution is simple in concept: if you can read a transcript of what you said, you should be able to edit the video by editing the words. Highlight a mistake, delete it — the clip is gone.
                            </p>
                        </section>

                        <section className="glass" style={{ padding: '32px' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--text-primary)' }}>Planned Features</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>✂️</span>
                                    <div>
                                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Text-Based Cutting</strong>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Select and delete words or sentences in the transcript to automatically cut the corresponding video segment.</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>🔗</span>
                                    <div>
                                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Automatic Gap Management</strong>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Natural-sounding transitions and pauses are created automatically when segments are stitched together.</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>🤫</span>
                                    <div>
                                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Filler Word Removal</strong>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>AI identifies and removes "um", "like", and other filler words automatically to clean up the final cut.</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>🔄</span>
                                    <div>
                                        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Re-take Workflow</strong>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Pause, repeat the line, then find the duplicate in the transcript later and delete the mistake — no scrubbing required.</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Why Build This?</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                Tools like this already exist — subscription models around £10/month. The goal is to build a personal version that costs nothing to run day-to-day, tailored exactly to the workflow I use.
                            </p>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                If it proves useful, there's potential to open it up on a credit-based model — but the primary driver is personal productivity, not a product launch.
                            </p>
                        </section>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <ProjectInterestForm projectSlug="transcription-editor" projectTitle="Transcription Driven Video Editor" />
                        <section className="glass" style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Tech Considerations</h3>
                            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                <li><strong>AI Transcription</strong>: Whisper or similar for accurate speech-to-text</li>
                                <li><strong>Video Processing</strong>: FFmpeg for frame-accurate cuts</li>
                                <li><strong>Interface</strong>: Web or desktop app with side-by-side transcript + preview</li>
                                <li><strong>Export</strong>: Direct render to MP4 ready to upload</li>
                            </ul>
                        </section>

                        <section>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Current Status</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24' }}></div>
                                <span>Planning</span>
                            </div>
                            <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Concept validated. Scoping the MVP and evaluating transcription APIs.
                            </p>
                        </section>
                    </div>
                </div>

                <section className="glass" style={{ padding: '40px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>The Idea Video</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 32px auto' }}>
                        Watch the original walkthrough where I laid out the concept, features, and motivation behind building this tool.
                    </p>
                    <div style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        position: 'relative',
                        paddingBottom: '56.25%',
                        height: 0,
                        overflow: 'hidden',
                        borderRadius: '16px',
                        background: '#000'
                    }}>
                        <iframe
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                            src="https://www.youtube.com/embed/Cn-ehgIPqcU"
                            title="New Project Idea: Transcription Driven Video Editor"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TranscriptionVideoEditorDetail;
