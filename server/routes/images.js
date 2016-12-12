const express = require('express');
const passport = require('passport');
const ImagesController = require('../controllers/ImagesController');
const router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/', (req, res) => {
  ImagesController.index(req.query).then(function(images) {
    res.send(images);
  }).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.get('/:id', (req, res) => {
  ImagesController.get(req.params.id).then((image) => (res.send(image))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.delete('/:id', (req, res) => {
  ImagesController.destroy(req.params.id).then((image) => (res.send(image))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.post('/', upload.single('image'), function(req, res) {
  ImagesController.create(req.file).then(function(result) {
    res.send(result);
  }).catch(function(err) {
    res.send(err);
  })
});

module.exports = router;