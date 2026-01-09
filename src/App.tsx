import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import GermyDetail from './pages/GermyDetail'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/germy" element={<GermyDetail />} />
          </Routes>
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
    </Router>
  )
}

export default App
