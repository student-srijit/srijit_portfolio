const express = require("express");
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config();

const app = express();
app.use(cors());

const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || "srijit_2028";
const SOLVED_PROBLEMS_FILE = "solvedProblems.json";

// Fetch recent submissions
const fetchLeetCodeData = async () => {
  const query = `{
        recentAcSubmissionList(username: "${LEETCODE_USERNAME}", limit: 5) {
            id
            title
            titleSlug
            timestamp
        }
    }`;

  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      { query },
      { headers: { "Content-Type": "application/json" } }
    );

    const solvedProblems = response.data.data.recentAcSubmissionList.map(
      (problem) => ({
        id: problem.id,
        title: problem.title,
        link: `https://leetcode.com/problems/${problem.titleSlug}/`,
        solvedAt: new Date(problem.timestamp * 1000).toLocaleString(),
      })
    );

    fs.writeFileSync(
      SOLVED_PROBLEMS_FILE,
      JSON.stringify(solvedProblems, null, 2)
    );
    console.log("✅ LeetCode data updated!");
  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
  }
};

// Schedule update every 10 minutes
cron.schedule("*/10 * * * *", fetchLeetCodeData);

// API route to get solved problems
app.get("/solved-problems", (req, res) => {
  if (fs.existsSync(SOLVED_PROBLEMS_FILE)) {
    res.json(JSON.parse(fs.readFileSync(SOLVED_PROBLEMS_FILE, "utf-8")));
  } else {
    res.json([]);
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await fetchLeetCodeData();
});
