import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "hero", label: "LOGIC", num: "01" },
    { id: "comparison", label: "PROCESS", num: "02" },
    { id: "personas", label: "PERSONAS", num: "03" },
    { id: "portfolio", label: "PORTFOLIO", num: "04" },
    { id: "contact", label: "CONTACT", num: "05" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-sm border-b border-foreground/10"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <span className="meta-label text-primary">CMD.CTRL</span>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="nav-label text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              [{link.num}] {link.label}
            </a>
          ))}
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
  links: { id: string; label: string; num: string }[];
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
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="nav-label text-lg text-foreground hover:text-primary transition-colors"
            >
              [{link.num}] {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Nav;
