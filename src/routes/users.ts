import * as express from "express";
import UsersController from "../controllers/UsersController";
const router = express.Router();

router.get("/", (req, res) => {
  new UsersController(req).index().then((users) => (res.send(users))).catch((e) => {
    res.status(404).send("Fehler");
  });
});

router.get("/:id", (req, res) => {
  new UsersController(req).get().then((user) => (res.send(user))).catch((e) => {
    res.status(404).send("Fehler");
  });
});

router.delete("/:id", (req, res) => {
  new UsersController(req).destroy().then((user) => (res.send(user))).catch((e) => {
    res.status(404).send("Fehler");
  });
});

router.post("/", (req, res) => {
  new UsersController(req).create().then((user) => {
    res.send(user);
  }).catch((err) => {
    res.send(err);
  });
});

export default router;
