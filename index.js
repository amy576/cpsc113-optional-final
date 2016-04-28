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

// A GET request to the url `/foo` should respond with an HTTP response with:
//   - content type "text/plain"
//   - status 200
//   - content that contains the string "woot"
app.get('/foo', function (req, res) {
  res.set({
    'Content-Type': 'text/plain'
  });
  res.status(200).send('woot this works');
});

// A GET request to `/mrw/semester-ends.gif` should 302 redirect to `https://i.imgur.com/pXjrQ.gif`
app.get('/mrw/semester-ends.gif', function (req, res) {
  res.redirect('https://i.imgur.com/pXjrQ.gif');
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

// A GET request to `/` should respond with status 200 and content-type text/html
app.get('/', loadChats, function (req, res) {
  res.set({
    'Content-Type': 'text/html'
  });
  res.status(200).render('index');
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