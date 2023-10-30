const express = require("express");
const { OpenAI } = require("langchain/llms/openai");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { HumanChatMessage } = require("langchain/schema");

const router = express.Router();
router.use(express.json());

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const chat = new ChatOpenAI({ temperature: 0 });
    const response = await chat.call([new HumanChatMessage(prompt)]);
    if (response) {
      console.log("Response Message : " + response);
    }
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
