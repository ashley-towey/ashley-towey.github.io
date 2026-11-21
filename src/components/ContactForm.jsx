import { useState } from 'react';
import { BracketBox } from './ButtonLink';
import { site } from '../config/site';
import './ContactForm.css';

const ENDPOINT = 'https://api.web3forms.com/submit';

const MESSAGES = {
  sending: 'Sending…',
  sent: 'Thanks for getting in touch. I’ll reply soon.',
  error: 'Something went wrong. Please try again, or message me on LinkedIn.',
};

// Sends the message through Web3Forms, which emails it to site.email.
export default function ContactForm() {
  const [status, setStatus] = useState('idle');

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          access_key: site.web3formsKey,
          subject: `Portfolio enquiry from ${data.name}`,
          from_name: 'ashleytowey.com',
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="contact-form__field">
        <span className="caption-2">Name</span>
        <input type="text" name="name" autoComplete="name" required />
      </label>
      <label className="contact-form__field">
        <span className="caption-2">Email</span>
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <label className="contact-form__field">
        <span className="caption-2">Message</span>
        <textarea name="message" rows="6" required />
      </label>
      {/* Spam trap: hidden from people, bots fill it in and Web3Forms drops the message. */}
      <input type="checkbox" name="botcheck" className="visually-hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="contact-form__footer">
        <button type="submit" className="bracket-button caption-2" disabled={status === 'sending'} data-active={status === 'sent' || undefined}>
          Send<BracketBox />
        </button>
        <p className="contact-form__status caption-2" role="status" data-status={status}>
          {MESSAGES[status] ?? ''}
        </p>
      </div>
    </form>
  );
}
