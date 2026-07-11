import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const Y = '#F1FF58'
const BORDER = 'rgba(255,255,255,0.07)'

type Props = {
  projectId: string
  projectName: string
  coverImage: string
  logo?: string
  accentColor?: string
}

export default function NextProjectSection({ projectId, projectName, coverImage, logo, accentColor = Y }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{ borderTop: `1px solid ${BORDER}`, background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${accentColor}1a 0%, transparent 65%), #111318` }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

          <div className="flex items-center gap-5">
            {/* Logo or Thumbnail */}
            {logo ? (
              <img src={logo} alt={projectName} className="flex-shrink-0 object-contain"
                style={{ width: 64, height: 52 }} />
            ) : (
              <div className="rounded-xl overflow-hidden flex-shrink-0"
                style={{ width: 72, height: 56, border: `1px solid ${BORDER}` }}>
                <img src={coverImage} alt={projectName} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] font-medium mb-2"
                style={{ color: accentColor, fontFamily: "'Poppins', sans-serif" }}>Next Project</p>
              <p className="font-semibold leading-tight"
                style={{ color: '#ffffff', fontSize: 'clamp(1.4rem,3vw,2.4rem)', fontFamily: "'Poppins', sans-serif" }}>
                {projectName}
              </p>
            </div>
          </div>

          <Link to={`/project/${projectId}`}
            className="flex items-center gap-3 font-semibold uppercase tracking-widest text-xs hover:gap-5 transition-all duration-300"
            style={{ color: '#ffffff', textDecoration: 'none', padding: '14px 28px', borderRadius: 9999, border: '1.5px solid rgba(255,255,255,0.15)', fontFamily: "'Poppins', sans-serif" }}>
            View case study <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
