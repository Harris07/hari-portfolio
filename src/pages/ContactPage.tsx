import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowDown, Mail, Phone, Linkedin } from 'lucide-react'

function BehanceIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.799 5.698c.589 0 1.12.051 1.606.156.482.103.894.273 1.241.507.344.235.612.546.804.938.188.387.282.871.282 1.443 0 .619-.141 1.137-.421 1.551-.283.414-.7.753-1.255 1.015.757.219 1.318.601 1.686 1.141.366.54.551 1.19.551 1.951 0 .625-.12 1.162-.358 1.612-.239.449-.567.817-.984 1.101-.417.285-.9.494-1.452.627-.549.132-1.123.198-1.72.198H1V5.698h6.799zm-.37 4.808c.494 0 .898-.117 1.208-.35.311-.234.466-.604.466-1.112 0-.268-.051-.492-.152-.671-.1-.179-.237-.321-.407-.425-.172-.103-.368-.175-.589-.218-.22-.043-.444-.064-.674-.064H3.893v2.84h3.536zm.17 5.027c.255 0 .499-.026.729-.074.23-.049.432-.132.607-.252.174-.12.315-.282.421-.487.105-.203.158-.462.158-.77 0-.613-.173-1.057-.519-1.332-.347-.274-.806-.412-1.38-.412H3.893v3.327h3.706zM20.935 9.07c-.478-.501-1.171-.75-2.082-.75-.586 0-1.085.105-1.499.312-.413.209-.75.474-1.013.796-.261.321-.449.677-.562 1.069-.113.391-.176.779-.187 1.164h5.766c-.054-.914-.344-1.588-.823-2.591h.4zm.468 5.337c-.255.477-.674.854-1.257 1.131-.583.276-1.241.414-1.974.414-.772 0-1.449-.136-2.03-.41-.581-.273-1.062-.648-1.443-1.122-.381-.475-.664-1.031-.851-1.667-.186-.636-.278-1.316-.278-2.041 0-.748.098-1.449.293-2.097.197-.649.49-1.213.881-1.689.392-.478.877-.851 1.455-1.123.578-.272 1.241-.407 1.988-.407.817 0 1.521.158 2.111.474.59.315 1.071.738 1.445 1.269.373.531.639 1.134.797 1.807.159.674.221 1.369.189 2.083h-8.075c.031.88.283 1.566.755 2.057.471.491 1.118.737 1.939.737.597 0 1.098-.139 1.5-.418.402-.279.658-.62.767-1.022l2.017.025c-.094.588-.438 1.197-.969 1.799zm-6.297-8.782h5.375v-1.39h-5.375v1.39z"/>
    </svg>
  )
}

const Y = '#F1FF58'
const BG = '#0d0e12'
const WHITE = '#ffffff'
const MUTED = 'rgba(255,255,255,0.42)'
const BORDER = 'rgba(255,255,255,0.07)'

function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  )
}

const SOCIALS = [
  { label: 'Email',    sub: 'hari1895@gmail.com',                                  href: 'mailto:hari1895@gmail.com',                                    icon: <Mail size={22} /> },
  { label: 'Phone',    sub: '+91 97918 27347',                                     href: 'tel:+919791827347',                                             icon: <Phone size={22} /> },
  { label: 'LinkedIn', sub: 'linkedin.com/in/hari-prasad-l-308308156',             href: 'https://linkedin.com/in/hari-prasad-l-308308156',               icon: <Linkedin size={22} /> },
  { label: 'Behance',  sub: 'behance.net/chikoodesigns',                           href: 'https://www.behance.net/chikoodesigns',                         icon: <BehanceIcon size={22} /> },
]

export default function ContactPage() {
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setAtBottom(maxScroll > 0 && scrolled > maxScroll * 0.4)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleArrow() {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById('contact-cards')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ background: `radial-gradient(ellipse 80% 60% at 50% 20%, rgba(241,255,88,0.08) 0%, transparent 65%), ${BG}`, fontFamily: "'Poppins', sans-serif", overflowX: 'hidden', minHeight: '100vh' }}>

      {/* Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ background: 'rgba(13,14,18,0.82)', backdropFilter: 'blur(18px)', borderBottom: `1px solid ${BORDER}` }}>
        <Link to="/" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest hover:opacity-50 transition-opacity"
          style={{ color: WHITE, textDecoration: 'none' }}>
          <ArrowLeft size={13} /> Portfolio
        </Link>
        <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
          style={{ color: Y, background: 'rgba(241,255,88,0.08)', border: '1px solid rgba(241,255,88,0.2)' }}>
          Available for work
        </span>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-20">

        <div className="max-w-5xl mx-auto w-full">
          <motion.p className="uppercase tracking-[0.22em] text-xs font-semibold mb-6"
            style={{ color: Y }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            Get in touch
          </motion.p>

          <motion.h1
            className="font-semibold leading-[1.05] mb-8"
            style={{ color: WHITE, fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
            Let's build something<br />
            <span style={{ color: Y }}>remarkable</span> together.
          </motion.h1>

          <motion.p className="font-light max-w-lg"
            style={{ color: MUTED, fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.75 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}>
            Whether you have a project in mind, a role to fill, or just want to talk design — my inbox is always open.
          </motion.p>
        </div>
      </section>

      {/* CONTACT BLOCKS */}
      <section id="contact-cards" className="px-6 md:px-10 pb-28">
        <div className="max-w-5xl mx-auto">

          {/* Social stat cards */}
          <FadeUp delay={0.05} className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-5 px-6 py-7 rounded-2xl group"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`, textDecoration: 'none' }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.55 }}
                  whileHover={{ borderColor: 'rgba(241,255,88,0.3)', background: 'rgba(255,255,255,0.05)' }}>
                  {/* Icon badge */}
                  <div className="flex items-center justify-center rounded-2xl"
                    style={{ width: 52, height: 52, background: Y, color: '#1a1a1a', flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  {/* Label */}
                  <div>
                    <span className="block font-semibold text-base mb-1" style={{ color: WHITE }}>{s.label}</span>
                    <span className="text-xs font-light" style={{ color: MUTED }}>{s.sub}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </FadeUp>

        </div>
      </section>

      {/* Bottom-right scroll toggle button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          onClick={handleArrow}
          className="flex items-center justify-center rounded-full overflow-hidden"
          style={{ width: 88, height: 88, background: Y, color: '#1a1a1a', border: 'none', cursor: 'pointer' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}>
          <motion.div
            animate={{ rotate: atBottom ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <ArrowDown size={36} strokeWidth={2} />
          </motion.div>
        </motion.button>
      </div>

    </div>
  )
}
