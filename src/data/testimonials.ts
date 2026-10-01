import type { Testimonial } from '../types';


export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-01',
    clientName: 'Founder & Managing Director',
    company: 'E-commerce Brand Studio',
    role: 'Managing Partner',
    project: 'Commerce Platform Overhaul',
    quote: 'Bayd transformed our vision into an exacting digital experience. He has that rare dual intuition: the precision of an engineer combined with the aesthetic discipline of a senior designer.',
    avatarPlaceholder: 'ED',
    isPlaceholderNote: true
  },
  {
    id: 'testimonial-02',
    clientName: 'Product Director',
    company: 'Fintech & Sports Prediction Venture',
    role: 'Lead Strategist',
    project: 'Real-time Web Application',
    quote: 'Working with Bayd was refreshing. Zero fluff, rapid turnaround, and an interface that our community immediately understood without a tutorial.',
    avatarPlaceholder: 'PD',
    isPlaceholderNote: true
  },
  {
    id: 'testimonial-03',
    clientName: 'Creative Director',
    company: 'Independent Production House',
    role: 'Principal Designer',
    project: 'Interactive Brand Showcase',
    quote: 'The level of care in the typography, page transitions, and micro-interactions was exceptional. A digital craftsman in the truest sense.',
    avatarPlaceholder: 'CD',
    isPlaceholderNote: true
  },
  {
    id: 'testimonial-04',
    clientName: 'Add Your Client Name',
    company: 'Your Client Company',
    role: 'Client Role',
    project: 'Client Project Title',
    quote: 'This slot is reserved for your next verified client review. Easily replace this record inside src/data/testimonials.ts or connect your CMS.',
    avatarPlaceholder: 'CL',
    isPlaceholderNote: true
  }
];
