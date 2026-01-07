"use client";

import { useRef, useEffect, useState } from "react";
import { SuperButton } from "@/components/ui/super-button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Linkedin,
  Phone,
  MapPin,
  Github,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import AnimatedProjectCard from "@/components/animated-project-card";
import ExperienceTimeline from "@/components/experience-timeline";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";
import HeroSection from "@/components/hero-section";
import ParticleBackground from "@/components/particle-background";
import MobileNav from "@/components/mobile-nav";
import { useMobile } from "@/hooks/use-mobile";
import CursorFollower from "@/components/cursor-follower";
import FloatingTechIcons from "@/components/floating-tech-icons";
import AnimatedBackground from "@/components/animated-background";
import CodingProfiles from "@/components/coding-profiles";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import ProjectDetailsDialog from "@/components/project-details-dialog";
import { LoadingScreen } from "@/components/loading-screen";
import { AnimatePresence } from "framer-motion";
import { projects, personalInfo } from "@/lib/data";
import Hobbies from "@/components/hobbies";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMobile();
  const [activeSection, setActiveSection] = useState("hero");
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Initialize scroll animations
  useScrollAnimation();

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = [
      aboutRef.current,
      experienceRef.current,
      projectsRef.current,
      skillsRef.current,
      achievementsRef.current,
      contactRef.current,
    ];

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Add smooth scrolling with offset for header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update active section
      setActiveSection(id);
    }
  };


  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {!isMobile && <CursorFollower />}
          <ParticleBackground />
          <FloatingTechIcons />
          <AnimatedBackground />

          {/* Project Details Dialog */}
          <ProjectDetailsDialog
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />

          {/* Progress bar */}
          <div className="fixed top-0 left-0 right-0 h-1 bg-primary/30 z-50">
            <div
              className="h-full bg-gradient-to-r from-primary via-purple-500 to-primary transition-all duration-100 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Navigation */}
          <header className="sticky top-0 z-header w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
              <div
                className="font-bold text-xl opacity-0 animate-fadeIn"
                style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              >
                <span className="text-primary">Srijit</span> Das
              </div>

              <nav className="hidden md:flex items-center gap-6">
                {[
                  "about",
                  "experience",
                  "projects",
                  "skills",
                  "dsa",
                  "hobbies",
                  "contact",
                ].map((section, index) => (
                  <a
                    key={section}
                    href={`#${section === "dsa" ? "achievements" : section}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(section === "dsa" ? "achievements" : section);
                    }}
                    className={`text-sm font-medium hover:text-primary transition-colors relative ${activeSection ===
                      (section === "dsa" ? "achievements" : section)
                      ? "text-primary"
                      : ""
                      } opacity-0 animate-fadeIn group`}
                    style={{
                      animationDelay: `${0.3 + index * 0.1}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {section === "dsa"
                      ? "DSA"
                      : section.charAt(0).toUpperCase() + section.slice(1)}
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transform origin-left transition-transform duration-300 ${activeSection ===
                        (section === "dsa" ? "achievements" : section)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    />
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="md:hidden">
                  <MobileNav
                    activeSection={activeSection}
                    onNavigate={scrollToSection}
                  />
                </div>
                <div
                  className="hidden md:block opacity-0 animate-fadeIn"
                  style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
                >
                  <SuperButton
                    variant="gradient"
                    size="md"
                    shape="pill"
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                    glowEffect
                    onClick={() => scrollToSection("contact")}
                  >
                    Get in Touch
                  </SuperButton>
                </div>
              </div>
            </div>
          </header>

          <main className="z-content relative">
            {/* Hero Section */}
            <div style={{ transform: `translateY(${-scrollProgress * 100}px)` }}>
              <HeroSection onScrollDown={() => scrollToSection("about")} />
            </div>

            {/* About Section */}
            <section
              id="about"
              ref={aboutRef}
              className="py-20 md:py-32 relative scroll-mt-16"
            >
              <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="reveal-left">
                    <div>
                      <Badge className="mb-4 px-3 py-1 text-sm">About Me</Badge>
                      <h2 className="text-4xl font-bold tracking-tighter mb-6">
                        <span className="text-primary">AI/ML</span> & Full-Stack Developer
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        B.E. CSE (DSCE, 2024-2028) building AI/ML and computer vision
                        systems plus production-grade web apps. Hacktoberfest finisher (6 PRs), Felicity finalist, and SIH
                        internal round clear. I enjoy shipping end-to-end: data pipelines,
                        model optimization, and polished TypeScript/Next.js front-ends.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-fade-in">
                        <div className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition-all group">
                          <Mail className="h-5 w-5 text-primary group-hover:animate-bounce" />
                          <span>srijitd248@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition-all group">
                          <MapPin className="h-5 w-5 text-primary group-hover:animate-bounce" />
                          <span>Bangalore, Karnataka</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition-all group">
                          <Linkedin className="h-5 w-5 text-primary group-hover:animate-bounce" />
                          <span>LinkedIn Profile</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="reveal-right w-full flex justify-center md:justify-end">
                    <div className="relative w-full max-w-[400px]">
                      {/* Main Profile Card */}
                      <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-primary/20 shadow-2xl transition-all duration-500 hover:border-primary/50 group z-10 bg-muted/10 backdrop-blur-sm">

                        {/* Image */}
                        <img
                          src="/profile.jpeg"
                          alt="Srijit Das"
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

                        {/* Text Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-2xl font-bold tracking-tight mb-1">Srijit Das</h3>
                          <p className="text-sm font-medium text-primary-foreground/80 flex items-center gap-2">
                            Full Stack Developer
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          </p>
                        </div>
                      </div>

                      {/* Floating Badge (Z-Index Fixed) */}
                      <div className="absolute -top-6 -right-6 z-50 transform rotate-12 transition-transform duration-300 hover:rotate-6 custom-bounce-subtle">
                        <div className="relative drop-shadow-2xl filter">
                          {/* SVG Shape */}
                          <svg
                            width="110"
                            height="110"
                            viewBox="0 0 120 120"
                            className="fill-green-500 text-green-600"
                          >
                            {/* Jagged Badge Shape */}
                            <path d="M60,10 L70,25 L85,20 L90,35 L105,40 L100,55 L115,65 L100,75 L105,90 L90,95 L85,110 L70,105 L60,120 L50,105 L35,110 L30,95 L15,90 L20,75 L5,65 L20,55 L15,40 L30,35 L35,20 L50,25 Z" />
                          </svg>

                          {/* Badge Content */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center leading-none pointer-events-none pb-1 pr-1">
                            <span className="font-black text-3xl drop-shadow-md">20+</span>
                            <span className="text-[10px] font-bold uppercase tracking-wide opacity-90 mt-1">Projects<br />Completed</span>
                          </div>
                        </div>
                      </div>

                      {/* Decorative background blur behind card */}
                      <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Experience & Education Section */}
            <section
              id="experience"
              ref={experienceRef}
              className="py-20 md:py-32 bg-muted/30 scroll-mt-16"
            >
              <div className="container">
                <div className="text-center mb-16 reveal-on-scroll">
                  <Badge className="mb-4 px-3 py-1 text-sm">My Journey</Badge>
                  <h2 className="text-4xl font-bold tracking-tighter mb-4">
                    Experience & <span className="text-primary">Education</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    My professional journey and educational background that have
                    shaped my skills and expertise.
                  </p>
                </div>
                <ExperienceTimeline />
              </div>
            </section>

            {/* Projects Section */}
            <section
              id="projects"
              ref={projectsRef}
              className="py-20 md:py-32 scroll-mt-16 relative overflow-hidden"
            >
              <div className="container relative z-10">
                <div className="text-center mb-16 reveal-on-scroll">
                  <Badge className="mb-4 px-3 py-1 text-sm">My Work</Badge>
                  <h2 className="text-4xl font-bold tracking-tighter mb-4">
                    Featured <span className="text-primary">Projects</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Explore some of my recent work and projects that showcase my
                    skills and expertise.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {projects.map((project, index) => (
                    <AnimatedProjectCard
                      key={project.title}
                      title={project.title}
                      description={project.description}
                      tags={project.tags}
                      imageUrl={project.imageUrl}
                      githubUrl={project.githubUrl}
                      index={index}
                      onDetailsClick={() => setSelectedProject(project)}
                    />
                  ))}
                </div>
              </div>

              {/* Background decorative elements */}
              <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
              <div
                className="absolute bottom-1/3 -right-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"
                style={{ animationDelay: "1s" }}
              ></div>
            </section>

            {/* Skills Section */}
            <section
              id="skills"
              ref={skillsRef}
              className="py-20 md:py-32 bg-muted/30 scroll-mt-16"
            >
              <div className="container">
                <div className="text-center mb-16 reveal-on-scroll">
                  <Badge className="mb-4 px-3 py-1 text-sm">What I Know</Badge>
                  <h2 className="text-4xl font-bold tracking-tighter mb-4">
                    Skills & <span className="text-primary">Expertise</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    A comprehensive overview of my technical skills, soft skills,
                    and language proficiencies.
                  </p>
                </div>
                <SkillsSection />
              </div>
            </section>

            {/* Achievements Section */}
            <section
              id="achievements"
              ref={achievementsRef}
              className="py-20 md:py-32 scroll-mt-16 relative overflow-hidden"
            >
              <div className="container relative z-10">
                <CodingProfiles />
              </div>

              {/* Background decorative elements */}
              <div
                className="absolute bottom-1/4 -right-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"
                style={{ animationDelay: "1.2s" }}
              ></div>
            </section>

            {/* Hobbies Section */}
            <section
              id="hobbies"
              className="py-20 md:py-32 scroll-mt-16 relative overflow-hidden"
            >
              <div className="container relative z-10">
                <Hobbies />
              </div>
              {/* Background decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>
            </section>

            {/* Contact Section */}
            <section
              id="contact"
              ref={contactRef}
              className="py-20 md:py-32 scroll-mt-16 relative overflow-hidden"
            >
              <div className="container relative z-10">
                <div className="text-center mb-16 reveal-on-scroll">
                  <Badge className="mb-4 px-3 py-1 text-sm">Get In Touch</Badge>
                  <h2 className="text-4xl font-bold tracking-tighter mb-4">
                    Let's <span className="text-primary">Connect</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Have a project in mind or want to discuss opportunities? I'd
                    love to hear from you!
                  </p>
                </div>
                <ContactSection />
              </div>

              {/* Background decorative elements */}
              <div className="absolute top-1/3 -right-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
              <div
                className="absolute bottom-1/4 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"
                style={{ animationDelay: "1.5s" }}
              ></div>
            </section>
          </main>

          {/* Footer */}
          <footer className="border-t border-white/10 py-16 relative overflow-hidden bg-[#0a0a0a]">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                {/* Brand & Bio */}
                <div className="md:col-span-2 space-y-6">
                  <h3 className="text-3xl font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Srijit</span> Das
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                    Crafting exceptional digital experiences with modern web technologies.
                    Full Stack Developer & ML Engineer focused on performance, accessibility, and design.
                  </p>
                  <div className="flex gap-4">
                    {[
                      { icon: <Mail className="w-5 h-5" />, href: "mailto:srijitd248@gmail.com", label: "Email" },
                      { icon: <Linkedin className="w-5 h-5" />, href: "https://in.linkedin.com/in/srijit-das-dsce-2024-2028-blr", label: "LinkedIn" },
                      { icon: <Github className="w-5 h-5" />, href: "https://github.com/student-srijit", label: "GitHub" },
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-lg font-bold text-white mb-6">Navigation</h4>
                  <ul className="space-y-3">
                    {[
                      "About",
                      "Experience",
                      "Projects",
                      "Skills",
                      "DSA",
                      "Hobbies",
                      "Contact",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href={`#${item.toLowerCase() === "dsa" ? "achievements" : item.toLowerCase()}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.toLowerCase() === "dsa" ? "achievements" : item.toLowerCase());
                          }}
                          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group w-fit"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="text-lg font-bold text-white mb-6">Contact</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                      <span className="text-muted-foreground">
                        Kumaraswamy Layout,<br />South Bangalore,<br />Karnataka, India
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary shrink-0" />
                      <a href="mailto:srijitd248@gmail.com" className="text-muted-foreground hover:text-white transition-colors">
                        srijitd248@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Srijit Das. All rights reserved.
                </p>

              </div>
            </div>
          </footer>

          {/* Scroll to top button */}
          <div
            className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary text-white shadow-lg cursor-pointer transition-all duration-300 z-50 ${scrollProgress > 0.2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
              }`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ChevronDown className="h-6 w-6 transform rotate-180" />
          </div>
        </>
      )}
    </div>
  );
}
