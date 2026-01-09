import { HashLink } from 'react-router-hash-link';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
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
      background: 'rgba(255, 255, 255, 0.03)',
      borderColor: 'rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ display: 'flex', gap: '32px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)', alignItems: 'center' }}>
        <HashLink smooth to="/#projects" style={{ color: 'var(--text-primary)' }}>Projects</HashLink>
        <HashLink smooth to="/#about">About</HashLink>
        <HashLink smooth to="/#strategy">Strategy</HashLink>
        <HashLink smooth to="/#contact">Contact</HashLink>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
