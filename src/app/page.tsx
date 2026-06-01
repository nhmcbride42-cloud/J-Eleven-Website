import Nav from "@/components/Nav/Nav";
import Hero from "@/components/Hero/Hero";
import OurStoryReveal from "@/components/OurStory/OurStoryReveal";
import OurServices from "@/components/OurServices/OurServices";
import ScrollSection from "@/components/ScrollSection/ScrollSection";
import ScrollContainer from "@/components/ScrollContainer/ScrollContainer";

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

        <ScrollSection id="work">
          <h2>Our <em>Work</em></h2>
        </ScrollSection>

        <ScrollSection id="contact">
          <h2>Contact <em>Us</em></h2>
        </ScrollSection>

      </ScrollContainer>
    </>
  );
}
