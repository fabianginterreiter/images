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

router.put('/:id/:image_id', (req, res) => new TagsController(req).addImage().then(() => res.send('OK'))).catch((e) => res.status(400).send('Fehler'));
router.delete('/:id/:image_id', (req, res) => new TagsController(req).removeImage().then(() => res.send('OK'))).catch((e) => res.status(400).send('Fehler'));

module.exports = router;