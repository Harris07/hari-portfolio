import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ACCENT = '#F1FF58'
const BG = '#111200'
const CARD_BG = 'rgba(241,255,88,0.05)'
const CARD_BORDER = 'rgba(241,255,88,0.12)'
const WHITE = '#ffffff'
const MUTED = 'rgba(255,255,255,0.55)'

interface Role {
  title: string
  period: string
  bullets: string[]
}

interface Company {
  id: string
  name: string
  logo: string | null
  initials: string
  roles: Role[]
}

const COMPANIES: Company[] = [
  {
    id: 'poshmark',
    name: 'Poshmark',
    logo: '/images/poshmark-logo.png',
    initials: 'PM',
    roles: [
      {
        title: 'Principal Product Designer',
        period: '2022 – Present',
        bullets: [
          'Led end-to-end design for seller growth features including Listing Streaks, earning a 14% weekly lister conversion uplift.',
          'Owned the Motion & Animation design system — Pull-to-Refresh, onboarding, and brand moments shipped to millions of users.',
          'Drove cross-functional alignment across Product, Engineering, and Marketing to ship high-impact features quarterly.',
          'Established design principles and component libraries adopted across 3+ product teams.',
        ],
      },
      {
        title: 'Senior Product Designer',
        period: '2020 – 2022',
        bullets: [
          'Designed the Poshmark Illustration System — a comprehensive visual language unifying brand storytelling across the app.',
          'Collaborated with the data science team to instrument UX metrics and iterate on A/B test results.',
          'Mentored 2 junior designers, conducting weekly design critiques and building a culture of craft.',
        ],
      },
    ],
  },
  {
    id: 'fitzoo',
    name: 'Fitzoo',
    logo: '/images/fitzoo-logo.png',
    initials: 'FZ',
    roles: [
      {
        title: 'Lead Product Designer',
        period: '2018 – 2020',
        bullets: [
          'Designed Fitzoo from 0→1 — strategy, information architecture, visual design, and design system.',
          'Built end-to-end user flows for fitness tracking, coach panels, and personalized workout experiences.',
          'Conducted user research with 50+ athletes to validate feature prioritisation and prototype iterations.',
          'Shipped the iOS app in 6 months with a Net Promoter Score of 72 at launch.',
        ],
      },
    ],
  },
  {
    id: 'company3',
    name: 'Company Name',
    logo: null,
    initials: 'C3',
    roles: [
      {
        title: 'Product Designer',
        period: '2016 – 2018',
        bullets: [
          'Add your role and responsibilities here.',
          'Describe key projects and outcomes.',
          'Highlight measurable impact and team contributions.',
        ],
      },
    ],
  },
  {
    id: 'company4',
    name: 'Company Name',
    logo: null,
    initials: 'C4',
    roles: [
      {
        title: 'UI/UX Designer',
        period: '2015 – 2016',
        bullets: [
          'Add your role and responsibilities here.',
          'Describe key projects and outcomes.',
          'Highlight measurable impact and team contributions.',
        ],
      },
    ],
  },
  {
    id: 'company5',
    name: 'Company Name',
    logo: null,
    initials: 'C5',
    roles: [
      {
        title: 'Junior Designer',
        period: '2013 – 2015',
        bullets: [
          'Add your role and responsibilities here.',
          'Describe key projects and outcomes.',
          'Highlight measurable impact and team contributions.',
        ],
      },
    ],
  },
]

