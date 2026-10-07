function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <h2>ASEIX</h2>
          <p>DATA HOUSE</p>

          <span>
            Turning data into intelligence.
          </span>
        </div>

        <div className="footer-links">
          <div>
            <p>EXPLORE</p>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#insights">Insights</a>
          </div>

          <div>
            <p>CONNECT</p>
            <a href="#contact">Contact</a>
            <a href="mailto:hello@aseixdatahouse.com">
              Email
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 ASEIX DATA HOUSE</span>
        <span>DATA • TECHNOLOGY • INTELLIGENCE</span>
      </div>
    </footer>
  )
}

export default Footer