function Services() {
  const services = [
    {
      number: '01',
      title: 'Data Analytics',
      description:
        'We transform raw data into meaningful insights that reveal trends, patterns, and opportunities.'
    },
    {
      number: '02',
      title: 'Business Intelligence',
      description:
        'We turn business data into clear intelligence that supports smarter and more informed decisions.'
    },
    {
      number: '03',
      title: 'Software Solutions',
      description:
        'We design and develop practical digital solutions that solve real business problems.'
    },
    {
      number: '04',
      title: 'Data Visualization',
      description:
        'We create interactive dashboards and visual experiences that make complex information easier to understand.'
    }
  ]

  return (
    <section className="services" id="services">
      <div className="section-heading">
        <p>WHAT WE DO</p>
        <h2>Our Services</h2>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <article className="service-card" key={service.number}>
            <span>{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Services