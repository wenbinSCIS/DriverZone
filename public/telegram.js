
var admin = require("firebase-admin");

var serviceAccount = require("./firebasejson.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app"
});





const TelegramBot = require('node-telegram-bot-api');
var token = '2089521771:AAETGvaqlpw3RI5n_8aKf6xJdlZlKAeaoSU';
var bot = new TelegramBot(token,{polling:true});
var request = require('request');
var email = ''
var chatId = ''
var verified = false
var userid = ''


bot.onText(/\/start/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  chatId = msg.chat.id;
  var msg = '';
  msg = `Welcome to DriverZone Bot!

Here is how you can use the bot.

Step 1) Register your Email Address into the Bot by sending the bot /email email_address (replace email_address with your registered email address, for example /email johnsoh@gmail.com)

Step 2) To get details of your next lesson, just send /nextlesson or send /alllessons to get details of all your upcoming lessons

  `
  bot.sendMessage(chatId, msg);
 

  
});
bot.onText(/\/email (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
  
    chatId = msg.chat.id;
      email = match[1]; // the captured "whatever"
    
      // send back the matched "whatever" to the chat
    
      checkEmail(email)
    
      var email = "Test"
    
  });

  bot.onText(/\/alllessons/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
  
    chatId = msg.chat.id;
    getAll();
    
  });

  bot.onText(/\/nextlesson/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
  
    chatId = msg.chat.id;
    getNextLesson();
    
  });

function getNextLesson(){
 
  if(verified == false){
    bot.sendMessage(chatId, "Please verify your email address!");
  }
  else{
    var reslist = []
    const dataFromDb =admin.database().ref('Booking').once('value');

    dataFromDb.then(function(snap) {
      var dat = snap.val()
      for(var data in dat[userid]){
          
          var date = dat[userid][data].date
       
          var time = dat[userid][data].time
          var instructor = dat[userid][data].instructor
          
          var today = new Date()

          var thatdate = new Date(date)
          today.setHours(0,0,0,0)

          if(thatdate<today){

          }
          else{
            const person = {lessondate:thatdate, instructor:instructor, time:time};
            reslist.push(person)
          
          }
      }
      console.log("here",reslist.length)
      const sortedActivities = reslist.slice().sort((a, b) => a.lessondate - b.lessondate)
      console.log("here2",sortedActivities)
      if(sortedActivities.length == 0){
        bot.sendMessage(chatId, "No upcoming lessons!");
      }
      else{
        
        bot.sendMessage(chatId, "Your upcoming lesson is on " + sortedActivities[0].lessondate.toDateString() +"\n At " + sortedActivities[0].time + "\n by " + sortedActivities[0].instructor);
      }
    })
  }

}
function checkEmail(email){
  var counter = 0 
 
  const dataFromDb =admin.database().ref('users').once('value');

dataFromDb.then(function(snap) {
  var dat = snap.val()
  for(var data in dat){
      if (dat[data].email == email){
        counter +=1
        userid = data
      }
  }

  if(counter >0){
    bot.sendMessage(chatId, "Email has been registered!");
    verified = true
  }

  else{
    bot.sendMessage(chatId, "This email is not found in our database!");
  }
 })

}




function getAll(){
 
  if(verified == false){
    bot.sendMessage(chatId, "Please verify your email address!");
  }
  else{
    var reslist = []
    const dataFromDb =admin.database().ref('Booking').once('value');

    dataFromDb.then(function(snap) {
      var dat = snap.val()
      for(var data in dat[userid]){
          
          var date = dat[userid][data].date
       
          var time = dat[userid][data].time
          var instructor = dat[userid][data].instructor
          
          var today = new Date()

          var thatdate = new Date(date)
          today.setHours(0,0,0,0)

          if(thatdate<today){

          }
          else{
            const person = {lessondate:thatdate, instructor:instructor, time:time};
            reslist.push(person)
          
          }
      }
      console.log("here",reslist.length)
      const sortedActivities = reslist.slice().sort((a, b) => a.lessondate - b.lessondate)
      console.log("here2",sortedActivities)
      var msg = 'Here are your upcoming lessons -\n'
      if(sortedActivities.length == 0){
        bot.sendMessage(chatId, "No upcoming lessons!");
      }
      else{
        
        for(item of sortedActivities){
          msg += item.lessondate.toDateString() + ' at ' + item.time + ' by ' + item.instructor + '\n'
        }




        bot.sendMessage(chatId, msg);
      }
    })
  }

}