/**
 * Created by Sagir on 17-05-2016.
 */


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


/*io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});*/

var count = 0;
function helloThere() {

    var d = new Date();
    var n = d.getTime();
    io.emit('chat message', n +" : " + count );
}

io.on('connection', function(socket){

    setInterval(function() {
        helloThere();
        count += 100;
    }, 100000);

    console.log('Connection ');
    socket.on('chat message', function(msg){
        var d = new Date();
        var n = d.getTime();
        io.emit('chat message', n +" : "+ msg );
    });
});



app.get('/home', function (req, res) {
   res.send('<h1> Hello Programmer ! </h1>');
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


app.get('/about', function (req, res) {
   res.send('<h2> Contact Page : </h2><hr><p> github.com/beingsagir</p>');
});


http.listen(3000, function(){
    console.log('Listening on *: 3000');
});