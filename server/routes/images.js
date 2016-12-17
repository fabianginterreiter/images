const express = require('express');
const passport = require('passport');
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

router.delete('/:id', (req, res) => {
  new ImagesController(req).destroy().then((image) => (res.send(image))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.post('/', upload.single('image'), function(req, res) {
  new ImagesController(req).create().then(function(result) {
    res.send(result);
  }).catch(function(err) {
    res.send(err);
  })
});

module.exports = router;