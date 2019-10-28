const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const exphbs = require('express-handlebars')

const port = process.argv.slice(2)[0];
const app = express();

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json());

const heroesService = 'http://localhost:8081';


app.get('/', (req, res) => {
  console.log('hitting index path');
  res.render('home', {
    name: 'Michelle'
  })
});

app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`Service listening on port ${port}`);
app.listen(port);
