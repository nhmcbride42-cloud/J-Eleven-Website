import type { Metadata } from "next";
import ServiceLayout from "@/components/OurServicesExpanded/ServiceLayout";

export const metadata: Metadata = {
  title: "Website Hosting",
  description: "Reliable website hosting and domain management for East Tennessee small businesses.",
};

export default function HostingPage() {
  return (
    <ServiceLayout
      title="Website Hosting"
      motto="Fast and reliable management so you can focus on running your business instead of a website."
      description="It doesn't matter if you built a website with us or somewhere else, we can manage it for you. We can handle everything from the hosting and domain management side, using reliable, secure hosting providers to make sure your website is fast and always up."
      whyItMatters="Improper hosting can lead to slow loading times and security vulnerabilities. This could lead to poor user experiences and lost customers. With our hosting services, you can rest assured that everything is in good hands and there's nothing to worry about."
      packages={[
        {
          name: "Basic Hosting",
          price: "Starting at $XX/mo",
          features: [
            "Managed hosting",
            "SSL certificate",
            "Domain management",
            "Monthly backups",
          ],
        },
        {
          name: "Standard Hosting",
          price: "Starting at $XX/mo",
          features: [
            "Everything in Basic",
            "Weekly backups",
            "Uptime monitoring",
            "Performance optimization",
          ],
        },
        {
          name: "Premium Hosting",
          price: "Starting at $XX/mo",
          features: [
            "Everything in Standard",
            "Daily backups",
            "Priority server resources",
            "CDN setup",
          ],
        },
      ]}
    />
  );
}
