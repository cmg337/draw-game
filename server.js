const port = 3000;

var express = require('express');
var app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

app.use('/public', express.static(process.cwd() + '/public'));

var lobbies = {}


//Index page (static HTML)
app.route('/')
    .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
    })
    .post(function (req, res) {
        res.redirect('/lobby/' + req.body.lobbyname);
    })

app.route('/lobby/:lobbyId')
    .get(function (req, res) {
        res.sendFile(process.cwd() + '/lobby.html');
    })
    

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('sendDrawing', function (data) {
        io.emit(data.lobbyName, data);
    })

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});


  
//404 Not Found Middleware
app.use(function(req, res, next) {
    res.status(404)
      .type('text')
      .send('Not Found');
  });

  //Start our server and tests!
http.listen(port , function () {
    console.log("Listening on port " + port);
  });
  

