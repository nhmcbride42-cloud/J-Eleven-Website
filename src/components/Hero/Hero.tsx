import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <img
        src="/Big Logo.jpg"
        alt="J Eleven Media"
        className={styles.wordmark}
      />
      <p className={styles.heroMotto}>At J Eleven, we take on your vision like it's our own and help you achieve the online presence you deserve.</p>
    </div>
  );
}
