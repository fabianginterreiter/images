import * as express from "express";
import SearchController from "../controllers/SearchController";
const router = express.Router();

router.get("/", (req, res) => {
  new SearchController(req).index().then((images) => res.send(images)).catch((e) => {
    res.status(404).send("Fehler");
  });
});

export default router;
