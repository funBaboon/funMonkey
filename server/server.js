var express = require('express');
var bodar = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client')));

var port = process.env.PORT || 1337;

server.listen(port, function() {
  console.log('server up & running on port ', port);
})