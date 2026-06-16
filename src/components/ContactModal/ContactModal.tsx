"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ContactModal.module.css";

type Props = {
  onClose: () => void;
};

const SERVICES = ["Web Design", "Maintenance", "Hosting", "SEO", "Social Media"];

export default function ContactModal({ onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || sent) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services: selectedServices }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(onClose, 2500);
      }
    } catch {
      // silent
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      ref={backdropRef}
      className={styles.backdrop}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className={styles.modal}>

        <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>

        {sent ? (
          <p className={styles.success}>Message sent! We&rsquo;ll be in touch soon.</p>
        ) : (
          <>
          <h2 className={styles.heading}>Let's get started today.</h2>
          <p className={styles.sub}>Tell us a little about what you're needing and we'll reach out.</p>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="modal-name">Name</label>
                <input
                  id="modal-name" type="text" required
                  className={styles.input}
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="modal-email">Email</label>
                <input
                  id="modal-email" type="email" required
                  className={styles.input}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Services</label>
              <div className={styles.checkboxes}>
                {SERVICES.map((s) => (
                  <label key={s} className={styles.checkLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedServices.includes(s)}
                      onChange={() =>
                        setSelectedServices((prev) =>
                          prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
                        )
                      }
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="modal-message">What do you need?</label>
              <textarea
                id="modal-message" required
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Tell us a little about your project..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              />
            </div>
            <button type="submit" className={styles.submit} disabled={sending}>
              {sending ? "Sending..." : "Send message →"}
            </button>
          </form>
          </>
        )}

      </div>
    </div>
  );
}
