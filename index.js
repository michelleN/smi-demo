const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars')

const port = process.argv.slice(2)[0];
const app = express();

//const tipService = process.env.GREETING_SERVICE;
const greetingService = 'http://localhost:8080';

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('hitting index path');
  http.get(greetingService, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.render('home', {
        message: "hello",
        color: "orange",
      })
      console.log(JSON.parse(data));
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });


});

app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`Service listening on port ${port}`);
app.listen(port);
