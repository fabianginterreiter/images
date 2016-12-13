const express = require('express');
const passport = require('passport');
const UsersController = require('../controllers/UsersController');
const router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/', (req, res) => {
  new UsersController(req).index().then((users) => (res.send(users))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.get('/:id', (req, res) => {
  new UsersController(req).get().then((user) => (res.send(user))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.delete('/:id', (req, res) => {
  new UsersController(req).destroy().then((user) => (res.send(user))).catch(function(e) {
    res.status(404).send('Fehler');
  });
});

router.post('/', function(req, res) {
  new UsersController(req).create().then(function(user) {
    res.send(user);
  }).catch(function(err) {
    res.send(err);
  })
});

module.exports = router;