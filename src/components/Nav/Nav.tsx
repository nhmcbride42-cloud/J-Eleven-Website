"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const SERVICE_LINKS = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Maintenance",     href: "/services/maintenance" },
  { label: "Hosting",         href: "/services/hosting" },
  { label: "SEO",             href: "/services/seo" },
  { label: "Social Media",    href: "/services/social-media" },
];

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
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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

  const nav = (id: string, label: string, close = false) =>
    isHome ? (
      <button
        type="button"
        className={styles.navLinkBtn}
        onClick={() => { scrollTo(id); if (close) setMenuOpen(false); }}
      >
        {label}
      </button>
    ) : (
      <Link href={`/#${id}`} className={styles.navLinkBtn} onClick={() => { if (close) setMenuOpen(false); }}>
        {label}
      </Link>
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
            <li className={styles.dropdown}>
              <button type="button" className={styles.navLinkBtn}>
                Our Services
              </button>
              <div className={styles.dropdownMenu}>
                {SERVICE_LINKS.map((s) => (
                  <Link key={s.href} href={s.href}>{s.label}</Link>
                ))}
              </div>
            </li>
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
          <button
            type="button"
            className={styles.mobileServicesBtn}
            onClick={() => setServicesOpen((o) => !o)}
          >
            Our Services
          </button>
          {servicesOpen && (
            <div className={styles.mobileServicesExpanded}>
              {SERVICE_LINKS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className={styles.mobileServiceLink}
                  onClick={() => { setMenuOpen(false); setServicesOpen(false); }}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          )}
          {nav("work", "Our Work", true)}
          {nav("contact", "Contact Us", true)}
        </div>
      </nav>
    </>
  );
}
