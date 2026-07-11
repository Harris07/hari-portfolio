import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const O = '#F1FF58'
const BG = '#0d0e12'
const WHITE = '#ffffff'
const MUTED = 'rgba(255,255,255,0.42)'
const BORDER = 'rgba(255,255,255,0.07)'

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

const SERVICES = [
  {
    num: '01',
    name: 'User Research',
    desc: 'Conducting user research through interviews, behavioral analysis, usability testing, and data-driven insights to uncover user needs and inform product decisions.',
  },
  {
    num: '02',
    name: 'Visual Experience',
    desc: 'Designing intuitive, visually engaging interfaces that combine aesthetics, accessibility, and usability to create memorable digital experiences.',
  },
  {
    num: '03',
    name: 'Prototyping',
    desc: 'Transforming ideas into interactive prototypes that validate concepts, test user flows, and accelerate product development before implementation.',
  },
  {
    num: '04',
    name: 'Motion Design',
    desc: 'Creating purposeful micro-interactions, animations, and motion systems that enhance usability, improve engagement, and bring interfaces to life.',
  },
  {
    num: '05',
    name: 'AI-Powered Design',
    desc: 'Leveraging AI-driven workflows, design systems, and intelligent product experiences to streamline processes, boost creativity, and deliver innovative solutions.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative"
      style={{ backgroundColor: BG, fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />

      <div className="relative max-w-5xl mx-auto px-6 md:px-10 py-28">
        {/* Header */}
        <FadeUp className="mb-20 text-center">
          <p className="uppercase tracking-[0.22em] text-xs font-semibold mb-4"
            style={{ color: O, fontFamily: "'Poppins', sans-serif" }}>
            What I do
          </p>
          <h2 className="font-semibold leading-tight"
            style={{ color: WHITE, fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontFamily: "'Poppins', sans-serif" }}>
            Services
          </h2>
        </FadeUp>

        {/* Service rows */}
        <div>
          {SERVICES.map((svc, i) => (
            <FadeUp key={svc.num} delay={i * 0.07}>
              <motion.div
                className="grid py-8 md:py-10"
                style={{
                  gridTemplateColumns: '56px 1fr',
                  gap: '2rem',
                  alignItems: 'start',
                  borderTop: '1px solid ' + BORDER,
                  borderBottom: i === SERVICES.length - 1 ? '1px solid ' + BORDER : undefined,
                }}
                whileHover={{ paddingLeft: 8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Number */}
                <span className="font-semibold leading-none"
                  style={{ color: O, fontSize: 'clamp(1.43rem, 2.6vw, 1.76rem)', letterSpacing: '0.05em', fontFamily: "'Poppins', sans-serif", paddingTop: '3px' }}>
                  {svc.num}
                </span>

                {/* Content */}
                <div className="flex flex-col md:flex-row md:items-start md:gap-12">
                  <h3 className="font-semibold flex-shrink-0 mb-3 md:mb-0"
                    style={{
                      color: WHITE,
                      fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                      minWidth: '200px',
                      fontFamily: "'Poppins', sans-serif",
                      lineHeight: 1.3,
                    }}>
                    {svc.name}
                  </h3>
                  <p className="font-light leading-relaxed"
                    style={{ color: MUTED, fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', fontFamily: "'Poppins', sans-serif" }}>
                    {svc.desc}
                  </p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
