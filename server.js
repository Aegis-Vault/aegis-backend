import express from "express";
import fetch from "node-fetch"; // Import fetch properly
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const GITHUB_TOKEN = process.env.GH_TOKEN;

// API Route to trigger GitHub Actions
app.post("/api/github-trigger", async (req, res) => {
    const { name, email, contract } = req.body;

    if (!name || !email || !contract) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const payload = {
        ref: "main",
        inputs: { name, email, contract }
    };

    try {
        const githubResponse = await fetch("https://api.github.com/repos/Aegis-Vault/AegisVault/actions/workflows/solidity-security-analysis7.yml/dispatches", {
            method: "POST",
            headers: {
                "Accept": "application/vnd.github.v3+json",
                "Authorization": `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (githubResponse.ok) {
            res.json({ message: "GitHub Action Triggered Successfully!" });
        } else {
            res.status(400).json({ error: await githubResponse.text() });
        }
    } catch (error) {
        console.error("Error triggering GitHub Action:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
