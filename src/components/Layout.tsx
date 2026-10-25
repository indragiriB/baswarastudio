import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { asset, nav, site } from "../data/site";
import { useBodyLock, useScrollToTop } from "../hooks";

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useBodyLock(open);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`header${open ? " is-open" : ""}`}>
      <div className="container header__bar">
        <Link to="/" className="header__logo" aria-label="Baswara Studio, home">
          <img src={asset("images/logo-light.png")} alt="" width={720} height={187} />
        </Link>

        <nav id="site-nav" className="header__nav" aria-label="Main">
          <ul>
            {nav.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === "/"}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a className="header__wa" href={site.catalogUrl} target="_blank" rel="noreferrer">
            Catalog on WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="header__toggle-icon" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer pattern-dark">
      <div className="container footer__top">
        <p className="footer__big">
          Let’s make
          <br />
          something timeless.
        </p>
        <Link className="btn btn--ochre" to="/contact">
          Book a session
        </Link>
      </div>

      <div className="container footer__grid">
        <div>
          <img className="footer__logo" src={asset("images/logo-light.png")} alt="Baswara Studio" width={720} height={187} loading="lazy" />
        </div>
        <div>
          <h2>Visit</h2>
          <address>
            {site.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <a href={site.mapsUrl} target="_blank" rel="noreferrer">
            Open in Maps
          </a>
        </div>
        <div>
          <h2>Hours</h2>
          <dl>
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2>Talk to us</h2>
          <a href={site.catalogUrl} target="_blank" rel="noreferrer">
            {site.phoneDisplay}
          </a>
          <ul className="footer__links">
            {nav.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">© {new Date().getFullYear()} Baswara Studio</div>
    </footer>
  );
}

export default function Layout() {
  useScrollToTop();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
