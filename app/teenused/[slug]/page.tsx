import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "../../service-data";
import MobileReturnHome from "../../MobileReturnHome";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) return {};

  return {
    title: `${service.title} | Bestandem`,
    description: service.text,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  return (
    <main className="service-page">
      <header className="service-page-header shell">
        <div className="service-page-brand" aria-label="Bestandem">
          <img src="/assets/bestandem-logo-light.svg" alt="Bestandem" />
        </div>
        <nav aria-label="Alamlehe navigatsioon">
          <MobileReturnHome />
        </nav>
      </header>

      <section className="service-page-hero shell">
        <div className="service-page-title">
          <h1>{service.title}</h1>
        </div>
        <p className="service-page-lead">{service.intro}</p>
      </section>

      <section className="service-page-content shell">
        <div className="service-page-block">
          <p className="service-page-label">Mida teeme</p>
          <ul>
            {service.details.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </div>
        <div className="service-page-block service-page-block-blue">
          <p className="service-page-label">Mida see annab</p>
          <ul>
            {service.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        </div>
        <div className="service-page-contact">
          <p>Kas see teenus sobib teie projektile?</p>
          <h2>Räägime vajaduse läbi.</h2>
          <p className="service-page-contact-note">Tagasi kompetentside lehele saad päise ikoonist.</p>
        </div>
      </section>
    </main>
  );
}
