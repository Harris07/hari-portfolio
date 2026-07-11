import { Link } from 'react-router-dom'

export default function ContactButton() {
  return (
    <Link
      to="/contact"
      style={{
        display: 'inline-block',
        background: '#F1FF58',
        boxShadow: '0px 4px 16px rgba(241, 255, 88, 0.35)',
        outline: '2px solid rgba(241, 255, 88, 0.3)',
        outlineOffset: '-3px',
        borderRadius: '9999px',
        border: 'none',
        cursor: 'pointer',
        color: '#1a1a1a',
        fontFamily: "'Kanit', sans-serif",
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
      }}
      className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base hover:scale-105 active:scale-95 transition-transform duration-200"
    >
      Contact Me
    </Link>
  )
}
