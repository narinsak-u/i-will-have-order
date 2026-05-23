import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Package, Calendar, Truck, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Spinach & Cheese Co." },
      { name: "description", content: "Track your subscription, remaining servings, and next delivery." },
    ],
  }),
  component: DashboardPage,
});

type PlanId = "week" | "month" | "year";
const PLAN_META: Record<PlanId, { name: string; days: number; price: number }> = {
  week: { name: "1 Week", days: 7, price: 24 },
  month: { name: "1 Month", days: 30, price: 89 },
  year: { name: "1 Year", days: 365, price: 899 },
};

function DashboardPage() {
  const [plan, setPlan] = useState<{ planId: PlanId; startedAt: number } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sc:active-plan");
      if (raw) setPlan(JSON.parse(raw));
    } catch {}
  }, []);

  const reset = () => {
    localStorage.removeItem("sc:active-plan");
    setPlan(null);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Account</p>
            <h1 className="mt-3 text-4xl font-light tracking-tight text-foreground">Your subscription</h1>
          </div>
          {plan && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset demo
            </button>
          )}
        </div>

        {!plan ? <EmptyState /> : <ActivePlan plan={plan} />}
      </main>
      <SiteFooter />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-16 rounded-sm border border-dashed border-border p-16 text-center">
      <Package className="mx-auto h-6 w-6 text-muted-foreground" />
      <h2 className="mt-6 text-xl font-light text-foreground">No active subscription</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Choose a plan to start receiving daily baked spinach &amp; cheese.
      </p>
      <Link
        to="/"
        hash="plans"
        className="mt-8 inline-flex h-11 items-center rounded-sm bg-primary px-6 text-xs font-medium uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
      >
        Browse plans
      </Link>
    </div>
  );
}

function ActivePlan({ plan }: { plan: { planId: PlanId; startedAt: number } }) {
  const meta = PLAN_META[plan.planId] ?? PLAN_META.week;
  const elapsedMs = Date.now() - plan.startedAt;
  const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
  const remaining = Math.max(0, meta.days - elapsedDays);
  const used = meta.days - remaining;
  const pct = Math.min(100, Math.max(0, (used / meta.days) * 100));
  const nextDelivery = new Date(Date.now() + 1000 * 60 * 60 * 18);

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-3">
      <section className="lg:col-span-2 rounded-sm border border-border bg-card p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Current plan</p>
            <h2 className="mt-2 text-3xl font-light tracking-tight text-foreground">{meta.name}</h2>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            Active
          </span>
        </div>

        <div className="mt-10">
          <div className="flex items-baseline justify-between">
            <span className="text-5xl font-light tracking-tight text-foreground">{remaining}</span>
            <span className="text-sm text-muted-foreground">of {meta.days} days remaining</span>
          </div>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{used} servings delivered · {remaining} to go</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3 border-t border-border pt-8">
          <Stat label="Started" value={new Date(plan.startedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })} />
          <Stat label="Renews" value={new Date(plan.startedAt + meta.days * 86400000).toLocaleDateString(undefined, { month: "short", day: "numeric" })} />
          <Stat label="Plan value" value={`$${meta.price}`} />
        </div>
      </section>

      <aside className="space-y-6">
        <div className="rounded-sm border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Truck className="h-3.5 w-3.5" /> Next delivery
          </div>
          <p className="mt-3 text-lg font-medium text-foreground">
            Tomorrow, {nextDelivery.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Left the oven · stays fresh 24h refrigerated</p>
        </div>
        <div className="rounded-sm border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" /> Weekly rhythm
          </div>
          <ul className="mt-4 space-y-3 text-sm text-foreground">
            <li className="flex justify-between"><span>Mon – Fri</span><span className="text-muted-foreground">8:00 AM</span></li>
            <li className="flex justify-between"><span>Saturday</span><span className="text-muted-foreground">9:30 AM</span></li>
            <li className="flex justify-between"><span>Sunday</span><span className="text-muted-foreground">Rest day</span></li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-base font-medium text-foreground">{value}</p>
    </div>
  );
}