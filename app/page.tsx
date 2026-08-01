const services = [
  ["01", "Elektrisüsteemid", "Läbimõeldud elektripaigaldised projekteerimisest teostuseni - turvaliselt, korrektselt ja kestvalt."],
  ["02", "Automaatika", "Juhtimis- ja automaatikalahendused, mis panevad hoone tehnosüsteemid ühtse tervikuna tööle."],
  ["03", "Nõrkvool", "Side-, valve- ja läbipääsusüsteemid, mille toimivus on sama oluline kui nende nähtamatus."],
];

const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>;
const Bolt = () => <svg viewBox="0 0 36 52" aria-hidden="true"><path d="M22 0 2 30h13L11 52l23-31H21L22 0Z"/></svg>;
const Mail = () => <svg viewBox="0 0 28 28" aria-hidden="true"><rect x="3.5" y="6" width="21" height="16" rx="1.5"/><path d="m4.5 7.5 9.5 8 9.5-8"/><rect className="mail-at-bg" x="9.2" y="11.5" width="9.6" height="9" rx="1"/><text x="14" y="19">@</text></svg>;

export default function Home() {
  return <main>
    <section className="hero" id="avaleht">
      <header className="site-header shell">
        <a className="brand" href="#avaleht" aria-label="Bestandem avaleht"><img src="/assets/bestandem-logo.svg" alt="Bestandem"/></a>
        <nav aria-label="Põhinavigatsioon"><a href="#meist">Meist</a><a href="#teenused">Teenused</a><a href="#kontakt">Kontakt</a></nav>
        <a className="header-cta" href="mailto:info@bestandem.ee" aria-label="Saada Bestandemile e-kiri"><Mail/></a>
      </header>
      <div className="hero-grid shell">
        <div className="hero-copy">
          <h1>Me ühendame</h1>
          <p className="hero-lead">Elektrisüsteemide terviklahendused</p>
          <div className="hero-actions">
            <a className="button primary" href="mailto:info@bestandem.ee">Räägime teie projektist <Arrow/></a>
            <a className="text-link" href="#teenused">Vaata teenuseid</a>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/assets/hero-competences.png" alt="Bestandem kompetentside abstraktne visuaal"/>
          <div className="shade"/>
          <div className="badge"><span>Alates</span><strong>2013</strong><small>Saaremaal</small></div>
        </div>
      </div>
      <div className="hero-footer shell">
        {["Elektripaigaldised", "Automaatika", "Nõrkvool", "Laevaehitus", "Käit", "Taastuvenergia"].map((field) =>
          <p key={field}>{field}</p>
        )}
      </div>
    </section>

    <section className="services shell" id="teenused">
      <div className="section-heading">
        <div><p className="eyebrow dark"><span/> Mida me teeme</p><h2>Üks partner.<br/>Terviklik lahendus.</h2></div>
        <p>Võtame vastutuse kogu tehnilise lahenduse eest. Nii on vähem vahepealseid lülisid, selgem koostöö ja kindlam lõpptulemus.</p>
      </div>
      <div className="service-grid">
        {services.map(([number,title,text]) => <article className="service-card" key={number}>
          <div className="number">{number}</div><div className="service-icon"><Bolt/></div>
          <h3>{title}</h3><p>{text}</p><a href="#kontakt">Küsi lähemalt <Arrow/></a>
        </article>)}
      </div>
    </section>

    <section className="trust" id="meist">
      <div className="trust-grid shell">
        <div className="trust-title"><p className="eyebrow"><span/> Meie põhimõte</p><h2>Tehniline täpsus.<br/><em>Inimlik koostöö.</em></h2></div>
        <div className="trust-copy">
          <p>Hea tehnosüsteem ei nõua tähelepanu - see lihtsalt töötab. Bestandem ühendab praktilise kogemuse, läbimõeldud lahendused ja selge suhtluse.</p>
          <div className="points"><div><strong>01</strong><span>Üks vastutav partner</span></div><div><strong>02</strong><span>Lahendus vajaduse järgi</span></div><div><strong>03</strong><span>Korralik teostus ja dokumentatsioon</span></div></div>
        </div>
      </div>
    </section>

    <section className="contact" id="kontakt"><div className="contact-inner shell">
      <div><p className="eyebrow dark"><span/> Alustame</p><h2>Teil on projekt.<br/>Meil on lahendus.</h2></div>
      <div className="contact-actions"><a className="button button-dark" href="mailto:info@bestandem.ee">info@bestandem.ee <Arrow/></a><a className="phone" href="tel:+3725213533">+372 521 3533</a></div>
    </div></section>

    <footer><div className="footer-inner shell">
      <img src="/assets/bestandem-logo.svg" alt="Bestandem"/>
      <p>Elektri-, automaatika- ja nõrkvoolusüsteemide terviklahendused.</p>
      <div className="meta"><span>Bestandem OÜ</span><span>Reg nr 12539336</span><span>Saaremaa</span></div>
    </div></footer>
  </main>;
}