export default function ExperienceSection() {
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const [slotPositions, setSlotPositions] = useState<number[]>([])
  const [arrowY, setArrowY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStartY = useRef(0)
  const dragStartArrowY = useRef(0)

  // Measure slot positions relative to track top
  useEffect(() => {
    const slots = trackRef.current?.querySelectorAll<HTMLElement>('[data-slot]')
    if (!slots) return
    const trackTop = trackRef.current!.getBoundingClientRect().top
    const positions = Array.from(slots).map(el => {
      const rect = el.getBoundingClientRect()
      return rect.top + rect.height / 2 - trackTop
    })
    setSlotPositions(positions)
    setArrowY(positions[0] ?? 0)
  }, [])

  // Snap arrow to active slot on active change (non-drag)
  useEffect(() => {
    if (!dragging && slotPositions.length > 0) {
      setArrowY(slotPositions[active])
    }
  }, [active, slotPositions, dragging])

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    setDragging(true)
    dragStartY.current = e.clientY
    dragStartArrowY.current = arrowY
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || slotPositions.length === 0) return
    const dy = e.clientY - dragStartY.current
    const newY = Math.max(slotPositions[0], Math.min(slotPositions[slotPositions.length - 1], dragStartArrowY.current + dy))
    setArrowY(newY)

    // Find closest slot
    let closest = 0
    let minDist = Infinity
    slotPositions.forEach((pos, i) => {
      const d = Math.abs(pos - newY)
      if (d < minDist) { minDist = d; closest = i }
    })
    setActive(closest)
  }

  const handlePointerUp = () => {
    setDragging(false)
    if (slotPositions.length > 0) setArrowY(slotPositions[active])
  }

  return (
    <section
      id="experience"
      className="relative overflow-hidden"
      style={{ background: BG, fontFamily: "'Kanit', sans-serif" }}
    >
      {/* subtle top border */}
      <div style={{ height: 1, background: 'rgba(241,255,88,0.08)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p className="uppercase tracking-[0.22em] text-xs font-semibold mb-3" style={{ color: ACCENT, fontFamily: "'Poppins', sans-serif" }}>Career</p>
          <h2 className="font-semibold leading-tight" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: WHITE, fontFamily: "'Poppins', sans-serif" }}>
            Work Experience
          </h2>
        </div>

        {/* Main grid */}
        <div className="flex items-stretch gap-0">

          {/* ── LEFT: Company List ── */}
          <div
            ref={trackRef}
            className="relative flex flex-col justify-between"
            style={{ minWidth: 200, paddingTop: 16, paddingBottom: 16 }}
          >
            {COMPANIES.map((co, i) => (
              <button
                key={co.id}
                data-slot
                onClick={() => setActive(i)}
                className="flex items-center gap-4 text-left transition-all duration-300 py-3 pr-6 group"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {/* Logo bubble */}
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden transition-all duration-300"
                  style={{
                    width: 52,
                    height: 52,
                    background: i === active ? 'rgba(241,255,88,0.12)' : 'rgba(255,255,255,0.06)',
                    border: `2px solid ${i === active ? ACCENT : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: i === active ? `0 0 16px rgba(241,255,88,0.25)` : 'none',
                  }}
                >
                  {co.logo ? (
                    <img src={co.logo} alt={co.name} style={{ width: 32, height: 32, objectFit: 'contain' }} />
                  ) : (
                    <span style={{ color: i === active ? ACCENT : MUTED, fontSize: 13, fontWeight: 700 }}>{co.initials}</span>
                  )}
                </div>

                {/* Company name */}
                <span
                  className="font-medium transition-all duration-300"
                  style={{
                    color: i === active ? WHITE : MUTED,
                    fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                    fontFamily: "'Poppins', sans-serif",
                    whiteSpace: 'nowrap',
                  }}
                >
                  {co.name}
                </span>
              </button>
            ))}
          </div>

          {/* ── CENTER: Line + Arrow ── */}
          <div
            className="relative flex-shrink-0 flex flex-col items-center"
            style={{ width: 72, paddingTop: 16, paddingBottom: 16 }}
          >
            {/* Vertical line */}
            <div
              className="absolute"
              style={{
                left: '50%',
                top: 0,
                bottom: 0,
                width: 2,
                transform: 'translateX(-50%)',
                background: `linear-gradient(to bottom, transparent, ${ACCENT}55 15%, ${ACCENT}88 50%, ${ACCENT}55 85%, transparent)`,
              }}
            />

            {/* Draggable arrow */}
            <motion.div
              ref={arrowRef}
              animate={{ y: arrowY - 22 }}
              transition={dragging ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="absolute flex items-center justify-center"
              style={{
                top: 0,
                left: '50%',
                x: '-50%',
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: ACCENT,
                boxShadow: `0 0 24px rgba(241,255,88,0.5), 0 4px 12px rgba(0,0,0,0.4)`,
                cursor: dragging ? 'grabbing' : 'grab',
                zIndex: 10,
                touchAction: 'none',
              }}
            >
              {/* Right arrow icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 9H14M14 9L9.5 4.5M14 9L9.5 13.5" stroke="#111200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>

          {/* ── RIGHT: Content + Photo ── */}
          <div className="flex flex-1 gap-8 min-w-0">
            {/* Experience content */}
            <div className="flex-1 min-w-0" style={{ paddingTop: 8 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: ACCENT }}>{COMPANIES[active].name}</p>
                  </div>

                  <div className="flex flex-col gap-6">
                    {COMPANIES[active].roles.map((role, ri) => (
                      <div
                        key={ri}
                        className="rounded-2xl p-6"
                        style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
                      >
                        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                          <h3 className="font-semibold" style={{ color: WHITE, fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', fontFamily: "'Poppins', sans-serif" }}>
                            {role.title}
                          </h3>
                          <span
                            className="text-xs px-3 py-1 rounded-full flex-shrink-0"
                            style={{ background: 'rgba(241,255,88,0.1)', color: ACCENT, fontFamily: "'Poppins', sans-serif", border: `1px solid rgba(241,255,88,0.2)` }}
                          >
                            {role.period}
                          </span>
                        </div>
                        <ul className="flex flex-col gap-2">
                          {role.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-3">
                              <span className="mt-[6px] flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                              <span style={{ color: MUTED, fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)', lineHeight: 1.65 }}>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Photo */}
            <div
              className="flex-shrink-0 hidden lg:block"
              style={{ width: 200, alignSelf: 'flex-end' }}
            >
              <div
                className="overflow-hidden rounded-2xl"
                style={{
                  border: `2px solid rgba(241,255,88,0.15)`,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                }}
              >
                <img
                  src="/images/Portfolio pic.png"
                  alt="Hari Prasad L"
                  style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
