"use client";

import styles from "./Footer.module.scss";

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Top row: Logo + Nav */}
        <div className={styles.topRow}>
          {/* Logo */}
          <span className={styles.logo}>TheCracker</span>

          {/* Minimal nav links */}
          <nav className={styles.nav} aria-label="Footer navigation">
            <a href="#about" className={styles.navLink}>About</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </nav>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom row: Business info + Copyright */}
        <div className={styles.bottomRow}>
          <p className={styles.bizInfo}>
            Business Info Placeholder
          </p>
          <p className={styles.copyright}>
            © {currentYear} TheCracker. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
