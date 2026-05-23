import heroImg from "@/assets/hero-bake.jpg";
import { Leaf, Truck, Clock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28 md:gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Fresh-baked daily subscription
          </span>
          <h1 className="mt-5 text-5xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl">
            One warm ramekin of <span className="italic font-serif">spinach &amp; cheese,</span> at your door every morning.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            We bake each serving before sunrise with organic baby spinach and
            slow-aged cheese, then deliver it to you within hours. Pick a plan —
            1 week, 1 month, or 1 year — and we'll handle the rest.
          </p>
          <ul className="mt-8 grid max-w-md gap-3 text-sm text-foreground">
            <li className="flex items-center gap-3">
              <Leaf className="h-4 w-4 text-primary" />
              100% organic ingredients, nothing processed
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary" />
              Baked the same morning it arrives
            </li>
            <li className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-primary" />
              Free delivery · pause or cancel anytime
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#plans"
              className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-xs font-medium uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              See plans — from $24
            </a>
            <a
              href="#how"
              className="inline-flex h-11 items-center text-xs font-medium uppercase tracking-wider text-foreground underline underline-offset-8 decoration-1 hover:decoration-2"
            >
              How it's made
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Trusted by 2,000+ households · 4.9 ★ average rating
          </p>
        </div>
        <div className="relative">
          <img
            src={heroImg}
            alt="Baked spinach with cheese in a ceramic dish"
            width={1280}
            height={1280}
            className="aspect-square w-full rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}