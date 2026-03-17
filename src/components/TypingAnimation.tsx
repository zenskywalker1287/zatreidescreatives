import { useEffect, useState } from "react";

interface TypingAnimationProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  started?: boolean;
}

const TypingAnimation = ({
  text,
  className = "",
  duration = 50,
  delay = 0,
  started = true,
}: TypingAnimationProps) => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!started) {
      setDisplayed("");
      return;
    }

    let i = 0;
    const timeout = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          // Blink cursor a few times then hide
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, duration);
      return () => clearInterval(iv);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, duration, delay, started]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && started && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle animate-pulse" />
      )}
    </span>
  );
};

export default TypingAnimation;
