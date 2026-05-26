import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does the subscription work?",
    a: "Pick a 1-week, 1-month, or 1-year plan. We bake a fresh ramekin each morning and deliver it to your door before lunch. Your plan auto-renews at the end of the cycle — you stay in control from your dashboard.",
  },
  {
    q: "Can I pause or cancel anytime?",
    a: "Yes. Pause for a weekend, a holiday, or as long as you need from the dashboard — no fees, no questions. Cancel with one click before your next renewal and you won't be charged again.",
  },
  {
    q: "Where do the ingredients come from?",
    a: "Spinach is harvested at dawn from certified-organic farms within 80 km of our kitchen. Mozzarella and parmesan come from a single family dairy, and eggs are free-range from pasture-raised hens. Every batch is traceable to the farm.",
  },
  {
    q: "Are there any additives or preservatives?",
    a: "None. Just spinach, cheese, eggs, butter, sea salt, pepper, and a touch of nutmeg. Because we bake and deliver the same day, nothing needs to be preserved.",
  },
  {
    q: "What if I have allergies or dietary needs?",
    a: "Our ramekins contain dairy, eggs, and gluten-free ingredients. We can't currently offer vegan or dairy-free versions, but we're happy to flag allergens — just reach out after subscribing.",
  },
  {
    q: "When and how is it delivered?",
    a: "Deliveries arrive chilled between 9am and noon, within four hours of leaving the oven. Reheat for 8 minutes at 180°C and it's as good as fresh from our kitchen.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">FAQ</p>
        <h2 className="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
          Questions, answered.
        </h2>
        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}