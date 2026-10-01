import type { Project } from '../types';


export const projects: Project[] = [
  {
    id: 'geezmart',
    slug: 'geezmart',
    name: 'GEEZMART',
    category: 'E-commerce / Digital Commerce',
    shortDescription: 'A high-conversion digital commerce platform engineered with lightning-fast catalog navigation, frictionless checkout, and bespoke editorial product merchandising.',
    heroImage: '/assets/projects/geezmart-hero.svg',
    mockupType: 'ecommerce',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Stripe', 'PostgreSQL'],
    year: '2025',
    client: 'Geezmart Retail Group',
    role: 'Lead UI/UX Designer & Full-Stack Web Developer',
    problem: 'The client possessed a high-demand inventory of curated lifestyle goods, but their legacy e-commerce store was weighed down by cumbersome navigation, 4+ second page load times, and a checkout friction rate causing over 65% cart abandonment.',
    concept: 'Re-envision the shopping experience as a fluid, tactile lookbook where every product interaction feels instant, typography drives purchase confidence, and the checkout takes fewer than three deliberate taps.',
    designDirection: 'Monochrome editorial aesthetic with stark black-and-white grids, generous negative space, high-contrast typography, and micro-interactions that celebrate tactile product discovery.',
    development: 'Architected with a decoupled frontend for sub-second page transitions, optimistic cart state management, client-side search filtering, and robust webhook-driven payment processing.',
    features: [
      'Instant predictive search & multi-attribute filter system',
      'One-drawer accelerated slide-out checkout',
      'Dynamic inventory badge triggers & real-time stock indicators',
      'Adaptive image compression pipeline with blur-up placeholders',
      'Mobile-first thumb-zone navigation architecture'
    ],
    outcome: 'Delivered an ultra-responsive commerce engine that decreased page load latency to 0.7s, streamlined checkout flow, and established a scalable design system for future multi-store expansion.',
    galleryImages: [
      {
        title: 'Catalog Architecture',
        caption: 'Bespoke masonry grid designed for editorial lifestyle browsing with instant filters.'
      },
      {
        title: 'Tactile Cart Drawer',
        caption: 'Friction-free slideover cart calculating shipping dynamically with one-click payment hooks.'
      },
      {
        title: 'Responsive Mobile Experience',
        caption: 'Ergonomic mobile interface prioritizing thumb interaction and quick checkout.'
      }
    ]
  },
  {
    id: 'black-tiger',
    slug: 'black-tiger',
    name: 'BLACK TIGER',
    category: 'Creative Concept / Digital Experience',
    shortDescription: 'An immersive digital showcase and creative brand experience merging raw editorial typography, kinetic layout mechanics, and bespoke visual storytelling.',
    heroImage: '/assets/projects/black-tiger-hero.svg',
    mockupType: 'experience',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'Canvas API', 'WebGL / Shaders', 'Tailwind CSS'],
    year: '2025',
    client: 'Black Tiger Studio',
    role: 'Creative Technologist & UI Designer',
    problem: 'A forward-thinking creative studio needed a digital identity and interactive experience that stood miles apart from conventional agency templates, seeking an unforgettable presence that captivates prospective high-tier clients.',
    concept: 'A cinematic, darkroom-inspired digital journal where visitors uncover projects through deliberate cursor interactions, dynamic masking, and rhythmic soundscapes.',
    designDirection: 'Deep noir palette (#000000 to #121212) accented with stark pure whites, bespoke typography pairings, brutalist framing, and editorial grain overlays.',
    development: 'Built utilizing custom animation timelines in Framer Motion, canvas-accelerated mouse trails, smooth page-flip transitions, and responsive fluid layout algorithms.',
    features: [
      'Interactive canvas magnetic cursor system with situational labels',
      'Cinematic chapter-based project scroll presentation',
      'Variable-speed editorial typography reveals',
      'Interactive sound design with tactile audio cues',
      'Strict accessibility fallbacks for reduced-motion preferences'
    ],
    outcome: 'Crafted a standout web experience praised by creative directors for its craft, poise, and zero-compromise performance across mobile and desktop devices.',
    galleryImages: [
      {
        title: 'Editorial Hero Canvas',
        caption: 'Dynamic typography composition that responds subtly to mouse inclination.'
      },
      {
        title: 'Case Study Chapter Viewer',
        caption: 'Horizontal and vertical dual-axis reading experience inspired by luxury print magazines.'
      },
      {
        title: 'Interactive Art Direction',
        caption: 'High-contrast monochrome typography treatments with precise typographic kerning.'
      }
    ]
  },
  {
    id: 'supakick',
    slug: 'supakick',
    name: 'SUPAKICK',
    category: 'Sports Prediction Platform',
    shortDescription: 'A real-time sports prediction web application engineered for rapid data visualization, live match intelligence, social leaderboards, and user analytics.',
    heroImage: '/assets/projects/supakick-hero.svg',
    mockupType: 'platform',
    technologies: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'WebSockets', 'REST APIs'],
    year: '2025',
    client: 'Supakick Gaming',
    role: 'Product Architect & Full-Stack Developer',
    problem: 'Sports fans were frustrated by cluttered betting and prediction interfaces filled with confusing numbers, slow data feeds, and fragmented mobile experiences that made tracking match odds stressful.',
    concept: 'Transform complex match statistics into clean, high-legibility cards with intuitive voting sliders, instant community consensus gauges, and real-time point tracking.',
    designDirection: 'Sleek dark interface with high-contrast data visualization, clear typography hierarchy, status badges, and frictionless predictive controls.',
    development: 'Engineered a real-time reactive architecture using Supabase subscriptions and WebSockets for live odds changes, serverless edge functions for score calculations, and cached state engines.',
    features: [
      'Live match odds & probability gauge widgets',
      'One-tap community consensus prediction slider',
      'Dynamic real-time leaderboard with rank change indicators',
      'User prediction accuracy analytics & streak badges',
      'Robust authentication with social sign-in and encrypted session tokens'
    ],
    outcome: 'Delivered an engaging web application with low-latency data updates and an interface so straightforward that users can place predictions in under 10 seconds.',
    galleryImages: [
      {
        title: 'Match Dashboard',
        caption: 'Live scorecards with real-time probability distributions and quick-prediction toggles.'
      },
      {
        title: 'Leaderboard & Analytics',
        caption: 'Visual performance metrics detailing user win ratios, streaks, and global standings.'
      },
      {
        title: 'Mobile Match Center',
        caption: 'Condensed match card view optimized for rapid on-the-go sports prediction.'
      }
    ]
  }
];
