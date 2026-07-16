import { useState, useRef, useCallback, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, BookOpen, Package, Target, Users, Sparkles, UserPlus, Trophy, TrendingUp, Layout, Megaphone, Shield, Workflow, PenTool, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ACCENT = '#F1FF58'
const BG = '#111200'

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
const CIRCLE_X = 58     // circle center x — right side, next to (not on) the line
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

interface Bullet { Icon: LucideIcon; heading: string; body: string }
interface Role { title: string; period: string; bullets: Bullet[] }
interface Company { id: string; name: string; logo: string | null; initials: string; roles: Role[] }

const COMPANIES: Company[] = [
  {
    id: 'poshmark', name: 'Poshmark', logo: '/images/poshmark-logo.png', initials: 'PM',
    roles: [
      {
        title: 'Product Designer', period: 'Feb 2022 – Present',
        bullets: [
          { Icon: TrendingUp, heading: 'Seller Growth Design', body: 'Led end-to-end design for seller growth features including Listing Streaks, earning a 14% weekly lister conversion uplift.' },
          { Icon: Zap, heading: 'Motion & Animation System', body: 'Owned the Motion & Animation design system — Pull-to-Refresh, onboarding, and brand moments shipped to millions of users.' },
          { Icon: Workflow, heading: 'Cross-functional Leadership', body: 'Drove cross-functional alignment across Product, Engineering, and Marketing to ship high-impact features quarterly.' },
          { Icon: BookOpen, heading: 'Design System & Standards', body: 'Established design principles and component libraries adopted across 3+ product teams.' },
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
          { Icon: Layers, heading: 'End-to-end Product Design', body: 'Owned the full design of customer-facing web and mobile experiences for a gold investment platform — from discovery to pixel-perfect delivery.' },
          { Icon: BookOpen, heading: 'Design Language & Standards', body: 'Established design guidelines, component standards, and best practices that gave the product a coherent, trustworthy visual language.' },
        ],
      },
    ],
  },
  {
    id: 'iofactory', name: 'IO Factory', logo: null, initials: 'IO',
    roles: [
      {
        title: 'Product Designer', period: 'May 2019 – Sep 2021',
        bullets: [
          { Icon: Package, heading: '30+ SaaS Products Shipped', body: 'Designed new products, interfaces, and user experiences across 30+ SaaS platforms — including Pipeline, People, Budget, Mapbox, and VR Viewer.' },
          { Icon: Target, heading: 'Strategy to Execution', body: 'Single-handedly drove design strategy and tactical execution across complex, multi-stakeholder projects from brief to ship.' },
          { Icon: Users, heading: 'Engineering Collaboration', body: 'Partnered with engineering and product managers to produce user flows, wireframes, high-fidelity mockups, and micro-interaction prototypes.' },
          { Icon: Sparkles, heading: 'Brand-led Simplicity', body: "Simplified complex user interactions while preserving each product's brand personality and unique identity." },
          { Icon: BookOpen, heading: 'Studio Design Standards', body: "Defined design guidelines and best practices that standardised quality across the studio's portfolio." },
          { Icon: UserPlus, heading: 'Team Building & Mentorship', body: "Hired and mentored freelance designers and interns, scaling the team's capacity to meet product demand." },
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
          { Icon: Trophy, heading: 'Client Ownership', body: 'Led projects end-to-end — accountable not just for design delivery but for managing client relationships and expectations throughout.' },
          { Icon: Layers, heading: 'Concept to Implementation', body: 'Contributed hands-on at every stage, from early concept exploration through to detailed end-to-end implementation.' },
          { Icon: TrendingUp, heading: 'Business Development', body: 'Shaped business development by crafting compelling design proposals for prospective clients.' },
          { Icon: Users, heading: 'Team Management', body: 'Managed junior designers, setting direction and ensuring on-time delivery to a high standard.' },
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
          { Icon: Layout, heading: 'Web & Mobile Interfaces', body: 'Designed webpage layouts, wireframes, and interaction flows for web and mobile apps across a range of client industries.' },
          { Icon: Megaphone, heading: 'Marketing & Brand Assets', body: 'Delivered digital marketing assets — ads, event creatives, sales decks, and brand collateral — at pace and to brief.' },
          { Icon: Shield, heading: 'Brand Consistency', body: 'Upheld brand consistency by working within predefined brand guidelines on every project.' },
          { Icon: PenTool, heading: 'Creative Collaboration', body: 'Collaborated closely with the Creative and Digital Marketing teams to ensure cohesive, on-brand output.' },
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

  const PHOTO_W = 220
  const PHOTO_H = 600

  return (
    <section id="experience" style={{ background: BG, fontFamily: "'Kanit', sans-serif", position: 'relative', overflow: 'hidden' }}>
      <div style={{ height: 1, background: 'rgba(241,255,88,0.08)' }} />
      <div className="mx-auto px-6 md:px-12 py-24 md:py-32" style={{ maxWidth: 1480 }}>

        {/* Header */}
        <div className="mb-16 md:mb-20 text-center">
          <p className="uppercase tracking-[0.22em] text-xs font-semibold mb-3"
            style={{ color: ACCENT, fontFamily: "'Poppins', sans-serif" }}>My Journey</p>
          <h2 className="font-semibold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: WHITE, fontFamily: "'Poppins', sans-serif" }}>
            Over The Years
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

          {/* ── RIGHT: Role content (photo is outside container) ── */}
          <div className="flex flex-1 min-w-0 items-start" style={{ paddingLeft: 40, paddingRight: PHOTO_W + 32 }}>

            {/* Role content — open layout, no cards */}
            <div className="flex-1 min-w-0" ref={contentRef}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {COMPANIES[active].roles.map((role, ri) => (
                    <div key={ri} className={ri > 0 ? 'mt-10 pt-10' : ''}
                      style={ri > 0 ? { borderTop: '1px solid rgba(255,255,255,0.07)' } : {}}>

                      {/* Big company name */}
                      <h3 className="font-semibold leading-tight mb-3"
                        style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', color: WHITE, fontFamily: "'Poppins', sans-serif" }}>
                        {COMPANIES[active].name}
                      </h3>

                      {/* Role title + period row */}
                      <div className="flex items-center gap-3 mb-6 flex-wrap">
                        <span style={{ color: ACCENT, fontSize: '0.9rem', fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                          {role.title}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                        <span style={{ color: MUTED, fontSize: '0.85rem', fontFamily: "'Poppins', sans-serif" }}>
                          {role.period}
                        </span>
                      </div>

                      {/* Bullets — icon + heading + body grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                        {role.bullets.map(({ Icon, heading, body }, bi) => (
                          <div key={bi} className="flex flex-col gap-3">
                            {/* Icon circle */}
                            <div style={{
                              width: 44, height: 44, borderRadius: '50%',
                              background: 'rgba(241,255,88,0.07)',
                              border: '1px solid rgba(241,255,88,0.15)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0,
                            }}>
                              <Icon size={18} color={ACCENT} strokeWidth={1.5} />
                            </div>
                            {/* Heading */}
                            <p style={{ color: WHITE, fontWeight: 600, fontSize: 'clamp(0.9rem, 1.2vw, 1rem)', fontFamily: "'Poppins', sans-serif", lineHeight: 1.3 }}>
                              {heading}
                            </p>
                            {/* Body */}
                            <p style={{ color: MUTED, fontSize: 'clamp(0.82rem, 1vw, 0.92rem)', lineHeight: 1.75 }}>
                              {body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* Photo — bleeds to right edge, fixed size, outside container */}
      <div
        className="hidden lg:block"
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: PHOTO_W,
          height: PHOTO_H,
          borderRadius: '16px 0 0 16px',
          overflow: 'hidden',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
        }}
      >
        <img
          src="/images/Portfolio pic.png"
          alt="Hari Prasad L"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
        />
      </div>
    </section>
  )
}
