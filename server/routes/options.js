const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send([{
    key: 'test',
    type: 'action',
    name: 'Blub'
  }, {
    key: 'mm',
    type: 'menu',
    name: 'Albums',
    open: true,
    options: [ {
      key: 'test2',
      type: 'action',
      name: 'Blub'
    }]
  }]);
});

module.exports = router;