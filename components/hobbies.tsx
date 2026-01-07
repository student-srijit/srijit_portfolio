"use client";

import { motion } from "framer-motion";
import { Palette, Music, UtensilsCrossed, Dumbbell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const hobbies = [
    {
        icon: <Dumbbell className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />,
        title: "Fitness",
        description: "Staying active through weight training and cardio to maintain peak mental focus.",
        color: "from-emerald-500/20 to-teal-500/5",
        borderColor: "group-hover:border-emerald-500/50",
        glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
    },
    {
        icon: <Palette className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform duration-300" />,
        title: "Painting",
        description: "Expressing creativity through abstract art and exploring color theory in watercolor.",
        color: "from-purple-500/20 to-pink-500/5",
        borderColor: "group-hover:border-purple-500/50",
        glowColor: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
    },
    {
        icon: <Music className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform duration-300" />,
        title: "Music",
        description: "Playing guitar and exploring diverse genres from classical to electronic synthwave.",
        color: "from-blue-500/20 to-indigo-500/5",
        borderColor: "group-hover:border-blue-500/50",
        glowColor: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
    },
    {
        icon: <UtensilsCrossed className="w-10 h-10 text-orange-400 group-hover:scale-110 transition-transform duration-300" />,
        title: "Cooking",
        description: "Experimenting with international cuisines and perfecting the art of fusion dishes.",
        color: "from-orange-500/20 to-red-500/5",
        borderColor: "group-hover:border-orange-500/50",
        glowColor: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
    }
];

export default function Hobbies() {
    return (
        <div className="flex flex-col items-center">
            <div className="text-center mb-16 space-y-4">
                <Badge className="mb-4 px-3 py-1 text-sm bg-secondary/50 backdrop-blur-sm border-secondary-foreground/20 text-secondary-foreground">
                    Beyond Coding
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Hobbies</span> & Interests
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Discover what fuels my creativity and energy when I'm away from the keyboard.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full h-[55vh] items-stretch">
                {hobbies.map((hobby, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex h-full"
                    >
                        <Card className={`group relative overflow-hidden border border-white/5 bg-gradient-to-br ${hobby.color} backdrop-blur-xl transition-all duration-500 ${hobby.borderColor} ${hobby.glowColor} w-full h-full`}>
                            <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                            <CardContent className="relative z-10 p-8 flex flex-col items-center text-center justify-between h-full">

                                <div className="mt-8 mb-6 relative">
                                    <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative p-6 bg-black/20 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors">
                                        {hobby.icon}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:tracking-wider transition-all duration-300">
                                        {hobby.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                        {hobby.description}
                                    </p>
                                </div>

                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 p-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <div className="w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
