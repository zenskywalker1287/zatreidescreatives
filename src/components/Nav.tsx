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
    { id: "hero", label: "HOME" },
    { id: "comparison", label: "NUMBERS" },
    { id: "clients", label: "BRANDS" },
    { id: "portfolio", label: "PORTFOLIO", route: "/portfolio" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "2px solid rgba(200,50,30,0.2)" : "2px solid transparent",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <span className="logo-shimmer font-display text-[20px] md:text-[22px] tracking-[0.2em]">ZATREIDES</span>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) =>
            link.route ? (
              <Link
                key={link.id}
                to={link.route}
                className="nav-label nav-link-hover text-foreground hover:text-primary"
                style={{ transition: "color 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="nav-label nav-link-hover text-foreground hover:text-primary"
                style={{ transition: "color 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {link.label}
              </a>
            )
          )}

          {/* Available indicator */}
          <div className="flex items-center gap-2">
            <span className="pulse-dot" />
            <span className="font-display text-[12px] uppercase tracking-[0.15em] text-primary">AVAILABLE</span>
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
  links: { id: string; label: string; route?: string }[];
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="nav-label text-foreground"
      >
        {open ? "CLOSE" : "MENU"}
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
                {link.label}
              </Link>
            ) : (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="nav-label nav-link-hover text-lg text-foreground hover:text-primary"
                style={{ transition: "color 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {link.label}
              </a>
            )
          )}
          <div className="flex items-center gap-2">
            <span className="pulse-dot" />
            <span className="font-display text-[12px] uppercase tracking-[0.15em] text-primary">AVAILABLE</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
