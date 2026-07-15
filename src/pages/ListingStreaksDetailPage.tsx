import React, { useRef, useEffect, useState } from 'react'
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
// Raw data — index to 100 at W1 so post-launch steeper growth is visible
const RAW_WEEKLY = [135, 134, 136, 137, 136, 138, 139, 138, 140, 141, 140, 142, 143, 143, 144]
const RAW_PREV   = [141, 140, 143, 142, 141, 144, 143, 142, 144, 143, 145, 143, 144, 145, 146]
const WEEKLY_DATA = RAW_WEEKLY.map(v => parseFloat((v / RAW_WEEKLY[0] * 100).toFixed(1)))
const PREV_DATA   = RAW_PREV.map(v => parseFloat((v / RAW_PREV[0] * 100).toFixed(1)))
// post-launch ends at ~106.7, prior year ends at ~103.5 → pink line finishes higher

function LineChart() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hover, setHover] = React.useState<{ i: number; x: number; y: number } | null>(null)

  const PL = 32; const PR = 32; const PT = 12; const PB = 28
  const W = 580; const H = 200
  const CW = W - PL - PR; const CH = H - PT - PB
  const minV = 96; const maxV = 110

  const xs = WEEKLY_DATA.map((_, i) => PL + (i / (WEEKLY_DATA.length - 1)) * CW)
  const toY = (v: number) => PT + CH - ((v - minV) / (maxV - minV)) * CH

  // Catmull-Rom → cubic bezier smooth curve
  const smoothPath = (data: number[]) => {
    const pts = data.map((v, i) => [xs[i], toY(v)])
    let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)]
      const p1 = pts[i]
      const p2 = pts[i + 1]
      const p3 = pts[Math.min(i + 2, pts.length - 1)]
      const cp1x = p1[0] + (p2[0] - p0[0]) / 6
      const cp1y = p1[1] + (p2[1] - p0[1]) / 6
      const cp2x = p2[0] - (p3[0] - p1[0]) / 6
      const cp2y = p2[1] - (p3[1] - p1[1]) / 6
      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
    }
    return d
  }

  const smoothArea = (data: number[]) =>
    `${smoothPath(data)} L ${xs[data.length - 1].toFixed(1)} ${(PT + CH).toFixed(1)} L ${xs[0].toFixed(1)} ${(PT + CH).toFixed(1)} Z`

  const endWeekly = WEEKLY_DATA[14]
  const endPrev   = PREV_DATA[14]

  const TOTAL_W = W + 8
  const TOTAL_H = H + 4

  return (
    <div ref={ref} className="w-full" style={{ position: 'relative' }}>
      <svg viewBox={`0 0 ${TOTAL_W} ${TOTAL_H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={A} stopOpacity="0.32" />
            <stop offset="100%" stopColor={A} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <clipPath id="chartClip">
            <rect x={PL} y={PT} width={CW} height={CH} />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {[98, 100, 102, 104, 106, 108].map(v => (
          <g key={v}>
            <line x1={PL} y1={toY(v)} x2={PL + CW} y2={toY(v)}
              stroke={v === 100 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)'} strokeWidth="1" />
            <text x={PL - 6} y={toY(v) + 4} textAnchor="end" fill="rgba(255,255,255,0.2)" fontSize="9">{v}</text>
          </g>
        ))}
        <text x={PL + 10} y={toY(100) - 5} fill="rgba(255,255,255,0.2)" fontSize="8">baseline</text>

        {/* Prior year */}
        <motion.path d={smoothArea(PREV_DATA)} fill="url(#pGrad)" clipPath="url(#chartClip)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }} />
        <motion.path d={smoothPath(PREV_DATA)} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 3" clipPath="url(#chartClip)"
          initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} />
        <motion.text x={xs[14] + 8} y={toY(endPrev) + 4} textAnchor="start" fill="rgba(255,255,255,0.35)" fontSize="9"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.6 }}>
          +{(endPrev - 100).toFixed(1)}%
        </motion.text>

        {/* Post-launch */}
        <motion.path d={smoothArea(WEEKLY_DATA)} fill="url(#aGrad)" clipPath="url(#chartClip)"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }} />
        <motion.path d={smoothPath(WEEKLY_DATA)} fill="none" stroke={A} strokeWidth="3" strokeLinecap="round" clipPath="url(#chartClip)"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} />

        {/* Week labels */}
        {[0, 4, 9, 14].map(i => (
          <text key={i} x={xs[i]} y={H + 4} textAnchor={i === 0 ? 'start' : i === 14 ? 'end' : 'middle'}
            fill="rgba(255,255,255,0.25)" fontSize="9">W{i + 1}</text>
        ))}

        {/* End dot + label */}
        <motion.circle cx={xs[14]} cy={toY(endWeekly)} r="5" fill={A}
          initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          style={{ transformOrigin: `${xs[14]}px ${toY(endWeekly)}px` }}
          transition={{ delay: 1.9, duration: 0.4, ease: 'backOut' }} />
        <motion.text x={xs[14] - 8} y={toY(endWeekly) - 10} textAnchor="end" fill={A} fontSize="10" fontWeight="700"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2.1 }}>
          +{(endWeekly - 100).toFixed(1)}%
        </motion.text>

        {/* Hover hit areas */}
        {WEEKLY_DATA.map((_, i) => (
          <rect key={i}
            x={i === 0 ? xs[i] : (xs[i] + xs[i - 1]) / 2}
            y={PT} width={i === 0 || i === 14
              ? (xs[1] - xs[0]) / 2
              : (xs[Math.min(i + 1, 14)] - xs[Math.max(i - 1, 0)]) / 2}
            height={CH}
            fill="transparent"
            onMouseEnter={() => setHover({ i, x: xs[i], y: toY(WEEKLY_DATA[i]) })}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: 'crosshair' }}
          />
        ))}

        {/* Hover indicator */}
        {hover && (
          <g>
            <line x1={hover.x} y1={PT} x2={hover.x} y2={PT + CH}
              stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx={hover.x} cy={toY(WEEKLY_DATA[hover.i])} r="4" fill={A} stroke={BG} strokeWidth="2" />
            <circle cx={hover.x} cy={toY(PREV_DATA[hover.i])} r="3" fill="rgba(255,255,255,0.5)" stroke={BG} strokeWidth="2" />
            {/* Tooltip */}
            {(() => {
              const tx = hover.x > W * 0.7 ? hover.x - 74 : hover.x + 10
              const ty = Math.max(toY(WEEKLY_DATA[hover.i]) - 52, PT + 4)
              return (
                <g>
                  <rect x={tx} y={ty} width="68" height="48" rx="5" fill="rgba(20,10,20,0.92)" stroke="rgba(201,23,126,0.3)" strokeWidth="1" />
                  <text x={tx + 8} y={ty + 13} fill="rgba(255,255,255,0.4)" fontSize="8">W{hover.i + 1}</text>
                  <text x={tx + 8} y={ty + 27} fill={A} fontSize="10" fontWeight="700">+{(WEEKLY_DATA[hover.i] - 100).toFixed(1)}%</text>
                  <text x={tx + 8} y={ty + 27} fill="rgba(255,255,255,0.18)" fontSize="8" dy="12">+{(PREV_DATA[hover.i] - 100).toFixed(1)}% prior yr</text>
                </g>
              )
            })()}
          </g>
        )}
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
  // Show recovery as positive improvement (pp gained back)
  const recovered = parseFloat((after - before).toFixed(1))  // e.g. -0.7 - (-4.5) = +3.8
  const maxBar = 8  // max pp for 100% bar width

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</span>

      {/* Context: before → after */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Pre-launch</span>
        <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>{before}{suffix}</span>
        <span className="text-xs mx-1" style={{ color: 'rgba(255,255,255,0.2)' }}>→</span>
        <span className="text-sm font-semibold" style={{ color: MUTED }}>Post-launch</span>
        <span className="text-sm font-semibold" style={{ color: MUTED }}>{after}{suffix}</span>
      </div>

      {/* Recovery bar — always pink, width = recovered pp */}
      <div>
        <div className="h-5 rounded overflow-hidden mb-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <motion.div className="h-full rounded" style={{ background: A }}
            initial={{ width: 0 }} animate={inView ? { width: `${Math.min(recovered / maxBar * 100, 100)}%` } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: delay + 0.2 }} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: MUTED }}>Recovered</span>
          <span className="text-base font-bold" style={{ color: A }}>+{recovered}pp</span>
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
          <ArrowLeft size={13} /> Home
        </Link>
        <Chip>POSHMARK</Chip>
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
              { v: '14%', d: 'of active sellers converted to weekly listers at baseline' },
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

      {/* ── COMPETITOR RESEARCH ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-4">
            <SectionLabel>Competitor Research</SectionLabel>
            <Heading>How the best streak mechanics work.</Heading>
          </FadeUp>
          <FadeUp delay={0.08} className="mb-14">
            <Body className="max-w-2xl mt-4">Before designing Poshmark's streak system, I studied five products that have made streaks a core retention driver — each solving the same problem differently: making users feel a cost to stopping.</Body>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {[
                {
                  app: 'Duolingo',
                  tag: 'Language Learning',
                  image: '/images/competitor-duolingo.jpg',
                  tracks: 'Daily XP-earning lesson',
                  hook: 'Flame in the nav header — visible before the user even starts a lesson. Loss aversion is the engine: protecting the number becomes the motivation.',
                  mechanic: 'Streak Freeze (purchasable), hidden grace window, post-hoc Streak Repair',
                  icon: '🔥',
                },
                {
                  app: 'Snapchat',
                  tag: 'Social',
                  image: '/images/competitor-snapchat.jpg',
                  tracks: 'Mutual daily Snap exchange between two friends',
                  hook: 'Bilateral streak — both users must act within 24 hrs. A ⏳ hourglass appears ~4 hrs before expiry, creating a micro-deadline that drives immediate action.',
                  mechanic: '1 lifetime free restore (Snapchat+ gets 5/month), no grace period',
                  icon: '👻',
                },
                {
                  app: 'Habitica',
                  tag: 'Productivity RPG',
                  image: '/images/competitor-habitica.jpg',
                  tracks: 'User-defined daily tasks on a self-set schedule',
                  hook: 'Compounding reward — each streak day adds +1% gold value to that task. Missing a day damages your avatar HP and harms your party members.',
                  mechanic: 'No freeze. RPG damage is the penalty — social accountability at group scale.',
                  icon: '⚔️',
                },
                {
                  app: 'BeReal',
                  tag: 'Social',
                  image: '/images/competitor-bereal.jpg',
                  tracks: 'Daily dual-camera post within a random 2-minute window',
                  hook: '5-day minimum before the flame icon appears — front-loads commitment so only proven users see the mechanic. Late posts within the same day still count.',
                  mechanic: 'No restore or freeze. Zero-tolerance reset, but late posts add a flexibility buffer.',
                  icon: '📸',
                },
                {
                  app: 'LinkedIn Games',
                  tag: 'Professional Network',
                  image: '/images/competitor-linkedin.png',
                  tracks: 'Daily play of in-app word/logic games (Queens, Pinpoint)',
                  hook: "The streak is a Trojan horse — 2-minute games are a low-friction daily touchpoint that drives broader app opens on a platform users don't naturally visit daily.",
                  mechanic: "No freeze. Low session length is itself the forgiveness — barrier to maintaining is very low.",
                  icon: '💼',
                },
              ].map(({ app, tag, image, tracks, hook, mechanic, icon }) => (
                <div key={app} className="rounded-2xl overflow-hidden flex flex-col"
                  style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}` }}>
                  {/* Reference image */}
                  <div className="overflow-hidden" style={{ height: 200, background: '#111318' }}>
                    <img src={image} alt={`${app} streak UI`}
                      className="w-full h-full object-cover object-top" />
                  </div>
                  {/* Card content */}
                  <div className="p-6 flex flex-col gap-4 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{icon}</span>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: WHITE }}>{app}</p>
                        <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.28)' }}>{tag}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: A }}>Tracks</p>
                        <p className="text-xs font-light leading-relaxed" style={{ color: MUTED }}>{tracks}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: A }}>Key insight</p>
                        <p className="text-xs font-light leading-relaxed" style={{ color: MUTED }}>{hook}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: A }}>Break mechanic</p>
                        <p className="text-xs font-light leading-relaxed" style={{ color: MUTED }}>{mechanic}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Synthesis card — full width */}
              <div className="md:col-span-2 p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start"
                style={{ background: 'rgba(201,23,126,0.06)', border: '1px solid rgba(201,23,126,0.2)' }}>
                <div className="flex-shrink-0">
                  <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: A }}>Synthesis</p>
                  <p className="font-semibold leading-snug" style={{ color: WHITE, fontSize: 'clamp(1rem,1.5vw,1.2rem)', maxWidth: 320 }}>The streak counter must be visible before the user acts — not after.</p>
                </div>
                <p className="text-sm font-light leading-relaxed" style={{ color: MUTED }}>
                  Every effective streak places the number where users see it before deciding whether to engage.
                  For Poshmark sellers, this meant surfacing the streak on the listing entry point — not buried in a profile or a dashboard tab.
                  The bilateral accountability from Snapchat and the escalating reward model from Habitica both informed how we designed the streak's social layer and reward tiers.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── RESEARCH FINDINGS ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#0a0b0f' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-4">
            <SectionLabel>Research Findings</SectionLabel>
            <Heading>Gaps in the market, ripe for Poshmark.</Heading>
          </FadeUp>
          <FadeUp delay={0.08} className="mb-14">
            <Body className="max-w-2xl mt-4">
              Across every competitor studied, the same friction points surfaced. The opportunity wasn't to copy a streak mechanic — it was to solve the problems they all left unsolved.
            </Body>
          </FadeUp>

          <FadeUp delay={0.12}>
            {/* Lags in the market */}
            <p className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: A }}>Lags in the market</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              {[
                {
                  number: '01',
                  title: 'Streaks are disconnected from real value',
                  body: 'Duolingo, Snapchat, and LinkedIn all reward the act of opening the app — not the outcome the user cares about. Sellers don\'t want to "be active," they want to earn. No competitor ties streak maintenance directly to income growth.',
                },
                {
                  number: '02',
                  title: 'All-or-nothing reset kills momentum',
                  body: 'Most platforms (BeReal, Habitica) offer zero forgiveness — a single missed day destroys weeks of progress. This creates anxiety rather than motivation, and drives abandonment at the exact moment re-engagement matters most.',
                },
                {
                  number: '03',
                  title: 'Social pressure is generic or absent',
                  body: "Snapchat's bilateral system works because both parties feel the cost. But no commerce platform has translated that mutual accountability into a seller-to-buyer or seller-to-seller context — leaving a massive social retention lever untapped.",
                },
                {
                  number: '04',
                  title: 'No progressive difficulty or mastery arc',
                  body: 'Every streak studied is flat — day 1 and day 100 feel identical. There is no system that makes a seller feel they are becoming better at the craft, only one that makes them feel they are surviving a countdown.',
                },
                {
                  number: '05',
                  title: 'Freeze mechanics feel punitive, not supportive',
                  body: 'Streak freezes exist as a paid escape hatch (Duolingo) or a one-time lifeline (Snapchat). None frame the break as a natural part of seller life — vacations, illness, busy weeks — making the product feel adversarial.',
                },
                {
                  number: '06',
                  title: 'Discovery of the streak is passive',
                  body: 'Users learn about the streak only after they\'ve already started one. No competitor designs the first-time streak moment as a deliberate onboarding hook — the mechanic is discovered, not introduced.',
                },
              ].map(({ number, title, body }) => (
                <div key={number} className="p-6 rounded-2xl flex flex-col gap-3"
                  style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}` }}>
                  <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.2)' }}>{number}</p>
                  <p className="font-semibold text-sm leading-snug" style={{ color: WHITE }}>{title}</p>
                  <p className="text-xs font-light leading-relaxed" style={{ color: MUTED }}>{body}</p>
                </div>
              ))}
            </div>

            {/* Opportunities */}
            <p className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: A }}>Opportunities</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  icon: '💰',
                  title: 'Tie streaks to earnings, not activity',
                  body: 'Design the streak around listings that sell — not just any listing. When sellers see a direct line between streak consistency and income, the mechanic becomes self-reinforcing. The motivation is intrinsic.',
                  tag: 'Core differentiator',
                },
                {
                  icon: '🛡️',
                  title: 'Introduce a grace period as a feature, not a workaround',
                  body: "Frame a 24-hour grace window as a built-in seller courtesy — a recognition that life happens. This removes anxiety without removing stakes, and models Poshmark as a product that's on the seller's side.",
                  tag: 'Retention lever',
                },
                {
                  icon: '📈',
                  title: 'Build a mastery arc into the streak progression',
                  body: 'Design milestones at 7, 30, 90, and 365 days with unlockable benefits — early access, promoted listings, seller badges. Sellers should feel they are leveling up, not just surviving.',
                  tag: 'Engagement depth',
                },
                {
                  icon: '🤝',
                  title: 'Add a social layer unique to commerce',
                  body: "Buyer visibility into a seller's streak creates a trust signal that has no equivalent in any competitor. A seller's streak length becomes a proxy for reliability — bridging the social accountability gap that only Snapchat comes close to solving.",
                  tag: 'Unique to Poshmark',
                },
              ].map(({ icon, title, body, tag }) => (
                <div key={title} className="p-7 rounded-2xl flex flex-col gap-4"
                  style={{ background: 'rgba(201,23,126,0.04)', border: '1px solid rgba(201,23,126,0.15)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-2xl">{icon}</span>
                    <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: 'rgba(201,23,126,0.12)', color: A }}>{tag}</span>
                  </div>
                  <p className="font-semibold leading-snug" style={{ color: WHITE, fontSize: 'clamp(0.9rem,1.2vw,1rem)' }}>{title}</p>
                  <p className="text-sm font-light leading-relaxed" style={{ color: MUTED }}>{body}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── GOALS ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#0a0b0f' }}>
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
          <div className="flex justify-center" style={{ marginTop: 60 }}>
            <FadeIn delay={0.1}>
              <img src="/images/p1-annotation.png" alt="Streak page design annotations"
                className="rounded-2xl"
                style={{ display: 'block', width: '75%', margin: '0 auto', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))' }} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── DESIGN: STREAK PROGRESSION ── */}
      <section className="py-28 overflow-hidden" style={{ background: '#0a0b0f' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="text-center mb-16">
            <SectionLabel>Streak in Motion</SectionLabel>
            <Heading size="md">Progressive state design as a behavioral reinforcement system.</Heading>
            <p className="mt-4 mx-auto max-w-lg font-light" style={{ color: MUTED, fontSize: '1rem' }}>
              Each week produces a distinct visual state — variable ratio reinforcement made tangible.
            </p>
          </FadeUp>
        </div>
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-center gap-10 sm:gap-8 px-4" style={{ maxWidth: 880, margin: '0 auto', paddingBottom: 20 }}>
            {[
              { src: '/images/p1-phone-w2a.png', label: '01 — Week 2', sub: 'Streak Registered', delay: 0.05 },
              { src: '/images/p1-phone-w2b.png', label: '02 — Week 3', sub: 'Social Proof Nudge', delay: 0.12 },
              { src: '/images/p1-phone-w2c.png', label: '03 — Current Week 4', sub: 'Urgency Reframe', delay: 0.19 },
            ].map(({ src, label, sub, delay }) => (
              <div key={label} className="flex flex-col items-center w-full sm:flex-1 max-w-[200px] sm:max-w-[250px] mx-auto sm:mx-0" style={{ gap: 40 }}>
                <Phone src={src} alt={label} delay={delay} />
                <FadeUp delay={delay + 0.12} className="text-center">
                  <span className="block font-bold text-xs uppercase tracking-widest" style={{ color: A }}>{label}</span>
                  <span className="block text-xs font-light mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{sub}</span>
                </FadeUp>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── DESIGN: WEEK 4 REWARD ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center gap-4 md:gap-6">
              <div style={{ width: 'clamp(140px, 28vw, 220px)' }}>
                <Phone src="/images/p1-phone-w4a.png" alt="Week 4 congratulations" delay={0.05} />
              </div>
              <div style={{ width: 'clamp(140px, 28vw, 220px)' }}>
                <Phone src="/images/p1-phone-w4b.png" alt="Week 4 reward unlock" delay={0.18} />
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-12">
            {[
              { tag: 'Ceremony', note: 'Two-stage delivery signals the achievement was worth interrupting the page state' },
              { tag: '7-day expiry', note: 'Creates a secondary return trigger independent of the streak itself' },
              { tag: 'Low friction', note: 'Shipping discount aligns with existing seller behaviour — no new action required' },
            ].map(({ tag, note }, i) => (
              <FadeUp key={tag} delay={0.06 * i}>
                <div className="h-full flex flex-col gap-2 p-4 rounded-xl" style={{ background: 'rgba(201,23,126,0.06)', border: '1px solid rgba(201,23,126,0.15)' }}>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md self-start" style={{ background: 'rgba(201,23,126,0.15)', color: A }}>{tag}</span>
                  <span className="text-xs font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{note}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── REWARD ICONS ── */}
      <section className="relative overflow-hidden py-28 px-6 md:px-10" style={{ background: 'linear-gradient(180deg, #0d0e12 0%, #120a16 50%, #0d0e12 100%)' }}>
        {/* Deep radial bloom */}
        <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)', width: 1000, height: 600, background: 'radial-gradient(ellipse, rgba(201,23,126,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />
        {/* Top shimmer line */}
        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,23,126,0.4), transparent)' }} />

        <div className="relative max-w-5xl mx-auto">

          {/* Header */}
          <FadeUp className="text-center mb-16">
            <SectionLabel>Streak Rewards</SectionLabel>
            <Heading size="md">Earn your badge. Keep your streak.</Heading>
            <p className="mt-4 text-sm font-light" style={{ color: MUTED }}>Five exclusive titles unlocked as sellers hit weekly listing milestones.</p>
          </FadeUp>

          {/* Main GIF — full-width spotlight presentation */}
          <FadeUp delay={0.1} className="flex justify-center mb-24">
            <div className="relative w-full" style={{ maxWidth: 576 }}>
              {/* Outer glow ring */}
              <div style={{ position: 'absolute', inset: -1, borderRadius: 48, background: 'linear-gradient(135deg, rgba(201,23,126,0.5), rgba(201,23,126,0.05) 50%, rgba(201,23,126,0.3))', zIndex: 1 }} />
              {/* GIF */}
              <div style={{ position: 'relative', zIndex: 2, borderRadius: 46, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(201,23,126,0.2), 0 40px 120px rgba(0,0,0,0.7), 0 0 120px rgba(201,23,126,0.36), 0 0 60px rgba(201,23,126,0.24)' }}>
                <img
                  src="/images/reward-card-animation.gif"
                  alt="Reward card animation"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
              {/* Reflection bloom below — outside overflow so it's visible */}
              <div style={{ position: 'absolute', bottom: -60, left: '5%', right: '5%', height: 100, background: 'rgba(201,23,126,0.28)', filter: 'blur(50px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
            </div>
          </FadeUp>

          {/* Other Rewards heading */}
          <FadeUp delay={0.12} className="text-center mb-10">
            <SectionLabel>Other Rewards</SectionLabel>
            <Heading size="sm">App Icons</Heading>
          </FadeUp>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {[
              { src: '/images/icon-reward-1.png', label: 'Posh Classic', week: 'W1' },
              { src: '/images/icon-reward-2.png', label: "Poshin' for the Planet", week: 'W2' },
              { src: '/images/icon-reward-3.png', label: "Sky's the Limit", week: 'W3' },
              { src: '/images/icon-reward-4.png', label: 'Secondhand Superstar', week: 'W4' },
              { src: '/images/icon-reward-5.png', label: 'Denim Luxe', week: 'W5+' },
            ].map(({ src, label, week }, i) => (
              <FadeUp key={label} delay={0.07 * i}>
                <div className="flex flex-col items-center gap-4" style={{ width: 130 }}>
                  <div className="relative flex items-center justify-center" style={{ width: 110, height: 110 }}>
                    <div style={{ position: 'absolute', inset: -8, background: 'radial-gradient(ellipse at center, rgba(201,23,126,0.3) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(10px)' }} />
                    <div style={{ position: 'relative', width: 110, height: 110, borderRadius: 26, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,23,126,0.18)', boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src={src} alt={label} style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: '22%' }} />
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,23,126,0.15)', color: A, letterSpacing: '0.05em' }}>{week}</span>
                  <span className="text-xs font-medium text-center leading-tight" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                </div>
              </FadeUp>
            ))}
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
            </FadeUp>
            <div className="flex justify-center gap-4 md:gap-6">
              <div style={{ width: 'clamp(140px, 28vw, 220px)' }}>
                <Phone src="/images/p1-phone-brokena.png" alt="Broken streak actionsheet" delay={0.1} />
              </div>
              <div style={{ width: 'clamp(140px, 28vw, 220px)' }}>
                <Phone src="/images/p1-phone-brokenb.png" alt="Streak reset view" delay={0.22} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-12">
            {[
              { tag: 'Shown once', note: 'Actionsheet surfaces exactly once per lapse — prevents shame accumulation across sessions' },
              { tag: '"Regain" framing', note: 'Restores perceived agency and avoids the learned helplessness of punitive copy' },
              { tag: 'Clean slate', note: 'Post-dismiss state is identical to week 1 — structural parity signals a fresh start, not a failure' },
            ].map(({ tag, note }, i) => (
              <FadeUp key={tag} delay={0.06 * i}>
                <div className="h-full flex flex-col gap-2 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md self-start" style={{ background: 'rgba(201,23,126,0.15)', color: A }}>{tag}</span>
                  <span className="text-xs font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{note}</span>
                </div>
              </FadeUp>
            ))}
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
              { label: 'Repeat Listers Recovery', node: <AnimatedNumber target={3.2} suffix="pp" />, sub: '+3.2pp improvement vs. −7% pre-launch baseline' },
              { label: 'W2–W4 Retention Δ', node: <span className="font-semibold" style={{ color: A, fontSize: 'clamp(2.4rem,4vw,3.4rem)', lineHeight: 1 }}>+1%</span>, sub: 'lister retention improvement in critical drop-off window' },
            ].map(({ label, node, sub }) => (
              <div key={label} className="p-6 rounded-2xl flex flex-col"
                style={{ background: 'rgba(201,23,126,0.07)', border: '1px solid rgba(201,23,126,0.18)' }}>
                <span className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.85)', minHeight: '2.5em', display: 'flex', alignItems: 'flex-start' }}>{label}</span>
                {node}
                <span className="text-xs font-light leading-snug mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>{sub}</span>
              </div>
            ))}
          </FadeUp>

          {/* Line chart */}
          <FadeUp delay={0.12} className="rounded-2xl p-6 sm:p-8 mb-8"
            style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <p className="font-semibold text-sm" style={{ color: WHITE }}>Lister Growth Index (Base 100)</p>
                <p className="text-xs font-light mt-0.5" style={{ color: MUTED }}>15-week trajectory — post-launch vs. prior year, indexed to Week 1</p>
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

          {/* Recovery metric bars */}
          <FadeUp delay={0.14} className="rounded-2xl p-6 sm:p-8"
            style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}` }}>
            <p className="font-semibold text-sm mb-1" style={{ color: WHITE }}>YoY decline recovered — 15 weeks post-launch</p>
            <p className="text-xs font-light mb-6" style={{ color: MUTED }}>Percentage-point improvement vs. pre-launch baseline</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <MetricBar label="Weekly Streaksters" before={-4.5} after={-0.7} suffix="%" delay={0} />
              <MetricBar label="Repeat Listers" before={-7.0} after={-3.8} suffix="%" delay={0.1} />
            </div>
            <p className="text-xs mt-6 font-light" style={{ color: 'rgba(255,255,255,0.22)' }}>
              Both signals moved from sustained decline into near-recovery within 15 weeks — reversing a trajectory that had held negative for the prior four quarters. Effect size is directionally significant; full attribution requires longer observation.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── ENGAGEMENT SIGNALS ── */}
      <section className="py-28 px-6 md:px-10" style={{ background: '#080a0f' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <SectionLabel>Community Signal</SectionLabel>
            <Heading size="md">Engagement the data didn't anticipate.</Heading>
            <p className="mt-4 mx-auto max-w-lg font-light" style={{ color: MUTED, fontSize: '1rem' }}>
              Behavioral signals from seller support tickets and community feedback — 15 weeks post-launch.
            </p>
          </FadeUp>

          {/* Bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4" style={{ gridAutoRows: 'auto' }}>

            {/* Card 1 — Hero: 81% — spans 3 cols, tall */}
            <FadeUp delay={0.05} className="col-span-2 md:col-span-3">
              <div className="h-full rounded-3xl p-8 flex flex-col gap-3 overflow-hidden relative"
                style={{ background: `linear-gradient(135deg, rgba(201,23,126,0.18) 0%, rgba(201,23,126,0.05) 100%)`, border: '1px solid rgba(201,23,126,0.25)', minHeight: 220 }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(201,23,126,0.08)', filter: 'blur(40px)' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(201,23,126,0.7)' }}>Positive reception</span>
                <div className="font-black leading-none" style={{ fontSize: 'clamp(3.2rem, 8vw, 4.8rem)', color: A }}>81%</div>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 280 }}>
                  168 upvotes vs 38 downvotes on the feature help article — sellers approved of the concept before UX friction was resolved.
                </p>
              </div>
            </FadeUp>

            {/* Card 2 — W5→W8 — spans 3 cols */}
            <FadeUp delay={0.1} className="col-span-2 md:col-span-3">
              <div className="h-full rounded-3xl p-8 flex flex-col gap-3 overflow-hidden relative"
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}`, minHeight: 220 }}>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>Habit formation</span>
                <div className="font-black leading-none" style={{ fontSize: 'clamp(3.2rem, 8vw, 4.8rem)', color: WHITE }}>W5 <span style={{ color: A }}>→</span> W8</div>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 300 }}>
                  Sellers maintained streaks well beyond the 4-week milestone — the habit loop was stickier than the reward itself.
                </p>
              </div>
            </FadeUp>

            {/* Card 3 — Organic demand — spans 2 cols */}
            <FadeUp delay={0.13} className="col-span-2">
              <div className="h-full rounded-3xl p-6 flex flex-col gap-3"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${BORDER}`, minHeight: 160 }}>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>Seller pull</span>
                <p className="text-sm font-light leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Sellers who hadn't received access wrote in asking to join — the feature generated its own word-of-mouth before any push marketing.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black" style={{ color: WHITE }}>Word of mouth</span>
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <path d="M5.60431 21.8312L11.7197 15.7155L16.0879 20.0838L25.6978 10.4735M21.5449 9.59961H26.5727V14.6278" stroke="white" strokeWidth="2.7912" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </FadeUp>

            {/* Card 4 — Loss aversion — spans 2 cols */}
            <FadeUp delay={0.16} className="col-span-2">
              <div className="h-full rounded-3xl p-6 flex flex-col gap-3"
                style={{ background: 'rgba(201,23,126,0.06)', border: '1px solid rgba(201,23,126,0.15)', minHeight: 160 }}>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(201,23,126,0.6)' }}>Identity shift</span>
                <p className="text-sm font-light leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Sellers reached out to preserve their streak after accidental cancellations — it had become part of how they saw themselves as sellers.
                </p>
                <span className="text-2xl font-black" style={{ color: A }}>I'm a lister.</span>
              </div>
            </FadeUp>

            {/* Card 5 — Live promotion — spans 2 cols */}
            <FadeUp delay={0.19} className="col-span-2">
              <div className="h-full rounded-3xl p-6 flex flex-col gap-3"
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}`, minHeight: 160 }}>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>Changed selling behaviour</span>
                <p className="text-sm font-light leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Sellers announced streak discounts during live shows to drive instant purchases — the feature became a sales tool.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black" style={{ color: WHITE }}>Live</span>
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <path d="M5.60431 21.8312L11.7197 15.7155L16.0879 20.0838L25.6978 10.4735M21.5449 9.59961H26.5727V14.6278" stroke="white" strokeWidth="2.7912" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </FadeUp>


          </div>
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
