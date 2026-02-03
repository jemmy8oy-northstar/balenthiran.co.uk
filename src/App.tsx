import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import GermyDetail from './pages/GermyDetail'
import APEifyDetail from './pages/APEifyDetail'
import TenBeerPlanDetail from './pages/TenBeerPlanDetail'
import Board from './pages/Board'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from './context/ThemeContext'
import YouTubeDetail from './pages/YouTubeDetail'
import HousePriceAlertsDetail from './pages/HousePriceAlertsDetail'
import EarnYourDrinksDetail from './pages/EarnYourDrinksDetail'
import { SprintProvider } from './context/SprintContext'

function App() {
  return (
    <ThemeProvider>
      <SprintProvider>
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
                <Route path="/boards" element={<Board />} />
                <Route path="/projects/house-price-alerts" element={<HousePriceAlertsDetail />} />
                <Route path="/projects/earn-your-drinks" element={<EarnYourDrinksDetail />} />
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
      </SprintProvider>
    </ThemeProvider>
  )
}

export default App
