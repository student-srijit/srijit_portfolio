"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Trophy, Star, CheckCircle2, Timer } from "lucide-react";
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
  const [leetcodeData, setLeetcodeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serverConnected, setServerConnected] = useState(false);

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

  // Fetch LeetCode data
  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        setIsLoading(true);

        // Try to fetch from the local server first
        try {
          const response = await fetch(
            "https://portfolio-backend-f92b.onrender.com/solved-problems"
          );
          if (response.ok) {
            const data = await response.json();

            // Transform the data to match our expected format
            const transformedData = {
              username: leetcodeUsername,
              totalSolved: 50, // Using the static value as requested
              easySolved: 25,
              mediumSolved: 20,
              hardSolved: 5,
              recentSubmissions: data.map((problem: any, index: number) => ({
                id: problem.id || index + 1,
                title: problem.title,
                difficulty:
                  problem.difficulty ||
                  ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)], // Random difficulty if not provided
                category:
                  problem.category ||
                  [
                    "Arrays",
                    "Strings",
                    "Dynamic Programming",
                    "Trees",
                    "Graphs",
                  ][Math.floor(Math.random() * 5)], // Random category if not provided
                completed: true,
                link: problem.link,
                solvedAt: problem.solvedAt,
              })),
            };

            setLeetcodeData(transformedData);
            setIsLoading(false);
            setServerConnected(true);
            return;
          }
        } catch (error) {
          console.error("Error fetching from local server:", error);
          // Continue to fallback data if local server fails
        }

        // Fallback to mock data if server fetch fails
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockData = {
          username: leetcodeUsername,
          totalSolved: 50,
          easySolved: 25,
          mediumSolved: 20,
          hardSolved: 5,
          recentSubmissions: [
            {
              id: 1,
              title: "Two Sum",
              difficulty: "Easy",
              category: "Arrays",
              completed: true,
              link: "https://leetcode.com/problems/two-sum/",
            },
            {
              id: 2,
              title: "Valid Parentheses",
              difficulty: "Easy",
              category: "Stacks",
              completed: true,
              link: "https://leetcode.com/problems/valid-parentheses/",
            },
            {
              id: 3,
              title: "Merge Two Sorted Lists",
              difficulty: "Easy",
              category: "Linked Lists",
              completed: true,
              link: "https://leetcode.com/problems/merge-two-sorted-lists/",
            },
            {
              id: 4,
              title: "Maximum Subarray",
              difficulty: "Medium",
              category: "Dynamic Programming",
              completed: true,
              link: "https://leetcode.com/problems/maximum-subarray/",
            },
            {
              id: 5,
              title: "Climbing Stairs",
              difficulty: "Easy",
              category: "Dynamic Programming",
              completed: true,
              link: "https://leetcode.com/problems/climbing-stairs/",
            },
            {
              id: 6,
              title: "Binary Tree Level Order Traversal",
              difficulty: "Medium",
              category: "Trees",
              completed: true,
              link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
            },
            {
              id: 7,
              title: "First Unique Character in a String",
              difficulty: "Easy",
              category: "Strings",
              completed: true,
              link: "https://leetcode.com/problems/first-unique-character-in-a-string/",
            },
            {
              id: 8,
              title: "Trapping Rain Water",
              difficulty: "Hard",
              category: "Dynamic Programming",
              completed: false,
              link: "https://leetcode.com/problems/trapping-rain-water/",
            },
          ],
        };

        setLeetcodeData(mockData);
      } catch (error) {
        console.error("Error fetching LeetCode data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeetCodeData();
  }, [leetcodeUsername]);

  const dsaStats = [
    {
      title: "Problems Solved",
      value: leetcodeData?.totalSolved || 50,
      icon: <Code className="h-6 w-6" />,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      title: "Contests Participated",
      value: 6,
      icon: <Trophy className="h-6 w-6" />,
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
    {
      title: "Coding Platforms",
      value: 3,
      icon: <Star className="h-6 w-6" />,
      color: "bg-gradient-to-br from-purple-500 to-pink-600",
    },
    {
      title: "Highest Streak",
      value: 22,
      icon: <Timer className="h-6 w-6" />,
      color: "bg-gradient-to-br from-emerald-500 to-green-600",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`py-16 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 px-3 py-1 text-sm">DSA Journey</Badge>
          <h2 className="text-4xl font-bold tracking-tighter mb-4">
            Coding <span className="text-primary">Challenges</span> &
            Achievements
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tracking my progress through data structures and algorithms
            challenges on LeetCode.
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
                <span>Recent LeetCode Challenges</span>
                <div className="flex flex-wrap items-center gap-2">
                  {serverConnected && (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    >
                      Server Connected
                    </Badge>
                  )}
                  {leetcodeUsername && (
                    <Badge variant="outline">@{leetcodeUsername}</Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leetcodeData?.recentSubmissions.map(
                    (challenge: any, index: number) => (
                      <a
                        key={challenge.id}
                        href={challenge.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transform transition-all duration-300 hover:scale-[1.02] ${
                          isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                        }`}
                        style={{ transitionDelay: `${0.9 + 0.1 * index}s` }}
                      >
                        <Card className="overflow-hidden border hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div className="flex items-center gap-3">
                                {challenge.completed ? (
                                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                                ) : (
                                  <div className="h-5 w-5 flex-shrink-0 rounded-full border-2 border-muted-foreground/30"></div>
                                )}
                                <div className="min-w-0">
                                  <p className="font-medium text-sm truncate">
                                    {challenge.title}
                                  </p>
                                  <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                                    <span className="font-semibold">
                                      LeetCode
                                    </span>
                                    <span>•</span>
                                    <span className="truncate">
                                      {challenge.category}
                                    </span>
                                    {challenge.solvedAt && (
                                      <>
                                        <span className="hidden sm:inline">
                                          •
                                        </span>
                                        <span className="truncate hidden sm:inline">
                                          Solved: {challenge.solvedAt}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Badge
                                className={`${getDifficultyColor(
                                  challenge.difficulty
                                )} self-start sm:self-center flex-shrink-0 text-xs`}
                              >
                                {challenge.difficulty}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    )
                  )}
                </div>
              )}

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
