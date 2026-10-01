import type { Service } from '../types';


export const services: Service[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'Web Development',
    tagline: 'Engineered for performance, speed, and business growth.',
    description: 'Responsive, functional websites and web applications designed around the business rather than generic templates.',
    capabilities: [
      'Business websites',
      'Portfolio websites',
      'E-commerce experiences',
      'Web applications',
      'Landing pages',
      'Custom interfaces'
    ],
    deliverables: [
      'Production-ready, responsive codebase',
      'Lighthouse 95+ performance scores',
      'SEO metadata & semantic markup structure',
      'Client-friendly content management readiness',
      'Cross-browser & cross-device compatibility audit'
    ],
    technologies: ['React', 'TypeScript', 'Next.js / Vite', 'Tailwind CSS', 'HTML5 / Semantic CSS']
  },
  {
    id: 'ui-ux-design',
    number: '02',
    title: 'UI / UX & Digital Design',
    tagline: 'Intuitive systems that guide attention with purpose.',
    description: 'Interfaces that make complex products feel simple, intuitive and visually consistent.',
    capabilities: [
      'UI design',
      'UX structure',
      'Wireframes',
      'Interactive prototypes',
      'Responsive layouts',
      'Design systems'
    ],
    deliverables: [
      'Interactive Figma prototypes',
      'Comprehensive component design library',
      'User journey flow diagrams',
      'Typography & color token specification',
      'High-fidelity screen layouts for all breakpoints'
    ],
    technologies: ['Figma', 'Design Systems', 'Micro-interactions', 'Information Architecture', 'Ergonomic UX']
  },
  {
    id: 'graphic-brand-design',
    number: '03',
    title: 'Graphic & Brand Design',
    tagline: 'Distinct visual identities that command authority.',
    description: 'Visual identities and digital graphics designed to give brands a consistent and recognizable presence.',
    capabilities: [
      'Brand graphics',
      'Social media visuals',
      'Promotional designs',
      'Marketing graphics',
      'Digital assets',
      'Visual systems'
    ],
    deliverables: [
      'Cohesive visual identity guidelines',
      'Digital asset kit (banners, icons, badges)',
      'Social media promotional asset templates',
      'Marketing campaign creative suite',
      'High-resolution vector artwork files'
    ],
    technologies: ['Vector Art', 'Editorial Layouts', 'Brand Typographic Systems', 'Asset Optimization']
  },
  {
    id: 'digital-product-engineering',
    number: '04',
    title: 'Digital Product Engineering',
    tagline: 'From napkin sketch to live, resilient production systems.',
    description: 'Turning an idea into a working digital product — from interface architecture through data, backend systems and deployment.',
    capabilities: [
      'Product architecture',
      'Backend integration',
      'Database systems',
      'Authentication',
      'APIs',
      'Deployment',
      'Business logic'
    ],
    deliverables: [
      'Scalable relational or document database schema',
      'Secure user authentication & session management',
      'REST & WebSocket API integrations',
      'Production deployment pipeline (CI/CD)',
      'Automated monitoring & secure environment configuration'
    ],
    technologies: ['Supabase', 'Firebase', 'PostgreSQL', 'Node.js', 'REST APIs', 'Cloudflare / Vercel']
  }
];
