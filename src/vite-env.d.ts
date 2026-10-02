/// <reference types="vite/client" />

/**
 * Environment variables exposed to the browser.
 *
 * Only `VITE_`-prefixed variables are inlined into the client bundle at build
 * time — which means they are PUBLIC. That is correct and intended here:
 * Web3Forms access keys, EmailJS public keys and Formspree form IDs are all
 * designed to be embedded in client code.
 *
 * Never put a private secret (Resend/SendGrid API key, SMTP password) behind a
 * `VITE_` prefix. Server-only secrets belong in the Vercel dashboard without
 * the prefix and are read inside `api/contact.ts`.
 */
interface ImportMetaEnv {
  /** Web3Forms access key. Obtain one free at https://web3forms.com */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  /** EmailJS service ID. */
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  /** EmailJS template ID. */
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  /** EmailJS public key. */
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  /** Absolute URL of a custom mail endpoint, e.g. `/api/contact`. */
  readonly VITE_CONTACT_API_URL?: string;
  /** Inbox that receives project briefs. Falls back to siteConfig.social.email. */
  readonly VITE_CONTACT_INBOX?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
