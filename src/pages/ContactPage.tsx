import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MessageCircle, Send, CheckCircle2, ArrowUpRight, Copy, Check } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { Reveal } from '../components/Reveal';
import { RevealText } from '../components/RevealText';
import { siteConfig } from '../data/siteConfig';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Web Development',
    budgetRange: '$1,500 - $3,500',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger elegant confetti celebration
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#a1a1aa', '#52525b'],
      });
    } catch (err) {
      // fallback if canvas not available
    }

    setSubmitted(true);
  };

  // Generate dynamic WhatsApp link including form details
  const generatedWhatsAppMessage = `Hello Bayd XN 👋,
My name is ${formData.name || 'there'} from ${formData.company || 'my venture'}.
Project Type: ${formData.projectType}
Budget Range: ${formData.budgetRange}
Project Details: ${formData.description || 'I would like to explore building a custom digital experience.'}
Email: ${formData.email || 'N/A'}`;

  const customWhatsAppUrl = `https://wa.me/${siteConfig.social.whatsappRaw}?text=${encodeURIComponent(
    formData.name ? generatedWhatsAppMessage : siteConfig.social.whatsappPrefilledMessage
  )}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedWhatsAppMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageLayout
      chapterNumber="09"
      chapterTitle="CONTACT / COLLABORATION"
      subtitle="CHAPTER 09 — TURN YOUR IDEA INTO PRODUCTION CODE"
    >
      {/* Header */}
      <section className="pb-16 border-b border-zinc-800/80">
        <div className="max-w-4xl">
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            START A CONVERSATION
          </span>
          <RevealText
            as="h1"
            lines={['HAVE AN IDEA', 'WORTH BUILDING?']}
            lineClassNames={['text-white', 'text-outline']}
            stagger={0.085}
            className="mt-4 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02]"
          />
          <Reveal delay={0.3}>
            <p className="mt-4 font-accent-italic text-2xl sm:text-3xl text-zinc-300">
              Let's turn it into something real.
            </p>
            <p className="mt-2 text-sm text-zinc-400 max-w-xl">
              Whether you need a bespoke website, a ground-up web application, or a cohesive digital brand presence, share your details below.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Grid: Form + WhatsApp Card */}
      <section className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/80 border border-zinc-700/80 shadow-2xl animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h2 className="font-display font-bold text-3xl text-white">
                Brief Received &amp; Formatted.
              </h2>
              <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>. Your project brief has been structured. To accelerate communication, you can open a direct WhatsApp conversation right now with your inquiry pre-filled.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={customWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors shadow-xl"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Directly on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-zinc-800 text-zinc-200 font-mono text-xs hover:bg-zinc-700 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Brief Copied!' : 'Copy Formatted Brief'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 text-xs font-mono text-zinc-400 hover:text-white underline underline-offset-4"
              >
                ← Edit Form Data
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                  PROJECT SPECIFICATION FORM
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  ALL FIELDS CAREFULLY REVIEWED
                </span>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Vance"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Company / Brand */}
              <div>
                <label htmlFor="company" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                  Company / Brand
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Studio Vertex / Startup Name"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors text-sm"
                />
              </div>

              {/* Project Type & Budget Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="projectType" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors text-sm"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="UI / UX & Digital Design">UI / UX &amp; Digital Design</option>
                    <option value="Graphic & Brand Design">Graphic &amp; Brand Design</option>
                    <option value="Digital Product Engineering">Digital Product Engineering</option>
                    <option value="Full-Stack / Hybrid Solution">Full-Stack / Hybrid Solution</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budgetRange" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors text-sm"
                  >
                    <option value="$1,500 - $3,500">$1,500 – $3,500</option>
                    <option value="$3,500 - $7,500">$3,500 – $7,500</option>
                    <option value="$7,500 - $15,000+">$7,500 – $15,000+</option>
                    <option value="Custom Strategic Scope">Custom Strategic Scope</option>
                  </select>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="description" className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Outline the core objective, any existing assets or timelines, and what success looks like..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors text-sm resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-white text-black font-display font-extrabold text-sm tracking-wide hover:bg-zinc-200 transition-all shadow-xl flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>START THE CONVERSATION</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Info Column: WhatsApp & Direct Contact */}
        <div className="lg:col-span-5 space-y-6">
          {/* Featured WhatsApp Card */}
          <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-700/80 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block">
                  FASTEST RESPONSE CHANNEL
                </span>
                <h3 className="font-display font-bold text-xl text-white">
                  WhatsApp Direct
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
              Skip email threads if you prefer real-time back-and-forth. Send a direct WhatsApp voice note or message with your project inquiry.
            </p>

            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 font-mono text-xs text-zinc-300 mb-6 flex items-center justify-between">
              <span>{siteConfig.social.whatsappNumber}</span>
              <span className="text-[10px] text-emerald-400 font-medium">● ACTIVE</span>
            </div>

            <a
              href={siteConfig.social.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-zinc-100 hover:bg-white text-black font-display font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all shadow-md group"
            >
              <span>CHAT ON WHATSAPP</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="mt-4 text-center">
              <span className="text-[11px] font-mono text-zinc-400">
                Pre-filled inquiry: "{siteConfig.social.whatsappPrefilledMessage}"
              </span>
            </div>
          </div>

          {/* Direct Social Links */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 text-xs font-mono text-zinc-400 space-y-3">
            <div className="text-white font-semibold uppercase tracking-wider mb-2">
              ADDITIONAL CHANNELS
            </div>
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
              <span>X (Twitter)</span>
              <a
                href={siteConfig.social.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-200 hover:text-white flex items-center gap-1"
              >
                <span>{siteConfig.social.x}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span>Response Horizon</span>
              <span className="text-zinc-200">Within 24 Hours</span>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
