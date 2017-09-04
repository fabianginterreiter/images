import * as express from "express";
import StatisticsController from "../controllers/StatisticsController";
const router = express.Router();

router.get("/", (req, res) => new StatisticsController(req).index().then((statistics) => res.send(statistics)));

export default router;
