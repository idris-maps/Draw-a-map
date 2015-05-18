var express = require('express');
var app = express();

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/views', express.static(__dirname + '/public/views'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});


var port = 3000;
app.listen(port, function() {console.log('listening on ' + port)})



