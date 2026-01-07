"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function MobileNav({
  activeSection,
  onNavigate,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent body scrolling when menu is open
    if (!isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  const handleNavigation = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  const menuItems = [
    { name: "About", section: "about" },
    { name: "Experience", section: "experience" },
    { name: "Projects", section: "projects" },
    { name: "Skills", section: "skills" },
    { name: "Achievements", section: "achievements" },
    { name: "DSA", section: "coding-profiles" },
    { name: "Hobbies", section: "hobbies" },
    { name: "Contact", section: "contact" },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="relative z-[100]"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {isOpen && mounted && createPortal(
        <div
          className="fixed inset-0 bg-black/80 z-[9998] lg:hidden animate-fadeIn"
          onClick={toggleMenu}
        >
          <div
            className="fixed top-0 right-0 h-screen w-[85%] max-w-[320px] bg-background text-foreground border-l p-4 overflow-y-auto animate-slideInRight z-[9999] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Close menu"
                className="text-foreground hover:bg-background/10 rounded-full"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="space-y-4 text-foreground">
              {menuItems.map((item) => (
                <a
                  key={item.section}
                  href={`#${item.section}`}
                  className={`block text-base font-medium py-2 border-l-4 pl-3 transition-colors ${activeSection === item.section
                    ? "border-primary text-primary"
                    : "border-transparent hover:text-primary hover:border-primary/50"
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.section);
                  }}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t">
              <Button
                className="w-full"
                onClick={() => handleNavigation("contact")}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
