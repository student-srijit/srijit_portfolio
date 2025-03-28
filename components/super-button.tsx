"use client";

import React, { type ReactNode, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "3d"
  | "neon"
  | "magnetic"
  | "glitch"
  | "gradient"
  | "liquid"
  | "morphing"
  | "spotlight";
type ButtonSize = "sm" | "md" | "lg" | "xl";
type ButtonShape = "default" | "rounded" | "pill" | "square";

interface SuperButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  glowEffect?: boolean;
  pulseEffect?: boolean;
  className?: string;
  asChild?: boolean;
  hoverText?: string;
  animated?: boolean;
  loading?: boolean;
}

const SuperButton = React.forwardRef<HTMLButtonElement, SuperButtonProps>(
  (
    {
      children,
      variant = "neon",
      size = "md",
      shape = "default",
      icon,
      iconPosition = "left",
      glowEffect = false,
      pulseEffect = false,
      className,
      asChild = false,
      hoverText,
      animated = true,
      loading = false,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Handle magnetic effect
    useEffect(() => {
      if (variant === "magnetic" && buttonRef.current) {
        const handleMouseMove = (e: MouseEvent) => {
          const button = buttonRef.current;
          if (!button) return;

          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          setMousePosition({ x, y });
        };

        buttonRef.current.addEventListener("mousemove", handleMouseMove);

        return () => {
          if (buttonRef.current) {
            buttonRef.current.removeEventListener("mousemove", handleMouseMove);
          }
        };
      }
    }, [variant]);

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      xl: "px-8 py-4 text-xl",
    };

    const shapeClasses = {
      default: "rounded-md",
      rounded: "rounded-lg",
      pill: "rounded-full",
      square: "rounded-none",
    };

    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none relative overflow-hidden";

    const variantClasses = {
      "3d": "btn-3d bg-primary text-white hover:shadow-lg border-b-4 border-primary/70 active:border-b-0 active:mt-1 active:mb-[-1px]",
      neon: "btn-neon bg-primary text-white hover:shadow-lg",
      magnetic: "btn-magnetic bg-primary text-white hover:shadow-lg",
      glitch: "glitch-effect bg-primary text-white hover:shadow-lg",
      gradient:
        "bg-gradient-to-r from-primary to-purple-500 text-white hover:shadow-lg hover:scale-105",
      liquid: "btn-liquid bg-primary text-white hover:shadow-lg",
      morphing: "morph-bg bg-primary text-white hover:shadow-lg",
      spotlight: "spotlight bg-primary text-white hover:shadow-lg",
    };

    const glowClasses = glowEffect
      ? "hover:shadow-[0_0_15px_rgba(79,70,229,0.6)]"
      : "";
    const pulseClasses = pulseEffect ? "animate-pulse-slow" : "";

    // For magnetic effect
    const magneticStyle =
      variant === "magnetic"
        ? {
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.8) 0%, rgba(79, 70, 229, 1) 50%)`,
          }
        : {};

    // Loading spinner
    const loadingSpinner = (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    return (
      <button
        ref={buttonRef}
        className={cn(
          baseClasses,
          sizeClasses[size],
          shapeClasses[shape],
          variantClasses[variant],
          glowClasses,
          pulseClasses,
          "light-mode-button",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-text={variant === "glitch" ? children : undefined}
        style={magneticStyle}
        {...props}
      >
        {loading && loadingSpinner}

        {icon && iconPosition === "left" && !loading && (
          <span
            className={`mr-2 ${animated && isHovered ? "animate-pulse" : ""}`}
          >
            {icon}
          </span>
        )}

        <span className="relative z-10">
          {hoverText && isHovered ? hoverText : children}
          {animated && variant === "gradient" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          )}
        </span>

        {icon && iconPosition === "right" && !loading && (
          <span
            className={`ml-2 ${animated && isHovered ? "animate-pulse" : ""}`}
          >
            {icon}
          </span>
        )}

        {animated && variant === "spotlight" && (
          <span className="absolute inset-0 w-full h-full bg-white/30 transform -translate-y-full transition-transform duration-300 group-hover:translate-y-0 opacity-0 group-hover:opacity-10"></span>
        )}
      </button>
    );
  }
);

SuperButton.displayName = "SuperButton";

export { SuperButton };
