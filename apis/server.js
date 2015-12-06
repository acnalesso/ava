var express = require('express');
var App = express();
var portNumber = process.env.PORT || 3001;
var Parser = require('xml2json');
var axios = require('axios');
var unescape = require('unescape');
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
}

App.use(allowCrossDomain);

App.get('/google/news', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  axios.get('https://news.google.co.uk/news/feeds?output=json').then(function (payload) {
    var parsed = Parser.toJson(payload.data);
    unescape.chars['&quot;'] = "'";
    var unescaped = unescape(parsed);

    res.send(unescaped);
  }).catch(function(req, res) {
    res.send('{ "error": true }');
  });
});


App.listen(portNumber, function () {
  console.log('Listening on: '+ portNumber);
});
