var express = require('express');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

// connect to Mongoose
mongoose.connect(process.env.MONGO_URL);

var MongoDBStore = require('connect-mongodb-session')(session);
var Chats = require('./models/chats.js'); // models usually have uppercase variables

// configure the app
var store = new MongoDBStore({ 
  uri: process.env.MONGO_URL,
  collection: 'sessions'
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// A GET request to ''/robots.txt' produces a HTTP 200 response with Content-Type 'text/plain; charset=utf-8'"
app.get('/robots.txt', function (req, res) {
  res.set({
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.status(200).send('woot this works');
});

// A GET request to '/mrw/class-is-done.gif' 301 or 302 redirects to the "I have class and you don't" gif
app.get('/mrw/class-is-done.gif', function (req, res) {
  res.redirect('http://s68.photobucket.com/user/marchtrpt4bhs/media/GIFs/tumblr_lj93cdZpDJ1qafcveo1_500.gif.html');
});

// show chats
function loadChats(req, res, next) {
// find all chats
  Chats.find()
    .exec(function(err, chats){
    if(!err){
      res.locals.chats = chats;
    }
    next();
  });
}

// A GET request to '/' produces an HTTP 200 response with content 'Hello World!' somewhere
app.get('/', loadChats, function (req, res) {
  res.set({
    'Content-Type': 'text/html'
  });
  res.status(200).send('Hello World!');
});

// Submitting the form should create a chat and "reload" the current page
app.post('/chat/create', function(req, res){
  var newChat = new Chats();
  newChat.description = req.body.textarea;
  newChat.save(function(err, savedChat){
    if(err || !savedChat){
      res.send('Error saving chat!');
    }
    else{
      res.redirect('/');
    }
  });
});

// starting the server
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ' + process.env.PORT);
});