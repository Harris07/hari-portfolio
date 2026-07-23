import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowDown } from 'lucide-react'

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.4656 14.6544C12.6308 14.7303 12.817 14.7476 12.9934 14.7036C13.1697 14.6595 13.3259 14.5567 13.436 14.412L13.72 14.04C13.869 13.8413 14.0623 13.68 14.2845 13.5689C14.5066 13.4578 14.7516 13.4 15 13.4H17.4C17.8243 13.4 18.2313 13.5686 18.5314 13.8686C18.8314 14.1687 19 14.5757 19 15V17.4C19 17.8243 18.8314 18.2313 18.5314 18.5314C18.2313 18.8314 17.8243 19 17.4 19C13.5809 19 9.91819 17.4829 7.21766 14.7823C4.51714 12.0818 3 8.41912 3 4.6C3 4.17565 3.16857 3.76869 3.46863 3.46863C3.76869 3.16857 4.17565 3 4.6 3H7C7.42435 3 7.83131 3.16857 8.13137 3.46863C8.43143 3.76869 8.6 4.17565 8.6 4.6V7C8.6 7.24839 8.54217 7.49337 8.43108 7.71554C8.32 7.93771 8.15871 8.13097 7.96 8.28L7.5856 8.5608C7.43873 8.67294 7.33522 8.83247 7.29263 9.01228C7.25005 9.19209 7.27103 9.3811 7.352 9.5472C8.44534 11.7679 10.2435 13.5638 12.4656 14.6544Z" fill="currentColor"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.58496 12.5918C9.59487 12.5979 9.6051 12.6037 9.61523 12.6094C10.0389 12.8469 10.5181 12.9706 11.0039 12.9707C11.4898 12.9706 11.9698 12.8469 12.3936 12.6094C12.4037 12.6037 12.4139 12.5969 12.4238 12.5908L20 7.93262V16.25C19.9998 17.2164 19.1942 18 18.2002 18H3.7998C2.80589 17.9999 2.00017 17.2163 2 16.25V7.93164L9.58496 12.5918ZM18.2002 4C19.1943 4.00002 20 4.7835 20 5.75V5.8457L11.5195 11.0605C11.3648 11.1464 11.1865 11.1933 11.0039 11.1934C10.8237 11.1933 10.6485 11.1472 10.4951 11.0635L2 5.8457V5.75C2 4.78356 2.80578 4.00011 3.7998 4H18.2002Z" fill="currentColor"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.54058 8.50834H3.26182V19.0004H6.54058V8.50834ZM6.83567 4.90169C6.8374 4.65368 6.79026 4.40776 6.69694 4.17796C6.60363 3.94817 6.46597 3.739 6.2918 3.56242C6.11765 3.38583 5.91043 3.24526 5.68195 3.14877C5.45348 3.05227 5.20823 3.00172 4.96022 3H4.90119C4.39684 3 3.91314 3.20036 3.5565 3.55699C3.19987 3.91363 2.99951 4.39734 2.99951 4.90169C2.99951 5.40605 3.19987 5.88975 3.5565 6.24639C3.91314 6.60302 4.39684 6.80338 4.90119 6.80338C5.14923 6.80948 5.39603 6.76665 5.6275 6.67733C5.85897 6.58803 6.07058 6.45398 6.25022 6.28286C6.42987 6.11174 6.57404 5.90689 6.6745 5.68003C6.77495 5.45317 6.82972 5.20874 6.83567 4.96071V4.90169ZM18.9999 12.6265C18.9999 9.47234 16.9933 8.24605 14.9998 8.24605C14.3471 8.21336 13.6972 8.35237 13.115 8.64924C12.5328 8.94605 12.0385 9.39041 11.6817 9.93787H11.5898V8.50834H8.50784V19.0004H11.7866V13.4199C11.7392 12.8485 11.9193 12.2813 12.2876 11.8417C12.6559 11.4021 13.1829 11.1257 13.7539 11.0724H13.8785C14.9211 11.0724 15.6949 11.7281 15.6949 13.3805V19.0004H18.9737L18.9999 12.6265Z" fill="currentColor"/>
    </svg>
  )
}

function BehanceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.37921 4.1084C7.02759 4.1084 7.61145 4.16484 8.14371 4.28055C8.67721 4.39179 9.12787 4.5814 9.51036 4.8388C9.88835 5.09702 10.1798 5.44091 10.3954 5.86967C10.6017 6.29434 10.7048 6.82743 10.7048 7.45879C10.7048 8.1421 10.551 8.7085 10.2403 9.16482C9.92692 9.61995 9.47179 9.98982 8.86115 10.2826C9.69427 10.5229 10.309 10.9439 10.7215 11.5416C11.1336 12.1437 11.3317 12.8652 11.3317 13.715C11.3317 14.4023 11.1981 14.9906 10.9375 15.4892C10.6711 15.9923 10.3102 16.3999 9.86807 16.7142C9.42143 17.0316 8.90581 17.2639 8.32968 17.4141C7.75761 17.5635 7.16932 17.6419 6.56109 17.6419H0V4.10964L6.38003 4.11005L6.37924 4.1084H6.37921ZM14.3557 5.20015H19.8425V6.53675L14.3557 6.53634V5.19974V5.20015ZM15.5749 15.2874C15.9793 15.6817 16.5591 15.8798 17.3159 15.8798C17.8571 15.8798 18.3305 15.7418 18.7207 15.4669C19.1108 15.192 19.3479 14.9009 19.4385 14.5996L21.8092 14.6001C21.4267 15.7807 20.851 16.6196 20.0609 17.1266C19.2826 17.6338 18.3301 17.8912 17.2249 17.8912C16.4507 17.8912 15.7596 17.7657 15.1364 17.5209C14.5136 17.272 13.9939 16.9245 13.5554 16.4677C13.1303 16.0126 12.7954 15.4714 12.5587 14.8351C12.3264 14.2042 12.207 13.503 12.207 12.747C12.207 12.0126 12.328 11.3292 12.5672 10.6975C12.812 10.0609 13.1474 9.51641 13.594 9.05599C14.0402 8.59599 14.5643 8.23099 15.1835 7.96465C15.7982 7.69791 16.477 7.56432 17.229 7.56432C18.0576 7.56432 18.7836 7.72389 19.4068 8.0499C20.0256 8.37148 20.5367 8.80591 20.9362 9.34753C21.3366 9.88955 21.6195 10.5119 21.7957 11.2075C21.972 11.9029 22.0321 12.6289 21.9837 13.3905H14.9086C14.9086 14.1591 15.1669 14.8948 15.5741 15.2846L15.5749 15.2874ZM18.6642 10.1412C18.3467 9.78925 17.8006 9.59558 17.1437 9.59558C16.7133 9.59558 16.3577 9.66825 16.0743 9.81441C15.7953 9.95978 15.5672 10.14 15.391 10.3556C15.2192 10.5704 15.0983 10.8027 15.0313 11.0466C14.9626 11.2829 14.92 11.5018 14.9058 11.6914L19.2887 11.691C19.2241 11.004 18.9878 10.4969 18.6659 10.1405L18.6643 10.1412H18.6642ZM5.99146 9.57323C6.51929 9.57323 6.95736 9.44776 7.30084 9.19483C7.64431 8.94596 7.80794 8.53346 7.80794 7.96586C7.80794 7.65284 7.75191 7.38973 7.64026 7.18754C7.52496 6.98576 7.37351 6.82619 7.18066 6.71495C6.99105 6.59962 6.7771 6.52087 6.52413 6.47825C6.27932 6.43156 6.02109 6.41005 5.75963 6.41005H2.97605V9.57162H5.99228L5.99146 9.57323ZM6.15467 15.3341C6.44782 15.3341 6.72674 15.3081 6.98699 15.2472C7.25333 15.1872 7.49004 15.0974 7.68697 14.9602C7.8847 14.8266 8.05276 14.6512 8.17214 14.419C8.29314 14.1908 8.34835 13.8993 8.34835 13.5432C8.34835 12.8477 8.15021 12.3487 7.76005 12.0475C7.36986 11.7503 6.85015 11.6049 6.20582 11.6049H2.97523V15.3288L6.15467 15.3284V15.3341V15.3341Z" fill="currentColor"/>
    </svg>
  )
}

const Y = '#F1FF58'
const BG = '#0d0e12'
const WHITE = '#ffffff'
const MUTED = 'rgba(255,255,255,0.65)'
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
  { label: 'Email',    sub: 'hari1895@gmail.com',                                  href: 'mailto:hari1895@gmail.com',                                    icon: <MailIcon /> },
  { label: 'Phone',    sub: '+91 97918 27347',                                     href: 'tel:+919791827347',                                             icon: <PhoneIcon /> },
  { label: 'LinkedIn', sub: 'linkedin.com/in/hari-prasad-l-308308156',             href: 'https://linkedin.com/in/hari-prasad-l-308308156',               icon: <LinkedInIcon /> },
  { label: 'Behance',  sub: 'behance.net/chikoodesigns',                           href: 'https://www.behance.net/chikoodesigns',                         icon: <BehanceIcon /> },
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
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7 }}
            style={{ marginTop: 32 }}
          >
            <a
              href="/resume.pdf"
              download="Hari Prasad L Product Designer Resume"
              className="inline-flex items-center gap-2 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 hover:scale-105 active:scale-95 transition-transform duration-200"
              style={{
                color: '#F1FF58',
                textDecoration: 'none',
                border: '2px solid #F1FF58',
                borderRadius: 9999,
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                whiteSpace: 'nowrap',
                fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(241,255,88,0.10)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v13M7 11l5 5 5-5"/>
                <path d="M5 20h14"/>
              </svg>
              Resume
            </a>
          </motion.div>
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
