const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
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

app.get('/', (req, res) => {
  console.log('GET /');
  http.get(process.env.GREETING_SERVICE, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      var greetingResponse = JSON.parse(data)
      res.render('home', {
        message: greetingResponse.Message,
        color: greetingResponse.Color,
      })
      console.log(JSON.parse(data));
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
    res.render('home', {
      message: "ERROR: SERVICE UNREACHABLE.",
      color: "",
    })
  });


});

console.log(`Service listening on port ${port}`);
app.listen(port);
