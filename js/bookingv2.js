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

var string=""
var ref = firebase.database().ref(`instructor/${id}/date`); 
ref.once("value")
    .then(function(snapshot){
        var instr_db = snapshot.val()
        var allEvents =[];
        for(let date in instr_db){
          for(let obj in instr_db[date]){
            var object = instr_db[date][obj];
            console.log(object)
            object.id = Math.floor(Math.random() * 100000000000000000000000000000000000000000000000) + 1;
            allEvents.push(object)
            }
            
          
                
          }
            $("#calendar").evoCalendar({
              theme: 'Royal Navy',
              'eventListToggler': false,
              'sidebarToggler': false,
              calendarEvents: allEvents,
            })
    });
          

  $('#calendar').on('selectEvent', function(event, activeEvent) {
        // $('#calendar').evoCalendar('toggleEventList', false);
    var active_date = $('#calendar').evoCalendar('getActiveDate');
    sessionStorage.setItem("instructor",id);
    sessionStorage.setItem("date",active_date)
    sessionStorage.setItem("time",activeEvent.description)
    console.log(activeEvent)
    sessionStorage.setItem("cost",activeEvent["badge"])
    window.location.href = "confirm_booking.html";
    });


    function addTime(){
        var active_date = $('#calendar').evoCalendar('getActiveDate');
        var time_to_add = document.getElementById("time_to_add").value
        var arr = active_date.split("/")
        var unix_needed = arr[2]+"."+arr[0]+"."+arr[1] 
        console.log(unix_needed)   
        var unixTimeStamp = parseInt((new Date(unix_needed).getTime() / 1000).toFixed(0))
        var ref = firebase.database().ref(`instructor/${id}/date/${unixTimeStamp}`);
        var newStoreRef = ref.push();
        newStoreRef.set({
                "badge":"$50",
                "color":"#222831",
                "date":active_date,
                "description":time_to_add,
                name:"Driving lesson",
                type:"event",
        }
        , (error) => {
            if (error) {
              // The write failed...
            alert("There was a problem with booking, please try again!")
            } else {
              // Data saved successfully!
            //window.location.href = "confirmation.html";
            alert("success!")
            
        }})
    } 