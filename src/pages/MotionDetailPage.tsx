import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import NextProjectSection from '../components/NextProjectSection'

/* ─── tokens ─── */
const A = '#7C3AED'          // violet — distinct from pink, orange, blue
const AL = 'rgba(124,58,237,0.18)'
const AB = 'rgba(124,58,237,0.08)'
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
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
      style={{ color: A, background: AB, border: `1px solid ${AL}` }}>
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="uppercase tracking-[0.22em] text-xs font-semibold mb-3" style={{ color: A }}>{children}</p>
}

function Heading({ children, size = 'lg' }: { children: React.ReactNode; size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: '1.5rem', md: '2rem', lg: 'clamp(2.2rem,4vw,3.2rem)' }
  return <h2 className="font-semibold leading-tight" style={{ color: WHITE, fontSize: s[size] }}>{children}</h2>
}


/* ─── Lottie player (CDN-loaded) ─── */
function LottiePlayer({ src, className = '', style = {} }: {
  src: string; className?: string; style?: React.CSSProperties
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<any>(null)

  useEffect(() => {
    let destroyed = false

    const init = () => {
      if (destroyed || !containerRef.current) return
      // clear any existing SVG left by a previous StrictMode run
      containerRef.current.innerHTML = ''
      const lottie = (window as any).lottie
      if (!lottie) return
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: src,
      })
      animRef.current = anim
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
      // Poll so we don't pile up 'load' listeners across StrictMode remounts
      const poll = setInterval(() => {
        if ((window as any).lottie) { clearInterval(poll); init() }
      }, 50)
      return () => {
        clearInterval(poll)
        destroyed = true
        if (animRef.current) { animRef.current.destroy(); animRef.current = null }
      }
    }

    return () => {
      destroyed = true
      if (animRef.current) { animRef.current.destroy(); animRef.current = null }
    }
  }, [src])

  return <div ref={containerRef} className={className} style={style} />
}

/* ─── GIF display with fade-in ─── */
function AnimGif({ src, alt, style = {} }: { src: string; alt: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.img ref={ref} src={src} alt={alt}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'block', width: '100%', height: 'auto', ...style }}
    />
  )
}

