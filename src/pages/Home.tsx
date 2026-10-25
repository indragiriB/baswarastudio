import { Link } from "react-router-dom";
import { activePricelist, asset, formatIDR, groups, portfolio, site } from "../data/site";
import { usePageTitle } from "../hooks";

export default function Home() {
  usePageTitle();
  const items = activePricelist();
  const featured = [portfolio[0], portfolio[3], portfolio[4], portfolio[6]];

  return (
    <>
      <section className="hero pattern-dark">
        <div className="container hero__grid">
          <h1 className="hero__title">
            <span>Baswara</span>
            <span>Studio</span>
          </h1>

          <div className="hero__intro">
            <p>Photography studio in Surakarta. Weddings, graduations, maternity and everyday portraits.</p>
            <div className="hero__actions">
              <Link className="btn btn--ochre" to="/contact">
                Book a session
              </Link>
              <Link className="btn btn--line" to="/work">
                See the work
              </Link>
            </div>
          </div>

          <figure className="hero__photo">
            <img
              src={asset("images/DSC06070.jpg")}
              alt="Hands exchanging rings during a wedding session"
              width={1000}
              height={1500}
              fetchPriority="high"
            />
          </figure>
        </div>
      </section>

      <section className="statement">
        <div className="container statement__grid">
          <p className="statement__text">{site.tagline}</p>
        </div>
      </section>

      <section className="featured">
        <div className="container">
          <div className="featured__head">
            <h2 className="h-display">Selected work</h2>
            <Link className="text-link" to="/work">
              All twelve frames
            </Link>
          </div>
          <ul className="featured__row">
            {featured.map((p) => (
              <li key={p.src}>
                <Link to="/work" tabIndex={-1} aria-hidden="true">
                  <img src={p.src} alt="" loading="lazy" width={1000} height={1500} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="index pattern-dark">
        <div className="container">
          <h2 className="h-display">What we shoot</h2>
          <ul className="index__list">
            {groups.map((g) => {
              const from = Math.min(...items.filter((i) => i.group === g.id).map((i) => i.price));
              return (
                <li key={g.id}>
                  <Link className="index__row" to={`/services#${g.id}`}>
                    <span className="index__name">{g.title}</span>
                    <span className="index__blurb">{g.blurb}</span>
                    <span className="index__from">from {formatIDR(from)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
