import * as express from "express";
import AlbumsController from "../controllers/AlbumsController";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  new AlbumsController(req).index().then((tags) => (res.send(tags))).catch((e) => {
    res.status(404).send("Fehler");
  });
});

router.get("/:id", (req: express.Request, res: express.Response) => {
  new AlbumsController(req).get().then((tag) => (res.send(tag))).catch((e) => {
    res.status(404).send("Fehler");
  });
});

router.put("/:id", (req: express.Request, res: express.Response) => {
  new AlbumsController(req).update().then((tag) => (res.send(tag))).catch((e) => {
    res.status(404).send("Fehler");
  });
});

router.delete("/:id", (req: express.Request, res: express.Response) => {
  new AlbumsController(req).destroy().then((tag) => (res.send(tag))).catch((e) => {
    res.status(404).send("Fehler");
  });
});

router.post("/", (req: express.Request, res: express.Response) => {
  new AlbumsController(req).create().then((tag) => {
    res.send(tag);
  }).catch((err) => {
    res.send(err);
  });
});

export default router;
