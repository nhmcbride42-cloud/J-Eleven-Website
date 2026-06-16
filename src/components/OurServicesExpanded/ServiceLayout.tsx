"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Nav from "@/components/Nav/Nav";
import ContactModal from "@/components/ContactModal/ContactModal";
import styles from "./ServiceLayout.module.css";

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

      <main className={styles.page}>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.motto}>{motto}</p>
          </div>
        </section>

        {/* ── Service ticker ── */}
        <div className={styles.serviceNav}>
          <div className={styles.serviceLinks}>
            {ALL_SERVICES.map((s, i) => (
              <span key={s.href} className={styles.serviceLinkWrap}>
                {i > 0 && <span className={styles.dot}>·</span>}
                <Link
                  href={s.href}
                  className={`${styles.serviceLink} ${s.href === pathname ? styles.serviceLinkActive : ""}`}
                >
                  {s.label}
                </Link>
              </span>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <section className={styles.body}>

          {/* Left: description */}
          <div className={styles.about}>
            <h2 className={styles.aboutHeading}>What We Do</h2>
            <p className={styles.aboutText}>{description}</p>
            <div className={styles.divider} />
            <h2 className={styles.aboutHeading}>Why It Matters</h2>
            <p className={styles.aboutText}>{whyItMatters}</p>
          </div>

          {/* Right: packages + CTA */}
          <div className={styles.packages}>
            {packages.map((pkg, i) => (
              <div
                key={pkg.name}
                className={`${styles.package} ${i === 1 ? styles.packageFeatured : ""}`}
              >
                <div className={styles.packageHeader}>
                  <span className={styles.packageName}>{pkg.name}</span>
                  <span className={styles.packagePrice}>{pkg.price}</span>
                </div>
                <ul className={styles.featureList}>
                  {pkg.features.map((f) => (
                    <li key={f} className={styles.featureItem}>
                      <span className={styles.check}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </section>

        {/* ── CTA ── */}
        <div className={styles.ctaRow}>
          <button className={styles.ctaBtn} onClick={() => setModalOpen(true)}>
            Get Started Today →
          </button>
        </div>

        {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}

      </main>
    </>
  );
}
