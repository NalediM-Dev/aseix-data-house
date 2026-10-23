import './Pricing.css'

const pricingServices = [
  {
    number: '01',
    title: 'Data Analytics & Reporting',
    price: 'R1,250',
    description:
      'Turn your business data into clear findings that support better decisions.',
    features: [
      'One supplied dataset of up to 1,000 rows',
      'Basic data cleaning and validation',
      'Analysis of up to five agreed business questions',
      'Concise findings and recommendations report',
      'One round of revisions',
    ],
    note: 'Multiple datasets and recurring reports are quoted separately.',
  },
  {
    number: '02',
    title: 'Business Intelligence & Dashboards',
    price: 'R2,500',
    description:
      'Understand your business performance through a clear, visual dashboard.',
    features: [
      'One dashboard using one agreed data source',
      'Up to five agreed key performance indicators (KPIs)',
      'Relevant charts, tables and summaries',
      'A short explanation of key findings',
      'One round of revisions',
    ],
    note: 'Automated refreshes, integrations and ongoing maintenance are quoted separately.',
    featured: true,
  },
  {
    number: '03',
    title: 'Data Visualization',
    price: 'R950',
    description:
      'Make important business information easier to understand and communicate.',
    features: [
      'Up to three tailored charts or visualizations',
      'One supplied, analysis-ready dataset',
      'Clear labels, titles and formatting',
      'A short explanation of the visual insights',
      'One round of revisions',
    ],
    note: 'Extensive data cleaning and full interactive dashboards are quoted separately.',
  },
  {
    number: '04',
    title: 'Software Solutions',
    price: 'R4,500',
    description:
      'Establish a professional online presence with a responsive business website.',
    features: [
      'A responsive website of up to three pages',
      'A consistent design based on your branding',
      'Contact links and email integration',
      'Basic page titles and metadata',
      'Two rounds of revisions',
    ],
    note: 'E-commerce, booking systems, hosting, domains and other external costs are excluded unless quoted.',
  },
]

function Pricing() {
  return (
    <main className="pricing-page">
      <section className="pricing-hero">
<div className="pricing-back">
  <a href="/">← Back to ASEIX</a>
</div>

        <p className="pricing-eyebrow">ASEIX DATA HOUSE / PRICING</p>

        <h1>
          Transparent Pricing.
          <br />
          <span>Tailored Solutions.</span>
        </h1>

        <p className="pricing-intro">
          Practical data, business intelligence and technology services
          designed to help small businesses and startups make informed
          decisions and work smarter.
        </p>

        <p className="pricing-subtext">
          Every service has a clear starting price. Your final quotation will
          depend on your requirements, project complexity and agreed
          deliverables.
        </p>
      </section>

      <section className="pricing-services" aria-labelledby="pricing-heading">
        <div className="pricing-section-heading">
          <div>
            <p className="pricing-eyebrow">OUR SERVICES</p>
            <h2 id="pricing-heading">
              Invest in <span>better decisions.</span>
            </h2>
          </div>

          <p className="pricing-currency">
            All prices in South African rand (ZAR)
          </p>
        </div>

        <div className="pricing-grid">
          {pricingServices.map((service) => (
            <article
              className={`pricing-card ${
                service.featured ? 'pricing-card-featured' : ''
              }`}
              key={service.number}
            >
              <div className="pricing-card-top">
                <span className="pricing-number">{service.number}</span>

                {service.featured && (
                  <span className="pricing-badge">POPULAR CHOICE</span>
                )}
              </div>

              <h3>{service.title}</h3>

              <p className="pricing-description">{service.description}</p>

              <div className="pricing-price">
                <span>Starting from</span>
                <strong>{service.price}</strong>
              </div>

              <div className="pricing-includes">
                <p>WHAT'S INCLUDED</p>

                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <span aria-hidden="true">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="pricing-note">{service.note}</p>

              <a
                className="pricing-cta"
                href={`mailto:aseix.datahouse@gmail.com?subject=${encodeURIComponent(
                  `Quote Request - ${service.title}`
                )}&body=${encodeURIComponent(
                  `Hello ASEIX DATA HOUSE,\n\nI would like to request a quotation for ${service.title}.\n\nPlease let me know what information you need from me.\n\nKind regards`
                )}`}
              >
                Request a Quote <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-process">
        <p className="pricing-eyebrow">HOW IT WORKS</p>
        <h2>Simple. Clear. <span>Built around you.</span></h2>

        <div className="pricing-steps">
          <article>
            <span>01</span>
            <h3>Tell us what you need</h3>
            <p>
              Share your business challenge, goals and the service you are
              interested in.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Receive your quotation</h3>
            <p>
              We assess the scope and provide a tailored quote with agreed
              deliverables and pricing.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Approve and get started</h3>
            <p>
              Work begins once the scope, price, timeline and payment
              arrangements have been agreed.
            </p>
          </article>
        </div>
      </section>

      <section className="pricing-contact">
        <p className="pricing-eyebrow">HAVE A PROJECT IN MIND?</p>
        <h2>
          Let's find the right <span>solution.</span>
        </h2>
        <p>
          Not sure which service fits your needs? Tell us about your business
          and we'll help you identify a suitable starting point.
        </p>

        <a
          className="pricing-cta pricing-contact-cta"
          href="mailto:aseix.datahouse@gmail.com?subject=ASEIX%20DATA%20HOUSE%20Enquiry"
        >
          Discuss Your Project <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="pricing-footer">
        <p>© {new Date().getFullYear()} ASEIX DATA HOUSE</p>
        <p>DATA · TECHNOLOGY · INTELLIGENCE</p>
      </footer>

      <p className="pricing-disclaimer">
        Prices shown are starting prices, not guaranteed final fees. A written
        quotation will confirm the scope, deliverables, timeline and total
        cost before work begins. Hosting, third-party subscriptions and other
        external costs are excluded unless stated in the quotation.
      </p>
    </main>
  )
}

export default Pricing
