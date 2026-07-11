import { useEffect, useRef, useState } from 'react'

const ROW1 = [
  { src: 'https://mir-s3-cdn-cf.behance.net/projects/404/08fda898355611.Y3JvcCwxMjcwLDk5NCw3Miww.jpg', alt: 'Fitness Tracker' },
  { src: 'https://mir-s3-cdn-cf.behance.net/projects/404/0605a378370143.Y3JvcCwxMzM5LDEwNDgsMjksMA.png', alt: 'Data Visualisation' },
  { src: 'https://mir-s3-cdn-cf.behance.net/projects/404/eeb59178040995.Y3JvcCwxNDAwLDEwOTUsMCwxNw.png', alt: 'Survey UI/UX' },
  { src: 'https://mir-s3-cdn-cf.behance.net/projects/404/bb32a977669833.Y3JvcCwxNDAwLDEwOTUsMCwzMQ.png', alt: 'Landing Page UI' },
  { src: 'https://mir-s3-cdn-cf.behance.net/projects/404/b3ac8177669613.Y3JvcCwxMTI1LDg4MCwyNyww.png', alt: 'Content Analytics UI/UX' },
  { src: 'https://mir-s3-cdn-cf.behance.net/projects/404/29809b77669417.Y3JvcCwxMzY2LDEwNjgsMTYsNDc.png', alt: 'Payment Gateway UI/UX' },
]

const ROW2 = [
  { src: 'https://mir-s3-cdn-cf.behance.net/projects/404/aca15577669271.Y3JvcCwxMTI1LDg4MCwxMzYsMA.png', alt: 'Sales and Marketing CRM' },
  { src: 'https://mir-s3-cdn-cf.behance.net/projects/404/e510e377669057.Y3JvcCwxMjEyLDk0OCw5Myww.png', alt: 'Movie Booking UI/UX' },
  { src: 'https://mir-s3-cdn-cf.behance.net/projects/404/ca15bd77668559.Y3JvcCwxNDAwLDEwOTUsMCw1MQ.png', alt: 'Tour Assistant UI/UX' },
  { src: 'https://mir-s3-cdn-cf.behance.net/projects/404/dce39b77668335.Y3JvcCwxMTI1LDg4MCwxMzYsMA.png', alt: 'Landing Page I' },
  { src: 'https://mir-s3-cdn-cf.behance.net/projects/404/f50a4677668099.Y3JvcCwxNDAwLDEwOTUsMCwzNA.png', alt: 'Bus Tracking UI/UX' },
  { src: 'https://mir-s3-cdn-cf.behance.net/projects/404/61ae7c77667881.Y3JvcCwxMTI1LDg4MCwyMzYsMA.png', alt: 'Management UI/UX' },
]

// Triple each row for seamless looping
const TRIPLED1 = [...ROW1, ...ROW1, ...ROW1]
const TRIPLED2 = [...ROW2, ...ROW2, ...ROW2]

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      const scrollOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(scrollOffset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-[110px] overflow-hidden flex flex-col gap-[22px]"
      style={{ backgroundColor: '#0D0E11' }}
    >
      {/* Row 1 — scrolls RIGHT */}
      <div
        className="flex gap-[22px]"
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: 'transform',
        }}
      >
        {TRIPLED1.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="rounded-2xl object-cover flex-shrink-0"
            style={{ width: 410, height: 260 }}
          />
        ))}
      </div>

      {/* Row 2 — scrolls LEFT (opposite direction) */}
      <div
        className="flex gap-[22px]"
        style={{
          transform: `translateX(${-offset + 200}px)`,
          willChange: 'transform',
        }}
      >
        {TRIPLED2.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="rounded-2xl object-cover flex-shrink-0"
            style={{ width: 410, height: 260 }}
          />
        ))}
      </div>
    </section>
  )
}
