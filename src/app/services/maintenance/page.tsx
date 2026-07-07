import type { Metadata } from "next";
import ServiceLayout from "@/components/services/ServiceLayout";

export const metadata: Metadata = {
  title: "Maintenance Plans",
  description: "Monthly website maintenance, content updates, and security monitoring for East Tennessee businesses.",
};

export default function MaintenancePage() {
  return (
    <ServiceLayout
      title="Maintenance Plans"
      motto="With our maintenance plans, your website will stay updated and secure so that's one less thing to worry about."
      description="Our maintenance plans are designed to keep your website running smoothly and securely. We handle everything from regular updates and security monitoring to content updates and performance optimization. With one of our plans, you can rest assured that your website is in good hands."
      whyItMatters="Having a website that is continuously maintained is important for a variety of reasons. Regular updates and security monitoring help to protect your website from attacks and keeps it running smoothly. In addition, regularly updating your content helps to keep your website relevant and engaging for visitors."
      packages={[
        {
          name: "Basic",
          price: "$25/mo or $250/yr",
          features: [
            "Monthly plugin & security updates",
            "Uptime monitoring",
            "Monthly report",
            "Email support",
          ],
        },
        {
          name: "Standard",
          price: "$50/mo or $500/yr",
          features: [
            "Everything in Basic",
            "Up to 2 content updates/mo",
            "Performance optimization",
            "Priority email support",
          ],
        },
        {
          name: "Premium",
          price: "$100/mo or $1000/yr",
          features: [
            "Everything in Standard",
            "Unlimited content updates",
            "New pages or features added as needed",
            "Same-day support",
          ],
        },
      ]}
    />
  );
}
