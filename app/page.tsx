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
import DSAAchievementsSection from "@/components/achievements-section";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import ProjectDetailsDialog from "@/components/project-details-dialog";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
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

  const projects = [
    {
      title: "Virtual Labs",
      description:
        "Virtual Labs is an interactive platform designed to provide students with hands-on learning experiences in a virtual environment. The platform is built with a modern UI, providing an intuitive and engaging interface. It includes features like a responsive design, a chatbot for support, and integrations with Google Maps and Gemini APIs for enhanced functionality.",
      longDescription:
        "Virtual Labs is an interactive platform that provides students with a hands-on learning experience in a virtual environment, bridging the gap between theory and practice. Featuring a modern and intuitive UI, the platform ensures a seamless user experience with a responsive design accessible across various devices. It includes a chatbot for real-time assistance, helping users navigate experiments and troubleshoot issues efficiently. Additionally, Virtual Labs integrates Google Maps API for location-based simulations and Gemini API for AI-driven feedback and personalized learning recommendations, making it a powerful and engaging tool for interactive education.",
      tags: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Google Maps API",
        "Gemini API",
        "Chatbot Integration",
      ],
      imageUrl: "/vlabs.png",
      githubUrl: "https://github.com/Kausheya2006/vlab_frontend",
      liveUrl: "https://vlab-frontend.vercel.app/",
    },
    {
      title: "AI Ne Bola ",
      description:
        "AI Ne Bola is a comprehensive project that predicts the number of death cases, case fatality ratio (CFR), and other related metrics for various scenarios using machine learning models. It also provides detailed 3D visualizations and interactive web interfaces for users to explore the predictions.",
      longDescription:
        "AI Ne Bola is an advanced predictive platform that leverages machine learning to estimate death cases, case fatality ratio (CFR), and other crucial metrics for various outbreak scenarios, helping researchers and policymakers make data-driven decisions. It integrates real-time environmental data, such as temperature and humidity, to enhance prediction accuracy and provides users with interactive web interfaces to explore trends dynamically. The platform features 3D visualizations that offer an intuitive understanding of outbreak patterns and their potential impact. Additionally, AI Ne Bola includes an AI-powered assistant that suggests preventive measures and possible treatments, making it a valuable tool for public health analysis and response planning.",
      tags: [
        "HTML",
        "CSS",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "GeoJSON",
        "D3.js",
        "Machine Learning",
        "Data Visualization",
        "API Integration",
        "SEO",
      ],
      imageUrl: "/ai-ne-bola.png",
      githubUrl: "https://github.com/Anubhab-Rakshit/ai-ne-bola",
      liveUrl: "https://aeterna.com",
    },
    {
      title: "Civilized Chaos",
      description:
        "CIVILIZED CHAOS is a web application designed to streamline issue reporting, authority management, and provide real-time insights with interactive graphs. This project offers a seamless way for citizens to report issues, view authorities, and access visual data analytics in a structured and responsive layout.",
      longDescription:
        "CIVILIZED CHAOS is a powerful web application designed to revolutionize issue reporting and public administration by providing a structured, efficient, and transparent platform for citizens and authorities. It allows users to report problems such as potholes, infrastructure failures, or other civic issues with detailed descriptions and images, ensuring that concerns reach the appropriate authorities quickly. The platform integrates real-time data visualization through interactive graphs, offering insights into the most reported issues, affected areas, and resolution timelines. With a well-organized authority management system, users can view responsible officials, track responses, and monitor progress. Built with a modern, responsive design, CIVILIZED CHAOS ensures seamless access across devices, making issue reporting and urban management more accessible, data-driven, and efficient.",
      tags: [
        "Full Stack",
        "Real-time Data",
        "User Experience",
        "HTML",
        "CSS",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Data Visualization",
        "Issue Reporting",
        "Authority Management",
        "API Integration",
      ],
      imageUrl: "civilized chaos.png",
      githubUrl: "https://github.com/Anubhab-Rakshit/syntaxerror-hacknovare",
      liveUrl: "https://civilizedchaos.netlify.app/",
    },
    {
      title: "AI Excuse Generator",
      description:
        "An AI-driven excuse generation tool that formulates creative excuses based on user input using Natural Language Processing (NLP).",
      longDescription:
        "An AI-driven excuse generation tool utilizes advanced Natural Language Processing (NLP) algorithms to craft creative, context-aware excuses tailored to user input. Whether for missing deadlines, avoiding social events, or explaining unexpected situations, the tool intelligently analyzes the scenario provided by the user and generates plausible, humorous, or professional excuses based on tone and complexity preferences. By incorporating contextual understanding, sentiment analysis, and dynamic response generation, this AI ensures that each excuse sounds natural and convincing. Additionally, it can adapt to different categories, such as school, work, or personal life, making it a versatile solution for those in need of a quick, well-structured justification.",
      tags: [
        "HTML",
        "CSS",
        "JavaScript",
        "AI",
        "NLP",
        "Excuse Generation",
        "Responsive Design",
        "User Experience",
      ],
      imageUrl: "/ai-excuse.jpeg",
      githubUrl: "https://github.com/Anubhab-Rakshit/excuse-generator",
      liveUrl: "https://excuse-me-five.vercel.app/",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
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
      <header className="sticky top-0 z-[60] w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
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
              "contact",
            ].map((section, index) => (
              <a
                key={section}
                href={`#${section === "dsa" ? "achievements" : section}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section === "dsa" ? "achievements" : section);
                }}
                className={`text-sm font-medium hover:text-primary transition-colors relative ${
                  activeSection ===
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
                  className={`absolute -bottom-1 left-  + section.slice(1)}
                <span
                  className={\`absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                    activeSection ===
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
            <div className="md:hidden relative z-50">
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

      <main>
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
                    <span className="text-primary">Passionate</span> Web
                    Developer
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Detail-oriented Full Stack Developer with a Bachelor of
                    Engineering in Computer Science and a robust skill set in
                    front-end and back-end technologies. Proficient in crafting
                    responsive and user-centric web applications. Experienced in
                    collaborating on diverse projects and participating in
                    hackathons, bringing innovative solutions to complex
                    problems.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-fade-in">
                    <div className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition-all group">
                      <Mail className="h-5 w-5 text-primary group-hover:animate-bounce" />
                      <span>srijitd248@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition-all group">
                      <Phone className="h-5 w-5 text-primary group-hover:animate-bounce" />
                      <span>+91 73846 62005</span>
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

              <div className="reveal-right">
                <div className="relative">
                  <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-primary/20 max-w-[400px] mx-auto shadow-2xl hover:shadow-[0_10px_40px_rgba(79,70,229,0.4)] transition-all duration-500 hover:border-primary gradient-border-animated">
                    <img
                      src="/profile-image.jpg"
                      alt="Srijit Das"
                      className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold">Srijit Das</h3>
                      <p className="text-sm opacity-90">Full Stack Developer</p>
                    </div>
                  </div>
                  {/* Cloud-shaped sticker for projects completed */}
                  <div className="absolute -top-6 -right-6 md:-right-10 text-white p-4 z-10 transform rotate-12">
                    <div className="relative">
                      <svg
                        width="120"
                        height="80"
                        viewBox="0 0 120 80"
                        className="fill-green-500 transform hover:scale-110 transition-all duration-300"
                      >
                        <path d="M10,40 Q0,30 10,20 Q15,0 30,10 Q40,0 50,10 Q65,0 70,10 Q90,0 100,20 Q120,10 110,40 Q120,60 100,70 Q90,90 70,70 Q60,90 50,70 Q40,90 30,70 Q10,80 10,60 Q0,50 10,40" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="font-bold text-xl">4+</span>
                          <div className="text-xs font-medium leading-tight">
                            Projects
                            <br />
                            Completed
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  liveUrl={project.liveUrl}
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
            <DSAAchievementsSection leetcodeUsername="srijit_2028" />
          </div>

          {/* Background decorative elements */}
          <div className="absolute top-1/3 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute bottom-1/4 -right-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1.2s" }}
          ></div>
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
      <footer className="border-t py-12 relative overflow-hidden animated-bg-pattern">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="reveal-left">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-primary">Srijit</span> Das
              </h3>
              <p className="text-muted-foreground mb-4">
                Full Stack Web Developer specializing in creating modern,
                responsive web applications.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-muted/80 p-2 rounded-full hover:bg-primary/20 transition-all duration-300 hover:-translate-y-2 transform hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
                <a
                  href="https://in.linkedin.com/in/srijit-das-dsce-2024-2028-blr"
                  className="bg-muted/80 p-2 rounded-full hover:bg-primary/20 transition-all duration-300 hover:-translate-y-2 transform hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/student-srijit"
                  className="bg-muted/80 p-2 rounded-full hover:bg-primary/20 transition-all duration-300 hover:-translate-y-2 transform hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
            </div>

            <div className="reveal-up stagger-2">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  "About",
                  "Experience",
                  "Projects",
                  "Skills",
                  "DSA",
                  "Contact",
                ].map((item, index) => (
                  <li
                    key={item}
                    className="hover:translate-x-2 transition-transform duration-300"
                  >
                    <a
                      href={`#${
                        item.toLowerCase() === "dsa"
                          ? "achievements"
                          : item.toLowerCase()
                      }`}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(
                          item.toLowerCase() === "dsa"
                            ? "achievements"
                            : item.toLowerCase()
                        );
                      }}
                    >
                      <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal-right stagger-3">
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300 group">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 group-hover:animate-bounce" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    Kumaraswamy Layout, South Bangalore, Karnataka, India
                  </span>
                </li>
                <li className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300 group">
                  <Phone className="h-5 w-5 text-primary group-hover:animate-bounce" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    +91 73846 62005
                  </span>
                </li>
                <li className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-300 group">
                  <Mail className="h-5 w-5 text-primary group-hover:animate-bounce" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    srijitd248@gmail.com
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Â© {new Date().getFullYear()} Srijit Das. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      {/* Scroll to top button */}
      <div
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary text-white shadow-lg cursor-pointer transition-all duration-300 z-50 ${
          scrollProgress > 0.2
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronDown className="h-6 w-6 transform rotate-180" />
      </div>
    </div>
  );
}
