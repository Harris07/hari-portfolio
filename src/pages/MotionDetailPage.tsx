import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import NextProjectSection from '../components/NextProjectSection'

/* ─── tokens ─── */
const A = '#A78BFA'
const AL = 'rgba(167,139,250,0.18)'
const AB = 'rgba(167,139,250,0.08)'
const BG = '#0d0e12'
const WHITE = '#ffffff'
const MUTED = 'rgba(255,255,255,0.42)'
const BORDER = 'rgba(255,255,255,0.07)'

/* ─── Animation stops data ─── */
const STOPS = [
  {
    id: 'onboarding',
    label: 'Onboarding',
    heading: 'First impressions that move.',
    body: 'Three-screen onboarding sequence introducing new sellers to Poshmark\'s core value — listing, earning, and community. Each scene was engineered to be lightweight, loopable, and culturally warm.',
    cols: 3,
    items: [
      { type: 'lottie' as const, src: '/animations/onboarding-1.json', label: 'Screen 01 — List your closet' },
      { type: 'lottie' as const, src: '/animations/onboarding-2.json', label: 'Screen 02 — Earn from sales' },
      { type: 'lottie' as const, src: '/animations/onboarding-3.json', label: 'Screen 03 — Join the community' },
    ],
  },
  {
    id: 'pull-to-refresh',
    label: 'Pull to Refresh',
    heading: 'The gesture that earns delight.',
    body: 'Pull-to-refresh reimagined as a brand moment. The hackathon version was rapid and playful; the production version was polished for scale. Both turned a loading pause into a Poshmark signature.',
    cols: 2,
    items: [
      { type: 'gif' as const, src: '/animations/pull-to-refresh-hackathon-opt.gif', label: 'Hackathon version' },
      { type: 'lottie' as const, src: '/animations/pull-to-refresh-brand.json', label: 'Brand version' },
    ],
  },
  {
    id: 'app-icon',
    label: 'App Icon Reveal',
    heading: 'Launching a new face to the world.',
    body: 'Two directions for the app icon reveal — celebrating a redesign with motion that felt worthy of the occasion. Designed to be seen once, remembered always.',
    cols: 2,
    items: [
      { type: 'gif' as const, src: '/animations/app-icon-reveal-v1-opt.gif', label: 'Direction 01' },
      { type: 'gif' as const, src: '/animations/app-icon-reveal-v2-opt.gif', label: 'Direction 02' },
    ],
  },
  {
    id: 'reward',
    label: 'Rewards & Loaders',
    heading: 'Making waiting feel worth it.',
    body: 'Loaders that don\'t feel like waiting. The gift box turns reward reveals into celebrations. The partner loader transforms a necessary pause into a brand touchpoint.',
    cols: 2,
    items: [
      { type: 'lottie' as const, src: '/animations/gift-box.json', label: 'Gift box reveal' },
      { type: 'lottie' as const, src: '/animations/partner-loader.json', label: 'Partner loader' },
    ],
  },
  {
    id: 'banner',
    label: 'Brand Banner',
    heading: 'Welcome to Poshmark.',
    body: 'The welcome banner introduces new users with energy and warmth — the motion equivalent of opening a door to a community.',
    cols: 1,
    items: [
      { type: 'gif' as const, src: '/animations/welcome-banner-opt.gif', label: 'Welcome banner' },
    ],
  },
]

/* ─── Lottie player — play/pause controlled ─── */
function LottiePlayer({ src, active, style = {} }: {
  src: string; active: boolean; style?: React.CSSProperties
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<any>(null)
  const activeRef = useRef(active)

  useEffect(() => {
    activeRef.current = active
    if (!animRef.current) return
    if (active) animRef.current.play()
    else animRef.current.stop()
  }, [active])

  useEffect(() => {
    let destroyed = false
    const init = () => {
      if (destroyed || !containerRef.current) return
      containerRef.current.innerHTML = ''
      const lottie = (window as any).lottie
      if (!lottie) return
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: src,
      })
      animRef.current = anim
      if (activeRef.current) anim.play()
    }

    if ((window as any).lottie) {
      init()
    } else {
      let script = document.getElementById('lottie-cdn') as HTMLScriptElement | null
      if (!script) {
        script = document.createElement('script')
        script.id = 'lottie-cdn'
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js'
        document.head.appendChild(script)
      }
      const poll = setInterval(() => {
        if ((window as any).lottie) { clearInterval(poll); init() }
      }, 50)
      return () => {
        clearInterval(poll); destroyed = true
        if (animRef.current) { animRef.current.destroy(); animRef.current = null }
      }
    }
    return () => {
      destroyed = true
      if (animRef.current) { animRef.current.destroy(); animRef.current = null }
    }
  }, [src])

  return <div ref={containerRef} style={{ width: '100%', ...style }} />
}

