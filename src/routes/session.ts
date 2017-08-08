import * as express from "express";
import User from "../model/User";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  if (!req.session.user) {
    return res.status(401).send({});
  }

  new User({id: req.session.user}).fetch().then((user) => {
    if (user) {
      res.send(user.toJSON());
    } else {
      req.session = null;
      res.status(401).send({});
    }
  }).catch(() => {
    req.session = null;
    res.status(401).send({});
  });
});

router.get("/:id", (req, res) => {
  req.session.user = req.params.id;
  res.send({id: req.session.user});
});

router.delete("/", (req, res) => {
  req.session.user = null;
  res.send({});
});

export default router;
