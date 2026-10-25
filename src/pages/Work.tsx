import { useState } from "react";
import Lightbox from "../components/Lightbox";
import PageHead from "../components/PageHead";
import { portfolio } from "../data/site";
import { usePageTitle } from "../hooks";

export default function Work() {
  usePageTitle("Work");
  const [current, setCurrent] = useState<number | null>(null);

  return (
    <>
      <PageHead title="Work">Twelve frames from recent sessions. Tap a photo to view it larger.</PageHead>

      <section className="work">
        <div className="container">
          <ul className="work__grid">
            {portfolio.map((p, i) => (
              <li key={p.src}>
                <button
                  type="button"
                  className="work__item"
                  onClick={() => setCurrent(i)}
                  aria-label={`Open frame ${i + 1} of ${portfolio.length}`}
                >
                  <img src={p.src} alt={p.alt} loading="lazy" width={1000} height={1500} />
                  <span className="work__no">{String(i + 1).padStart(2, "0")}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {current !== null && (
        <Lightbox
          photos={portfolio}
          index={current}
          onIndexChange={setCurrent}
          onClose={() => setCurrent(null)}
        />
      )}
    </>
  );
}
