import { useRef, useState, useCallback } from 'react'

interface Props {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Old',
  afterLabel = 'New',
}: Props) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    updatePosition(e.clientX)
    const onMove = (e: MouseEvent) => { if (dragging.current) updatePosition(e.clientX) }
    const onUp = () => {
      dragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX)
    const onMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX)
    const onEnd = () => {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onEnd)
  }

  // Hide labels when slider crosses them
  const hideOld = position < 12
  const hideNew = position > 88

  const tagStyle: React.CSSProperties = {
    background: 'rgba(0,0,0,0.55)',
    backdropFilter: 'blur(6px)',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: 400,
    letterSpacing: '0.08em',
    padding: '4px 10px',
    borderRadius: 6,
    border: '1px solid rgba(255,255,255,0.15)',
    userSelect: 'none',
    transition: 'opacity 0.15s ease',
    pointerEvents: 'none',
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        borderRadius: 'clamp(16px, 2vw, 28px)',
        cursor: 'ew-resize',
        aspectRatio: '16/9',
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* New (after) image — full size, always underneath */}
      <img
        src={afterImage}
        alt="New"
        draggable={false}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Old (before) image — same size, clipped from the right using clip-path */}
      <img
        src={beforeImage}
        alt="Old"
        draggable={false}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      />

      {/* Divider line */}
      <div
        style={{
          position: 'absolute', top: 0, bottom: 0, width: 2,
          left: `${position}%`, transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.9)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Drag handle */}
      <div
        style={{
          position: 'absolute', top: '50%',
          left: `${position}%`,
          transform: 'translate(-50%, -50%)',
          width: 40, height: 40,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 11,
          cursor: 'ew-resize',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 6l-4 4 4 4M13 6l4 4-4 4" stroke="#333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Old label — top left */}
      <div
        style={{
          position: 'absolute', top: 12, left: 12, zIndex: 12,
          opacity: hideOld ? 0 : 1,
          ...tagStyle,
        }}
      >
        {beforeLabel}
      </div>

      {/* New label — top right */}
      <div
        style={{
          position: 'absolute', top: 12, right: 12, zIndex: 12,
          opacity: hideNew ? 0 : 1,
          ...tagStyle,
        }}
      >
        {afterLabel}
      </div>
    </div>
  )
}
