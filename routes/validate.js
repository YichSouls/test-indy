var express = require('express');
var router = express.Router();
var fs = require('fs');

router.use(express.json());

let promocodes = [];

// Read the promocodes from the file when the server starts
fs.readFile('localData/promocodes.json', 'utf8', (err, data) => {
  if (err) throw err;
  promocodes = JSON.parse(data);
});

router.post('/', (req, res) => {
  const { promocode_name, arguments } = req.body;
  const promocode = promocodes.find(p => p.name === promocode_name);
  if (!promocode) {
    return res.status(404).send();
  }
  const isValid = validatePromocode(promocode, arguments);
  if (isValid) {
    res.json({ promocode_name, status: 'accepted', avantage: promocode.avantage });
  } else {
    res.json({ promocode_name, status: 'denied' });

  }
});

function validatePromocode(promocode, arguments) {
  // Implement your validation logic here
  return true;
}

module.exports = router;