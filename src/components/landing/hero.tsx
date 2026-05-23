import heroImg from "@/assets/hero-bake.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28 md:gap-16 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">A daily ritual</p>
          <h1 className="mt-5 text-5xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Baked spinach<br />
            <span className="italic font-serif">&amp; melted cheese,</span><br />
            delivered fresh.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            A simple, nourishing ramekin baked each morning with organic spinach and
            slow-aged cheese. Subscribe once — we'll handle the rest.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#plans"
              className="inline-flex h-11 items-center rounded-sm bg-primary px-6 text-xs font-medium uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Choose your plan
            </a>
            <a
              href="#how"
              className="inline-flex h-11 items-center text-xs font-medium uppercase tracking-wider text-foreground underline underline-offset-8 decoration-1 hover:decoration-2"
            >
              How it's made
            </a>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroImg}
            alt="Baked spinach with cheese in a ceramic dish"
            width={1280}
            height={1280}
            className="aspect-square w-full rounded-sm object-cover"
          />
        </div>
      </div>
    </section>
  );
}