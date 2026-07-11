import { Link } from 'react-router-dom'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'
import Magnet from './Magnet'

const PORTRAIT_URL = '/images/portrait.png'

export default function HeroSection() {
  return (
    <section
      className="h-screen flex flex-col relative"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(241,255,88,0.1) 0%, transparent 65%), #0d0e12', overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-end gap-10 md:gap-16 px-6 md:px-10 pt-6 md:pt-8">
          {(['About', 'Projects'] as const).map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
              style={{ color: '#D7E2EA', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F1FF58')}
              onMouseLeave={e => (e.currentTarget.style.color = '#D7E2EA')}
            >
              {link}
            </a>
          ))}
          <Link
            to="/contact"
            className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
            style={{ color: '#D7E2EA', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F1FF58')}
            onMouseLeave={e => (e.currentTarget.style.color = '#D7E2EA')}
          >
            Contact
          </Link>
        </nav>
      </FadeIn>

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
                   mx-auto w-[60vw] max-w-[260px] sm:w-[360px] md:w-[440px] lg:w-[520px] sm:max-w-none
                   flex-shrink-0"
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
