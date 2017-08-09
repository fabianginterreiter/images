import * as express from "express";
import TagsController from "../controllers/TagsController";
const router = express.Router();

router.get("/", (req, res) => {
  new TagsController(req).index().then((tags) => (res.send(tags))).catch((e) => {
    res.status(404).send("Fehler");
  });
});

router.get("/:id", (req, res) => {
  new TagsController(req).get().then((tag) => (res.send(tag))).catch((e) => {
    res.status(404).send("Fehler");
  });
});

router.put("/:id", (req, res) => {
  new TagsController(req).update().then((tag) => (res.send(tag))).catch((e) => {
    res.status(404).send("Fehler");
  });
});

router.delete("/:id", (req, res) => {
  new TagsController(req).destroy().then((tag) => (res.send(tag))).catch((e) => {
    res.status(404).send("Fehler");
  });
});

router.post("/", (req, res) => {
  new TagsController(req).create().then((tag) => {
    res.send(tag);
  }).catch((err) => {
    res.send(err);
  });
});

export default router;
