import express from "express";
import { fetchWeather,fetchForecast, fetchCurrAqi, fetchHourlyUVIndex, fetchDailyTemperature, fetchHourlyTemp } from "../controllers/weatherController.js";

const router = express.Router();

router.get("/weather", fetchWeather);
router.get("/forecast", fetchForecast);
router.get("/curraqi", fetchCurrAqi);
router.get("/uvindex",fetchHourlyUVIndex);
router.get("/dailytemp", fetchDailyTemperature);
router.get("/hourlydata" ,fetchHourlyTemp);

export default router;