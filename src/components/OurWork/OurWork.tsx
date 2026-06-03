"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./OurWork.module.css";

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

  const s = (n: number) => shown >= n ? styles.visible : "";

  return (
    <section ref={sectionRef} id="work" className={styles.section} data-snap-section>

      <div className={styles.headingZone}>
        <h2 className={styles.heading}>Our <em>Work</em></h2>
      </div>

      <div className={styles.layout}>

        {/* ── Left: info card ── */}
        <div className={`${styles.infoCard} ${s(1)}`}>

          <div className={styles.infoTop}>
            <span className={styles.clientName}>Misty Tidwell, <em>Real Estate Agent</em></span>
          </div>

          <div className={styles.pillars}>
            <div className={styles.pillar}>
              <span className={styles.pillarLabel}>The Problem</span>
              <ul className={styles.pillarList}>
                {NEEDED.map((item) => (
                  <li key={item} className={styles.pillarItem}>
                    <span className={styles.pillarDot} />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.pillarDivider} />
            <div className={`${styles.pillar} ${styles.pillarSolution}`}>
              <span className={`${styles.pillarLabel} ${styles.pillarLabelSolution}`}>What We Delivered</span>
              <ul className={styles.pillarList}>
                {DELIVERED.map((item) => (
                  <li key={item} className={`${styles.pillarItem} ${styles.pillarItemSolution}`}>
                    <span className={styles.checkmark}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.showcase}>
            <div className={styles.showcaseHalf}>
              <div className={styles.phone}>
                <div className={styles.phoneBody}>
                  <div className={styles.phoneIsland} />
                  <div className={styles.phoneScreen}>
                    <div className={styles.imgPlaceholder}>
                      <Image
                        src="/mistymobile.jpg"
                        alt="Misty Tidwell mobile version"
                        width={71}
                        height={135}
                      />
                    </div>
                  </div>
                  <div className={styles.phoneBar} />
                </div>
              </div>
            </div>
            <div className={styles.showcaseHalf}>
              <div className={styles.monitor}>
                <div className={styles.monitorBody}>
                  <div className={styles.monitorScreen}>
                    <div className={styles.imgPlaceholder}>
                      <Image
                        src="/tidwellexample.png"
                        alt="Misty Tidwell website desktop"
                        width={279}
                        height={151}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.monitorNeck} />
                <div className={styles.monitorFoot} />
              </div>
            </div>
          </div>

          <div className={styles.review}>
            <div className={styles.reviewTop}>
              <span className={styles.reviewLabel}>Client Feedback</span>
              <div className={styles.stars}>★★★★★</div>
            </div>
            <div className={styles.quoteWrap}>
              <span className={styles.quoteMark}>&ldquo;</span>
              <p className={styles.quote}>
                I couldn&apos;t be happier with my new website! J Eleven Media delivered exactly what I was looking for and created a website that truly represents me, my business, and my brand.
              </p>
            </div>
            <div className={styles.reviewBottom}>
              <span className={styles.reviewer}>— Misty Tidwell</span>
              
                href="https://mistytidwell.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewWork}
              >
                View Work →
              </a>
            </div>
          </div>

        </div>

        {/* ── Right: coming soon ── */}
        <div className={`${styles.comingSoon} ${s(1)}`}>
          <p className={styles.comingSoonText}>More Projects<br /><em>Coming Soon</em></p>
        </div>

      </div>
    </section>
  );
}
