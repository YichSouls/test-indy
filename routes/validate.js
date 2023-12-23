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
  // Api key
  const apiKey = 'd0562f476913da692a065c608d0539f6';

  // Get the lat and lon for the city
  const town = arguments.meteo.town;

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${town}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      const lat = data[0].lat;
      const lon = data[0].lon;

      console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);

      // Get the weather for the city
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          const weather = data.weather[0].main;

          // Check if the weather is sunny
          if (weather === 'Clear') {
            return true;
          } else {
            return false;
          }
        })
    })

}

module.exports = router;