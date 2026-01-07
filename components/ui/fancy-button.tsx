"use client";

import React, { forwardRef, type ReactNode, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "3d" | "neon" | "magnetic" | "glitch" | "gradient";
type ButtonSize = "sm" | "md" | "lg";

interface FancyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  glowEffect?: boolean;
  className?: string;
  asChild?: boolean;
}

const FancyButton = forwardRef<HTMLButtonElement, FancyButtonProps>(
  (
    {
      children,
      variant = "neon",
      size = "md",
      icon,
      iconPosition = "left",
      glowEffect = false,
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const sizeClasses: Record<ButtonSize, string> = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 focus:outline-none";

    const variantClasses: Record<ButtonVariant, string> = {
      "3d": "btn-3d bg-primary text-white hover:shadow-lg",
      neon: "btn-neon bg-primary text-white hover:shadow-lg",
      magnetic: "btn-magnetic bg-primary text-white hover:shadow-lg",
      glitch: "glitch-effect bg-primary text-white hover:shadow-lg",
      gradient:
        "bg-gradient-to-r from-primary to-purple-500 text-white hover:shadow-lg hover:scale-105",
    };

    const glowClasses = glowEffect
      ? "hover:shadow-[0_0_15px_rgba(79,70,229,0.6)]"
      : "";

    const Comp = asChild ? Slot : "button";

    if (asChild) {
      return (
        <Comp
          ref={ref}
          className={cn(
            baseClasses,
            sizeClasses[size],
            variantClasses[variant],
            glowClasses,
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-text={
            variant === "glitch" && typeof children === "string"
              ? children
              : undefined
          }
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          glowClasses,
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-text={
          variant === "glitch" && typeof children === "string"
            ? children
            : undefined
        }
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className={`mr-2 ${isHovered ? "animate-pulse" : ""}`}>
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === "right" && (
          <span className={`ml-2 ${isHovered ? "animate-pulse" : ""}`}>
            {icon}
          </span>
        )}
      </Comp>
    );
  }
);

FancyButton.displayName = "FancyButton";

export { FancyButton };
