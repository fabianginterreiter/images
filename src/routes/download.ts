import * as express from "express";
import DownloadController from "../controllers/DownloadController";
const router = express.Router();

router.get("/images/:ids", (req, res) => {
  new DownloadController(req).getImages(res);
});

export default router;
