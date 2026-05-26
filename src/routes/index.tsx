import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/landing/hero";
import { Plans } from "@/components/landing/plans";
import { HowItsMade } from "@/components/landing/how-its-made";
import { Benefits } from "@/components/landing/benefits";
import { DeliveryTiming } from "@/components/landing/delivery-timing";
import { Testimonials } from "@/components/landing/testimonials";
import { Faq } from "@/components/landing/faq";
import { Checkout, type PlanId } from "@/components/landing/checkout";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spinach & Cheese Co. — Baked fresh, delivered daily" },
      { name: "description", content: "Subscribe to a daily ramekin of organic baked spinach and melted cheese. 1 week, 1 month, and 1 year plans." },
      { property: "og:title", content: "Spinach & Cheese Co." },
      { property: "og:description", content: "Baked fresh, delivered daily." },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);

  const handleSelect = (planId: string) => {
    setSelectedPlan(planId as PlanId);
    // scroll to checkout after state updates
    setTimeout(() => {
      document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleConfirm = (planId: PlanId) => {
    try {
      localStorage.setItem(
        "sc:active-plan",
        JSON.stringify({ planId, startedAt: Date.now() }),
      );
    } catch {}
    toast.success("Order placed", { description: `${planId} plan confirmed. Heading to dashboard...` });
    setTimeout(() => navigate({ to: "/dashboard" }), 700);
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <SiteHeader />
      <main>
        <Hero />
        <Plans onSelect={handleSelect} selectedId={selectedPlan} />
        <HowItsMade />
        <Benefits />
        <DeliveryTiming />
        <Testimonials />
        <Faq />
        <Checkout selectedPlan={selectedPlan} onConfirm={handleConfirm} />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}
