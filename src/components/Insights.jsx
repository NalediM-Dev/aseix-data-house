function Insights() {
  const insights = [
    {
      number: '01',
      category: 'DATA INSIGHT',
      title: 'Why Data Matters in Modern Business',
      description:
        'Understanding how businesses can use data to uncover opportunities, improve performance, and make smarter decisions.'
    },
    {
      number: '02',
      category: 'BUSINESS INTELLIGENCE',
      title: 'Turning Business Data Into Intelligence',
      description:
        'Exploring how meaningful business intelligence can help organisations understand what is happening and why.'
    },
    {
      number: '03',
      category: 'DATA ANALYTICS',
      title: 'From Raw Data to Actionable Insights',
      description:
        'A look at the process of transforming raw information into insights that can support real-world decisions.'
    }
  ]

  return (
    <section className="insights" id="insights">
      <div className="section-heading">
        <p>ASEIX INTELLIGENCE</p>
        <h2>Insights</h2>
      </div>

      <div className="insights-grid">
        {insights.map((insight) => (
          <article className="insight-card" key={insight.number}>
            <div className="insight-top">
              <span>{insight.number}</span>
              <span>{insight.category}</span>
            </div>

            <div className="insight-content">
              <h3>{insight.title}</h3>

              <p>{insight.description}</p>

              <a href="#">
                Read Insight →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Insights