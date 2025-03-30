"use client";

import { useEffect, useRef, useState } from "react";
import { FancyButton } from "@/components/ui/fancy-button";
import { ChevronDown, Code, ArrowRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import FloatingTechIcons from "./floating-tech-icons";

interface HeroSectionProps {
  onScrollDown: () => void;
}

export default function HeroSection({ onScrollDown }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Simulate loading sequence
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { left, top, width, height } =
        heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setMousePosition({ x, y });
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Floating tech icons */}
      <FloatingTechIcons />

      {/* Animated background gradient that follows mouse */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-500/10 z-0 transition-all duration-300 ease-out"
        style={{
          backgroundPosition: `${mousePosition.x * 100}% ${
            mousePosition.y * 100
          }%`,
        }}
      />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Animated code lines in background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-[10%] left-[5%] text-primary text-xs font-mono animate-float-random">
          {`function Developer() {`}
          <br />
          {`  const [skills, setSkills] = useState([]);`}
          <br />
          {`  useEffect(() => {`}
          <br />
          {`    const learnNewSkills = async () => {`}
          <br />
          {`      const newSkills = await fetchSkills();`}
          <br />
          {`      setSkills([...skills, ...newSkills]);`}
          <br />
          {`    };`}
          <br />
          {`    learnNewSkills();`}
          <br />
          {`  }, [motivation]);`}
          <br />
          {`}`}
        </div>
        <div
          className="absolute top-[30%] right-[10%] text-primary text-xs font-mono animate-float-random"
          style={{ animationDelay: "1s" }}
        >
          {`class Algorithm {`}
          <br />
          {`  constructor(problem) {`}
          <br />
          {`    this.problem = problem;`}
          <br />
          {`    this.solutions = [];`}
          <br />
          {`  }`}
          <br />
          {`  solve() {`}
          <br />
          {`    const solution = this.analyze()`}
          <br />
          {`      .then(this.design())`}
          <br />
          {`      .then(this.implement())`}
          <br />
          {`      .then(this.test());`}
          <br />
          {`    return solution;`}
          <br />
          {`  }`}
          <br />
          {`}`}
        </div>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-10"></div>

      {/* Content */}
      <div className="container relative z-20 text-center">
        <div className="space-y-6 max-w-3xl mx-auto">
          <div
            className={`inline-block transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            <span className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>Full Stack Web Developer</span>
              </span>
              <span className="absolute inset-0 bg-primary/10 w-0 group-hover:w-full transition-all duration-700"></span>
            </span>
          </div>

          <h1
            className={`text-5xl md:text-7xl font-bold tracking-tighter transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            Hi, I'm{" "}
            <span className="text-primary relative inline-block">
              <span className="relative z-10">Srijit Das</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"></span>
              <span className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full w-0 group-hover:w-full animate-growWidth"></span>
            </span>
          </h1>

          <div
            className={`h-12 transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.7s" }}
          >
            <div className="text-xl md:text-2xl text-muted-foreground">
              I'm a{" "}
              <span className="text-primary font-medium">
                <TypeAnimation
                  sequence={[
                    "Web Developer",
                    2000,
                    "Problem Solver",
                    2000,
                    "DSA Enthusiast",
                    2000,
                    "Creative Coder",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Number.POSITIVE_INFINITY}
                />
              </span>
            </div>
          </div>

          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.9s" }}
          >
            I build modern, responsive web applications with a focus on user
            experience and performance. Passionate about data structures,
            algorithms, and solving complex problems.
          </p>

          <div
            className={`flex flex-wrap justify-center gap-6 pt-8 transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "1.1s" }}
          >
            <FancyButton
              variant="3d"
              size="lg"
              icon={<Code className="h-5 w-5" />}
              glowEffect
              className="rounded-full px-8 relative overflow-hidden group"
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </FancyButton>

            <FancyButton
              variant="neon"
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
              iconPosition="right"
              className="rounded-full px-8 bg-transparent border-2 border-primary hover:bg-primary/10 text-white hover:text-white"
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Contact Me
            </FancyButton>
          </div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/30 animate-float-random"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Scroll down indicator - moved down and separated from buttons */}
      <div
        className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer transition-all duration-1000 hidden md:flex flex-col items-center ${
          isLoaded ? "opacity-100" : "opacity-0"
        } animate-bounce-custom`}
        style={{ transitionDelay: "1.5s" }}
        onClick={onScrollDown}
      >
        <span className="text-sm font-medium text-muted-foreground">
          Scroll Down
        </span>
        <div className="relative">
          <ChevronDown className="h-6 w-6 text-primary" />
          <span className="absolute inset-0 rounded-full animate-ping bg-primary/30"></span>
        </div>
      </div>

      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f46e5,#8b5cf6)] opacity-20 dark:opacity-10">
        <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </section>
  );
}
