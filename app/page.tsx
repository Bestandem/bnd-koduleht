"use client";

import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { services } from "./service-data";

const competenceLinkOrder = [
  "elektripaigaldised",
  "taastuvenergia",
  "automaatika",
  "laevaehitus",
  "norkvool",
  "kait",
];
const orderedCompetences = competenceLinkOrder.map((slug) => services.find((service) => service.slug === slug)!);

const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>;
const Mail = () => <svg viewBox="0 0 32 28" aria-hidden="true">
  <rect x="3.5" y="6" width="25" height="16" rx="1.5"/>
  <path d="m4.5 7.5 11.5 8 11.5-8"/>
</svg>;
const ServiceIcon = ({ type }: { type: string }) => {
  if (type === "automation") return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="6"/><path d="M24 6v8M24 34v8M6 24h8M34 24h8M11.3 11.3l5.7 5.7M31 31l5.7 5.7M36.7 11.3 31 17M17 31l-5.7 5.7"/></svg>;
  if (type === "signal") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 34a22 22 0 0 1 32 0M14 28a14 14 0 0 1 20 0M20 22a6 6 0 0 1 8 0"/><circle cx="24" cy="38" r="2"/></svg>;
  if (type === "marine") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 7v28M17 14h14M10 24h28M12 24c0 10 5 16 12 18 7-2 12-8 12-18M8 35c4 0 4 3 8 3s4-3 8-3 4 3 8 3 4-3 8-3"/></svg>;
  if (type === "settings") return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="7"/><path d="M24 6v5M24 37v5M6 24h5M37 24h5M11.3 11.3l3.5 3.5M33.2 33.2l3.5 3.5M36.7 11.3l-3.5 3.5M14.8 33.2l-3.5 3.5"/><circle cx="24" cy="24" r="15"/></svg>;
  if (type === "renewable") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 42V23M24 31c-8 0-13-5-13-13 8 0 13 5 13 13ZM24 25c1-8 6-13 14-13 0 8-5 13-14 13Z"/><path d="M8 42h32"/></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m28 4-16 23h11l-3 17 16-24H25l3-16Z"/></svg>;
};

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileIntroExpanded, setMobileIntroExpanded] = useState(false);
  const [pageUnlocked, setPageUnlocked] = useState(false);
  const [competencesLocked, setCompetencesLocked] = useState(false);
  const [logoSurge, setLogoSurge] = useState(false);
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const storyTransitionTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => {
    if (storyTransitionTimer.current) window.clearTimeout(storyTransitionTimer.current);
    document.documentElement.classList.remove("story-transition");
  }, []);

  useEffect(() => {
    const shouldUnlock = window.location.hash !== "" && window.location.hash !== "#avaleht";
    if (shouldUnlock) setPageUnlocked(true);
    if (window.location.hash === "#teenused") setCompetencesLocked(true);
  }, []);

  useEffect(() => {
    const method = competencesLocked ? "add" : "remove";
    document.documentElement.classList[method]("competences-locked");
    document.body.classList[method]("competences-locked");
    return () => {
      document.documentElement.classList.remove("competences-locked");
      document.body.classList.remove("competences-locked");
    };
  }, [competencesLocked]);

  useEffect(() => {
    if (!competencesLocked || !window.matchMedia("(max-width: 620px)").matches) return;

    let touchStartY = 0;
    let touchStartX = 0;
    let returningHome = false;
    const returnToLanding = () => {
      if (returningHome) return;
      returningHome = true;
      setCompetencesLocked(false);
      document.documentElement.classList.remove("competences-locked");
      document.body.classList.remove("competences-locked");
      window.history.replaceState(null, "", "#avaleht");
      document.getElementById("avaleht")?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => setPageUnlocked(false), 700);
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 8) returnToLanding();
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
      event.preventDefault();
      if (verticalDistance > 45 && Math.abs(verticalDistance) > horizontalDistance) returnToLanding();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [competencesLocked]);

  useEffect(() => {
    if (!pageUnlocked || competencesLocked) return;

    let touchStartY = 0;
    let touchStartX = 0;
    let touchHandled = false;
    let returningHome = false;
    const returnToLanding = () => {
      if (returningHome) return;
      returningHome = true;
      window.history.replaceState(null, "", "#avaleht");
      document.getElementById("avaleht")?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        setPageUnlocked(false);
        document.documentElement.classList.remove("story-transition");
      }, 700);
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 8) returnToLanding();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
      touchStartX = event.touches[0]?.clientX ?? 0;
      touchHandled = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const currentX = event.touches[0]?.clientX ?? touchStartX;
      const verticalDistance = currentY - touchStartY;
      const horizontalDistance = Math.abs(currentX - touchStartX);
      event.preventDefault();
      if (verticalDistance > 45 && Math.abs(verticalDistance) > horizontalDistance) {
        touchHandled = true;
        returnToLanding();
      }
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (touchHandled) return;
      const currentY = event.changedTouches[0]?.clientY ?? touchStartY;
      const currentX = event.changedTouches[0]?.clientX ?? touchStartX;
      const verticalDistance = currentY - touchStartY;
      const horizontalDistance = Math.abs(currentX - touchStartX);
      if (verticalDistance > 45 && Math.abs(verticalDistance) > horizontalDistance) {
        returnToLanding();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [pageUnlocked, competencesLocked]);

  useEffect(() => {
    if (pageUnlocked) return;
    const desktopPointer = window.matchMedia("(min-width: 621px) and (hover: hover) and (pointer: fine)");
    if (!desktopPointer.matches) return;

    let startTimer: ReturnType<typeof setTimeout> | undefined;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;
    const scheduleEffect = () => {
      if (document.visibilityState !== "visible" || startTimer) return;
      startTimer = window.setTimeout(() => {
        startTimer = undefined;
        setLogoSurge(true);
        finishTimer = window.setTimeout(() => {
          setLogoSurge(false);
          finishTimer = undefined;
        }, 1400);
        scheduleEffect();
      }, 30000);
    };
    const restartInactivityTimer = () => {
      if (startTimer) window.clearTimeout(startTimer);
      if (finishTimer) window.clearTimeout(finishTimer);
      startTimer = undefined;
      finishTimer = undefined;
      setLogoSurge(false);
      scheduleEffect();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        restartInactivityTimer();
      } else {
        if (startTimer) window.clearTimeout(startTimer);
        if (finishTimer) window.clearTimeout(finishTimer);
        startTimer = undefined;
        finishTimer = undefined;
        setLogoSurge(false);
      }
    };

    scheduleEffect();
    window.addEventListener("mousemove", restartInactivityTimer, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", restartInactivityTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (startTimer) window.clearTimeout(startTimer);
      if (finishTimer) window.clearTimeout(finishTimer);
    };
  }, [pageUnlocked]);

  useEffect(() => {
    document.documentElement.classList.toggle("landing-locked", !pageUnlocked);
    document.body.classList.toggle("landing-locked", !pageUnlocked);
    document.documentElement.classList.toggle("subpage-locked", pageUnlocked);
    document.body.classList.toggle("subpage-locked", pageUnlocked);
    return () => {
      document.documentElement.classList.remove("landing-locked");
      document.body.classList.remove("landing-locked");
      document.documentElement.classList.remove("subpage-locked");
      document.body.classList.remove("subpage-locked");
    };
  }, [pageUnlocked]);

  useEffect(() => {
    if (!contactOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContactOpen(false);
    };
    document.body.classList.add("contact-form-open");
    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => dialogRef.current?.focus());
    return () => {
      document.body.classList.remove("contact-form-open");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [contactOpen]);

  const openContact = () => {
    setSendState("idle");
    setContactOpen(true);
  };

  const navigateTo = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    if (storyTransitionTimer.current) window.clearTimeout(storyTransitionTimer.current);
    const returningFromStory = sectionId === "avaleht" && document.documentElement.classList.contains("story-transition");
    if (sectionId === "meist") document.documentElement.classList.add("story-transition");
    else if (!returningFromStory) document.documentElement.classList.remove("story-transition");
    setCompetencesLocked(false);
    document.documentElement.classList.remove("landing-locked");
    document.body.classList.remove("landing-locked");
    document.documentElement.classList.remove("subpage-locked");
    document.body.classList.remove("subpage-locked");
    setPageUnlocked(sectionId !== "avaleht");
    window.history.replaceState(null, "", `#${sectionId}`);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        if (returningFromStory) {
          storyTransitionTimer.current = window.setTimeout(() => {
            document.documentElement.classList.remove("story-transition");
            storyTransitionTimer.current = undefined;
          }, 750);
        }
        if (sectionId === "meist" && !window.matchMedia("(max-width: 620px)").matches) {
          storyTransitionTimer.current = window.setTimeout(() => {
            document.documentElement.classList.remove("story-transition");
            storyTransitionTimer.current = undefined;
          }, 750);
        }
        if (sectionId === "teenused") {
          window.setTimeout(() => setCompetencesLocked(true), 700);
        }
      });
    });
  };

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendState("sending");
    const form = event.currentTarget;
    try {
      const response = await fetch("https://formsubmit.co/ajax/info@bestandem.ee", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("Saatmine ebaõnnestus");
      setSendState("sent");
      form.reset();
    } catch {
      setSendState("error");
    }
  };

  return <main>
    <section className="hero" id="avaleht">
      <header className="site-header shell">
        <a className={`brand ${logoSurge ? "logo-surge" : ""}`} href="#avaleht" aria-label="Bestandem avaleht"><img src="/assets/bestandem-logo.svg" alt="Bestandem"/></a>
        <nav aria-label="Põhinavigatsioon">
          <a href="#meist" onClick={(event) => navigateTo(event, "meist")}>Meie lugu</a>
          <a href="#teenused" onClick={(event) => navigateTo(event, "teenused")}>Kompetentsid</a>
          <a href="/kontakt">Kontakt</a>
        </nav>
        <button className="header-cta" type="button" onClick={openContact} aria-label="Kirjuta Bestandemile"><Mail/></button>
      </header>
      <div className="hero-grid shell">
        <div className="hero-copy">
          <h1>Me ühendame</h1>
          <p className="hero-subtitle">Elektrisüsteemide terviklahendused</p>
          <div className="hero-lead">
            <p>Olete õiges kohas, kui hindate kvaliteeti, läbimõeldud lahendusi ja usaldusväärset partnerlust.</p>
            <p>Bestandem aitab ellu viia elektrisüsteemide terviklahendusi alates esimesest ideest kuni kvaliteetse lõpptulemuseni. Tegutseme eluhoonete, tööstuse, laevaehituse, nõrkvoolusüsteemide, automaatika, käidu ja taastuvenergia valdkonnas, ühendades pikaajalise kogemuse, tehnilise pädevuse ning korrektselt dokumenteeritud lahendused.</p>
            <button
              className="mobile-intro-more"
              type="button"
              aria-expanded={mobileIntroExpanded}
              aria-controls="mobile-intro-extra"
              onClick={() => setMobileIntroExpanded(true)}
            >Loe edasi…</button>
            <div id="mobile-intro-extra" className={`hero-lead-extra${mobileIntroExpanded ? " is-expanded" : ""}`}>
              <p>Usume, et iga hästi õnnestunud projekt algab üksteise mõistmisest. Seetõttu võtame aega, et kuulata teie eesmärke, analüüsida võimalusi ning pakkuda lahendus, mis on tehniliselt läbimõeldud, töökindel ja kestab aastaid.</p>
              <p>Olgu tegemist väikese ümberehituse või mahuka tervikprojektiga – meie jaoks on iga töö võimalus tõestada, et kvaliteet sünnib teadmistest, kogemusest ja kokkulepetest kinnipidamisest.</p>
              <p>Räägime läbi, kuidas saame teie projektile väärtust luua.</p>
            </div>
          </div>
        </div>
        <div className="hero-visual hero-competences">
          <img src="/assets/hero-competences.jpg" alt="Abstraktne visuaal Bestandemi kompetentsidest: elektripaigaldised, automaatika, laevaehitus, nõrkvoolusüsteemid ja taastuvenergia"/>
          <div className="badge"><span>Kogemus</span><small>aastast</small><strong>2013</strong></div>
        </div>
      </div>
      <div className="hero-footer shell">
        {orderedCompetences.map((service) =>
          <a key={service.slug} href={`/teenused/${service.slug}`}>
            {service.title}
          </a>
        )}
      </div>
    </section>

    <section className="services" id="teenused">
      <div className="services-page-header shell">
        <a className="services-home-link" href="#avaleht" onClick={(event) => navigateTo(event, "avaleht")} aria-label="Bestandem – tagasi esilehele">
          <picture>
            <source media="(max-width: 620px)" srcSet="/assets/bestandem-logo.svg" />
            <img src="/assets/bestandem-logo-light.svg" alt="Bestandem"/>
          </picture>
        </a>
        <a className="section-home-button" href="#avaleht" onClick={(event) => navigateTo(event, "avaleht")} aria-label="Tagasi esilehele">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M5 14.5 16 5l11 9.5" />
            <path d="M8.5 13v13h15V13M13 26v-8h6v8" />
          </svg>
        </a>
      </div>
      <div className="services-inner shell">
        <div className="section-heading">
          <div><h2>Kompetentsid</h2></div>
          <p>Ühendame elektri, automaatika ja tehnilised erilahendused üheks toimivaks süsteemiks. Üks partner tähendab selgemat vastutust, ladusamat koostööd ja kindlamat lõpptulemust.</p>
        </div>
        <div className="service-grid">
          {orderedCompetences.map((service) => <article className="service-card" id={service.slug} key={service.slug}>
            <div className="service-card-top">
              <div className="service-icon"><ServiceIcon type={service.icon}/></div>
            </div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <ul>{service.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            <a href={`/teenused/${service.slug}`} aria-label={`Ava kompetentsi ${service.title} alamleht`}>Vaata teenust <Arrow/></a>
          </article>)}
        </div>
      </div>
      <div className="services-footer-line shell" aria-hidden="true" />
    </section>

    <section className="trust" id="meist">
      <header className="trust-page-header shell">
        <a className="trust-home-link" href="#avaleht" onClick={(event) => navigateTo(event, "avaleht")} aria-label="Bestandem – tagasi esilehele">
          <img src="/assets/bestandem-logo.svg" alt="Bestandem"/>
        </a>
        <a className="section-home-button trust-home-button" href="#avaleht" onClick={(event) => navigateTo(event, "avaleht")} aria-label="Tagasi esilehele">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M5 14.5 16 5l11 9.5" />
            <path d="M8.5 13v13h15V13M13 26v-8h6v8" />
          </svg>
        </a>
      </header>
      <div className="trust-grid shell">
        <div className="trust-title"><p className="eyebrow"><span/> Meie põhimõte</p><h2>Tehniline täpsus.<br/><em>Inimlik koostöö.</em></h2></div>
        <div className="trust-copy">
          <p>Hea tehnosüsteem ei nõua tähelepanu - see lihtsalt töötab. Bestandem ühendab praktilise kogemuse, läbimõeldud lahendused ja selge suhtluse.</p>
        </div>
      </div>
      <div className="trust-footer-line shell" aria-hidden="true" />
    </section>

    <section className="contact" id="kontakt"><div className="contact-inner shell">
      <div><p className="eyebrow dark"><span/> Alustame</p><h2>Teil on projekt.<br/>Meil on lahendus.</h2></div>
      <div className="contact-actions"><button className="button button-dark" type="button" onClick={openContact}>Kirjuta meile <Arrow/></button><a className="phone" href="tel:+3725213533">+372 521 3533</a></div>
    </div></section>

    <footer><div className="footer-inner shell">
      <img src="/assets/bestandem-logo.svg" alt="Bestandem"/>
      <p>Elektri-, automaatika- ja nõrkvoolusüsteemide terviklahendused.</p>
      <div className="meta"><span>Bestandem OÜ</span><span>Reg nr 12539336</span><span>Saaremaa</span></div>
    </div></footer>

    {contactOpen && <div className="letter-overlay" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setContactOpen(false);
    }}>
      <div className={`letter-dialog ${sendState === "sent" ? "is-sent" : ""}`} role="dialog" aria-modal="true" aria-labelledby="contact-title" tabIndex={-1} ref={dialogRef}>
        <button className="letter-close" type="button" onClick={() => setContactOpen(false)} aria-label="Sulge kontaktivorm">×</button>
        <div className="envelope-back" aria-hidden="true"/>
        <div className="envelope-flap" aria-hidden="true"/>
        <div className="letter-sheet">
          {sendState === "sent" ? <div className="letter-success" role="status">
            <span className="success-mark">✓</span>
            <h2>Kiri on teele pandud</h2>
            <p>Aitäh! Võtame teiega esimesel võimalusel ühendust.</p>
            <button className="button button-dark" type="button" onClick={() => setContactOpen(false)}>Sulge</button>
          </div> : <>
            <p className="letter-kicker">Kirjutage meile</p>
            <h2 id="contact-title">Räägime teie projektist</h2>
            <form onSubmit={sendMessage}>
              <input type="hidden" name="_subject" value="Uus päring Bestandemi kodulehelt"/>
              <input type="hidden" name="_template" value="table"/>
              <input className="form-trap" type="text" name="_honey" tabIndex={-1} autoComplete="off"/>
              <div className="form-row">
                <label>Nimi<input name="Nimi" type="text" autoComplete="name" required/></label>
                <label>E-post<input name="E-post" type="email" autoComplete="email" required/></label>
              </div>
              <label>Telefon <span>(soovi korral)</span><input name="Telefon" type="tel" autoComplete="tel"/></label>
              <label>Sõnum<textarea name="Sõnum" rows={5} required/></label>
              <div className="form-footer">
                <p>Saates nõustute, et kasutame sisestatud andmeid teie päringule vastamiseks.</p>
                <button className="button form-submit" type="submit" disabled={sendState === "sending"}>
                  {sendState === "sending" ? "Saadan…" : "Saada"} <Arrow/>
                </button>
              </div>
              {sendState === "error" && <p className="form-error" role="alert">Kirja saatmine ei õnnestunud. Proovige uuesti või helistage numbril +372 521 3533.</p>}
            </form>
          </>}
        </div>
        <div className="envelope-front" aria-hidden="true"><span>@</span></div>
      </div>
    </div>}
  </main>;
}
