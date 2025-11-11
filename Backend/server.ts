import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chat";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("API is running ✅");
});

// ✅ Mount your chat route
app.use("/api", chatRoute);

// ✅ Use Render’s dynamic port OR fallback to 5000 locally
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
