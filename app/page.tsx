"use client";

import { useState } from "react";
import Intro from "@/components/Intro/Intro"; // 추가
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import IntroCategorySection from "@/components/IntroCategorySection/IntroCategorySection";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  /**
   * showIntro 상태:
   * - true  → Intro 컴포넌트 렌더링 (로고 인트로 재생)
   * - false → Header + 본문 섹션 렌더링
   *
   * 향후 Intro 컴포넌트 완성 시:
   * Intro 내부에서 애니메이션 종료 후 onComplete()를 호출하면
   * 자동으로 메인 콘텐츠로 전환됩니다.
   */
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  /* ── Intro 분기 ───────────────────────────────── */
  if (showIntro) {
    return <Intro onComplete={handleIntroComplete} />;
  }

  /* ── 메인 콘텐츠 ──────────────────────────────── */
  return (
    <>
      <Header />
      <main>
        <Hero />
        <IntroCategorySection />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
