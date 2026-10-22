import { useEffect, useState } from 'react'

function RetailSalesIntelligence() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/data/retail_dashboard.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load dashboard data')
        }

        return response.json()
      })
      .then((data) => {
        setDashboardData(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      maximumFractionDigits: 0,
    }).format(value)

  const summary = dashboardData?.summary

  const maxProductSales = Math.max(
  ...(dashboardData?.salesByProduct ?? []).map((item) => item.sales),
  1
)

const maxProductProfit = Math.max(
  ...(dashboardData?.profitByProduct ?? []).map((item) => item.profit),
  1
)

const maxProvinceSales = Math.max(
  ...(dashboardData?.salesByProvince ?? []).map((item) => item.sales),
  1
)

const maxSegmentSales = Math.max(
  ...(dashboardData?.salesBySegment ?? []).map((item) => item.sales),
  1
)

const topSalesProduct = [...(dashboardData?.salesByProduct ?? [])]
  .sort((a, b) => b.sales - a.sales)[0]

const topProfitProduct = [...(dashboardData?.profitByProduct ?? [])]
  .sort((a, b) => b.profit - a.profit)[0]

const leadingProvince = [...(dashboardData?.salesByProvince ?? [])]
  .sort((a, b) => b.sales - a.sales)[0]

const peakSalesMonth = [...(dashboardData?.monthlySales ?? [])]
  .sort((a, b) => b.sales - a.sales)[0]

  return (
    <main className="case-study">

      <section className="case-study-hero">
        <p>ASEIX DATA HOUSE • DATA ANALYTICS</p>

        <h1>
          Retail Sales
          <span>Intelligence.</span>
        </h1>

        <p>
          Turning retail data into meaningful business
          intelligence that supports better decisions.
        </p>
      </section>

      <section className="case-study-overview">
        <p>PROJECT OVERVIEW</p>

        <h2>
          Understanding the numbers behind
          retail performance.
        </h2>

        <p>
          This portfolio project uses a synthetic retail dataset
          to demonstrate how sales information can be transformed
          into insights about revenue, profitability, products,
          customers, and regional performance.
        </p>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-heading">
          <p>RETAIL PERFORMANCE</p>
          <h2>Business at a glance.</h2>
          <span>
            An overview of performance across the 2025 sample dataset.
          </span>
        </div>

        {loading && (
          <p className="dashboard-message">
            Loading retail analytics...
          </p>
        )}

        {error && (
          <p className="dashboard-message">
            We couldn't load the dashboard data. Please refresh the page.
          </p>
        )}

        {summary && (
          <>
            <div className="kpi-grid">
              <article className="kpi-card">
                <span>TOTAL SALES</span>
                <h3>{formatCurrency(summary.totalSales)}</h3>
                <p>Revenue generated</p>
              </article>

              <article className="kpi-card">
                <span>TOTAL PROFIT</span>
                <h3>{formatCurrency(summary.totalProfit)}</h3>
                <p>Profit after recorded costs</p>
              </article>

              <article className="kpi-card">
                <span>PROFIT MARGIN</span>
                <h3>{summary.profitMargin.toFixed(2)}%</h3>
                <p>Profit as a share of sales</p>
              </article>

              <article className="kpi-card">
                <span>TOTAL ORDERS</span>
                <h3>
                  {summary.totalOrders.toLocaleString('en-ZA')}
                </h3>
                <p>Orders in the dataset</p>
              </article>
            </div>

            <section className="dashboard-chart">
              <div className="chart-heading">
                <div>
                  <p>REVENUE ANALYSIS</p>
                  <h3>Monthly Sales Trend</h3>
                </div>

                <span>JAN — DEC 2025</span>
              </div>

              <div className="sales-chart">
                <div className="chart-y-labels">
                  <span>R2.5M</span>
                  <span>R2.0M</span>
                  <span>R1.5M</span>
                  <span>R1.0M</span>
                  <span>R0.5M</span>
                </div>

                <div className="chart-plot">
                  <div className="chart-grid-lines">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <svg
                    className="sales-line-chart"
                    viewBox="0 0 720 250"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Line chart showing monthly retail sales during 2025"
                  >
                    {dashboardData.monthlySales.map((item, index) => {
                      const x = (index / 11) * 700 + 10
                      const y = 235 - (item.sales / 2500000) * 220

                      return (
                        <g key={item.month}>
                          {index > 0 && (
                            <line
                              x1={((index - 1) / 11) * 700 + 10}
                              y1={
                                235 -
                                (dashboardData.monthlySales[index - 1].sales /
                                  2500000) *
                                  220
                              }
                              x2={x}
                              y2={y}
                              className="sales-line"

                            />
                          )}

                          <circle
                            cx={x}
                            cy={y}
                            r="4"
                            className="sales-point"
                          >
                            <title>
                              {`Month ${item.month}: ${formatCurrency(item.sales)}`}
                            </title>
                          </circle>
                        </g>
                      )
                    })}
                  </svg>

                  <div className="chart-x-labels">
                    {dashboardData.monthlySales.map((item) => (
                      <span key={item.month}>
                        {new Date(2025, item.month - 1, 1)
                          .toLocaleString('en-ZA', { month: 'short' })}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="chart-footnote">
                Monthly revenue calculated from the sample retail dataset.
                Hover over a data point to inspect its value.
              </p>

              <div className="performance-grid">
  {/* Sales by Product */}
  <section className="dashboard-chart product-performance">
    <div className="chart-heading">
      <div>
        <h3>Sales by Product</h3>
        <p>Revenue generated by each product</p>
      </div>
      <span className="chart-badge">REVENUE</span>
    </div>

    <div className="product-chart-list">
      {dashboardData.salesByProduct.map((item) => {
        const width = (item.sales / maxProductSales) * 100

        return (
          <div className="product-row" key={item.product}>
            <div className="product-row-heading">
              <span>{item.product}</span>
              <strong>{formatCurrency(item.sales)}</strong>
            </div>

            <div className="product-bar-track">
              <div
                className="product-bar sales-bar"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  </section>

  {/* Profit by Product */}
  <section className="dashboard-chart product-performance">
    <div className="chart-heading">
      <div>
        <h3>Profit by Product</h3>
        <p>Profit contribution across the product range</p>
      </div>
      <span className="chart-badge">PROFIT</span>
    </div>

    <div className="product-chart-list">
      {dashboardData.profitByProduct.map((item) => {
        const width = (item.profit / maxProductProfit) * 100

        return (
          <div className="product-row" key={item.product}>
            <div className="product-row-heading">
              <span>{item.product}</span>
              <strong>{formatCurrency(item.profit)}</strong>
            </div>

            <div className="product-bar-track">
              <div
                className="product-bar profit-bar"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  </section>
</div>

{/* Geographical Sales Analysis */}
<section className="dashboard-chart geography-section">
  <div className="chart-heading">
    <div>
      <span className="section-eyebrow">SOUTH AFRICA</span>
      <h3>Geographical Sales Analysis</h3>
      <p>
        Explore revenue distribution across South Africa's nine provinces.
      </p>
    </div>

    <span className="chart-badge">REGIONAL INSIGHTS</span>
  </div>

  <div className="geography-summary">
    <div className="geography-summary-item">
      <span>Provinces Analysed</span>
      <strong>{dashboardData.summary.totalProvinces}</strong>
    </div>

    <div className="geography-summary-item">
      <span>Highest-Selling Province</span>
      <strong>
        {dashboardData.salesByProvince[0]?.province ?? 'N/A'}
      </strong>
    </div>

    <div className="geography-summary-item">
      <span>Highest Provincial Sales</span>
      <strong>
        {formatCurrency(
          dashboardData.salesByProvince[0]?.sales ?? 0
        )}
      </strong>
    </div>
  </div>

  <div className="province-chart-list">
    {dashboardData.salesByProvince.map((item, index) => {
      const width = (item.sales / maxProvinceSales) * 100

      return (
        <div className="province-row" key={item.province}>
          <div className="province-row-heading">
            <div className="province-name">
              <span className="province-rank">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span>{item.province}</span>
            </div>

            <strong>{formatCurrency(item.sales)}</strong>
          </div>

          <div
            className="province-bar-track"
            role="img"
            aria-label={`${item.province}: ${formatCurrency(item.sales)} in sales`}
          >
            <div
              className="province-bar"
              style={{ width: `${width}%` }}
            />
          </div>
        </div>
      )
    })}
  </div>

  <p className="geography-footnote">
    Based on the project's synthetic demonstration dataset.
    Values illustrate how regional sales analysis can support
    business reporting and decision-making.
  </p>
</section>

            </section>
          </>
        )}
      </section>

{/* Customer Segment Analysis */}
{dashboardData && (
  <section className="dashboard-chart segment-section">
  <div className="chart-heading">
    <div>
      <span className="section-eyebrow">CUSTOMER INTELLIGENCE</span>
      <h3>Customer Segment Analysis</h3>
      <p>Compare revenue generated across customer groups.</p>
    </div>

    <span className="chart-badge">SEGMENT REVENUE</span>
  </div>

  <div className="segment-summary">
    <div className="segment-summary-card">
      <span>Customer Segments</span>
      <strong>{dashboardData.salesBySegment.length}</strong>
    </div>

    <div className="segment-summary-card">
      <span>Leading Segment</span>
      <strong>
        {[...dashboardData.salesBySegment].sort(
          (a, b) => b.sales - a.sales
        )[0]?.segment ?? 'N/A'}
      </strong>
    </div>
  </div>

  <div className="segment-chart-list">
    {[...dashboardData.salesBySegment]
      .sort((a, b) => b.sales - a.sales)
      .map((item, index) => {
        const width = (item.sales / maxSegmentSales) * 100

        return (
          <div className="segment-row" key={item.segment}>
            <div className="segment-row-heading">
              <div className="segment-name">
                <span className="segment-rank">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item.segment}</span>
              </div>

              <strong>{formatCurrency(item.sales)}</strong>
            </div>

            <div
              className="segment-bar-track"
              role="img"
              aria-label={`${item.segment}: ${formatCurrency(item.sales)} in sales`}
            >
              <div
                className="segment-bar"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        )
      })}
  </div>

  <p className="geography-footnote">
    These figures use synthetic demonstration data and illustrate
    how businesses can compare revenue across customer segments.
  </p>
</section>
)}


      {/* Dynamic Key Business Insights */}
      {dashboardData && (
        <section className="business-insights-section">
          <div className="business-insights-heading">
            <p>KEY BUSINESS INSIGHTS</p>
            <h2>What stands out in the data?</h2>
            <span>
              Highlights are calculated directly from this project's synthetic
              2025 retail dataset.
            </span>
          </div>

          <div className="business-insights-grid">
            <article className="business-insight-card">
              <span className="business-insight-number">01 / REVENUE</span>
              <h3>{topSalesProduct?.product ?? 'No product data'}</h3>
              <p>
                This is the highest-revenue product in the sample, generating{' '}
                {formatCurrency(topSalesProduct?.sales ?? 0)} in sales.
              </p>
            </article>

            <article className="business-insight-card">
              <span className="business-insight-number">02 / PROFIT</span>
              <h3>{topProfitProduct?.product ?? 'No product data'}</h3>
              <p>
                This product contributes the most total profit in the sample:
                {' '}{formatCurrency(topProfitProduct?.profit ?? 0)}.
              </p>
            </article>

            <article className="business-insight-card">
              <span className="business-insight-number">03 / REGION</span>
              <h3>{leadingProvince?.province ?? 'No province data'}</h3>
              <p>
                This province records the highest sales, at{' '}
                {formatCurrency(leadingProvince?.sales ?? 0)}.
              </p>
            </article>

            <article className="business-insight-card">
              <span className="business-insight-number">04 / SEASONALITY</span>
              <h3>
                {peakSalesMonth
                  ? new Date(2025, peakSalesMonth.month - 1, 1).toLocaleString(
                      'en-ZA',
                      { month: 'long' }
                    )
                  : 'No monthly data'}
              </h3>
              <p>
                This is the strongest sales month in the sample, with revenue
                of {formatCurrency(peakSalesMonth?.sales ?? 0)}.
              </p>
            </article>
          </div>

          <div className="business-recommendations">
            <span className="section-eyebrow">RECOMMENDED NEXT STEPS</span>
            <h3>Turn the findings into action.</h3>
            <ul>
              <li>
                <strong>Review product performance:</strong> investigate what
                drives demand for {topSalesProduct?.product ?? 'the leading product'}
                and check stock availability before peak periods.
              </li>
              <li>
                <strong>Protect profitability:</strong> compare pricing,
                discounts, and costs for {topProfitProduct?.product ?? 'high-profit products'}
                before changing the product mix.
              </li>
              <li>
                <strong>Validate regional opportunity:</strong> explore customer
                demand and operating costs in {leadingProvince?.province ?? 'the leading province'}
                before allocating more resources there.
              </li>
            </ul>
            <p className="chart-footnote">
              These are exploratory recommendations, not proven causes or
              forecasts. Validate them against real business data and context.
            </p>
          </div>
        </section>
      )}

      <section className="case-study-data">
        <p>THE DATA</p>

        <h2>From raw records to useful information.</h2>

        <div className="data-grid">
          {[
            'Orders',
            'Customers',
            'Products',
            'Revenue',
            'Profit',
            'Regions',
          ].map((item, index) => (
            <div key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="case-study-findings">
        <p>KEY FINDINGS</p>

        <h2>What does the data reveal?</h2>

        <div className="findings-grid">
          <div>
            <span>01</span>
            <h3>Revenue Trends</h3>
            <p>
              Explore how sales performance changes throughout the year.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Product Performance</h3>
            <p>
              Compare product sales and profitability to understand
              their contributions to overall performance.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Regional Performance</h3>
            <p>
              Compare revenue across the provinces represented in
              the sample dataset.
            </p>
          </div>
        </div>
      </section>

      <section className="case-study-insights">
        <p>BUSINESS INSIGHTS</p>

        <h2>Turning analysis into decisions.</h2>

        <p>
          Analytics helps decision-makers understand what is happening,
          why it may be happening, and which areas deserve further
          investigation.
        </p>
      </section>

      <section className="case-study-recommendations">
        <p>RECOMMENDATIONS</p>

        <h2>What should the business do?</h2>

        <p>
          Recommendations should follow the observed results and
          be validated against real business context before decisions
          are made.
        </p>
      </section>

      <div className="case-study-back">
        <a href="/">← Back to ASEIX DATA HOUSE</a>
      </div>

    </main>
  )
}

export default RetailSalesIntelligence