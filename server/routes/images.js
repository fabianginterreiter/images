const express = require('express');
const ImagesController = require('../controllers/ImagesController');
const router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/', (req, res) => {
  new ImagesController(req).index().then(function(images) {
    res.send(images);
  }).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.get('/:id', (req, res) => {
  new ImagesController(req).get().then((image) => (res.send(image))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.put('/:id/like', 
  (req, res) => new ImagesController(req).like().then(() => res.send('ok')).catch((e) => res.status(404).send('Fehler')));

router.put('/:id/unlike', 
  (req, res) => new ImagesController(req).unlike().then(() => res.send('ok')).catch((e) => res.status(404).send('Fehler')));

router.delete('/:id', (req, res) => {
  new ImagesController(req).destroy().then((image) => (res.send(image))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.put('/:id/tags', (req, res) => {
  new ImagesController(req).addTag().then(() => res.send('OK')).catch((e) => res.status(404).send('Fehler'));
});

router.delete('/:id/tags/:tag_id', (req, res) => new ImagesController(req).deleteTag().then(() => res.send('OK')).catch((e) => res.status(404).send(e)));

router.post('/', upload.single('image'), function(req, res) {
  new ImagesController(req).create().then(function(result) {
    res.send(result);
  }).catch(function(err) {
    res.send(err);
  })
});

module.exports = router;