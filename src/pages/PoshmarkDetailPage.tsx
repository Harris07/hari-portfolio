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

/* ─── animation helpers ─── */
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

/* Floating image panel — no rotation, flat presentation for guidelines */
function Screen({ src, alt = '', delay = 0 }: {
  src: string; alt?: string; delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.6))' }}>
      <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
    </motion.div>
  )
}

/* ─── UI primitives ─── */
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

function Spec({ children }: { children: React.ReactNode }) {
  return (
    <code className="inline-block text-xs font-mono font-medium px-2 py-0.5 rounded-md"
      style={{ color: B, background: 'rgba(0,179,255,0.08)', border: '1px solid rgba(0,179,255,0.18)', letterSpacing: '0.03em' }}>
      {children}
    </code>
  )
}

function ChapterDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 max-w-5xl mx-auto px-6 md:px-10 py-10">
      <div className="flex-1 h-px" style={{ background: BORDER }} />
      <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.18)' }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: BORDER }} />
    </div>
  )
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

        <motion.div className="relative z-10 w-full px-0 md:px-10" style={{ marginBottom: '-60px' }}
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
              <Heading>Design a unified icon and graphic guideline for Poshmark's product.</Heading>
            </FadeUp>
            <FadeUp delay={0.1} className="md:pt-12">
              <Body>Poshmark's product had grown to cover hundreds of screens: empty states, onboarding flows, feature introductions, and campaigns, each using illustrations in their own way. There was no documented standard for style, construction, or usage. My goal was to change that: design a complete illustration system from scratch, covering every context the product needed, and document it clearly enough that it could be applied consistently going forward.</Body>
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
              { v: '2', d: 'Illustration styles defined, each with distinct rules and use cases' },
              { v: '21', d: 'Specification slides covering construction, colour, sizing, and usage' },
              { v: '1st', d: 'Illustration system ever documented for Poshmark\'s product' },
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
      <section className="py-28 overflow-hidden px-6 md:px-10" style={{ background: '#080a0f' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <SectionLabel>The Problem</SectionLabel>
              <Heading>No framework for when to use what or how to build it.</Heading>
            </FadeUp>
            <FadeUp delay={0.1} className="md:pt-12">
              <Body>Illustrations serve two very different purposes in a product. In utility moments like empty states, errors, and confirmations, clarity is the goal. In engagement moments like onboarding, campaigns, and feature introductions, emotional resonance is. Without a framework to separate these two jobs, the wrong style kept ending up in the wrong context. Empty states were visually overloaded. Onboarding screens felt generic. There was no documented rule for stroke weight, fill colour, artboard size, or when to use a real image versus an illustration. Every screen was a fresh decision with no reference to anchor it.</Body>
            </FadeUp>
          </div>
          <FadeUp delay={0.15} className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { v: '0', d: 'Documentation existed. No rules, no standards, no reference to work from' },
              { v: '2', d: 'Distinct illustration jobs in the product, with no system separating them' },
              { v: '∞', d: 'Decisions made ad hoc, with no consistent logic across screens' },
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

      {/* ═══════════════════════════════════════════
          CHAPTER 1, THE SYSTEM
      ═══════════════════════════════════════════ */}
      <ChapterDivider label="The System" />

      {/* ── TWO STYLES ── */}
      <section className="py-20 overflow-hidden" style={{ background: '#060709' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="mb-10">
            <SectionLabel>The Two Styles</SectionLabel>
            <Heading>One rule decides everything.</Heading>
            <Body className="mt-4 max-w-xl">Every illustration decision begins here, pick the right style and every other rule follows automatically.</Body>
          </FadeUp>
          <FadeUp delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl overflow-hidden flex flex-col"
              style={{ border: `1px solid rgba(0,179,255,0.2)`, background: 'rgba(0,179,255,0.04)' }}>
              <div className="px-7 pt-7 pb-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: B, boxShadow: `0 0 8px ${B}` }} />
                  <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: WHITE }}>Single-Tone</span>
                </div>
                <p className="text-2xl font-semibold leading-snug mb-4" style={{ color: WHITE }}>Clarity over<br />expression.</p>
                <Body>For screens where the message needs to land fast, no distractions, no visual noise.</Body>
              </div>
              <div className="px-7 py-5 flex flex-col gap-3" style={{ borderTop: `1px solid rgba(0,179,255,0.12)` }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Use for</p>
                {['Empty states', 'Error messages', 'No-results screens', 'Completion states'].map(u => (
                  <div key={u} className="flex items-center gap-2.5">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: B }} />
                    <span className="text-sm font-light" style={{ color: MUTED }}>{u}</span>
                  </div>
                ))}
              </div>
              <div className="px-7 py-4 flex flex-wrap gap-2" style={{ borderTop: `1px solid rgba(0,179,255,0.12)` }}>
                <Spec>48×48px artboard</Spec>
                <Spec>2px stroke</Spec>
                <Spec>15% fill opacity</Spec>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden flex flex-col"
              style={{ border: `1px solid rgba(74,143,212,0.2)`, background: 'rgba(74,143,212,0.04)' }}>
              <div className="px-7 pt-7 pb-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#4A8FD4', boxShadow: '0 0 8px #4A8FD4' }} />
                  <span className="font-semibold text-sm uppercase tracking-widest" style={{ color: WHITE }}>Multi-Tone</span>
                </div>
                <p className="text-2xl font-semibold leading-snug mb-4" style={{ color: WHITE }}>Storytelling<br />over clarity.</p>
                <Body>For screens that need to engage, delight, or introduce something new, emotion first.</Body>
              </div>
              <div className="px-7 py-5 flex flex-col gap-3" style={{ borderTop: `1px solid rgba(74,143,212,0.12)` }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Use for</p>
                {['Onboarding screens', 'Feature introductions', 'Monetisation entry', 'Posh Show'].map(u => (
                  <div key={u} className="flex items-center gap-2.5">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#4A8FD4' }} />
                    <span className="text-sm font-light" style={{ color: MUTED }}>{u}</span>
                  </div>
                ))}
              </div>
              <div className="px-7 py-4 flex flex-wrap gap-2" style={{ borderTop: `1px solid rgba(74,143,212,0.12)` }}>
                <Spec>3 artboard sizes</Spec>
                <Spec>6 brand fill colours</Spec>
                <Spec>amorphic shapes</Spec>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CHAPTER 2, SINGLE-TONE SPECIFICATION
      ═══════════════════════════════════════════ */}
      <ChapterDivider label="Single-Tone Specification" />

      {/* ── SINGLE-TONE GUIDE — 3 screens fan ── */}
      <section className="py-20 overflow-hidden" style={{ background: '#0d0e12' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="text-center mb-14">
            <SectionLabel>Single-Tone Guide</SectionLabel>
            <Heading>Three parts, one consistent language.</Heading>
            <Body className="mt-4 mx-auto max-w-2xl">Every Single-Tone graphic is built from exactly three components. Defined once, applied everywhere.</Body>
          </FadeUp>
        </div>

        {/* Artboard spec strip */}
        <div className="max-w-5xl mx-auto px-6 md:px-10 mb-12">
          <FadeUp delay={0.05}>
            <div className="flex flex-wrap items-center gap-3 p-5 rounded-2xl"
              style={{ background: 'rgba(0,179,255,0.05)', border: '1px solid rgba(0,179,255,0.15)' }}>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Artboard spec</span>
              <div className="flex flex-wrap gap-2">
                <Spec>48×48px</Spec>
                <Spec>2px min padding</Spec>
                <Spec>stroke: #2A2A2A</Spec>
                <Spec>fill opacity: 15%</Spec>
                <Spec>max 2 disconnected points</Spec>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* 3 unified cards — image + specs combined */}
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp delay={0.1} className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
            {[
              { src: '/images/p3-st-card1.png', title: 'Icon Stroke',          specs: ['#2A2A2A', '2px width', 'rounded caps'],        bullets: ['All strokes must share the same 2px weight', 'No mixed thicknesses across elements', 'Round both start and end caps'],                                          d: 0.05 },
              { src: '/images/p3-st-card2.png', title: 'Fill State',            specs: ['#2A2A2A', '15% opacity', 'one element only'],  bullets: ['Highlight one element per icon at 15% opacity', 'Creates depth without adding new colour', '80:20 weight ratio, stroke dominant'],                      d: 0.12 },
              { src: '/images/p3-st-card3.png', title: 'Disconnected Points',   specs: ['max 2 points', 'intersections only'],          bullets: ['Maximum of 2 points per icon', 'Place only at object intersections', 'Reinforces depth hierarchy'],                                                        d: 0.19 },
            ].map(({ src, title, specs, bullets, d }) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: d }}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                {/* image with faded bg */}
                <div style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <img src={src} alt={title} style={{ display: 'block', width: '100%', height: 'auto' }} />
                </div>
                {/* spec text */}
                <div className="p-5 flex flex-col gap-3">
                  <span className="font-semibold text-sm block" style={{ color: WHITE }}>{title}</span>
                  <ul className="flex flex-col gap-1.5">
                    {bullets.map(b => (
                      <li key={b} className="flex items-start gap-2 text-xs font-light" style={{ color: MUTED }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: B }} />{b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-3 mt-1" style={{ borderTop: `1px solid ${BORDER}` }}>
                    {specs.map(s => <Spec key={s}>{s}</Spec>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── SINGLE-TONE EXAMPLES — Only Text (3 individual screens) ── */}
      <section className="py-28 overflow-hidden" style={{ background: '#080a0f' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="text-center mb-16">
            <SectionLabel>Single-Tone Examples</SectionLabel>
            <Heading>Only Text, three section layouts.</Heading>
            <p className="mt-4 mx-auto max-w-lg font-light" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1rem' }}>
              Three pre-defined layouts for text-only states, one section, two sections, or three sections.
            </p>
          </FadeUp>
        </div>
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-10 sm:gap-8 px-4" style={{ maxWidth: 880, margin: '0 auto', paddingBottom: 20 }}>
            {[
              { src: '/images/p3-col1img1.png', label: '01, News',              sub: 'Single section · Icon only',  d: 0.05 },
              { src: '/images/p3-col2img.png',  label: '02, Active Offers',   sub: 'Two sections · Icon + text',  d: 0.12 },
              { src: '/images/p3-col1img2.png', label: '03, Promoted Closet', sub: 'Three sections · Stacked',    d: 0.19 },
            ].map(({ src, label, sub, d }) => (
              <div key={label} className="flex flex-col items-center w-full sm:flex-1 max-w-[200px] sm:max-w-[320px]" style={{ gap: 40 }}>
                <Screen src={src} alt={label} delay={d} />
                <FadeUp delay={d + 0.12} className="text-center">
                  <span className="block font-bold text-xs uppercase tracking-widest" style={{ color: B }}>{label}</span>
                  <span className="block text-xs font-light mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{sub}</span>
                </FadeUp>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── SINGLE-TONE EXAMPLES — Text + CTA ── */}
      <section className="py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #080c10 0%, #0a0e14 60%, #080c10 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="text-center mb-16">
            <SectionLabel>Single-Tone Examples</SectionLabel>
            <Heading>Text + CTA, with action buttons.</Heading>
            <p className="mt-4 mx-auto max-w-lg font-light" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1rem' }}>
              CTA placed below body text with fixed padding, one or two actions supported.
            </p>
          </FadeUp>
        </div>
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-10 sm:gap-8 px-4" style={{ maxWidth: 880, margin: '0 auto', paddingBottom: 20 }}>
            {[
              { src: '/images/p3-cta-poshparty.png', label: '01, Posh Party',  sub: 'Title · Sub text',                d: 0.05 },
              { src: '/images/p3-cta-bundles.png',   label: '02, Bundles',     sub: 'Title · Sub text with link',      d: 0.12 },
              { src: '/images/p3-cta-news.png',      label: '03, News',        sub: 'Title · Sub text with link text', d: 0.19 },
            ].map(({ src, label, sub, d }) => (
              <div key={label} className="flex flex-col items-center w-full sm:flex-1 max-w-[200px] sm:max-w-[320px]" style={{ gap: 40 }}>
                <Screen src={src} alt={label} delay={d} />
                <FadeUp delay={d + 0.12} className="text-center">
                  <span className="block font-bold text-xs uppercase tracking-widest" style={{ color: B }}>{label}</span>
                  <span className="block text-xs font-light mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{sub}</span>
                </FadeUp>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── SINGLE-TONE DO'S & DON'TS ── */}
      <section className="py-24 overflow-hidden" style={{ background: '#0d0e12' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="mb-16">
            <SectionLabel>Single Tone</SectionLabel>
            <Heading>Do's and Don'ts</Heading>
          </FadeUp>

          {/* 2 groups per row, each group = DO + DON'T pair */}
          {(() => {
            const pairs = [
              { rule: 'Stroke Weight',      doImg: '/images/p3-dd1-do.png',   doText: 'All elements share the same 2px stroke',           dontImg: '/images/p3-dd1-dont.png', dontText: "Don't mix stroke weights in the same icon" },
              { rule: 'Fill Ratio',          doImg: '/images/p3-dd2-do.png',   doText: 'Highlight one element, 80:20 ratio, 15% opacity', dontImg: '/images/p3-dd2-dont.png', dontText: "Don't use 50:50 or 60:40, removes hierarchy" },
              { rule: 'Secondary Elements',  doImg: '/images/p3-dd3-do.png',   doText: 'Keep smaller elements minimal, stroke only',       dontImg: '/images/p3-dd3-dont.png', dontText: "Don't add complex detail to small elements" },
              { rule: 'Highlight Count',     doImg: '/images/p3-dd4-do.png',   doText: 'Highlight exactly one element per icon',           dontImg: '/images/p3-dd4-dont.png', dontText: "Don't fill multiple elements, erases hierarchy" },
            ];
            const rows = [[pairs[0], pairs[1]], [pairs[2], pairs[3]]];
            return rows.map((rowPairs, ri) => (
              <FadeUp key={ri} delay={ri * 0.08} className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
                {rowPairs.map(({ rule, doImg, doText, dontImg, dontText }) => (
                  <div key={rule} className="flex flex-col gap-4">
                    {/* Rule label */}
                    <span className="font-semibold text-sm" style={{ color: WHITE }}>{rule}</span>
                    {/* DO + DON'T cards side by side */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* DO */}
                      <div className="flex flex-col gap-3">
                        <div className="rounded-xl overflow-hidden"
                          style={{ background: 'rgba(34,197,94,0.04)', border: '1.5px solid rgba(34,197,94,0.18)' }}>
                          <img src={doImg} alt={doText} style={{ display: 'block', width: '100%', height: 'auto' }} />
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', fontSize: 9, fontWeight: 700 }}>✓</span>
                          <p className="text-xs font-light leading-relaxed" style={{ color: MUTED }}>{doText}</p>
                        </div>
                      </div>
                      {/* DON'T */}
                      <div className="flex flex-col gap-3">
                        <div className="rounded-xl overflow-hidden"
                          style={{ background: 'rgba(239,68,68,0.04)', border: '1.5px solid rgba(239,68,68,0.18)' }}>
                          <img src={dontImg} alt={dontText} style={{ display: 'block', width: '100%', height: 'auto' }} />
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', fontSize: 9, fontWeight: 700 }}>✕</span>
                          <p className="text-xs font-light leading-relaxed" style={{ color: MUTED }}>{dontText}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </FadeUp>
            ));
          })()}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CHAPTER 3, MULTI-TONE SPECIFICATION
      ═══════════════════════════════════════════ */}
      <ChapterDivider label="Multi-Tone Specification" />

      {/* ── MULTI-TONE GUIDE ── */}
      <section className="py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #080c14 0%, #0a0c18 60%, #080c14 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="mb-14">
            <SectionLabel>Multi-Tone Guide</SectionLabel>
            <Heading>Background shapes + foreground illustration.</Heading>
            <Body className="mt-4 max-w-2xl">Multi-Tone is a layered system: amorphic background shapes at low opacity, topped with a foreground illustration using exactly 6 brand fill colours.</Body>
          </FadeUp>

          {/* 3 unified cards — image + specs combined */}
          <FadeUp delay={0.1} className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
            {[
              { src: '/images/p3-mt-card1.png', title: 'Background Shapes',     specs: ['amorphic forms', '20–50% opacity'],         bullets: ['Soft organic shapes behind the illustration', 'Use brand colours at low opacity', 'Light mode: 20% · Dark mode: 50%'],                              d: 0.05 },
              { src: '/images/p3-mt-card2.png', title: 'Foreground Illustration', specs: ['6 fill colours', '1px stroke #4A4A4A'],    bullets: ['Use exactly 6 brand fill colours', 'Stroke colour #4A4A4A or #FFFFFF', 'One filled element, rest stay as strokes'],                            d: 0.12 },
              { src: '/images/p3-mt-card3.png', title: 'Foreground + Images',   specs: ['Poshmark imagery', 'no stock photos'],       bullets: ['Mix illustrations with real product images', 'Use Poshmark photoshoot or listing images', 'Avoid stock or paid image libraries'],                  d: 0.19 },
            ].map(({ src, title, specs, bullets, d }) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: d }}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                <div style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <img src={src} alt={title} style={{ display: 'block', width: '100%', height: 'auto' }} />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <span className="font-semibold text-sm block" style={{ color: WHITE }}>{title}</span>
                  <ul className="flex flex-col gap-1.5">
                    {bullets.map(b => (
                      <li key={b} className="flex items-start gap-2 text-xs font-light" style={{ color: MUTED }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: B }} />{b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-3 mt-1" style={{ borderTop: `1px solid ${BORDER}` }}>
                    {specs.map(s => <Spec key={s}>{s}</Spec>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </FadeUp>

        </div>
      </section>

      {/* ── BRAND COLOUR PALETTE ── */}
      <section className="py-20 overflow-hidden" style={{ background: '#080a0f' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="mb-12">
            <SectionLabel>Brand Palette</SectionLabel>
            <Heading>Eight colours. No more.</Heading>
            <Body className="mt-4 max-w-xl">All Multi-Tone foreground illustrations are built exclusively from these 8 brand fill colours. Background shapes use the same palette at reduced opacity.</Body>
          </FadeUp>

          <FadeUp delay={0.1} className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {[
              { hex: '#7F0353', name: 'Posh Berry' },
              { hex: '#B7A52A', name: 'Olive Gold' },
              { hex: '#ABD2DB', name: 'Mist Blue' },
              { hex: '#F9825C', name: 'Coral' },
              { hex: '#094074', name: 'Navy' },
              { hex: '#43C7CF', name: 'Teal' },
              { hex: '#4A4A4A', name: 'Charcoal' },
              { hex: '#FFFFFF', name: 'White' },
            ].map(({ hex, name }) => (
              <div key={hex} className="flex flex-col rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${BORDER}` }}>
                <div style={{ background: hex, height: 100, borderBottom: hex === '#FFFFFF' ? '1px solid rgba(255,255,255,0.12)' : undefined }} />
                <div className="px-3 py-3 flex flex-col gap-0.5"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <code className="text-xs font-mono font-medium block" style={{ color: WHITE }}>{hex}</code>
                  <span className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.5)' }}>{name}</span>
                </div>
              </div>
            ))}
          </FadeUp>

          <FadeUp delay={0.2} className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>Background shapes use brand colours at</span>
            <Spec>Light: 20% opacity</Spec>
            <span className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>or</span>
            <Spec>Dark: 50% opacity</Spec>
          </FadeUp>
        </div>
      </section>

      {/* ── MULTI-TONE EXAMPLES — Small Artboard ── */}
      <section className="py-28 overflow-hidden" style={{ background: '#060709' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="text-center mb-16">
            <SectionLabel>Multi-Tone Examples</SectionLabel>
            <Heading>Small artboard, icon scale.</Heading>
            <p className="mt-4 mx-auto max-w-lg font-light" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1rem' }}>
              At 100px, Multi-Tone compositions appear as compact cards and list items.
            </p>
          </FadeUp>
        </div>
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-10 sm:gap-8 px-4" style={{ maxWidth: 880, margin: '0 auto', paddingBottom: 20 }}>
            {[
              { src: '/images/p3-sm-addmyinfo.png', label: '01, Thumbnail',             sub: 'Single illustration · CTA',      d: 0.05 },
              { src: '/images/p3-sm-landing.png',   label: '02, Multiple Illustrations', sub: 'Inline icons · numbered steps',  d: 0.12 },
              { src: '/images/p3-sm-week1.png',     label: '03, Actionsheet',            sub: 'Hero at top · text below',       d: 0.19 },
            ].map(({ src, label, sub, d }) => (
              <div key={label} className="flex flex-col items-center w-full sm:flex-1 max-w-[200px] sm:max-w-[320px]" style={{ gap: 40 }}>
                <Screen src={src} alt={label} delay={d} />
                <FadeUp delay={d + 0.12} className="text-center">
                  <span className="block font-bold text-xs uppercase tracking-widest" style={{ color: B }}>{label}</span>
                  <span className="block text-xs font-light mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{sub}</span>
                </FadeUp>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── MULTI-TONE EXAMPLES — Real Images ── */}
      <section className="py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #080c14 0%, #0a0c18 60%, #080c14 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="text-center mb-16">
            <SectionLabel>Multi-Tone Examples</SectionLabel>
            <Heading>With real images, photographic.</Heading>
            <p className="mt-4 mx-auto max-w-lg font-light" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1rem' }}>
              Transparent PNGs replacing illustrations, same background shape rules apply.
            </p>
          </FadeUp>
        </div>
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-10 sm:gap-8 px-4" style={{ maxWidth: 880, margin: '0 auto', paddingBottom: 20 }}>
            {[
              { src: '/images/p3-ri-consignment.png', label: '01, My Consignment',  sub: 'Product photo · CTA',           d: 0.05 },
              { src: '/images/p3-ri-shows.png',       label: '02, Posh Shows',      sub: 'Photography + illustration',    d: 0.12 },
              { src: '/images/p3-ri-welcome.png',     label: '03, Welcome Screen',  sub: 'Multi-photo grid · onboarding', d: 0.19 },
            ].map(({ src, label, sub, d }) => (
              <div key={label} className="flex flex-col items-center w-full sm:flex-1 max-w-[200px] sm:max-w-[320px]" style={{ gap: 40 }}>
                <Screen src={src} alt={label} delay={d} />
                <FadeUp delay={d + 0.12} className="text-center">
                  <span className="block font-bold text-xs uppercase tracking-widest" style={{ color: B }}>{label}</span>
                  <span className="block text-xs font-light mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{sub}</span>
                </FadeUp>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── ILLUSTRATION DO'S & DON'TS ── */}
      <section className="py-24 overflow-hidden" style={{ background: '#0d0e12' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeUp className="mb-16">
            <SectionLabel>Illustration</SectionLabel>
            <Heading>Do's and Don'ts</Heading>
          </FadeUp>

          {(() => {
            const pairs = [
              { rule: 'Single Object Fill',   doImg: '/images/p3-ill1-do.png',   doText: 'Fill one part, stroke the rest, avoid multiple fills for shadows or highlights', dontImg: '/images/p3-ill1-dont.png', dontText: 'Avoid building filled objects with stroke alone' },
              { rule: 'Highlight Strokes',    doImg: '/images/p3-ill2-do.png',   doText: 'Use only #FFFFFF for highlight strokes on filled objects',                         dontImg: '/images/p3-ill2-dont.png', dontText: 'Avoid any other colour for highlight strokes on filled objects' },
              { rule: 'Similar Objects',      doImg: '/images/p3-ill3-do.png',   doText: 'Make one object filled and the other an outline, avoid filling both',            dontImg: '/images/p3-ill3-dont.png', dontText: 'Avoid imbalanced illustrations, majorly fill with minor stroke or vice versa' },
              { rule: 'Real Images',          doImg: '/images/p3-ill4-do.png',   doText: 'Use a balanced mix of real images and illustrations, avoid overusing one',       dontImg: '/images/p3-ill4-dont.png', dontText: 'Avoid stock or paid images, use Poshmark brand photoshoots or listings' },
            ];
            const rows = [[pairs[0], pairs[1]], [pairs[2], pairs[3]]];
            return rows.map((rowPairs, ri) => (
              <FadeUp key={ri} delay={ri * 0.08} className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
                {rowPairs.map(({ rule, doImg, doText, dontImg, dontText }) => (
                  <div key={rule} className="flex flex-col gap-4">
                    <span className="font-semibold text-sm" style={{ color: WHITE }}>{rule}</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-3">
                        <div className="rounded-xl overflow-hidden"
                          style={{ background: 'rgba(34,197,94,0.04)', border: '1.5px solid rgba(34,197,94,0.18)' }}>
                          <img src={doImg} alt={doText} style={{ display: 'block', width: '100%', height: 'auto' }} />
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', fontSize: 9, fontWeight: 700 }}>✓</span>
                          <p className="text-xs font-light leading-relaxed" style={{ color: MUTED }}>{doText}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="rounded-xl overflow-hidden"
                          style={{ background: 'rgba(239,68,68,0.04)', border: '1.5px solid rgba(239,68,68,0.18)' }}>
                          <img src={dontImg} alt={dontText} style={{ display: 'block', width: '100%', height: 'auto' }} />
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', fontSize: 9, fontWeight: 700 }}>✕</span>
                          <p className="text-xs font-light leading-relaxed" style={{ color: MUTED }}>{dontText}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </FadeUp>
            ));
          })()}
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
              { v: '2',        l: 'Unified illustration styles' },
              { v: '21',       l: 'Specification slides' },
              { v: '3',        l: 'Artboard size variants' },
              { v: '6',        l: 'Brand fill colours' },
              { v: '100%',     l: 'Product team adoption' },
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
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <SectionLabel>Reflection</SectionLabel>
            <Heading size="md">Systems thinking starts with naming things.</Heading>
          </FadeUp>
          <FadeUp delay={0.1} className="mt-6">
            <Body>The hardest part of this project wasn't the visual decisions, it was naming the distinction. Once "Single-Tone" and "Multi-Tone" existed as clear categories with defined purposes, every other decision became straightforward. When you give teams the right vocabulary, they stop guessing and start building.</Body>
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
