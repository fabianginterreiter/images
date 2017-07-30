const express = require('express');
const TagsController = require('../controllers/TagsController');
const router = express.Router();

router.get('/', (req, res) => {
  new TagsController(req).index().then((tags) => (res.send(tags))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.get('/:id', (req, res) => {
  new TagsController(req).get().then((tag) => (res.send(tag))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.put('/:id', (req, res) => {
  new TagsController(req).update().then((tag) => (res.send(tag))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.delete('/:id', (req, res) => {
  new TagsController(req).destroy().then((tag) => (res.send(tag))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.post('/', function(req, res) {
  new TagsController(req).create().then(function(tag) {
    res.send(tag);
  }).catch(function(err) {
    res.send(err);
  })
});

module.exports = router;