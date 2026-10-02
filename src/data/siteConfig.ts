export const siteConfig = {
  brand: {
    name: 'Bayd XN',
    tagline: 'Code. Design. Digital Craft.',
    descriptor: 'Web Developer & Digital Craftsman',
    positioning: 'craft + code + design + engineering + visual creativity + digital product thinking.',
    techStatement: 'Modern tools. Thoughtful engineering. Purpose-built experiences.',
    summary: 'From websites and interfaces to visual systems and digital products, I turn ideas into polished experiences built for real people and real businesses.',
    philosophy: 'I combine thoughtful design with solid engineering to build digital products that work.',
  },
  social: {
    x: '@Bayd_xn',
    xUrl: 'https://x.com/Bayd_xn',
    whatsappNumber: '+234 912 514 2256',
    whatsappRaw: '2349125142256',
    whatsappPrefilledMessage: 'Hello Bayd XN 👋, I came across your portfolio and I\'d like to know more about your services.',
    get whatsappUrl() {
      return `https://wa.me/${this.whatsappRaw}?text=${encodeURIComponent(this.whatsappPrefilledMessage)}`;
    },
    email: 'cc99187197@gmail.com',
    contactInbox: 'cc99187197@gmail.com',
  },
  routes: [
    { path: '/', label: 'Home', chapter: '01', title: 'Index / Hero' },
    { path: '/about', label: 'About', chapter: '02', title: 'Philosophy & Craft' },
    { path: '/services', label: 'Services', chapter: '03', title: 'What I Build' },
    { path: '/work', label: 'Work', chapter: '04', title: 'Selected Case Studies' },
    { path: '/process', label: 'Process', chapter: '05', title: 'From Idea to Interface' },
    { path: '/solutions', label: 'Solutions', chapter: '06', title: 'Problems Solved' },
    { path: '/testimonies', label: 'Testimonies', chapter: '07', title: 'Client Words' },
    { path: '/faq', label: 'FAQ', chapter: '08', title: 'Questions Answered' },
    { path: '/contact', label: 'Contact', chapter: '09', title: 'Start a Project' },
  ],
  portraits: {
    confident: '/assets/bayd-portrait-confident.jpg',
    thoughtful: '/assets/bayd-portrait-thoughtful.jpg',
  }
};
