
var admin = require("firebase-admin");

var serviceAccount = require("./firebasejson.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app"
});


const dataFromDb =admin.database().ref('users').once('value');

dataFromDb.then(function(snap) {
   
    var dat = snap.val()
    for(data in dat){
        console.log(dat[data].email)
    }
 })