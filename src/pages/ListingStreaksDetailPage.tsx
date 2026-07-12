import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import NextProjectSection from '../components/NextProjectSection'
import { PROJECTS } from '../data/projects'

/* ─── tokens ─── */
const A = '#C9177E'
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

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
      style={{ color: A, background: 'rgba(201,23,126,0.1)', border: '1px solid rgba(201,23,126,0.25)' }}>
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="uppercase tracking-[0.22em] text-xs font-semibold mb-3" style={{ color: A }}>{children}</p>
}

function Heading({ children, size = 'lg' }: { children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const s = { sm: '1.5rem', md: '2rem', lg: 'clamp(2.2rem,4vw,3.2rem)', xl: 'clamp(3rem,6vw,5rem)' }
  return <h2 className="font-semibold leading-tight" style={{ color: WHITE, fontSize: s[size] }}>{children}</h2>
}

function Body({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-light leading-[1.75] ${className}`} style={{ color: MUTED, fontSize: 'clamp(0.92rem,1.3vw,1.05rem)' }}>{children}</p>
}

/* ─── page ─── */
export default function ListingStreaksDetailPage() {
  const currentIndex = PROJECTS.findIndex(p => p.id === 'listing-streaks')
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  return (
    <div style={{ backgroundColor: BG, fontFamily: "'Poppins', sans-serif", overflowX: 'hidden' }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ background: 'rgba(13,14,18,0.82)', backdropFilter: 'blur(18px)', borderBottom: `1px solid ${BORDER}` }}>
        <Link to="/" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest hover:opacity-50 transition-opacity"
          style={{ color: WHITE, textDecoration: 'none' }}>
          <ArrowLeft size={13} /> Back to work
        </Link>
        <Chip>01</Chip>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-20"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,23,126,0.18) 0%, transparent 65%), ${BG}` }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />

        <motion.div className="relative z-10 px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

          <motion.div className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="w-20 h-20 rounded-3xl overflow-hidden"
              style={{ border: '2px solid rgba(255,255,255,0.1)', boxShadow: `0 0 40px rgba(201,23,126,0.35)` }}>
              <img src="/images/p1-logo.png" alt="Listing Streaks" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>

          <motion.p className="uppercase tracking-[0.3em] text-xs font-semibold mb-5" style={{ color: A }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Poshmark · UI/UX Case Study
          </motion.p>

          <motion.h1 className="font-semibold leading-none mb-6"
            style={{ color: WHITE, fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontWeight: 700, letterSpacing: '0.005em' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
            Listing <span style={{ color: A }}>Streaks</span>
          </motion.h1>

          <motion.p className="font-light mb-12 mx-auto max-w-lg" style={{ color: MUTED, fontSize: 'clamp(1rem,1.8vw,1.2rem)' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
            A habit-building feature that motivates casual sellers to list weekly by turning consistency into a streak worth protecting.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.6 }}>
            {[
              { l: 'Role', v: 'Product Designer' },
              { l: 'Company', v: 'Poshmark' },
              { l: 'Tools', v: 'Figma' },
              { l: 'Timeline', v: '2024' },
            ].map(({ l, v }) => (
              <div key={l} className="px-5 py-3 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}`, backdropFilter: 'blur(8px)' }}>
                <span className="uppercase tracking-widest text-xs block mb-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>{l}</span>
                <span className="font-semibold text-sm" style={{ color: WHITE }}>{v}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── BANNER IMAGE ── */}
      <section className="px-6 md:px-10 pb-20" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <img src="/images/p1-thumbnail.png" alt="Listing Streaks"
              className="w-full rounded-2xl"
              style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6)', display: 'block' }} />
          </FadeIn>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: `linear-gradient(180deg, ${BG} 0%, #0f1016 100%)` }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <SectionLabel>Overview</SectionLabel>
              <Heading>Turn listing into a habit worth protecting.</Heading>
            </FadeUp>
            <FadeUp delay={0.1} className="md:pt-12">
              <Body>Poshmark sellers who list at least once a week are significantly more likely to stay active long-term. The challenge: most casual sellers lapse after a few weeks with no feedback loop to bring them back. Listing Streaks was designed to change that — by making consistency visible, rewarding it progressively, and making the streak itself feel worth protecting.</Body>
            </FadeUp>
          </div>
          <FadeUp delay={0.15} className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { v: '14%', d: 'SA AU weekly lister conversion at baseline' },
              { v: '2×', d: 'Target increase in weekly lister conversion' },
              { v: '10%', d: 'Target growth in Habitual Listers' },
            ].map(({ v, d }) => (
              <div key={v} className="p-7 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                <span className="font-semibold block mb-2" style={{ color: A, fontSize: 'clamp(2.4rem,4vw,3.2rem)', lineHeight: 1 }}>{v}</span>
                <span className="text-sm font-light" style={{ color: MUTED }}>{d}</span>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#0a0b0f' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <SectionLabel>Problem</SectionLabel>
              <Heading>No feedback loop for consistency.</Heading>
            </FadeUp>
            <FadeUp delay={0.1} className="md:pt-12">
              <Body>Casual sellers would list a few items, see no signal that their behavior mattered, and quietly drift away. There was no visual representation of their listing history, no moment of recognition when they listed consecutively, and no cost to missing a week. Without those feedback mechanisms, the habit never had a chance to form.</Body>
              <ul className="mt-8 flex flex-col gap-3">
                {[
                  'No visual cue showing consecutive listing activity',
                  'No reward or recognition for listing weekly',
                  'Lapsed sellers had no reason to return after missing a week',
                ].map((pt, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: 'rgba(201,23,126,0.12)', border: '1px solid rgba(201,23,126,0.25)' }}>
                      <span className="block rounded-full" style={{ width: 6, height: 6, background: A }} />
                    </span>
                    <span className="font-light text-sm leading-relaxed" style={{ color: MUTED }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── GOALS ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-12">
            <SectionLabel>Goals</SectionLabel>
            <Heading>Business and user aligned.</Heading>
          </FadeUp>
          <FadeUp delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Business Goal',
                bullets: [
                  'Double SA AU weekly lister conversion from 14% to 27%',
                  'Grow Habitual Listers (consecutive-week listers) by 10%',
                ],
              },
              {
                title: 'User Goal',
                bullets: [
                  'Make listing feel rewarding and worth repeating',
                  'Create a visible record of seller consistency',
                ],
              },
            ].map(({ title, bullets }) => (
              <div key={title} className="p-6 rounded-2xl"
                style={{ background: 'rgba(201,23,126,0.05)', border: '1px solid rgba(201,23,126,0.15)' }}>
                <p className="font-semibold text-sm mb-4" style={{ color: A }}>{title}</p>
                <ul className="flex flex-col gap-3">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                        style={{ background: 'rgba(201,23,126,0.12)', border: '1px solid rgba(201,23,126,0.25)' }}>
                        <span className="block rounded-full" style={{ width: 6, height: 6, background: A }} />
                      </span>
                      <span className="font-light text-sm leading-relaxed" style={{ color: MUTED }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── DESIGN APPROACH ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#0a0b0f' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-12 text-center">
            <SectionLabel>Design Approach</SectionLabel>
            <Heading>Three mechanics. One habit loop.</Heading>
          </FadeUp>
          <FadeUp delay={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { num: '01', title: 'Streak Visibility', body: 'A persistent streak counter in the seller dashboard makes consecutive listing activity impossible to miss.' },
              { num: '02', title: 'Progressive Rewards', body: 'Milestone rewards at 4, 8, and 12-week streaks create anticipation and make missing a week feel costly.' },
              { num: '03', title: 'Re-engagement Nudge', body: 'A streak-at-risk notification fires 48 hours before a streak breaks, giving sellers a clear recovery window.' },
            ].map(({ num, title, body }) => (
              <div key={num} className="flex flex-col gap-4 p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0"
                  style={{ background: 'rgba(201,23,126,0.12)', color: A }}>
                  {num}
                </div>
                <div>
                  <p className="font-semibold text-sm mb-2" style={{ color: WHITE }}>{title}</p>
                  <p className="font-light text-sm leading-relaxed" style={{ color: MUTED }}>{body}</p>
                </div>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="py-28 px-6 md:px-10"
        style={{ background: 'linear-gradient(135deg, #0d0e12 0%, #1a0612 60%, #0d0e12 100%)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <FadeUp>
            <SectionLabel>Impact</SectionLabel>
            <Heading size="xl">Shipped in 2024.</Heading>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { v: '2', d: 'Streak states designed (active, at-risk, broken)' },
              { v: '3', d: 'Milestone reward tiers defined' },
              { v: '1', d: 'Re-engagement notification flow' },
              { v: '48h', d: 'Streak-at-risk notification window' },
              { v: '100%', d: 'End-to-end design ownership' },
              { v: 'Dec 2024', d: 'Shipped and live in product' },
            ].map(({ v, d }) => (
              <div key={v} className="p-6 rounded-2xl"
                style={{ background: 'rgba(201,23,126,0.08)', border: '1px solid rgba(201,23,126,0.18)' }}>
                <span className="font-semibold block leading-none mb-2" style={{ color: WHITE, fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}>{v}</span>
                <span className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>{d}</span>
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
            <Heading size="md">Habit design is invisible design.</Heading>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-6">
            <Body>The most effective part of this feature isn't the streak counter — it's the 48-hour warning. That single moment of 'you're about to lose something' is what converts a passive user into an active one. Designing for retention means designing for loss aversion as much as delight. The best habit loops feel effortless until breaking them doesn't.</Body>
          </FadeUp>
        </div>
      </section>

      <NextProjectSection
        projectId={nextProject.id}
        projectName={nextProject.name}
        coverImage={nextProject.coverImage}
        logo="/images/fitzoo/logo.png"
        accentColor="#FF5C2B"
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
