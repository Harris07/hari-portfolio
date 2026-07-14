import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
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

/* ─── Lottie player — two modes:
     auto mode  (active prop)       — plays when active, stops when inactive
     seek mode  (seekFraction prop) — goToAndStop at 0-1 fraction of totalFrames
─── */
function LottiePlayer({ src, active, loop = false, onComplete, seekFraction, style = {} }: {
  src: string
  active?: boolean
  loop?: boolean
  onComplete?: () => void
  seekFraction?: number
  style?: React.CSSProperties
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<any>(null)
  const totalFramesRef = useRef(0)
  const activeRef = useRef(active)
  const onCompleteRef = useRef(onComplete)
  const seekFractionRef = useRef(seekFraction)

  useEffect(() => {
    activeRef.current = active
    onCompleteRef.current = onComplete
    seekFractionRef.current = seekFraction
  })

  /* Seek mode: scrub to frame on each seekFraction change */
  useEffect(() => {
    if (seekFraction === undefined || !animRef.current || !totalFramesRef.current) return
    const frame = Math.round(Math.min(1, Math.max(0, seekFraction)) * totalFramesRef.current)
    animRef.current.goToAndStop(frame, true)
  }, [seekFraction])

  /* Auto mode: play/stop on active toggle */
  useEffect(() => {
    if (seekFraction !== undefined || !animRef.current) return
    if (active) {
      animRef.current.goToAndPlay(0, true)
    } else {
      animRef.current.stop()
    }
  }, [active, seekFraction])

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
        loop: seekFractionRef.current !== undefined ? false : loop,
        autoplay: false,
        path: src,
      })
      animRef.current = anim
      anim.addEventListener('DOMLoaded', () => {
        totalFramesRef.current = Math.max(1, anim.totalFrames - 1)
        if (seekFractionRef.current !== undefined) {
          anim.goToAndStop(0, true)
        } else if (activeRef.current) {
          anim.play()
        }
      })
      anim.addEventListener('complete', () => {
        if (!destroyed && onCompleteRef.current && seekFractionRef.current === undefined) {
          onCompleteRef.current()
        }
      })
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
  }, [src, loop])

  return <div ref={containerRef} style={{ width: '100%', ...style }} />
}

/* ─── Section wrapper with fade-up on scroll ─── */
function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

