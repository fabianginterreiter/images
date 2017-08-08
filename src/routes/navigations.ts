import * as express from "express";
import NavigationsController from "../controllers/NavigationsController";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  new NavigationsController(req).index().then((options) => { res.send(options); })
  .catch((e) => {
    res.status(404).send("Fehler");
  });
});

export default router;
