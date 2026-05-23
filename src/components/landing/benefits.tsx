import { Leaf, HeartPulse, Sparkles, Shield } from "lucide-react";

const benefits = [
  { icon: Leaf, title: "Plant-forward", body: "Each serving delivers 4g of fiber and a full cup of leafy greens." },
  { icon: HeartPulse, title: "Heart-friendly", body: "Rich in folate, magnesium, and potassium — minerals known to support cardiovascular health." },
  { icon: Sparkles, title: "High in protein", body: "12g of slow-release dairy protein per ramekin to keep you full longer." },
  { icon: Shield, title: "Immunity boost", body: "Iron and vitamin K from spinach, paired with vitamin A from aged cheese." },
];

export function Benefits() {
  return (
    <section id="benefits" className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Benefits</p>
          <h2 className="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
            Comfort food that does your body a favor.
          </h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
          {benefits.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-background p-8">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="mt-6 text-lg font-medium text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}