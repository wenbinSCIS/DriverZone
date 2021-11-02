const TelegramBot = require('node-telegram-bot-api');
var token = '2089521771:AAETGvaqlpw3RI5n_8aKf6xJdlZlKAeaoSU';
var bot = new TelegramBot(token,{polling:true});
var request = require('request');
bot.onText(/\/command1 (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
  
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
  
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
    
  });


  bot.onText(/\/command2 (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
  
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
  
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, "f");
    
  });