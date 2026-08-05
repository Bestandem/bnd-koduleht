"use client";

import { useState } from "react";

type ContactView = "contacts" | "address" | "requisites";

const contacts = [
  { name: "Valdo Saar", email: "valdo@bestandem.ee", phone: "+372 521 3533", phoneHref: "+3725213533" },
  { name: "Henry Õun", email: "henry@bestandem.ee", phone: "+372 5624 4935", phoneHref: "+37256244935" },
  { name: "Karel Kuningas", email: "karel@bestandem.ee", phone: "+372 5347 1212", phoneHref: "+37253471212" },
];

const labels: Record<ContactView, string> = {
  contacts: "Kontaktid",
  address: "Aadress",
  requisites: "Rekvisiidid",
};

export default function ContactMobileViews() {
  const [activeView, setActiveView] = useState<ContactView>("contacts");
  const otherViews = (Object.keys(labels) as ContactView[]).filter((view) => view !== activeView);

  return (
    <div className="contact-mobile-views">
      <section className="contact-mobile-panel" aria-labelledby={`contact-title-${activeView}`}>
        {activeView === "contacts" && <>
          <div className="contact-page-intro">
            <h1 id="contact-title-contacts">Kontaktid</h1>
            <p>Kirjuta või helista otse sobivale kontaktisikule.</p>
          </div>
          <div className="contact-people" aria-label="Kontaktisikud">
            {contacts.map((contact) => <article className="contact-person" key={contact.email}>
              <span className="contact-person-mark" aria-hidden="true" />
              <h2>{contact.name}</h2>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            </article>)}
          </div>
        </>}

        {activeView === "address" && <>
          <h1 className="contact-mobile-view-title" id="contact-title-address">Aadress</h1>
          <div className="contact-details contact-address-cards">
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
          </div>
        </>}

        {activeView === "requisites" && <>
          <h1 className="contact-mobile-view-title" id="contact-title-requisites">Rekvisiidid</h1>
          <div className="contact-details contact-requisite-cards">
            <article className="contact-detail-card contact-bank-card">
              <div className="contact-requisites">
                <strong>Bestandem OÜ</strong>
                <span>Registrikood 12539336</span>
                <span>KMKR EE101730415</span>
              </div>
              <div className="bank-row"><span>Swedbank</span><strong>EE372200221058242453</strong></div>
              <div className="bank-row"><span>LHV Pank</span><strong>EE207700771003446505</strong></div>
            </article>
          </div>
        </>}
      </section>

      <nav className="contact-mobile-switcher" aria-label="Kontaktilehe vaated">
        {otherViews.map((view) => (
          <button type="button" key={view} onClick={() => setActiveView(view)}>{labels[view]}</button>
        ))}
      </nav>
    </div>
  );
}
