import Link from "next/link";

type Action = { label: string; href: string; external?: boolean };

export function Cta({ eyebrow, title, text, primary, secondary }: { eyebrow: string; title: string; text: string; primary: Action; secondary: Action }) {
  const render = (action: Action, className: string) =>
    action.external ? (
      <a className={className} href={action.href} target="_blank" rel="noopener">
        {action.label}
      </a>
    ) : (
      <Link className={className} href={action.href}>
        {action.label}
      </Link>
    );
  return (
    <section className="cta">
      <div className="container cta__inner">
        <div>
          <span className="eyebrow on-dark">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="button-row">
          {render(primary, "btn btn-primary")}
          {render(secondary, "btn btn-ghost")}
        </div>
      </div>
    </section>
  );
}
