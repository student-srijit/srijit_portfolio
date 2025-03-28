"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  ExternalLink,
  GitFork,
  GitPullRequest,
  Star,
} from "lucide-react";
import { SuperButton } from "@/components/ui/super-button";

interface OpenSourceProject {
  id: number;
  name: string;
  description: string;
  role: string;
  contributions: string[];
  technologies: string[];
  repoUrl?: string;
  demoUrl?: string;
}

export default function OpenSourceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const openSourceProjects: OpenSourceProject[] = [
    {
      id: 1,
      name: "React Component Library",
      description:
        "A collection of reusable React components built with TypeScript and styled with Tailwind CSS.",
      role: "Contributor",
      contributions: [
        "Implemented 5+ new components with comprehensive documentation",
        "Fixed accessibility issues in existing components",
        "Added unit tests using Jest and React Testing Library",
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Jest"],
      repoUrl: "https://github.com/example/react-component-library",
    },
    {
      id: 2,
      name: "Algorithm Visualizer",
      description:
        "An interactive web application that visualizes various algorithms to help understand their working.",
      role: "Creator",
      contributions: [
        "Designed and implemented the entire application architecture",
        "Created visualizations for sorting, searching, and graph algorithms",
        "Implemented step-by-step execution with speed control",
      ],
      technologies: ["JavaScript", "React", "CSS", "Data Structures"],
      repoUrl: "https://github.com/example/algorithm-visualizer",
      demoUrl: "https://algorithm-visualizer-demo.com",
    },
    {
      id: 3,
      name: "Markdown Note Taking App",
      description:
        "A minimalist note-taking application with Markdown support and cloud synchronization.",
      role: "Contributor",
      contributions: [
        "Implemented dark mode with theme persistence",
        "Added keyboard shortcuts for common actions",
        "Improved performance by implementing virtualized lists",
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      repoUrl: "https://github.com/example/markdown-notes",
    },
  ];

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative py-16 px-4 overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10 animated-bg-pattern"></div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 px-3 py-1 text-sm">Open Source</Badge>
          <h2 className="text-4xl font-bold tracking-tighter mb-4">
            My <span className="text-primary">Contributions</span> & Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Showcasing my involvement in open source projects and personal
            coding initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <Card className="h-full overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl light-mode-card group">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white transform transition-all duration-300 group-hover:scale-110">
                  <GitPullRequest className="h-8 w-8" />
                </div>
                <div className="flex items-end justify-center mb-2">
                  <span className="text-4xl font-bold text-primary transition-all duration-300 group-hover:scale-110">
                    25+
                  </span>
                </div>
                <p className="text-muted-foreground">Pull Requests</p>
              </CardContent>
            </Card>
          </div>

          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <Card className="h-full overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl light-mode-card group">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white transform transition-all duration-300 group-hover:scale-110">
                  <GitFork className="h-8 w-8" />
                </div>
                <div className="flex items-end justify-center mb-2">
                  <span className="text-4xl font-bold text-primary transition-all duration-300 group-hover:scale-110">
                    10+
                  </span>
                </div>
                <p className="text-muted-foreground">Repositories</p>
              </CardContent>
            </Card>
          </div>

          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: "0.6s" }}
          >
            <Card className="h-full overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl light-mode-card group">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-purple-500 to-pink-600 text-white transform transition-all duration-300 group-hover:scale-110">
                  <Star className="h-8 w-8" />
                </div>
                <div className="flex items-end justify-center mb-2">
                  <span className="text-4xl font-bold text-primary transition-all duration-300 group-hover:scale-110">
                    100+
                  </span>
                </div>
                <p className="text-muted-foreground">Stars Earned</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {openSourceProjects.map((project, index) => (
            <div
              key={project.id}
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${0.8 + 0.2 * index}s` }}
            >
              <Card className="h-full overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                      {project.role}
                    </Badge>
                    <div className="flex gap-2">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-primary">
                        Contributions:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {project.contributions.map((contribution, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{contribution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-primary">
                        Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="bg-muted/50"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <SuperButton
            variant="gradient"
            size="lg"
            icon={<Github className="h-5 w-5" />}
            onClick={() =>
              window.open("https://github.com/srijitdas", "_blank")
            }
          >
            View My GitHub Profile
          </SuperButton>
        </div>
      </div>
    </div>
  );
}
