import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/projects'

const buttonStyle = {
  borderRadius: '9999px',
  border: '2px solid #D7E2EA',
  color: '#D7E2EA',
  fontFamily: "'Kanit', sans-serif",
  fontWeight: 500,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  background: 'transparent',
  cursor: 'pointer',
  whiteSpace: 'nowrap' as const,
  textDecoration: 'none',
  display: 'inline-block',
}

const hoverClass = 'px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 hover:scale-105 active:scale-95 transition-all duration-200'

export default function LiveProjectButton({ projectId }: { projectId: string }) {
  const project = PROJECTS.find(p => p.id === projectId)
  const liveUrl = project?.liveUrl

  if (liveUrl) {
    return (
      <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={hoverClass} style={buttonStyle}>
        Live Project
      </a>
    )
  }

  return (
    <Link to={`/project/${projectId}`} className={hoverClass} style={buttonStyle}>
      Live Project
    </Link>
  )
}
