import * as express from "express";
import TrashController from "../controllers/TrashController";
const router = express.Router();

router.delete("/clear", (req, res) => {
  new TrashController(req).clear().then(() => res.send({status: "OK"})).catch((e) => {
    res.status(404).send("Fehler");
  });
});

export default router;
