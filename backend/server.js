import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes.js";

const app = express();
app.use(cors());

app.use("/api", weatherRoutes);

app.get("/", (req, res) => {
  res.send("API running 🚀");
});



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});