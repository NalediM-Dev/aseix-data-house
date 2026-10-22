import { useState } from 'react'

const departments = [
  { name: 'Operations', employees: 72, turnover: 14, satisfaction: 76 },
  { name: 'Sales', employees: 54, turnover: 16.7, satisfaction: 73 },
  { name: 'Technology', employees: 46, turnover: 8.7, satisfaction: 84 },
  { name: 'Finance', employees: 38, turnover: 7.9, satisfaction: 82 },
  { name: 'Human Resources', employees: 18, turnover: 11.1, satisfaction: 81 },
  { name: 'Customer Support', employees: 20, turnover: 20, satisfaction: 69 },
]

const monthlyData = [
  { month: 'Jan', hires: 4, exits: 2 },
  { month: 'Feb', hires: 5, exits: 3 },
  { month: 'Mar', hires: 6, exits: 2 },
  { month: 'Apr', hires: 4, exits: 4 },
  { month: 'May', hires: 7, exits: 3 },
  { month: 'Jun', hires: 5, exits: 2 },
  { month: 'Jul', hires: 8, exits: 4 },
  { month: 'Aug', hires: 6, exits: 3 },
  { month: 'Sep', hires: 4, exits: 2 },
  { month: 'Oct', hires: 5, exits: 3 },
  { month: 'Nov', hires: 7, exits: 2 },
  { month: 'Dec', hires: 2, exits: 2 },
]

