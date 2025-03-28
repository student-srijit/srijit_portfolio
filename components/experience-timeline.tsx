"use client";

import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, GraduationCap, Briefcase } from "lucide-react";

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="space-y-12 relative">
      {/* Timeline line */}
      <div className="absolute top-0 bottom-0 left-4 md:left-5 w-0.5 bg-primary/20"></div>
      <div className="absolute top-0 bottom-0 left-4 md:left-5 w-0.5 bg-primary origin-top animate-growDown"></div>

      <div
        className="relative pl-8 md:pl-10 opacity-0 animate-fadeInUp"
        style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
      >
        <div className="absolute w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center -left-1 border-2 border-primary z-10 hover:scale-110 hover:bg-primary/30 transition-all">
          <Briefcase className="h-5 w-5 text-primary" />
        </div>
        <Card className="transform transition-all hover:scale-[1.02] hover:shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <CardTitle className="text-xl">
                Self-Employed Web Developer
              </CardTitle>
              <CardDescription className="flex items-center text-primary/80 font-medium">
                <Calendar className="h-4 w-4 mr-1" />
                2024 - Present
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li
                className="opacity-0 animate-fadeInLeft"
                style={{
                  animationDelay: "0.3s",
                  animationFillMode: "forwards",
                }}
              >
                Designed and developed multiple websites for various clients,
                focusing on user experience and responsiveness.
              </li>
              <li
                className="opacity-0 animate-fadeInLeft"
                style={{
                  animationDelay: "0.4s",
                  animationFillMode: "forwards",
                }}
              >
                Implemented full-stack solutions using Node.js, Express.js, and
                MongoDB, effectively streamlining backend processes.
              </li>
              <li
                className="opacity-0 animate-fadeInLeft"
                style={{
                  animationDelay: "0.5s",
                  animationFillMode: "forwards",
                }}
              >
                Participated in several hackathons, collaborating with peers to
                innovate and showcase technical skills under time constraints.
              </li>
              <li
                className="opacity-0 animate-fadeInLeft"
                style={{
                  animationDelay: "0.6s",
                  animationFillMode: "forwards",
                }}
              >
                Developed a personalized birthday wishing application using
                HTML, CSS, and JavaScript, enabling users to send customized
                messages.
              </li>
              <li
                className="opacity-0 animate-fadeInLeft"
                style={{
                  animationDelay: "0.7s",
                  animationFillMode: "forwards",
                }}
              >
                Utilized responsive design principles to ensure accessibility
                across diverse devices.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div
        className="relative pl-8 md:pl-10 opacity-0 animate-fadeInUp"
        style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
      >
        <div className="absolute w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center -left-1 border-2 border-primary z-10 hover:scale-110 hover:bg-primary/30 transition-all">
          <GraduationCap className="h-5 w-5 text-primary" />
        </div>
        <Card className="transform transition-all hover:scale-[1.02] hover:shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <CardTitle className="text-xl">
                Bachelor of Engineering (B.E.) in Computer Science
              </CardTitle>
              <CardDescription className="flex items-center text-primary/80 font-medium">
                <Calendar className="h-4 w-4 mr-1" />
                2024 - 2028
              </CardDescription>
            </div>
            <CardDescription>
              Dayanada Sagar College of Engineering, Bangalore, Karnataka
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <p className="text-muted-foreground mb-4">
                  Pursuing a comprehensive computer science education with focus
                  on software development, algorithms, and data structures.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li
                    className="opacity-0 animate-fadeInLeft"
                    style={{
                      animationDelay: "0.5s",
                      animationFillMode: "forwards",
                    }}
                  >
                    Core coursework in Data Structures, Algorithms, Database
                    Management, and Web Development
                  </li>
                  <li
                    className="opacity-0 animate-fadeInLeft"
                    style={{
                      animationDelay: "0.6s",
                      animationFillMode: "forwards",
                    }}
                  >
                    Active member of the college coding club and tech community
                  </li>
                  <li
                    className="opacity-0 animate-fadeInLeft"
                    style={{
                      animationDelay: "0.7s",
                      animationFillMode: "forwards",
                    }}
                  >
                    Participating in various technical events and hackathons
                  </li>
                </ul>
              </div>
              <div
                className="md:w-1/3 opacity-0 animate-fadeIn"
                style={{
                  animationDelay: "0.8s",
                  animationFillMode: "forwards",
                }}
              >
                <img
                  src="/dsce-campus.jpg"
                  alt="Dayanada Sagar College of Engineering"
                  className="rounded-lg shadow-md w-full h-auto object-cover hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
