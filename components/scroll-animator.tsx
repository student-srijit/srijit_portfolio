"use client";

import type React from "react";

import { useEffect, useRef, type ReactNode } from "react";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "flip"
  | "rotate";

interface ScrollAnimatorProps {
  children: ReactNode;
  type: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollAnimator({
  children,
  type,
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  className = "",
}: ScrollAnimatorProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class when element is in view
            setTimeout(() => {
              element.classList.add("animate");
            }, delay * 1000);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [delay, threshold]);

  // Define initial and animated states for different animation types
  const getAnimationStyles = () => {
    const baseStyles = {
      opacity: 0,
      transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    };

    const animatedClass = "animate";

    switch (type) {
      case "fade-up":
        return {
          initial: { ...baseStyles, transform: "translateY(50px)" },
          [animatedClass]: { opacity: 1, transform: "translateY(0)" },
        };
      case "fade-down":
        return {
          initial: { ...baseStyles, transform: "translateY(-50px)" },
          [animatedClass]: { opacity: 1, transform: "translateY(0)" },
        };
      case "fade-left":
        return {
          initial: { ...baseStyles, transform: "translateX(-50px)" },
          [animatedClass]: { opacity: 1, transform: "translateX(0)" },
        };
      case "fade-right":
        return {
          initial: { ...baseStyles, transform: "translateX(50px)" },
          [animatedClass]: { opacity: 1, transform: "translateX(0)" },
        };
      case "zoom-in":
        return {
          initial: { ...baseStyles, transform: "scale(0.8)" },
          [animatedClass]: { opacity: 1, transform: "scale(1)" },
        };
      case "zoom-out":
        return {
          initial: { ...baseStyles, transform: "scale(1.2)" },
          [animatedClass]: { opacity: 1, transform: "scale(1)" },
        };
      case "flip":
        return {
          initial: {
            ...baseStyles,
            transform: "perspective(400px) rotateY(90deg)",
          },
          [animatedClass]: {
            opacity: 1,
            transform: "perspective(400px) rotateY(0)",
          },
        };
      case "rotate":
        return {
          initial: { ...baseStyles, transform: "rotate(-15deg)" },
          [animatedClass]: { opacity: 1, transform: "rotate(0)" },
        };
      default:
        return {
          initial: baseStyles,
          [animatedClass]: { opacity: 1 },
        };
    }
  };

  const styles = getAnimationStyles();

  return (
    <div
      ref={elementRef}
      className={className}
      style={styles.initial as React.CSSProperties}
    >
      <style jsx>{`
        div.animate {
          opacity: 1;
          transform: ${(styles.animate as any).transform || "none"};
        }
      `}</style>
      {children}
    </div>
  );
}
