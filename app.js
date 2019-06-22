var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var http = require("http");
var api = require('./routes/api');
var mongoose = require('mongoose');
var morgan = require('morgan');
var chat = require('./chat');
var test = require('./test');
var socket = require('socket.io');
var agent = require('./routes/agent');
var session = require('express-session')
var flash          = require('connect-flash');

const config = require('./config/database');

var app = express();
  var db;
//Database connection
mongoose.connect('mongodb://localhost:27017/meanauth', function (err,database) {
  if (err) {
    console.log("Error connecting to db!");
  } else {
    console.log("connected to db" + 3000);
    db = database;
  }
});


app.use(morgan('dev'));
app.use(cors());
require('./config/passport')(passport);


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } 
}))
app.use(bodyparser.json());
app.use(flash());
app.use(bodyparser.urlencoded({'extended':'false'}));


app.use('/api', api);
app.use('/agent',agent);


app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Iam an Error Please First Remove me Then??'+err.stack)
})

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/login', express.static(path.join(__dirname, 'dist')));

app.use('/register', express.static(path.join(__dirname, 'dist')));

app.use('dashboard', express.static(path.join(__dirname, 'dist')));

app.use('agent/:company_Id', express.static(path.join(__dirname, 'dist')));

app.use('project/:company_Id', express.static(path.join(__dirname, 'dist')));

app.use('project-detail/:project_name', express.static(path.join(__dirname, 'dist')));

app.use('agent-board', express.static(path.join(__dirname, 'dist')));

app.use('/agent-login', express.static(path.join(__dirname, 'dist')));

app.use('proj-page/:project_name/:project_Id', express.static(path.join(__dirname, 'dist')));

app.use('/chat/:project_name', express.static(path.join(__dirname, 'dist')));

app.use('assign-proj/:company_Id/:project_name', express.static(path.join(__dirname, 'dist')));

app.use('/member-chat/:project_name', express.static(path.join(__dirname, 'dist')));



var port = process.env.port || 3000;
var server = http.createServer(app);

server.listen(port, function () {
  console.log("Server running at" + port)
})




// //Sockets


var io = require('socket.io')(server);

var users = {};

io.on('connection', function (socket) {
  var roomno = socket.handshake['query']['r_var'];

  if (io.nsps['/'].adapter.rooms["room-" + roomno] && io.nsps['/'].adapter.rooms["room-" + roomno].length > 1)roomno++ ;


  var socketId = socket.id;
  console.log('Socket-ID-> ' + socketId)
  socket.join("room-" + roomno);
  
  
    io.sockets.in("room-" + roomno).emit('connectToRoom', "You are in room no. " + roomno);
    socket.broadcast.to(roomno).emit('room No' + roomno);

    socket.join(roomno);


    console.log('user joined room #' + roomno);
    console.log("user connected");

    //On Joining Room
    socket.on('room', function (roomno) {
      socket.set('room', roomno, function () {
        console.log('room ' + roomno + ' saved');
      });

      socket.join(roomno);
    });

    socket.on('join', function (callback) {
      socket.join(roomno);

      callback();

    });

    socket.on('login', function(data){
      console.log('a user ' + data.userId + ' connected');
  
      users[socket.id] = data.userId;
    });

    console.log('user connected');
    socket.on('connection', function () {
      console.log('connected')
    })


    socket.on('new-message', function (message) {
      io.sockets.in(roomno).emit('new-message', message);
    });
    
   
  })











module.exports = app;


  











