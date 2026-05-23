import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">S</span>
          <span className="text-sm font-semibold tracking-tight text-foreground">Spinach &amp; Cheese Co.</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#plans" className="hover:text-foreground transition-colors">Plans</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it's made</a>
          <a href="#benefits" className="hover:text-foreground transition-colors">Benefits</a>
          <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
        </nav>
        <Link
          to="/dashboard"
          className="inline-flex h-9 items-center rounded-sm bg-primary px-4 text-xs font-medium tracking-wide text-primary-foreground uppercase hover:bg-primary/90 transition-colors"
        >
          Order
        </Link>
      </div>
    </header>
  );
}