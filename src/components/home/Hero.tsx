import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative flex h-auto flex-col items-center justify-center px-6 pt-[6vh] pb-[4vh] text-center md:h-full md:pt-[8vh] md:pb-[12vh]">
      
      {/*Adding a hidden header tag for SEO*/}
      <h1 className="sr-only">
        Web Design &amp; Social Media Management in East Tennessee (Lenoir City, Loudon, Knoxville) | J Eleven Media
      </h1>
      
      {/* Main logo/wordmark image — preloaded since it's above the fold */}
      <Image src="/big-logo.jpg" alt="J Eleven Media" className="block h-auto w-[min(1000px,90vw)]" width={2000} height={577} priority />

      {/* Motto/tagline — fades in shortly after the logo */}
      <p className="mt-6 max-w-[50ch] animate-[fade-in_1s_ease_0.6s_forwards] font-cormorant text-[clamp(1.1rem,4.5vw,1.4rem)] font-normal italic leading-[1.4] tracking-[0.01em] text-ink-soft opacity-0 md:mt-10 md:text-[clamp(1.3rem,2.5vw,2rem)]">
        At J Eleven, we take on your vision like it's our own and help you
        achieve the online presence you deserve.
      </p>

      {/* Thin divider line — fades in after the motto */}
      <div className="mx-auto mt-10 mb-8 h-px w-[60px] animate-[fade-in_1s_ease_1s_forwards] bg-line-2 opacity-0" />

      {/* CTA link down to #contact — fades in last, spreads out on hover */}
      <a href="#contact" className="animate-[fade-in_1s_ease_1.2s_forwards] font-playfair text-[clamp(0.95rem,1.4vw,1.2rem)] font-semibold tracking-[0.08em] text-clay no-underline opacity-0 transition-[letter-spacing] duration-200 hover:tracking-[0.14em]">
        Get started today →
      </a>
    </div>
  );
}