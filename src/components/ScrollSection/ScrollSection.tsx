"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollSection.module.css";

interface Props {
  id: string;
  children: React.ReactNode;
}

export default function ScrollSection({ id, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={styles.section} data-snap-section>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
