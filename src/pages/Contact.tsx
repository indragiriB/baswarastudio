import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import PageHead from "../components/PageHead";
import { activePricelist, site, waLink } from "../data/site";
import { usePageTitle } from "../hooks";

export default function Contact() {
  usePageTitle("Contact");
  const [params] = useSearchParams();
  const packages = activePricelist().map((i) => i.name);
  const initial = params.get("package");

  const [name, setName] = useState("");
  const [pkg, setPkg] = useState(initial && packages.includes(initial) ? initial : "");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name so we know who to reply to.");
      return;
    }
    setError("");
    const lines = [
      `Hi Baswara Studio, I’m ${name.trim()}.`,
      pkg ? `I’m interested in: ${pkg}.` : "I’d like to ask about your services.",
      date ? `Preferred date: ${date}.` : "",
      note.trim(),
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  };

  return (
    <>
      <PageHead title="Contact">Tell us what you have in mind. We reply on WhatsApp.</PageHead>

      <section className="contact">
        <div className="container contact__grid">
          <form className="form" onSubmit={onSubmit} noValidate>
            <h2 className="h-display">Start a chat</h2>

            <label>
              Your name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "name-error" : undefined}
              />
            </label>
            {error && (
              <p id="name-error" className="form__error" role="alert">
                {error}
              </p>
            )}

            <label>
              Package
              <select value={pkg} onChange={(e) => setPkg(e.target.value)}>
                <option value="">Not sure yet</option>
                {packages.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Preferred date
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>

            <label>
              Anything else?
              <textarea rows={4} value={note} onChange={(e) => setNote(e.target.value)} />
            </label>

            <button type="submit" className="btn btn--indigo">
              Send on WhatsApp
            </button>
            <p className="form__hint">This opens WhatsApp with your message ready to send.</p>
          </form>

          <div className="contact__info">
            <section>
              <h2>Studio</h2>
              <address>
                {site.address.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
              <a className="text-link" href={site.mapsUrl} target="_blank" rel="noreferrer">
                Open in Maps
              </a>
            </section>
            <section>
              <h2>Opening hours</h2>
              <dl>
                {site.hours.map((h) => (
                  <div key={h.days}>
                    <dt>{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section>
              <h2>WhatsApp</h2>
              <a className="text-link" href={site.catalogUrl} target="_blank" rel="noreferrer">
                {site.phoneDisplay}
              </a>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
