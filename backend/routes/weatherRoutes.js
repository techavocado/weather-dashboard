import express from "express";
import { fetchWeather,fetchForecast } from "../controllers/weatherController.js";

const router = express.Router();

router.get("/weather", fetchWeather);
router.get("/forecast", fetchForecast);

export default router;