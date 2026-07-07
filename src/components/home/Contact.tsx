"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  // Reveal the section once it scrolls into view (works inside nested scroll containers too)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let fired = false;
    const check = () => {
      if (fired) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        fired = true;
        setTimeout(() => setShown(true), 200);
      }
    };

    // Find the nearest scrollable ancestor, fall back to window
    let scrollEl: Element | Window = window;
    let el = section.parentElement;
    while (el && el !== document.body) {
      const ov = getComputedStyle(el).overflowY;
      if (ov === "scroll" || ov === "auto") { scrollEl = el; break; }
      el = el.parentElement;
    }

    check();
    scrollEl.addEventListener("scroll", check, { passive: true });
    return () => scrollEl.removeEventListener("scroll", check);
  }, []);

  // Submit the form to /api/contact, with a 10s timeout and a 4s "sent" confirmation state
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || sent) return;
    setSending(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok) {
        setSent(true);
        setSending(false);
        setTimeout(() => {
          setSent(false);
          setForm({ name: "", email: "", phone: "", message: "" });
        }, 4000);
      } else {
        setSending(false);
      }
    } catch (err) {
      console.error("Submit error:", err);
      setSending(false);
    }
  };

  // Format phone input as (XXX) XXX-XXXX while typing
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    let formatted = digits;
    if (digits.length >= 7) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length >= 4) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else if (digits.length >= 1) {
      formatted = `(${digits}`;
    }
    setForm(f => ({ ...f, phone: formatted }));
  };

  return (
    <section ref={sectionRef} id="contact" data-snap-section aria-label="Contact J Eleven Media"
      className="flex flex-col overflow-visible bg-cocoa px-[5vw] pb-8 md:h-full md:snap-start md:overflow-hidden md:px-[6vw] md:pb-0">

      {/* Section heading */}
      <div className="flex shrink-0 items-center py-[1.2rem]">
        <h2 className="font-playfair text-[clamp(2.4rem,4vw,4.5rem)] font-normal leading-none tracking-[-0.01em] text-paper [&_em]:not-italic">
          Contact <em>Us</em>
        </h2>
      </div>

      <div className={`grid min-h-0 flex-1 grid-cols-1 gap-6 pb-4 opacity-0 transition-opacity duration-700 md:grid-cols-[1fr_1.4fr] md:gap-[4vw] md:pb-[2vh] ${shown ? "opacity-100" : ""}`}>

        {/* ── Left column: contact info + socials ── */}
        <div className="flex flex-col justify-center">

          {/* Email */}
          <div className="flex flex-col gap-[0.4rem] py-[1.4rem]">
            <span className="size-5 shrink-0 rounded-full bg-paper/40" />
            <span className="font-playfair text-[clamp(1.4rem,2vw,2.2rem)] font-normal leading-[1.1] tracking-[-0.01em] text-paper">Email</span>
            <a href="mailto:jelevenmedia@gmail.com"
              className="font-playfair text-[clamp(0.9rem,1.1vw,1.2rem)] leading-[1.5] text-paper/70 no-underline transition-colors duration-200 hover:text-paper">
              jelevenmedia@gmail.com
            </a>
          </div>

          <div className="h-px w-full bg-paper/25" />

          {/* Phone */}
          <div className="flex flex-col gap-[0.4rem] py-[1.4rem]">
            <span className="size-5 shrink-0 rounded-full bg-paper/40" />
            <span className="font-playfair text-[clamp(1.4rem,2vw,2.2rem)] font-normal leading-[1.1] tracking-[-0.01em] text-paper">Phone</span>
            <a href="tel:+18656840526"
              className="font-playfair text-[clamp(0.9rem,1.1vw,1.2rem)] leading-[1.5] text-paper/70 no-underline transition-colors duration-200 hover:text-paper">
              (865) 684-0526
            </a>
          </div>

          <div className="h-px w-full bg-paper/25" />

          {/* Socials */}
          <div className="flex flex-col gap-[0.4rem] py-[1.4rem]">
            <span className="size-5 shrink-0 rounded-full bg-paper/40" />
            <span className="font-playfair text-[clamp(1.4rem,2vw,2.2rem)] font-normal leading-[1.1] tracking-[-0.01em] text-paper">Follow Us</span>
            <div className="flex flex-col gap-2">
              <a href="https://www.facebook.com/profile.php?id=61585042963260" target="_blank" rel="noopener noreferrer"
                aria-label="J Eleven Media on Facebook"
                className="flex items-center gap-[0.6rem] font-playfair text-[clamp(0.9rem,1.1vw,1.2rem)] text-paper/70 no-underline transition-colors duration-200 hover:text-paper">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px] shrink-0">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook
              </a>
              <a href="https://www.instagram.com/jelevenmedia/" target="_blank" rel="noopener noreferrer"
                aria-label="J Eleven Media on Instagram"
                className="flex items-center gap-[0.6rem] font-playfair text-[clamp(0.9rem,1.1vw,1.2rem)] text-paper/70 no-underline transition-colors duration-200 hover:text-paper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-[18px] shrink-0">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

        </div>

        {/* ── Right column: contact form ── */}
        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit} noValidate className="my-auto flex h-full max-h-[560px] flex-col gap-4">

            {/* Name + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-[0.3rem]">
                <label htmlFor="name" className="font-playfair text-[clamp(0.78rem,0.9vw,0.95rem)] font-semibold tracking-[0.02em] text-paper">Name</label>
                <input id="name" type="text" required placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-[10px] border border-paper/25 bg-paper/[0.12] px-[0.9rem] py-[0.6rem] font-playfair text-[clamp(0.88rem,1vw,1.05rem)] text-paper outline-none transition-[border-color] duration-200 placeholder:italic placeholder:text-paper/45 focus:border-paper/60" />
              </div>
              <div className="flex flex-col gap-[0.3rem]">
                <label htmlFor="email" className="font-playfair text-[clamp(0.78rem,0.9vw,0.95rem)] font-semibold tracking-[0.02em] text-paper">Email</label>
                <input id="email" type="email" required placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-[10px] border border-paper/25 bg-paper/[0.12] px-[0.9rem] py-[0.6rem] font-playfair text-[clamp(0.88rem,1vw,1.05rem)] text-paper outline-none transition-[border-color] duration-200 placeholder:italic placeholder:text-paper/45 focus:border-paper/60" />
              </div>
            </div>

            {/* Phone (optional, auto-formatted) */}
            <div className="flex flex-col gap-[0.3rem]">
              <label htmlFor="phone" className="font-playfair text-[clamp(0.78rem,0.9vw,0.95rem)] font-semibold tracking-[0.02em] text-paper">
                Phone <span className="font-normal italic text-paper/60">(optional)</span>
              </label>
              <input id="phone" type="tel" placeholder="(865) 000-0000"
                value={form.phone}
                onChange={handlePhoneChange}
                className="w-full rounded-[10px] border border-paper/25 bg-paper/[0.12] px-[0.9rem] py-[0.6rem] font-playfair text-[clamp(0.88rem,1vw,1.05rem)] text-paper outline-none transition-[border-color] duration-200 placeholder:italic placeholder:text-paper/45 focus:border-paper/60" />
            </div>

            {/* Message */}
            <div className="flex min-h-0 flex-1 flex-col gap-[0.3rem]">
              <label htmlFor="message" className="font-playfair text-[clamp(0.78rem,0.9vw,0.95rem)] font-semibold tracking-[0.02em] text-paper">What do you need?</label>
              <textarea id="message" required placeholder="Tell us a little about your project..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="min-h-0 w-full flex-1 resize-none rounded-[10px] border border-paper/25 bg-paper/[0.12] px-[0.9rem] py-[0.6rem] font-playfair text-[clamp(0.88rem,1vw,1.05rem)] text-paper outline-none transition-[border-color] duration-200 placeholder:italic placeholder:text-paper/45 focus:border-paper/60" />
            </div>

            {/* Submit */}
            <button type="submit" disabled={sent || sending}
              className="cursor-pointer self-stretch rounded-[50px] border-none bg-paper px-8 py-3 font-playfair text-[clamp(0.9rem,1.05vw,1.1rem)] font-semibold text-cocoa transition-[opacity,letter-spacing,background-color,color] duration-300 enabled:hover:tracking-[0.02em] enabled:hover:opacity-85 disabled:cursor-default disabled:bg-transparent disabled:pl-0 disabled:font-normal disabled:italic disabled:text-paper/50 md:self-start">
              {sent ? "Message sent!" : sending ? "Sending..." : "Send message →"}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}