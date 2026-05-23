import { Check } from "lucide-react";
import planWeek from "@/assets/plan-week.jpg";
import planMonth from "@/assets/plan-month.jpg";
import planYear from "@/assets/plan-year.jpg";

const plans = [
  {
    id: "week",
    name: "1 Week",
    tagline: "Try it out",
    price: 24,
    cadence: "/ week",
    note: "7 servings · billed once",
    features: ["Daily fresh delivery", "Cancel anytime", "Single household size"],
    highlighted: false,
    image: planWeek,
  },
  {
    id: "month",
    name: "1 Month",
    tagline: "Most popular",
    price: 89,
    cadence: "/ month",
    note: "30 servings · save 8%",
    features: ["Daily fresh delivery", "Free recipe card weekly", "Pause anytime"],
    highlighted: true,
    image: planMonth,
  },
  {
    id: "year",
    name: "1 Year",
    tagline: "Best value",
    price: 899,
    cadence: "/ year",
    note: "365 servings · save 18%",
    features: ["Daily fresh delivery", "Seasonal limited editions", "Priority support"],
    highlighted: false,
    image: planYear,
  },
] as const;

export function Plans({ onSubscribe }: { onSubscribe: (id: string) => void }) {
  return (
    <section id="plans" className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Subscription</p>
          <h2 className="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
            Three ways to keep your kitchen stocked.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.id}
              className={`flex flex-col overflow-hidden rounded-3xl border p-8 transition-colors ${
                p.highlighted
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-card-foreground"
              }`}
            >
              <div className="-mx-8 -mt-8 mb-6 aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.name} plan`}
                  width={768}
                  height={576}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className={`text-xs uppercase tracking-[0.25em] ${p.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {p.tagline}
              </p>
              <h3 className="mt-3 text-2xl font-light tracking-tight">{p.name}</h3>
              <div className="mt-8 flex items-baseline gap-1">
                <span className="text-4xl font-light">${p.price}</span>
                <span className={`text-sm ${p.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {p.cadence}
                </span>
              </div>
              <p className={`mt-2 text-xs ${p.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.note}</p>
              <ul className="mt-8 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.highlighted ? "text-primary-foreground" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSubscribe(p.id)}
                className={`mt-10 inline-flex h-11 items-center justify-center rounded-full text-xs font-medium uppercase tracking-wider transition-colors ${
                  p.highlighted
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                Add to cart
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}