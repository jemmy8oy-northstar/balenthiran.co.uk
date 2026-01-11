import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import ThemeToggle from './ThemeToggle';
import useScrollSpy from '../hooks/useScrollSpy';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useScrollSpy(['about', 'strategy', 'projects', 'infrastructure', 'contact']);

  const getLinkStyle = (id: string) => ({
    color: activeSection === id ? 'var(--accent-primary)' : 'var(--text-secondary)',
    fontWeight: activeSection === id ? 700 : 500,
    transition: 'all 0.3s ease',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center'
  });

  const scrollWithOffset = (el: HTMLElement) => {
    const yOffset = -100; // Offset for fixed navbar
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const ActiveDot = () => (
    <div style={{
      position: 'absolute',
      bottom: '-8px',
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      background: 'var(--accent-primary)',
      boxShadow: '0 0 8px var(--accent-primary)'
    }} />
  );

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'max-content',
      padding: '12px 32px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(20px)',
      background: 'var(--bg-card)',
      borderColor: 'var(--glass-border)',
      flexDirection: 'column' as const
    }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)', display: 'none' }} className="mobile-logo">J8.</div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ display: 'none', color: 'var(--text-primary)', fontSize: '1.5rem', padding: '4px' }}
          className="mobile-toggle"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`} style={{ display: 'flex', gap: '24px', fontSize: '0.85rem', alignItems: 'center' }}>
        <HashLink replace smooth to="/#about" scroll={scrollWithOffset} style={getLinkStyle('about')}>
          About
          {activeSection === 'about' && <ActiveDot />}
        </HashLink>
        <HashLink replace smooth to="/#strategy" scroll={scrollWithOffset} style={getLinkStyle('strategy')}>
          Strategy
          {activeSection === 'strategy' && <ActiveDot />}
        </HashLink>
        <HashLink replace smooth to="/#projects" scroll={scrollWithOffset} style={getLinkStyle('projects')}>
          Projects
          {activeSection === 'projects' && <ActiveDot />}
        </HashLink>
        <HashLink replace smooth to="/#infrastructure" scroll={scrollWithOffset} style={getLinkStyle('infrastructure')}>
          Infrastructure
          {activeSection === 'infrastructure' && <ActiveDot />}
        </HashLink>
        <HashLink replace smooth to="/#contact" scroll={scrollWithOffset} style={getLinkStyle('contact')}>
          Contact
          {activeSection === 'contact' && <ActiveDot />}
        </HashLink>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
