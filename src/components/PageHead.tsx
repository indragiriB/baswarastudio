import type { ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
}

/** Kepala halaman dalam: judul condensed besar di atas pola kawung. */
export default function PageHead({ title, children }: Props) {
  return (
    <section className="pagehead pattern-dark">
      <div className="container pagehead__inner">
        <h1 className="pagehead__title">{title}</h1>
        {children && <p className="pagehead__lead">{children}</p>}
      </div>
    </section>
  );
}
