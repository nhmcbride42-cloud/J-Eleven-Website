"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ── Service icons (hand-drawn line style, keyed by service number) ──
const icons = {
  "01": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="9" width="40" height="30" rx="2" />
      <line x1="4" y1="17" x2="44" y2="17" />
      <circle cx="9.5" cy="13" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13" r="1.4" fill="currentColor" stroke="none" />
      <line x1="12" y1="24" x2="36" y2="24" />
      <line x1="12" y1="29" x2="30" y2="29" />
      <line x1="12" y1="34" x2="24" y2="34" />
    </svg>
  ),
  "02": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M38 24 A14 14 0 1 1 24 10" />
      <polyline points="24,4 24,10 30,10" />
      <circle cx="24" cy="24" r="3" />
      <line x1="24" y1="14" x2="24" y2="21" />
      <line x1="24" y1="27" x2="24" y2="30" />
      <line x1="30" y1="24" x2="34" y2="24" />
    </svg>
  ),
  "03": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="18" />
      <ellipse cx="24" cy="24" rx="7.5" ry="18" />
      <line x1="6" y1="24" x2="42" y2="24" />
      <path d="M7.5 15 Q24 19 40.5 15" />
      <path d="M7.5 33 Q24 29 40.5 33" />
    </svg>
  ),
  "04": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="13" />
      <line x1="29.5" y1="29.5" x2="42" y2="42" />
      <polyline points="13,26 16,21 20,24 26,15" />
      <polyline points="22,15 26,15 26,19" />
    </svg>
  ),
  "05": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="40" x2="8" y2="10" />
      <line x1="8" y1="40" x2="42" y2="40" />
      <polyline points="10,36 18,28 26,30 36,18 42,12" />
      <circle cx="10" cy="36" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="18" cy="28" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="26" cy="30" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="36" cy="18" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="42" cy="12" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  ),
};

// ── Service content — edit copy/links here ──
const SERVICES = [
  { num: "01", label: "Web Development",    desc: "From concept, we build beautiful, mobile-ready websites that help local businesses stand out. Sites starting at $1,000", href: "/services/web-development" },
  { num: "02", label: "Maintenance Plans",  desc: "We offer monthly maintenance, content updates, security monitoring, and more to ensure your website stays updated", href: "/services/maintenance" },
  { num: "03", label: "Website Hosting",    desc: "All website hosting and domain management is handled by us, so there's one less thing for you to worry about", href: "/services/hosting" },
  { num: "04", label: "Advanced SEO",       desc: "In-depth research done into your brand and niche so we can optimize your website to attract the right customers", href: "/services/seo" },
  { num: "05", label: "Social Media Growth", desc: "We provide you with a social media toolkit containing strategies, content creation, and scheduling so you can hit the ground running", href: "/services/social-media" },
];

// ── Shared classNames for the zig-zag list items (desktop alternates left/right) ──
const ITEM_BASE =
  "pointer-events-auto flex w-[90%] flex-row items-start gap-3.5 self-center rounded-[30px] bg-white py-[clamp(0.45rem,0.65vw,0.75rem)] pl-[clamp(0.45rem,0.6vw,0.7rem)] pr-[clamp(0.8rem,1.2vw,1.4rem)] no-underline active:opacity-75 md:pointer-events-none md:w-[30%] md:rounded-[55px] md:transition-[opacity,transform] md:duration-[900ms] md:ease-[cubic-bezier(0.2,0.7,0.2,1)]";
const ITEM_LEFT = "md:ml-[20%] md:self-start";
const ITEM_RIGHT = "md:mr-[20%] md:flex-row-reverse md:self-end md:pl-[clamp(0.8rem,1.2vw,1.4rem)] md:pr-[clamp(0.45rem,0.6vw,0.7rem)]";

