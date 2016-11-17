// declaring constant variables
const express = require("express"),
      bodyParser = require('body-parser'),
      pug = require("pug"),
      methodOverride = require("method-override"),
      displayRoutes = require('express-routemap'),
      sequelize = require("sequelize"),
      morgan = require("morgan");

// requiring the correct database
var db = require('./models');


// connecting app to express
var app = express();



// set view engine to pug
app.set('view engine', 'pug');

// connect to morgan
app.use(morgan('dev'));

// uses bodyparses
app.use(bodyParser.urlencoded({extended: false}));

// testing if everything works
app.get('/', (req, res) => {
  res.render('index');
});

// renders any slug page, using the database "post", it finds one ?? where the slug is the same as the slug in the title, then it shows the post, unless there's an error, then it renders 404 status
app.get('/:slug', (req, res) => {
  db.Post.findOne({
    where: {
      slug: req.params.slug
    }
  }).then((post)=> {
    res.render('posts/show', { post: post });
  }).catch((error) => {
    res.status(404).end();
  });
});


// render the admin page, on admin/blog-posts, later add authentication
app.get('/admin/posts', (req, res) => {
  res.render('admin');
});

app.get('/admin/posts/new', (req, res) => {
  res.render('new');
});

// line 56 redirects to the /posts slug, line 57 shows the request body in the console (req.body in this case is input from the form)
// line 58 creates the beforementioned req.body, end then posts it in de database (called "Post") line 59 redirects this information to the /post slug

app.post('/posts', (req, res) => {
  console.log(req.body);
  db.Post.create(req.body).then((post) => {
    res.redirect('/' + post.slug);
  }).catch((ERROR) => {
    throw ERROR;
  });
});


// create a listen function, and connect a localhost to it, but before listening, it has to sequelize the priorly appointed database, blocked.

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('app is running on port 3000');
    displayRoutes(app);
  });
});
