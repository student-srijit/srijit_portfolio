"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLogs = [
    "INITIALIZING_KERNEL...",
    "LOADING_MODULES [CPU, GPU, MEMORY]...",
    "ESTABLISHING_SECURE_CONNECTION...",
    "FETCHING_USER_DATA...",
    "COMPILING_ASSETS...",
    "OPTIMIZING_RENDER_PIPELINE...",
    "INJECTING_STYLES...",
    "SYSTEM_READY."
];

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Log generation
        let logIndex = 0;
        const logInterval = setInterval(() => {
            if (logIndex < bootLogs.length) {
                setLogs(prev => [...prev, bootLogs[logIndex]]);
                logIndex++;
            } else {
                clearInterval(logInterval);
            }
        }, 300);

        // Progress bar with random jumps for realism
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.random() * 5; // Random increment
                if (next >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return next;
            });
        }, 100);

        // Force completion
        const timeout = setTimeout(() => {
            onComplete();
        }, 3500);

        return () => {
            clearInterval(logInterval);
            clearInterval(progressInterval);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black font-mono text-green-500 overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Fade out entire screen
            transition={{ duration: 0.5 }}
        >
            {/* CRT Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"></div>

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="z-10 w-full max-w-lg p-6 flex flex-col gap-6 relative">
                {/* Glitchy Heading */}
                <div className="text-center mb-8 relative">
                    <motion.h1
                        className="text-4xl md:text-6xl font-black tracking-tighter text-white mix-blend-difference"
                        animate={{
                            textShadow: [
                                "2px 0 #ff0000, -2px 0 #00ff00",
                                "-2px 0 #ff0000, 2px 0 #00ff00",
                                "0px 0 transparent"
                            ],
                            x: [0, -2, 2, 0]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1 }}
                    >
                        SYSTEM_BOOT
                    </motion.h1>
                    <div className="text-xs text-green-500/60 tracking-[0.5em] mt-2 text-center uppercase">
                        Portfolio v2.0.24
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-green-900/30 rounded-full overflow-hidden border border-green-500/30">
                    <motion.div
                        className="h-full bg-green-500 box-shadow-[0_0_10px_#22c55e]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between text-xs text-green-400 font-bold">
                    <span>LOADING...</span>
                    <span>{Math.min(100, Math.floor(progress))}%</span>
                </div>

                {/* Terminal Logs Window */}
                <div className="h-32 w-full bg-black/50 border border-green-500/20 p-4 rounded text-xs font-mono overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-1 text-[10px] text-green-800">DISK_CHECK</div>
                    <div className="flex flex-col justify-end h-full gap-1">
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-green-500/80"
                            >
                                <span className="mr-2 text-green-700">{`>`}</span>
                                {log}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-green-500/20 rounded-tl-3xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-green-500/20 rounded-br-3xl"></div>

        </motion.div>
    );
};
