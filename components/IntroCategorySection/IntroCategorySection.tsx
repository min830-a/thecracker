"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import styles from "./IntroCategorySection.module.scss";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CategoryItem {
  id: number;
  label: string;
  leftImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  rightImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// 이미지 경로: /public/images/intro/ 기준
// 파일이 없을 경우 placeholder 배경으로 렌더됩니다.
const categories: CategoryItem[] = [
  {
    id: 0,
    label: "Event Planning",
    leftImage: {
      src: "/images/intro/event-left.jpg",
      alt: "Brand Strategy left",
      width: 420,
      height: 560,
    },
    rightImage: {
      src: "/images/intro/event-right.jpg",
      alt: "Brand Strategy right",
      width: 420,
      height: 560,
    },
  },
  {
    id: 1,
    label: "Space Experience",
    leftImage: {
      src: "/images/intro/space-left.jpg",
      alt: "Creative Direction left",
      width: 420,
      height: 560,
    },
    rightImage: {
      src: "/images/intro/space-right.jpg",
      alt: "Creative Direction right",
      width: 420,
      height: 560,
    },
  },
  {
    id: 2,
    label: "Stage Production",
    leftImage: {
      src: "/images/intro/stage-left.jpg",
      alt: "Visual Identity left",
      width: 420,
      height: 560,
    },
    rightImage: {
      src: "/images/intro/stage-right.jpg",
      alt: "Visual Identity right",
      width: 420,
      height: 560,
    },
  },
  {
    id: 3,
    label: "Event Operation",
    leftImage: {
      src: "/images/intro/operation-left.jpg",
      alt: "Space left",
      width: 420,
      height: 560,
    },
    rightImage: {
      src: "/images/intro/operation-right.jpeg",
      alt: "Space right",
      width: 420,
      height: 560,
    },
  },
];

// ─── Image Transition Variants ────────────────────────────────────────────────
const imgVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 0.98,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function IntroCategorySection() {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const listRef = useRef<HTMLUListElement>(null);

  const active = categories[activeIndex];

  return (
    <section className={styles.section} aria-label="TheCracker Services">
      <div className={styles.inner}>
        {/* ── Left Image Column ──────────────────────────────────────────── */}
        <div className={styles.imageColLeft} aria-hidden="true">
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${activeIndex}`}
              className={styles.imageWrapLeft}
              variants={imgVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Placeholder visible when image fails / not present */}
              <div className={styles.imagePlaceholder} />
              <Image
                src={active.leftImage.src}
                alt={active.leftImage.alt}
                fill
                sizes="(max-width: 768px) 0px, 30vw"
                className={styles.image}
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = "0";
                }}
              />
              {/* Subtle grain overlay */}
              <div className={styles.imageGrain} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Center: Category List ──────────────────────────────────────── */}
        <nav className={styles.centerCol}>
          {/* Section label */}
          <span className={styles.eyebrow}>What We Do</span>

          <ul ref={listRef} className={styles.categoryList} role="list">
            {categories.map((cat, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={cat.id} className={styles.categoryItem}>
                  <button
                    className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ""}`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onFocus={() => setActiveIndex(i)}
                    onClick={() => setActiveIndex(i)}
                    aria-pressed={isActive}
                    aria-label={cat.label}
                  >
                    {/* Index number */}
                    <span className={styles.catIndex}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Label text */}
                    <span className={styles.catLabel}>{cat.label}</span>

                    {/* Active underline bar */}
                    {isActive && (
                      <motion.span
                        className={styles.activeLine}
                        layoutId="activeLine"
                        transition={{
                          duration: 0.4,
                          ease: [0.25, 0.1, 0.25, 1] as const,
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Bottom descriptor */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeIndex}`}
              className={styles.descriptor}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              아이디어를 구조로, 구조를 결과로.
            </motion.p>
          </AnimatePresence>
        </nav>

        {/* ── Right Image Column ─────────────────────────────────────────── */}
        <div className={styles.imageColRight} aria-hidden="true">
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${activeIndex}`}
              className={styles.imageWrapRight}
              variants={imgVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.imagePlaceholder} />
              <Image
                src={active.rightImage.src}
                alt={active.rightImage.alt}
                fill
                sizes="(max-width: 768px) 0px, 24vw"
                className={styles.image}
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = "0";
                }}
              />
              <div className={styles.imageGrain} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Background decorative number ─────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.span
          key={`bg-num-${activeIndex}`}
          className={styles.bgNumber}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </section>
  );
}
