var express = require('express');
var router = express.Router();
var fs = require('fs');

router.use(express.json());

let promocodes = [];

router.post('/', (req, res) => {
  promocodes.push(req.body);
  fs.writeFile('localData/promocodes.json', JSON.stringify(promocodes), (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
  res.status(201).send(promocodes);
});

module.exports = router;