function WorkforceAnalytics() {
  const [selectedDepartment, setSelectedDepartment] =
    useState('All departments')

  const visibleDepartments =
    selectedDepartment === 'All departments'
      ? departments
      : departments.filter(
          (department) => department.name === selectedDepartment
        )

  const highestTurnover = departments.reduce((highest, department) =>
    department.turnover > highest.turnover ? department : highest
  )

  const highestSatisfaction = departments.reduce((highest, department) =>
    department.satisfaction > highest.satisfaction ? department : highest
  )

  const totalEmployees = departments.reduce(
    (total, department) => total + department.employees,
    0
  )

  const totalHires = monthlyData.reduce(
    (total, item) => total + item.hires,
    0
  )

  const totalExits = monthlyData.reduce(
    (total, item) => total + item.exits,
    0
  )

  const maxEmployees = Math.max(
    ...visibleDepartments.map((department) => department.employees),
    1
  )

  const maxMonthlyValue = Math.max(
    ...monthlyData.flatMap((item) => [item.hires, item.exits]),
    1
  )

  return (
    <main className="case-study workforce-page">
      <section className="case-study-hero">
        <p>ASEIX DATA HOUSE • BUSINESS INTELLIGENCE</p>

<h1 style={{ fontSize: '7rem', lineHeight: 1.12 }}>
  Workforce <span style={{ color: '#9d7cff' }}>Analytics.</span>
</h1>

        <p>
          Turning workforce data into smarter business decisions.
        </p>
        
      </section>

      <section className="case-study-overview">
        <p>PROJECT OVERVIEW</p>

        <h2>Understanding the people behind performance.</h2>

        <p>
          Explore a sample workforce dashboard designed to help organisations
          monitor employee numbers, turnover, satisfaction and hiring trends.
          These figures are illustrative and do not represent a real employer.
        </p>
      </section>

      <section className="dashboard-section workforce-dashboard">
        <div className="dashboard-heading">
          <p>WORKFORCE PERFORMANCE</p>
          <h2>People at a glance.</h2>
          <span>Sample annual overview • 2025</span>
        </div>

        <div className="kpi-grid">
          <article className="kpi-card">
            <span>WORKFORCE SIZE</span>
            <h3>{totalEmployees}</h3>
            <p>Employees in the sample</p>
          </article>

          <article className="kpi-card">
            <span>AVERAGE TURNOVER</span>
            <h3>12.9%</h3>
            <p>Illustrative annual rate</p>
          </article>

          <article className="kpi-card">
            <span>ABSENTEEISM RATE</span>
            <h3>3.8%</h3>
            <p>Illustrative absence rate</p>
          </article>

          <article className="kpi-card">
            <span>EMPLOYEE SATISFACTION</span>
            <h3>78.6%</h3>
            <p>Illustrative survey score</p>
          </article>
        </div>

        <section className="dashboard-chart">
          <div className="chart-heading">
            <div>
              <p>DEPARTMENT COMPARISON</p>
              <h3>Employee distribution</h3>
            </div>

            <label className="workforce-filter">
              <span>Filter department</span>

              <select
                value={selectedDepartment}
                onChange={(event) =>
                  setSelectedDepartment(event.target.value)
                }
              >
                <option value="All departments">All departments</option>

                {departments.map((department) => (
                  <option key={department.name} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="workforce-department-list">
            {visibleDepartments.map((department) => (
              <div
                className="workforce-department-row"
                key={department.name}
              >
                <div className="workforce-department-label">
                  <span>{department.name}</span>
                  <strong>{department.employees} employees</strong>
                </div>

                <div className="workforce-bar-track">
                  <span
                    style={{
                      width: `${
                        (department.employees / maxEmployees) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-chart">
          <div className="chart-heading">
            <div>
              <p>PEOPLE MOVEMENT</p>
              <h3>Monthly hiring vs. departures</h3>
            </div>

            <span>JAN — DEC</span>
          </div>

          <div className="workforce-monthly-chart">
            {monthlyData.map((item) => (
              <div className="workforce-month-column" key={item.month}>
                <div className="workforce-month-bars">
                  <span
                    className="workforce-hire-bar"
                    style={{
                      height: `${
                        (item.hires / maxMonthlyValue) * 100
                      }%`,
                    }}
                    title={`${item.hires} hires`}
                  />

                  <span
                    className="workforce-exit-bar"
                    style={{
                      height: `${
                        (item.exits / maxMonthlyValue) * 100
                      }%`,
                    }}
                    title={`${item.exits} departures`}
                  />
                </div>

                <span className="workforce-month-label">
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div className="workforce-legend">
            <span>
              <i className="workforce-hire-key" /> Hires
            </span>

            <span>
              <i className="workforce-exit-key" /> Departures
            </span>
          </div>

          <p className="chart-footnote">
            Sample annual totals: {totalHires} hires and {totalExits} departures.
          </p>
        </section>

        <section className="dashboard-chart workforce-table-section">
          <div className="chart-heading">
            <div>
              <p>DEPARTMENT HEALTH</p>
              <h3>Compare workforce indicators</h3>
            </div>
          </div>

          <div className="workforce-table-wrap">
            <table className="workforce-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Turnover</th>
                  <th>Satisfaction</th>
                </tr>
              </thead>

              <tbody>
                {departments.map((department) => (
                  <tr key={department.name}>
                    <td>{department.name}</td>
                    <td>{department.turnover.toFixed(1)}%</td>
                    <td>{department.satisfaction}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>

      <section className="business-insights-section">
        <div className="business-insights-heading">
          <p>KEY WORKFORCE INSIGHTS</p>
          <h2>What stands out in the data?</h2>
        </div>

        <div className="business-insights-grid">
          <article className="business-insight-card">
            <span>HIGHEST TURNOVER</span>
            <h3 className="business-insight-number">
              {highestTurnover.name}
            </h3>
            <p>
              {highestTurnover.turnover}% illustrative turnover rate
            </p>
          </article>

          <article className="business-insight-card">
            <span>HIGHEST SATISFACTION</span>
            <h3 className="business-insight-number">
              {highestSatisfaction.name}
            </h3>
            <p>
              {highestSatisfaction.satisfaction}%
              illustrative satisfaction score
            </p>
          </article>

          <article className="business-insight-card">
            <span>NET PEOPLE MOVEMENT</span>
            <h3 className="business-insight-number">
              +{totalHires - totalExits}
            </h3>
            <p>More hires than departures in this sample</p>
          </article>
        </div>

        <div className="business-recommendations">
          <span className="section-eyebrow">RECOMMENDED NEXT STEPS</span>

          <h3>Use workforce data thoughtfully.</h3>

          <ul>
            <li>
              <strong>Investigate retention:</strong> explore exit feedback
              and working conditions in {highestTurnover.name}.
            </li>

            <li>
              <strong>Learn from stronger outcomes:</strong> explore what
              employees value in {highestSatisfaction.name}.
            </li>

            <li>
              <strong>Look beyond averages:</strong> check trends over time
              and discuss findings with employees before making changes.
            </li>
          </ul>

          <p className="chart-footnote">
            These are exploratory prompts based on sample data, not proof of
            causes or predictions. Real workforce decisions require validated
            data and appropriate privacy safeguards.
          </p>
        </div>
      </section>

      <section className="case-study-back">
        <a href="/#projects">
          ← Back to ASEIX DATA HOUSE 
        </a>
      </section>
    </main>
  )
}

export default WorkforceAnalytics

