import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import { asset, site, specialties, story } from "../data/site";
import { usePageTitle } from "../hooks";

export default function About() {
  usePageTitle("About");
  const [lead, ...rest] = story;

  return (
    <>
      <PageHead title="About">The studio, how we work, and what we photograph.</PageHead>

      <section className="about">
        <div className="container about__grid">
          <figure className="about__photo">
            <img
              src={asset("images/DSC07051.jpg")}
              alt="A couple holding a framed keepsake in front of a floral backdrop"
              width={1500}
              height={1000}
            />
          </figure>
          <p className="about__lead">{lead}</p>
          <div className="about__body">
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="specialties pattern-dark">
        <div className="container">
          <h2 className="h-display">We specialize in</h2>
          <ul className="specialties__list">
            {specialties.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="specialties__cta">
            <p>
              Find us at {site.address[0].replace(/,$/, "")}, {site.address[1].replace(/,$/, "")}.
            </p>
            <Link className="btn btn--ochre" to="/contact">
              Plan your session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
