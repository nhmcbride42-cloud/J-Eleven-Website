import type { Metadata } from "next";
import ServiceLayout from "@/components/services/ServiceLayout";

export const metadata: Metadata = {
  title: "Advanced SEO",
  description: "Local SEO services to help East Tennessee businesses rank higher and attract the right customers.",
};

export default function SEOPage() {
  return (
    <ServiceLayout
      title="SEO Services"
      motto="Make sure your website isn't just beaturiful, but also found by the customers you want."
      description="To ensure your website gets found by the right people, we work hard to optimize it for search engines. Starting with an audit, we identify the best keywords to use, optimize each page, and create a strategy to make sure your website stands out and generates the right leads."
      whyItMatters="Without SEO, it really doesn't matter how good looking your website is. It needs to show up in search results to get customers. With the right strategy for SEO, it can help you to reach more people and and become the go-to business for your industry."
      packages={[
        {
          name: "Basic SEO",
          price: "Included with website purchase",
          features: [
            "Google Business Profile optimization",
            "Local keyword research",
            "On-page SEO",
            "Monthly ranking report",
          ],
        },
        {
          name: "Advanced SEO",
          price: "$250 add-on, included with select website packages",
          features: [
            "Everything in Basic",
            "Content strategy",
            "Backlink building",
            "Bi-weekly reporting",
          ],
        },
        {
          name: "Premium SEO",
          price: "$400 add-on, included with select website packages",
          features: [
            "Everything in Advanced",
            "Full content creation",
            "Weekly reporting",
            "Priority support",
          ],
        },
      ]}
    />
  );
}
