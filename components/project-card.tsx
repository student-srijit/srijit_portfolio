"use client";

import type React from "react";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ChevronRight, Code } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  liveUrl,
  githubUrl,
  index,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
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

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className="h-full reveal-scale stagger-1"
      style={{ transitionDelay: `${0.1 * index}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetRotation();
      }}
      onMouseMove={handleMouseMove}
      ref={cardRef}
    >
      <Card
        className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl group relative border-2"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            : "perspective(1000px)",
          borderColor: isHovered ? "hsl(var(--primary))" : "hsl(var(--border))",
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 transition-opacity duration-300 z-0 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="aspect-video overflow-hidden relative">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? "scale-110 brightness-90" : "scale-100 brightness-100"
            }`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-start p-4 transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`transform transition-all duration-500 w-full flex justify-between ${
                isHovered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex gap-2">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neon flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-md font-medium text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neon flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-md font-medium text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                )}
              </div>
              <a
                href="#"
                className="btn-magnetic flex items-center gap-1 bg-primary/80 hover:bg-primary text-white px-3 py-2 rounded-md font-medium text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Code className="h-4 w-4" />
                Details
              </a>
            </div>
          </div>
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center justify-between">
            <span
              className={`transition-all duration-300 ${
                isHovered ? "text-primary" : ""
              }`}
            >
              {title}
            </span>
            <div
              className={`transform transition-all duration-300 ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
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
                className={`bg-secondary/50 transition-all duration-300 ${
                  isHovered ? "bg-primary/20 text-primary" : ""
                }`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
