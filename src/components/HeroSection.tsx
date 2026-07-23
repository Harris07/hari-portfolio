import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'
import Magnet from './Magnet'

const PORTRAIT_URL = '/images/portrait.png'

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    let lastY = window.scrollY
    let scrollTimer: ReturnType<typeof setTimeout>

    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 10)
      if (currentY > lastY && currentY > 60) {
        setNavVisible(false) // scrolling down — hide
      }
      lastY = currentY
      // show again when scroll stops
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => setNavVisible(true), 150)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(scrollTimer) }
  }, [])

  return (
    <section
      className="h-auto sm:h-screen flex flex-col relative pb-8 sm:pb-0 pt-16 md:pt-0"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(241,255,88,0.1) 0%, transparent 65%), #0d0e12', overflowX: 'clip' }}
    >
      {/* Navbar — fixed on mobile, static on desktop */}
      <motion.div
        className="md:hidden fixed top-0 left-0 right-0 z-40"
        animate={{ y: navVisible ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: scrolled ? 'rgba(13,14,18,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'background 0.3s ease, backdrop-filter 0.3s ease'
        }}
      >
        <nav className="flex justify-between items-center px-6 py-4">
          <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/images/h-logo.png" alt="Hari" style={{ height: 36, width: 'auto' }} />
          </a>
          <button
            className="flex flex-col justify-center items-center gap-[5px]"
            style={{ background: 'none', border: 'none', cursor: 'pointer', width: 32, height: 32, padding: 0 }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }}
              style={{ display: 'block', width: 22, height: 2, borderRadius: 2, background: '#D7E2EA' }} />
            <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }}
              style={{ display: 'block', width: 22, height: 2, borderRadius: 2, background: '#D7E2EA' }} />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }}
              style={{ display: 'block', width: 22, height: 2, borderRadius: 2, background: '#D7E2EA' }} />
          </button>
        </nav>
      </motion.div>

      <FadeIn delay={0} y={-20}>
        <nav className="hidden md:flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">

          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img src="/images/h-logo.png" alt="Hari" style={{ height: 40, width: 'auto' }} />
          </a>

          {/* Right nav links */}
          <div className="flex items-center gap-10 md:gap-16">

          {/* Desktop links */}
          {(['About', 'Projects'] as const).map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hidden md:block text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
              style={{ color: '#D7E2EA', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F1FF58')}
              onMouseLeave={e => (e.currentTarget.style.color = '#D7E2EA')}
            >
              {link}
            </a>
          ))}
          <Link
            to="/contact"
            className="hidden md:block text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
            style={{ color: '#D7E2EA', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F1FF58')}
            onMouseLeave={e => (e.currentTarget.style.color = '#D7E2EA')}
          >
            Contact
          </Link>
          <a
            href="/resume.pdf"
            download="Hari Prasad L Product Designer Resume"
            className="hidden md:flex items-center gap-2 text-sm lg:text-base font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
            style={{
              color: '#F1FF58',
              textDecoration: 'none',
              border: '1.5px solid #F1FF58',
              borderRadius: 999,
              padding: '7px 16px',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(241,255,88,0.10)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v13M7 11l5 5 5-5"/>
              <path d="M5 20h14"/>
            </svg>
            Resume
          </a>

          </div>
        </nav>
      </FadeIn>

      {/* Mobile menu overlay — fullscreen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-50 flex flex-col items-center justify-center gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: 'rgba(13,14,18,0.92)', backdropFilter: 'blur(12px)' }}
            onClick={() => setMenuOpen(false)}
          >
            {/* X close button */}
            <button
              onClick={e => { e.stopPropagation(); setMenuOpen(false) }}
              style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: '#D7E2EA', padding: 8 }}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {(['About', 'Projects'] as const).map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.08, duration: 0.35 }}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-semibold uppercase tracking-widest"
                style={{ color: '#D7E2EA', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F1FF58')}
                onMouseLeave={e => (e.currentTarget.style.color = '#D7E2EA')}
              >
                {link}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.35 }}
            >
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-semibold uppercase tracking-widest"
                  style={{ color: '#D7E2EA', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F1FF58')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#D7E2EA')}
                >
                  Contact
                </Link>
              </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.35 }}
            >
              <a
                href="/resume.pdf"
                download="Hari Prasad L Product Designer Resume"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-8 py-3 hover:scale-105 active:scale-95 transition-transform duration-200"
                style={{
                  color: '#F1FF58',
                  textDecoration: 'none',
                  border: '2px solid #F1FF58',
                  borderRadius: 9999,
                  fontFamily: "'Kanit', sans-serif",
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  whiteSpace: 'nowrap',
                  fontSize: '0.75rem',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v13M7 11l5 5 5-5"/>
                  <path d="M5 20h14"/>
                </svg>
                Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Heading */}
      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-bold uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 pl-5"
            style={{ display: 'block' }}
          >
            Hi, i&apos;m Hari
          </h1>
        </FadeIn>
      </div>

      {/* Portrait — absolute on sm+, inline flow on mobile */}
      <FadeIn
        delay={0.6}
        y={30}
        className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:z-10 sm:bottom-0 sm:translate-y-0
                   mx-auto w-[70vw] max-w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] sm:max-w-none
                   flex-shrink-0 mb-10 sm:mb-0"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src={PORTRAIT_URL}
            alt="Hari Prasad L"
            className="w-full h-auto object-contain"
            style={{ willChange: 'transform', display: 'block' }}
          />
        </Magnet>
      </FadeIn>

      {/* Bottom bar */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 mt-auto relative z-20">
        <FadeIn delay={0.35} y={20}>
          <div className="flex flex-col items-start gap-4 max-w-[220px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[440px]">
            <img
              src="/images/hero-badge.png"
              alt="Who Am I?"
              className="w-[90px] sm:w-[110px] md:w-[130px] lg:w-[150px] h-auto object-contain ml-[10px]"
            />
            <p
              className="w-full font-light tracking-wide leading-snug"
              style={{
                color: '#D7E2EA',
                fontSize: 'clamp(0.85rem, 1.6vw, 1.4rem)',
              }}
            >
              A Product (UI/UX) Designer driven by designing meaningful products
              that blend usability, innovation, and visual excellence.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
