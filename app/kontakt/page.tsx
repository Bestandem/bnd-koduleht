import type { Metadata } from "next";
import ContactMobileViews from "./ContactMobileViews";
import MobileReturnHome from "../MobileReturnHome";

export const metadata: Metadata = {
  title: "Kontakt | Bestandem",
  description: "Bestandem OÜ kontaktisikud, aadressid ja rekvisiidid.",
};

const contacts = [
  {
    name: "Valdo Saar",
    email: "valdo@bestandem.ee",
    phone: "+372 521 3533",
    phoneHref: "+3725213533",
  },
  {
    name: "Henry Õun",
    email: "henry@bestandem.ee",
    phone: "+372 5624 4935",
    phoneHref: "+37256244935",
  },
  {
    name: "Karel Kuningas",
    email: "karel@bestandem.ee",
    phone: "+372 5347 1212",
    phoneHref: "+37253471212",
  },
];

export default function ContactPage() {
  return (
    <main className="contact-page">
      <MobileReturnHome />
      <header className="contact-page-header shell">
        <a className="contact-page-brand" href="/#avaleht" data-home-transition="down" aria-label="Bestandem – tagasi esilehele">
          <picture>
            <source media="(max-width: 620px)" srcSet="/assets/bestandem-logo.svg" />
            <img src="/assets/bestandem-logo-light.svg" alt="Bestandem" />
          </picture>
        </a>
        <a className="section-home-button" href="/#avaleht" data-home-transition="down" aria-label="Tagasi esilehele">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M5 14.5 16 5l11 9.5" />
            <path d="M8.5 13v13h15V13M13 26v-8h6v8" />
          </svg>
        </a>
      </header>

      <div className="contact-page-content">
        <ContactMobileViews />
        <div className="contact-desktop-content">
        <section className="contact-mobile-section contact-section-people" id="kontaktisikud">
          <div className="contact-page-intro shell">
            <h1>Kontaktid</h1>
            <p>Kirjuta või helista otse sobivale kontaktisikule.</p>
          </div>

          <div className="contact-people shell" aria-label="Kontaktisikud">
            {contacts.map((contact) => (
              <article className="contact-person" key={contact.email}>
                <span className="contact-person-mark" aria-hidden="true" />
                <h2>{contact.name}</h2>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
              </article>
            ))}
          </div>

          <a className="contact-scroll-button" href="#aadressid" aria-label="Liigu aadresside juurde">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path d="M16 5v20" />
              <path d="m8 18 8 8 8-8" />
            </svg>
          </a>
        </section>

        <section className="contact-mobile-section contact-section-addresses" id="aadressid">
          <h2 className="contact-mobile-title shell">Aadressid</h2>
          <div className="contact-details contact-address-cards shell">
          <article className="contact-detail-card">
            <p className="contact-detail-label">Kontaktaadress</p>
            <h2>Pikk 64e</h2>
            <p>93815 Kuressaare<br />Saaremaa vald</p>
            <a
              className="contact-map-link"
              href="https://www.google.com/maps/search/?api=1&query=58.269855511313985%2C22.49065157919774"
              target="_blank"
              rel="noreferrer"
            >
              Ava Google Mapsis <span aria-hidden="true">↗</span>
            </a>
          </article>

          <article className="contact-detail-card">
            <p className="contact-detail-label">Juriidiline aadress</p>
            <h2>Mäe</h2>
            <p>93839 Suur-Randvere<br />Saaremaa vald</p>
          </article>

          </div>
          <a className="contact-scroll-button" href="#rekvisiidid" aria-label="Liigu rekvisiitide juurde">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path d="M16 5v20" />
              <path d="m8 18 8 8 8-8" />
            </svg>
          </a>
        </section>

        <section className="contact-mobile-section contact-section-requisites" id="rekvisiidid">
          <h2 className="contact-mobile-title shell">Rekvisiidid</h2>
          <div className="contact-details contact-requisite-cards shell">
            <article className="contact-detail-card contact-bank-card">
            <p className="contact-detail-label">Rekvisiidid</p>
            <div className="contact-requisites">
              <strong>Bestandem OÜ</strong>
              <span>Registrikood 12539336</span>
              <span>KMKR EE101730415</span>
            </div>
            <div className="bank-row">
              <span>Swedbank</span>
              <strong>EE372200221058242453</strong>
            </div>
            <div className="bank-row">
              <span>LHV Pank</span>
              <strong>EE207700771003446505</strong>
            </div>
            </article>
          </div>
          <a className="contact-scroll-button contact-scroll-up" href="#kontaktisikud" aria-label="Tagasi kontaktide juurde">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path d="M16 27V7" />
              <path d="m8 14 8-8 8 8" />
            </svg>
          </a>
        </section>

        <section className="contact-details contact-details-desktop shell" aria-label="Aadressid ja rekvisiidid">
          <article className="contact-detail-card">
            <p className="contact-detail-label">Kontaktaadress</p>
            <h2>Pikk 64e</h2>
            <p>93815 Kuressaare<br />Saaremaa vald</p>
            <a className="contact-map-link" href="https://www.google.com/maps/search/?api=1&query=58.269855511313985%2C22.49065157919774" target="_blank" rel="noreferrer">
              Ava Google Mapsis <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article className="contact-detail-card">
            <p className="contact-detail-label">Juriidiline aadress</p>
            <h2>Mäe</h2>
            <p>93839 Suur-Randvere<br />Saaremaa vald</p>
          </article>
          <article className="contact-detail-card contact-bank-card">
            <p className="contact-detail-label">Rekvisiidid</p>
            <div className="contact-requisites">
              <strong>Bestandem OÜ</strong>
              <span>Registrikood 12539336</span>
              <span>KMKR EE101730415</span>
            </div>
            <div className="bank-row"><span>Swedbank</span><strong>EE372200221058242453</strong></div>
            <div className="bank-row"><span>LHV Pank</span><strong>EE207700771003446505</strong></div>
          </article>
        </section>
        </div>
      </div>
      <div className="contact-page-footer-line shell" aria-hidden="true" />
    </main>
  );
}
