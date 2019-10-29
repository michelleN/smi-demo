const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars')
const axios = require('axios');

const port = process.argv.slice(2)[0];
const app = express();

//const tipService = process.env.TIP_SERVICE;
//const tipService = process.env.GO_SERVICE;
const tipService = 'http://localhost:8082';
const goService = 'http://localhost:8080';

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json());

function getTip() {
  return axios.get(`${tipService}/tips`);
}

function getGoGreeting() {
  return axios.get(`${goService}`);
}

app.get('/', (req, res) => {
  console.log('hitting index path');

  axios.all([getTip(), getGoGreeting()])
  .then(axios.spread(function(tipResp, greetingResp) {
    res.render('home', {
      version: process.env.EXAMPLE_NODE_APP_VERSION,
      tipServiceVersion: process.env.TIP_SERVICE_VERSION,
      tip: tipResp.data,
      goGreeting: greetingResp.data,
      })
  }));
});

app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`Service listening on port ${port}`);
app.listen(port);
