import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import { activePricelist, formatIDR, groups, site } from "../data/site";
import { usePageTitle } from "../hooks";

export default function Services() {
  usePageTitle("Services");
  const items = activePricelist();

  return (
    <>
      <PageHead title="Services">
        Choose a package, then message us to set a date. Prices are in Indonesian rupiah.
      </PageHead>

      <div className="container services">
        <nav className="services__jump" aria-label="Jump to a category">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`}>
              {g.title}
            </a>
          ))}
        </nav>

        {groups.map((g) => (
          <section key={g.id} id={g.id} className="services__group">
            <header>
              <h2 className="h-display">{g.title}</h2>
              <p>{g.blurb}</p>
            </header>

            <ul className="menu">
              {items
                .filter((i) => i.group === g.id)
                .map((i) => (
                  <li key={i.name}>
                    <Link className="menu__row" to={`/contact?package=${encodeURIComponent(i.name)}`}>
                      <span className="menu__name">
                        {i.name}
                        {i.promoNote && <span className="tag">{i.promoNote}</span>}
                      </span>
                      <span className="menu__dots" aria-hidden="true" />
                      <span className="menu__price">
                        {i.originalPrice !== undefined && <del>{formatIDR(i.originalPrice)}</del>}
                        {formatIDR(i.price)}
                      </span>
                      <span className="menu__desc">{i.description}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <aside className="services__promo">
          <p>Looking for a current promo or a custom package?</p>
          <a className="btn btn--indigo" href={site.catalogUrl} target="_blank" rel="noreferrer">
            Ask on WhatsApp
          </a>
        </aside>
      </div>
    </>
  );
}
