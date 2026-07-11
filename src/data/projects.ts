export interface ProjectSection {
  type: 'text' | 'image' | 'image-grid' | 'metrics' | 'chips' | 'before-after' | 'numbered-grid' | 'card-grid'
  label?: string
  heading?: string
  body?: string
  items?: string[]
  images?: string[]
  metrics?: { value: string; label: string }[]
  cards?: { image: string; title: string; body?: string; bullets?: string[] }[]
}

export interface Project {
  id: string
  num: string
  name: string
  category: string
  tagline: string
  shortDesc: string
  year: string
  role: string
  timeline: string
  timelineLabel?: string
  tools: string[]
  coverImage: string
  bannerImage: string
  sections: ProjectSection[]
  col1img1: string
  col1img2: string
  col2img: string
  liveUrl?: string
}

const CF = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F'
const q = '&w=1280&q=85'

export const PROJECTS: Project[] = [
  {
    id: 'nextlevel-studio',
    num: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    tagline: 'Redesigning the digital presence of a creative production studio to attract premium clients and showcase work with impact.',
    shortDesc: 'A website redesign that helped a creative studio attract premium clients.',
    year: '2025',
    role: 'Product Designer',
    timeline: '6 Weeks',
    tools: ['Figma', 'Framer', 'Lottie', 'Notion'],
    coverImage: `${CF}hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png${q}`,
    bannerImage: `${CF}hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png${q}`,
    col1img1: `${CF}hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png${q}`,
    col1img2: `${CF}hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png${q}`,
    col2img: `${CF}hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png${q}`,
    sections: [
      {
        type: 'text',
        label: 'Overview',
        heading: 'A studio without a stage',
        body: 'Nextlevel Studio is a high-end creative production house specialising in brand films, motion design, and content strategy. Despite producing world-class work, their website failed to communicate that quality — a cluttered layout, slow load times, and no clear conversion path were costing them leads.',
      },
      {
        type: 'text',
        label: 'The Problem',
        heading: 'Starting with friction',
        body: 'The existing site was built on a generic template with no visual hierarchy. Potential clients couldn\'t identify services at a glance, the showreel was buried three clicks deep, and the contact flow had a 78% drop-off rate. The brand was invisible at the most critical touchpoint.',
      },
      {
        type: 'text',
        label: 'Signals from data',
        heading: 'The numbers told the story',
        items: [
          'Average session duration under 45 seconds',
          '78% drop-off on the contact/enquiry page',
          '0% mobile conversion despite 60% mobile traffic',
          'Showreel had fewer than 200 monthly views',
        ],
      },
      {
        type: 'chips',
        label: 'Design Goals',
        heading: 'The goals were clear',
        items: [
          '01 — Instant brand impact above the fold',
          '02 — Surface the showreel within one click',
          '03 — Simplify the enquiry flow to 2 steps',
          '04 — Mobile-first responsive layout',
          '05 — Establish visual identity through motion',
          '06 — Reduce page weight by 40%',
        ],
      },
      {
        type: 'image',
        label: 'Design Work',
        images: [`${CF}hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png${q}`],
      },
      {
        type: 'text',
        label: 'Solution',
        heading: 'Hero reimagined',
        body: 'The new hero section opens with a full-bleed autoplay showreel loop — immediately communicating the studio\'s craft without requiring a click. A minimal two-word tagline overlays it with a single CTA: "See our work." The fold is intentionally sparse to let the motion breathe.',
      },
      {
        type: 'image-grid',
        label: 'Screens',
        images: [
          `${CF}hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png${q}`,
          `${CF}hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png${q}`,
        ],
      },
      {
        type: 'metrics',
        label: 'Results',
        heading: 'What we saw after launch',
        metrics: [
          { value: '+340%', label: 'Increase in showreel views' },
          { value: '+210%', label: 'Enquiry form submissions' },
          { value: '-62%', label: 'Bounce rate reduction' },
          { value: '4.2s → 1.1s', label: 'Page load time improvement' },
          { value: '+180%', label: 'Mobile session duration' },
          { value: '3×', label: 'Client enquiry conversion rate' },
        ],
      },
      {
        type: 'text',
        label: 'Reflection',
        heading: 'A website that works as hard as the studio does',
        body: 'This project reinforced a belief I hold strongly — that for creative businesses, the website IS the portfolio. Every micro-decision, from font weight to hover state latency, communicates craft. When we got those details right, the work sold itself.',
      },
    ],
  },
  {
    id: 'fitzoo',
    num: '02',
    name: 'Fitzoo',
    category: 'Personal',
    tagline: 'Fitness Gamified — a mobile app that turns workouts into games, making fitness addictive through streaks, coins, and real-time challenges.',
    shortDesc: 'Fitness Gamified — A mobile app that turns workouts into games.',
    year: '2024',
    role: 'End-to-End UI/UX Designer',
    timeline: '8 Weeks',
    tools: ['Figma', 'Adobe Illustrator'],
    coverImage: '/images/fitzoo/dashboard.png',
    bannerImage: '/images/fitzoo/dashboard.png',
    col1img1: '/images/fitzoo/splash.png',
    col1img2: '/images/fitzoo/getstarted1.png',
    col2img: '/images/fitzoo/overlay.png',
    sections: [],
  },
  {
    id: 'poshmark-illustration-system',
    num: '03',
    name: 'Graphic & Illustration Guidelines',
    category: 'Poshmark',
    tagline: 'Defining a unified Graphics & Illustrations system for Poshmark — two distinct styles, clear usage rules, and scalable specs adopted across the entire product.',
    shortDesc: 'A unified illustration system adopted across Poshmark\'s entire product.',
    year: '2024',
    role: 'Product Designer',
    timeline: 'End to End Design',
    timelineLabel: 'Ownership',
    tools: ['Figma'],
    coverImage: '/images/p3-cover.png',
    bannerImage: '/images/p3-banner.png',
    col1img1: '/images/p3-col1img1.png',
    col1img2: '/images/p3-col1img2.png',
    col2img: '/images/p3-col2img.png',
    sections: [
      {
        type: 'text',
        label: 'Overview',
        heading: 'No rules, no consistency',
        body: 'Poshmark\'s product had grown to hundreds of screens — each team making independent illustration decisions. Empty states looked different across features. Onboarding graphics had no visual coherence. There was no shared language for when to use a simple icon versus a rich illustration. This project set out to fix that with a documented, scalable system.',
      },
      {
        type: 'text',
        label: 'The Problem',
        heading: 'Two different jobs, one broken system',
        body: 'Illustrations in a product serve two fundamentally different purposes — communicating a clear, distraction-free message (like an empty state), or creating emotional engagement (like onboarding). Poshmark was mixing these without distinction, resulting in overly complex empty states and underwhelming feature introductions. The system needed to separate these two modes and define rules for each.',
      },
      {
        type: 'before-after',
        label: 'The Shift',
        images: ['/images/p3-shift-old.png', '/images/p3-shift-new.png'],
      },
      {
        type: 'text',
        label: 'The Two Styles',
        heading: 'Single-Tone vs Multi-Tone',
        items: [
          'Single-Tone Graphic — Designed for non-engaging or informational screens such as empty states, error messages, no-results, and completion states. Prioritises clarity and quick understanding.',
          'Multi-Tone Graphic — Used for screens that require a more expressive, engaging, storytelling-driven approach: onboarding, feature introductions, entry screens like Monetisation and Posh Show.',
        ],
      },
      {
        type: 'numbered-grid',
        label: 'Design Goals',
        heading: 'What the system needed to solve',
        items: [
          '01 — Define clear usage rules for each graphic style',
          '02 — Standardise artboard sizes and padding specs',
          '03 — Establish stroke, fill and colour guidelines',
          '04 — Document Do\'s and Don\'ts for each style',
          '05 — Cover both icon-only and real-image compositions',
          '06 — Make it adoptable by every product team',
        ],
      },
      {
        type: 'card-grid',
        label: 'Single-Tone Guide',
        cards: [
          {
            image: '/images/p3-st-card1.png',
            title: 'Icon Stroke',
            bullets: ['Color: Black (#2A2A2A)', '2px stroke width', 'Rounded start & end points'],
          },
          {
            image: '/images/p3-st-card2.png',
            title: 'Fill State',
            bullets: ['Fill color: Black (#2A2A2A)', 'Opacity: 15%', 'Creates depth without added colour'],
          },
          {
            image: '/images/p3-st-card3.png',
            title: 'Disconnected Points',
            bullets: ['Maximum: 2 points per icon', 'Placed at object intersections only'],
          },
        ],
      },
      {
        type: 'text',
        label: 'Single-Tone System',
        heading: 'Three parts, one consistent language',
        body: 'Single-Tone graphics are built from three defined parts: Part 1 is the Icon Stroke — Black (#2A2A2A), 2px size, rounded ends on both start and end points. Part 2 is the Fill State — same Black at 15% opacity, applied to create depth without introducing colour. Part 3 is Disconnected Points — a maximum of 2 disconnected shapes per icon, placed only at object intersections. Artboard size is fixed at 48×48px with a minimum 2px padding on all sides.',
      },
      {
        type: 'image-grid',
        label: 'Single-Tone Examples',
        images: [
          '/images/p3-examples-text.png',
          '/images/p3-examples-cta.png',
        ],
      },
      {
        type: 'image',
        label: 'Multi-Tone Guide',
        images: ['/images/p3-multitone-guide.png'],
      },
      {
        type: 'text',
        label: 'Multi-Tone System',
        heading: 'Background shapes + foreground illustration',
        body: 'Multi-Tone graphics have two layers: a background of amorphic, undefined shapes in light tones (White at varying opacities for dark backgrounds, warm neutral for light), and a foreground illustration built with a fixed colour palette — #7F0353 (deep magenta), #B7452A (terracotta), #AB82DB (lavender), #F9825C (coral), #094074 (navy), #43C7CF (teal). Three artboard sizes cover all use cases: Small (100×100px, no padding), Medium (150×150px, 4px), Large (350×350px, 8px).',
      },
      {
        type: 'image-grid',
        label: 'Multi-Tone Examples',
        images: [
          '/images/p3-examples-screens.png',
          '/images/p3-real-images.png',
        ],
      },
      {
        type: 'image',
        label: 'Backgrounds',
        images: ['/images/p3-backgrounds.png'],
      },
      {
        type: 'text',
        label: 'Do\'s & Don\'ts',
        heading: 'Rules that protect the system',
        items: [
          'All elements in a Single-Tone icon must share the same 2px stroke — no mixed thicknesses',
          'Use the 80:20 fill ratio — highlight only one element per icon at 15% opacity',
          'For Multi-Tone, use only undefined/amorphic background shapes — avoid circles, squares, or geometric forms',
          'For foreground illustration, fill one part of a single object and stroke the rest — never fill the whole object',
          'Use only #FFFFFF for highlight strokes on filled objects in Multi-Tone',
          'Always ensure empty state illustrations feel encouraging, not disappointing',
        ],
      },
      {
        type: 'metrics',
        label: 'Impact',
        heading: 'Adoption across Poshmark\'s product',
        metrics: [
          { value: '2', label: 'Unified illustration styles defined' },
          { value: '21', label: 'Specification slides documented' },
          { value: '3', label: 'Artboard size variants standardised' },
          { value: '6', label: 'Brand fill colours in the palette' },
          { value: '100%', label: 'Product team adoption at launch' },
          { value: 'Dec 2024', label: 'Shipped and live in product' },
        ],
      },
      {
        type: 'text',
        label: 'Reflection',
        heading: 'Systems thinking starts with naming things',
        body: 'The hardest part of this project wasn\'t the visual decisions — it was naming the distinction. Once "Single-Tone" and "Multi-Tone" existed as clear categories with defined purposes, every other decision became straightforward. When you give teams the right vocabulary, they stop guessing and start building.',
      },
    ],
  },
]
