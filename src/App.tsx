import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import GermyDetail from './pages/GermyDetail'
import APEifyDetail from './pages/APEifyDetail'
import TenBeerPlanDetail from './pages/TenBeerPlanDetail'
import ProjectBoard from './pages/ProjectBoard'
import DevOpsBoard from './pages/DevOpsBoard'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from './context/ThemeContext'
import YouTubeDetail from './pages/YouTubeDetail'
import HousePriceAlertsDetail from './pages/HousePriceAlertsDetail'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/germy" element={<GermyDetail />} />
              <Route path="/projects/apeify" element={<APEifyDetail />} />
              <Route path="/projects/tenbeerplan" element={<TenBeerPlanDetail />} />
              <Route path="/roadmap/projects" element={<ProjectBoard />} />
              <Route path="/roadmap/devops" element={<DevOpsBoard />} />
              <Route path="/projects/house-price-alerts" element={<HousePriceAlertsDetail />} />
              <Route path="/youtube" element={<YouTubeDetail />} />
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
            <p>© {new Date().getFullYear()} James Balenthiran.</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