/* ─── Section header ─── */
function SectionHeader({ label, heading, body }: { label: string; heading: string; body: string }) {
  return (
    <div className="text-center mb-10 max-w-2xl mx-auto">
      <p className="text-xs uppercase tracking-[0.28em] font-semibold mb-3" style={{ color: A }}>{label}</p>
      <h2 className="font-semibold leading-tight mb-4" style={{ color: WHITE, fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}>
        {heading}
      </h2>
      <p className="text-sm font-light leading-relaxed" style={{ color: MUTED }}>{body}</p>
    </div>
  )
}

/* ─── ONBOARDING — 3-panel full-bleed layout ─── */
const ONBOARDING_BG = ['#F4FBFF', '#FCF6F9', '#FBFBE0']
const ONBOARDING_ITEMS = [
  { src: '/animations/onboarding-1.json', label: '01 — List', sub: 'Start listing your closet in minutes' },
  { src: '/animations/onboarding-2.json', label: '02 — Earn', sub: 'Turn your listings into real income' },
  { src: '/animations/onboarding-3.json', label: '03 — Connect', sub: 'Join a community of buyers & sellers' },
]

function OnboardingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  /* Mobile detection */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* Mobile: sequential auto-play */
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [activeCard, setActiveCard] = useState(0)
  const advance = useCallback(() => setActiveCard(c => (c + 1) % 3), [])

  /* Desktop: scroll-lock + virtual playhead */
  useEffect(() => {
    if (isMobile) return
    const section = sectionRef.current
    const placeholder = placeholderRef.current
    if (!section || !placeholder) return

    let playhead = 0
    let velocity = 0
    let locked = false
    let released = false
    let rafId = 0
    let lockScrollY = 0
    const BASE = 0.003
    const FRICTION = 0.95

    const tick = () => {
      velocity = Math.max(velocity, BASE)
      velocity *= FRICTION
      playhead = Math.min(1, playhead + velocity)
      setProgress(playhead)
      if (playhead >= 1) { release(); return }
      rafId = requestAnimationFrame(tick)
    }

    const lock = () => {
      if (locked || released) return
      locked = true
      lockScrollY = window.scrollY
      placeholder.style.height = section.offsetHeight + 'px'
      placeholder.style.display = 'block'
      section.style.position = 'fixed'
      section.style.top = '0'
      section.style.left = '0'
      section.style.width = '100%'
      section.style.zIndex = '100'
      document.documentElement.style.overflow = 'hidden'
      rafId = requestAnimationFrame(tick)
    }

    const release = () => {
      if (released) return
      released = true
      locked = false
      cancelAnimationFrame(rafId)
      section.style.position = ''
      section.style.top = ''
      section.style.left = ''
      section.style.width = ''
      section.style.zIndex = ''
      document.documentElement.style.overflow = ''
      window.scrollTo({ top: lockScrollY + window.innerHeight + 80, behavior: 'smooth' })
      setTimeout(() => { placeholder.style.display = 'none' }, 900)
    }

    const onWheel = (e: WheelEvent) => {
      if (!locked) return
      e.preventDefault()
      if (e.deltaY > 0) {
        velocity += e.deltaY * 0.00015
        velocity = Math.min(velocity, 0.06)
      }
    }

    const onScroll = () => {
      if (locked || released) return
      const rect = section.getBoundingClientRect()
      if (rect.top <= 2) lock()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(rafId)
      if (locked && !released) {
        section.style.position = ''
        section.style.top = ''
        section.style.left = ''
        section.style.width = ''
        section.style.zIndex = ''
        document.documentElement.style.overflow = ''
        placeholder.style.display = 'none'
      }
    }
  }, [isMobile])

  /* ── Derived visual values (desktop) ── */
  const headerOpacity = Math.max(0, 1 - progress * 9)
  const panelScale = 1 + progress * 0.65
  const seeks = [
    Math.min(1, Math.max(0, progress * 3)),
    Math.min(1, Math.max(0, (progress - 1 / 3) * 3)),
    Math.min(1, Math.max(0, (progress - 2 / 3) * 3)),
  ]
  const cardOpacities = [
    progress < 0.38 ? 1 : 0.1,
    progress >= 0.28 && progress < 0.72 ? 1 : 0.1,
    progress >= 0.62 ? 1 : 0.1,
  ]

  /* ── MOBILE layout ── */
  if (isMobile) {
    return (
      <section ref={sectionRef} style={{ background: '#080910', paddingTop: 100, paddingBottom: 100 }}>
        <FadeSection>
          <SectionHeader label="Onboarding" heading="First impressions that move."
            body="Three-screen onboarding sequence introducing new sellers to Poshmark's core value — listing, earning, and community. Each scene was engineered to be lightweight, loopable, and culturally warm." />
        </FadeSection>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          {ONBOARDING_ITEMS.map((item, i) => (
            <div key={i} style={{ minWidth: 0, opacity: inView && activeCard === i ? 1 : 0.1, transition: 'opacity 0.4s ease' }}>
              <div style={{ overflow: 'hidden', background: ONBOARDING_BG[i] }}>
                <div style={{ paddingTop: 80, paddingBottom: 80 }}>
                  <LottiePlayer src={item.src} active={inView && activeCard === i} onComplete={advance} style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: 16, marginBottom: i < 2 ? 40 : 0 }}>
                <span style={{ display: 'block', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: A }}>{item.label}</span>
                <span style={{ display: 'block', fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginTop: 4, lineHeight: 1.5 }}>{item.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  /* ── DESKTOP layout ── */
  return (
    <>
      <div ref={placeholderRef} style={{ display: 'none', background: '#080910' }} />
      <section
        ref={sectionRef}
        style={{
          background: '#080910',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
        {/* Header fades out as scroll progresses */}
        <div style={{ opacity: headerOpacity, width: '100%', pointerEvents: 'none' }}>
          <SectionHeader label="Onboarding" heading="First impressions that move."
            body="Three-screen onboarding sequence introducing new sellers to Poshmark's core value — listing, earning, and community. Each scene was engineered to be lightweight, loopable, and culturally warm." />
        </div>

        {/* 3 panels — scale up and animate on scroll */}
        <div style={{
          display: 'flex',
          gap: 2,
          maxWidth: 1100,
          width: '100%',
          padding: '0 24px',
          transform: `scale(${panelScale})`,
          transformOrigin: 'center center',
        }}>
          {ONBOARDING_ITEMS.map((item, i) => (
            <div key={i} style={{
              flex: 1, overflow: 'hidden', background: ONBOARDING_BG[i], minWidth: 0,
              opacity: cardOpacities[i], transition: 'opacity 0.3s ease',
            }}>
              <div style={{ paddingTop: 60, paddingBottom: 60 }}>
                <LottiePlayer src={item.src} seekFraction={seeks[i]} style={{ width: '100%', display: 'block' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Labels fade out with header */}
        <div style={{ opacity: headerOpacity, display: 'flex', gap: 2, maxWidth: 1100, width: '100%', margin: '16px auto 0', padding: '0 24px', pointerEvents: 'none' }}>
          {ONBOARDING_ITEMS.map((item, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
              <span style={{ display: 'block', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: A }}>{item.label}</span>
              <span style={{ display: 'block', fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginTop: 4, lineHeight: 1.5 }}>{item.sub}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

/* ─── Generic animation section (2-col or 1-col grid) ─── */
type GridItem = { type: 'lottie' | 'gif'; src: string; label: string }
function AnimSection({ label, heading, body, items, cols = 2 }: {
  label: string; heading: string; body: string; items: GridItem[]; cols?: number
}) {
  const gridClass = cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
  return (
    <section style={{ background: BG, paddingTop: 100, paddingBottom: 100 }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeSection>
          <SectionHeader label={label} heading={heading} body={body} />
        </FadeSection>
        <FadeSection>
          <div className={`grid ${gridClass} gap-4`}
            style={{ maxWidth: cols === 1 ? 560 : '100%', margin: '0 auto' }}>
            {items.map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}` }}>
                {item.type === 'lottie' ? (
                  <LottiePlayer src={item.src} style={{ aspectRatio: '1.1/1' }} />
                ) : (
                  <img src={item.src} alt={item.label}
                    style={{ width: '100%', display: 'block', height: 'auto' }} />
                )}
                <div className="px-4 py-3" style={{ borderTop: `1px solid ${BORDER}` }}>
                  <p className="text-xs font-light" style={{ color: MUTED }}>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  )
}

/* ─── Main page ─── */
export default function MotionDetailPage() {
  return (
    <div style={{ background: BG, minHeight: '100vh', color: WHITE, fontFamily: "'Poppins', sans-serif" }}>

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

      {/* ── ONBOARDING ── */}
      <OnboardingSection />

      {/* ── PULL TO REFRESH ── */}
      <AnimSection
        label="Pull to Refresh"
        heading="The gesture that earns delight."
        body="Pull-to-refresh reimagined as a brand moment. The hackathon version was rapid and playful; the production version was polished for scale. Both turned a loading pause into a Poshmark signature."
        items={[
          { type: 'gif', src: '/animations/pull-to-refresh-hackathon-opt.gif', label: 'Hackathon version' },
          { type: 'lottie', src: '/animations/pull-to-refresh-brand.json', label: 'Brand version' },
        ]}
      />

      {/* ── APP ICON REVEAL ── */}
      <AnimSection
        label="App Icon Reveal"
        heading="Launching a new face to the world."
        body="Two directions for the app icon reveal — celebrating a redesign with motion that felt worthy of the occasion. Designed to be seen once, remembered always."
        items={[
          { type: 'gif', src: '/animations/app-icon-reveal-v1-opt.gif', label: 'Direction 01' },
          { type: 'gif', src: '/animations/app-icon-reveal-v2-opt.gif', label: 'Direction 02' },
        ]}
      />

      {/* ── REWARDS & LOADERS ── */}
      <AnimSection
        label="Rewards & Loaders"
        heading="Making waiting feel worth it."
        body="Loaders that don't feel like waiting. The gift box turns reward reveals into celebrations. The partner loader transforms a necessary pause into a brand touchpoint."
        items={[
          { type: 'lottie', src: '/animations/gift-box.json', label: 'Gift box reveal' },
          { type: 'lottie', src: '/animations/partner-loader.json', label: 'Partner loader' },
        ]}
      />

      {/* ── BRAND BANNER ── */}
      <AnimSection
        label="Brand Banner"
        heading="Welcome to Poshmark."
        body="The welcome banner introduces new users with energy and warmth — the motion equivalent of opening a door to a community."
        cols={1}
        items={[
          { type: 'gif', src: '/animations/welcome-banner-opt.gif', label: 'Welcome banner' },
        ]}
      />

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
              { value: 'Live', label: "Across Poshmark's product today" },
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
    </div>
  )
}
