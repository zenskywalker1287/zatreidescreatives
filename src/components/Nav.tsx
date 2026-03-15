import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "hero", label: "HOME", num: "01" },
    { id: "comparison", label: "NUMBERS", num: "02" },
    { id: "clients", label: "BRANDS", num: "03" },
    { id: "portfolio", label: "PORTFOLIO", num: "04", route: "/portfolio" },
    { id: "contact", label: "CONTACT", num: "05" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(196,57,29,0.12)" : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <span className="logo-shimmer font-display text-xl tracking-wider">CMD.CTRL</span>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) =>
            link.route ? (
              <Link
                key={link.id}
                to={link.route}
                className="nav-label nav-link-hover text-muted-foreground hover:text-primary"
                style={{ transition: "color 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                [{link.num}] {link.label}
              </Link>
            ) : (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="nav-label nav-link-hover text-muted-foreground hover:text-primary"
                style={{ transition: "color 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                [{link.num}] {link.label}
              </a>
            )
          )}

          {/* Available indicator */}
          <div className="flex items-center gap-2">
            <span className="pulse-dot" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">AVAILABLE</span>
          </div>
        </div>

        <div className="md:hidden">
          <MobileMenu links={links} />
        </div>
      </div>
    </nav>
  );
};

const MobileMenu = ({
  links,
}: {
  links: { id: string; label: string; num: string; route?: string }[];
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="nav-label text-foreground"
      >
        [{open ? "CLOSE" : "MENU"}]
      </button>
      {open && (
        <div className="fixed inset-0 top-[52px] bg-background/98 z-40 flex flex-col items-center justify-center gap-8">
          {links.map((link) =>
            link.route ? (
              <Link
                key={link.id}
                to={link.route}
                onClick={() => setOpen(false)}
                className="nav-label nav-link-hover text-lg text-foreground hover:text-primary"
                style={{ transition: "color 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                [{link.num}] {link.label}
              </Link>
            ) : (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="nav-label nav-link-hover text-lg text-foreground hover:text-primary"
                style={{ transition: "color 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                [{link.num}] {link.label}
              </a>
            )
          )}
          <div className="flex items-center gap-2">
            <span className="pulse-dot" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">AVAILABLE</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
