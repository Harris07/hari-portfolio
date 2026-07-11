import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PROJECTS, ProjectSection } from '../data/projects'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import NextProjectSection from '../components/NextProjectSection'

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="uppercase tracking-widest text-xs font-medium" style={{ color: '#888' }}>
        {label}
      </span>
      <span className="font-medium text-sm sm:text-base" style={{ color: '#D7E2EA' }}>
        {value}
      </span>
    </div>
  )
}

function SectionBlock({ section }: { section: ProjectSection }) {
  if (section.type === 'text') {
    return (
      <div className="flex flex-col gap-4 max-w-2xl">
        {section.label && (
          <span
            className="uppercase tracking-widest text-xs font-semibold px-3 py-1 rounded-full w-fit"
            style={{ color: '#00B3FF', backgroundColor: 'rgba(0,179,255,0.08)', border: '1px solid rgba(0,179,255,0.3)' }}
          >
            {section.label}
          </span>
        )}
        {section.heading && (
          <h2 className="font-bold leading-tight" style={{ color: '#D7E2EA', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
            {section.heading}
          </h2>
        )}
        {section.body && (
          <p className="font-light leading-relaxed" style={{ color: '#A0B0BB', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}>
            {section.body}
          </p>
        )}
        {section.items && (
          <ul className="flex flex-col gap-3 mt-1">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#00B3FF' }} />
                <span className="font-light leading-relaxed" style={{ color: '#A0B0BB', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  if (section.type === 'numbered-grid') {
    return (
      <div className="w-full flex flex-col gap-6">
        {section.label && (
          <span
            className="uppercase tracking-widest text-xs font-semibold px-3 py-1 rounded-full w-fit"
            style={{ color: '#00B3FF', backgroundColor: 'rgba(0,179,255,0.08)', border: '1px solid rgba(0,179,255,0.3)' }}
          >
            {section.label}
          </span>
        )}
        {section.heading && (
          <h2 className="font-bold leading-tight" style={{ color: '#D7E2EA', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
            {section.heading}
          </h2>
        )}
        <div
          className="w-full rounded-3xl p-8 sm:p-10"
          style={{
            backgroundColor: 'rgba(215,226,234,0.03)',
            border: '1px solid rgba(215,226,234,0.08)',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-10">
            {section.items?.map((item, i) => {
              const num = item.match(/^(\d+)/)?.[1] ?? String(i + 1).padStart(2, '0')
              const text = item.replace(/^\d+\s*[—–-]\s*/, '')
              return (
                <div key={i} className="flex flex-col gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                    style={{ backgroundColor: 'rgba(0,179,255,0.12)', color: '#00B3FF' }}
                  >
                    {num}
                  </div>
                  <p className="font-semibold leading-snug" style={{ color: '#D7E2EA', fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}>
                    {text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  if (section.type === 'chips') {
    return (
      <div className="flex flex-col gap-6 max-w-3xl">
        {section.label && (
          <span
            className="uppercase tracking-widest text-xs font-semibold px-3 py-1 rounded-full w-fit"
            style={{ color: '#00B3FF', backgroundColor: 'rgba(0,179,255,0.08)', border: '1px solid rgba(0,179,255,0.3)' }}
          >
            {section.label}
          </span>
        )}
        {section.heading && (
          <h2 className="font-bold leading-tight" style={{ color: '#D7E2EA', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
            {section.heading}
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {section.items?.map((item, i) => (
            <div
              key={i}
              className="px-5 py-4 rounded-2xl font-medium text-sm"
              style={{
                backgroundColor: 'rgba(215,226,234,0.05)',
                border: '1px solid rgba(215,226,234,0.1)',
                color: '#D7E2EA',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (section.type === 'card-grid') {
    return (
      <div className="w-full flex flex-col gap-6">
        {section.label && (
          <span
            className="uppercase tracking-widest text-xs font-semibold px-3 py-1 rounded-full w-fit"
            style={{ color: '#00B3FF', backgroundColor: 'rgba(0,179,255,0.08)', border: '1px solid rgba(0,179,255,0.3)' }}
          >
            {section.label}
          </span>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {section.cards?.map((card, i) => (
            <div
              key={i}
              className="flex flex-col gap-0 rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(215,226,234,0.08)', background: 'rgba(255,255,255,0.03)' }}
            >
              {/* Image area */}
              <div
                className="w-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.04)', aspectRatio: '4/3', padding: '24px' }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Text area */}
              <div className="flex flex-col gap-3 p-5" style={{ borderTop: '1px solid rgba(215,226,234,0.06)' }}>
                <h3
                  className="font-semibold text-left tracking-tight"
                  style={{ color: '#D7E2EA', fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', lineHeight: 1.3 }}
                >
                  {card.title}
                </h3>
                {card.bullets ? (
                  <ul className="flex flex-col gap-2 list-none" style={{ padding: 0, margin: 0 }}>
                    {card.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2.5" style={{ color: '#A0B0BB', fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)', lineHeight: 1.6 }}>
                        <span
                          style={{
                            width: '5px', height: '5px', borderRadius: '50%',
                            background: '#00B3FF', flexShrink: 0, marginTop: '0.45em',
                          }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-light leading-relaxed" style={{ color: '#A0B0BB', fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)' }}>
                    {card.body}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (section.type === 'before-after') {
    return (
      <div className="w-full flex flex-col gap-6">
        {section.label && (
          <span
            className="uppercase tracking-widest text-xs font-semibold px-3 py-1 rounded-full w-fit"
            style={{ color: '#00B3FF', backgroundColor: 'rgba(0,179,255,0.08)', border: '1px solid rgba(0,179,255,0.3)' }}
          >
            {section.label}
          </span>
        )}
        <BeforeAfterSlider
          beforeImage={section.images?.[0] ?? ''}
          afterImage={section.images?.[1] ?? ''}
        />
      </div>
    )
  }

  if (section.type === 'image') {
    return (
      <div className="w-full">
        {section.label && (
          <span
            className="uppercase tracking-widest text-xs font-semibold px-3 py-1 rounded-full w-fit mb-6 inline-block"
            style={{ color: '#00B3FF', backgroundColor: 'rgba(0,179,255,0.08)', border: '1px solid rgba(0,179,255,0.3)' }}
          >
            {section.label}
          </span>
        )}
        {section.images?.[0] && (
          <img
            src={section.images[0]}
            alt=""
            className="w-full object-cover rounded-3xl"
            style={{ maxHeight: 600 }}
          />
        )}
      </div>
    )
  }

  if (section.type === 'image-grid') {
    return (
      <div className="w-full flex flex-col gap-4">
        {section.label && (
          <span
            className="uppercase tracking-widest text-xs font-semibold px-3 py-1 rounded-full w-fit"
            style={{ color: '#00B3FF', backgroundColor: 'rgba(0,179,255,0.08)', border: '1px solid rgba(0,179,255,0.3)' }}
          >
            {section.label}
          </span>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {section.images?.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-full object-cover rounded-3xl"
              style={{ maxHeight: 400 }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (section.type === 'metrics') {
    return (
      <div className="w-full flex flex-col gap-6">
        {section.label && (
          <span
            className="uppercase tracking-widest text-xs font-semibold px-3 py-1 rounded-full w-fit"
            style={{ color: '#00B3FF', backgroundColor: 'rgba(0,179,255,0.08)', border: '1px solid rgba(0,179,255,0.3)' }}
          >
            {section.label}
          </span>
        )}
        {section.heading && (
          <h2 className="font-bold leading-tight max-w-2xl" style={{ color: '#D7E2EA', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
            {section.heading}
          </h2>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {section.metrics?.map((m, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-5 rounded-2xl"
              style={{ backgroundColor: 'rgba(215,226,234,0.05)', border: '1px solid rgba(215,226,234,0.1)' }}
            >
              <span
                className="font-black leading-none"
                style={{ color: '#D7E2EA', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
              >
                {m.value}
              </span>
              <span className="font-light text-sm leading-snug" style={{ color: '#A0B0BB' }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = PROJECTS.find(p => p.id === id)

  if (!project) return <Navigate to="/" replace />

  const currentIndex = PROJECTS.findIndex(p => p.id === id)
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  return (
    <div style={{ backgroundColor: '#242526', fontFamily: "'Kanit', sans-serif", minHeight: '100vh' }}>
      {/* Top Nav */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ backgroundColor: 'rgba(36,37,38,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(215,226,234,0.08)' }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 font-medium uppercase tracking-wider text-sm transition-opacity duration-200 hover:opacity-70"
          style={{ color: '#D7E2EA', textDecoration: 'none' }}
        >
          <ArrowLeft size={16} />
          Back to work
        </Link>
        <span className="font-medium uppercase tracking-wider text-sm hidden sm:block" style={{ color: '#888' }}>
          {project.category} Project
        </span>
      </nav>

      {/* Edge-to-edge Banner */}
      <img
        src={project.bannerImage}
        alt={project.name}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />

      {/* Hero */}
      <div className="px-6 md:px-10 pt-12 pb-8 max-w-5xl mx-auto">
        {/* Number + Category */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-black text-lg" style={{ color: 'rgba(215,226,234,0.2)' }}>{project.num}</span>
          <span
            className="uppercase tracking-widest text-xs font-semibold px-3 py-1 rounded-full"
            style={{ color: '#00B3FF', backgroundColor: 'rgba(0,179,255,0.08)', border: '1px solid rgba(0,179,255,0.3)' }}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-black uppercase leading-none tracking-tight mb-4"
          style={{ color: '#D7E2EA', fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          {project.name}
        </h1>

        {/* Tagline */}
        <p className="font-light leading-relaxed mb-10 max-w-2xl" style={{ color: '#A0B0BB', fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}>
          {project.tagline}
        </p>

        {/* Meta row */}
        <div
          className="flex flex-wrap gap-8 p-6 rounded-2xl mb-10"
          style={{ backgroundColor: 'rgba(215,226,234,0.04)', border: '1px solid rgba(215,226,234,0.08)' }}
        >
          <MetaChip label="Year" value={project.year} />
          <MetaChip label="Role" value={project.role} />
          <MetaChip label={project.timelineLabel ?? 'Timeline'} value={project.timeline} />
                  </div>

      </div>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div style={{ borderTop: '1px solid rgba(215,226,234,0.08)' }} className="mb-16" />
      </div>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col gap-16 pb-24">
        {project.sections.map((section, i) => (
          <div key={i}>
            <SectionBlock section={section} />
            {i < project.sections.length - 1 && (
              <div style={{ borderTop: '1px solid rgba(215,226,234,0.06)' }} className="mt-16" />
            )}
          </div>
        ))}
      </div>

      <NextProjectSection
        projectId={nextProject.id}
        projectName={nextProject.name}
        coverImage={nextProject.coverImage}
        logo="/images/fitzoo-logo.png"
        accentColor="#FF5C2B"
      />

      {/* Footer */}
      <footer
        className="px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(215,226,234,0.08)' }}
      >
        <span className="font-light text-sm" style={{ color: '#555' }}>
          © Hari Prasad L · 2025 · Product (UI/UX) Designer
        </span>
        <Link
          to="/"
          className="font-medium uppercase tracking-widest text-xs transition-opacity hover:opacity-70"
          style={{ color: '#888', textDecoration: 'none' }}
        >
          Back to Portfolio
        </Link>
      </footer>
    </div>
  )
}
