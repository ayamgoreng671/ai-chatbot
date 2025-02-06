require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.AI_API_KEY;
console.log("Loaded API Key:", API_KEY);

app.post("/generate-text", async (req, res) => {
  try {
    console.log("Received request with prompt:", req.body.prompt);

    if (!API_KEY) {
      throw new Error("Missing API key");
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: req.body.prompt }] }],
      }
    );

    // Extract text content from response
    const aiResponse =
      response.data.candidates[0]?.content?.parts[0]?.text || "No response";

    console.log("AI Response:", aiResponse);
    res.json({ response: aiResponse });

  } catch (error) {
    console.error(
      "Error calling Google API:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: error.response?.data || "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
