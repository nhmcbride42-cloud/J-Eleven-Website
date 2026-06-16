import type { Metadata } from "next";
import ServiceLayout from "@/components/OurServicesExpanded/ServiceLayout";

export const metadata: Metadata = {
  title: "Website Development",
  description: "Custom, mobile-ready websites for local businesses across East Tennessee. Starting at $1,000.",
};

export default function WebDevelopmentPage() {
  return (
    <ServiceLayout
      title="Custom Web Design"
      motto="Together, let's build a website that truly captures what your business is all about."
      description="We build fully custom websites using your brand's unique style and voice as well as the vision you have for your business. Each website is designed to be mobile-ready, SEO-optimized and built to get customers. When we're done, the website is completely yours with no ongoing fees or subscriptions. "
      whyItMatters="Without a website, your business is invisible to the majority of potential customers or clients. A well designed website that is optimized for SEO can help you reach more people, build trust, credibility and grow your business in a way that social media or other platforms cannot.  "
      packages={[
        {
          name: "Essentials",
          features: [
            "Up to 5 pages with simple design and functionality",
            "Contact Form to capture leads and inquiries",
            "Basic SEO setup for better search engine visibility",
            "1 round of revisions during the build and after launch",
          ],
        },
        {
          name: "Studio",
          features: [
            "Up to 10 pages custom designed to fit your brand",
            "Third party integrations to improve functionality",
            "Advanced SEO setup to get you ranking higher",
            "3 rounds of revisions during the build and after launch",
          ],
        },
        {
          name: "Signature",
          features: [
            "Full featured website with unlimited pages",
            "Full custom design with copywriting and branding support",
            "Full SEO package to reach the most customers possible",
            "Ongoing support, unlimited revisions, and priority care included",
          ],
        },
      ]}
    />
  );
}
