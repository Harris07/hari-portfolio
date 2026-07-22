import { Link } from 'react-router-dom'
import { ArrowLeft, Printer, Phone, Mail, MapPin, Linkedin } from 'lucide-react'

const INDIGO = '#6366F1'
const INK = '#1a1a1a'

function BehanceIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.799 5.698c.589 0 1.12.051 1.606.156.482.103.894.273 1.241.507.344.235.612.546.804.938.188.387.282.871.282 1.443 0 .619-.141 1.137-.421 1.551-.283.414-.7.753-1.255 1.015.757.219 1.318.601 1.686 1.141.366.54.551 1.19.551 1.951 0 .625-.12 1.162-.358 1.612-.239.449-.567.817-.984 1.101-.417.285-.9.494-1.452.627-.549.132-1.123.198-1.72.198H1V5.698h6.799zm-.37 4.808c.494 0 .898-.117 1.208-.35.311-.234.466-.604.466-1.112 0-.268-.051-.492-.152-.671-.1-.179-.237-.321-.407-.425-.172-.103-.368-.175-.589-.218-.22-.043-.444-.064-.674-.064H3.893v2.84h3.536zm.17 5.027c.255 0 .499-.026.729-.074.23-.049.432-.132.607-.252.174-.12.315-.282.421-.487.105-.203.158-.462.158-.77 0-.613-.173-1.057-.519-1.332-.347-.274-.806-.412-1.38-.412H3.893v3.327h3.706zM20.935 9.07c-.478-.501-1.171-.75-2.082-.75-.586 0-1.085.105-1.499.312-.413.209-.75.474-1.013.796-.261.321-.449.677-.562 1.069-.113.391-.176.779-.187 1.164h5.766c-.054-.914-.344-1.588-.823-2.591h.4zm.468 5.337c-.255.477-.674.854-1.257 1.131-.583.276-1.241.414-1.974.414-.772 0-1.449-.136-2.03-.41-.581-.273-1.062-.648-1.443-1.122-.381-.475-.664-1.031-.851-1.667-.186-.636-.278-1.316-.278-2.041 0-.748.098-1.449.293-2.097.197-.649.49-1.213.881-1.689.392-.478.877-.851 1.455-1.123.578-.272 1.241-.407 1.988-.407.817 0 1.521.158 2.111.474.59.315 1.071.738 1.445 1.269.373.531.639 1.134.797 1.807.159.674.221 1.369.189 2.083h-8.075c.031.88.283 1.566.755 2.057.471.491 1.118.737 1.939.737.597 0 1.098-.139 1.5-.418.402-.279.658-.62.767-1.022l2.017.025c-.094.588-.438 1.197-.969 1.799zm-6.297-8.782h5.375v-1.39h-5.375v1.39z" />
    </svg>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 18, color: '#8a8a8a', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
      {children} <span style={{ color: INDIGO }}>&rsaquo;</span>
    </div>
  )
}

function TimelineDot({ filled = false }: { filled?: boolean }) {
  return (
    <span style={{
      position: 'absolute', left: -35, top: 2, width: 12, height: 12, borderRadius: '50%',
      background: filled ? INDIGO : '#fff', border: filled ? 'none' : '2px solid #c9c9c9',
    }} />
  )
}

const EXPERIENCE = [
  {
    title: 'Product Designer', duration: '2 mo', company: 'Gold Setu', range: 'Oct 2021 - Present', current: true,
    bullets: [
      <>I&rsquo;m responsible for designing the customer facing web &amp; mobile application</>,
      <><strong>Creating design guidelines</strong>, best practices and standards.</>,
    ],
  },
  {
    title: 'Product Designer', duration: '2.3 yrs', company: 'IO Factory', range: 'May 2019 - Sep 2021',
    bullets: [
      <>I&rsquo;m responsible for designing new products, interfaces, and user experiences across multiple platforms.</>,
      <>I have worked on more than <strong>30 SaaS products</strong> notably, <strong>Pipeline, People, Budget, Mapbox, VR Viewer.</strong></>,
      <><strong>Single-handedly driving designs</strong> and overseeing the strategic and tactical deliverables related to that project.</>,
      <><strong>Collaborating with engineering team and product managers</strong> throughout the design process to create user flows, wireframes &amp; build user-interface mockups and prototypes with micro interaction animations.</>,
      <>Simplifying complex user interactions, highlighting product&rsquo;s brand and unique personality.</>,
      <><strong>Creating design guidelines</strong>, best practices and standards.</>,
      <><strong>Hiring and managing</strong> freelance designers, design interns every now and then to meet the product requirement.</>,
    ],
  },
  {
    title: 'UI/UX Designer', duration: '1 yr', company: 'Kilobyte Technologies', range: 'May 2018 - Apr 2019',
    bullets: [
      <><strong>Leading projects</strong>, being responsible not only for the delivery but also managing client relationships.</>,
      <>Being an active part of hands-on work in projects, both at <strong>early concept stages</strong> and during detailed <strong>end-to-end implementation</strong>.</>,
      <>Supporting business development, including shaping and <strong>creating proposals to potential clients.</strong></>,
      <><strong>Managing junior designers</strong> to meet the estimated deadlines.</>,
    ],
  },
  {
    title: 'UI/UX Designer', duration: '1 yr', company: 'Firius Technologies Pvt Ltd', range: 'Jul 2015 - Jul 2016',
    bullets: [
      <>Creating webpage layouts for developers and <strong>wireframes for both the website and mobile apps.</strong></>,
      <><strong>Delivering</strong> projects ranging from digital marketing ads, event invites, social media creatives, sales decks and other <strong>collaterals</strong>.</>,
      <>Keeping the brand ethos in mind and work under a predefined brand guideline.</>,
      <>Working closely with the Creative and the Digital Marketing team.</>,
    ],
  },
]

