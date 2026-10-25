import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import { usePageTitle } from "../hooks";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <>
      <PageHead title="Not found">That page doesn’t exist or has moved.</PageHead>
      <section className="container notfound">
        <Link className="btn btn--indigo" to="/">
          Back to home
        </Link>
      </section>
    </>
  );
}
