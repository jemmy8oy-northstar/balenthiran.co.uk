import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectGrid from './components/ProjectGrid'
import InterestForm from './components/InterestForm'
import About from './components/About'
import Northstar from './components/Northstar'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Northstar />
        <ProjectGrid />
        <InterestForm />
      </main>

      <footer className="container" style={{
        padding: '64px 0',
        borderTop: '1px solid var(--glass-border)',
        marginTop: '120px',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem'
      }}>
        <p>© {new Date().getFullYear()} James Balenthiran. Built with React & Antigravity.</p>
      </footer>
    </div>
  )
}

export default App
