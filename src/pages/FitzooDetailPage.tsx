import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Flame, BarChart2, Footprints, GraduationCap, Share2 } from 'lucide-react'
import NextProjectSection from '../components/NextProjectSection'
import { PROJECTS } from '../data/projects'

/* ─── tokens ─── */
const O = '#FF5C2B'
const BG = '#0d0e12'
const WHITE = '#ffffff'
const MUTED = 'rgba(255,255,255,0.42)'
const BORDER = 'rgba(255,255,255,0.07)'

/* ─── helpers ─── */
function FadeUp({ children, delay = 0, className = '', style }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  )
}

function FadeIn({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9, ease: 'easeOut', delay }}>
      {children}
    </motion.div>
  )
}

function Phone({ src, alt = '', delay = 0, rotate = 0, shadow = true }: {
  src: string; alt?: string; delay?: number; rotate?: number; shadow?: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 60, rotate: rotate * 0.4 }}
      animate={inView ? { opacity: 1, y: 0, rotate } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ flexShrink: 0, filter: shadow ? 'drop-shadow(0 40px 80px rgba(0,0,0,0.7))' : 'none' }}>
      <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1.5px solid rgba(255,255,255,0.1)', background: '#13141a' }}>
        <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
      </div>
    </motion.div>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
      style={{ color: O, background: 'rgba(255,92,43,0.1)', border: '1px solid rgba(255,92,43,0.25)' }}>
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="uppercase tracking-[0.22em] text-xs font-semibold mb-3" style={{ color: O }}>{children}</p>
}

