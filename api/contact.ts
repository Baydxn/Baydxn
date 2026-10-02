/**
 * Optional serverless endpoint for contact-form delivery (Vercel Functions).
 *
 * The contact page only calls this when `VITE_CONTACT_API_URL` is set
 * (e.g. `/api/contact`). If you use Web3Forms or EmailJS instead, this file
 * stays dormant and costs nothing.
 *
 * Server-only variables — set these in the Vercel dashboard, WITHOUT the
 * `VITE_` prefix so they are never bundled into the browser:
 *
 *   RESEND_API_KEY      API key from https://resend.com/api-keys
 *   CONTACT_TO_EMAIL    inbox that receives briefs (e.g. cc99187197@gmail.com)
 *   CONTACT_FROM_EMAIL  verified sender. Use onboarding@resend.dev until you
 *                       verify your own domain in Resend.
 *
 * This module deliberately uses plain `fetch` and hand-rolled request/response
 * types so the project keeps zero runtime dependencies.
 */

interface MinimalRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
}

interface MinimalResponse {
  status: (code: number) => MinimalResponse;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function asText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseBody(raw: unknown): Record<string, unknown> {
  if (typeof raw === 'string') {
    try {
      const parsed: unknown = JSON.parse(raw);
      return parsed && typeof parsed === 'object'
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }
  return raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
}

function buildHtml(fields: { label: string; value: string }[]): string {
  const rows = fields
    .map(
      ({ label, value }) =>
        `<tr><td style="padding:10px 16px;border-bottom:1px solid #e4e4e7;font:600 12px/1.4 ui-monospace,monospace;color:#52525b;text-transform:uppercase;letter-spacing:.06em;white-space:nowrap;vertical-align:top">${escapeHtml(
          label
        )}</td><td style="padding:10px 16px;border-bottom:1px solid #e4e4e7;font:400 14px/1.6 -apple-system,Segoe UI,sans-serif;color:#18181b;white-space:pre-wrap">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join('');

  return `<div style="background:#f4f4f5;padding:32px 16px"><div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e4e4e7;border-radius:14px;overflow:hidden"><div style="background:#09090b;padding:22px 24px;color:#fff;font:700 16px/1.3 -apple-system,Segoe UI,sans-serif;letter-spacing:-.01em">Bayd XN — New Project Brief</div><table style="width:100%;border-collapse:collapse">${rows}</table></div></div>`;
}

export default async function handler(
  req: MinimalRequest,
  res: MinimalResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, error: 'Method not allowed.' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey || !to) {
    res.status(500).json({
      ok: false,
      error: 'Mail service is not configured.',
    });
    return;
  }

  const body = parseBody(req.body);

  const name = asText(body.name);
  const email = asText(body.email);
  const company = asText(body.company) || 'Not provided';
  const projectType = asText(body.projectType) || 'Not specified';
  const budgetRange = asText(body.budgetRange) || 'Not specified';
  const description = asText(body.description);

  if (!name || !EMAIL_PATTERN.test(email) || description.length < 20) {
    res.status(400).json({
      ok: false,
      error: 'Please provide a valid name, email address and project description.',
    });
    return;
  }

  const subject =
    asText(body._subject) || `New project brief — ${name} (${projectType})`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Bayd XN Portfolio <${from}>`,
        to: [to],
        reply_to: email,
        subject,
        html: buildHtml([
          { label: 'Name', value: name },
          { label: 'Email', value: email },
          { label: 'Company', value: company },
          { label: 'Project Type', value: projectType },
          { label: 'Budget Range', value: budgetRange },
          { label: 'Description', value: description },
        ]),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      res.status(502).json({
        ok: false,
        error: detail || `Mail provider responded with status ${response.status}.`,
      });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unexpected error while sending the brief.',
    });
  }
}
