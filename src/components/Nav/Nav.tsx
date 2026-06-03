"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css";

function scrollTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  let el = target.parentElement;
  while (el && el !== document.body) {
    const ov = getComputedStyle(el).overflowY;
    if (ov === "scroll" || ov === "auto") {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    el = el.parentElement;
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const nav = (id: string, label: string, close = false) => (
    <button
      type="button"
      className={styles.navLinkBtn}
      onClick={() => { scrollTo(id); if (close) setMenuOpen(false); }}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className={styles.safeAreaBar} />
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.brand}>
            <Image
              src="/transparent.png"
              alt="J Eleven Media logo"
              width={80}
              height={80}
            />
          </Link>
          <ul className={styles.navLinks}>
            <li>{nav("story-reveal", "Our Story")}</li>
            <li>{nav("services", "Our Services")}</li>
            <li>{nav("work", "Our Work")}</li>
            <li>{nav("contact", "Contact Us")}</li>
          </ul>
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
          {nav("story-reveal", "Our Story", true)}
          {nav("services", "Our Services", true)}
          {nav("work", "Our Work", true)}
          {nav("contact", "Contact Us", true)}
        </div>
      </nav>
    </>
  );
}
