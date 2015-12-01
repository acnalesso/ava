var express = require('express');
var App = express();
var portNumber = process.env.PORT || 3000;

App.use(express.static(__dirname + '/dist'));


App.listen(portNumber, function () {
  console.log('Listening on: '+ portNumber);
});
