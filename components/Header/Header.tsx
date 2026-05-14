"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Header.module.scss";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About TheCracker", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 메뉴 열릴 때 body 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.inner}>

          {/* ── Left: Desktop Nav ─────────────────────────────────────── */}
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.navLink}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Center: Logo (absolute) ────────────────────────────────── */}
          <a href="#" className={styles.logo} aria-label="TheCracker home">
            TheCracker
          </a>

          {/* ── Right: Spacer (desktop) + Hamburger (mobile) ───────────── */}
          <div className={styles.rightSlot}>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className={`${styles.bar} ${menuOpen ? styles.barTop : ""}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barMid : ""}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barBot : ""}`} />
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
            />

            {/* Drawer */}
            <motion.nav
              className={styles.drawer}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
              aria-label="Mobile navigation"
            >
              <div className={styles.drawerHeader}>
                <span className={styles.drawerLogo}>TheCracker</span>
                <button
                  className={styles.drawerClose}
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <ul className={styles.drawerLinks}>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      className={styles.drawerLink}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
