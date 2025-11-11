import express, { Request, Response } from "express";
import cors from "cors";
import chatRoute from "./routes/chat"; // ✅ IMPORT ROUTE

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("API is running ✅");
});

app.use("/api", chatRoute); // ✅ MOUNT ROUTE

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
