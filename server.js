const port = 3000;

var express = require('express');
var app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use('/public', express.static(process.cwd() + '/public'));


//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
  });

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('sendDrawing', function (data) {
        console.log('sending drawing');
        io.emit('receiveDrawing', data);
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
  

