import { siteConfig } from '../data/siteConfig';

/** Shape of a project brief submitted from the contact page. */
export interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budgetRange: string;
  description: string;
}

/**
 * Delivery channel, resolved from environment variables at build time.
 * `unconfigured` is a first-class state — the UI stays honest about it
 * instead of pretending a message was delivered.
 */
export type MailerProvider =
  | 'web3forms'
  | 'emailjs'
  | 'custom-api'
  | 'unconfigured';

export type SendResult = { ok: true } | { ok: false; reason: string };

const env = import.meta.env;

const WEB3FORMS_ACCESS_KEY = env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
const EMAILJS_SERVICE_ID = env.VITE_EMAILJS_SERVICE_ID?.trim();
const EMAILJS_TEMPLATE_ID = env.VITE_EMAILJS_TEMPLATE_ID?.trim();
const EMAILJS_PUBLIC_KEY = env.VITE_EMAILJS_PUBLIC_KEY?.trim();
const CUSTOM_API_URL = env.VITE_CONTACT_API_URL?.trim();

/** Inbox that receives project briefs. */
export const contactInbox: string =
  env.VITE_CONTACT_INBOX?.trim() || siteConfig.social.email;

function resolveMailerProvider(): MailerProvider {
  if (WEB3FORMS_ACCESS_KEY) return 'web3forms';
  if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
    return 'emailjs';
  }
  if (CUSTOM_API_URL) return 'custom-api';
  return 'unconfigured';
}

export const mailerProvider: MailerProvider = resolveMailerProvider();

/**
 * `false` when no delivery channel is configured, so the contact page can
 * offer the WhatsApp handoff instead of claiming an email was sent.
 */
export const isMailerConfigured: boolean = mailerProvider !== 'unconfigured';

const REQUEST_TIMEOUT_MS = 15000;

async function postJson(url: string, body: unknown): Promise<Response> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timer);
  }
}

function buildSubject(data: ContactSubmission): string {
  return `New project brief — ${data.name} (${data.projectType})`;
}


async function sendViaWeb3Forms(data: ContactSubmission): Promise<SendResult> {
  const response = await postJson('https://api.web3forms.com/submit', {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: buildSubject(data),
    from_name: 'Bayd XN Portfolio',
    name: data.name,
    // `email` doubles as the reply-to so replying goes straight to the client.
    email: data.email,
    replyto: data.email,
    company: data.company || 'Not provided',
    project_type: data.projectType,
    budget_range: data.budgetRange,
    message: data.description,
    botcheck: false,
  });

  const payload = (await response.json().catch(() => null)) as
    | { success?: boolean; message?: string; body?: { message?: string } }
    | null;

  if (!response.ok || !payload?.success) {
    return {
      ok: false,
      reason:
        payload?.body?.message ||
        payload?.message ||
        `The mail service responded with status ${response.status}.`,
    };
  }

  return { ok: true };
}

async function sendViaEmailJs(data: ContactSubmission): Promise<SendResult> {
  const response = await postJson('https://api.emailjs.com/api/v1.0/email/send', {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    template_params: {
      to_email: contactInbox,
      from_name: data.name,
      reply_to: data.email,
      subject: buildSubject(data),
      company: data.company || 'Not provided',
      project_type: data.projectType,
      budget_range: data.budgetRange,
      message: data.description,
    },
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    return {
      ok: false,
      reason: detail || `EmailJS responded with status ${response.status}.`,
    };
  }

  return { ok: true };
}


async function sendViaCustomApi(data: ContactSubmission): Promise<SendResult> {
  const endpoint = CUSTOM_API_URL as string;

  const response = await postJson(endpoint, {
    name: data.name,
    email: data.email,
    company: data.company,
    projectType: data.projectType,
    budgetRange: data.budgetRange,
    description: data.description,
    // Postmark/Formspree-compatible hints; the bundled API route ignores extras.
    _subject: buildSubject(data),
    _replyto: data.email,
    _to: contactInbox,
  });

  const payload = (await response.json().catch(() => null)) as
    | { ok?: boolean; error?: string }
    | null;

  if (!response.ok || payload?.ok === false) {
    return {
      ok: false,
      reason:
        payload?.error || `The endpoint responded with status ${response.status}.`,
    };
  }

  return { ok: true };
}

/**
 * Deliver a project brief to the configured inbox.
 *
 * Never throws — always resolves to a discriminated result so the UI can
 * render an accurate success or error state.
 */
export async function sendProjectBrief(
  data: ContactSubmission
): Promise<SendResult> {
  if (!isMailerConfigured) {
    return { ok: false, reason: 'No delivery channel is configured yet.' };
  }

  try {
    switch (mailerProvider) {
      case 'web3forms':
        return await sendViaWeb3Forms(data);
      case 'emailjs':
        return await sendViaEmailJs(data);
      case 'custom-api':
        return await sendViaCustomApi(data);
      default:
        return { ok: false, reason: 'No delivery channel is configured yet.' };
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        ok: false,
        reason:
          'The request timed out. Please check your connection and try again.',
      };
    }
    return {
      ok: false,
      reason:
        error instanceof Error
          ? error.message
          : 'Something unexpected went wrong while sending your brief.',
    };
  }
}
