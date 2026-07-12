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

/* ─── phone mockup ─── */
function Phone({ src, alt = '', delay = 0, rotate = 0 }: { src: string; alt?: string; delay?: number; rotate?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 60, rotate: rotate * 0.4 }}
      animate={inView ? { opacity: 1, y: 0, rotate } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ flexShrink: 0, filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.7))' }}>
      <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
    </motion.div>
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
            Applying behavioral reinforcement theory to reverse lister churn — by designing a streak system that converts inconsistent sellers into weekly habituals.
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

      {/* ── OVERVIEW ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: `linear-gradient(180deg, ${BG} 0%, #0f1016 100%)` }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <SectionLabel>Overview</SectionLabel>
              <Heading>Closing the behavioral gap between listing and retention.</Heading>
            </FadeUp>
            <FadeUp delay={0.1} className="md:pt-12">
              <Body>Internal cohort data established a clear behavioral pattern: sellers who list at least once per week for four consecutive weeks transition from casual to habitual — and habitual listers are disproportionately more likely to remain active at 90 and 180 days. Yet pre-launch data showed weekly streakster counts declining at −4.5% YoY, signaling that no existing surface was closing the gap between first listing and sustained repetition. Listing Streaks was the designed intervention: make the behavioral target visible, reward its achievement, and architect a recovery path so that one missed week does not become permanent abandonment.</Body>
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
              <Heading>An absent feedback loop, and a silent churn signal.</Heading>
            </FadeUp>
            <FadeUp delay={0.1} className="md:pt-12">
              <Body>Behavioral research on habit formation identifies feedback loops as the critical mechanism linking cue, routine, and reward. On Poshmark, that loop was absent entirely: sellers who listed once received no signal that their action was part of a larger pattern worth maintaining. Without a visible streak to protect, there was no psychological cost to skipping a week. The result was predictable — YoY weekly streakster counts were in sustained decline, and W2–W4 lister retention lagged significantly behind W1 activation rates.</Body>
              <BulletList items={[
                'No persistent visual record of consecutive listing behavior',
                'No differential reward signal for weekly vs. infrequent listing',
                'Zero friction cost to lapsing — no streak to break, no loss to feel',
                'YoY weekly streaksters at −4.5% with no recovery mechanism in place',
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
            <Heading>Dual-axis success criteria, grounded in behavioral outcomes.</Heading>
          </FadeUp>
          <FadeUp delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Business Objective',
                bullets: [
                  'Double SA AU weekly lister conversion rate from 14% to 27%',
                  'Grow Habitual Listers — sellers with 4+ consecutive weeks — by 10%',
                  'Improve week 2–4 lister retention, the critical drop-off window',
                ],
              },
              {
                title: 'User Objective',
                bullets: [
                  'Provide a legible signal that listing consistency is accumulating value',
                  'Create a tangible cost to lapsing — a streak worth protecting, not just counting',
                  'Reduce the perceived barrier to re-entry after a missed week',
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
              <Heading size="md">A dedicated surface for streak cognition.</Heading>
              <div className="mt-6 flex flex-col gap-4">
                <Body>The central design challenge was not aesthetic — it was cognitive. Research on goal-gradient effect shows that motivation increases as users perceive themselves approaching a defined reward threshold. To activate that effect, the streak count needed to be the unambiguous focal point: numerically large, visually dominant, and spatially anchored at the top of the page before any other information competed for attention.</Body>
                <Body>The week 4 reward icon — a gift box at position W4 in the progress timeline — was deliberately placed in the initial viewport from week 1. This exploits the principle of visible yet deferred reward: the goal is always known, the distance is always computable, and the commitment device is locked in from the first session.</Body>
              </div>
            </FadeUp>
            <div className="flex justify-center">
              <div style={{ width: 'clamp(200px, 36vw, 300px)' }}>
                <Phone src="/images/p1-phone-w1a.png" alt="Streak page — Week 1 default view" delay={0.1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESIGN: ANNOTATION BREAKDOWN ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center" style={{ marginBottom: 40 }}>
            <SectionLabel>Design Decisions</SectionLabel>
            <Heading size="md">Information architecture as a behavioral scaffold.</Heading>
            <p className="mt-4 mx-auto max-w-xl font-light leading-relaxed"
              style={{ color: MUTED, fontSize: 'clamp(0.92rem,1.3vw,1.05rem)' }}>
              Each section of the streak page maps to a distinct cognitive need: where am I, how much time do I have, what have I built, and what do I stand to gain. The design hypothesis was that a user who can answer all four questions within 3 seconds of opening the page requires no persuasion — the architecture itself drives the behavior.
            </p>
          </FadeUp>
          <div className="flex justify-center">
            <FadeIn delay={0.1}>
              <img src="/images/p1-annotation.png" alt="Streak page design annotations"
                className="rounded-2xl"
                style={{ display: 'block', width: '75%', margin: '0 auto', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))' }} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── DESIGN: STREAK PROGRESSION ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#0a0b0f' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-10">
            <SectionLabel>Streak in Motion</SectionLabel>
            <Heading size="md">Progressive state design as a behavioral reinforcement system.</Heading>
            <div className="mt-4 max-w-xl">
              <Body>Rather than a static UI with a changing number, each week produces a distinct visual state — a deliberate application of variable ratio reinforcement. By week 2, the filled bolt communicates that the behavior has been registered. By week 3, a social comparison nudge surfaces: "You are in the top 15% of consecutive listers." This framing activates identity-based motivation — the seller is no longer just listing, they are a habitual lister. The week 3 active state introduces a copy shift from "Next week unlocks in" to "Time left to list this week," reorienting urgency from anticipated gain to present-moment completion — a subtle but consequential distinction in behavioral priming.</Body>
            </div>
          </FadeUp>
          <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
            <div style={{ width: 'clamp(160px, 28vw, 240px)' }}>
              <Phone src="/images/p1-phone-w2a.png" alt="Week 2 streak" delay={0.1} />
            </div>
            <div style={{ width: 'clamp(160px, 28vw, 240px)' }}>
              <Phone src="/images/p1-phone-w2b.png" alt="Week 3 streak" delay={0.2} />
            </div>
            <div style={{ width: 'clamp(160px, 28vw, 240px)' }}>
              <Phone src="/images/p1-phone-w2c.png" alt="Week 3 active streak" delay={0.3} />
            </div>
          </div>
        </div>
      </section>

      {/* ── DESIGN: WEEK 4 REWARD ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center gap-4 md:gap-6">
              <div style={{ width: 'clamp(140px, 28vw, 220px)' }}>
                <Phone src="/images/p1-phone-w4a.png" alt="Week 4 congratulations" delay={0.05} rotate={-2} />
              </div>
              <div style={{ width: 'clamp(140px, 28vw, 220px)' }}>
                <Phone src="/images/p1-phone-w4b.png" alt="Week 4 reward unlock" delay={0.18} rotate={2} />
              </div>
            </div>
            <FadeUp delay={0.1}>
              <SectionLabel>The Reward Moment</SectionLabel>
              <Heading size="md">Milestone reward as a commitment amplifier.</Heading>
              <div className="mt-6 flex flex-col gap-4">
                <Body>At four consecutive weeks, the system triggers a two-stage reward delivery: a bottom sheet modal announcing the unlock, followed by a persistent reward card on the streak page. The design rationale for two stages was deliberate — a single-surface reward risks being ignored or dismissed as a notification artifact. Two stages create a moment of ceremony, signaling that the achievement was substantial enough to interrupt the normal page state.</Body>
                <Body>The reward — discounted shipping on the next closet purchase — was selected based on its alignment with existing seller behavior and its low perceived transaction cost. Crucially, it carries a 7-day expiry, visible persistently on the streak page. That expiry window introduces a secondary urgency mechanism: the seller now has an additional reason to return within the week, independent of the streak itself.</Body>
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
              <Heading size="md">Designing for the exit, not just the entry.</Heading>
              <div className="mt-6 flex flex-col gap-4">
                <Body>Loss aversion research consistently shows that the threat of losing a held asset is a stronger motivator than the prospect of gaining an equivalent one. A broken streak, if handled poorly, converts that psychological principle against the product — the seller feels punished and disengages permanently. The design intervention was to reframe the broken state not as an ending but as an access interruption: "List now to regain access to your rewards." The CTA language was chosen precisely for the word "regain" — it asserts that the reward relationship is intact, merely paused.</Body>
                <Body>The bottom sheet surfaces only on the first post-lapse visit, preventing repeated negative exposure. Once dismissed, the streak page resets to the familiar W1 state — identical visual hierarchy to the initial onboarding view. There is no permanent penalty badge, no "streak ended" tombstone. The reset communicates: the system is ready when you are.</Body>
              </div>
              <BulletList items={[
                'Actionsheet shown exactly once per lapse — prevents shame accumulation across sessions',
                '"Regain" framing restores perceived agency; avoids the learned helplessness of punitive copy',
                'Post-dismiss state is indistinguishable from week 1 — structural parity signals a clean start',
              ]} />
            </FadeUp>
            <div className="flex justify-center gap-4 md:gap-6">
              <div style={{ width: 'clamp(140px, 28vw, 220px)' }}>
                <Phone src="/images/p1-phone-brokena.png" alt="Broken streak actionsheet" delay={0.1} rotate={-2} />
              </div>
              <div style={{ width: 'clamp(140px, 28vw, 220px)' }}>
                <Phone src="/images/p1-phone-brokenb.png" alt="Streak reset view" delay={0.22} rotate={2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACT & DATA ── */}
      <section className="py-28 px-6 md:px-10"
        style={{ background: 'linear-gradient(135deg, #0d0e12 0%, #1a0612 60%, #0d0e12 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-16 text-center">
            <SectionLabel>Results</SectionLabel>
            <Heading size="xl">15-week post-launch readout.</Heading>
            <p className="mt-4 mx-auto max-w-lg font-light" style={{ color: MUTED, fontSize: '1rem' }}>
              Production shipped 31 July 2024. Metrics sourced from internal analytics readout across weekly active seller cohorts.
            </p>
          </FadeUp>

          {/* Big stat cards */}
          <FadeUp delay={0.1} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {[
              { label: 'Weekly Streaksters', node: <AnimatedNumber target={144} suffix="k" />, sub: 'peak post-launch cohort — up from 135k at launch' },
              { label: 'Feature Discovery Rate', node: <AnimatedNumber target={25} suffix="%" />, sub: 'of 300k weekly active listers reached the streak page' },
              { label: 'Repeat Listers YoY Δ', node: <AnimatedNumber target={-3.8} suffix="%" />, sub: 'recovered from −7% pre-launch baseline' },
              { label: 'W2–W4 Retention Δ', node: <span className="font-semibold" style={{ color: A, fontSize: 'clamp(2.4rem,4vw,3.4rem)', lineHeight: 1 }}>+1%</span>, sub: 'lister retention improvement in critical drop-off window' },
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
                <p className="text-xs font-light mt-0.5" style={{ color: MUTED }}>15-week post-launch cohort vs. prior year baseline</p>
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
            <p className="font-semibold text-sm mb-6" style={{ color: WHITE }}>YoY Δ — Pre-launch vs. 15-week post-launch</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <MetricBar label="Weekly Streaksters YoY change" before={-4.5} after={-0.7} suffix="%" delay={0} />
              <MetricBar label="Repeat Listers YoY change" before={-7.0} after={-3.8} suffix="%" delay={0.1} />
            </div>
            <p className="text-xs mt-6 font-light" style={{ color: 'rgba(255,255,255,0.22)' }}>
              Both signals moved from sustained decline into near-recovery within 15 weeks — reversing a trajectory that had held negative for the prior four quarters. Effect size is directionally significant; full attribution requires longer observation.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── REFLECTION ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#080a0f' }}>
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <SectionLabel>Research Takeaways</SectionLabel>
            <Heading size="md">What the data surfaced that the design didn't anticipate.</Heading>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-6 flex flex-col gap-5">
            <Body>The most behaviorally potent moment in this feature was not the reward — it was the broken streak recovery screen. A seller who opens the app to find "Streak Ended: You didn't list last week. List now to start a new streak" faces a well-studied decision architecture: loss aversion, a clear recovery path, and an immediately available action. That combination, when framed correctly, converts passive disengagement into same-session relisting at a measurably higher rate than any reward-arrival moment. Designing for retention requires as much rigorous attention to the exit state as to the entry experience.</Body>
            <Body>The 15-week readout also surfaced a critical discovery gap: only ~25% of the 300k weekly active listers were reaching the streak page organically. The feature was working where it was found — but three-quarters of the intended audience were never finding it. This pointed to a significant unseized opportunity: embedding streak status within the primary listing flow rather than confining it to a destination page. The next iteration hypothesis would center on ambient streak exposure at the moment of highest behavioral relevance — the post-listing confirmation.</Body>
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
