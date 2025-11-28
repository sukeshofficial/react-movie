const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();
console.log("ENV CLIENT ID:", process.env.GITHUB_CLIENT_ID);


const app = express();
const PORT = 4001;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

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

// GOOGLE LOGIN STEP 1
app.get("/auth/google", (_req, res) => {
  const redirectUri = "http://localhost:4001/auth/google/callback";
  const clientId = process.env.GOOGLE_CLIENT_ID;

  const url = 
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "email profile",
      prompt: "consent"
    }).toString();

  res.redirect(url);
});

// GOOGLE LOGIN CALLBACK
app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:4001/auth/google/callback",
      }
    );

    const access_token = tokenRes.data.access_token;
    
    // 2️⃣ Fetch user info
    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userData = userRes.data;

    loggedInUser = {
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
      provider: "google"
    };

    console.log("✅ Google user:", loggedInUser);
    
    res.redirect("http://localhost:5173/");
  } catch (err) {
    console.log("❌ Google OAuth Error:", err.message);
    res.status(500).send("Google OAuth failed");
  }
});

// To provide the name and email to frontend
app.get("/auth/me", (req, res) => {
  if (!loggedInUser) return res.json(null);
  res.json(loggedInUser);
});

app.get("/logout", (req, res) => {
  loggedInUser = null; // clear stored user data
  console.log("🔴 User logged out");
  res.redirect("http://localhost:5173/auth");
});


app.listen(PORT, () => {
  console.log(`Backend Running at http://localhost:${PORT}`);
});