/* ─── Animation card wrapper ─── */
function AnimCard({ children, className = '', glow = true }: {
  children: React.ReactNode; className?: string; glow?: boolean
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`} style={{
      background: 'rgba(255,255,255,0.02)',
      border: `1px solid ${glow ? 'rgba(124,58,237,0.2)' : BORDER}`,
      boxShadow: glow ? '0 0 0 1px rgba(124,58,237,0.08), 0 8px 40px rgba(0,0,0,0.4)' : undefined,
    }}>
      {glow && (
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}

export default function MotionDetailPage() {
  return (
    <div style={{ background: BG, minHeight: '100vh', color: WHITE }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
        style={{ background: 'rgba(13,14,18,0.85)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${BORDER}` }}>
        <Link to="/" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest hover:opacity-50 transition-opacity"
          style={{ color: MUTED }}>
          <ArrowLeft size={14} /> Back
        </Link>
        <Chip>POSHMARK</Chip>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-20"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 30%, rgba(124,58,237,0.18) 0%, transparent 65%), ${BG}` }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />

        <motion.div className="relative z-10 px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

          {/* Logo placeholder */}
          <motion.div className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: AL, border: `2px solid ${AL}`, boxShadow: `0 0 40px rgba(124,58,237,0.35)` }}>
              {/* Placeholder motion icon — replace with real logo later */}
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="12" stroke={A} strokeWidth="2.5" fill="none"/>
                <path d="M13 18 L18 13 L23 18" stroke={A} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 13 L18 24" stroke={A} strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          </motion.div>

          <motion.p className="uppercase tracking-[0.3em] text-xs font-semibold mb-5" style={{ color: A }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Poshmark · Motion Design
          </motion.p>

          <motion.h1 className="font-semibold leading-none mb-6"
            style={{ color: WHITE, fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontWeight: 700, letterSpacing: '0.005em' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
            Motion &{' '}
            <span style={{ color: A }}>Animation</span>
          </motion.h1>

          <motion.p className="font-light mb-12 mx-auto max-w-lg" style={{ color: MUTED, fontSize: 'clamp(1rem,1.8vw,1.2rem)' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
            A curated collection of motion work across onboarding, micro-interactions, rewards, and brand moments — each designed to feel native to Poshmark's energy.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.6 }}>
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
        </motion.div>
      </section>

      {/* ── ONBOARDING ── */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#0a0b0f' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <SectionLabel>Onboarding</SectionLabel>
            <Heading size="md">First impressions that move.</Heading>
            <p className="mt-4 text-sm font-light max-w-2xl" style={{ color: MUTED }}>
              Three-screen onboarding sequence designed to introduce new sellers to Poshmark's core value proposition. Each screen uses a distinct Lottie animation to communicate a key benefit — listing, earning, and community — with fluid transitions that match the excitement of getting started. The animations were engineered to be lightweight, loopable, and culturally warm.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
            {[
              { src: '/animations/onboarding-1.json', label: 'Screen 01', sub: 'List your closet' },
              { src: '/animations/onboarding-2.json', label: 'Screen 02', sub: 'Earn from sales' },
              { src: '/animations/onboarding-3.json', label: 'Screen 03', sub: 'Join the community' },
            ].map(({ src, label, sub }, i) => (
              <FadeUp key={label} delay={0.07 * i}>
                <AnimCard>
                  <LottiePlayer src={src} style={{ width: '100%', aspectRatio: '1.28/1' }} />
                  <div className="px-5 py-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: A }}>{label}</p>
                    <p className="text-sm font-light mt-0.5" style={{ color: MUTED }}>{sub}</p>
                  </div>
                </AnimCard>
              </FadeUp>
            ))}
          </div>

          {/* Process note */}
          <FadeUp delay={0.1} className="mt-10 p-5 rounded-xl" style={{ background: AB, border: `1px solid ${AL}` }}>
            <p className="text-xs font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <span className="font-semibold" style={{ color: A }}>Process —</span> Each animation was authored in After Effects, exported via Bodymovin as JSON, then tuned in LottieFiles for optimal file size. Target render budget: under 250KB per animation, 60fps on mid-range devices.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── PULL TO REFRESH ── */}
      <section className="py-24 px-6 md:px-10" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <SectionLabel>Pull to Refresh</SectionLabel>
            <Heading size="md">The gesture that earns delight.</Heading>
            <p className="mt-4 text-sm font-light max-w-2xl" style={{ color: MUTED }}>
              Pull-to-refresh is one of the most-triggered gestures in any marketplace app — sellers check their feed dozens of times daily. Two versions were designed: a hackathon prototype exploring expressive motion language, and a production version aligned with Poshmark's refreshed brand colour system. Both prioritise instant responsiveness and a satisfying "loaded" moment.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <FadeUp delay={0.05}>
              <AnimCard>
                <div className="px-6 pt-6 pb-3">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: A }}>Hackathon Version</span>
                  <p className="text-xs font-light mt-1" style={{ color: MUTED }}>Expressive, high-energy prototype</p>
                </div>
                <div className="px-6 pb-6">
                  <div className="rounded-xl overflow-hidden" style={{ background: '#111' }}>
                    <AnimGif src="/animations/pull-to-refresh-hackathon-opt.gif" alt="Pull to refresh hackathon" />
                  </div>
                </div>
              </AnimCard>
            </FadeUp>

            <FadeUp delay={0.12}>
              <AnimCard>
                <div className="px-6 pt-6 pb-3">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: A }}>New Brand Colour</span>
                  <p className="text-xs font-light mt-1" style={{ color: MUTED }}>Production-ready Lottie animation</p>
                </div>
                <LottiePlayer src="/animations/pull-to-refresh-brand.json" style={{ width: '100%', aspectRatio: '1/1', padding: '0 24px 24px' }} />
              </AnimCard>
            </FadeUp>
          </div>

          <FadeUp delay={0.1} className="mt-10 p-5 rounded-xl" style={{ background: AB, border: `1px solid ${AL}` }}>
            <p className="text-xs font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <span className="font-semibold" style={{ color: A }}>Process —</span> The hackathon prototype was built in 48 hours to demonstrate what expressive pull-to-refresh could feel like. The brand colour version was then created as the production implementation, replacing the spinner with a branded Lottie that communicates Poshmark's refreshed visual identity.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── APP ICON REVEAL ── */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#0a0b0f' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <SectionLabel>App Icon Reveal</SectionLabel>
            <Heading size="md">Launching a new face to the world.</Heading>
            <p className="mt-4 text-sm font-light max-w-2xl" style={{ color: MUTED }}>
              When Poshmark refreshed its brand, the app icon needed a reveal moment worthy of the milestone. Two animation variants were designed to announce the new icon — each taking a different directorial approach to the unveil. V1 uses a reveal-from-light treatment; V2 explores a more kinetic, brand-forward entrance. Both were designed for social-first distribution: square format, punchy timing, no audio dependency.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            {[
              { src: '/animations/app-icon-reveal-v1-opt.gif', label: 'Version 01', sub: 'Reveal from light' },
              { src: '/animations/app-icon-reveal-v2-opt.gif', label: 'Version 02', sub: 'Kinetic brand entrance' },
            ].map(({ src, label, sub }, i) => (
              <FadeUp key={label} delay={0.08 * i}>
                <AnimCard>
                  <div className="px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: A }}>{label}</p>
                    <p className="text-sm font-light mt-0.5" style={{ color: MUTED }}>{sub}</p>
                  </div>
                  <div style={{ background: '#000', padding: 24 }}>
                    <AnimGif src={src} alt={label} style={{ borderRadius: 12 }} />
                  </div>
                </AnimCard>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.1} className="mt-10 p-5 rounded-xl" style={{ background: AB, border: `1px solid ${AL}` }}>
            <p className="text-xs font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <span className="font-semibold" style={{ color: A }}>Process —</span> Designed in After Effects and exported as GIFs for distribution across social and press channels. Both variants were presented to brand leadership for A/B review. The brief: feel premium, mobile-native, and emotionally resonant with Poshmark's seller community.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── REWARD & LOADERS ── */}
      <section className="py-24 px-6 md:px-10" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <SectionLabel>Reward Moments & Loaders</SectionLabel>
            <Heading size="md">Making waiting feel worth it.</Heading>
            <p className="mt-4 text-sm font-light max-w-2xl" style={{ color: MUTED }}>
              Two micro-animations that occupy opposite ends of the emotional spectrum: a celebratory gift-box reveal for reward moments, and a refined loader for partner integrations. The gift box was designed for the listing streak reward flow — the unwrapping motion amplifies the dopamine hit of earning a discount. The partner loader communicates trust and motion polish during API wait states.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <FadeUp delay={0.05}>
              <AnimCard>
                <div className="px-6 pt-6 pb-3">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: A }}>Gift Box Animation</span>
                  <p className="text-xs font-light mt-1" style={{ color: MUTED }}>Streak reward unlock moment</p>
                </div>
                <LottiePlayer src="/animations/gift-box.json" style={{ width: '100%', aspectRatio: '16/9', padding: '0 32px 24px' }} />
              </AnimCard>
            </FadeUp>

            <FadeUp delay={0.12}>
              <AnimCard>
                <div className="px-6 pt-6 pb-3">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: A }}>Partner Loader</span>
                  <p className="text-xs font-light mt-1" style={{ color: MUTED }}>Partner integration wait state</p>
                </div>
                <div className="flex items-center justify-center" style={{ padding: '16px 32px 24px' }}>
                  <LottiePlayer src="/animations/partner-loader.json" style={{ width: 180, height: 180 }} />
                </div>
              </AnimCard>
            </FadeUp>
          </div>

          <FadeUp delay={0.1} className="mt-10 p-5 rounded-xl" style={{ background: AB, border: `1px solid ${AL}` }}>
            <p className="text-xs font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <span className="font-semibold" style={{ color: A }}>Process —</span> Both animations were authored in Lottie to ensure crisp SVG rendering at any screen density. The gift box timing was carefully tuned — the lid opens on a slight spring overshoot, pauses at peak anticipation, then settles. The loader uses an eased loop with no jarring restarts.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── BRAND BANNER ── */}
      <section className="py-24 px-6 md:px-10" style={{ background: '#0a0b0f' }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <SectionLabel>Brand Banner</SectionLabel>
            <Heading size="md">Welcome to Poshmark.</Heading>
            <p className="mt-4 text-sm font-light max-w-2xl" style={{ color: MUTED }}>
              An animated welcome banner designed for the Poshmark homepage and email campaigns — the first motion touchpoint for millions of new users. The animation was built to communicate warmth, energy, and the social nature of the platform in under six seconds. Typography enters on a spring ease; product visuals reveal in a staggered sequence that mimics a feed coming to life.
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-12">
            <div className="relative rounded-2xl overflow-hidden" style={{ border: `1px solid rgba(124,58,237,0.25)`, boxShadow: '0 0 80px rgba(124,58,237,0.12), 0 24px 80px rgba(0,0,0,0.5)' }}>
              {/* Glow */}
              <div style={{ position: 'absolute', bottom: -40, left: '10%', right: '10%', height: 80, background: 'rgba(124,58,237,0.2)', filter: 'blur(40px)', borderRadius: '50%', pointerEvents: 'none' }} />
              <AnimGif src="/animations/welcome-banner-opt.gif" alt="Welcome to Poshmark banner" style={{ borderRadius: 0 }} />
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-8 p-5 rounded-xl" style={{ background: AB, border: `1px solid ${AL}` }}>
            <p className="text-xs font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <span className="font-semibold" style={{ color: A }}>Process —</span> Designed in After Effects with asset handoff to engineering as an optimised GIF. Banner dimensions follow IAB standard leaderboard specs. Motion language deliberately echoes Poshmark's brand personality: playful, aspirational, community-first.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="py-24 px-6 md:px-10" style={{ background: BG, borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-14">
            <SectionLabel>By the Numbers</SectionLabel>
            <Heading>Motion at scale.</Heading>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '10', label: 'Animations shipped' },
              { value: '5', label: 'Motion categories' },
              { value: '60fps', label: 'Target frame rate' },
              { value: '<250KB', label: 'Lottie budget per file' },
            ].map(({ value, label }, i) => (
              <FadeUp key={label} delay={0.07 * i}>
                <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(124,58,237,0.06)', border: `1px solid rgba(124,58,237,0.15)` }}>
                  <p className="text-3xl font-black" style={{ color: A }}>{value}</p>
                  <p className="text-xs font-light mt-2" style={{ color: MUTED }}>{label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT PROJECT ── */}
      <NextProjectSection projectId="listing-streaks" projectName="Listing Streaks" coverImage="/images/p1-thumbnail.png" accentColor={A} />
    </div>
  )
}
