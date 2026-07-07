import Nav from "@/components/layout/Nav";
import Hero from "@/components/home/Hero";
import OurStoryReveal from "@/components/home/OurStoryReveal";
import OurServices from "@/components/home/OurServices";
import ScrollContainer from "@/components/home/ScrollContainer";
import OurWork from "@/components/home/OurWork";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollContainer>

        <section data-snap-section id="hero" className="h-full snap-start">
          <Hero />
        </section>

        <OurStoryReveal />

        <OurServices />

        <OurWork />

        <Contact />

      </ScrollContainer>
    </>
  );
}
