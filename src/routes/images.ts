import * as express from "express";
import * as multer from "multer";
import AlbumsController from "../controllers/AlbumsController";
import DatesController from "../controllers/DatesController";
import FavoritesController from "../controllers/FavoritesController";
import ImagesController from "../controllers/ImagesController";
import PersonsController from "../controllers/PersonsController";
import TagsController from "../controllers/TagsController";

const upload = multer({
  dest: "uploads/"
});

const router = express.Router();

router.get("/", (req, res) => {
  new ImagesController(req).index().then((images) => {
    res.send(images);
  }).catch((e) => {
    res.status(404).send({err: e});
  });
});

router.get("/count", (req, res) => new ImagesController(req).count().then((result) => res.send(result)));

router.get("/dates", (req, res) => new DatesController(req).index().then((result) => res.send(result))
.catch((e) => {
  res.status(404).send(e);
}));

router.get("/:id", (req, res) => {
  new ImagesController(req).get().then((image) => (res.send(image))).catch((e) => {
    res.status(404).send("Fehler");
  });
});

router.put("/:id/like",
  (req, res) => new FavoritesController(req).like()
  .then(() => res.send({})).catch((e) => res.status(404).send("Fehler")));

router.put("/:id/unlike",
  (req, res) => new FavoritesController(req).unlike()
  .then(() => res.send({})).catch((e) => res.status(404).send("Fehler")));

router.delete("/:id", (req, res) => {
  new ImagesController(req).destroy().then((image) => (res.send(image))).catch((e) => {
    res.status(404).send("Fehler");
  });
});

router.put("/:id/revert", (req, res) => new ImagesController(req)
.revert().then(() => res.send({status: "OK"})).catch((e) => res.status(404).send("Fehler")));

router.put("/:id/tags", (req, res) => {
  new TagsController(req).addTag().then((tag) => res.send(tag)).catch((e) => res.status(404).send("Fehler"));
});

router.delete("/:id/tags/:tag_id", (req, res) => new TagsController(req)
.deleteTag().then(() => res.send({status: "OK"})).catch((e) => res.status(404).send(e)));

router.put("/:id/albums", (req, res) => {
  new AlbumsController(req).addAlbum().then((tag) => res.send(tag))
  .catch((e) => res.status(404).send("Fehler"));
});

router.delete("/:id/albums/:album_id", (req, res) => new AlbumsController(req)
.deleteAlbum().then(() => res.send({status: "OK"})).catch((e) => res.status(404).send(e)));

router.put("/:id/persons", (req, res) => {
  new PersonsController(req).addPerson().then((tag) => res.send(tag)).catch((e) => res.status(404).send("Fehler"));
});

router.delete("/:id/persons/:person_id", (req, res) => new PersonsController(req)
.deletePerson().then(() => res.send({status: "OK"})).catch((e) => res.status(404).send(e)));

router.post("/", upload.single("image"), (req, res) => {
  new ImagesController(req).create().then((result) => {
    res.send(result);
  }).catch((err) => {
    res.send(err);
  });
});

export default router;
