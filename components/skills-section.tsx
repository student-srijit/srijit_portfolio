"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Layout, Terminal, Cpu, Code, Database, Globe, Server, Smartphone, Wrench } from "lucide-react";

const languages = [
  { name: "JavaScript", color: "#f7df1e", icon: "JS" },
  { name: "TypeScript", color: "#3178c6", icon: "TS" },
  { name: "Python", color: "#3776ab", icon: "PY" },
  { name: "C++", color: "#00599c", icon: "C++" },
  { name: "HTML/CSS", color: "#e34c26", icon: "< >" },
];

const frameworks = [
  { name: "React", icon: <Globe className="w-6 h-6" />, color: "text-cyan-400" },
  { name: "Next.js", icon: <Layout className="w-6 h-6" />, color: "text-white" },
  { name: "Node.js", icon: <Server className="w-6 h-6" />, color: "text-green-500" },
  { name: "PyTorch", icon: <Cpu className="w-6 h-6" />, color: "text-orange-500" },
  { name: "TensorFlow", icon: <Database className="w-6 h-6" />, color: "text-yellow-500" },
  { name: "Flutter", icon: <Smartphone className="w-6 h-6" />, color: "text-blue-400" },
];

const tools = [
  "Git", "Docker", "AWS", "Figma", "MongoDB", "PostgreSQL", "Linux", "Vercel"
];

export default function SkillsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[800px] flex flex-col items-center justify-center perspective-1000">

      {/* Floating 3D Language Orbs */}
      <div className="flex flex-wrap justify-center gap-8 mb-20 w-full max-w-6xl z-10">
        {languages.map((lang, i) => (
          <SkillOrb key={lang.name} skill={lang} index={i} />
        ))}
      </div>

      {/* Glassmorphic Tech Stack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
        <TechCard title="Frameworks & Libraries" items={frameworks} type="frameworks" />
        <TechCard title="Tools & Platforms" items={tools} type="tools" />
      </div>

      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at center, #4f46e5 0%, transparent 70%)",
          y,
          opacity
        }}
      />
    </div>
  );
}

function SkillOrb({ skill, index }: { skill: any, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left - width / 2) / 2);
    mouseY.set((clientY - top - height / 2) / 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="flex flex-col items-center gap-3 group cursor-pointer"
    >
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md border border-white/10 flex items-center justify-center relative shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_50px_rgba(79,70,229,0.3)] transition-shadow duration-500"
      >
        <div
          className="text-2xl font-black"
          style={{ color: skill.color, textShadow: `0 0 20px ${skill.color}50` }}
        >
          {skill.icon}
        </div>

        {/* Orbital Ring */}
        <div className="absolute inset-0 rounded-full border border-white/5 scale-110 group-hover:scale-125 transition-transform duration-500" />
      </motion.div>
      <span className="font-mono text-sm text-muted-foreground group-hover:text-white transition-colors">
        {skill.name}
      </span>
    </motion.div>
  );
}

function TechCard({ title, items, type }: { title: string, items: any[], type: 'frameworks' | 'tools' }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-white/10 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        {type === 'frameworks' ? <Code className="w-5 h-5 text-purple-400" /> : <Wrench className="w-5 h-5 text-orange-400" />}
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {type === 'frameworks' ? (
          items.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <span className={item.color}>{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))
        ) : (
          items.map((item: string, i: number) => (
            <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-mono text-muted-foreground hover:text-white hover:border-white/20 transition-all">
              {item}
            </span>
          ))
        )}
      </div>
    </motion.div>
  );
}
