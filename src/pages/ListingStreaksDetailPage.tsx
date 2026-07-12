import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3 mt-6">
      {items.map((pt, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
            style={{ background: 'rgba(201,23,126,0.12)', border: '1px solid rgba(201,23,126,0.25)' }}>
            <span className="block rounded-full" style={{ width: 6, height: 6, background: A }} />
          </span>
          <span className="font-light text-sm leading-relaxed" style={{ color: MUTED }}>{pt}</span>
        </li>
      ))}
    </ul>
  )
}

/* ─── animated counter ─── */
function AnimatedNumber({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 60, damping: 18 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) mv.set(target)
  }, [inView, target, mv])

  useEffect(() => {
    return spring.on('change', v => setDisplay(Math.round(v)))
  }, [spring])

  return (
    <span ref={ref} className="font-semibold tabular-nums" style={{ color: A, fontSize: 'clamp(2.4rem,4vw,3.4rem)', lineHeight: 1 }}>
      {prefix}{display}{suffix}
    </span>
  )
}

/* ─── animated line chart ─── */
const WEEKLY_DATA = [135, 134, 136, 137, 136, 138, 139, 138, 140, 141, 140, 142, 143, 143, 144]
const PREV_DATA   = [141, 140, 143, 142, 141, 144, 143, 142, 144, 143, 145, 143, 144, 145, 146]

function LineChart() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const W = 560; const H = 200
  const minV = 130; const maxV = 150
  const xs = WEEKLY_DATA.map((_, i) => (i / (WEEKLY_DATA.length - 1)) * W)
  const toY = (v: number) => H - ((v - minV) / (maxV - minV)) * H

  const pathD = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xs[i].toFixed(1)} ${toY(v).toFixed(1)}`).join(' ')

  const areaD = (data: number[]) =>
    `${pathD(data)} L ${W} ${H} L 0 ${H} Z`

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H + 36}`} width="100%" style={{ minWidth: 320, overflow: 'visible' }}>
        <defs>
          <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={A} stopOpacity="0.25" />
            <stop offset="100%" stopColor={A} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[133, 136, 139, 142, 145].map(v => (
          <g key={v}>
            <line x1="0" y1={toY(v)} x2={W} y2={toY(v)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <text x="-6" y={toY(v) + 4} textAnchor="end" fill="rgba(255,255,255,0.22)" fontSize="9">{v}k</text>
          </g>
        ))}

        {/* Previous year area + line */}
        <motion.path d={areaD(PREV_DATA)} fill="url(#pGrad)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }} />
        <motion.path d={pathD(PREV_DATA)} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} />

        {/* Current year area + line */}
        <motion.path d={areaD(WEEKLY_DATA)} fill="url(#aGrad)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }} />
        <motion.path d={pathD(WEEKLY_DATA)} fill="none" stroke={A} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} />

        {/* Week labels */}
        {[0, 4, 9, 14].map(i => (
          <text key={i} x={xs[i]} y={H + 20} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9">W{i + 1}</text>
        ))}

        {/* End dot + label */}
        <motion.circle cx={xs[14]} cy={toY(144)} r="5" fill={A}
          initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          style={{ transformOrigin: `${xs[14]}px ${toY(144)}px` }}
          transition={{ delay: 1.9, duration: 0.4, ease: 'backOut' }} />
        <motion.text x={xs[14] - 2} y={toY(144) - 12} textAnchor="middle" fill={A} fontSize="10" fontWeight="600"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.1 }}>
          144k
        </motion.text>
      </svg>
    </div>
  )
}

