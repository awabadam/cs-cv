"use client";

import { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import InkParticles, { type InkParticlesHandle } from "@/components/InkParticles";
import PageNav from "@/components/PageNav";
import CoverPage from "@/components/pages/CoverPage";
import StoryPage from "@/components/pages/StoryPage";
import ExperiencePage from "@/components/pages/ExperiencePage";
import ExpertisePage from "@/components/pages/ExpertisePage";
import CaseStudiesPage from "@/components/pages/CaseStudiesPage";
import ContactPage from "@/components/pages/ContactPage";
import { pageLabels, PAGE_COUNT } from "@/data/content";
import { usePaperSound } from "@/components/PaperSound";
import FallingParticles from "@/components/FallingParticles";

export default function Page() {
  return (
    <Suspense>
      <HorizontalCV />
    </Suspense>
  );
}

function HorizontalCV() {
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isAnimating, setIsAnimating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<InkParticlesHandle>(null);
  const currentPageRef = useRef(initialPage);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const getPageStyle = useCallback(
    (index: number) => {
      const diff = index - currentPage;
      if (diff === 0)
        return { transform: "rotateY(0deg) scale(1)", filter: "brightness(1)" };
      const absDiff = Math.abs(diff);
      return {
        transform: `rotateY(${Math.sign(diff) * Math.min(absDiff * 2.5, 6)}deg) scale(${1 - absDiff * 0.02})`,
        filter: `brightness(${1 - absDiff * 0.04})`,
      };
    },
    [currentPage]
  );

  const playPaper = usePaperSound();

  const goToPage = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, PAGE_COUNT - 1));
    if (clamped === currentPageRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setCurrentPage(clamped);
    currentPageRef.current = clamped;
    particlesRef.current?.burst(window.innerWidth / 2, window.innerHeight / 2);
    playPaper();
    setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 900);
  }, [playPaper]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      if (isAnimatingRef.current) return;
      goToPage(currentPageRef.current + (e.deltaY > 0 ? 1 : -1));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToPage(currentPageRef.current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToPage(currentPageRef.current - 1);
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        goToPage(currentPageRef.current + (dx < 0 ? 1 : -1));
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goToPage]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <InkParticles ref={particlesRef} />
      <FallingParticles />

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 h-[1px] bg-ink z-[51]" style={{
        width: `${(currentPage / (PAGE_COUNT - 1)) * 100}%`,
        transition: "width 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
      }} />

      <div ref={wrapperRef} className="page-scroller">
        <div
          className="page-track"
          style={{ transform: `translateX(-${currentPage * 100}vw)` }}
        >
          <CoverPage isActive={currentPage === 0} style={getPageStyle(0)} today={today} />
          <StoryPage isActive={currentPage === 1} style={getPageStyle(1)} />
          <ExperiencePage isActive={currentPage === 2} style={getPageStyle(2)} />
          <ExpertisePage isActive={currentPage === 3} style={getPageStyle(3)} />
          <CaseStudiesPage isActive={currentPage === 4} style={getPageStyle(4)} />
          <ContactPage isActive={currentPage === 5} style={getPageStyle(5)} />

        </div>

        {/* Paper grain texture — stays fixed */}
        <div className="grain-overlay" />

        {/* Window light overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
          mixBlendMode: 'multiply',
          background: `
            linear-gradient(125deg, rgba(20,18,10,0.22) 0%, rgba(20,18,10,0.10) 22%, transparent 38%, transparent 62%, rgba(20,18,10,0.08) 78%, rgba(20,18,10,0.18) 100%),
            radial-gradient(ellipse 50% 50% at 0% 100%, rgba(20,18,10,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 0% 0%, rgba(20,18,10,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 100% 100%, rgba(20,18,10,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 75% 75% at 55% 35%, transparent 20%, rgba(20,18,10,0.20) 100%)
          `,
        }} />
      </div>

      <PageNav currentPage={currentPage} goToPage={goToPage} pageLabels={pageLabels} PAGE_COUNT={PAGE_COUNT} />
    </>
  );
}
