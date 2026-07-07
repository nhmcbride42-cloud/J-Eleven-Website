"use client";

import { useEffect, useRef, useState } from "react";

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
      className="fixed inset-0 z-[500] flex items-center justify-center bg-ink/55 p-6 backdrop-blur-[4px]"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="relative flex w-full max-w-[560px] flex-col gap-4 rounded-[20px] bg-cocoa p-[clamp(1.8rem,4vw,3rem)]">

        <button className="absolute right-[1.2rem] top-4 cursor-pointer border-none bg-transparent p-1 text-base leading-none text-paper/50 transition-colors duration-200 hover:text-paper" onClick={onClose} aria-label="Close">✕</button>

        {sent ? (
          <p className="px-4 py-12 text-center font-playfair text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.2] text-paper">Message sent! We&rsquo;ll be in touch soon.</p>
        ) : (
          <>
          <h2 className="font-playfair text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-[1.1] text-paper">Let's get started today.</h2>
          <p className="-mt-1 font-cormorant text-[clamp(0.95rem,1.2vw,1.1rem)] italic leading-[1.5] text-paper/60">Tell us a little about what you're needing and we'll reach out.</p>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 gap-3 min-[481px]:grid-cols-2">
              <div className="flex flex-col gap-[0.3rem]">
                <label className="font-playfair text-[0.78rem] tracking-[0.1em] text-paper/60" htmlFor="modal-name">Name</label>
                <input
                  id="modal-name" type="text" required
                  className="w-full rounded-[10px] border border-paper/20 bg-paper/10 px-[0.9rem] py-[0.65rem] font-cormorant text-base text-paper outline-none transition-[border-color] duration-200 placeholder:text-paper/30 focus:border-paper/50"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-[0.3rem]">
                <label className="font-playfair text-[0.78rem] tracking-[0.1em] text-paper/60" htmlFor="modal-email">Email</label>
                <input
                  id="modal-email" type="email" required
                  className="w-full rounded-[10px] border border-paper/20 bg-paper/10 px-[0.9rem] py-[0.65rem] font-cormorant text-base text-paper outline-none transition-[border-color] duration-200 placeholder:text-paper/30 focus:border-paper/50"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[0.3rem]">
              <label className="font-playfair text-[0.78rem] tracking-[0.1em] text-paper/60">Services</label>
              <div className="grid grid-cols-2 gap-x-4 gap-y-[0.4rem]">
                {SERVICES.map((s) => (
                  <label key={s} className="flex cursor-pointer items-center gap-2 font-cormorant text-base text-paper/80">
                    <input
                      type="checkbox"
                      className="relative size-[15px] shrink-0 cursor-pointer appearance-none rounded-[3px] border border-paper/40 bg-paper/[0.08] transition-[background-color,border-color] duration-150 after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-[0.7rem] after:font-bold after:text-paper after:content-[''] checked:border-paper/70 checked:bg-paper/25 checked:after:content-['✓']"
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
            <div className="flex flex-col gap-[0.3rem]">
              <label className="font-playfair text-[0.78rem] tracking-[0.1em] text-paper/60" htmlFor="modal-message">What do you need?</label>
              <textarea
                id="modal-message" required
                className="w-full rounded-[10px] border border-paper/20 bg-paper/10 px-[0.9rem] py-[0.65rem] font-cormorant text-base text-paper outline-none transition-[border-color] duration-200 placeholder:text-paper/30 focus:border-paper/50 min-h-[110px] resize-none"
                placeholder="Tell us a little about your project..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              />
            </div>
            <button type="submit" className="cursor-pointer self-end rounded-[30px] border-none bg-paper px-8 py-3 font-playfair text-[0.95rem] font-semibold tracking-[0.08em] text-cocoa transition-opacity duration-200 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50" disabled={sending}>
              {sending ? "Sending..." : "Send message →"}
            </button>
          </form>
          </>
        )}

      </div>
    </div>
  );
}
