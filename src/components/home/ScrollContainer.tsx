"use client";

import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

export default function ScrollContainer({ children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const locked = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const saved = sessionStorage.getItem("homeScrollTop");
    if (saved !== null) {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.scrollTop = parseInt(saved, 10);
      }));
    }

    const onScroll = () => sessionStorage.setItem("homeScrollTop", String(el.scrollTop));
    el.addEventListener("scroll", onScroll, { passive: true });

    const onWheel = (e: WheelEvent) => {
      // Trackpads produce many small fractional-pixel events; mouse wheels
      // produce a single large discrete event. We treat any non-trackpad
      // scroll (large |deltaY| or line/page deltaMode) as a section jump.
      const isMouseWheel =
        e.deltaMode !== 0 || // line or page mode → definitely a mouse wheel
        (Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40);

      if (!isMouseWheel) return; // let CSS snap handle trackpad naturally

      e.preventDefault();

      if (locked.current) return;
      locked.current = true;
      setTimeout(() => {
        locked.current = false;
      }, 900);

      const sections = Array.from(
        el.querySelectorAll<HTMLElement>("[data-snap-section]")
      );
      if (sections.length === 0) return;

      const scrollTop = el.scrollTop;
      const direction = e.deltaY > 0 ? 1 : -1;

      // Find current section index based on which one is most visible
      let currentIndex = 0;
      let closestDist = Infinity;
      sections.forEach((s, i) => {
        const dist = Math.abs(s.offsetTop - scrollTop);
        if (dist < closestDist) {
          closestDist = dist;
          currentIndex = i;
        }
      });

      const targetIndex = Math.max(
        0,
        Math.min(sections.length - 1, currentIndex + direction)
      );
      sections[targetIndex].scrollIntoView({ behavior: "smooth" });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main
      ref={ref}
      className="h-[calc(100dvh-var(--nav-h))] snap-y snap-mandatory scroll-smooth overflow-y-scroll max-md:snap-none"
    >
      {children}
    </main>
  );
}
