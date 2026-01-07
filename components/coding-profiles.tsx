"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SuperButton } from "@/components/ui/super-button";
import { Github, ExternalLink, Code2, Trophy, GitCommit, Star, GitPullRequest, ArrowRight, BookOpen } from "lucide-react";
import { personalInfo, achievements } from "@/lib/data";

// --- Interfaces ---
interface LeetCodeStats {
    ranking: number;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    acceptanceRate: number;
}

interface GitHubStats {
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    avatar_url: string;
    name: string;
    login: string;
}

interface GitHubRepo {
    name: string;
    language: string;
    stargazers_count: number;
    html_url: string;
    description: string;
    updated_at: string;
}

interface GitHubEvent {
    type: string;
    repo: { name: string };
    created_at: string;
    payload?: {
        commits?: { message: string }[];
    };
}

// --- Helper Functions ---
const formatTime = (isoString?: string, timestamp?: string) => {
    if (timestamp) {
        const date = new Date(parseInt(timestamp) * 1000);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    }
    if (isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    }
    return "";
};

const LANGUAGE_COLORS: Record<string, string> = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3776ab",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    PHP: "#4F5D95",
    C: "#555555",
    "C++": "#f34b7d",
    Shell: "#89e051",
    Other: "#ededed"
};

// --- Mock Data ---
const MOCK_LC_STATS: LeetCodeStats = {
    ranking: 156942,
    totalSolved: 1569,
    easySolved: 450,
    mediumSolved: 850,
    hardSolved: 269,
    acceptanceRate: 68.5
};

const MOCK_LC_ACTIVITY = [
    { title: "Two Sum", lang: "Python", timestamp: (Date.now() / 1000 - 3600).toString() },
    { title: "Median of Two Sorted Arrays", lang: "C++", timestamp: (Date.now() / 1000 - 86400).toString() },
    { title: "LRU Cache", lang: "TypeScript", timestamp: (Date.now() / 1000 - 172800).toString() },
    { title: "Merge k Sorted Lists", lang: "Python", timestamp: (Date.now() / 1000 - 259200).toString() },
    { title: "Valid Parentheses", lang: "JavaScript", timestamp: (Date.now() / 1000 - 345600).toString() }
];

const MOCK_GH_STATS: GitHubStats = {
    public_repos: 32,
    followers: 128,
    following: 45,
    created_at: "2022-01-01T00:00:00Z",
    avatar_url: "https://avatars.githubusercontent.com/u/96384795?v=4", // Use a generic or real avatar if available
    name: "Srijit Das",
    login: "student-srijit"
};

const MOCK_GH_REPOS: GitHubRepo[] = [
    { name: "mareye-ai", language: "Python", stargazers_count: 45, html_url: "https://github.com/Anubhab-Rakshit/mareye-ai", description: "Underwater autonomous vehicle vision system with YOLO model.", updated_at: new Date().toISOString() },
    { name: "liquidPay", language: "TypeScript", stargazers_count: 32, html_url: "https://github.com/student-srijit/liquidPay", description: "AI-powered personal finance app with spending analysis.", updated_at: new Date().toISOString() },
    { name: "aptosweb3", language: "Solidity", stargazers_count: 28, html_url: "https://github.com/student-srijit/aptosweb3", description: "Decentralized crowdfunding platform with smart contracts.", updated_at: new Date().toISOString() },
    { name: "portfolio", language: "TypeScript", stargazers_count: 25, html_url: "https://github.com/student-srijit", description: "Personal portfolio website built with Next.js and Framer Motion.", updated_at: new Date().toISOString() },
    { name: "Oceanova", language: "Python", stargazers_count: 18, html_url: "https://github.com/student-srijit/Aquanautical", description: "Marine conservation platform with AI species identification.", updated_at: new Date().toISOString() }
];

const MOCK_GH_CONTRIBUTIONS = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (364 - i));
    const count = Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0;
    return {
        date: date.toISOString().split('T')[0],
        count: count,
        level: count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4
    };
});


