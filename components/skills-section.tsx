"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Layout, Server, Braces, Terminal, Cpu } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SkillsDialog from "@/components/skills-dialog";

export default function SkillsSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    skills: { name: string }[];
    color: string;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useScrollAnimation();

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

  const technicalSkills = [
    { name: "HTML/CSS", category: "frontend" },
    { name: "JavaScript", category: "frontend" },
    { name: "React.js", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "Node.js", category: "backend" },
    { name: "Express.js", category: "backend" },
    { name: "MongoDB", category: "backend" },
    { name: "SQL", category: "backend" },
    { name: "RESTful APIs", category: "backend" },
    { name: "GraphQL", category: "backend" },
    { name: "Data Structures", category: "dsa" },
    { name: "Algorithms", category: "dsa" },
    { name: "Problem Solving", category: "dsa" },
    { name: "Time Complexity", category: "dsa" },
    { name: "Space Complexity", category: "dsa" },
    { name: "Git/GitHub", category: "tools" },
    { name: "Docker", category: "tools" },
    { name: "CI/CD", category: "tools" },
    { name: "Testing", category: "tools" },
  ];

  const dsaTopics = [
    "Arrays & Strings",
    "Linked Lists",
    "Stacks & Queues",
    "Trees & Graphs",
    "Sorting Algorithms",
    "Searching Algorithms",
    "Dynamic Programming",
    "Greedy Algorithms",
    "Recursion & Backtracking",
    "Hashing",
  ];

  const languages = ["JavaScript", "TypeScript", "Python", "C++"];

  const skillCategories = [
    {
      name: "Frontend Development",
      icon: <Layout className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      skills: technicalSkills.filter((skill) => skill.category === "frontend"),
    },
    {
      name: "Backend Development",
      icon: <Server className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
      skills: technicalSkills.filter((skill) => skill.category === "backend"),
    },
    {
      name: "Data Structures & Algorithms",
      icon: <Braces className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      skills: technicalSkills.filter((skill) => skill.category === "dsa"),
    },
    {
      name: "Tools & Technologies",
      icon: <Terminal className="h-6 w-6" />,
      color: "from-amber-500 to-orange-500",
      skills: technicalSkills.filter((skill) => skill.category === "tools"),
    },
  ];

  return (
    <div ref={containerRef} className="space-y-12">
      {/* Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, idx) => (
          <div
            key={category.name}
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: `${0.2 * idx}s` }}
          >
            <Card className="h-full overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl light-mode-card group">
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${category.color} text-white transform transition-all duration-300 group-hover:scale-110`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <div className="space-y-3">
                  {category.skills.slice(0, 3).map((skill) => (
                    <div key={skill.name}>
                      <span className="font-medium text-sm">{skill.name}</span>
                    </div>
                  ))}
                  {category.skills.length > 3 && (
                    <p
                      className="text-xs text-primary mt-2 cursor-pointer hover:underline"
                      onClick={() => {
                        setSelectedCategory({
                          name: category.name,
                          skills: category.skills,
                          color: category.color,
                        });
                        setDialogOpen(true);
                      }}
                    >
                      +{category.skills.length - 3} more skills
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Detailed Skills Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <Card className="h-full overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="bg-primary/20 text-primary p-2 rounded-md mr-3 animate-pulse-slow">
                  <Cpu className="h-6 w-6" />
                </span>
                <span className="relative">
                  Programming Languages
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {languages.map((language, index) => (
                  <div
                    key={language}
                    className="reveal-rotate stagger-1"
                    style={{ transitionDelay: `${0.2 * index}s` }}
                  >
                    <div className="bg-muted/50 rounded-lg p-4 text-center hover:bg-primary/10 transition-all duration-300 hover:scale-105 transform border-2 border-transparent hover:border-primary group h-full flex flex-col justify-center">
                      <div className="mb-2">
                        {language === "JavaScript" && (
                          <div className="text-yellow-500 text-3xl flex justify-center">
                            JS
                          </div>
                        )}
                        {language === "TypeScript" && (
                          <div className="text-blue-500 text-3xl flex justify-center">
                            TS
                          </div>
                        )}
                        {language === "Python" && (
                          <div className="text-blue-600 text-3xl flex justify-center">
                            PY
                          </div>
                        )}
                        {language === "C++" && (
                          <div className="text-purple-500 text-3xl flex justify-center">
                            C++
                          </div>
                        )}
                      </div>
                      <h4 className="font-medium text-lg group-hover:text-primary transition-colors">
                        {language}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          <Card className="h-full overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="bg-primary/20 text-primary p-2 rounded-md mr-3 animate-pulse-slow">
                  <Code className="h-6 w-6" />
                </span>
                <span className="relative">
                  DSA Topics
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dsaTopics.map((topic, index) => (
                  <div
                    key={topic}
                    className="reveal-scale stagger-1"
                    style={{ transitionDelay: `${0.1 * index}s` }}
                  >
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 group border border-transparent hover:border-primary/30">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {topic}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedCategory && (
        <SkillsDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          category={selectedCategory.name}
          skills={selectedCategory.skills}
          color={selectedCategory.color}
        />
      )}
    </div>
  );
}
