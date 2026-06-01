"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./OurWork.module.css";

function DesktopMockup() {
  return (
    <div className={styles.desktopFrame}>
      <div className={styles.browserBar}>
        <div className={styles.browserDots}>
          <span /><span /><span />
        </div>
        <div className={styles.browserUrl}>mistytidwell.com</div>
      </div>
      <div className={styles.browserScreen}>
        <video
          src="/Misty Tidwell Recording.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={styles.screenVideo}
        />
        <PhoneMockup />
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className={styles.phoneFrame}>
      <div className={styles.phoneIsland} />
      <div className={styles.phoneScreen}>
        <div className={styles.phoneSiteHero}>
          <p className={styles.phoneSiteName}>MT Real Estate</p>
          <h4 className={styles.phoneSiteHeading}>Find Your<br />Home</h4>
          <div className={styles.phoneSiteBtn}>View Listings</div>
        </div>
        <div className={styles.phoneListing} />
        <div className={styles.phoneListing} />
      </div>
    </div>
  );
}

export default function OurWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        else setVisible(false);
      },
      { threshold: 0.3 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="work" className={styles.section} data-snap-section>

      <div className={styles.headingZone}>
        <h2 className={styles.heading}>Our <em>Work</em></h2>
      </div>

      <div className={styles.layout}>

        {/* ── Featured project card ── */}
        <div className={`${styles.featured} ${visible ? styles.visible : ""}`}>

          <div className={styles.mockupArea}>
            <DesktopMockup />
          </div>

          <div className={styles.featuredInfo}>
            <div className={styles.featuredMeta}>
              <span className={styles.industry}>Real Estate</span>
              <span className={styles.clientName}>Misty Tidwell</span>
            </div>

            <div className={styles.tags}>
              {["Custom Design", "Color Scheme Match", "Listings Integration", "Work Process Sections", "Review Integration"].map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>

            <div className={styles.review}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.quote}>
                &ldquo;I couldn&apos;t be happier with my new website! J Eleven Media delivered exactly what I was looking for and created a website that truly represents me, my business, and my brand. Hayden was fantastic to work with throughout the entire process.&rdquo;
              </p>
              <span className={styles.reviewer}>— Misty Tidwell</span>
            </div>
          </div>
        </div>

        {/* ── Coming soon column ── */}
        <div className={styles.soonCol}>
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`${styles.soonCard} ${visible ? styles.visible : ""}`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <div className={styles.soonInner}>
                <div className={styles.soonDots}>
                  <span /><span /><span />
                </div>
                <p className={styles.soonText}>More Projects<br /><em>Coming Soon</em></p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
