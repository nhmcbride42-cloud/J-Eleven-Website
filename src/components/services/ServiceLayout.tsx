"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Nav from "@/components/layout/Nav";
import ContactModal from "@/components/services/ContactModal";

export type ServicePackage = {
  name: string;
  price?: string;
  features: string[];
};

export type ServiceLayoutProps = {
  title: string;
  motto: string;
  description: string;
  whyItMatters: string;
  packages: [ServicePackage, ServicePackage, ServicePackage];
};

const ALL_SERVICES = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Maintenance",     href: "/services/maintenance" },
  { label: "Hosting",         href: "/services/hosting" },
  { label: "SEO",             href: "/services/seo" },
  { label: "Social Media",    href: "/services/social-media" },
];

export default function ServiceLayout({
  title, motto, description, whyItMatters, packages,
}: ServiceLayoutProps) {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Nav />

      <main className="flex flex-col bg-paper">

        {/* ── Hero ── */}
        <section className="flex min-h-[28vh] items-center bg-cocoa">
          <div className="flex flex-col justify-center gap-3 p-[clamp(2rem,6vw,5rem)]">
            <h1 className="font-playfair text-[clamp(2.2rem,4vw,4rem)] font-medium leading-[1.05] tracking-[-0.01em] text-paper">{title}</h1>
            <p className="font-cormorant text-[clamp(1rem,1.3vw,1.2rem)] font-normal italic leading-[1.4] tracking-[0.02em] text-paper/60">{motto}</p>
          </div>
        </section>

        {/* ── Service ticker ── */}
        <div className="flex justify-center border-b border-line-2 bg-paper px-6 py-[0.9rem]">
          <div className="flex flex-wrap items-center justify-center gap-[1.4rem] md:gap-0">
            {ALL_SERVICES.map((s, i) => (
              <span key={s.href} className="flex items-center">
                {i > 0 && <span className="mx-4 select-none font-cormorant text-[1.1rem] leading-none text-ink-faint">·</span>}
                <Link
                  href={s.href}
                  className={`font-playfair text-[0.9rem] tracking-[0.1em] text-ink no-underline transition-opacity duration-150 hover:opacity-100 ${s.href === pathname ? "font-bold opacity-100" : "font-normal opacity-55"}`}
                >
                  {s.label}
                </Link>
              </span>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <section className="grid flex-1 grid-cols-1 gap-8 px-6 py-8 md:grid-cols-[0.6fr_0.5fr] md:gap-[2vw] md:px-[clamp(1.5rem,20vw,20rem)] md:py-[clamp(2rem,5vh,4rem)]">

          {/* Left: description */}
          <div className="flex flex-col gap-3">
            <h2 className="font-cormorant text-[clamp(1.6rem,2.5vw,2.4rem)] font-normal leading-[1.1] tracking-[-0.01em] text-ink">What We Do</h2>
            <p className="font-cormorant text-[clamp(1.15rem,1.6vw,1.45rem)] italic leading-[1.8] text-ink-soft">{description}</p>
            <div className="my-2 h-px w-12 bg-line-2" />
            <h2 className="font-cormorant text-[clamp(1.6rem,2.5vw,2.4rem)] font-normal leading-[1.1] tracking-[-0.01em] text-ink">Why It Matters</h2>
            <p className="font-cormorant text-[clamp(1.15rem,1.6vw,1.45rem)] italic leading-[1.8] text-ink-soft">{whyItMatters}</p>
          </div>

          {/* Right: packages + CTA */}
          <div className="flex flex-col gap-3">
            {packages.map((pkg, i) => (
              <div
                key={pkg.name}
                className="flex flex-col gap-[0.6rem] rounded-2xl border border-clay bg-white px-[1.4rem] py-[1.2rem]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-playfair text-[clamp(1rem,1.2vw,1.15rem)] font-semibold text-ink">{pkg.name}</span>
                  <span className="whitespace-nowrap font-cormorant text-[clamp(1rem,1.2vw,1.1rem)] italic text-clay">{pkg.price}</span>
                </div>
                <ul className="flex list-none flex-col gap-[0.3rem]">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-cormorant text-[clamp(0.9rem,1.05vw,1.05rem)] leading-[1.4] text-ink">
                      <span className="shrink-0 text-[0.78rem] font-bold text-clay">✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </section>

        {/* ── CTA ── */}
        <div className="flex justify-center border-t border-line-2 px-6 py-[clamp(1.5rem,3vh,2.5rem)]">
          <button className="cursor-pointer border-none bg-transparent font-playfair text-[clamp(0.95rem,1.4vw,1.2rem)] font-semibold tracking-[0.08em] text-clay transition-[letter-spacing] duration-200 hover:tracking-[0.14em]" onClick={() => setModalOpen(true)}>
            Get Started Today →
          </button>
        </div>

        {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}

      </main>
    </>
  );
}
