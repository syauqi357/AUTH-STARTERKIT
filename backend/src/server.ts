import express from "express";
import cors from "cors";
// setup dotenv
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth.ts";
dotenv.config();

const app = express();
const EXPRESS_PORT = process.env.PORT;
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("starterkit backend");
});

app.listen(Number(EXPRESS_PORT),'0.0.0.0', () => {
  console.log(`app listening on port ${EXPRESS_PORT}`);
});
