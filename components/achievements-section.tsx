"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Trophy, Star, Timer } from "lucide-react";
import { SuperButton } from "@/components/ui/super-button";

interface DSAChallenge {
  id: number;
  platform: string;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  completed: boolean;
  link?: string;
}

interface DSAAchievementsSectionProps {
  leetcodeUsername?: string;
}

export default function DSAAchievementsSection({
  leetcodeUsername = "srijit_2028",
}: DSAAchievementsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const achievementStats = [
    {
      title: "LeetCode Problems Solved",
      value: 1569,
      icon: <Code className="h-6 w-6" />,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      title: "Hacktoberfest '25 PRs",
      value: 6,
      icon: <Trophy className="h-6 w-6" />,
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
    {
      title: "Hackathon Finals",
      value: "Felicity '25",
      icon: <Star className="h-6 w-6" />,
      color: "bg-gradient-to-br from-purple-500 to-pink-600",
    },
    {
      title: "Podiums & Finals",
      value: "SIH, BruteForce",
      icon: <Timer className="h-6 w-6" />,
      color: "bg-gradient-to-br from-emerald-500 to-green-600",
    },
  ];

  const achievements = [
    {
      title: "Hacktoberfest 2025",
      detail: "Completed the event with 6 accepted PRs across multiple repos.",
      tag: "Open Source",
    },
    {
      title: "Felicity Hackathon Finalist",
      detail:
        "One of 15 finalist teams out of 200+ entrants at the Felicity Hackathon.",
      tag: "Hackathon",
    },
    {
      title: "Smart India Hackathon (Internal)",
      detail:
        "Cleared the SIH internal round building a CNN for underwater image enhancement.",
      tag: "Computer Vision",
    },
    {
      title: "BruteForce — 1st Runner Up",
      detail: "Built an automated admin-mapped pet servicing platform.",
      tag: "Product Build",
    },
    {
      title: "Cosmys ML Kaggle Hackathon",
      detail:
        "Advanced to Round 3 with a CNN voice classifier trained on VM GPU.",
      tag: "Kaggle",
    },
    {
      title: "Instruo’13 — 2nd Rank",
      detail: "Secured 2nd rank at IIEST Shibpur.",
      tag: "Competition",
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

  const dsaStats = achievementStats;

  return (
    <div
      ref={containerRef}
      className={`py-16 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 px-3 py-1 text-sm">Wins & Impact</Badge>
          <h2 className="text-4xl font-bold tracking-tighter mb-4">
            Achievements & <span className="text-primary">Highlights</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hackathons, open source, LeetCode grind, and podiums that showcase
            how I deliver under pressure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dsaStats.map((stat, index) => (
            <div
              key={stat.title}
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${0.2 * index}s` }}
            >
              <Card className="h-full overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl light-mode-card group">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${stat.color} text-white transform transition-all duration-300 group-hover:scale-110`}
                  >
                    {stat.icon}
                  </div>

                  <div className="flex items-end justify-center mb-2">
                    <span className="text-4xl font-bold text-primary transition-all duration-300 group-hover:scale-110">
                      {stat.value}
                    </span>
                  </div>

                  <p className="text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
          style={{ transitionDelay: "0.8s" }}
        >
          <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
            <CardHeader className="bg-primary/10 border-b">
              <CardTitle className="text-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span>Recent Achievements & Highlights</span>
                {leetcodeUsername && (
                  <Badge variant="outline">@{leetcodeUsername}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.title}
                    className={`transform transition-all duration-300 hover:scale-[1.02] ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${0.9 + 0.1 * index}s` }}
                  >
                    <Card className="overflow-hidden border hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-semibold text-base">
                              {achievement.title}
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {achievement.detail}
                            </p>
                          </div>
                          <Badge variant="secondary" className="flex-shrink-0">
                            {achievement.tag}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <SuperButton
                  variant="gradient"
                  size="md"
                  icon={<Code className="h-5 w-5" />}
                  onClick={() =>
                    window.open(
                      `https://leetcode.com/u/${leetcodeUsername}/`,
                      "_blank"
                    )
                  }
                >
                  View My LeetCode Profile
                </SuperButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
