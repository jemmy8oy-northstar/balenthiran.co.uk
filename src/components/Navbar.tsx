import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'max-content',
      minWidth: '400px',
      padding: '12px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(20px)',
      background: 'rgba(255, 255, 255, 0.03)',
      borderColor: 'rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.05em' }}>
        JB
      </div>
      <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
        <a href="#projects" style={{ color: 'var(--text-primary)' }}>Projects</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
