import { useMemo, useState } from 'react'

const businessData = [
{ month: 'Jan', revenue: 185000, expenses: 121000 },
{ month: 'Feb', revenue: 198000, expenses: 128000 },
{ month: 'Mar', revenue: 210000, expenses: 132000 },
{ month: 'Apr', revenue: 205000, expenses: 135000 },
{ month: 'May', revenue: 228000, expenses: 143000 },
{ month: 'Jun', revenue: 240000, expenses: 149000 },
{ month: 'Jul', revenue: 232000, expenses: 146000 },
{ month: 'Aug', revenue: 258000, expenses: 154000 },
{ month: 'Sep', revenue: 270000, expenses: 161000 },
{ month: 'Oct', revenue: 285000, expenses: 168000 },
{ month: 'Nov', revenue: 310000, expenses: 179000 },
{ month: 'Dec', revenue: 345000, expenses: 190000 },
]

const businessUnits = [
{ name: 'Technology', revenue: 980000, expenses: 490000 },
{ name: 'Consulting', revenue: 720000, expenses: 390000 },
{ name: 'Operations', revenue: 560000, expenses: 410000 },
{ name: 'Marketing', revenue: 410000, expenses: 290000 },
]

const expenseCategories = [
{ name: 'Staff & Contractors', amount: 420000 },
{ name: 'Technology & Software', amount: 265000 },
{ name: 'Marketing', amount: 190000 },
{ name: 'Operations', amount: 175000 },
{ name: 'Administration', amount: 145000 },
]

const money = (value) =>
new Intl.NumberFormat('en-ZA', {
style: 'currency',
currency: 'ZAR',
maximumFractionDigits: 0,
}).format(value)

const percentage = (value) => `${value.toFixed(1)}%`