export default function OurServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(0);

  // Reveal items one-by-one (staggered) once the section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let fired = false;
    const trigger = () => {
      fired = true;
      setTimeout(() => setShown(1), 200);
      setTimeout(() => setShown(2), 600);
      setTimeout(() => setShown(3), 1000);
      setTimeout(() => setShown(4), 1400);
      setTimeout(() => setShown(5), 1800);
      setTimeout(() => setShown(6), 2200);
    };

    const check = () => {
      if (fired) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) trigger();
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

  // Structured data for the services offer catalog (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "J Eleven Media",
    "description": "Web design studio serving Lenoir City, Knoxville, Loudon, and East Tennessee.",
    "url": "https://www.jelevenmedia.com",
    "areaServed": [
      { "@type": "City", "name": "Lenoir City", "addressRegion": "TN" },
      { "@type": "City", "name": "Loudon", "addressRegion": "TN" },
      { "@type": "City", "name": "Knoxville", "addressRegion": "TN" },
      { "@type": "State", "name": "East Tennessee" },
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Design Services",
      "itemListElement": SERVICES.map((s) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.label,
          "description": s.desc,
        },
      })),
    },
  };

  return (
    <section ref={sectionRef} id="services" data-snap-section
      aria-label="Our web design services for East Tennessee small businesses"
      className="flex flex-col overflow-visible px-[5vw] md:h-full md:snap-start md:overflow-hidden md:px-[6vw]">

      {/* SEO structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Section heading */}
      <div className="flex shrink-0 items-center py-[1.2rem]">
        <h2 className="font-cormorant text-[clamp(2rem,8vw,3rem)] font-normal leading-none tracking-[-0.01em] text-cocoa md:text-[clamp(2.4rem,4vw,4.5rem)] [&_em]:not-italic">
          Our <em>Services</em>
        </h2>
      </div>

      {/* Zig-zag service list */}
      <div className="flex min-h-0 flex-1 flex-col justify-start gap-[0.6rem] py-4 md:justify-center md:gap-[clamp(0.15rem,0.25vw,0.3rem)] md:py-0">
        {SERVICES.map((s, i) => {
          const isRight = i % 2 === 1;
          const revealed = shown >= i + 1;
          const revealClass = revealed
            ? "md:translate-x-0 md:opacity-100"
            : isRight
              ? "md:translate-x-[60px] md:opacity-0"
              : "md:-translate-x-[60px] md:opacity-0";

          return (
            <Link key={s.num} href={s.href}
              className={[ITEM_BASE, isRight ? ITEM_RIGHT : ITEM_LEFT, revealClass].join(" ")}>

              <div aria-hidden="true"
                className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-clay/10 p-[9px] text-clay md:size-[clamp(44px,5vw,64px)] md:p-3">
                {icons[s.num as keyof typeof icons]}
              </div>

              <div className="flex flex-col gap-[3px]">
                <h3 className="font-playfair text-[clamp(1.2rem,5vw,1.6rem)] font-medium leading-[1.05] tracking-[-0.01em] text-ink md:text-[clamp(1.2rem,1.9vw,2.2rem)]">
                  {s.label}
                </h3>
                {s.desc && (
                  <p className="font-playfair text-[0.9rem] font-normal leading-[1.5] text-ink-faint md:max-w-[40ch] md:text-[clamp(0.65rem,0.75vw,0.8rem)]">
                    {s.desc}
                  </p>
                )}
              </div>

            </Link>
          );
        })}
      </div>

      {/* CTA — scrolls down to #contact */}
      <div className="flex shrink-0 items-center justify-center gap-6 pb-[1.2rem] pt-4 md:gap-10 md:pb-[1.6rem] md:pt-[1.2rem]">
        <button type="button" aria-label="Contact J Eleven Media to discuss your website project"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className={`cursor-pointer border-none bg-transparent p-0 font-cormorant text-[clamp(1rem,1.3vw,1.5rem)] font-semibold text-clay transition-[opacity,transform,letter-spacing] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:tracking-[0.02em] ${shown >= 6 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
          Get in touch →
        </button>
      </div>

    </section>
  );
}