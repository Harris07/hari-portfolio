import { useState, useRef, useCallback, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ACCENT = '#F1FF58'
const BG = '#111200'
const CARD_BG = 'rgba(241,255,88,0.05)'
const CARD_BORDER = 'rgba(241,255,88,0.12)'
const WHITE = '#ffffff'
const MUTED = 'rgba(255,255,255,0.55)'

// Fixed geometry
const SLOT_SIZE = 52    // logo bubble diameter
const SLOT_GAP = 50     // visual gap between logos
const TRACK_HEIGHT = 660  // full line height (unchanged)
const LOGO_BLOCK_H = 5 * SLOT_SIZE + 4 * SLOT_GAP  // 460px
const LOGO_OFFSET = (TRACK_HEIGHT - LOGO_BLOCK_H) / 2  // 100px top padding to center logos in track
// Arrow snap positions — centered within the track
const SLOT_POSITIONS = Array.from({ length: 5 }, (_, i) =>
  LOGO_OFFSET + i * (SLOT_SIZE + SLOT_GAP) + SLOT_SIZE / 2
)
// [126, 228, 330, 432, 534]

// Line SVG geometry
// Line is on the LEFT side; circle is separate on the RIGHT side of the container
const CONTAINER_W = 96
const LINE_X = 16       // thin vertical line, left portion
const BULGE_X = 4       // bulge peak — goes LEFT toward logos
const CIRCLE_X = 68     // circle center x — right side, next to (not on) the line
const CIRCLE_R = 28     // +20px diameter vs original 18r (36 → 56 diameter)
const BULGE_SPREAD = 70

function buildLinePath(arrowY: number): string {
  const top = 0
  const bot = TRACK_HEIGHT
  const y0 = Math.max(top, arrowY - BULGE_SPREAD)
  const y1 = Math.min(bot, arrowY + BULGE_SPREAD)
  const sa = arrowY - y0
  const sb = y1 - arrowY
  const parts: string[] = [`M ${LINE_X} ${top}`]
  if (y0 > top) parts.push(`L ${LINE_X} ${y0}`)
  // Wider control point spread makes the S-curve smooth, not pinched
  parts.push(
    `C ${LINE_X} ${arrowY - sa * 0.5}, ${BULGE_X} ${arrowY - sa * 0.35}, ${BULGE_X} ${arrowY}`,
    `C ${BULGE_X} ${arrowY + sb * 0.35}, ${LINE_X} ${arrowY + sb * 0.5}, ${LINE_X} ${y1}`,
  )
  if (y1 < bot) parts.push(`L ${LINE_X} ${bot}`)
  return parts.join(' ')
}

interface Role { title: string; period: string; bullets: string[] }
interface Company { id: string; name: string; logo: string | null; initials: string; roles: Role[] }

const COMPANIES: Company[] = [
  {
    id: 'poshmark', name: 'Poshmark', logo: '/images/poshmark-logo.png', initials: 'PM',
    roles: [
      {
        title: 'Product Designer', period: 'Feb 2022 – Present',
        bullets: [
          'Led end-to-end design for seller growth features including Listing Streaks, earning a 14% weekly lister conversion uplift.',
          'Owned the Motion & Animation design system — Pull-to-Refresh, onboarding, and brand moments shipped to millions of users.',
          'Drove cross-functional alignment across Product, Engineering, and Marketing to ship high-impact features quarterly.',
          'Established design principles and component libraries adopted across 3+ product teams.',
        ],
      },
    ],
  },
  {
    id: 'goldsetu', name: 'Goldsetu', logo: null, initials: 'GS',
    roles: [
      {
        title: 'Product Designer', period: 'Oct 2021 – Jan 2022',
        bullets: [
          'Designed product flows and motion design for a gold investment platform targeting first-time investors.',
          'Delivered end-to-end UI for onboarding, portfolio, and transaction experiences in 4 months.',
          'Collaborated closely with engineering to ship pixel-perfect components on a tight timeline.',
        ],
      },
    ],
  },
  {
    id: 'iofactory', name: 'IO Factory', logo: null, initials: 'IO',
    roles: [
      {
        title: 'Product Designer', period: 'May 2019 – Oct 2021',
        bullets: [
          'Designed across multiple client products — fintech, health, and e-commerce — spanning 0→1 and iteration phases.',
          'Led user research, wireframing, and high-fidelity prototyping for 6+ shipped products over 2.5 years.',
          'Built and maintained design systems that reduced handoff friction and accelerated delivery by 30%.',
        ],
      },
    ],
  },
  {
    id: 'kilobyte', name: 'Kilobyte Technologies', logo: null, initials: 'KB',
    roles: [
      {
        title: 'UI/UX Designer', period: 'May 2018 – Apr 2019',
        bullets: [
          'Designed UI for SaaS dashboards and mobile apps, translating complex data into intuitive interfaces.',
          'Conducted usability testing sessions and iterated on designs based on user feedback.',
          'Produced design specs, style guides, and assets for engineering handoff.',
        ],
      },
    ],
  },
  {
    id: 'firius', name: 'Firius Technologies', logo: null, initials: 'FT',
    roles: [
      {
        title: 'UI/UX Designer', period: 'Jul 2015 – Jul 2016',
        bullets: [
          'Created visual designs and interaction flows for web and mobile products across diverse industries.',
          'Developed graphic design assets, brand materials, and marketing collateral.',
          'Collaborated with developers to ensure design fidelity through the build process.',
        ],
      },
    ],
  },
]

export default function ExperienceSection() {
  const [active, setActive] = useState(0)
  // arrowY is in "track coordinates" (0 = top of track)
  const [arrowY, setArrowY] = useState(SLOT_POSITIONS[0])
  const [dragging, setDragging] = useState(false)

  // Ref to the SVG element so we can map pointer clientY → track coords
  const svgRef = useRef<SVGSVGElement>(null)
  const dragStartClientY = useRef(0)
  const dragStartArrowY = useRef(0)

  // Content area ref to measure height for photo
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentH, setContentH] = useState<number | null>(null)

  useLayoutEffect(() => {
    if (!contentRef.current) return
    const ro = new ResizeObserver(entries => {
      setContentH(entries[0].contentRect.height)
    })
    ro.observe(contentRef.current)
    return () => ro.disconnect()
  }, [active])

  const snapToSlot = useCallback((idx: number) => {
    setActive(idx)
    setArrowY(SLOT_POSITIONS[idx])
  }, [])

  const nearestSlot = (y: number) => {
    let best = 0, bestD = Infinity
    SLOT_POSITIONS.forEach((pos, i) => {
      const d = Math.abs(pos - y)
      if (d < bestD) { bestD = d; best = i }
    })
    return best
  }

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    setDragging(true)
    dragStartClientY.current = e.clientY
    dragStartArrowY.current = arrowY
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const dy = e.clientY - dragStartClientY.current
    const newY = Math.max(
      SLOT_POSITIONS[0],
      Math.min(SLOT_POSITIONS[SLOT_POSITIONS.length - 1], dragStartArrowY.current + dy)
    )
    setArrowY(newY)
    setActive(nearestSlot(newY))
  }

  const onPointerUp = () => {
    if (!dragging) return
    setDragging(false)
    const snap = nearestSlot(arrowY)
    setActive(snap)
    setArrowY(SLOT_POSITIONS[snap])
  }

  const linePath = buildLinePath(arrowY)

  return (
    <section id="experience" style={{ background: BG, fontFamily: "'Kanit', sans-serif" }}>
      <div style={{ height: 1, background: 'rgba(241,255,88,0.08)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p className="uppercase tracking-[0.22em] text-xs font-semibold mb-3"
            style={{ color: ACCENT, fontFamily: "'Poppins', sans-serif" }}>Career</p>
          <h2 className="font-semibold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: WHITE, fontFamily: "'Poppins', sans-serif" }}>
            Work Experience
          </h2>
        </div>

        {/* Main layout */}
        <div className="flex items-start gap-2 md:gap-3">

          {/* ── LEFT: Fixed-spaced company list ── */}
          <div
            className="flex-shrink-0 flex flex-col"
            style={{ gap: SLOT_GAP, paddingTop: LOGO_OFFSET }}
          >
            {COMPANIES.map((co, i) => (
              <button
                key={co.id}
                onClick={() => snapToSlot(i)}
                className="flex items-center gap-4 text-left"
                style={{ background: 'none', border: 'none', cursor: 'pointer', height: SLOT_SIZE }}
              >
                {/* Logo bubble */}
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden transition-all duration-300"
                  style={{
                    width: SLOT_SIZE,
                    height: SLOT_SIZE,
                    background: i === active ? 'rgba(241,255,88,0.12)' : 'rgba(255,255,255,0.06)',
                    border: `2px solid ${i === active ? ACCENT : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: i === active ? `0 0 16px rgba(241,255,88,0.25)` : 'none',
                    transition: 'all 0.3s',
                  }}
                >
                  {co.logo ? (
                    <img src={co.logo} alt={co.name}
                      style={{ width: 32, height: 32, objectFit: 'contain' }} />
                  ) : (
                    <span style={{ color: i === active ? ACCENT : MUTED, fontSize: 12, fontWeight: 700 }}>{co.initials}</span>
                  )}
                </div>
                {/* Company name + period */}
                <div className="hidden md:flex flex-col gap-0.5">
                  <span
                    className="font-medium"
                    style={{
                      color: i === active ? WHITE : MUTED,
                      fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
                      fontFamily: "'Poppins', sans-serif",
                      whiteSpace: 'nowrap',
                      transition: 'color 0.3s',
                    }}
                  >
                    {co.name}
                  </span>
                  <span
                    style={{
                      color: i === active ? 'rgba(241,255,88,0.6)' : 'rgba(255,255,255,0.3)',
                      fontSize: '0.72rem',
                      fontFamily: "'Poppins', sans-serif",
                      whiteSpace: 'nowrap',
                      transition: 'color 0.3s',
                    }}
                  >
                    {co.roles[0].period}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* ── CENTER: SVG line (left) + draggable circle (right, separate) ── */}
          <div
            className="flex-shrink-0 relative select-none"
            style={{ width: CONTAINER_W, height: TRACK_HEIGHT }}
          >
            {/* SVG — only draws the vertical line with left-facing bulge */}
            <svg
              ref={svgRef}
              width={CONTAINER_W}
              height={TRACK_HEIGHT}
              style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2={TRACK_HEIGHT} gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
                  <stop offset="12%"  stopColor={ACCENT} stopOpacity="0.7" />
                  <stop offset="50%"  stopColor={ACCENT} stopOpacity="1" />
                  <stop offset="88%"  stopColor={ACCENT} stopOpacity="0.7" />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                </linearGradient>
                <filter id="lineGlow" x="-400%" y="-20%" width="900%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {/* Soft glow behind line — same gradient so ends fade too */}
              <motion.path d={linePath} fill="none" stroke="url(#lineGrad)"
                strokeWidth={6} strokeOpacity={0.3} filter="url(#lineGlow)"
                animate={{ d: linePath }}
                transition={dragging ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 28 }} />
              {/* Main line */}
              <motion.path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth={2}
                animate={{ d: linePath }}
                transition={dragging ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 28 }} />
            </svg>

            {/* Arrow circle — right side, separate from line, draggable */}
            <motion.div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              animate={{ y: arrowY - CIRCLE_R }}
              transition={dragging ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 28 }}
              style={{
                position: 'absolute',
                left: CIRCLE_X - CIRCLE_R,
                top: 0,
                width: CIRCLE_R * 2,
                height: CIRCLE_R * 2,
                borderRadius: '50%',
                background: ACCENT,
                border: `1.5px solid rgba(241,255,88,0.9)`,
                boxShadow: `0 0 0 10px rgba(241,255,88,0.18), 0 0 22px rgba(241,255,88,0.45), 0 0 45px rgba(241,255,88,0.18)`,
                cursor: dragging ? 'grabbing' : 'grab',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'none',
                zIndex: 10,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 2.5L12 6"    stroke={BG} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 10L8 13.5L12 10" stroke={BG} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>

          {/* ── RIGHT: Role cards + Photo ── */}
          <div className="flex flex-1 gap-6 lg:gap-8 min-w-0 items-start">

            {/* Role content */}
            <div className="flex-1 min-w-0" ref={contentRef}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <p className="text-xs uppercase tracking-widest font-semibold mb-5"
                    style={{ color: ACCENT, fontFamily: "'Poppins', sans-serif" }}>
                    {COMPANIES[active].name}
                  </p>
                  <div className="flex flex-col gap-5">
                    {COMPANIES[active].roles.map((role, ri) => (
                      <div key={ri} className="rounded-2xl p-6"
                        style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
                        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                          <h3 className="font-semibold"
                            style={{ color: WHITE, fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', fontFamily: "'Poppins', sans-serif" }}>
                            {role.title}
                          </h3>
                          <span className="text-xs px-3 py-1 rounded-full flex-shrink-0"
                            style={{ background: 'rgba(241,255,88,0.1)', color: ACCENT, border: `1px solid rgba(241,255,88,0.2)`, fontFamily: "'Poppins', sans-serif" }}>
                            {role.period}
                          </span>
                        </div>
                        <ul className="flex flex-col gap-2">
                          {role.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-3">
                              <span className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                              <span style={{ color: MUTED, fontSize: 'clamp(0.83rem, 1.05vw, 0.93rem)', lineHeight: 1.7 }}>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Photo — matches content height */}
            <div
              className="flex-shrink-0 hidden lg:block overflow-hidden rounded-2xl"
              style={{
                width: 180,
                height: contentH ?? TRACK_HEIGHT,
                border: `2px solid rgba(241,255,88,0.15)`,
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                transition: 'height 0.4s ease',
              }}
            >
              <img
                src="/images/Portfolio pic.png"
                alt="Hari Prasad L"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