function BusinessPerformanceDashboard() {
const [period, setPeriod] = useState('Full Year')
const [metric, setMetric] = useState('revenue')

const visibleMonths = useMemo(() => {
if (period === 'First Half') return businessData.slice(0, 6)
if (period === 'Second Half') return businessData.slice(6)
return businessData
}, [period])

const totals = useMemo(() => {
const revenue = visibleMonths.reduce((sum, item) => sum + item.revenue, 0)
const expenses = visibleMonths.reduce((sum, item) => sum + item.expenses, 0)
const profit = revenue - expenses

return {
  revenue,
  expenses,
  profit,
  margin: revenue ? (profit / revenue) * 100 : 0,
}


}, [visibleMonths])

const maxValue = Math.max(
...visibleMonths.map((item) => Math.max(item.revenue, item.expenses)),
)

const topUnit = [...businessUnits].sort((a, b) => b.revenue - a.revenue)[0]
const highestExpense = [...expenseCategories].sort(
(a, b) => b.amount - a.amount,
)[0]

return ( <main className="case-study business-performance-page"> <section className="case-study-hero"> 

    <p className="eyebrow">ASEIX DATA HOUSE · BUSINESS INTELLIGENCE</p>
    <h1>
  Business Performance <span style={{ color: '#9d7cff' }}>Dashboard</span>
</h1>
    <p className="case-study-intro">
      Turning business figures into clear performance indicators, financial
      trends, and practical questions for better decision-making.
    </p>

    <div className="business-performance-tags">
      <span>Financial Analytics</span>
      <span>Performance Monitoring</span>
      <span>Data Visualization</span>
    </div>
  </section>

  <section className="business-performance-notice">
    <strong>Portfolio demonstration</strong>
    <span>
      All figures on this dashboard are illustrative sample data, not actual
      company financial results.
    </span>
  </section>

  <section className="dashboard-section">
    <div className="business-performance-heading">
      <div>
        <p className="eyebrow">EXECUTIVE OVERVIEW</p>
        <h2>Financial performance</h2>
        <p>Review revenue, expenditure, and profitability.</p>
      </div>

      <label className="business-filter">
        Reporting period
        <select
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
        >
          <option>Full Year</option>
          <option>First Half</option>
          <option>Second Half</option>
        </select>
      </label>
    </div>

    <div className="kpi-grid business-performance-kpis">
      <article className="kpi-card">
        <span>Total Revenue</span>
        <strong>{money(totals.revenue)}</strong>
        <small>Income across the selected period</small>
      </article>

      <article className="kpi-card">
        <span>Total Expenses</span>
        <strong>{money(totals.expenses)}</strong>
        <small>Recorded illustrative expenditure</small>
      </article>

      <article className="kpi-card">
        <span>Net Profit</span>
        <strong>{money(totals.profit)}</strong>
        <small>Revenue minus expenses</small>
      </article>

      <article className="kpi-card">
        <span>Profit Margin</span>
        <strong>{percentage(totals.margin)}</strong>
        <small>Net profit as a share of revenue</small>
      </article>
    </div>
  </section>

  <section className="dashboard-section business-chart-panel">
    <div className="business-performance-heading">
      <div>
        <p className="eyebrow">MONTHLY ANALYSIS</p>
        <h2>Revenue and expenses</h2>
        <p>Compare financial performance month by month.</p>
      </div>

      <label className="business-filter">
        Display
        <select
          value={metric}
          onChange={(event) => setMetric(event.target.value)}
        >
          <option value="revenue">Revenue</option>
          <option value="expenses">Expenses</option>
          <option value="profit">Net Profit</option>
        </select>
      </label>
    </div>

    <div className="business-chart-legend">
      <span><i className="legend-revenue" /> Revenue</span>
      <span><i className="legend-expenses" /> Expenses</span>
      {metric === 'profit' && <span><i className="legend-profit" /> Net Profit</span>}
    </div>

    <div className="business-monthly-chart">
      {visibleMonths.map((item) => {
        const profit = item.revenue - item.expenses
        const value =
          metric === 'revenue'
            ? item.revenue
            : metric === 'expenses'
              ? item.expenses
              : profit

        return (
          <div className="business-month-column" key={item.month}>
            <span className="business-month-value">{money(value)}</span>
            <div className="business-bar-track">
              <div
                className={`business-bar business-bar-${metric}`}
                style={{
                  height: `${Math.max((value / maxValue) * 100, 3)}%`,
                }}
                title={`${item.month}: ${money(value)}`}
              />
            </div>
            <span className="business-month-label">{item.month}</span>
          </div>
        )
      })}
    </div>

    <p className="business-chart-footnote">
      Values are shown in South African rand (ZAR). Select a different
      metric or reporting period to update the chart.
    </p>
  </section>

  <section className="dashboard-section">
    <div className="business-performance-heading">
      <div>
        <p className="eyebrow">REVENUE CONTRIBUTION</p>
        <h2>Performance by business unit</h2>
        <p>Compare illustrative revenue and operating costs.</p>
      </div>
    </div>

    <div className="business-unit-grid">
      {businessUnits.map((unit) => {
        const margin =
          ((unit.revenue - unit.expenses) / unit.revenue) * 100

        return (
          <article className="business-unit-card" key={unit.name}>
            <div className="business-unit-title">
              <h3>{unit.name}</h3>
              <span>{percentage(margin)} margin</span>
            </div>

            <div className="business-unit-number">
              <span>Revenue</span>
              <strong>{money(unit.revenue)}</strong>
            </div>

            <div className="business-unit-number">
              <span>Expenses</span>
              <strong>{money(unit.expenses)}</strong>
            </div>

            <div className="business-unit-track">
              <div
                className="business-unit-fill"
                style={{
                  width: `${(unit.revenue / topUnit.revenue) * 100}%`,
                }}
              />
            </div>

            <small>Relative revenue contribution</small>
          </article>
        )
      })}
    </div>
  </section>

  <section className="dashboard-section">
    <div className="business-performance-heading">
      <div>
        <p className="eyebrow">COST MANAGEMENT</p>
        <h2>Expense breakdown</h2>
        <p>Understand where the illustrative budget is allocated.</p>
      </div>
    </div>

    <div className="business-expense-list">
      {expenseCategories.map((category) => {
        const totalExpenses = expenseCategories.reduce(
          (sum, item) => sum + item.amount,
          0,
        )
        const share = (category.amount / totalExpenses) * 100

        return (
          <div className="business-expense-row" key={category.name}>
            <div className="business-expense-info">
              <span>{category.name}</span>
              <strong>{money(category.amount)}</strong>
            </div>

            <div
              className="business-expense-track"
              role="progressbar"
              aria-label={`${category.name} share of expenses`}
              aria-valuenow={Math.round(share)}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="business-expense-fill"
                style={{ width: `${share}%` }}
              />
            </div>

            <small>{percentage(share)} of listed expenses</small>
          </div>
        )
      })}
    </div>
  </section>

  <section className="dashboard-section business-insights-section">
    <p className="eyebrow">DECISION SUPPORT</p>
    <h2>Business insights</h2>
    <p className="business-insights-intro">
      Automatically calculated observations from the sample figures.
    </p>

    <div className="business-insights-grid">
      <article className="business-insight-card">
        <span className="business-insight-label">Revenue leader</span>
        <h3>{topUnit.name}</h3>
        <p>
          This unit has the highest illustrative revenue at{' '}
          {money(topUnit.revenue)}.
        </p>
      </article>

      <article className="business-insight-card">
        <span className="business-insight-label">Largest expense</span>
        <h3>{highestExpense.name}</h3>
        <p>
          This category accounts for{' '}
          {percentage(
            (highestExpense.amount /
              expenseCategories.reduce((sum, item) => sum + item.amount, 0)) *
              100,
          )}{' '}
          of the listed expenses.
        </p>
      </article>

      <article className="business-insight-card">
        <span className="business-insight-label">Selected period</span>
        <h3>{percentage(totals.margin)} margin</h3>
        <p>
          The illustrative business retains {money(totals.profit)} after
          subtracting expenses during the selected period.
        </p>
      </article>
    </div>

    <div className="business-recommendations">
      <h3>Recommended areas to investigate</h3>
      <ul>
        <li>
          Review the largest expense categories to identify potential
          savings without compromising essential operations.
        </li>
        <li>
          Investigate the drivers of revenue growth and whether they can be
          sustained across reporting periods.
        </li>
        <li>
          Compare business-unit margins alongside service quality and
          delivery costs before allocating additional resources.
        </li>
      </ul>
      <p>
        These are exploratory recommendations based on sample figures, not
        verified findings about a real business.
      </p>
    </div>
  </section>

  <div className="case-study-back">
        <a href="/">← Back to ASEIX DATA HOUSE</a>
      </div>

</main>

)
}

export default BusinessPerformanceDashboard
