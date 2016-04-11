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

App.get('/stopBoard/:busStopId', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var busStopId = req.params['busStopId'];

  return res.send('{"lastUpdated":"20:49","filterOut":[],"arrivals":[{"routeId":"77","routeName":"77","destination":"Waterloo","estimatedWait":"8 min","scheduledTime":"19:58","isRealTime":true,"isCancelled":false},{"routeId":"77","routeName":"77","destination":"Waterloo","estimatedWait":"19 min","scheduledTime":"20:08","isRealTime":true,"isCancelled":false}],"serviceDisruptions":{"infoMessages":[],"importantMessages":[],"criticalMessages":[]}}');

  axios.get('http://countdown.tfl.gov.uk/stopBoard/' + busStopId).then(function (response) {
    res.send(response.data);
  });
});

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

var SOURCES = {
  'lifehacker': {
    url: 'https://api.import.io/store/connector/68d040fd-983b-40d5-b979-ba7376a12d3f/_query?input=webpage/url:http%3A%2F%2Fwww.lifehacker.co.uk%2F&&_apikey=44c7bcd60e2840b6b16672cb234d814b7b135d140faf5691872bc01114bf5755d3194072533715d723c0b96a29cde9b7ec4676e3e2f972be87029b9ef4aab0df1fb92d1f7cef86f3d5e3127bf7e0ba0b',
    dataKey: 'results',
    map: {
      title: 'size_link/_text',
      img: 'mediafigure_image',
      link: 'mediafigure_link',
      description: 'mediabody_description',
      video: 'titlemay_link',
      postedAt: 'submitted_value'
    }
  },
  'reddit-world-news': {
    url: 'https://api.import.io/store/connector/2a0b5111-75b4-4dad-91b4-046bb0c1fde8/_query?input=webpage/url:https%3A%2F%2Fwww.reddit.com%2Fr%2Fworldnews%2F&&_apikey=44c7bcd60e2840b6b16672cb234d814b7b135d140faf5691872bc01114bf5755d3194072533715d723c0b96a29cde9b7ec4676e3e2f972be87029b9ef4aab0df1fb92d1f7cef86f3d5e3127bf7e0ba0b',
    dataKey: 'results',
    map: {
      title: 'titlemay_link/_text',
      img: 'thumbnailmay_image/_source',
      link: 'titlemay_link',
      description: 'mediabody_description',
      video: 'titlemay_link',
      postedAt: 'submitted_value'
    }
  },
  'ycombinator': {
    url: 'https://api.import.io/store/connector/50dcf088-c291-44b0-85b2-9db843b7ac55/_query?input=webpage/url:https%3A%2F%2Fnews.ycombinator.com%2F&&_apikey=44c7bcd60e2840b6b16672cb234d814b7b135d140faf5691872bc01114bf5755d3194072533715d723c0b96a29cde9b7ec4676e3e2f972be87029b9ef4aab0df1fb92d1f7cef86f3d5e3127bf7e0ba0b',
    dataKey: 'results',
    map: {
      title: 'titlemay_link/_text',
      img: 'thumbnailmay_image/_source',
      link: 'by_link',
      description: '',
      video: '',
      postedAt: 'subtexttr_link/_text'
    }
  }
};

function Extractor() {
  this.extract = function (map, data, result, index) {
    if (!index) { index = 0; }
    if (!result) { result = []; }

    if (index >= data[map.dataKey].length) {
      return JSON.stringify(result);
    }

    if (Object.prototype.toString.call(data[map.dataKey]) === '[object Array]') {
      var tempObject = {};
      for (var key in map.map) {
        tempObject[key] = data[map.dataKey][index][map.map[key]];
      }

      result.push(tempObject);
      return this.extract(map, data, result, index+1)
    } else {
      for (var key in map.map) {
        result[key] = data[map.dataKey][map.map[key]];
      }

      return result;
    }

  }
};

var extractor = new Extractor();

App.get('/news/:source', function (req, res) {
  var api = SOURCES[req.params['source']];

  axios.get(api.url).then(function (payload) {
    return res.send(extractor.extract(api, payload.data));
  }).catch(function() {
    console.log('Something went wrong!');
    return res.send('{ "error": true }');
  });
});


App.listen(portNumber, function () {
  console.log('Listening on: '+ portNumber);
});
