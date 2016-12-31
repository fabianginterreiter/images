"use strict"

const express = require('express');
const router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const ImagesController = require('../controllers/ImagesController');
const TagsController = require('../controllers/TagsController');
const PersonsController = require('../controllers/PersonsController');
const AlbumsController = require('../controllers/AlbumsController');
const FavoritesController = require('../controllers/FavoritesController');
const DatesController = require('../controllers/DatesController');

router.get('/', (req, res) => {
  new ImagesController(req).index().then(function(images) {
    res.send(images);
  }).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.get('/dates', (req, res) => new DatesController(req).index().then((result) => res.send(result)).catch((e) => {
  console.log(e);
  res.status(404).send(e)
}));

router.get('/:id', (req, res) => {
  new ImagesController(req).get().then((image) => (res.send(image))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.put('/:id/like', 
  (req, res) => new FavoritesController(req).like().then(() => res.send('ok')).catch((e) => res.status(404).send('Fehler')));

router.put('/:id/unlike', 
  (req, res) => new FavoritesController(req).unlike().then(() => res.send('ok')).catch((e) => res.status(404).send('Fehler')));

router.delete('/:id', (req, res) => {
  new ImagesController(req).destroy().then((image) => (res.send(image))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.put('/:id/revert', (req, res) => new ImagesController(req).revert().then(() => res.send('ok')).catch((e) => res.status(404).send('Fehler')));

router.put('/:id/tags', (req, res) => {
  new TagsController(req).addTag().then((tag) => res.send(tag)).catch((e) => res.status(404).send('Fehler'));
});

router.delete('/:id/tags/:tag_id', (req, res) => new TagsController(req).deleteTag().then(() => res.send('OK')).catch((e) => res.status(404).send(e)));


router.put('/:id/albums', (req, res) => {
  new AlbumsController(req).addAlbum().then((tag) => res.send(tag)).catch((e) => res.status(404).send('Fehler'));
});

router.delete('/:id/albums/:album_id', (req, res) => new AlbumsController(req).deleteAlbum().then(() => res.send('OK')).catch((e) => res.status(404).send(e)));

router.put('/:id/persons', (req, res) => {
  new PersonsController(req).addPerson().then((tag) => res.send(tag)).catch((e) => res.status(404).send('Fehler'));
});

router.delete('/:id/persons/:person_id', (req, res) => new PersonsController(req).deletePerson().then(() => res.send('OK')).catch((e) => res.status(404).send(e)));

router.post('/', upload.single('image'), function(req, res) {
  new ImagesController(req).create().then(function(result) {
    res.send(result);
  }).catch(function(err) {
    res.send(err);
  })
});


module.exports = router;