const EDUCATION = [
  { degree: 'MBA', field: '(Finance & Marketing)', school: 'SRM University', range: '2016 - 2018' },
  { degree: 'B.com', field: '(General)', school: 'Agurchand Manmull Jain College', range: '2012 - 2015' },
]

const TOOLS = [
  { name: 'Sketch', level: 4 },
  { name: 'Adobe XD', level: 4 },
  { name: 'Figma', level: 3 },
  { name: 'Adobe Photoshop', level: 4 },
  { name: 'Adobe Illustrator', level: 4 },
  { name: 'Adobe After Effects', level: 2 },
]

const CERTIFICATIONS = [
  'Start the UX Design Process: Empathize, Define, and Ideate',
  'Foundations of User Experience (UX) Design',
]

const CONTACT = [
  { icon: <Phone size={18} color={INDIGO} />, text: '+91 97918 27347', action: 'Click to call', href: 'tel:+919791827347' },
  { icon: <Mail size={18} color={INDIGO} />, text: 'hari1895@gmail.com', action: 'Click to mail', href: 'mailto:hari1895@gmail.com' },
  { icon: <MapPin size={18} color={INDIGO} />, text: 'Plot No:13, SRVS Colony, Keelkattalai, Chennai - 600117.' },
  { icon: <Linkedin size={18} color={INDIGO} />, text: '/hari-prasad-l-308308156', action: 'View profile', href: 'https://linkedin.com/in/hari-prasad-l-308308156' },
]

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      padding: '8px 14px', borderRadius: 8, background: '#f2f2ff', color: INDIGO,
      fontSize: 13.5, fontWeight: 700, border: '1px solid #e4e4fb',
    }}>
      {children}
    </span>
  )
}

function ResumePageCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="resume-page"
      style={{
        width: '100%', maxWidth: 850, background: '#fff', borderRadius: 6,
        padding: '56px 56px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        display: 'grid', gridTemplateColumns: '200px 1fr', columnGap: 36, rowGap: 52,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default function ResumePage() {
  return (
    <div style={{ background: '#f2f2f2', minHeight: '100vh', fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}>
      <style>{`
        @media (max-width: 700px) {
          .resume-page { grid-template-columns: 1fr !important; padding: 32px 24px !important; row-gap: 32px !important; }
        }
        @media print {
          .resume-nav { display: none !important; }
          body { background: #fff !important; }
          .resume-page { box-shadow: none !important; border-radius: 0 !important; page-break-after: always; }
        }
      `}</style>

      {/* Nav */}
      <nav className="resume-nav" style={{
        position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px', background: 'rgba(242,242,242,0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #e5e5e5',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: INK, textDecoration: 'none', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <ArrowLeft size={14} /> Portfolio
        </Link>
        <button
          onClick={() => window.print()}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999,
            background: INDIGO, color: '#fff', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <Printer size={15} /> Print / Save as PDF
        </button>
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, padding: '40px 24px' }}>

        {/* PAGE 1 */}
        <ResumePageCard>
          <div />
          <div>
            <img
              src="/images/portrait.png"
              alt="Hari Prasad L"
              style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
            />
            <h1 style={{ margin: '24px 0 0', fontSize: 44, fontWeight: 800, color: INK, letterSpacing: '0.5px', lineHeight: 1 }}>HARI</h1>
            <h1 style={{ margin: 0, fontSize: 44, fontWeight: 300, color: INK, letterSpacing: '0.5px', lineHeight: 1 }}>PRASAD L</h1>
            <div style={{ width: 120, height: 1, background: '#d8d8d8', margin: '18px 0' }} />
            <div style={{ fontSize: 22, color: INDIGO, fontWeight: 500 }}>Product Designer, UI/UX</div>
          </div>

          <SectionLabel>About</SectionLabel>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#333' }}>
            When passion becomes your job, it doesn&rsquo;t feel like work. It feels like riding horses in heaven. I&rsquo;m one such horse rider. I design!
          </p>

          <div>
            <SectionLabel>Work Experience</SectionLabel>
            <div style={{ fontSize: 32, color: INDIGO, fontWeight: 700, marginTop: 10 }}>4.5 yrs</div>
          </div>

          <div style={{ position: 'relative', paddingLeft: 28, borderLeft: '2px solid #e5e5e5' }}>
            {EXPERIENCE.map((job, i) => (
              <div key={job.company} style={{ position: 'relative', marginBottom: i === EXPERIENCE.length - 1 ? 0 : 36 }}>
                <TimelineDot filled={!!job.current} />
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 17, fontWeight: 700, color: INK }}>{job.title}</span>
                  <span style={{ color: '#ccc' }}>|</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>{job.duration}</span>
                </div>
                <div style={{ display: 'flex', gap: 10, fontSize: 14, margin: '6px 0 10px', flexWrap: 'wrap' }}>
                  <span style={{ color: INDIGO, fontStyle: 'italic', fontWeight: 600 }}>{job.company}</span>
                  <span style={{ color: '#555' }}>{job.range}</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, color: '#444', fontSize: 14.5, lineHeight: 1.7 }}>
                  {job.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </ResumePageCard>

        {/* PAGE 2 */}
        <ResumePageCard>
          <SectionLabel>Education</SectionLabel>
          <div style={{ position: 'relative', paddingLeft: 28, borderLeft: '2px solid #e5e5e5' }}>
            {EDUCATION.map((ed, i) => (
              <div key={ed.school} style={{ position: 'relative', marginBottom: i === EDUCATION.length - 1 ? 0 : 32 }}>
                <span style={{ position: 'absolute', left: -35, top: 2, width: 12, height: 12, borderRadius: '50%', border: `2px solid ${INDIGO}`, background: '#fff' }} />
                <div style={{ fontSize: 16, color: INK }}><strong>{ed.degree}</strong> {ed.field}</div>
                <div style={{ display: 'flex', gap: 10, fontSize: 14, marginTop: 6, flexWrap: 'wrap' }}>
                  <span style={{ color: INDIGO, fontStyle: 'italic', fontWeight: 600 }}>{ed.school}</span>
                  <span style={{ color: '#555' }}>{ed.range}</span>
                </div>
              </div>
            ))}
          </div>

          <SectionLabel>Tool Proficiency</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', rowGap: 28, columnGap: 16 }}>
            {TOOLS.map((tool) => (
              <div key={tool.name}>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>{tool.name}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i < tool.level ? INDIGO : '#e2e2e2' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <SectionLabel>Portfolio</SectionLabel>
          <div>
            <Badge><BehanceIcon size={16} /> Behance</Badge>
            <div style={{ marginTop: 14, fontSize: 14.5, color: '#444' }}>
              behance.net/chikoodesigns &nbsp;
              <a href="https://www.behance.net/chikoodesigns" target="_blank" rel="noopener noreferrer" style={{ color: INDIGO, fontStyle: 'italic', fontWeight: 600, textDecoration: 'none' }}>
                Click to view my portfolio
              </a>
            </div>
          </div>

          <SectionLabel>Certifications</SectionLabel>
          <div>
            <Badge>Coursera</Badge>
            <div style={{ marginTop: 20, paddingLeft: 24, borderLeft: '2px solid #e5e5e5' }}>
              {CERTIFICATIONS.map((c, i) => (
                <div key={c} style={{ position: 'relative', marginBottom: i === CERTIFICATIONS.length - 1 ? 0 : 20 }}>
                  <span style={{ position: 'absolute', left: -31, top: 2, width: 10, height: 10, borderRadius: '50%', border: `2px solid ${INDIGO}`, background: '#fff' }} />
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: INK }}>{c}</div>
                  <div style={{ fontSize: 14, color: '#555', marginTop: 4 }}>
                    coursera.org &nbsp;
                    <a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer" style={{ color: INDIGO, fontStyle: 'italic', fontWeight: 600, textDecoration: 'none' }}>
                      View credentials
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SectionLabel>Achievements</SectionLabel>
          <div>
            <Badge>99designs</Badge>
            <div style={{ marginTop: 16, fontSize: 15.5, color: '#333' }}>
              Won <strong style={{ color: INDIGO }}>11</strong> International Designing Competition
            </div>
          </div>

          <SectionLabel>Language</SectionLabel>
          <div style={{ display: 'flex', gap: 56 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 30, color: INDIGO, fontWeight: 700 }}>அ</div>
              <div style={{ fontSize: 14, color: '#333', marginTop: 6 }}>Tamil</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 30, color: INDIGO, fontWeight: 700 }}>A</div>
              <div style={{ fontSize: 14, color: '#333', marginTop: 6 }}>English</div>
            </div>
          </div>

          <SectionLabel>Contact</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 15, color: '#333' }}>
            {CONTACT.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                {c.icon}
                <span>{c.text}</span>
                {c.action && c.href && (
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ color: INDIGO, fontStyle: 'italic', fontWeight: 600, textDecoration: 'none' }}>
                    {c.action}
                  </a>
                )}
              </div>
            ))}
          </div>
        </ResumePageCard>

      </div>
    </div>
  )
}
