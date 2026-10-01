import type { ProcessStage } from '../types';


export const processStages: ProcessStage[] = [
  {
    step: 'STAGE 01',
    number: '01',
    title: 'DISCOVER',
    summary: 'Understand the idea, business, audience and objective.',
    details: [
      'In-depth intake session to dissect the core objective',
      'Target audience research and competitive landscape analysis',
      'Feature scoping, technical constraints, and milestone roadmap',
      'Clarification of success metrics and key conversion indicators'
    ],
    durationEstimate: 'Phase 01'
  },
  {
    step: 'STAGE 02',
    number: '02',
    title: 'DEFINE',
    summary: 'Turn the idea into a clear structure and direction.',
    details: [
      'Information architecture mapping and page taxonomy',
      'User journey flowcharts and decision tree modeling',
      'Technical stack selection tailored to long-term needs',
      'Content hierarchy specifications and narrative outline'
    ],
    durationEstimate: 'Phase 02'
  },
  {
    step: 'STAGE 03',
    number: '03',
    title: 'DESIGN',
    summary: 'Create the visual language, interface and user experience.',
    details: [
      'Bespoke typographic rhythm and high-contrast color systems',
      'Wireframing core interactions and ergonomics',
      'Interactive Figma prototypes with realistic content flows',
      'Responsive design systems built for desktop, tablet, and mobile'
    ],
    durationEstimate: 'Phase 03'
  },
  {
    step: 'STAGE 04',
    number: '04',
    title: 'BUILD',
    summary: 'Translate the design into a functional digital product.',
    details: [
      'Clean, modular frontend development with modern frameworks',
      'Semantic, accessible HTML structure and optimized CSS styling',
      'Backend data integration, authentication, and secure endpoints',
      'Fluid state management and frictionless micro-interactions'
    ],
    durationEstimate: 'Phase 04'
  },
  {
    step: 'STAGE 05',
    number: '05',
    title: 'REFINE',
    summary: 'Test, improve, polish and remove unnecessary friction.',
    details: [
      'Cross-browser rendering and mobile responsiveness stress tests',
      'Lighthouse speed, accessibility, and performance tuning',
      'Elimination of confusing touchpoints or interface lag',
      'Edge-case error handling and input validation hardening'
    ],
    durationEstimate: 'Phase 05'
  },
  {
    step: 'STAGE 06',
    number: '06',
    title: 'LAUNCH',
    summary: 'Prepare the final product for real users.',
    details: [
      'Production deployment on high-availability edge networks',
      'Domain routing, SSL verification, and SEO indexing verification',
      'Analytics configuration and handoff documentation',
      'Ongoing post-launch monitoring and strategic growth support'
    ],
    durationEstimate: 'Phase 06'
  }
];
