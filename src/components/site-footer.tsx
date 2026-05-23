export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-sm font-semibold tracking-tight text-foreground">Spinach &amp; Cheese Co.</div>
            <p className="mt-1 text-xs text-muted-foreground">Baked fresh. Delivered daily.</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-wider text-muted-foreground">
            <a href="#plans" className="hover:text-foreground">Subscription</a>
            <a href="#how" className="hover:text-foreground">How it's made</a>
            <a href="#benefits" className="hover:text-foreground">Benefits</a>
            <a href="#" className="hover:text-foreground">Support</a>
          </nav>
        </div>
        <div className="mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Spinach &amp; Cheese Co. All rights reserved.
        </div>
      </div>
    </footer>
  );
}