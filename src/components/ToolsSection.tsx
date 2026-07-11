import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const O = '#F1FF58'
const WHITE = '#ffffff'

function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  )
}

const TOOLS = [
  { name: 'Figma',         icon: '/images/tool-figma.png' },
  { name: 'Claude',        icon: '/images/tool-claude.png' },
  { name: 'After Effects', icon: '/images/tool-aftereffects.svg' },
  { name: 'Illustrator',   icon: '/images/tool-illustrator.svg' },
  { name: 'Photoshop',     icon: '/images/tool-photoshop.svg' },
  { name: 'Sketch',        icon: '/images/tool-sketch.svg' },
  { name: 'Grok',          icon: '/images/tool-grok.svg' },
  { name: 'Google Flow',   icon: '/images/tool-googleflow.svg' },
]

const MARQUEE = [...TOOLS, ...TOOLS, ...TOOLS]

export default function ToolsSection() {
  return (
    <section
      style={{ background: 'linear-gradient(135deg, #0d0e12 0%, #111408 60%, #0d0e12 100%)', fontFamily: "'Poppins', sans-serif", overflow: 'hidden' }}
      className="relative py-28"
    >
      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />

      {/* Header */}
      <div className="relative max-w-5xl mx-auto px-6 md:px-10 mb-16">
        <FadeUp className="text-center">
          <p className="uppercase tracking-[0.22em] text-xs font-semibold mb-4"
            style={{ color: O }}>
            Toolkit
          </p>
          <h2 className="font-semibold leading-tight"
            style={{ color: WHITE, fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
            Design Arsenal
          </h2>
        </FadeUp>
      </div>

      {/* Marquee — constrained to same width as Services section */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 w-full">
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          <div style={{ display: 'flex', width: 'max-content', animation: 'toolkit-marquee 22s linear infinite' }}>
            {MARQUEE.map((tool, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0" style={{ margin: '0 30px' }}>
                <img src={tool.icon} alt={tool.name}
                  style={{ width: 35, height: 35, objectFit: 'contain', flexShrink: 0 }} />
                <span className="font-semibold whitespace-nowrap"
                  style={{ color: '#D7E2EA', fontSize: '1.155rem', letterSpacing: '0.01em' }}>
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes toolkit-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}
