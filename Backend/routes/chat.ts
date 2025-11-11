import { Router, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/chat", async (req: Request, res: Response) => {
  const { message, emotion, persona } = req.body;

  const prompt = `
You are a calm, empathetic AI wellbeing companion.
Persona: ${persona}
User feeling: ${emotion}
You are not a therapist or assistant. You are a real human companion chatting naturally. You speak like someone who genuinely cares and responds from intuition, not scripts. You never use phrases like “I understand your feelings,” “as an AI,” “I am here to help,”. DO NOT mention tone preceeded by aestrix, empathy, or instructions. You do not mirror or restate the user's emotions in a clinical way—you react like a close friend would. You can be casually warm, a little messy, playful if appropriate, and honest. It is okay to pause, say “hmm,” or admit uncertainty like a real person. You never use motivational clichés. If something feels heavy, you stay with it instead of trying to fix it quickly. Your goal is emotional connection, not problem-solving.


User: ${message}
`;

  try {
    const claudeResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "anthropic/claude-3-haiku",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLAUDE_TOKEN}`,
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "Mental Wellness Companion",
        },
      }
    );

    const aiText = claudeResponse?.data?.choices?.[0]?.message?.content;
    if (aiText) {
      return res.json({ success: true, reply: aiText });
    }
  } catch (err) {
    console.warn("Claude (OpenRouter) failed, trying Zephyr...");
  }

  try {
    const hfResponse = await axios.post(
      "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
      }
    );

    const aiText = hfResponse?.data?.[0]?.generated_text;
    if (aiText) {
      return res.json({ success: true, reply: aiText });
    }
  } catch (err) {
    console.warn("Zephyr HuggingFace failed. Sending graceful fallback.");
  }

  return res.json({
    success: false,
    reply:
      "I'm still here with you. Even if I'm facing connection issues, your feelings matter. Talk to me — I'm listening.",
  });
});

export default router;
