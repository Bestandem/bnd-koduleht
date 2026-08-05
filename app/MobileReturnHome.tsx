"use client";

import { MouseEvent, useEffect } from "react";

export default function MobileReturnHome() {
  const returnToCompetences = (event?: MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();
    if (window.matchMedia("(max-width: 620px)").matches) {
      sessionStorage.setItem("bnd-home-transition-down", "1");
    }
    window.location.assign("/#teenused");
  };

  useEffect(() => {
    let touchStartY = 0;
    let touchStartX = 0;
    let returningToCompetences = false;

    const returnToCompetences = () => {
      if (returningToCompetences) return;
      returningToCompetences = true;
      if (window.matchMedia("(max-width: 620px)").matches) {
        sessionStorage.setItem("bnd-home-transition-down", "1");
      }
      window.location.assign("/#teenused");
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY < -8) returnToCompetences();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
      touchStartX = event.touches[0]?.clientX ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const currentX = event.touches[0]?.clientX ?? touchStartX;
      const verticalDistance = currentY - touchStartY;
      const horizontalDistance = Math.abs(currentX - touchStartX);

      // Alamlehelt ei tohi kerides järgmisele lehele liikuda.
      event.preventDefault();

      // Kompetentside lehele naasmiseks liigub sõrm allapoole.
      if (verticalDistance > 45 && Math.abs(verticalDistance) > horizontalDistance) {
        returnToCompetences();
      }
    };

    document.documentElement.classList.add("subpage-route-locked");
    document.body.classList.add("subpage-route-locked");
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.documentElement.classList.remove("subpage-route-locked");
      document.body.classList.remove("subpage-route-locked");
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <a
      className="section-home-button service-return-button"
      href="/#teenused"
      onClick={returnToCompetences}
      aria-label="Tagasi kompetentside lehele"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 14.5 16 5l11 9.5" />
        <path d="M8.5 13v13h15V13" />
      </svg>
    </a>
  );
}
