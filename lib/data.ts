import {
    Code,
    Database,
    Globe,
    Layout,
    Server,
    Smartphone,
    Terminal,
    Cpu,
    Brain,
    Layers,
    Container,
    Cloud,
} from "lucide-react";

export const personalInfo = {
    name: "Srijit Das",
    title: "Full Stack Developer & ML Engineer",
    email: "srijitd248@gmail.com",
    location: "Bangalore, India",
    githubUrl: "https://github.com/student-srijit",
    linkedinUrl: "https://linkedin.com/in/srijit-das",
    bio: "I'm a passionate developer with a strong foundation in both web development and machine learning. I love building scalable applications and solving complex problems using AI/ML.",
    profileImage: "profile.jpeg",
};

export const projects = [
    {
        title: "Mar-Eye",
        description: "Underwater autonomous vehicle vision system with YOLO model.",
        tags: ["Next.js", "TypeScript", "Python", "YOLOv8", "OpenCV", "MongoDB"],
        githubUrl: "https://github.com/Anubhab-Rakshit/mareye-ai",

        imageUrl: "mereye.png",
    },
    {
        title: "Web3 Crowdfunding",
        description: "Decentralized crowdfunding platform with smart contracts.",
        tags: ["Next.js", "Solidity", "Move", "Celo", "TypeScript"],
        githubUrl: "https://github.com/student-srijit/aptosweb3",

        imageUrl: "web3-crowdfunding.png",
    },
    {
        title: "LiquidPay",
        description: "AI-powered personal finance app with spending analysis.",
        tags: ["Next.js", "Python", "ML", "Node.js", "TailwindCSS"],
        githubUrl: "https://github.com/student-srijit/liquidPay",

        imageUrl: "liquidpay.png",
    },
    {
        title: "Oceanova",
        description: "Marine conservation platform with AI species identification.",
        tags: ["Next.js", "Firebase", "Python", "AI", "Solidity"],
        githubUrl: "https://github.com/student-srijit/Aquanautical",

        imageUrl: "oceanova.png",
    },
];

export const experience = [
    {
        title: "Full Stack Developer",
        company: "Freelance / Projects",
        period: "2024 - Present",
        description: [
            "Built 'Web3-Crowdfunding', a decentralized platform using Solidity and Next.js, implementing factory patterns to reduce gas costs.",
            "Developed 'LiquidPay', an AI-powered finance app with Next.js frontend and Python ML backend for spending analysis.",
            "Engineered modular, componentized frontends using React/Next.js and Tailwind CSS for various clients and internal tools.",
            " implemented secure authentication flows (JWT, OAuth) and RESTful APIs using Node.js and Express.",
        ],
    },
    {
        title: "Machine Learning Engineer",
        company: "Research & Innovation",
        period: "2024 - Present",
        description: [
            "Engineered 'Mar-Eye', a CNN/YOLO-based underwater object detection system for SIH 2025 (Internal Round Cleared).",
            "Optimized models for edge deployment on NVIDIA Jetson using TensorRT and ONNX Runtime for low-latency inference.",
            "Developed an AI assistant for 'Oceanova' to identify marine species and monitor contamination levels.",
            "Finalist at Felicity Hackathon and 1st Runner-up at BruteForce Hackathon for innovative solutions.",
        ],
    },
    {
        title: "B.E. Computer Science",
        company: "Dayananda Sagar College of Engineering",
        period: "2024 - 2028",
        description: [
            "Current SGPA: 8.65/10.0.",
            "Focusing on Data Structures, Algorithms, and System Design.",
            "Active member of technical societies and coding clubs.",
        ],
        imageUrl: "dsce-campus.jpg",
    },
];

export const skills = {
    "Languages": ["C/C++", "Python", "JavaScript", "TypeScript", "Solidity"],
    "Frameworks & Libraries": [
        "React", "Next.js", "Node.js", "Express.js",
        "TensorFlow", "PyTorch", "Scikit-learn", "Flask",
        "TailwindCSS"
    ],
    "Tools & Platforms": [
        "Git/GitHub", "Docker", "AWS", "MongoDB",
        "VS Code", "Jupyter Notebook", "Vercel"
    ],
    "Core Computer Science": [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks"
    ]
};

export const achievements = {
    leetcode: {
        username: "srijit_2028", // Verified LeetCode username
        globalRank: "Loading...",
        rating: "Loading...",
        problemsSolved: "Loading...",
        contestRating: "Loading...",
        badges: ["Guardian"]
    },
    hackathons: [
        {
            title: "SIH 2025 Internal Round",
            result: "Cleared",
            description: "Developed 'Mar-Eye', an underwater autonomous vehicle vision system."
        },
        {
            title: "BruteForce Hackathon 2025",
            result: "1st Runner Up",
            description: "Built an automated admin-mapped pet servicing platform."
        },
        {
            title: "Felicity Hackathon",
            result: "Finalist",
            description: "Top 15 out of 200+ teams."
        },
        {
            title: "Hacktoberfest 2025",
            result: "Completed",
            description: "6 accepted PRs across distributed systems repositories."
        }
    ]
};

export const newAchievements = {
    keyStats: [
        {
            icon: "Trophy",
            value: "3x",
            title: "Hackathon Winner",
            detail: "Secured 1st place in national level hackathons",
            color: "bg-yellow-500"
        },
        {
            icon: "Star",
            value: "12x",
            title: "Top 10 Finalist",
            detail: "Consistently ranked among top teams",
            color: "bg-blue-500"
        },

    ],
    items: [
        {
            title: "SIH 2025 Internal Round",
            result: "Cleared",
            description: "Developed 'Mar-Eye', an underwater autonomous vehicle vision system.",
            category: "competition",
            year: "2025"
        },
        {
            title: "BruteForce Hackathon 2025",
            result: "1st Runner Up",
            description: "Built an automated admin-mapped pet servicing platform.",
            category: "competition",
            year: "2025"
        },
        {
            title: "Felicity Hackathon",
            result: "Finalist",
            description: "Top 15 out of 200+ teams.",
            category: "competition",
            year: "2025"
        },
        {
            title: "Hacktoberfest 2025",
            result: "Completed",
            description: "6 accepted PRs across distributed systems repositories.",
            category: "opensource",
            year: "2025"
        }
    ]
};
