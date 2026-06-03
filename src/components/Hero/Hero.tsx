import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <Image
        src="/big-logo.jpg"
        alt="J Eleven Media"
        className={styles.wordmark}
        width={2000}
        height={577}
        priority
      />
      <p className={styles.heroMotto}>
        At J Eleven, we take on your vision like it's our own and help you
        achieve the online presence you deserve.
      </p>
    </div>
  );
}
