"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ── Right-column pillar cards — edit copy here ──
const PILLARS = [
  {
    title: "Why We Started",
    body: "We\u2019ve always been passionate about helping others, and we saw a need for affordable, high-quality web design services in our community. We created J Eleven Media to fill that gap.",
  },
  {
    title: "Our Values",
    body: "As a family-owned business, we believe relationships matter more than transactions. We operate with integrity, striving to be transparent, honest and communicative in everything we do.",
  },
  {
    title: "Our Promise to Small Businesses",
    body: "We promise to be a dedicated partner in your success, providing you with a high-quality website in a timely manner, and to treat your business goals like they are our own.",
  },
];

// Shared className for the left-column story paragraphs
const paragraph =
  "max-w-[50ch] font-playfair text-[clamp(1rem,1.3vw,1.3rem)] font-normal leading-[1.7] text-ink";

export default function OurStoryReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(0);

  // Reveal the pillar cards one-by-one (staggered) once the section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let fired = false;
    const trigger = () => {
      fired = true;
      setTimeout(() => setShown(1), 200);
      setTimeout(() => setShown(2), 800);
      setTimeout(() => setShown(3), 1400);
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

  return (
    <section ref={sectionRef} id="story-reveal" data-snap-section
      className="flex flex-col overflow-visible md:h-full md:snap-start md:overflow-hidden">

      {/* Section heading */}
      <div className="flex shrink-0 items-center px-[5vw] py-4 md:px-[6vw] md:py-[1.4rem]">
        <h2 className="font-playfair text-[clamp(2rem,8vw,3rem)] font-normal leading-none tracking-[-0.01em] text-cocoa md:text-[clamp(2.4rem,4vw,4.5rem)] [&_em]:not-italic">
          Our <em>Story</em>
        </h2>
      </div>

      <div className="flex min-h-0 flex-1 overflow-visible md:overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col md:grid md:grid-cols-3 md:items-stretch">

          {/* ── Column 1: story copy ── */}
          <div className="flex flex-col justify-center gap-3 px-[5vw] py-4 md:gap-[clamp(0.8rem,1.5vw,1.5rem)] md:border-r md:border-line-2 md:px-[6vw] md:py-[clamp(1rem,2.5vw,2.5rem)]">
            <p className={paragraph}>
              We are J Eleven Media, a husband-and-wife team based in East Tennessee. We started this business with a goal to help local small businesses thrive with beautiful websites.
            </p>
            <p className={paragraph}>
              We treat every client like family and your vision becomes our own. Together, we'll create a professional website that truly reflects your brand so you have something to be proud to share with the world.
            </p>
            <p className={paragraph}>
              All of our work is built on trust, clear communication and thoughtfulness. Because every business deserves something that feels personal.
            </p>
          </div>

          {/* ── Column 2: family photo ── */}
          <div className="flex h-[120vw] items-center justify-center overflow-hidden md:h-auto md:border-r md:border-line-2 md:p-[clamp(0.8rem,1.5vw,1.5rem)]">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
              <Image src="/family-photo.jpg" alt="The J Eleven family" width={412} height={705}
                className="absolute left-0 top-[-10%] h-[140%] w-full rounded-none object-cover object-top md:static md:h-full md:rounded-[14px] md:object-[center_50%]" />
            </div>
          </div>

          {/* ── Column 3: pillar cards (staggered reveal) ── */}
          <div className="flex flex-col overflow-visible md:overflow-hidden">
            {PILLARS.map((p, i) => {
              const revealed = shown >= i + 1;
              const revealClass = revealed
                ? "md:translate-x-0 md:opacity-100"
                : "md:translate-x-9 md:opacity-0";

              return (
                <div key={p.title}
                  className={`flex flex-1 flex-col justify-center gap-2 px-[5vw] py-4 md:gap-[clamp(0.4rem,0.8vw,0.8rem)] md:border-b md:border-line-2 md:py-[clamp(0.6rem,1vw,1rem)] md:pl-[clamp(0.8rem,1.5vw,1.5rem)] md:pr-[clamp(1rem,4vw,3rem)] md:transition-[opacity,transform] md:duration-1000 md:ease-[cubic-bezier(0.2,0.7,0.2,1)] md:last:border-b-0 ${revealClass}`}>
                  <div className="size-7 shrink-0 rounded-full bg-line" />
                  <h3 className="font-playfair text-[clamp(1.2rem,5vw,1.5rem)] font-normal leading-[1.15] text-ink md:text-[clamp(1.1rem,1.6vw,1.7rem)]">
                    {p.title}
                  </h3>
                  <p className="font-playfair text-[0.95rem] font-normal leading-[1.65] text-ink-soft md:text-[clamp(0.85rem,1vw,1.1rem)]">
                    {p.body}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}