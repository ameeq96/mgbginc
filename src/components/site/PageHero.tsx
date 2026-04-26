type PageHeroProps = {
  eyebrow?: string | null;
  title: string;
  summary?: string | null;
  image?: string | null;
};

export function PageHero({ eyebrow, title, summary, image }: PageHeroProps) {
  return (
    <section className="relative isolate min-h-[480px] overflow-hidden bg-ink pt-32 text-white">
      {image ? (
        <img
          src={image}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,20,35,0.92),rgba(7,20,35,0.64),rgba(7,20,35,0.2))]" />
      <div className="container-shell pb-24 pt-16">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        ) : null}
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">
          {title}
        </h1>
        {summary ? <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.78]">{summary}</p> : null}
      </div>
    </section>
  );
}
