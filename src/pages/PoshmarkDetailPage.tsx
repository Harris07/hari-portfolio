import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import NextProjectSection from '../components/NextProjectSection'
import { PROJECTS } from '../data/projects'
import BeforeAfterSlider from '../components/BeforeAfterSlider'

/* ─── tokens ─── */
const B = '#00B3FF'
const BG = '#0d0e12'
const WHITE = '#ffffff'
const MUTED = 'rgba(255,255,255,0.42)'
const BORDER = 'rgba(255,255,255,0.07)'

/* ─── helpers ─── */
function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} className={className}
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
      style={{ color: B, background: 'rgba(0,179,255,0.1)', border: '1px solid rgba(0,179,255,0.25)' }}>
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="uppercase tracking-[0.22em] text-xs font-semibold mb-3" style={{ color: B }}>{children}</p>
}

function Heading({ children, size = 'lg' }: { children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const s = { sm: '1.5rem', md: '2rem', lg: 'clamp(2.2rem,4vw,3.2rem)', xl: 'clamp(3rem,6vw,5rem)' }
  return <h2 className="font-semibold leading-tight" style={{ color: WHITE, fontSize: s[size] }}>{children}</h2>
}

function Body({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-light leading-[1.75] ${className}`} style={{ color: MUTED, fontSize: 'clamp(0.92rem,1.3vw,1.05rem)' }}>{children}</p>
}


/* ─── page ─── */
export default function PoshmarkDetailPage() {
  const project = PROJECTS.find(p => p.id === 'poshmark-illustration-system')!
  const currentIndex = PROJECTS.findIndex(p => p.id === 'poshmark-illustration-system')
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  return (
    <div style={{ backgroundColor: BG, fontFamily: "'Poppins', sans-serif", overflowX: 'hidden' }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ background: 'rgba(13,14,18,0.82)', backdropFilter: 'blur(18px)', borderBottom: `1px solid ${BORDER}` }}>
        <Link to="/" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest hover:opacity-50 transition-opacity"
          style={{ color: WHITE, textDecoration: 'none' }}>
          <ArrowLeft size={13} /> Portfolio
        </Link>
        <Chip>Poshmark</Chip>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-20"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,179,255,0.13) 0%, transparent 65%), ${BG}` }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />

        <motion.div className="relative z-10 px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

          {/* logo */}
          <motion.div className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="overflow-hidden"
              style={{ borderRadius: 24, border: '2px solid rgba(255,255,255,0.1)', boxShadow: `0 0 40px rgba(0,179,255,0.3)`, background: 'transparent' }}>
              <img src="/images/poshmark-logo.png" alt="Poshmark" style={{ width: 'auto', height: 80, display: 'block', objectFit: 'contain' }} />
            </div>
          </motion.div>

          <motion.p className="uppercase tracking-[0.3em] text-xs font-semibold mb-5" style={{ color: B }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            UI / UX Case Study
          </motion.p>

          <motion.h1 className="font-semibold leading-none mb-6"
            style={{ color: WHITE, fontSize: 'clamp(2.8rem, 8vw, 7rem)', letterSpacing: '0.005em', fontWeight: 700 }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
            Graphic &amp; Illustration<br /><span style={{ color: B }}>Guidelines</span>
          </motion.h1>

          <motion.p className="font-light mb-12 mx-auto max-w-xl" style={{ color: MUTED, fontSize: 'clamp(1rem,1.8vw,1.15rem)' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
            {project.tagline}
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.6 }}>
            {[
              { l: 'Role', v: project.role },
              { l: 'Company', v: 'Poshmark' },
              { l: 'Tools', v: 'Figma' },
              { l: 'Ownership', v: project.timeline },
            ].map(({ l, v }) => (
              <div key={l} className="px-5 py-3 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}`, backdropFilter: 'blur(8px)' }}>
                <span className="uppercase tracking-widest text-xs block mb-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>{l}</span>
                <span className="font-semibold text-sm" style={{ color: WHITE }}>{v}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* hero banner image */}
        <motion.div className="relative z-10 w-full px-6 md:px-16" style={{ maxWidth: 1100, marginBottom: '-60px' }}
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}>
          <FadeIn>
            <div style={{ borderRadius: 24, overflow: 'hidden', border: `1px solid rgba(0,179,255,0.15)`, boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
              <img src={project.bannerImage} alt={project.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </FadeIn>
        </motion.div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="pt-36 pb-28 px-6 md:px-10"
        style={{ background: `linear-gradient(180deg, ${BG} 0%, #0f1016 100%)` }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <SectionLabel>Overview</SectionLabel>
              <Heading>No rules, no consistency.</Heading>
            </FadeUp>
            <FadeUp delay={0.1} className="md:pt-12">
              <Body>Poshmark's product had grown to hundreds of screens — each team making independent illustration decisions. Empty states looked different across features. Onboarding graphics had no visual coherence. There was no shared language for when to use a simple icon versus a rich illustration. This project set out to fix that with a documented, scalable system.</Body>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Design System', 'Illustration', 'Empty States', 'Onboarding', 'Documentation'].map(t => (
                  <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${BORDER}`, color: 'rgba(255,255,255,0.5)' }}>{t}</span>
                ))}
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.15} className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { v: '2', d: 'Unified illustration styles defined' },
              { v: '21', d: 'Specification slides documented' },
              { v: '100%', d: 'Product team adoption at launch' },
            ].map(({ v, d }) => (
              <div key={v} className="p-7 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                <span className="font-semibold block mb-2" style={{ color: B, fontSize: 'clamp(2.4rem,4vw,3.2rem)', lineHeight: 1 }}>{v}</span>
                <span className="text-sm font-light" style={{ color: MUTED }}>{d}</span>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="py-28 overflow-hidden" style={{ background: '#080a0f' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <SectionLabel>The Problem</SectionLabel>
              <Heading>Two different jobs, one broken system.</Heading>
            </FadeUp>
            <FadeUp delay={0.1} className="md:pt-12">
              <Body>Illustrations in a product serve two fundamentally different purposes — communicating a clear, distraction-free message (like an empty state), or creating emotional engagement (like onboarding). Poshmark was mixing these without distinction, resulting in overly complex empty states and underwhelming feature introductions.</Body>
            </FadeUp>
          </div>

          <FadeUp delay={0.15} className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { v: '0', d: 'Shared illustration guidelines across teams' },
              { v: '100s', d: 'Screens with inconsistent illustration usage' },
              { v: '∞', d: 'Independent decisions made per feature team' },
            ].map(({ v, d }) => (
              <div key={v} className="p-7 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                <span className="font-semibold block mb-2" style={{ color: B, fontSize: 'clamp(2rem,3.5vw,2.8rem)', lineHeight: 1 }}>{v}</span>
                <span className="text-sm font-light" style={{ color: MUTED }}>{d}</span>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── THE SHIFT — before/after ── */}
      <section className="py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #080c14 0%, #0a0f1a 60%, #080c14 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="mb-12">
            <SectionLabel>The Shift</SectionLabel>
            <Heading>Before → After</Heading>
            <Body className="mt-4 max-w-lg">A side-by-side comparison showing the impact of applying the new illustration system to existing screens.</Body>
          </FadeUp>
          <FadeIn delay={0.1}>
            <BeforeAfterSlider
              beforeImage="/images/p3-shift-old.png"
              afterImage="/images/p3-shift-new.png"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── TWO STYLES ── */}
      <section className="py-28 overflow-hidden" style={{ background: '#060709' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="mb-12 text-center">
            <SectionLabel>The Two Styles</SectionLabel>
            <Heading>Single-Tone vs Multi-Tone.</Heading>
            <Body className="mt-4 mx-auto max-w-lg">Two clearly defined styles. Each with a specific purpose, usage rule, and artboard spec — so every team makes the same decision.</Body>
          </FadeUp>
          <FadeUp delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: 'Single-Tone',
                color: B,
                desc: 'Designed for non-engaging or informational screens: empty states, error messages, no-results, and completion states. Prioritises clarity and quick understanding.',
                uses: ['Empty states', 'Error messages', 'No-results screens', 'Completion states'],
              },
              {
                label: 'Multi-Tone',
                color: '#7B61FF',
                desc: 'Used for screens that require expressive, storytelling-driven visuals: onboarding, feature introductions, entry screens like Monetisation and Posh Show.',
                uses: ['Onboarding screens', 'Feature introductions', 'Monetisation entry', 'Posh Show'],
              },
            ].map(({ label, color, desc, uses }) => (
              <div key={label} className="p-7 rounded-2xl flex flex-col gap-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: WHITE }}>{label}</span>
                </div>
                <Body>{desc}</Body>
                <div className="flex flex-wrap gap-2 mt-1">
                  {uses.map(u => (
                    <span key={u} className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${BORDER}`, color: 'rgba(255,255,255,0.5)' }}>{u}</span>
                  ))}
                </div>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── DESIGN GOALS ── */}
      <section className="py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #080c14 0%, #060c18 60%, #080c14 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="mb-12">
            <SectionLabel>Design Goals</SectionLabel>
            <Heading>What the system needed to solve.</Heading>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="rounded-3xl p-8 sm:p-10"
              style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  'Define clear usage rules for each graphic style',
                  'Standardise artboard sizes and padding specs',
                  'Establish stroke, fill and colour guidelines',
                  "Document Do's and Don'ts for each style",
                  'Cover both icon-only and real-image compositions',
                  'Make it adoptable by every product team',
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                      style={{ background: 'rgba(0,179,255,0.12)', color: B }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="font-medium leading-snug text-sm" style={{ color: WHITE }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SINGLE-TONE GUIDE ── */}
      <section className="py-28 overflow-hidden" style={{ background: '#0d0e12' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="mb-12">
            <SectionLabel>Single-Tone Guide</SectionLabel>
            <Heading>Three parts, one consistent language.</Heading>
            <Body className="mt-4 max-w-2xl">Single-Tone graphics are built from three defined parts: Icon Stroke, Fill State, and Disconnected Points. Artboard fixed at 48×48px with 2px minimum padding.</Body>
          </FadeUp>
          <FadeUp delay={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { img: '/images/p3-st-card1.png', title: 'Icon Stroke', bullets: ['Color: Black (#2A2A2A)', '2px stroke width', 'Rounded start & end points'] },
              { img: '/images/p3-st-card2.png', title: 'Fill State', bullets: ['Fill color: Black (#2A2A2A)', 'Opacity: 15%', 'Creates depth without added colour'] },
              { img: '/images/p3-st-card3.png', title: 'Disconnected Points', bullets: ['Maximum: 2 points per icon', 'Placed at object intersections only'] },
            ].map(({ img, title, bullets }) => (
              <div key={title} className="flex flex-col rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${BORDER}`, background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center justify-center p-6" style={{ background: 'rgba(255,255,255,0.04)', aspectRatio: '4/3' }}>
                  <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="p-5 flex flex-col gap-3" style={{ borderTop: `1px solid ${BORDER}` }}>
                  <span className="font-semibold text-sm" style={{ color: WHITE }}>{title}</span>
                  <ul className="flex flex-col gap-1.5">
                    {bullets.map(b => (
                      <li key={b} className="flex items-start gap-2 text-xs font-light" style={{ color: MUTED }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: B }} />{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </FadeUp>

          {/* examples */}
          <FadeIn delay={0.15} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['/images/p3-examples-text.png', '/images/p3-examples-cta.png'].map((src, i) => (
              <img key={i} src={src} alt="" className="w-full object-cover rounded-2xl" style={{ maxHeight: 400 }} />
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ── MULTI-TONE GUIDE ── */}
      <section className="py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #080c14 0%, #0a0c18 60%, #080c14 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="mb-10">
            <SectionLabel>Multi-Tone Guide</SectionLabel>
            <Heading>Background shapes + foreground illustration.</Heading>
            <Body className="mt-4 max-w-2xl">Multi-Tone uses amorphic background shapes at light opacities, layered with a fixed 6-colour foreground palette. Three artboard sizes: Small (100px), Medium (150px), Large (350px).</Body>
          </FadeUp>
          <FadeIn delay={0.08}>
            <img src="/images/p3-multitone-guide.png" alt="Multi-tone guide" className="w-full rounded-3xl" style={{ border: `1px solid ${BORDER}` }} />
          </FadeIn>
          <FadeIn delay={0.12} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['/images/p3-examples-screens.png', '/images/p3-real-images.png'].map((src, i) => (
              <img key={i} src={src} alt="" className="w-full object-cover rounded-2xl" style={{ maxHeight: 400 }} />
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ── BACKGROUNDS ── */}
      <section className="py-28 overflow-hidden" style={{ background: '#060709' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="mb-10">
            <SectionLabel>Backgrounds</SectionLabel>
            <Heading>Light and dark, fully specified.</Heading>
          </FadeUp>
          <FadeIn delay={0.08}>
            <img src="/images/p3-backgrounds.png" alt="Backgrounds" className="w-full rounded-3xl" style={{ border: `1px solid ${BORDER}` }} />
          </FadeIn>
        </div>
      </section>

      {/* ── DO'S & DON'TS ── */}
      <section className="py-28 overflow-hidden" style={{ background: '#0d0e12' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="mb-12 text-center">
            <SectionLabel>Do's &amp; Don'ts</SectionLabel>
            <Heading>Rules that protect the system.</Heading>
          </FadeUp>
          <FadeUp delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "All elements in a Single-Tone icon must share the same 2px stroke — no mixed thicknesses",
              "Use the 80:20 fill ratio — highlight only one element per icon at 15% opacity",
              "For Multi-Tone, use only undefined/amorphic background shapes — avoid circles, squares, or geometric forms",
              "For foreground illustration, fill one part of a single object and stroke the rest — never fill the whole object",
              "Use only #FFFFFF for highlight strokes on filled objects in Multi-Tone",
              "Always ensure empty state illustrations feel encouraging, not disappointing",
            ].map((rule, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                <span className="font-semibold text-xs mt-0.5 flex-shrink-0" style={{ color: B }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-light text-sm leading-relaxed" style={{ color: MUTED }}>{rule}</span>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #06090f 0%, #080c18 50%, #06090f 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <FadeUp>
            <SectionLabel>Impact</SectionLabel>
            <Heading size="xl">Adoption across Poshmark's product.</Heading>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { v: '2', l: 'Unified illustration styles' },
              { v: '21', l: 'Specification slides' },
              { v: '3', l: 'Artboard size variants' },
              { v: '6', l: 'Brand fill colours' },
              { v: '100%', l: 'Product team adoption' },
              { v: 'Dec 2024', l: 'Shipped and live' },
            ].map(({ v, l }) => (
              <div key={l} className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.08) 1px solid' }}>
                <span className="font-semibold block leading-none mb-2" style={{ color: WHITE, fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}>{v}</span>
                <span className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</span>
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
            <Heading size="md">Systems thinking starts with naming things.</Heading>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-6">
            <Body>The hardest part of this project wasn't the visual decisions — it was naming the distinction. Once "Single-Tone" and "Multi-Tone" existed as clear categories with defined purposes, every other decision became straightforward. When you give teams the right vocabulary, they stop guessing and start building.</Body>
          </FadeUp>
        </div>
      </section>

      <NextProjectSection
        projectId={nextProject.id}
        projectName={nextProject.name}
        coverImage={nextProject.coverImage}
        logo="/images/fitzoo-logo.png"
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