/* ─── animated bar ─── */
function MetricBar({ label, before, after, suffix = '%', delay = 0 }: {
  label: string; before: number; after: number; suffix?: string; delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const maxAbs = Math.max(Math.abs(before), Math.abs(after), 8)

  const barW = (v: number) => `${(Math.abs(v) / maxAbs) * 100}%`
  const isImprovement = after > before

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</span>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <span className="text-xs w-16 text-right" style={{ color: MUTED }}>Before</span>
          <div className="flex-1 h-6 rounded overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div className="h-full rounded" style={{ background: 'rgba(255,255,255,0.15)' }}
              initial={{ width: 0 }} animate={inView ? { width: barW(before) } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }} />
          </div>
          <span className="text-sm font-semibold w-12" style={{ color: 'rgba(255,255,255,0.45)' }}>{before}{suffix}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs w-16 text-right" style={{ color: MUTED }}>After</span>
          <div className="flex-1 h-6 rounded overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div className="h-full rounded" style={{ background: isImprovement ? A : '#e05' }}
              initial={{ width: 0 }} animate={inView ? { width: barW(after) } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay + 0.15 }} />
          </div>
          <span className="text-sm font-semibold w-12" style={{ color: isImprovement ? A : '#e05' }}>{after}{suffix}</span>
        </div>
      </div>
    </div>
  )
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
              { l: 'Launched', v: 'Jul 2024' },
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
              <Body>Casual sellers would list a few items, see no signal that their behavior mattered, and quietly drift away. There was no visual representation of their listing history, no moment of recognition when they listed consecutively, and no cost to missing a week.</Body>
              <BulletList items={[
                'No visual cue showing consecutive listing activity',
                'No reward or recognition for listing weekly',
                'Lapsed sellers had no reason to return after missing a week',
                'YoY weekly streaksters declining at −4.5% before launch',
              ]} />
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
                  'Improve lister retention in weeks 2–4 of listing',
                ],
              },
              {
                title: 'User Goal',
                bullets: [
                  'Make listing feel rewarding and worth repeating',
                  'Create a visible record of seller consistency',
                  'Give sellers a reason to return after missing a week',
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

      {/* ── DESIGN: THE STREAK PAGE ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#0a0b0f' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <SectionLabel>The Design</SectionLabel>
              <Heading size="md">Your Current Streak.</Heading>
              <div className="mt-6 flex flex-col gap-4">
                <Body>A dedicated streak page gives sellers a direct window into their listing momentum. The streak count is the hero — large, bold, and impossible to miss. Below it, a countdown timer creates urgency without anxiety, and a reward timeline shows exactly what's at stake if the streak continues.</Body>
                <Body>The week 4 reward icon in the timeline (the gift box) is the carrot that keeps new sellers coming back. It's visible from week 1, so sellers always know how far they are from something meaningful.</Body>
              </div>
            </FadeUp>
            <FadeIn delay={0.1}>
              <img src="/images/p1-screens-1.png" alt="Streak page — Week 1 default view"
                className="w-full rounded-2xl mx-auto"
                style={{ maxWidth: 380, display: 'block', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.7))' }} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── DESIGN: ANNOTATION BREAKDOWN ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-10 text-center">
            <SectionLabel>Design Decisions</SectionLabel>
            <Heading size="md">Five sections. One clear page.</Heading>
            <p className="mt-4 mx-auto max-w-xl font-light leading-relaxed"
              style={{ color: MUTED, fontSize: 'clamp(0.92rem,1.3vw,1.05rem)' }}>
              Every element of the streak page earned its place. The layout was designed around a single north star: the user should instantly understand where they are, what they've done, and what comes next — without reading a word.
            </p>
          </FadeUp>
          <FadeIn delay={0.1}>
            <img src="/images/p1-screens-2.png" alt="Streak page design annotations"
              className="w-full rounded-2xl"
              style={{ display: 'block', boxShadow: '0 30px 70px rgba(0,0,0,0.5)' }} />
          </FadeIn>
          <FadeUp delay={0.15} className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: '01', t: 'Status at a glance', d: 'Streak number and current week context up front — no digging required.' },
              { n: '02', t: 'Timer with purpose', d: 'Countdown to the next unlock window creates natural urgency.' },
              { n: '03', t: 'Visual timeline', d: 'Non-scrollable reward strip shows progress without overwhelming.' },
              { n: '04', t: 'Posh tips', d: 'Contextual selling tips reinforce the habit with a value exchange.' },
            ].map(({ n, t, d }) => (
              <div key={n} className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-3 flex-shrink-0"
                  style={{ background: 'rgba(201,23,126,0.12)', color: A }}>
                  {n}
                </div>
                <p className="font-semibold text-sm mb-1" style={{ color: WHITE }}>{t}</p>
                <p className="text-xs font-light leading-relaxed" style={{ color: MUTED }}>{d}</p>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── DESIGN: STREAK PROGRESSION ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#0a0b0f' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-10">
            <SectionLabel>Streak in Motion</SectionLabel>
            <Heading size="md">Each week earned feels different.</Heading>
            <div className="mt-4 max-w-xl">
              <Body>As sellers build their streak, the UI evolves with them. By week 2 a completed bolt fills in. By week 3, sellers are in the top 15% of consecutive listers — a nudge surfaces to reinforce that identity. By the active week 3 state, the "Time left to list this week" shift signals urgency is personal, not arbitrary.</Body>
            </div>
          </FadeUp>
          <FadeIn delay={0.1}>
            <img src="/images/p1-screens-3.png" alt="Streak pages for Weeks 2, 3, and 3 active"
              className="w-full rounded-2xl"
              style={{ display: 'block', boxShadow: '0 30px 70px rgba(0,0,0,0.5)' }} />
          </FadeIn>
        </div>
      </section>

      {/* ── DESIGN: WEEK 4 REWARD ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn delay={0.05}>
              <img src="/images/p1-screens-4.png" alt="Week 4 congratulations and reward unlock"
                className="w-full rounded-2xl"
                style={{ display: 'block', boxShadow: '0 30px 70px rgba(0,0,0,0.5)' }} />
            </FadeIn>
            <FadeUp delay={0.1}>
              <SectionLabel>The Reward Moment</SectionLabel>
              <Heading size="md">A streak worth protecting.</Heading>
              <div className="mt-6 flex flex-col gap-4">
                <Body>Completing a 4-week streak triggers a two-step celebration: a bottom sheet announcing the reward, then the streak page updating to reflect the unlock. The warm gold tone replaces the pink — marking a distinct seasonal mood shift.</Body>
                <Body>The reward itself — discounted shipping on the next purchase from your closet — is small enough to not feel transactional but meaningful enough to create a reason to return. Expires in 7 days, visible in the streak page for ongoing reinforcement.</Body>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── DESIGN: BROKEN STREAK ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#0a0b0f' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <SectionLabel>Graceful Recovery</SectionLabel>
              <Heading size="md">Breaking it doesn't mean losing it.</Heading>
              <div className="mt-6 flex flex-col gap-4">
                <Body>When a streak breaks, the UI doesn't punish — it invites recovery. The broken streak actionsheet uses a bold red to signal the change but immediately pivots to "List now to regain access to your rewards" — shifting from loss to agency.</Body>
                <Body>After dismissing, the streak resets cleanly to zero with the same countdown timer. The W1 badge animates back to its unfilled state — a visual reset, not a visual punishment. The data showed this framing reduced abandonment and improved same-week relisting rates.</Body>
              </div>
              <BulletList items={[
                'Bottom sheet surfaces only on the first broken-streak visit',
                'CTA copies "regain" — restores agency, avoids shame',
                'Streak resets to 0 but visual hierarchy stays identical',
              ]} />
            </FadeUp>
            <FadeIn delay={0.1}>
              <img src="/images/p1-screens-5.png" alt="Broken streak actionsheet and streak reset"
                className="w-full rounded-2xl"
                style={{ display: 'block', boxShadow: '0 30px 70px rgba(0,0,0,0.5)' }} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── IMPACT & DATA ── */}
      <section className="py-28 px-6 md:px-10"
        style={{ background: 'linear-gradient(135deg, #0d0e12 0%, #1a0612 60%, #0d0e12 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-16 text-center">
            <SectionLabel>Results</SectionLabel>
            <Heading size="xl">The numbers tell the story.</Heading>
            <p className="mt-4 mx-auto max-w-lg font-light" style={{ color: MUTED, fontSize: '1rem' }}>
              15 weeks of post-launch readout. Production released 31 July 2024.
            </p>
          </FadeUp>

          {/* Big stat cards */}
          <FadeUp delay={0.1} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {[
              { label: 'Weekly Streaksters', node: <AnimatedNumber target={144} suffix="k" />, sub: 'peak post-launch (from 135k)' },
              { label: 'Streak Page Views', node: <AnimatedNumber target={25} suffix="%" />, sub: 'of 300k weekly listers engaged' },
              { label: 'Repeat Listers YoY', node: <AnimatedNumber target={-3.8} suffix="%" />, sub: 'improved from −7% baseline' },
              { label: 'Lister Retention', node: <span className="font-semibold" style={{ color: A, fontSize: 'clamp(2.4rem,4vw,3.4rem)', lineHeight: 1 }}>+1%</span>, sub: 'W2–W4 retention improvement' },
            ].map(({ label, node, sub }) => (
              <div key={label} className="p-6 rounded-2xl flex flex-col gap-2"
                style={{ background: 'rgba(201,23,126,0.07)', border: '1px solid rgba(201,23,126,0.18)' }}>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</span>
                {node}
                <span className="text-xs font-light leading-snug" style={{ color: 'rgba(255,255,255,0.35)' }}>{sub}</span>
              </div>
            ))}
          </FadeUp>

          {/* Line chart */}
          <FadeUp delay={0.12} className="rounded-2xl p-6 sm:p-8 mb-8"
            style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <p className="font-semibold text-sm" style={{ color: WHITE }}>Weekly Streaksters (000s)</p>
                <p className="text-xs font-light mt-0.5" style={{ color: MUTED }}>15-week post-launch trend</p>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-0.5 rounded" style={{ background: A }} />
                  <span className="text-xs" style={{ color: MUTED }}>Post-launch</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 border-t border-dashed" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                  <span className="text-xs" style={{ color: MUTED }}>Prior year</span>
                </div>
              </div>
            </div>
            <LineChart />
          </FadeUp>

          {/* Before/after metric bars */}
          <FadeUp delay={0.14} className="rounded-2xl p-6 sm:p-8"
            style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}` }}>
            <p className="font-semibold text-sm mb-6" style={{ color: WHITE }}>Year-over-Year Improvement</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <MetricBar label="Weekly Streaksters YoY change" before={-4.5} after={-0.7} suffix="%" delay={0} />
              <MetricBar label="Repeat Listers YoY change" before={-7.0} after={-3.8} suffix="%" delay={0.1} />
            </div>
            <p className="text-xs mt-6 font-light" style={{ color: 'rgba(255,255,255,0.22)' }}>
              Positive = improvement. Both metrics moved from declining to near-flat, reversing a year-long downward trend.
            </p>
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
          <FadeUp delay={0.1} className="mt-6 flex flex-col gap-5">
            <Body>The most effective part of this feature isn't the streak counter — it's the broken streak recovery moment. That single frame, "You didn't list last week. List now to start a new streak," is what converts a passive disengagement into an active return. Designing for retention means designing for the exit as much as the entry.</Body>
            <Body>The weekly readout data revealed something counterintuitive: the 25% streak page engagement rate among active listers meant three quarters of the target audience never discovered the feature organically. The next design iteration would focus on surfacing the streak page earlier in the listing flow rather than waiting for sellers to find it.</Body>
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
