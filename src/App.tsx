import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'
import ToolsSection from './components/ToolsSection'
import ProjectDetailPage from './pages/ProjectDetailPage'
import FitzooDetailPage from './pages/FitzooDetailPage'
import PoshmarkDetailPage from './pages/PoshmarkDetailPage'
import ListingStreaksDetailPage from './pages/ListingStreaksDetailPage'
import ContactPage from './pages/ContactPage'

function HomePage() {
  return (
    <div style={{ backgroundColor: '#242526', overflowX: 'clip', fontFamily: "'Kanit', sans-serif" }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ToolsSection />
      <ProjectsSection />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/project/listing-streaks" element={<ListingStreaksDetailPage />} />
        <Route path="/project/fitzoo" element={<FitzooDetailPage />} />
        <Route path="/project/poshmark-illustration-system" element={<PoshmarkDetailPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
