const express = require('express');
const AlbumsController = require('../controllers/AlbumsController');
const router = express.Router();

router.get('/', (req, res) => {
  new AlbumsController(req).index().then((tags) => (res.send(tags))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.get('/:id', (req, res) => {
  new AlbumsController(req).get().then((tag) => (res.send(tag))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.put('/:id', (req, res) => {
  new AlbumsController(req).update().then((tag) => (res.send(tag))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.delete('/:id', (req, res) => {
  new AlbumsController(req).destroy().then((tag) => (res.send(tag))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.post('/', function(req, res) {
  new AlbumsController(req).create().then(function(tag) {
    res.send(tag);
  }).catch(function(err) {
    res.send(err);
  })
});

module.exports = router;