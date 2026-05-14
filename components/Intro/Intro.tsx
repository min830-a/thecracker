"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Intro.module.scss";

export default function Intro({ onComplete }: IntroProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setIsClosing(true);
    }, 3800);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsClosing(true);

    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <section
      className={`${styles.intro} ${isClosing ? styles.closing : ""}`}
      aria-label="The Cracker intro"
    >
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <Image
            src="/images/thecracker-symbol-black.png"
            alt="The Cracker"
            width={180}
            height={180}
            priority
            className={styles.logo}
          />
        </div>

        <p className={styles.eyebrow}>THE CRACKER</p>
      </div>

      <button
        type="button"
        className={styles.skip}
        onClick={handleSkip}
        aria-label="인트로 건너뛰기"
      >
        Skip
      </button>
    </section>
  );
}