/* ─── Single stop card ─── */
type StopType = typeof STOPS[0]
function StopCard({ stop, active, onRef }: {
  stop: StopType; active: boolean; onRef: (el: HTMLDivElement | null) => void
}) {
  const gridClass = stop.cols === 3 ? 'grid-cols-3' : stop.cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'

  return (
    <div ref={onRef} style={{ position: 'relative', padding: '100px 0', zIndex: 5 }}>

      {/* Node dot on the line */}
      <motion.div
        style={{
          position: 'absolute', left: '50%', top: 100,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%', zIndex: 6, pointerEvents: 'none',
        }}
        animate={{
          width: active ? 14 : 8,
          height: active ? 14 : 8,
          background: active ? A : 'rgba(167,139,250,0.25)',
          boxShadow: active ? `0 0 0 6px rgba(167,139,250,0.15), 0 0 24px ${A}` : '0 0 0 0px transparent',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12">

        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.28em] font-semibold mb-3" style={{ color: A }}>{stop.label}</p>
          <h2 className="font-semibold leading-tight mb-4"
            style={{ color: WHITE, fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}>
            {stop.heading}
          </h2>
          <p className="text-sm font-light max-w-xl mx-auto leading-relaxed" style={{ color: MUTED }}>{stop.body}</p>
        </div>

        {/* Animation grid */}
        <div className={`grid ${gridClass} gap-4`}
          style={{ maxWidth: stop.cols === 1 ? 560 : '100%', margin: '0 auto' }}>
          {stop.items.map((item, i) => (
            <motion.div key={i}
              className="rounded-2xl overflow-hidden"
              animate={{
                boxShadow: active
                  ? `0 0 0 1.5px ${A}, 0 0 40px rgba(167,139,250,0.18), 0 24px 60px rgba(0,0,0,0.5)`
                  : `0 0 0 1px ${BORDER}, 0 8px 32px rgba(0,0,0,0.3)`,
              }}
              style={{ background: 'rgba(255,255,255,0.02)' }}
              transition={{ duration: 0.4 }}>
              {item.type === 'lottie' ? (
                <LottiePlayer src={item.src} active={active}
                  style={{ aspectRatio: stop.cols === 3 ? '1.2/1' : '1.1/1' }} />
              ) : (
                <motion.img src={item.src} alt={item.label}
                  animate={{ opacity: active ? 1 : 0.5 }}
                  transition={{ duration: 0.5 }}
                  style={{ width: '100%', display: 'block', height: 'auto' }} />
              )}
              <div className="px-4 py-3" style={{ borderTop: `1px solid ${BORDER}` }}>
                <p className="text-xs font-light" style={{ color: MUTED }}>{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Ball ─── */
function ScrollBall({ visible, viewportY }: { visible: boolean; viewportY: number }) {
  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.4 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        left: '50%',
        top: viewportY,
        transform: 'translate(-50%, -50%)',
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: `radial-gradient(circle at 40% 35%, #c4b5fd, ${A})`,
        boxShadow: `0 0 0 3px rgba(167,139,250,0.2), 0 0 20px ${A}, 0 0 50px rgba(167,139,250,0.35)`,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    />
  )
}

/* ─── Main page ─── */
export default function MotionDetailPage() {
  const pathSectionRef = useRef<HTMLDivElement>(null)
  const stopRefs = useRef<(HTMLDivElement | null)[]>(Array(STOPS.length).fill(null))

  /* measurements — stored in refs to avoid stale closures */
  const sectionBoundsRef = useRef({ top: 0, height: 0 })
  const stopYsRef = useRef<number[]>(Array(STOPS.length).fill(0))

  const [activeStop, setActiveStop] = useState(-1)
  const [ballViewportY, setBallViewportY] = useState(-100)
  const [tracedHeight, setTracedHeight] = useState(0)
  const [ballVisible, setBallVisible] = useState(false)

  const measure = () => {
    if (!pathSectionRef.current) return
    // getBoundingClientRect + scrollY gives true page-absolute position
    const top = pathSectionRef.current.getBoundingClientRect().top + window.scrollY
    const height = pathSectionRef.current.offsetHeight
    sectionBoundsRef.current = { top, height }

    // Store stop centers as page-absolute Y values
    stopYsRef.current = stopRefs.current.map(ref => {
      if (!ref) return 0
      return ref.getBoundingClientRect().top + window.scrollY + ref.offsetHeight / 2
    })
  }

  useEffect(() => {
    // Measure after fonts/images settle
    const t = setTimeout(measure, 200)
    window.addEventListener('resize', measure)
    return () => { clearTimeout(t); window.removeEventListener('resize', measure) }
  }, [])

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const { top, height } = sectionBoundsRef.current
    if (!height) return

    const vh = window.innerHeight
    // progress 0 → 1 as user scrolls through the section
    const progress = Math.max(0, Math.min(1, (y - top) / Math.max(1, height - vh)))
    const ballAbsY = top + progress * height
    const rawVpY = ballAbsY - y
    const clampedVpY = Math.max(80, Math.min(vh - 50, rawVpY))

    setBallViewportY(clampedVpY)
    setTracedHeight(ballAbsY - top)

    // visible only while section is in view
    const inSection = y >= top - vh * 0.1 && y <= top + height
    setBallVisible(inSection)

    // active stop: last stop the ball has passed
    let newActive = -1
    stopYsRef.current.forEach((stopY, i) => {
      if (ballAbsY >= stopY - 120) newActive = i
    })
    if (newActive !== activeStop) setActiveStop(newActive)
  })

  return (
    <div style={{ background: BG, minHeight: '100vh', color: WHITE }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
        style={{ background: 'rgba(13,14,18,0.88)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${BORDER}` }}>
        <Link to="/"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest hover:opacity-50 transition-opacity"
          style={{ color: MUTED, textDecoration: 'none' }}>
          <ArrowLeft size={14} /> Back
        </Link>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
          style={{ color: A, background: AB, border: `1px solid ${AL}` }}>POSHMARK</span>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-20"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 30%, rgba(167,139,250,0.18) 0%, transparent 65%), ${BG}` }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />

        <motion.div className="relative z-10 px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

          {/* Logo placeholder */}
          <motion.div className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="w-20 h-20 rounded-3xl overflow-hidden"
              style={{ border: `2px solid rgba(167,139,250,0.2)`, boxShadow: `0 0 40px rgba(167,139,250,0.35)` }}>
              <img src="/images/p4-logo.gif" alt="Motion & Animation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>

          <motion.p className="uppercase tracking-[0.3em] text-xs font-semibold mb-5" style={{ color: A }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Poshmark · Motion Design
          </motion.p>

          <motion.h1 className="font-semibold leading-none mb-6"
            style={{ color: WHITE, fontSize: 'clamp(3.5rem, 10vw, 8rem)', letterSpacing: '0.005em' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
            Motion &{' '}
            <span style={{ color: A }}>Animation</span>
          </motion.h1>

          <motion.p className="font-light mb-12 mx-auto max-w-lg"
            style={{ color: MUTED, fontSize: 'clamp(1rem,1.8vw,1.2rem)' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}>
            A curated collection of motion work across onboarding, micro-interactions, rewards, and brand moments — each designed to feel native to Poshmark's energy.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.6 }}>
            {[
              { l: 'Role', v: 'Product Designer' },
              { l: 'Platform', v: 'iOS · Android · Web' },
              { l: 'Tools', v: 'Illustrator · After Effects' },
              { l: 'Timeline', v: '4 Years' },
            ].map(({ l, v }) => (
              <div key={l} className="px-5 py-3 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}`, backdropFilter: 'blur(8px)' }}>
                <span className="uppercase tracking-widest text-xs block mb-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>{l}</span>
                <span className="font-semibold text-sm" style={{ color: WHITE }}>{v}</span>
              </div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.22)' }}>Scroll to explore</p>
            <motion.div
              style={{ width: 1.5, height: 44, background: `linear-gradient(to bottom, ${A}, transparent)`, borderRadius: 2 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.8 }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── PATH SECTION ── */}
      <section ref={pathSectionRef} style={{ position: 'relative', background: '#080910' }}>

        {/* Untraced line (full height, dim) */}
        <div style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0,
          width: 1.5, background: 'rgba(167,139,250,0.07)',
          transform: 'translateX(-50%)', zIndex: 1, pointerEvents: 'none',
        }} />

        {/* Traced line (grows as ball descends) */}
        <div style={{
          position: 'absolute', left: '50%', top: 0,
          width: 1.5, height: tracedHeight,
          background: `linear-gradient(to bottom, rgba(167,139,250,0.3), ${A} 80%, rgba(167,139,250,0.6))`,
          transform: 'translateX(-50%)', zIndex: 2, pointerEvents: 'none',
          transition: 'height 0.06s linear',
        }} />

        {/* Stop cards */}
        {STOPS.map((stop, i) => (
          <StopCard
            key={stop.id}
            stop={stop}
            active={activeStop === i}
            onRef={el => { stopRefs.current[i] = el }}
          />
        ))}

        {/* Bottom spacer so last card gets enough scroll room */}
        <div style={{ height: 80 }} />
      </section>

      {/* ── METRICS ── */}
      <section style={{ background: BG, borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
          <p className="text-xs uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: A }}>By the Numbers</p>
          <h2 className="font-semibold mb-12" style={{ color: WHITE, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)' }}>Motion at scale.</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { value: '5', label: 'Animation categories shipped' },
              { value: '10+', label: 'Individual Lottie & GIF assets' },
              { value: '3', label: 'Platforms — iOS, Android, Web' },
              { value: '4', label: 'Years of motion across Poshmark' },
              { value: '100%', label: 'Built in After Effects + Lottie' },
              { value: 'Live', label: 'Across Poshmark\'s product today' },
            ].map(({ value, label }) => (
              <div key={label} className="py-8 px-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}` }}>
                <p className="font-bold mb-2" style={{ color: A, fontSize: 'clamp(2rem,4vw,3rem)' }}>{value}</p>
                <p className="text-sm font-light" style={{ color: MUTED }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT PROJECT ── */}
      <NextProjectSection
        projectId="listing-streaks"
        projectName="Listing Streaks"
        coverImage="/images/p1-thumbnail.png"
        logo="/images/p1-logo.png"
        accentColor="#C9177E"
      />

      {/* ── BALL (rendered last so it's above everything) ── */}
      <ScrollBall visible={ballVisible} viewportY={ballViewportY} />
    </div>
  )
}