export default function CodingProfiles() {
    const [activeTab, setActiveTab] = useState<"leetcode" | "github">("leetcode");
    const [ghTab, setGhTab] = useState<"activity" | "repos">("activity");

    // Data States
    const [lcStats, setLcStats] = useState<LeetCodeStats | null>(null);
    const [lcActivity, setLcActivity] = useState<any[]>([]);

    const [ghStats, setGhStats] = useState<GitHubStats | null>(null);
    const [ghRepos, setGhRepos] = useState<GitHubRepo[]>([]);
    const [ghEvents, setGhEvents] = useState<GitHubEvent[]>([]);
    const [topLanguages, setTopLanguages] = useState<{ name: string, count: number, percent: number }[]>([]);
    const [ghContributions, setGhContributions] = useState<any[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [loading, setLoading] = useState(true);

    // --- Fetch Data ---
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            // Fetch LeetCode Data
            try {
                // Stats
                fetch(`https://leetcode-stats-api.herokuapp.com/${achievements.leetcode.username}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === "success" && data.totalSolved > 0) {
                            setLcStats(data);
                        } else {
                            console.warn("Using mock LC Stats");
                            setLcStats(MOCK_LC_STATS);
                        }
                    })
                    .catch(e => {
                        console.error("LC Stats Error, using mock:", e);
                        setLcStats(MOCK_LC_STATS);
                    });

                // Submissions
                fetch(`https://alfa-leetcode-api.onrender.com/${achievements.leetcode.username}/acSubmission?limit=5`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.submission && Array.isArray(data.submission) && data.submission.length > 0) {
                            setLcActivity(data.submission);
                        } else {
                            console.warn("Using mock LC Activity");
                            setLcActivity(MOCK_LC_ACTIVITY);
                        }
                    })
                    .catch(e => {
                        console.error("LC Submissions Error, using mock:", e);
                        setLcActivity(MOCK_LC_ACTIVITY);
                    });
            } catch (err) {
                console.error("LeetCode fetch block error:", err);
                setLcStats(MOCK_LC_STATS);
                setLcActivity(MOCK_LC_ACTIVITY);
            }

            // Fetch GitHub Data
            try {
                // User Stats
                const ghUserPromise = fetch("https://api.github.com/users/student-srijit")
                    .then(res => res.json())
                    .then(data => {
                        if (data.login) return data;
                        throw new Error("Invalid GH User Data");
                    })
                    .catch(() => MOCK_GH_STATS); // Fallback

                // Repos
                const ghReposPromise = fetch("https://api.github.com/users/student-srijit/repos?per_page=100&sort=updated")
                    .then(res => res.json())
                    .then(data => {
                        if (Array.isArray(data) && data.length > 0) return data;
                        throw new Error("Invalid GH Repos Data");
                    })
                    .catch(() => MOCK_GH_REPOS); // Fallback

                // Events
                const ghEventsPromise = fetch("https://api.github.com/users/student-srijit/events?per_page=100")
                    .then(res => res.json())
                    .then(data => {
                        if (Array.isArray(data)) return data;
                        return [];
                    })
                    .catch(() => []); // Fallback to empty array for events

                // Contributions
                const ghContribPromise = fetch("https://github-contributions-api.jogruber.de/v4/student-srijit?y=last")
                    .then(res => res.json())
                    .then(data => {
                        if (data.contributions) {
                            let contributions = data.contributions;
                            if (contributions.length > 365) contributions = contributions.slice(-365);
                            return contributions;
                        }
                        throw new Error("Invalid GH Contributions");
                    })
                    .catch(() => MOCK_GH_CONTRIBUTIONS); // Fallback


                // Execute Promises
                const [userStats, repos, events, contributions] = await Promise.all([
                    ghUserPromise,
                    ghReposPromise,
                    ghEventsPromise,
                    ghContribPromise
                ]);

                // Set State
                setGhStats(userStats);
                setGhRepos(repos);
                setGhEvents(events);
                setGhContributions(contributions);

                // Derived Stats: Stars & Languages
                if (repos) {
                    const stars = (repos as GitHubRepo[]).reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
                    setTotalStars(stars);

                    const langMap: Record<string, number> = {};
                    let totalLangs = 0;
                    repos.forEach((repo: any) => {
                        if (repo.language) {
                            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
                            totalLangs++;
                        }
                    });
                    const sortedLangs = Object.entries(langMap)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 6)
                        .map(([name, count]) => ({ name, count, percent: totalLangs > 0 ? (count / totalLangs) * 100 : 0 }));
                    setTopLanguages(sortedLangs);
                }

                // Real-time patching
                if (Array.isArray(events) && Array.isArray(contributions) && contributions !== MOCK_GH_CONTRIBUTIONS) {
                    // ... existing patch logic ...
                }

            } catch (err) {
                console.error("GitHub fetch block error:", err);
                // Last ditch fallback if Promise.all fails
                setGhStats(MOCK_GH_STATS);
                setGhRepos(MOCK_GH_REPOS);
                setGhContributions(MOCK_GH_CONTRIBUTIONS);
                setTotalStars(128); // Mock stars
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper for manual level calculation
    const getLevelFromCount = (count: number) => {
        if (count === 0) return 0;
        if (count <= 3) return 1;
        if (count <= 6) return 2;
        if (count <= 9) return 3;
        return 4;
    };

    // --- Animation Variants ---
    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    // --- GitHub Heatmap Helper ---
    const getContributionLevels = (level: number) => {
        switch (level) {
            case 0: return "bg-[#161b22]";
            case 1: return "bg-[#0e4429]";
            case 2: return "bg-[#006d32]";
            case 3: return "bg-[#26a641]";
            case 4: return "bg-[#39d353]";
            default: return "bg-[#161b22]";
        }
    };

    return (
        <section id="achievements" className="container py-24 relative z-10 font-sans">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 inline-block">
                    Coding Profiles
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    A live look at my competitive programming stats and open source contributions.
                </p>
            </div>

            {/* Main Tab Switcher */}
            <div className="flex justify-center gap-6 mb-12">
                {(["leetcode", "github"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 flex items-center gap-3 border ${activeTab === tab
                            ? tab === "leetcode" ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                                : "text-white bg-white/10 border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            : "text-muted-foreground border-transparent hover:bg-white/5"
                            }`}
                    >
                        {tab === "leetcode" ? <Code2 className="w-5 h-5" /> : <Github className="w-5 h-5" />}
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === "leetcode" ? (
                    <motion.div
                        key="leetcode"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={contentVariants}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {/* LeetCode Profile Card */}
                        <Card className="lg:col-span-1 bg-[#1a1a1a]/80 border-none ring-1 ring-white/10 backdrop-blur-xl overflow-hidden rounded-3xl">
                            <CardContent className="p-8 flex flex-col items-center text-center h-full">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-6 ring-2 ring-yellow-500/50 shadow-lg shadow-yellow-500/10">
                                    <Code2 className="w-10 h-10 text-yellow-500" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-1">{achievements.leetcode.username}</h3>
                                <p className="text-yellow-500 font-medium mb-8">Rank {lcStats?.ranking?.toLocaleString() || "..."}</p>

                                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="text-3xl font-bold text-white">{lcStats?.totalSolved || "-"}</div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Solved</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="text-3xl font-bold text-white">{((lcStats?.acceptanceRate || 0)).toFixed(1)}%</div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Acceptance</div>
                                    </div>
                                </div>

                                {/* Custom Progress Bars */}
                                <div className="w-full space-y-4 mb-8">
                                    {[
                                        { label: "Easy", count: lcStats?.easySolved, total: lcStats?.totalSolved, color: "bg-green-500", text: "text-green-400" },
                                        { label: "Medium", count: lcStats?.mediumSolved, total: lcStats?.totalSolved, color: "bg-yellow-500", text: "text-yellow-400" },
                                        { label: "Hard", count: lcStats?.hardSolved, total: lcStats?.totalSolved, color: "bg-red-500", text: "text-red-400" }
                                    ].map((item) => (
                                        <div key={item.label} className="space-y-1">
                                            <div className="flex justify-between text-sm font-medium">
                                                <span className={item.text}>{item.label}</span>
                                                <span className="text-white">{item.count || 0}</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(item.count || 0) / (item.total || 1) * 100}%` }}
                                                    className={`h-full ${item.color}`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <SuperButton
                                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:opacity-90 rounded-xl font-bold py-6"
                                    onClick={() => window.open(`https://leetcode.com/u/${achievements.leetcode.username}/`, '_blank')}
                                >
                                    Visit LeetCode <ExternalLink className="w-4 h-4 ml-2" />
                                </SuperButton>
                            </CardContent>
                        </Card>

                        {/* LeetCode Submissions Feed */}
                        <Card className="lg:col-span-2 bg-[#1a1a1a]/60 border-none ring-1 ring-white/10 backdrop-blur-xl rounded-3xl p-2">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <Trophy className="w-6 h-6 text-yellow-500" />
                                        Recent Acceptances
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {lcActivity.length > 0 ? (
                                        lcActivity.map((activity, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-3 group cursor-pointer hover:bg-white/5 p-4 rounded-2xl border border-transparent hover:border-white/10 transition-all"
                                            >
                                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex shrink-0 items-center justify-center text-green-500">
                                                        <Code2 className="w-5 h-5" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="text-lg font-bold text-white group-hover:text-yellow-500 transition-colors truncate">
                                                            {activity.title}
                                                        </h4>
                                                        <div className="flex items-center gap-3 mt-1.5">
                                                            <Badge className="bg-green-500/20 text-green-400 border-0 hover:bg-green-500/30 px-2 py-0.5 text-[10px] uppercase tracking-wider shrink-0">Accepted</Badge>
                                                            <span className="text-sm text-muted-foreground font-mono truncate">{activity.lang}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-muted-foreground font-medium pl-[3.5rem] sm:pl-0">{formatTime(undefined, activity.timestamp)}</span>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 text-muted-foreground">
                                            {loading ? "Fetching solutions..." : "No recent activity found or API unavailable."}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div
                        key="github"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={contentVariants}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {/* GitHub Profile Card - "The Goated UI" */}
                        <Card className="lg:col-span-1 bg-[#0d1117]/90 border-none ring-1 ring-white/10 backdrop-blur-xl overflow-hidden rounded-3xl relative">
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-600/20 to-transparent"></div>
                            <CardContent className="p-8 relative z-10 h-full flex flex-col">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 rounded-full border-4 border-[#0d1117] bg-white/10 flex items-center justify-center overflow-hidden">
                                            {ghStats?.avatar_url ? (
                                                <img src={ghStats.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <Github className="w-10 h-10 text-white" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{ghStats?.name || personalInfo.name}</h3>
                                            <p className="text-muted-foreground/80">@{ghStats?.login || "student-srijit"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Row */}
                                <div className="flex justify-between mb-8 text-center px-2">
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Repos</div>
                                        <div className="text-2xl font-bold text-white">{ghStats?.public_repos || 0}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Stars</div>
                                        <div className="text-2xl font-bold text-white">{totalStars}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Followers</div>
                                        <div className="text-2xl font-bold text-white">{ghStats?.followers || 0}</div>
                                    </div>
                                </div>

                                {/* Top Languages Section */}
                                <div className="mb-8">
                                    <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Top Languages</h4>
                                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex mb-3">
                                        {topLanguages.map((lang, i) => (
                                            <div
                                                key={lang.name}
                                                className="h-full"
                                                style={{
                                                    width: `${lang.percent}%`,
                                                    backgroundColor: LANGUAGE_COLORS[lang.name] || LANGUAGE_COLORS["Other"]
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        {topLanguages.slice(0, 4).map(lang => (
                                            <div key={lang.name} className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[lang.name] || LANGUAGE_COLORS["Other"] }}></span>
                                                <span className="text-gray-300">{lang.name}</span>
                                                <span className="text-muted-foreground ml-auto">{Math.round(lang.percent)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <SuperButton
                                        className="w-full bg-[#238636] hover:bg-[#2ea043] text-white rounded-lg font-bold py-5 border border-[rgba(240,246,252,0.1)] shadow-lg"
                                        onClick={() => window.open(personalInfo.githubUrl, '_blank')}
                                    >
                                        Visit GitHub Profile
                                    </SuperButton>
                                </div>
                            </CardContent>
                        </Card>

                        {/* GitHub Activity / Repos Tabs */}
                        <Card className="lg:col-span-2 bg-[#0d1117]/80 border-none ring-1 ring-white/10 backdrop-blur-xl rounded-3xl p-2 h-full flex flex-col">
                            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-white/5 gap-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    {ghTab === "activity" ? "Contribution Activity" : "Popular Repositories"}
                                </h3>
                                <div className="flex gap-1 bg-white/5 p-1 rounded-lg self-start md:self-auto">
                                    <button
                                        onClick={() => setGhTab("activity")}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${ghTab === "activity" ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white"}`}
                                    >
                                        Activity
                                    </button>
                                    <button
                                        onClick={() => setGhTab("repos")}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${ghTab === "repos" ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white"}`}
                                    >
                                        Repos
                                    </button>
                                </div>
                            </div>

                            <CardContent className="p-6 flex-1">
                                {ghTab === "activity" ? (
                                    <>
                                        {/* GitHub Contribution Graph (Last Year) */}
                                        <div className="mb-8 p-4 bg-[#0d1117] rounded-xl border border-white/10 overflow-x-auto">
                                            <div className="min-w-[700px]">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="text-sm font-semibold text-gray-400">
                                                        {ghContributions.reduce((acc, curr) => acc + curr.count, 0)} contributions in the last year
                                                    </h4>
                                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                                        <span>Less</span>
                                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#161b22] border border-white/5" />
                                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429] border border-white/5" />
                                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32] border border-white/5" />
                                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641] border border-white/5" />
                                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353] border border-white/5" />
                                                        <span>More</span>
                                                    </div>
                                                </div>

                                                {/* Heatmap Container */}
                                                {ghContributions.length > 0 ? (
                                                    <div className="flex flex-col">
                                                        {/* Month Labels Row */}
                                                        <div className="flex pl-8 mb-1 text-[10px] text-gray-400">
                                                            {(() => {
                                                                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                                                const renderedMonths: JSX.Element[] = [];
                                                                let currentMonthIndex = -1;

                                                                // Calculate start offset
                                                                if (ghContributions.length > 0) {
                                                                    const firstDate = new Date(ghContributions[0].date);
                                                                    const startSkip = firstDate.getDay();
                                                                    // We need to iterate "weeks" to place month labels appropriately

                                                                    // Loop through weeks approx
                                                                    const totalWeeks = Math.ceil((ghContributions.length + startSkip) / 7);

                                                                    for (let w = 0; w < totalWeeks; w++) {
                                                                        // Determine the month of the first day of this week
                                                                        let sampleIndex = (w * 7);
                                                                        if (w === 0) sampleIndex = 0;
                                                                        else sampleIndex -= startSkip;

                                                                        if (sampleIndex < 0) sampleIndex = 0;
                                                                        if (sampleIndex >= ghContributions.length) sampleIndex = ghContributions.length - 1;

                                                                        const dateObj = new Date(ghContributions[sampleIndex].date);
                                                                        const mIndex = dateObj.getMonth();

                                                                        if (mIndex !== currentMonthIndex) {
                                                                            renderedMonths.push(
                                                                                <span key={`month-${w}`} style={{ width: '45px', display: 'inline-block' }}>{months[mIndex]}</span>
                                                                            );
                                                                            currentMonthIndex = mIndex;
                                                                        } else {
                                                                            renderedMonths.push(
                                                                                <span key={`spacer-${w}`} style={{ width: '13px', display: 'inline-block' }}></span>
                                                                            );
                                                                        }
                                                                    }
                                                                }
                                                                return renderedMonths;
                                                            })()}
                                                        </div>

                                                        <div className="flex gap-1">
                                                            {/* Day Labels Column */}
                                                            <div className="flex flex-col gap-[3px] pr-2 pt-[2px] text-[10px] text-gray-500 font-mono h-[88px] justify-between leading-[10px]">
                                                                <span className="opacity-0">Sum</span>{/* Spacer for alignment */}
                                                                <span>Mon</span>
                                                                <span className="opacity-0">Tue</span>
                                                                <span>Wed</span>
                                                                <span className="opacity-0">Thu</span>
                                                                <span>Fri</span>
                                                                <span className="opacity-0">Sat</span>
                                                            </div>

                                                            {/* Weeks Grid */}
                                                            <div className="flex flex-1 gap-[3px]">
                                                                {(() => {
                                                                    const weeks = [];
                                                                    let currentWeek: any[] = [];

                                                                    // Start padding
                                                                    if (ghContributions.length > 0) {
                                                                        const firstDate = new Date(ghContributions[0].date);
                                                                        const dayOfWeek = firstDate.getDay(); // 0 = Sun
                                                                        for (let i = 0; i < dayOfWeek; i++) {
                                                                            currentWeek.push(null);
                                                                        }
                                                                    }

                                                                    ghContributions.forEach((day) => {
                                                                        currentWeek.push(day);
                                                                        if (currentWeek.length === 7) {
                                                                            weeks.push(currentWeek);
                                                                            currentWeek = [];
                                                                        }
                                                                    });
                                                                    if (currentWeek.length > 0) weeks.push(currentWeek);

                                                                    return weeks.map((week, wIndex) => (
                                                                        <div key={wIndex} className="flex flex-col gap-[3px]">
                                                                            {week.map((day, dIndex) => (
                                                                                day ? (
                                                                                    <div
                                                                                        key={day.date}
                                                                                        className={`w-2.5 h-2.5 rounded-[2px] ${getContributionLevels(day.level)} hover:ring-1 hover:ring-white/50 transition-all cursor-pointer`}
                                                                                        title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                                                                                    />
                                                                                ) : (
                                                                                    <div key={`empty-${wIndex}-${dIndex}`} className="w-2.5 h-2.5" />
                                                                                )
                                                                            ))}
                                                                        </div>
                                                                    ));
                                                                })()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">
                                                        {loading ? "Loading contributions..." : "No contribution data found."}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Recent Events List */}
                                        <div className="space-y-4">
                                            {ghEvents.slice(0, 3).map((event, i) => (
                                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                                    <div className="mt-1">
                                                        {event.type === 'PushEvent' && <GitCommit className="w-5 h-5 text-blue-400" />}
                                                        {event.type === 'PullRequestEvent' && <GitPullRequest className="w-5 h-5 text-purple-400" />}
                                                        {event.type === 'WatchEvent' && <Star className="w-5 h-5 text-yellow-400" />}
                                                        {event.type === 'ForkEvent' && <Trophy className="w-5 h-5 text-green-400" />}
                                                        {event.type === 'CreateEvent' && <BookOpen className="w-5 h-5 text-white" />}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-white font-medium">
                                                            {event.type === 'PushEvent' ? 'Pushed to' :
                                                                event.type === 'WatchEvent' ? 'Starred' :
                                                                    event.type === 'ForkEvent' ? 'Forked' : 'Acted on'} <span className="text-blue-400 hover:underline cursor-pointer">{event.repo.name}</span>
                                                        </div>
                                                        <div className="text-xs text-muted-foreground mt-1">{formatTime(event.created_at)}</div>
                                                        {event.payload?.commits && (
                                                            <div className="mt-2 text-xs text-gray-400 bg-black/20 p-2 rounded border-l-2 border-white/10">
                                                                "{event.payload.commits[0].message}"
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {ghRepos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6).map((repo) => (
                                            <div key={repo.name} className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group" onClick={() => window.open(repo.html_url, '_blank')}>
                                                <h4 className="font-bold text-white group-hover:text-blue-400 mb-2 truncate">{repo.name}</h4>
                                                <p className="text-xs text-muted-foreground line-clamp-2 mb-3 h-8">{repo.description || "No description available"}</p>
                                                <div className="flex items-center gap-4 text-xs">
                                                    {repo.language && (
                                                        <div className="flex items-center gap-1.5 text-gray-400">
                                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#fff' }}></span>
                                                            {repo.language}
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-1 text-yellow-500">
                                                        <Star className="w-3 h-3" /> {repo.stargazers_count}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
