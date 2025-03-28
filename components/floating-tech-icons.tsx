"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiGit,
  SiDocker,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiRedux,
  SiFirebase,
} from "react-icons/si";

interface TechIcon {
  icon: React.ReactNode;
  color: string;
  size: number;
  position: {
    top: string;
    left: string;
  };
  delay: number;
  duration: number;
}

export default function FloatingTechIcons() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const techIcons: TechIcon[] = [
    {
      icon: <SiJavascript />,
      color: "#F7DF1E",
      size: 40,
      position: { top: "15%", left: "10%" },
      delay: 0,
      duration: 15,
    },
    {
      icon: <SiHtml5 />,
      color: "#E34F26",
      size: 50,
      position: { top: "25%", left: "85%" },
      delay: 2,
      duration: 18,
    },
    {
      icon: <SiCss3 />,
      color: "#1572B6",
      size: 35,
      position: { top: "40%", left: "15%" },
      delay: 1,
      duration: 20,
    },
    {
      icon: <SiReact />,
      color: "#61DAFB",
      size: 55,
      position: { top: "65%", left: "80%" },
      delay: 3,
      duration: 25,
    },
    {
      icon: <SiNodedotjs />,
      color: "#339933",
      size: 45,
      position: { top: "75%", left: "20%" },
      delay: 2,
      duration: 22,
    },
    {
      icon: <SiMongodb />,
      color: "#47A248",
      size: 38,
      position: { top: "30%", left: "75%" },
      delay: 4,
      duration: 19,
    },
    {
      icon: <SiTypescript />,
      color: "#3178C6",
      size: 42,
      position: { top: "85%", left: "60%" },
      delay: 1,
      duration: 17,
    },
    {
      icon: <SiPython />,
      color: "#3776AB",
      size: 48,
      position: { top: "20%", left: "30%" },
      delay: 3,
      duration: 21,
    },
    {
      icon: <SiCplusplus />,
      color: "#00599C",
      size: 36,
      position: { top: "50%", left: "90%" },
      delay: 2,
      duration: 23,
    },
    {
      icon: <SiGit />,
      color: "#F05032",
      size: 40,
      position: { top: "10%", left: "60%" },
      delay: 0,
      duration: 16,
    },
    {
      icon: <SiDocker />,
      color: "#2496ED",
      size: 44,
      position: { top: "60%", left: "5%" },
      delay: 4,
      duration: 24,
    },
    {
      icon: <SiTailwindcss />,
      color: "#06B6D4",
      size: 46,
      position: { top: "35%", left: "45%" },
      delay: 1,
      duration: 20,
    },
    {
      icon: <SiNextdotjs />,
      color: "#ffffff",
      size: 52,
      position: { top: "70%", left: "40%" },
      delay: 3,
      duration: 22,
    },
    {
      icon: <SiExpress />,
      color: "#ffffff",
      size: 38,
      position: { top: "45%", left: "25%" },
      delay: 2,
      duration: 19,
    },
    {
      icon: <SiRedux />,
      color: "#764ABC",
      size: 42,
      position: { top: "15%", left: "70%" },
      delay: 0,
      duration: 18,
    },
    {
      icon: <SiFirebase />,
      color: "#FFCA28",
      size: 48,
      position: { top: "55%", left: "65%" },
      delay: 1,
      duration: 21,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-30 dark:opacity-20">
      {techIcons.map((tech, index) => (
        <div
          key={index}
          className="absolute animate-float-random"
          style={{
            top: tech.position.top,
            left: tech.position.left,
            color: tech.color,
            fontSize: `${tech.size}px`,
            animationDelay: `${tech.delay}s`,
            animationDuration: `${tech.duration}s`,
          }}
        >
          {tech.icon}
        </div>
      ))}
    </div>
  );
}
