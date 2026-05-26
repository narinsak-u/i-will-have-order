import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/landing/hero";
import { Plans } from "@/components/landing/plans";
import { HowItsMade } from "@/components/landing/how-its-made";
import { Benefits } from "@/components/landing/benefits";
import { Faq } from "@/components/landing/faq";
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
  const handleSubscribe = (planId: string) => {
    try {
      localStorage.setItem(
        "sc:active-plan",
        JSON.stringify({ planId, startedAt: Date.now() }),
      );
    } catch {}
    toast.success("Added to cart", { description: `${planId} plan saved. Heading to dashboard...` });
    setTimeout(() => navigate({ to: "/dashboard" }), 700);
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <SiteHeader />
      <main>
        <Hero />
        <Plans onSubscribe={handleSubscribe} />
        <HowItsMade />
        <Benefits />
        <Faq />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}
