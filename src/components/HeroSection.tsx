import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'
import Magnet from './Magnet'

const PORTRAIT_URL = '/images/portrait.png'

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section
      className="h-auto sm:h-screen flex flex-col relative pb-8 sm:pb-0"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(241,255,88,0.1) 0%, transparent 65%), #0d0e12', overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-end items-center gap-10 md:gap-16 px-6 md:px-10 pt-6 md:pt-8">

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

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] z-50 relative"
            style={{ background: 'none', border: 'none', cursor: 'pointer', width: 32, height: 32, padding: 0 }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'block', width: 22, height: 2, borderRadius: 2, background: '#D7E2EA' }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: 22, height: 2, borderRadius: 2, background: '#D7E2EA' }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'block', width: 22, height: 2, borderRadius: 2, background: '#D7E2EA' }}
            />
          </button>
        </nav>
      </FadeIn>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="md:hidden fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              className="md:hidden fixed top-0 right-0 h-full z-40 flex flex-col justify-center gap-10 px-10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: '#0d0e12', width: 240, borderLeft: '1px solid rgba(241,255,88,0.08)' }}
            >
              {(['About', 'Projects'] as const).map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-medium uppercase tracking-widest"
                  style={{ color: '#D7E2EA', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F1FF58')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#D7E2EA')}
                >
                  {link}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.24, duration: 0.3 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-medium uppercase tracking-widest"
                  style={{ color: '#D7E2EA', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F1FF58')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#D7E2EA')}
                >
                  Contact
                </Link>
              </motion.div>
            </motion.div>
          </>
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
