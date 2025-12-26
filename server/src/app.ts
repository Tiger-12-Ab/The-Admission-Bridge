import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";
import universityRoutes from "./routes/university";
import applicationRoutes from "./routes/application";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: false,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", universityRoutes);
app.use("/api/applications", applicationRoutes); 

export default app;
