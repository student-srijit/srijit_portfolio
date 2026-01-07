"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SuperButton } from "@/components/ui/super-button";
import { ExternalLink, Github, ChevronRight, Eye } from "lucide-react";

interface AnimatedProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  index: number;
  onDetailsClick?: () => void;
}

export default function AnimatedProjectCard({
  title,
  description,
  tags,
  imageUrl,
  githubUrl,
  index,
  onDetailsClick,
}: AnimatedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`h-full transform transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      style={{ transitionDelay: `${0.2 * index}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetRotation();
      }}
      onMouseMove={handleMouseMove}
      ref={cardRef}
    >
      <Card
        className="overflow-hidden h-full transition-all duration-500 hover:shadow-xl group relative border-2 light-mode-card"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            : "perspective(1000px)",
          borderColor: isHovered ? "hsl(var(--primary))" : "hsl(var(--border))",
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 transition-opacity duration-300 z-0 ${isHovered ? "opacity-100" : "opacity-0"
            }`}
        />

        <div className="aspect-video overflow-hidden relative">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? "scale-110 brightness-90" : "scale-100 brightness-100"
              }`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-start p-4 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"
              }`}
          >
            <div
              className={`transform transition-all duration-500 w-full flex justify-between ${isHovered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
                }`}
            >
              <div className="flex gap-2">
                {githubUrl && (
                  <SuperButton
                    variant="neon"
                    size="sm"
                    icon={<Github className="h-4 w-4" />}
                    onClick={() => window.open(githubUrl, "_blank")}
                    className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                  >
                    View Code
                  </SuperButton>
                )}
              </div>
              <SuperButton
                variant="gradient"
                size="sm"
                icon={<Eye className="h-4 w-4" />}
                className="bg-primary/80 hover:bg-primary text-white backdrop-blur-sm"
                onClick={onDetailsClick}
              >
                Details
              </SuperButton>
            </div>
          </div>
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center justify-between">
            <span
              className={`transition-all duration-300 ${isHovered ? "text-primary" : ""
                }`}
            >
              {title}
            </span>
            <div
              className={`transform transition-all duration-300 ${isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
                }`}
              onClick={onDetailsClick}
              style={{ cursor: "pointer" }}
            >
              <ChevronRight className="h-5 w-5 text-primary" />
            </div>
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, tagIndex) => (
              <Badge
                key={tagIndex}
                variant="secondary"
                className={`bg-secondary/50 transition-all duration-300 ${isHovered ? "bg-primary/20 text-primary" : ""
                  }`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        {/* Animated corner */}
        <div
          className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary to-purple-500 transition-all duration-300 transform origin-top-right ${isHovered ? "scale-100" : "scale-0"
            }`}
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
          }}
        />
      </Card>
    </div>
  );
}
