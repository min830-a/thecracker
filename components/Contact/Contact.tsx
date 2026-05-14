"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Contact.module.scss";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className={styles.contact}>
      <motion.div
        ref={ref}
        className={styles.inner}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Label */}
        <motion.span className={styles.sectionLabel} variants={itemFade}>
          Contact
        </motion.span>

        {/* Title */}
        <motion.h2 className={styles.title} variants={itemFade}>
          Let's Build
          <br />
          Solid Results
        </motion.h2>

        {/* Divider */}
        <motion.div className={styles.divider} variants={itemFade} />

        {/* Description */}
        <motion.p className={styles.description} variants={itemFade}>
          프로젝트에 대한 아이디어가 있다면
          <br />
          TheCracker와 함께 구체적인 결과로 만들어보세요.
        </motion.p>

        {/* Email */}
        <motion.a
          href="mailto:contact@thecracker.co.kr"
          className={styles.email}
          variants={itemFade}
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.2 }}
        >
          contact@thecracker.co.kr
        </motion.a>

        {/* CTA Button */}
        <motion.div variants={itemFade}>
          <motion.a
            href="mailto:contact@thecracker.co.kr"
            className={styles.ctaButton}
            whileHover={{ scale: 1.03, opacity: 0.88 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
