"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, GitPullRequest, Award, Medal } from "lucide-react";
import { newAchievements } from "@/lib/data";

const iconMap: any = {
    Trophy: Trophy,
    Star: Star,
    GitPullRequest: GitPullRequest,
};

export default function AchievementsShowcase() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <div className="space-y-12 font-sans" ref={ref}>
            <div className="text-center mb-16 space-y-4">
                <Badge className="mb-4 px-3 py-1 text-sm">Recognitions</Badge>
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 inline-block">
                    Achievements & Certifications
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    A showcase of my competitive programming wins and hackathon
                    accomplishments.
                </p>
            </div>

            {/* Key Stats Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
            >
                <div className="col-span-1 md:col-span-3 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">Key Achievements</h3>
                </div>

                {newAchievements.keyStats.map((stat, index) => {
                    const Icon = iconMap[stat.icon] || Trophy;
                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="relative group"
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${stat.color === "bg-yellow-500" ? "from-yellow-500/20 to-orange-500/5" :
                                    stat.color === "bg-blue-500" ? "from-blue-500/20 to-cyan-500/5" :
                                        "from-orange-500/20 to-red-500/5"
                                    } rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                            />
                            <Card className="h-full bg-[#0d1117]/80 border-white/10 backdrop-blur-sm overflow-hidden rounded-3xl relative z-10 hover:border-white/20 transition-all">
                                <CardContent className="p-8 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div
                                            className={`p-3 rounded-2xl ${stat.color === "bg-yellow-500" ? "bg-yellow-500/10 text-yellow-500" :
                                                stat.color === "bg-blue-500" ? "bg-blue-500/10 text-blue-500" :
                                                    "bg-orange-500/10 text-orange-500"
                                                }`}
                                        >
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <Badge variant="secondary" className="bg-white/5 text-muted-foreground">
                                            {stat.value}
                                        </Badge>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">{stat.title}</h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {stat.detail}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Detailed Grid Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {newAchievements.items.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="group relative"
                    >
                        <div
                            className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/5 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        />
                        <Card className="h-full bg-[#161b22]/50 border-white/5 hover:border-primary/30 transition-all duration-300 rounded-2xl backdrop-blur-sm overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500" />

                            <CardContent className="p-6 relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-white/5 rounded-lg text-primary">
                                        {item.category === "competition" ? <Award className="w-5 h-5" /> :
                                            item.category === "opensource" ? <GitPullRequest className="w-5 h-5" /> :
                                                <Medal className="w-5 h-5" />}
                                    </div>
                                    <Badge variant="outline" className="border-primary/20 text-primary/80 text-[10px] uppercase tracking-wider">
                                        {item.category}
                                    </Badge>
                                </div>

                                <div className="mb-4">
                                    <h4 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                        {item.title}
                                    </h4>
                                    <div className="text-sm font-semibold text-white/80 mb-2">
                                        {item.result}
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                    {item.description}
                                </p>

                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground">
                                    <span>{item.year}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
