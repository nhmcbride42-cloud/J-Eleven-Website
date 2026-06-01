"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./OurServices.module.css";

const icons = {
  "01": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="9" width="40" height="30" rx="2"/>
      <line x1="4" y1="17" x2="44" y2="17"/>
      <circle cx="9.5" cy="13" r="1.4" fill="currentColor" stroke="none"/>
      <circle cx="14.5" cy="13" r="1.4" fill="currentColor" stroke="none"/>
      <line x1="12" y1="24" x2="36" y2="24"/>
      <line x1="12" y1="29" x2="30" y2="29"/>
      <line x1="12" y1="34" x2="24" y2="34"/>
    </svg>
  ),
  "02": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M38 24 A14 14 0 1 1 24 10"/>
      <polyline points="24,4 24,10 30,10"/>
      <circle cx="24" cy="24" r="3"/>
      <line x1="24" y1="14" x2="24" y2="21"/>
      <line x1="24" y1="27" x2="24" y2="30"/>
      <line x1="30" y1="24" x2="34" y2="24"/>
    </svg>
  ),
  "03": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="18"/>
      <ellipse cx="24" cy="24" rx="7.5" ry="18"/>
      <line x1="6" y1="24" x2="42" y2="24"/>
      <path d="M7.5 15 Q24 19 40.5 15"/>
      <path d="M7.5 33 Q24 29 40.5 33"/>
    </svg>
  ),
  "04": (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="13"/>
      <line x1="29.5" y1="29.5" x2="42" y2="42"/>
      <polyline points="13,26 16,21 20,24 26,15"/>
      <polyline points="22,15 26,15 26,19"/>
    </svg>
  ),
};

const SERVICES = [
  {
    num: "01",
    label: "Website Development",
    desc: "From concept to launch, we build custom websites that captivate your audience and grow your business.",
    side: "left",
  },
  {
    num: "02",
    label: "Maintenance Plans",
    desc: "Monthly maintenance, updates, and support so you don't have to worry about your website again.",
    side: "right",
  },
  {
    num: "03",
    label: "Domain Management",
    desc: "Whether you already have a domain or need to set one up for the first time, we handle all the details.",
    side: "left",
  },
  {
    num: "04",
    label: "Advanced SEO",
    desc: "We perform in-depth keyword research and create a custom content strategy to get your website seen.",
    side: "right",
  },
];

export default function OurServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShown(1), 200);
          setTimeout(() => setShown(2), 800);
          setTimeout(() => setShown(3), 1400);
          setTimeout(() => setShown(4), 2000);
        } else {
          setShown(0);
        }
      },
      { threshold: 0.4 }
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className={styles.section} data-snap-section>

      <div className={styles.headingZone}>
        <h2 className={styles.heading}>Our <em>Services</em></h2>
      </div>

      <div className={styles.list}>
        {SERVICES.map((s, i) => (
          <>
            {/* Subtle divider between row 1 (01,02) and row 2 (03,04) */}
            {i === 2 && <div key="divider" className={styles.divider} />}

            <div
              key={s.num}
              className={[
                styles.item,
                s.side === "left" ? styles.itemLeft : styles.itemRight,
                shown >= i + 1 ? styles.itemVisible : "",
              ].join(" ")}
            >
              {s.side === "left" ? (
                <>
                  <div className={styles.iconWrap}>
                    {icons[s.num as keyof typeof icons]}
                  </div>
                  <div className={styles.textBlock}>
                    <div className={styles.titleRow}>
                      <span className={styles.title}>{s.label}</span>
                    </div>
                    <p className={styles.desc}>{s.desc}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.textBlock}>
                    <div className={styles.titleRow}>
                      <span className={styles.title}>{s.label}</span>
                    </div>
                    <p className={styles.desc}>{s.desc}</p>
                  </div>
                  <div className={styles.iconWrap}>
                    {icons[s.num as keyof typeof icons]}
                  </div>
                </>
              )}
            </div>
          </>
        ))}
      </div>


    </section>
  );
}
