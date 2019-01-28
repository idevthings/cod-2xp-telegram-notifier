var express = require('express');
var app = express();

const TelegramBot = require('node-telegram-bot-api');
var cron = require('node-cron');
var Twit = require('twit')

var T = new Twit({
  consumer_key:         '5sGT518NWqWSmoNKtyWEmYxbD',
  consumer_secret:      'hFrTMP6GJn6IT0p6nG9fWimULllsIo80S2oLuTtD9a7Q93D8ep',
  access_token:         '1089996741783552001-GYTdEVwrLRWGd8vUsMKfM5MBGswcvw',
  access_token_secret:  'J27s9yWR2kF41sLk8N1jtDv0QiFhvaM0YdWxgsafi0b78',
  timeout_ms:           60*1000,
  strictSSL:            true,
});


var cron = require('node-cron');

cron.schedule('* * * * *', () => {
    T.get('statuses/user_timeline', { screen_name: 'Treyarch', since_id: 1088171143108878336 }, function(err, data, response) {
        data.forEach( (x, i) => {
            if(x.text.includes("2XP")) {
                console.log('TEXT: ', x.text);
                console.log('i: ', i);
            }
        })
      })
});


app.get('/', function (req, res) {
    res.send('CoD notifier!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
