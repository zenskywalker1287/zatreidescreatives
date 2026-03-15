import { useRef, useEffect, useState, ReactNode } from "react";

type Variant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "blur" | "slide-up-rotate" | "bounce-up";

const variantStyles: Record<Variant, { hidden: string; visible: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-12",
    visible: "opacity-100 translate-y-0",
  },
  "fade-down": {
    hidden: "opacity-0 -translate-y-12",
    visible: "opacity-100 translate-y-0",
  },
  "fade-left": {
    hidden: "opacity-0 translate-x-16",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    hidden: "opacity-0 -translate-x-16",
    visible: "opacity-100 translate-x-0",
  },
  scale: {
    hidden: "opacity-0 scale-90",
    visible: "opacity-100 scale-100",
  },
  blur: {
    hidden: "opacity-0 blur-sm scale-95",
    visible: "opacity-100 blur-0 scale-100",
  },
  "slide-up-rotate": {
    hidden: "opacity-0 translate-y-16 rotate-1",
    visible: "opacity-100 translate-y-0 rotate-0",
  },
  "bounce-up": {
    hidden: "opacity-0 translate-y-32 scale-75",
    visible: "opacity-100 translate-y-0 scale-100",
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  as?: "div" | "section" | "article" | "span" | "header" | "footer";
  stagger?: number;
}

const ScrollReveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
  className = "",
  as: Tag = "div",
  stagger,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const { hidden, visible } = variantStyles[variant];

  return (
    <Tag
      ref={ref as any}
      className={`transition-all ${inView ? visible : hidden} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: variant === "bounce-up"
          ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
          : "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </Tag>
  );
};

export default ScrollReveal;

// Stagger wrapper - applies increasing delays to direct children
export const StaggerReveal = ({
  children,
  variant = "fade-up",
  staggerMs = 100,
  threshold = 0.1,
  className = "",
}: {
  children: ReactNode[];
  variant?: Variant;
  staggerMs?: number;
  threshold?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const { hidden, visible } = variantStyles[variant];

  return (
    <div ref={ref} className={className}>
      {(children as ReactNode[]).map((child, i) => (
        <div
          key={i}
          className={`transition-all ${inView ? visible : hidden}`}
          style={{
            transitionDuration: "700ms",
            transitionDelay: `${i * staggerMs}ms`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
