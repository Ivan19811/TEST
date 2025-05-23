const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // ⬅️ змінено тут

const app = express();
app.use(cors());
app.use(express.json());

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw2HF3UTmUDlgFVER85FY2wpqX1ytfP3vqDlV1d4qtqlM2AmAJ74rUG2jqK4KMV15TG/exec";

app.post("/write", async (req, res) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: req.body.value })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: "Proxy write error", details: err.message });
  }
});

app.get("/last", async (req, res) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "get_last" })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: "Proxy last error", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Proxy running on port ${PORT}`);
});

