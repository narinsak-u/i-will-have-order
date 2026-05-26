import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The morning ramekin has become my favorite ritual. It tastes like it came from a Tuscan kitchen, not a delivery box.",
    name: "Elena Rossi",
    role: "Subscriber, 8 months",
    initials: "ER",
  },
  {
    quote:
      "I cancelled my meal kit and never looked back. One warm, perfect thing instead of a fridge full of half-used ingredients.",
    name: "Marcus Chen",
    role: "Subscriber, 1 year",
    initials: "MC",
  },
  {
    quote:
      "You can taste that the spinach was picked that morning. Nothing else delivered feels this fresh.",
    name: "Priya Anand",
    role: "Subscriber, 4 months",
    initials: "PA",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-border/60 bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Loved by households</p>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
              2,000+ kitchens start the day with us.
            </h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span>4.9 average · 1,240 reviews</span>
          </div>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-3xl border border-border bg-card p-8"
            >
              <blockquote className="text-base font-light leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-medium tracking-wider text-primary">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}