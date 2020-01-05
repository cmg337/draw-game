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
    // if(process.env.NODE_ENV==='test') {
    //   console.log('Running Tests...');
    //   setTimeout(function () {
    //     try {
    //       runner.run();
    //     } catch(e) {
    //       var error = e;
    //         console.log('Tests are not valid:');
    //         console.log(error);
    //     }
    //   }, 1500);
    //}
  });
  

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });