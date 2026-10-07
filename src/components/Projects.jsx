function Projects() {
  const projects = [
    {
      number: '01',
      category: 'DATA ANALYTICS',
      title: 'Retail Sales Intelligence',
      description:
        'A data analytics solution designed to uncover sales trends, product performance, customer behaviour, and revenue opportunities.'
    },
    {
      number: '02',
      category: 'BUSINESS INTELLIGENCE',
      title: 'Workforce Analytics',
      description:
        'An analytical solution designed to transform workforce data into insights around performance, trends, and operational efficiency.'
    },
    {
      number: '03',
      category: 'DATA VISUALIZATION',
      title: 'Business Performance Dashboard',
      description:
        'An interactive dashboard designed to give decision-makers a clear view of business performance through meaningful data visualizations.'
    }
  ]

  return (
    <section className="projects" id="projects">
      <div className="section-heading">
        <p>SELECTED WORK</p>
        <h2>Our Projects</h2>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <div className="project-number">
              {project.number}
            </div>

            <div className="project-content">
              <p>{project.category}</p>
              <h3>{project.title}</h3>
              <span>{project.description}</span>

              <a href="#">
                View Project →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects