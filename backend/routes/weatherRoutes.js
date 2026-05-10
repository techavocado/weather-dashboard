import express from "express";
import { fetchWeather,fetchForecast, fetchCurrAqi, fetchDailyTemperature} from "../controllers/weatherController.js";

const router = express.Router();

router.get("/weather", fetchWeather);
router.get("/forecast", fetchForecast);
router.get("/curraqi", fetchCurrAqi);
router.get("/dailytemp", fetchDailyTemperature);

export default router;