import React, { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  MessageCircle,
  Send,
  CheckCircle2,
  ArrowUpRight,
  Copy,
  Check,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { Reveal } from '../components/Reveal';
import { RevealText } from '../components/RevealText';
import { siteConfig } from '../data/siteConfig';
import {
  contactInbox,
  isMailerConfigured,
  sendProjectBrief,
  type ContactSubmission,
} from '../lib/contactMailer';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const INITIAL_FORM: ContactSubmission & { botField: string } = {
  name: '',
  email: '',
  company: '',
  projectType: 'Web Development',
  budgetRange: '$1,500 - $3,500',
  description: '',
  botField: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-xl bg-zinc-950/70 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors text-sm';

/**
 * Copy text with an honest success signal.
 *
 * `navigator.clipboard` needs a secure context and a focused document, so it can
 * genuinely fail. Falls back to a hidden textarea, and reports the real outcome
 * rather than assuming the copy worked.
 */
async function writeToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy path below.
  }

  try {
    const scratch = document.createElement('textarea');
    scratch.value = text;
    scratch.setAttribute('readonly', '');
    scratch.style.position = 'fixed';
    scratch.style.top = '-1000px';
    scratch.style.opacity = '0';
    document.body.appendChild(scratch);
    scratch.select();
    const succeeded = document.execCommand('copy');
    document.body.removeChild(scratch);
    return succeeded;
  } catch {
    return false;
  }
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [briefHint, setBriefHint] = useState(false);

  const isSending = status === 'sending';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setBriefHint(false);

    // Clear a field's error as soon as the visitor starts correcting it.
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(formData.email.trim())) {
      errors.email = 'That email address doesn’t look right.';
    }

    if (formData.description.trim().length < 20) {
      errors.description = 'Please describe your project in at least 20 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const celebrate = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#a1a1aa', '#52525b'],
      });
    } catch {
      // Canvas unavailable — celebration is non-critical.
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    // Honeypot: hidden field only a bot would fill. Fails silently.
    if (formData.botField.trim()) {
      setStatus('success');
      return;
    }

    if (!validate()) {
      setStatus('idle');
      return;
    }

    // No delivery channel is configured yet. Rather than pretend an email was
    // sent (or show a scary error), format the brief and hand it to WhatsApp.
    if (!isMailerConfigured) {
      setStatus('success');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const result = await sendProjectBrief({
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      projectType: formData.projectType,
      budgetRange: formData.budgetRange,
      description: formData.description.trim(),
    });

    if (result.ok) {
      celebrate();
      setStatus('success');
      return;
    }

    setErrorMessage(result.reason);
    setStatus('error');
  };


  /**
   * The formatted brief a visitor can copy or send themselves. Carries every
   * detail they entered — name, company, email, project type and budget —
   * so nothing has to be retyped on the other side.
   */
  const formattedBrief = useMemo(() => {
    const name = formData.name.trim();
    const description = formData.description.trim();

    // Nothing meaningful entered yet.
    if (!name && !description) return '';

    return [
      'Hello Bayd XN 👋,',
      '',
      'NEW PROJECT BRIEF',
      '',
      `Name: ${name || 'Not provided'}`,
      `Company: ${formData.company.trim() || 'Not provided'}`,
      `Email: ${formData.email.trim() || 'Not provided'}`,
      `Project Type: ${formData.projectType}`,
      `Budget Range: ${formData.budgetRange}`,
      '',
      'PROJECT DETAILS',
      description || 'I would like to discuss a custom digital project.',
    ].join('\n');
  }, [formData]);

  const hasBriefContent = formattedBrief.length > 0;

  const customWhatsAppUrl = `https://wa.me/${siteConfig.social.whatsappRaw}?text=${encodeURIComponent(
    hasBriefContent ? formattedBrief : siteConfig.social.whatsappPrefilledMessage
  )}`;

  const copyToClipboard = async () => {
    if (!hasBriefContent) {
      setBriefHint(true);
      return;
    }

    const succeeded = await writeToClipboard(formattedBrief);

    setCopyState(succeeded ? 'copied' : 'failed');
    window.setTimeout(() => setCopyState('idle'), 2500);
  };

  /** Only redirect once there is a brief to carry, otherwise prompt first. */
  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hasBriefContent) {
      e.preventDefault();
      setBriefHint(true);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setFieldErrors({});
    setErrorMessage('');
    setBriefHint(false);
    setCopyState('idle');
    setStatus('idle');
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
          {status === 'success' ? (
            <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/80 border border-zinc-700/80 shadow-2xl animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h2 className="font-display font-bold text-3xl text-white">
                {isMailerConfigured ? 'Brief Delivered.' : 'Brief Ready to Send.'}
              </h2>
              <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>.{' '}
                {isMailerConfigured
                  ? 'Your project brief has been sent directly to Bayd XN and will be reviewed personally. Expect a reply within 24 hours.'
                  : 'Your brief is formatted and ready. Send it directly on WhatsApp to reach Bayd XN right now.'}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                {isMailerConfigured
                  ? 'TRANSMITTED • DELIVERY CONFIRMED'
                  : 'READY • SEND VIA WHATSAPP'}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={customWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors shadow-xl"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isMailerConfigured ? 'Also Send on WhatsApp' : 'Send on WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-zinc-800 text-zinc-200 font-mono text-xs hover:bg-zinc-700 transition-colors"
                >
                  {copyState === 'copied' ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : copyState === 'failed' ? (
                    <AlertTriangle className="w-4 h-4 text-white" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>
                    {copyState === 'copied'
                      ? 'Brief Copied!'
                      : copyState === 'failed'
                        ? 'Copy Blocked'
                        : 'Copy Formatted Brief'}
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="mt-8 text-xs font-mono text-zinc-400 hover:text-white underline underline-offset-4"
              >
                ← Edit Form Data
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                  PROJECT SPECIFICATION FORM
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  {isSending ? 'TRANSMITTING…' : 'ALL FIELDS CAREFULLY REVIEWED'}
                </span>
              </div>

              {/* Honeypot — hidden from humans and assistive tech, tempting to bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="botField">Leave this field empty</label>
                <input
                  type="text"
                  id="botField"
                  name="botField"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.botField}
                  onChange={handleChange}
                />
              </div>

              {/* Status channel for screen readers */}
              <p aria-live="polite" className="sr-only">
                {isSending
                  ? 'Sending your project brief.'
                  : status === 'error'
                    ? errorMessage
                    : ''}
              </p>

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
                    disabled={isSending}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    className={`${INPUT_CLASS} disabled:opacity-60 ${
                      fieldErrors.name ? 'border-zinc-400' : ''
                    }`}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="mt-1.5 text-[11px] font-mono text-zinc-300">
                      {fieldErrors.name}
                    </p>
                  )}
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
                    disabled={isSending}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    className={`${INPUT_CLASS} disabled:opacity-60 ${
                      fieldErrors.email ? 'border-zinc-400' : ''
                    }`}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="mt-1.5 text-[11px] font-mono text-zinc-300">
                      {fieldErrors.email}
                    </p>
                  )}
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
                  disabled={isSending}
                  className={`${INPUT_CLASS} disabled:opacity-60`}
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
                    disabled={isSending}
                    className={`${INPUT_CLASS} disabled:opacity-60`}
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
                    disabled={isSending}
                    className={`${INPUT_CLASS} disabled:opacity-60`}
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
                  disabled={isSending}
                  aria-invalid={Boolean(fieldErrors.description)}
                  aria-describedby={fieldErrors.description ? 'description-error' : undefined}
                  className={`${INPUT_CLASS} resize-none disabled:opacity-60 ${
                    fieldErrors.description ? 'border-zinc-400' : ''
                  }`}
                />
                {fieldErrors.description && (
                  <p id="description-error" className="mt-1.5 text-[11px] font-mono text-zinc-300">
                    {fieldErrors.description}
                  </p>
                )}
              </div>

              {/* Delivery failure notice */}
              {status === 'error' && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-700 flex items-start gap-3"
                >
                  <AlertTriangle className="w-4 h-4 text-white mt-0.5 shrink-0" />
                  <div className="text-xs text-zinc-300 leading-relaxed">
                    <strong className="text-white block mb-0.5">
                      Your brief could not be sent.
                    </strong>
                    {errorMessage} You can{' '}
                    <a
                      href={customWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline underline-offset-4 hover:text-zinc-300"
                    >
                      send it on WhatsApp
                    </a>{' '}
                    instead, or try again.
                  </div>
                </div>
              )}

              {/* Two ways to reach Bayd XN */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-xl bg-white text-black font-display font-extrabold text-sm tracking-wide hover:bg-zinc-200 transition-all shadow-xl flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SENDING YOUR BRIEF…</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>START THE CONVERSATION</span>
                    </>
                  )}
                </button>

                <p className="mt-3 text-[11px] font-mono text-zinc-400 text-center">
                  {isMailerConfigured
                    ? 'Option 1 — Emailed directly to Bayd XN. Replies within 24 hours.'
                    : 'Option 1 — Reviewed personally. Replies within 24 hours.'}
                </p>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5" aria-hidden="true">
                  <span className="h-px flex-1 bg-zinc-800" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    Or send it yourself
                  </span>
                  <span className="h-px flex-1 bg-zinc-800" />
                </div>

                {briefHint && (
                  <p className="mb-3 text-center text-[11px] font-mono text-zinc-300">
                    Add your name and a short brief first, then copy or send it.
                  </p>
                )}

                {/* Option 2 — copy or send the formatted brief */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="w-full py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono text-xs hover:bg-zinc-800 hover:text-white hover:border-zinc-500 transition-all flex items-center justify-center gap-2"
                  >
                    {copyState === 'copied' ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : copyState === 'failed' ? (
                      <AlertTriangle className="w-4 h-4 text-white" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span>
                      {copyState === 'copied'
                        ? 'Brief Copied!'
                        : copyState === 'failed'
                          ? 'Copy Blocked — Use WhatsApp'
                          : 'Copy Formatted Brief'}
                    </span>
                  </button>

                  <a
                    href={customWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="w-full py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono text-xs hover:bg-zinc-800 hover:text-white hover:border-zinc-500 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </a>
                </div>

                <p className="mt-3 text-[10px] font-mono text-zinc-400 text-center leading-relaxed">
                  Option 2 — Your name, company, email, project type, budget and brief
                  are carried across automatically.
                </p>
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
              <span className="text-[10px] text-zinc-100 font-medium">● ACTIVE</span>
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
            <div className="flex items-center justify-between border-b border-zinc-800/60 py-2">
              <span>Email</span>
              <a
                href={`mailto:${contactInbox}`}
                className="text-zinc-200 hover:text-white flex items-center gap-1 text-right"
              >
                <span>{contactInbox}</span>
              </a>
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
