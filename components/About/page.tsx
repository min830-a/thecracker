// app/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Root page: Header → Hero → About
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import Intro from "@/components/Intro/Intro";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}

      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}
