'use strict';
require('dotenv').config()
let request = require('request');
let subscriptionKey = process.env.APIKey
let endpoint = 'https://api.bing.microsoft.com/v7.0/news/search';
let query = '';
let mkt = 'en-US'

// Construct parameters
let request_params = {
  method: 'GET',
  uri: endpoint,
  headers: {
    'Ocp-Apim-Subscription-Key': subscriptionKey,
  },
  qs: {
    q: query,
    mkt: mkt
  },
  json: true
}

// Make request
request(request_params, function (error, response, body) {
  var body = body['value'];
  for (var i=0;i<body.length;i++) {
    var title = $("<p></p>").text(body[i]['name']);
    $('.story').append(title);
    var description = $('<p></p>').text(body[i]['description']);
    $('.story').append(description);
    $('.story').append('<hr>');
  };
})
