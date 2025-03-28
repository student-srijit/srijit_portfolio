"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="relative h-9 w-9 rounded-full"
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <div className="transform transition-transform active:scale-90 duration-200">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="relative h-9 w-9 rounded-full overflow-hidden border-primary/20"
      >
        <div className="absolute inset-0 transition-opacity duration-300">
          {theme === "dark" ? (
            <Moon className="h-5 w-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all" />
          ) : (
            <Sun className="h-5 w-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all" />
          )}
        </div>
      </Button>
    </div>
  );
}
