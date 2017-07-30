const express = require('express');
const PersonsController = require('../controllers/PersonsController');
const router = express.Router();

router.get('/', (req, res) => {
  new PersonsController(req).index().then((persons) => (res.send(persons))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.get('/:id', (req, res) => (
  new PersonsController(req).get().then((person) => (res.send(person))).catch((e) => res.status(404).send('Fehler'))
  ));

router.put('/:id', (req, res) => (
  new PersonsController(req).update().then((person) => (res.send(person))).catch((e) => res.status(404).send('Fehler'))
  ));

router.delete('/:id', (req, res) => {
  new PersonsController(req).destroy().then((person) => (res.send(person))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

module.exports = router;