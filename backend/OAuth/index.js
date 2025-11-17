const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
console.log("ENV CLIENT ID:", process.env.GITHUB_CLIENT_ID);


const app = express();
const PORT = 4001;

let loggedInUser = null;

// GitHub Login Step
app.get("/auth/github", (_req, res) => {
  const redirectUri = "http://localhost:4001/auth/github/callback";
  const clientId = process.env.GITHUB_CLIENT_ID;

  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;

  res.redirect(url);
});

// GitHub Callback Step
app.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // 1️⃣ Exchange code → access_token
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const access_token = tokenRes.data.access_token;

    // 2️⃣ Fetch user profile
    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // 3️⃣ Fetch user email (correct endpoint)
    const emailRes = await axios.get("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const email = emailRes.data.find((e) => e.primary && e.verified)?.email;

    // Store User name and email
    loggedInUser = {
      name: userRes.data.name,
      email,
    };
    
    console.log("✅ Github user: ", {
      name: userRes.data.name,
      email,
    });

    // 4️⃣ Redirect back to frontend
    res.redirect("http://localhost:5173/");
  } catch (err) {
    console.error("❌ Error during GitHub OAuth:", err.message);
    res.status(500).send("OAuth Failed");
  }
});

// To provide the name and email to frontend
app.get("/auth/me", (req, res) => {
  if (!loggedInUser) return res.json(null);
  res.json(loggedInUser);
});

app.listen(PORT, () => {
  console.log(`Backend Running at http://localhost:${PORT}`);
});
