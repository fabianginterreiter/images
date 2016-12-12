const express = require('express');
const passport = require('passport');
const ImagesController = require('../controllers/ImagesController');
const router = express.Router();

var GetImages = require('../lib/GetImages');

router.get('/', (req, res) => {
  ImagesController.index(req.query).then(function(images) {
    res.send(images);
  }).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

module.exports = router;