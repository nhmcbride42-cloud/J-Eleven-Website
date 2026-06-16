import type { Metadata } from "next";
import ServiceLayout from "@/components/OurServicesExpanded/ServiceLayout";

export const metadata: Metadata = {
  title: "Social Media Growth",
  description: "Social media strategy, content creation, and scheduling tools to grow your local business online.",
};

export default function SocialMediaPage() {
  return (
    <ServiceLayout
      title="Social Media Growth"
      motto="Let's build a social media presence for your business into something that actually drives results."
      description="We meet with you to understand your business and desired brand image. After that, we help you develop a strong social media strategy with content creation, scheduling tools, and training to ensure you have everything you need to grow your social media presence consistently."
      whyItMatters="Social media is where most people spend their time, so it's natural to want to have a presence there; however, it can also be very overwhelming and time consuming. With the right mindset and approach, social media can be a powerful tool to help grow your business and reach more customers."
      packages={[
        {
          name: "Core",
          features: [
            "Profile audit & setup",
            "Brand guide & template sets",
            "30-day content calendar framework",
            "1 training call",
          ],
        },
        {
          name: "Growth",
          features: [
            "Four weeks of pre-made content",
            "Photography brief",
            "2 Training calls",
            "Bonus 30 day post handoff check-in",
          ],
        },
        {
          name: "Elite",
          features: [
            "Eight weeks of pre-made content",
            "Reels content plan",
            "Analytics setup and understanding",
            "1 strategy session",
          ],
        },
      ]}
    />
  );
}
