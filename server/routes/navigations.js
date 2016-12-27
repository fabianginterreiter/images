"use strict"

const express = require('express');
const router = express.Router();
const NavigationsController = require('../controllers/NavigationsController');

router.get('/', (req, res) => {
  new NavigationsController(req).index().then((options) => res.send(options)).catch(function(e) {
    console.log(e);
    res.status(404).send('Fehler');
  });
});

module.exports = router;