import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { PROJECTS } from '../data/projects'

const O = '#F1FF58'
const WHITE = '#ffffff'
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

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <Link
      to={`/project/${project.id}`}
      style={{ textDecoration: 'none', flexShrink: 0, width: 'clamp(340px, 44vw, 600px)' }}
    >
      <motion.div
        className="flex flex-col rounded-3xl overflow-hidden"
        style={{ background: '#0d0e12', border: '1px solid ' + BORDER, height: 600 }}
        whileHover={{ borderColor: 'rgba(215,226,234,0.25)' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="px-6 pt-6 pb-6 flex items-stretch gap-4">
          <span className="font-semibold uppercase flex-shrink-0 flex items-center leading-none"
            style={{ color: 'rgba(215,226,234,0.3)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '2px' }}>
            {project.num}
          </span>
          <div className="flex flex-col justify-center gap-1.5 min-w-0">
            <h3 className="font-semibold leading-tight"
              style={{ color: '#D7E2EA', fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
              {project.name}
            </h3>
            <p className="font-light leading-snug truncate"
              style={{ color: 'rgba(215,226,234,0.5)', fontSize: '0.82rem' }}>
              {project.shortDesc}
            </p>
          </div>
        </div>

        <div className="mb-4 rounded-2xl overflow-hidden flex-1"
          style={{ marginLeft: 20, marginRight: 20, minHeight: 'clamp(90px, 13vw, 170px)' }}>
          <motion.img
            src={project.coverImage}
            alt={project.name}
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        <div className="px-6 pb-6 flex items-center justify-between">
          <span className="text-xs font-light uppercase tracking-widest"
            style={{ color: 'rgba(215,226,234,0.35)' }}>{project.category}</span>
          <span className="text-xs font-semibold uppercase tracking-widest px-6 rounded-full inline-flex items-center"
            style={{
              height: 48,
              background: '#F1FF58',
              color: '#1a1a1a',
              fontFamily: "'Kanit', sans-serif",
              letterSpacing: '0.1em',
              boxShadow: '0 4px 16px rgba(241,255,88,0.3)',
            }}>
            View Project
          </span>
        </div>
      </motion.div>
    </Link>
  )
}

export default function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  function onMouseDown(e: React.MouseEvent) {
    const el = scrollRef.current
    if (!el) return
    const startX = e.pageX - el.offsetLeft
    const startScroll = el.scrollLeft
    el.style.cursor = 'grabbing'

    function onMove(e: MouseEvent) {
      const x = e.pageX - el!.offsetLeft
      el!.scrollLeft = startScroll - (x - startX)
    }
    function onUp() {
      el!.style.cursor = 'grab'
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <section
      id="projects"
      className="relative z-10"
      style={{ backgroundColor: '#13141a', fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="px-6 md:px-10 pt-28 pb-12">
        <FadeUp className="text-center">
          <p className="uppercase tracking-[0.22em] text-xs font-semibold mb-4"
            style={{ color: O, fontFamily: "'Poppins', sans-serif" }}>
            Selected work
          </p>
          <h2 className="font-semibold leading-tight"
            style={{ color: WHITE, fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontFamily: "'Poppins', sans-serif" }}>
            Projects
          </h2>
        </FadeUp>
      </div>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        style={{
          display: 'flex',
          gap: 20,
          overflowX: 'scroll',
          overflowY: 'visible',
          paddingLeft: '5vw',
          paddingRight: '5vw',
          paddingBottom: 40,
          cursor: 'grab',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        className="hide-scrollbar"
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </section>
  )
}
