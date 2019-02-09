var express = require('express');
var app = express();

const TelegramBot = require('node-telegram-bot-api');
var cron = require('node-cron');
var Twit = require('twit');
var fs = require('fs');

const token = '728041920:AAG5f1AhGqycEhPEpAAXU-dOxM6K0mI09l8';
const bot = new TelegramBot(token, {polling: true, interval: 5000});

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
    T.get('statuses/user_timeline', { screen_name: 'Treyarch', since_id: 1091407080722976768 }, function(err, data, response) {
        data.forEach( (x, i) => {
            if(/(2XP|2X|XP)/.test(x.text)) {
                console.log('TEXT: ', x.text);
                console.log('i: ', i);
            }
        });
      });
});

bot.on('message', (msg) => {
    console.log('Added MSG: ');
    const chatId = msg.chat.id;
    console.log('Message: ', mesg.chat.text);
    if(/(2XP|2X|XP)/i.test(msg)) {
        bot.sendMessage(chatId, '2XP down');
    }
});

bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    console.log('matches!!!')
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
  
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });

app.get('/', function (req, res) {
    res.send('CoD notifier!');
    bot.getUpdates().then(x => {
        console.log('HI', x);
    });
});

app.listen(process.env.PORT || 5000, function () {
    console.log('Example app listening on port 3000!');
});
