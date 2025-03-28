"use client";

import { useState } from "react";
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  const menuItems = [
    { name: "About", section: "about" },
    { name: "Experience", section: "experience" },
    { name: "Projects", section: "projects" },
    { name: "Skills", section: "skills" },
    { name: "DSA", section: "achievements" },
    { name: "Contact", section: "contact" },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="relative z-50" // Add this class to ensure it's above other elements
      >
        <Menu className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] lg:hidden animate-fadeIn" // Increase z-index to 100
          onClick={toggleMenu}
        >
          <div
            className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-background border-l p-6 overflow-y-auto animate-slideInRight z-[101]" // Increase z-index to 101
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="space-y-6">
              {menuItems.map((item) => (
                <a
                  key={item.section}
                  href={`#${item.section}`}
                  className={`block text-lg font-medium py-2 border-l-4 pl-4 transition-colors ${
                    activeSection === item.section
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

            <div className="mt-8 pt-8 border-t">
              <Button
                className="w-full"
                onClick={() => handleNavigation("contact")}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
