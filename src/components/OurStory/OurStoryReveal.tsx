"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./OurStory.module.css";

export default function OurStoryReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(0);

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
    <section ref={sectionRef} id="story-reveal" className={styles.section} data-snap-section>

      <div className={styles.headingZone}>
        <h2 className={styles.heading}>Our <em>Story</em></h2>
      </div>

      <div className={styles.layout}>
        <div className={styles.inner}>

        {/* Left column */}
        <div className={styles.leftCol}>
          <p className={styles.paragraph}>
            We are J Eleven Media, a husband-and-wife team based in East Tennessee. We started this business with a goal to help local small businesses thrive with beautiful websites. 
          </p>
          <p className={styles.paragraph}>
            We treat every client like family and your vision becomes our own. Together, we'll create a professional website that truly reflects your brand so you have something to be proud to share with the world.
          </p>
          <p className={styles.paragraph}>
            All of our work is built on trust, clear communication and thoughtfulness. Because every business deserves something that feels personal. 
          </p>
        </div>

        {/* Middle column — photo */}
        <div className={styles.midCol}>
          <div className={styles.photoFrame}>
            <img src="/Family Photo.jpg" alt="The J Eleven family" className={styles.familyPhoto} />
          </div>
        </div>

        {/* Right column — pillars stagger in */}
        <div className={styles.rightCol}>

          <div className={`${styles.pillar} ${shown >= 1 ? styles.pillarVisible : ""}`}>
            <div className={styles.icon} />
            <h3 className={styles.pillarTitle}>Why We Started</h3>
            <p className={styles.pillarBody}>
              We&apos;ve always been passionate about helping others, and we saw a need for affordable, high-quality web design services in our community. We created J Eleven Media to fill that gap.
            </p>
          </div>

          <div className={`${styles.pillar} ${shown >= 2 ? styles.pillarVisible : ""}`}>
            <div className={styles.icon} />
            <h3 className={styles.pillarTitle}>Our Values</h3>
            <p className={styles.pillarBody}>
              As a family-owned business, we believe relationships matter more than transactions. We operate with integrity. We strive to be transparent, honest and communicative in everything we do. 
            </p>
          </div>

          <div className={`${styles.pillar} ${shown >= 3 ? styles.pillarVisible : ""}`}>
            <div className={styles.icon} />
            <h3 className={styles.pillarTitle}>Our Promise to Small Businesses</h3>
            <p className={styles.pillarBody}>
              We promise to be a dedicated partner in your success, providing you with a high-quality website in a timely manner, and to treat your business goals like they are our own. 
            </p>
          </div>

        </div>
        </div>{/* end inner */}
      </div>{/* end layout */}
    </section>
  );
}
