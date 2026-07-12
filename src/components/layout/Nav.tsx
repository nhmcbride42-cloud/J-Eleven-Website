"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SERVICE_LINKS = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Maintenance",     href: "/services/maintenance" },
  { label: "Hosting",         href: "/services/hosting" },
  { label: "SEO",             href: "/services/seo" },
  { label: "Social Media",    href: "/services/social-media" },
];

/* Shared link styles */
const desktopLink =
  "cursor-pointer whitespace-nowrap border-none bg-transparent py-1.5 font-playfair text-base font-normal tracking-[0.16em] text-ink no-underline opacity-[0.72] transition-[opacity,font-size,font-weight] duration-300 hover:text-[0.92rem] hover:font-bold hover:opacity-100";
const mobileItem =
  "cursor-pointer border-t border-line bg-transparent px-7 py-5 text-left font-playfair text-[0.9rem] font-normal tracking-[0.14em] text-ink no-underline opacity-[0.72] first:border-t-0";

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

  const nav = (id: string, label: string, close = false) => {
    const cls = close ? mobileItem : desktopLink;
    return isHome ? (
      <button
        type="button"
        className={cls}
        onClick={() => { scrollTo(id); if (close) setMenuOpen(false); }}
      >
        {label}
      </button>
    ) : (
      <Link href={`/#${id}`} className={cls} onClick={() => { if (close) setMenuOpen(false); }}>
        {label}
      </Link>
    );
  };

  const burgerBar =
    "block h-[1.5px] w-[25px] bg-ink transition-[transform,opacity] duration-[350ms] ease-in-out";

  return (
    <>
      {/* Safe area bar (notch/status bar) */}
      <div className="fixed inset-x-0 top-0 z-[9999] h-[env(safe-area-inset-top)] bg-paper md:hidden" />

      <nav className="sticky top-0 z-[100] border-b border-line-2 bg-paper pt-[env(safe-area-inset-top)] md:pt-0 md:backdrop-blur-[10px]">
        <div className="mx-auto grid h-[var(--nav-h)] max-w-[1440px] grid-cols-[auto_auto] items-center justify-between px-6 lg:grid-cols-[auto_1fr_auto] lg:justify-normal lg:px-12">
          <Link href="/" className="flex items-center justify-self-start leading-none no-underline">
            <Image
              src="/big-logo.jpg"
              alt="J Eleven Media logo"
              width={2000}
              height={577}
              className="block h-[65px] w-auto max-[480px]:h-[52px]"
            />
          </Link>

          <ul className="hidden list-none justify-center gap-[38px] self-stretch lg:flex">
            <li className="flex items-center">{nav("story-reveal", "Our Story")}</li>
            <li className="group relative flex items-center">
              <button type="button" className={desktopLink}>
                Our Services
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full z-[200] flex min-w-[200px] -translate-x-1/2 flex-col rounded-b-xl border border-t-0 border-line-2 bg-paper py-2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                {SERVICE_LINKS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="px-5 py-2.5 font-playfair text-[0.9rem] tracking-[0.1em] text-ink no-underline opacity-[0.72] transition-opacity duration-200 hover:opacity-100"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </li>
            <li className="flex items-center">{nav("work", "Our Work")}</li>
            <li className="flex items-center">{nav("contact", "Contact Us")}</li>
          </ul>

          <button
            className="z-[120] flex cursor-pointer flex-col gap-[5.5px] border-none bg-transparent p-2 justify-self-end lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className={`${burgerBar} ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`${burgerBar} ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`${burgerBar} ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>

        <div
          className={`fixed inset-x-0 top-[calc(var(--nav-h)+env(safe-area-inset-top))] z-[110] flex flex-col overflow-hidden border-b border-line-2 bg-paper [transition:max-height_0.45s_cubic-bezier(0.2,0.7,0.2,1),opacity_0.3s_ease] md:top-[var(--nav-h)] ${
            menuOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {nav("story-reveal", "Our Story", true)}
          <button
            type="button"
            className={`${mobileItem} flex w-full items-center`}
            onClick={() => setServicesOpen((o) => !o)}
          >
            Our Services
          </button>
          {servicesOpen && (
            <div className="flex flex-col bg-ink/[0.04]">
              {SERVICE_LINKS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="border-t border-line py-4 pl-[42px] pr-7 font-playfair text-[0.85rem] tracking-[0.12em] text-ink no-underline opacity-75 hover:opacity-100"
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
