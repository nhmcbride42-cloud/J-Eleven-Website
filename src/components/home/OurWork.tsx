"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ── Case study copy — edit here ──
const NEEDED = [
  "Outdated website",
  "Not enough features to support the business",
  "No integrated listings",
  "Difficult to update and maintain",
  "No personal touch or integrated reviews",
];

const DELIVERED = [
  "Fresh, modern design reflecting the client",
  "Features added to support the business",
  "Manual listings integration for ease of use",
  "Admin page created for easy updates",
  "Personal bio and integrated reviews",
];

export default function OurWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(0);

  // Reveal the card when it scrolls into view, reset if it scrolls back out
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShown(1), 200);
          setTimeout(() => setShown(2), 1200);
        } else {
          setShown(0);
        }
      },
      { threshold: 0.3 }
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  // Entrance animation runs on desktop only (md+); mobile is always visible.
  const s = (n: number) =>
    shown >= n ? "md:translate-y-0 md:opacity-100" : "md:translate-y-7 md:opacity-0";

  return (
    <section ref={sectionRef} id="work" data-snap-section
      className="flex flex-col overflow-visible md:h-full md:snap-start md:overflow-hidden">

      {/* Section heading */}
      <div className="flex shrink-0 items-center px-[5vw] py-4 md:px-[6vw] md:py-[1.2rem]">
        <h2 className="font-cormorant text-[clamp(2rem,8vw,3rem)] font-normal leading-none tracking-[-0.01em] text-cocoa md:text-[clamp(2.4rem,4vw,4.5rem)] [&_em]:not-italic">
          Our <em>Work</em>
        </h2>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 justify-items-center gap-4 overflow-y-auto px-[5vw] pb-[2vh] md:gap-[1.4vw] md:overflow-visible md:px-[12vw] md:pb-[2.5vh]">

        {/* ── Case study card: Misty Tidwell ── */}
        <div className={`flex flex-col overflow-hidden rounded-[14px] bg-white md:rounded-[20px] md:transition-[opacity,transform] md:duration-[1800ms] md:ease-[cubic-bezier(0.2,0.7,0.2,1)] ${s(1)}`}>

          {/* Client name */}
          <div className="flex shrink-0 flex-col gap-[3px] border-b border-line px-[1.6rem] pb-[0.8rem] pt-[1.1rem]">
            <span className="font-playfair text-[clamp(1.4rem,1.8vw,2rem)] font-normal leading-[1.1] text-ink [&_em]:font-light [&_em]:italic [&_em]:text-ink-faint">
              Misty Tidwell, <em>Real Estate Agent</em>
            </span>
          </div>

          {/* Problem / Delivered columns */}
          <div className="flex shrink-0 flex-col border-b border-line md:flex-row">
            <div className="flex flex-1 flex-col gap-2 px-[1.2rem] py-[0.8rem]">
              <span className="font-playfair text-base font-bold tracking-[0.02em] text-ink">The Problem</span>
              <ul className="flex list-none flex-col gap-[0.35rem]">
                {NEEDED.map((item) => (
                  <li key={item} className="flex items-center gap-[7px] font-playfair text-[clamp(0.85rem,0.95vw,1rem)] leading-[1.3] text-[#3d3530]">
                    <span className="size-[5px] shrink-0 rounded-full bg-clay" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-px w-full shrink-0 bg-line md:mx-0 md:my-[0.6rem] md:h-auto md:w-px" />
            <div className="flex flex-1 flex-col gap-2 bg-clay/[0.04] px-[1.2rem] py-[0.8rem]">
              <span className="font-playfair text-base font-bold tracking-[0.02em] text-clay">What We Delivered</span>
              <ul className="flex list-none flex-col gap-[0.35rem]">
                {DELIVERED.map((item) => (
                  <li key={item} className="flex items-center gap-[7px] font-playfair text-[clamp(0.85rem,0.95vw,1rem)] font-medium leading-[1.3] text-ink">
                    <span className="shrink-0 text-[0.85rem] font-bold leading-none text-clay">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Device mockups: phone (mobile screenshot) + browser (desktop screenshot) */}
          <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden bg-[linear-gradient(160deg,#f5f1ec_0%,#ede7df_100%)] md:grid-cols-[0.42fr_1fr]">

            <div className="flex h-[220px] items-center justify-center border-b border-line p-4 md:h-auto md:border-b-0 md:border-r">
              <div className="flex h-[180px] max-h-[180px] flex-col items-center md:h-[95%] md:max-h-[300px]">
                <div className="flex aspect-[9/19] h-full w-auto flex-col items-center gap-[5px] rounded-[18px] bg-[#1a1714] px-[5px] pb-2.5 pt-2 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                  <div className="h-1.5 w-[32%] shrink-0 rounded bg-[#0a0908]" />
                  <div className="min-h-0 w-full flex-1 overflow-hidden rounded-[10px] bg-[#111]">
                    <div className="relative flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#ddd6ce_0%,#ccc4ba_100%)]">
                      <Image src="/mistymobile.jpg" alt="Misty Tidwell mobile version" fill unoptimized
                        style={{ objectFit: "fill" }} />
                    </div>
                  </div>
                  <div className="h-[3px] w-[28%] shrink-0 rounded-sm bg-white/20" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center p-4">
              <div className="flex w-[95%] max-w-[280px] flex-col items-center md:max-w-[540px]">
                <div className="w-full rounded-lg bg-[#232120] px-1.5 pb-[5px] pt-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                  <div className="aspect-video overflow-hidden rounded bg-[#111]">
                    <div className="relative flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#ddd6ce_0%,#ccc4ba_100%)]">
                      <Image src="/tidwellexample.png" alt="Misty Tidwell website desktop" fill unoptimized
                        style={{ objectFit: "fill", objectPosition: "top" }} />
                    </div>
                  </div>
                </div>
                <div className="h-3.5 w-[10%] bg-[#2a2623]" />
                <div className="h-1.5 w-[32%] rounded-b-md bg-[#2a2623]" />
              </div>
            </div>

          </div>

          {/* Client feedback / testimonial */}
          <div className="flex shrink-0 flex-col gap-1 border-t border-line px-[1.6rem] pb-[0.7rem] pt-[0.6rem]">
            <div className="flex items-center justify-between">
              <span className="font-playfair text-[0.85rem] font-bold tracking-[0.04em] text-clay">Client Feedback</span>
              <div className="text-[0.82rem] tracking-[2px] text-[#c9a84c]">★★★★★</div>
            </div>
            <div className="flex items-start gap-1">
              <span className="mt-0.5 shrink-0 font-playfair text-[2.4rem] leading-[0.8] text-clay opacity-40">&ldquo;</span>
              <p className="font-playfair text-[clamp(0.82rem,0.95vw,0.98rem)] italic leading-[1.6] text-[#3d3530]">
                I couldn&apos;t be happier with my new website! J Eleven Media delivered exactly what I was looking for and created a website that truly represents me, my business, and my brand.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-playfair text-[0.9rem] font-semibold tracking-[0.02em] text-ink-soft">— Misty Tidwell</span>
              <a href="https://mistytidwell.com" target="_blank" rel="noopener noreferrer"
                className="font-playfair text-[0.9rem] font-semibold tracking-[0.02em] text-clay no-underline transition-[letter-spacing] duration-200 hover:tracking-[0.06em]">
                View Work →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}