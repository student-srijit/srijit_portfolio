"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { experience } from "@/lib/data";

export default function ExperienceTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} className="relative container mx-auto px-4 py-8">
      {/* Vertical line through the middle */}
      <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 hidden md:block transform -translate-x-1/2"></div>

      {/* Mobile vertical line */}
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 md:hidden"></div>

      <div className="space-y-12">
        {experience.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 mt-1.5 z-10 shadow-[0_0_10px_rgba(124,58,237,0.5)]"></div>

            {/* Content card */}
            <div
              className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"
                } transition-all duration-700 transform ${isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="glass-panel p-6 hover:border-primary/50 transition-colors group">
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-lg">{item.title}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="font-medium text-foreground/80">{item.company}</span>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {item.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0 group-hover:bg-primary transition-colors" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                {/* Generic Image Support (e.g. Campus Photo) */}
                {/* @ts-ignore */}
                {item.imageUrl && (
                  <div className="mt-6 rounded-xl overflow-hidden shadow-lg border border-white/5">
                    <img
                      src={/* @ts-ignore */ item.imageUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
