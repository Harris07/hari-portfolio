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


export const PROJECTS: Project[] = [
  {
    id: 'listing-streaks',
    num: '01',
    name: 'Listing Streaks',
    category: 'Poshmark',
    tagline: 'A habit-building feature that motivates casual sellers to list weekly by turning consistency into a streak worth protecting.',
    shortDesc: 'Turning listing consistency into a streak sellers want to protect.',
    year: '2024',
    role: 'Product Designer',
    timeline: 'End to End Design',
    timelineLabel: 'Ownership',
    tools: ['Figma', 'Jira', 'Notion'],
    coverImage: '/images/p1-thumbnail.png',
    bannerImage: '/images/p1-thumbnail.png',
    col1img1: '/images/p1-thumbnail.png',
    col1img2: '/images/p1-thumbnail.png',
    col2img: '/images/p1-thumbnail.png',
    sections: [],
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
  {
    id: 'motion-design',
    num: '04',
    name: 'Motion & Animation',
    category: 'Poshmark',
    tagline: 'A curated collection of motion work across onboarding, micro-interactions, rewards, and brand moments — each designed to feel native to Poshmark\'s energy.',
    shortDesc: 'Lottie animations and motion design across Poshmark\'s product surface.',
    year: '2022–2024',
    role: 'Product Designer',
    timeline: 'End to End Design',
    timelineLabel: 'Ownership',
    tools: ['Figma', 'After Effects', 'Lottie'],
    coverImage: '/animations/welcome-banner-opt.gif',
    bannerImage: '/animations/welcome-banner-opt.gif',
    col1img1: '/animations/welcome-banner-opt.gif',
    col1img2: '/animations/app-icon-reveal-v1-opt.gif',
    col2img: '/animations/pull-to-refresh-hackathon-opt.gif',
    sections: [],
  },
]
