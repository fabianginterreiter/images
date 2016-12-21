"use strict"

const express = require('express');
const router = express.Router();

var User = require('../model/User');

router.get('/', function(req, res) {
  if (!req.session.user) {
    return res.status(401).send('No Profile is selected');
  }

  new User({id:req.session.user}).fetch().then((user) => { 
    if (user) {
      res.send(user.toJSON())
    } else {
      req.session = null;
      res.status(401).send('No Profile is selected');
    }
  }).catch(() => {
    req.session = null;
    res.status(401).send('No Profile is selected')
  });
});

router.get('/:id', function (req, res) {
  req.session.user = req.params.id;
  res.send({id:req.session.user});
});

router.delete('/', function(req, res) {
  req.session = null;
  res.send('OK');
});

module.exports = router;