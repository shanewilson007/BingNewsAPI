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
  console.log(body);

  for (var i=0;i<body.length;i++) {
    var title = $("<h2></h2>").text(body[i]['name']);
    $('.story').append(title);

    var description = $('<p></p>').text(body[i]['description']);
    $('.story').append(description);

    if(body[i]['image']) {
      var imageURL = body[i]['image']['thumbnail']['contentUrl'];
      $('<img />', {
          src: imageURL,
          width: '200px',
          height: '100px'
      }).appendTo($('.story'));
    }else {
      continue;
    };
    
    $('.story').append('<hr>');
  };
  
  
})
