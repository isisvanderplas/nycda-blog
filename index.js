// declaring constant variables
const express = require("express"),
      pug = require("pug"),
      methodOverride = require("method-override"),
      morgan = require("morgan");


// connecting app to express
var app = express();

// set view engine to pug
app.set('view engine', 'pug');

// connect to morgan
app.use(morgan('dev'));


// testing if everything works
app.get('/', (req, res) => {
  res.render('index');
});

// render the admin page
app.get('/admin', (req, res) => {
  res.render('admin');
});


// create a listen function, and connect a localhost to it
app.listen(3000, () => {
  console.log('app is running on port 3000');
} );
