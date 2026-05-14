"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Hero.module.scss";

// ─── Slide Data ───────────────────────────────────────────────────────────────
// public/images/ 폴더에 아래 파일명으로 이미지를 넣으세요.
// 없으면 placeholder 배경색이 표시됩니다.
const slides = [
  { id: 0, src: "/images/hero-01.webp", alt: "Hero slide 1" },
  { id: 1, src: "/images/hero-02.webp", alt: "Hero slide 2" },
  { id: 2, src: "/images/hero-03.webp", alt: "Hero slide 3" },
  { id: 3, src: "/images/hero-04.webp", alt: "Hero slide 4" },
];

const INTERVAL = 4500; // 자동 전환 간격 (ms)

// ─── Types ────────────────────────────────────────────────────────────────────
type Direction = 1 | -1;

// ─── Framer Motion Variants ───────────────────────────────────────────────────
const slideVariants = {
  enter: (dir: Direction) => ({
    x: dir > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
    transition: {
      x: { duration: 1.0, ease: [0.76, 0, 0.24, 1] as const },
    },
  },
  exit: (dir: Direction) => ({
    x: dir > 0 ? "-100%" : "100%",
    transition: {
      x: { duration: 1.0, ease: [0.76, 0, 0.24, 1] as const },
    },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const [[current, direction], setSlide] = useState<[number, Direction]>([
    0, 1,
  ]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const paginate = useCallback((newDir: Direction) => {
    setSlide(([prev]) => {
      const next = (prev + newDir + slides.length) % slides.length;
      return [next, newDir];
    });
  }, []);

  const goTo = useCallback((index: number) => {
    setSlide(([prev]) => {
      if (index === prev) return [prev, 1];
      return [index, index > prev ? 1 : -1];
    });
  }, []);

  // Auto-play — current가 바뀔 때마다 타이머 리셋
  useEffect(() => {
    timerRef.current = setTimeout(() => paginate(1), INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paginate]);

  return (
    <section className={styles.hero}>
      {/* ── 1. Background Slide Layer ─────────────────────────────────────── */}
      <div className={styles.bgLayer} aria-hidden="true">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            className={styles.slide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* 어두운 오버레이 — 텍스트 가독성 */}
            <div className={styles.overlay} />

            {/*
             * ─── IMAGE PLACEHOLDER ─────────────────────────────────────────
             * public/images/hero-0X.jpg 파일을 넣으면 자동으로 표시됩니다.
             * 이미지 없을 때: SCSS의 .slide background-color가 보입니다.
             */}
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              priority={current === 0}
              sizes="100vw"
              className={styles.bgImage}
              style={{ objectFit: "cover", objectPosition: "center" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── 2. Content Layer (fixed, above bg) ────────────────────────────── */}
      <div className={styles.contentLayer}>
        <div className={styles.contentInner}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
          >
            The Cracker
          </motion.span>

          <motion.h1
            className={styles.heading}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.45,
              duration: 0.9,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
          >
            CRISP IDEA.
            <br />
            <em className={styles.headingAccent}>SOLID RESULTS</em>
          </motion.h1>

          <motion.p
            className={styles.sub}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.75, ease: "easeOut" }}
          >
            행사 기획 · 설치 · 운영
            <br /> 선명한 아이디어, 단단한 결과를 설계합니다.
          </motion.p>

          <motion.a
            href="#contact"
            className={styles.cta}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.035, opacity: 0.88 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Us
          </motion.a>
        </div>
      </div>

      {/* ── 3. Arrow Controls ─────────────────────────────────────────────── */}
      <button
        className={`${styles.arrow} ${styles.arrowPrev}`}
        onClick={() => paginate(-1)}
        aria-label="Previous slide"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        className={`${styles.arrow} ${styles.arrowNext}`}
        onClick={() => paginate(1)}
        aria-label="Next slide"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* ── 4. Dot Indicators ─────────────────────────────────────────────── */}
      <div
        className={styles.dotsWrapper}
        role="tablist"
        aria-label="Slide indicators"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
          >
            {/* Active dot 진행 bar */}
            {i === current && (
              <motion.span
                className={styles.dotProgress}
                key={`progress-${current}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTERVAL / 1000, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── 5. Slide Counter ──────────────────────────────────────────────── */}
      <div className={styles.counter} aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.span
            key={`curr-${current}`}
            className={styles.counterCurrent}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {String(current + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <span className={styles.counterSep} />
        <span className={styles.counterTotal}>
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
