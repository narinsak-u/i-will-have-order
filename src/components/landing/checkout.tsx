import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import planWeek from "@/assets/plan-week.jpg";
import planMonth from "@/assets/plan-month.jpg";
import planYear from "@/assets/plan-year.jpg";

export type PlanId = "week" | "month" | "year";

const PLAN_DETAILS: Record<PlanId, { name: string; price: number; cadence: string; note: string; image: string }> = {
  week: { name: "1 Week", price: 24, cadence: "/ week", note: "7 servings · billed once", image: planWeek },
  month: { name: "1 Month", price: 89, cadence: "/ month", note: "30 servings · save 8%", image: planMonth },
  year: { name: "1 Year", price: 899, cadence: "/ year", note: "365 servings · save 18%", image: planYear },
};

export function Checkout({
  selectedPlan,
  onConfirm,
}: {
  selectedPlan: PlanId | null;
  onConfirm: (id: PlanId, customer: { name: string; email: string; address: string }) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const plan = selectedPlan ? PLAN_DETAILS[selectedPlan] : null;

  return (
    <section id="checkout" className="border-b border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Checkout</p>
          <h2 className="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
            {plan ? `Confirm your ${plan.name.toLowerCase()} plan.` : "Pick a plan to begin checkout."}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {plan
              ? "Review your selection and add your delivery details. You can pause or cancel anytime."
              : "Choose any plan above and we'll bring you down here to complete the order."}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <aside className="lg:col-span-2 rounded-3xl border border-border bg-card p-6">
            {plan ? (
              <>
                <div className="overflow-hidden rounded-2xl">
                  <img src={plan.image} alt={plan.name} className="aspect-[4/3] w-full object-cover" />
                </div>
                <div className="mt-6 flex items-baseline justify-between">
                  <h3 className="text-2xl font-light tracking-tight text-foreground">{plan.name}</h3>
                  <div className="text-right">
                    <div className="text-3xl font-light text-foreground">${plan.price}</div>
                    <div className="text-xs text-muted-foreground">{plan.cadence}</div>
                  </div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{plan.note}</p>
                <ul className="mt-6 space-y-2 border-t border-border pt-6 text-sm text-foreground">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Daily fresh delivery</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Free delivery included</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Pause or cancel anytime</li>
                </ul>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">No plan selected yet.</p>
              </div>
            )}
          </aside>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!selectedPlan) return;
              onConfirm(selectedPlan, { name, email, address });
            }}
            className="lg:col-span-3 rounded-3xl border border-border bg-card p-8"
          >
            <div className="grid gap-5">
              <Field label="Full name" id="co-name" value={name} onChange={setName} placeholder="Jane Doe" required />
              <Field label="Email" id="co-email" type="email" value={email} onChange={setEmail} placeholder="jane@example.com" required />
              <Field label="Delivery address" id="co-addr" value={address} onChange={setAddress} placeholder="221B Baker Street, London" required />
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total today</p>
                <p className="mt-1 text-2xl font-light text-foreground">{plan ? `$${plan.price}` : "—"}</p>
              </div>
              <button
                type="submit"
                disabled={!selectedPlan}
                className="inline-flex h-12 items-center rounded-full bg-primary px-8 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Place order
              </button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Demo checkout — no payment is processed. Your selection is saved to your dashboard.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, id, value, onChange, placeholder, type = "text", required,
}: {
  label: string; id: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}