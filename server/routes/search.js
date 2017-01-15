const express = require('express');
const SearchController = require('../controllers/SearchController');
const router = express.Router();

router.get('/', (req, res) => {
  new SearchController(req).index().then((images) => res.send(images)).catch(function(e) {
    console.log(e);
    res.status(404).send('Fehler');
  });
});

module.exports = router;