function Heading({ children, size = 'lg' }: { children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const s = { sm: '1.5rem', md: '2rem', lg: 'clamp(2.2rem,4vw,3.2rem)', xl: 'clamp(3rem,6vw,5rem)' }
  return <h2 className="font-semibold leading-tight" style={{ color: WHITE, fontSize: s[size] }}>{children}</h2>
}

function Body({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-light leading-[1.75] ${className}`} style={{ color: MUTED, fontSize: 'clamp(0.92rem,1.3vw,1.05rem)' }}>{children}</p>
}

/* ─── page ─── */
export default function FitzooDetailPage() {
  const currentIndex = PROJECTS.findIndex(p => p.id === 'fitzoo')
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  return (
    <div style={{ backgroundColor: BG, fontFamily: "'Poppins', sans-serif", overflowX: 'hidden' }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ background: 'rgba(13,14,18,0.82)', backdropFilter: 'blur(18px)', borderBottom: `1px solid ${BORDER}` }}>
        <Link to="/" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest hover:opacity-50 transition-opacity"
          style={{ color: WHITE, textDecoration: 'none' }}>
          <ArrowLeft size={13} /> Portfolio
        </Link>
        <Chip>Personal</Chip>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-20"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,92,43,0.18) 0%, transparent 65%), ${BG}` }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />

        <motion.div className="relative z-10 px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          {/* app icon */}
          <motion.div className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="w-20 h-20 rounded-3xl overflow-hidden"
              style={{ border: '2px solid rgba(255,255,255,0.1)', boxShadow: `0 0 40px rgba(255,92,43,0.35)` }}>
              <img src="/images/fitzoo/logo.png" alt="Fitzoo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>

          <motion.p className="uppercase tracking-[0.3em] text-xs font-semibold mb-5" style={{ color: O }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            UI / UX Case Study
          </motion.p>

          <motion.h1 className="font-semibold leading-none mb-6"
            style={{ color: WHITE, fontSize: 'clamp(5rem, 15vw, 12rem)', textTransform: 'none', fontWeight: 700, letterSpacing: '0.005em' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
            Fitz<span style={{ color: O }}>oo</span>
          </motion.h1>

          <motion.p className="font-light mb-12 mx-auto max-w-md" style={{ color: MUTED, fontSize: 'clamp(1rem,1.8vw,1.2rem)' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
            A gamified fitness app that turns workouts into games you can't quit.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.6 }}>
            {[
              { l: 'Role', v: 'End-to-End UI/UX' },
              { l: 'Platform', v: 'Mobile App' },
              { l: 'Tools', v: 'Figma' },
              { l: 'Timeline', v: '8 Weeks' },
            ].map(({ l, v }) => (
              <div key={l} className="px-5 py-3 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}`, backdropFilter: 'blur(8px)' }}>
                <span className="uppercase tracking-widest text-xs block mb-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>{l}</span>
                <span className="font-semibold text-sm" style={{ color: WHITE }}>{v}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* 3 phones fan */}
        <motion.div className="relative z-10 flex items-end justify-center gap-4 sm:gap-8 px-6"
          style={{ marginBottom: '-80px' }}
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}>
          <div style={{ width: 'clamp(155px, 25vw, 250px)' }}>
            <Phone src="/images/fitzoo/splash.png" alt="Splash" delay={0.55} rotate={-6} />
          </div>
          <div style={{ width: 'clamp(155px, 25vw, 250px)', marginBottom: '40px' }}>
            <Phone src="/images/fitzoo/hero-center.png" alt="Home screen" delay={0.45} rotate={0} />
          </div>
          <div style={{ width: 'clamp(155px, 25vw, 250px)' }}>
            <Phone src="/images/fitzoo/hero-right.png" alt="Game" delay={0.6} rotate={6} />
          </div>
        </motion.div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="pt-44 pb-28 px-6 md:px-10"
        style={{ background: `linear-gradient(180deg, ${BG} 0%, #0f1016 100%)` }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <SectionLabel>Overview</SectionLabel>
              <Heading>What if fitness felt like a game?</Heading>
            </FadeUp>
            <FadeUp delay={0.1} className="md:pt-12">
              <Body>Most people quit fitness apps within the first month — not because they lack motivation, but because tracking reps and calories is boring. Fitzoo replaces that with three real-time mini-games, a streak system, daily diet check-ins, and a multi-tier coach platform. As the sole UI/UX designer, I owned the full product — 12+ screens, end to end.</Body>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Gamification', 'Mobile App', 'Onboarding', 'Coach System', 'Diet Tracking'].map(t => (
                  <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${BORDER}`, color: 'rgba(255,255,255,0.5)' }}>{t}</span>
                ))}
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={0.15} className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { v: '80%', d: 'of fitness app users quit within 30 days' },
              { v: '3×', d: 'higher retention with rewards + game loops' },
              { v: '0', d: 'gamified fitness apps in the Indian market' },
            ].map(({ v, d }) => (
              <div key={v} className="p-7 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                <span className="font-semibold block mb-2" style={{ color: O, fontSize: 'clamp(2.4rem,4vw,3.2rem)', lineHeight: 1 }}>{v}</span>
                <span className="text-sm font-light" style={{ color: MUTED }}>{d}</span>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── USER PERSONAS ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#0a0b0f' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-14">
            <SectionLabel>User Personas</SectionLabel>
            <Heading>Who keeps quitting?</Heading>
            <Body className="mt-4 max-w-xl">Four real archetypes who want to be fit — but keep falling off. Fitzoo was designed around their patterns.</Body>
          </FadeUp>
        </div>
        {/* Two-column staggered layout */}
        {(() => {
          const personas = [
            { name: 'Vijayalakshmi', age: 30, role: 'Chief Executive Officer', image: "/images/fitzoo/Viji's 3d mascot 1.png", quote: "I've tried five apps. They all feel the same after day 3.", painPoints: ['Gets bored fast and needs novelty to stay consistent', 'Streak systems alone aren\'t enough to hold her attention'], need: 'Variety, visible progress, and something that feels fresh every session.', tags: ['Boredom plateau', 'Needs variety', 'No visible progress'] },
            { name: 'Sarvesh', age: 26, role: 'Software Engineer', image: "/images/fitzoo/Sarvesh's 3d mascot 1.png", quote: "I know what to do — I just don't feel like it after work.", painPoints: ['Long work hours drain all energy for evening exercise', 'Fitness apps feel like one more task on the to-do list'], need: 'A low-effort entry point that builds momentum without decision fatigue.', tags: ['Decision fatigue', 'Low energy evenings', 'App feels like work'] },
            { name: 'Kiara', age: 24, role: 'College Student', image: '/images/fitzoo/Kiara 3d mascot 1.png', quote: 'I start strong every January, then life happens.', painPoints: ['Loses motivation after 2 weeks without accountability', 'Calorie tracking feels overwhelming and leads to quitting'], need: 'A low-friction habit loop that doesn\'t feel like homework.', tags: ['No accountability', 'Overwhelmed by data', 'Inconsistent schedule'] },
            { name: 'Krishna', age: 33, role: 'Business Owner', image: "/images/fitzoo/Krishna's 3d mascot 1.png", imgScale: 1.1, quote: 'I eat whatever I want and somehow still expect results.', painPoints: ['Skips diet check-ins and has inconsistent workout timing', 'No structure or coach to surface blind spots and keep him on track'], need: 'A system that surfaces blind spots without requiring daily effort.', tags: ['No structure', 'Diet blind spots', 'Skips check-ins'] },
          ]
          const renderCard = ({ name, age, role, image, imgScale, quote, painPoints, need, tags }: typeof personas[0], i: number) => (
            <FadeUp key={name} delay={i * 0.1}>
              <div className="flex rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
                <div className="flex items-end justify-center flex-shrink-0 overflow-hidden"
                  style={{ width: 150, background: 'rgba(255,92,43,0.08)', borderRight: '1px solid rgba(255,92,43,0.12)' }}>
                  <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', transform: imgScale ? `scale(${imgScale})` : undefined, transformOrigin: 'bottom center' }} />
                </div>
                <div className="flex flex-col flex-1" style={{ gap: 12, padding: '20px' }}>
                  <div>
                    <p className="font-semibold" style={{ color: WHITE, fontSize: '0.95rem', lineHeight: 1.3 }}>{name}, {age}</p>
                    <p className="font-light mt-0.5" style={{ color: MUTED, fontSize: '0.75rem' }}>{role}</p>
                  </div>
                  <p className="font-medium leading-snug" style={{ color: 'rgba(255,92,43,0.85)', fontSize: '0.82rem', fontStyle: 'italic' }}>"{quote}"</p>
                  <div>
                    <p className="font-semibold mb-1.5" style={{ color: WHITE, fontSize: '0.63rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Pain Points</p>
                    <ul className="flex flex-col gap-1">
                      {painPoints.map((pt, j) => (
                        <li key={j} className="flex gap-1.5 items-start">
                          <span className="flex-shrink-0 rounded-full" style={{ width: 3, height: 3, background: 'rgba(255,92,43,0.6)', marginTop: 5 }} />
                          <span className="font-light leading-snug" style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.72rem' }}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1.5" style={{ color: WHITE, fontSize: '0.63rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Core Need</p>
                    <p className="font-light leading-snug" style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.72rem' }}>{need}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map(t => (
                      <span key={t} className="font-medium" style={{ fontSize: '0.62rem', padding: '2px 8px', borderRadius: 9999, background: 'rgba(255,92,43,0.08)', border: '1px solid rgba(255,92,43,0.18)', color: 'rgba(255,92,43,0.75)', letterSpacing: '0.02em' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          )
          return (
            <>
              {/* Mobile: single column */}
              <div className="flex flex-col md:hidden max-w-5xl mx-auto" style={{ gap: 30 }}>
                {personas.map((p, i) => renderCard(p, i))}
              </div>
              {/* Desktop: 2-column staggered */}
              <div className="hidden md:grid max-w-5xl mx-auto grid-cols-2" style={{ gap: 30 }}>
                <div className="flex flex-col" style={{ gap: 30, paddingTop: 60 }}>
                  {personas.filter((_, i) => i % 2 === 0).map((p, i) => renderCard(p, i * 2))}
                </div>
                <div className="flex flex-col" style={{ gap: 30 }}>
                  {personas.filter((_, i) => i % 2 === 1).map((p, i) => renderCard(p, i * 2 + 1))}
                </div>
              </div>
            </>
          )
        })()}
      </section>

      {/* ── ONBOARDING — warm dark ── */}
      <section className="py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a0800 0%, #2d1000 40%, #1a0800 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="text-center mb-16">
            <SectionLabel>Onboarding</SectionLabel>
            <Heading>Play. Eat. Track.</Heading>
            <p className="mt-4 mx-auto max-w-lg font-light" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1rem' }}>
              Three screens. Three promises. No forms, no friction — just momentum.
            </p>
          </FadeUp>
        </div>
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-center gap-10 sm:gap-8 px-4" style={{ maxWidth: 880, margin: '0 auto', paddingBottom: 20 }}>
            {[
              { src: '/images/fitzoo/getstarted1.png', label: '01 — Play', sub: 'Fall in Love with Working Out', rot: -6, d: 0.05 },
              { src: '/images/fitzoo/getstarted2.png', label: '02 — Eat', sub: 'Simplified Diets for Everyone', rot: 0, d: 0.12 },
              { src: '/images/fitzoo/getstarted3.png', label: '03 — Track', sub: 'Learn from Your Progress', rot: 6, d: 0.19 },
            ].map(({ src, label, sub, rot, d }) => (
              <div key={label} className="flex flex-col items-center w-full sm:flex-1 max-w-[200px] sm:max-w-[250px] mx-auto sm:mx-0" style={{ gap: 40 }}>
                <Phone src={src} alt={label} delay={d} rotate={rot} />
                <FadeUp delay={d + 0.12} className="text-center">
                  <span className="block font-bold text-xs uppercase tracking-widest" style={{ color: O }}>{label}</span>
                  <span className="block text-xs font-light mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{sub}</span>
                </FadeUp>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* login card */}
        <div className="max-w-5xl mx-auto px-6 md:px-10 mt-20">
          <div className="flex flex-col md:flex-row items-center gap-12 p-8 rounded-3xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ width: 'clamp(150px,18vw,190px)', flexShrink: 0 }}>
              <Phone src="/images/fitzoo/login.png" alt="Login" delay={0.05} rotate={-1} />
            </div>
            <FadeUp delay={0.1} className="flex-1">
              <SectionLabel>Sign In</SectionLabel>
              <Heading size="md">Zero friction. Mobile OTP only.</Heading>
              <Body className="mt-4">No email. No password. Download to first game in under 60 seconds. A 6-step profile flow personalises the experience before they even hit the dashboard.</Body>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── HOME SCREEN ── */}
      <section className="py-28 overflow-hidden" style={{ background: '#080a0f' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <SectionLabel>Home Screen</SectionLabel>
              <Heading>Everything at a glance.</Heading>
              <Body className="mt-5">Streak, calories, circuit time, three game cards, weekly progress rings, weight delta, assigned coach — all in one scroll. Nothing hidden, nothing needing a second tap.</Body>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { icon: <Flame size={16} fill="#FF5C2B" color="#FF5C2B" />,        t: 'Streak counter' },
                  { icon: <img src="/images/fitzoo/icon-games.svg" style={{ width: 16, height: 16, objectFit: 'contain' }} alt="" />, t: '3 Game cards' },
                  { icon: <BarChart2 size={16} fill="#FF5C2B" color="#FF5C2B" />,    t: 'Weekly progress' },
                  { icon: <img src="/images/fitzoo/icon-weight.svg" style={{ width: 16, height: 16, objectFit: 'contain' }} alt="" />, t: 'Weight delta' },
                  { icon: <Footprints size={16} fill="#FF5C2B" color="#FF5C2B" />,   t: 'Freestyle mode' },
                  { icon: <GraduationCap size={16} fill="#FF5C2B" color="#FF5C2B" />,t: 'Coach panel' },
                ].map(({ icon, t }) => (
                  <div key={t} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                    <span className="flex-shrink-0">{icon}</span>
                    <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{t}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeIn delay={0.1} className="flex justify-center lg:justify-end">
              <div style={{ width: 'clamp(200px,26vw,280px)' }}>
                <Phone src="/images/fitzoo/home-screen.png" alt="Home screen" delay={0.08} rotate={3} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── GAMES ── */}
      <section className="py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d0e12 0%, #18100a 60%, #0d0e12 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="text-center mb-16">
            <SectionLabel>Game Starts</SectionLabel>
            <Heading>Your workout is now a game.</Heading>
            <p className="mt-4 mx-auto max-w-md font-light" style={{ color: MUTED, fontSize: '1rem' }}>
              Three real-time mini-games. Three different movements. Zero gym vibes.
            </p>
          </FadeUp>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <FadeIn delay={0.05} className="flex justify-center flex-shrink-0">
              <div style={{ width: 'clamp(170px,22vw,230px)' }}>
                <Phone src="/images/fitzoo/hero-right.png" alt="Get the Gold" delay={0.08} rotate={-2} />
              </div>
            </FadeIn>
            <FadeUp delay={0.1} className="flex-1 flex flex-col gap-4">
              {[
                { color: O, n: '01', title: 'Squat it Out', desc: 'Perform squats to the beat. Your rep count = your score. Faster squats = more coins.' },
                { color: '#22C55E', n: '02', title: 'Break the Brick', desc: 'A brick-breaker powered by body movement. Stay active to keep the ball in play.' },
                { color: '#EAB308', n: '03', title: 'Get the Gold', desc: 'Gold coins fall across the screen. Move your body to catch them — speed and accuracy both score.' },
              ].map(({ color, n, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                  <span className="font-semibold text-xs uppercase tracking-widest mt-0.5 flex-shrink-0 w-7" style={{ color }}>{n}</span>
                  <div>
                    <span className="font-semibold text-sm block mb-1" style={{ color: WHITE }}>{title}</span>
                    <span className="font-light text-sm" style={{ color: MUTED }}>{desc}</span>
                  </div>
                </div>
              ))}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TRAINER SCREEN ── */}
      <section className="py-28 overflow-hidden" style={{ background: '#060709' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp delay={0.1}>
              <SectionLabel>Trainer Screen</SectionLabel>
              <Heading>Progress the coach can see.</Heading>
              <Body className="mt-5">A 7-day calorie-burn chart and a full day-by-day circuit breakdown. Coaches spot trends, identify off days, and adapt plans — no call needed.</Body>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { v: '7-day', l: 'rolling chart' },
                  { v: 'Calorie', l: 'burn per session' },
                  { v: 'Circuit', l: 'time per day' },
                  { v: 'Coach', l: 'direct data access' },
                ].map(({ v, l }) => (
                  <div key={l} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                    <span className="font-semibold block mb-1" style={{ color: O, fontSize: '1.4rem' }}>{v}</span>
                    <span className="text-xs font-light" style={{ color: MUTED }}>{l}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeIn delay={0.05} className="flex justify-center lg:justify-end">
              <div style={{ width: 'clamp(200px,26vw,270px)' }}>
                <Phone src="/images/fitzoo/trainer-progress.png" alt="Trainer Progress" delay={0.08} rotate={3} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── COACH SETUP ── */}
      <section className="py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0f14 0%, #0a0f18 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <FadeIn delay={0.05} className="flex justify-center lg:justify-start">
              <div style={{ width: 'clamp(200px,26vw,270px)' }}>
                <Phone src="/images/fitzoo/coach-setup.png" alt="Coach Setup" delay={0.08} rotate={-2} />
              </div>
            </FadeIn>
            <div className="flex flex-col gap-5">
              <FadeUp>
                <SectionLabel>Coach Setup</SectionLabel>
                <Heading>Accountability, three ways.</Heading>
                <Body className="mt-4">Connect a real coach, subscribe to AI coaching, or share data with your existing trainer. Each tier activates in one tap.</Body>
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                  <p className="font-bold text-xs uppercase tracking-widest mb-4" style={{ color: O }}>Coach Options</p>
                  {[
                    { icon: <img src="/images/fitzoo/icon-coach-id.svg" style={{ width: 20, height: 20, objectFit: 'contain' }} alt="" />, t: 'Add your coach ID', d: 'Link by Fitzoo coach ID.' },
                    { icon: <img src="/images/fitzoo/icon-ai-coach.svg" style={{ width: 20, height: 20, objectFit: 'contain' }} alt="" />, t: 'Fitzoo AI Coach', d: '₹12/month vs ₹120 regular.' },
                    { icon: <Share2 size={16} fill="#FF5C2B" color="#FF5C2B" />,     t: 'Share with coach', d: 'Push data to an external trainer.' },
                  ].map(({ icon, t, d }) => (
                    <div key={t} className="flex gap-3 py-3 border-b last:border-b-0" style={{ borderColor: BORDER }}>
                      <span className="flex-shrink-0 mt-0.5">{icon}</span>
                      <div>
                        <span className="font-semibold text-sm block" style={{ color: WHITE }}>{t}</span>
                        <span className="text-xs font-light" style={{ color: MUTED }}>{d}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── DAILY DIET CHECK-IN ── */}
      <section className="py-28 overflow-hidden" style={{ background: '#080a0f' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="w-full text-center mb-14">
            <SectionLabel>Daily Diet Check-in</SectionLabel>
            <Heading>20 seconds. Done.</Heading>
            <div className="mt-4 mx-auto max-w-xl px-2">
              <Body>A quick 2-question emoji survey — did you have aerated drinks or junk food today? Based on the answers, Fitzoo automatically adjusts the next workout duration so the user burns off the extra intake.</Body>
            </div>
          </FadeUp>
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-center gap-10 sm:gap-8 px-4" style={{ maxWidth: 880, margin: '0 auto', paddingBottom: 20 }}>
              {[
                { src: '/images/fitzoo/diet-screen1.png', alt: 'Diet step 1', rot: -4, d: 0.1,  title: '01 — Aerated Drinks', sub: 'Did you have any today?' },
                { src: '/images/fitzoo/diet-screen2.png', alt: 'Diet step 2', rot: 0,  d: 0.18, title: '02 — Junk Food',     sub: 'Any junk food eaten today?' },
                { src: '/images/fitzoo/diet-screen3.png', alt: 'Diet step 3', rot: 4,  d: 0.26, title: '03 — Adjusted Plan', sub: 'Workout time tweaked to match' },
              ].map(({ src, alt, rot, d, title, sub }) => (
                <div key={alt} className="flex flex-col items-center w-full sm:flex-1 max-w-[200px] sm:max-w-[250px] mx-auto sm:mx-0" style={{ gap: 40 }}>
                  <Phone src={src} alt={alt} delay={d} rotate={rot} />
                  <FadeUp delay={d + 0.12} className="text-center">
                    <span className="block font-bold text-xs uppercase tracking-widest" style={{ color: O }}>{title}</span>
                    <span className="block text-xs font-light mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{sub}</span>
                  </FadeUp>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── DESIGN DECISIONS ── */}
      <section className="py-28 overflow-hidden" style={{ background: '#0d0e12' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="mb-12 text-center">
            <SectionLabel>Design Decisions</SectionLabel>
            <Heading>Every choice had a reason.</Heading>
          </FadeUp>
          <FadeUp delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { q: 'Why dark mode?', a: 'Games feel more immersive on dark backgrounds. Reduces eye strain during active use — Fitzoo\'s primary context.' },
              { q: 'Why orange?', a: 'Signals energy and urgency. Same psychology behind Start buttons in the world\'s best sports products.' },
              { q: 'Why OTP only?', a: 'Fitness apps live on phones. OTP keeps the user in one device from download to first game.' },
              { q: 'Why 3 games?', a: 'Three creates variety without overwhelm. Each targets a distinct movement: squats, lateral speed, agility.' },
              { q: 'Why a cat mascot?', a: 'Characters create emotional attachment that abstract icons can\'t. The Fitzoo cat makes the app feel alive.' },
              { q: 'Why coach post-signup?', a: 'Coach choice is a commitment. After seeing the dashboard, the user is invested — acceptance rate triples.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                <span className="font-semibold text-sm block mb-2" style={{ color: O }}>{q}</span>
                <span className="font-light text-sm leading-relaxed" style={{ color: MUTED }}>{a}</span>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d0e12 0%, #1a0d07 50%, #0d0e12 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <FadeUp>
            <SectionLabel>Outcomes</SectionLabel>
            <Heading size="xl">What Fitzoo delivers.</Heading>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { v: '12+', l: 'Screens designed end-to-end' },
              { v: '3', l: 'Gamified workout modes' },
              { v: '2-step', l: 'Daily diet check-in' },
              { v: '3 tiers', l: 'Coach integration system' },
              { v: '<60s', l: 'Onboarding to first game' },
              { v: '100%', l: 'Design ownership' },
            ].map(({ v, l }) => (
              <div key={l} className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.08) 1px solid' }}>
                <span className="font-semibold block leading-none mb-2" style={{ color: WHITE, fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}>{v}</span>
                <span className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</span>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── REFLECTION ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#080a0f' }}>
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <SectionLabel>Reflection</SectionLabel>
            <Heading size="md">What this taught me.</Heading>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-6 space-y-5">
            <Body>Fitzoo was my first time designing a gamified product from scratch. The hardest challenge wasn't the UI — it was designing for two mental states: the motivation to start, and the habit to return. The onboarding solves the first. The streak counter, game variety, and coach accountability solve the second.</Body>
            <Body>Building the trainer progress screen taught me that the secondary user matters as much as the primary one. When I designed for the coach's needs — quick scan, day-by-day detail, trend visibility — the whole product became more credible on both sides of the relationship.</Body>
          </FadeUp>
        </div>
      </section>

      <NextProjectSection
        projectId={nextProject.id}
        projectName={nextProject.name}
        coverImage={nextProject.coverImage}
        logo="/images/poshmark-logo-next.png"
        accentColor="#00B3FF"
      />

      <footer className="px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: `1px solid ${BORDER}` }}>
        <span className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.15)' }}>
          © Hari Prasad L · 2025 · Product (UI/UX) Designer
        </span>
        <Link to="/" className="text-xs font-semibold uppercase tracking-widest hover:opacity-50 transition-opacity"
          style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>
          Back to Portfolio
        </Link>
      </footer>
    </div>
  )
}
