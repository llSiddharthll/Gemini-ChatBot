require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY; // Store API key in .env file

app.post("/generate-content", async (req, res) => {
  try {
    const { message } = req.body;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = message;

    const result = await model.generateContent(prompt);
    res.json({result: result.response.text()});
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Something went wrong" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
