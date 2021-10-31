//firebase stuff
var config = {
    apiKey: "AIzaSyDruPuuruiIkp6rGikLAUixFbT5-RFRm0s",
    authDomain: "wad2-e8948.firebaseapp.com",
    databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "wad2-e8948.appspot.com",
    };

firebase.initializeApp(config);
//get instructor info from course list
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

//user
const user_id = sessionStorage.getItem("userid");

//get timings to be in Calendar
var allEvents =[];
    var string=""
    var ref = firebase.database().ref(`Booking/${user_id}`);   
    ref.once("value")
        .then(function(snapshot){
            var booking_db = snapshot.val()
            console.log(booking_db)
            for(let event in booking_db){
                allEvents.push(booking_db[event])
            }
        })        


$("#calendar").evoCalendar({
    theme: 'Royal Navy',
    'eventListToggler': false,
    'sidebarToggler': false,
    calendarEvents: allEvents,
  });

  $('#calendar').on('selectEvent', function(event, activeEvent) {
         // code here...
    alert("you have selected this thing")
    console.log(activeEvent)
    });
