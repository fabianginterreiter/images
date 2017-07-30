const express = require('express');
const TrashController = require('../controllers/TrashController');
const router = express.Router();

router.delete('/clear', (req, res) => {
  new TrashController(req).clear().then(() => res.send('OK')).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

module.exports = router;