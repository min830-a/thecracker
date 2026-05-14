import { useState, useEffect } from 'react';

/**
 * 현재 뷰포트에서 가장 많이 보이는 섹션 id를 반환
 * Header의 active 메뉴 표시에 사용
 */
export function useScrollSpy(sectionIds: string[], offset = 100): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // 스크롤이 맨 아래에 도달하면 마지막 섹션 활성화
      const scrollBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

      if (scrollBottom) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      // 각 섹션의 top 위치 기준으로 현재 활성 섹션 결정
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset) {
          current = id;
        }
      }

      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}
