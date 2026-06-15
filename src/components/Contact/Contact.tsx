"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

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

  return (
    <section ref={sectionRef} id="contact" className={styles.section} data-snap-section
      aria-label="Contact J Eleven Media">

      <div className={styles.headingZone}>
        <h2 className={styles.heading}>Contact <em>Us</em></h2>
      </div>

      <div className={[styles.body, shown ? styles.bodyVisible : ""].join(" ")}>

        {/* ── Left: info ── */}
        <div className={styles.left}>

          <div className={styles.infoBlock}>
            <span className={styles.dot} />
            <span className={styles.infoLabel}>Email</span>
            <a href="mailto:jelevenmedia@gmail.com" className={styles.infoValue}>
              jelevenmedia@gmail.com
            </a>
          </div>

          <div className={styles.divider} />

          <div className={styles.infoBlock}>
            <span className={styles.dot} />
            <span className={styles.infoLabel}>Phone</span>
            <a href="tel:+18656840526" className={styles.infoValue}>
              (865) 684-0526
            </a>
          </div>

          <div className={styles.divider} />

          <div className={styles.infoBlock}>
            <span className={styles.dot} />
            <span className={styles.infoLabel}>Follow Us</span>
            <div className={styles.socials}>
              <a
                href="https://www.facebook.com/profile.php?id=61585042963260"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="J Eleven Media on Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </a>
              <a
                href="https://www.instagram.com/jelevenmedia/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="J Eleven Media on Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>

        </div>

        {/* ── Right: form ── */}
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Name</label>
                <input
                  id="name" type="text" required
                  className={styles.input}
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                  id="email" type="email" required
                  className={styles.input}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="phone">Phone <span className={styles.optional}>(optional)</span></label>
              <input
                id="phone" type="tel"
                className={styles.input}
                placeholder="(865) 000-0000"
                value={form.phone}
                onChange={e => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  let formatted = digits;
                  if (digits.length >= 7) {
                    formatted = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
                  } else if (digits.length >= 4) {
                    formatted = `(${digits.slice(0,3)}) ${digits.slice(3)}`;
                  } else if (digits.length >= 1) {
                    formatted = `(${digits}`;
                  }
                  setForm(f => ({ ...f, phone: formatted }));
                }}
              />
            </div>
            <div className={[styles.field, styles.fieldGrow].join(" ")}>
              <label className={styles.label} htmlFor="message">What do you need?</label>
              <textarea
                id="message" required
                className={[styles.input, styles.textarea].join(" ")}
                placeholder="Tell us a little about your project..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              />
            </div>
            <button type="submit" className={styles.submit} disabled={sent || sending}>
              {sent ? "Message sent!" : sending ? "Sending..." : "Send message →"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
