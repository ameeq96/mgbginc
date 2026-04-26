type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string | null;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink md:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg">{description}</p> : null}
    </div>
  );
}
