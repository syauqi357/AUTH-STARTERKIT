import express from "express";
import cors from "cors";
// setup dotenv
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth.ts";
dotenv.config();

const app = express();
const port = process.env.PORT;
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
