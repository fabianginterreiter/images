const express = require('express');
const PersonsController = require('../controllers/PersonsController');
const router = express.Router();

router.get('/', (req, res) => {
  new PersonsController(req).index().then((persons) => (res.send(persons))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

module.exports = router;