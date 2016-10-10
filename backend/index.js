var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
//var io = require('socket.io')(http);

var port = 8000;

app.get('/', function(req, res){
  res.send('Backend - It works!');
});

//io.on('connection', function(socket){
//  socket.on('chat message', function(msg){
//    io.emit('chat message', msg);
//  });
//});

http.listen(port, function(){
  console.log('Backend-App is listening on port ' + port);
});
