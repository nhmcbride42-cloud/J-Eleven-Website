import Nav from "@/components/Nav/Nav";
import Hero from "@/components/Hero/Hero";
import OurStoryReveal from "@/components/OurStory/OurStoryReveal";
import OurServices from "@/components/OurServices/OurServices";
import ScrollSection from "@/components/ScrollSection/ScrollSection";
import ScrollContainer from "@/components/ScrollContainer/ScrollContainer";
import OurWork from "@/components/OurWork/OurWork";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollContainer>

        <section data-snap-section id="hero" style={{ height: "100%", scrollSnapAlign: "start" }}>
          <Hero />
        </section>

        <OurStoryReveal />

        <OurServices />

        <OurWork />

        <ScrollSection id="contact">
          <h2>Contact <em>Us</em></h2>
        </ScrollSection>

      </ScrollContainer>
    </>
  );
}
