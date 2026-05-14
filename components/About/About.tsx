"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import styles from "./About.module.scss";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

// ─── Vision Data ──────────────────────────────────────────────────────────────

const visionItems = [
  {
    index: "01",
    title: "Crisp Idea",
    description: "복잡한 문제 안에서 핵심을 선명하게 발견합니다.",
  },
  {
    index: "02",
    title: "Solid Strategy",
    description: "아이디어가 결과로 이어질 수 있도록 구조를 설계합니다.",
  },
  {
    index: "03",
    title: "Refined Execution",
    description: "디테일을 정리하고 완성도 있는 실행으로 연결합니다.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function About() {
  // Intro ref
  const introRef = useRef<HTMLDivElement>(null);
  const introInView = useInView(introRef, { once: true, margin: "-80px" });

  // Vision ref
  const visionRef = useRef(null);
  const visionInView = useInView(visionRef, { once: true, margin: "-80px" });

  // Strength refs
  const strengthImgRef = useRef(null);
  const strengthImgInView = useInView(strengthImgRef, {
    once: true,
    margin: "-80px",
  });

  const strengthTxtRef = useRef(null);
  const strengthTxtInView = useInView(strengthTxtRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <section id="about" className={styles.about}>
      {/* ── 1. Intro ─────────────────────────────────────────────────────── */}
      <div className={styles.introWrapper} ref={introRef}>
        <motion.div
          className={styles.introInner}
          variants={fadeUp}
          initial="hidden"
          animate={introInView ? "visible" : "hidden"}
        >
          <span className={styles.sectionLabel}>About TheCracker</span>

          <p className={styles.introText}>
            The Cracker는 선명한 아이디어를 바탕으로
            <br />
            브랜드와 프로젝트에 필요한{" "}
            <em className={styles.accent}>선명한 기억</em>을 설계합니다.
          </p>

          <div className={styles.introDivider} />
        </motion.div>
      </div>

      {/* ── 2. Vision ────────────────────────────────────────────────────── */}
      <div className={styles.visionWrapper} ref={visionRef}>
        <motion.div
          className={styles.visionHeader}
          variants={fadeUp}
          initial="hidden"
          animate={visionInView ? "visible" : "hidden"}
        >
          <span className={styles.sectionLabel}>Vision</span>
          <h2 className={styles.visionTitle}>우리가 일하는 방식</h2>
        </motion.div>

        <motion.div
          className={styles.visionGrid}
          variants={staggerContainer}
          initial="hidden"
          animate={visionInView ? "visible" : "hidden"}
        >
          {visionItems.map((item) => (
            <motion.div
              key={item.index}
              className={styles.visionCard}
              variants={cardVariant}
            >
              <span className={styles.cardIndex}>{item.index}</span>
              <div className={styles.cardDivider} />
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── 3. Strength ──────────────────────────────────────────────────── */}
      <div className={styles.strengthWrapper}>
        {/* Image Placeholder */}
        <motion.div
          ref={strengthImgRef}
          className={styles.strengthImageContainer}
          variants={slideLeft}
          initial="hidden"
          animate={strengthImgInView ? "visible" : "hidden"}
        >
          {/*
           * IMAGE PLACEHOLDER
           * Replace this div with <Image> or <img> when asset is ready.
           * className: styles.imagePlaceholder
           * Recommended ratio: 4:3 (padding-top: 75%)
           */}
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <span className={styles.placeholderLabel}></span>
          </div>
        </motion.div>

        {/* Text Block */}
        <motion.div
          ref={strengthTxtRef}
          className={styles.strengthText}
          variants={slideRight}
          initial="hidden"
          animate={strengthTxtInView ? "visible" : "hidden"}
        >
          <span className={styles.sectionLabel}>Strength</span>

          <h2 className={styles.strengthHeading}>
            From idea
            <br />
            to execution
          </h2>

          <p className={styles.strengthDesc}>
            TheCracker는 아이디어를 보기 좋게 정리하는 데서 끝나지 않고,
            <br />
            브랜드가 실제로 사용할 수 있는 구조와 결과물로 연결합니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
