import { HashLink } from 'react-router-hash-link';
import ThemeToggle from './ThemeToggle';
import useScrollSpy from '../hooks/useScrollSpy';

const Navbar: React.FC = () => {
  const activeSection = useScrollSpy(['about', 'strategy', 'projects-section', 'infrastructure', 'contact']);

  const getLinkStyle = (id: string) => ({
    color: activeSection === id ? 'var(--accent-primary)' : 'var(--text-secondary)',
    fontWeight: activeSection === id ? 700 : 500,
    transition: 'all 0.3s ease',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center'
  });

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
      borderColor: 'var(--glass-border)'
    }}>
      <div style={{ display: 'flex', gap: '24px', fontSize: '0.85rem', alignItems: 'center' }}>
        <HashLink smooth to="/#about" style={getLinkStyle('about')}>
          About
          {activeSection === 'about' && <ActiveDot />}
        </HashLink>
        <HashLink smooth to="/#strategy" style={getLinkStyle('strategy')}>
          Strategy
          {activeSection === 'strategy' && <ActiveDot />}
        </HashLink>
        <HashLink smooth to="/#projects-section" style={getLinkStyle('projects-section')}>
          Projects
          {activeSection === 'projects-section' && <ActiveDot />}
        </HashLink>
        <HashLink smooth to="/#infrastructure" style={getLinkStyle('infrastructure')}>
          Infrastructure
          {activeSection === 'infrastructure' && <ActiveDot />}
        </HashLink>
        <HashLink smooth to="/#contact" style={getLinkStyle('contact')}>
          Contact
          {activeSection === 'contact' && <ActiveDot />}
        </HashLink>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
