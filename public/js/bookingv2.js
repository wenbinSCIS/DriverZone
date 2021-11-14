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


var instr_img = document.getElementById("instructor_img");
var instr_name = document.getElementById("instructor_name");
var instr_quote = document.getElementById("quote");

instr_name.innerText = `Instructor ${id}`;
instr_img.src = `../images/${id}.JPG`;

displayQuoteAndTitle()

function displayQuoteAndTitle(){
    var ref = firebase.database().ref('instructor');
    ref.once("value")
        .then(function(snapshot){
            var instr_db = snapshot.val()
            for(let ele in instr_db){
                if(ele == id){
                    instr_quote.innerText = instr_db[ele].quote;
                }
            }
        })
}




//user
const user_id = sessionStorage.getItem("userid");

//get timings to be in Calendar
var bookedEvents =[];
var string=""
var ref = firebase.database().ref(`instructor/${id}/date`); 
ref.once("value")
    .then(function(snapshot){
        var instr_db = snapshot.val()
        var allEvents =[];
        var today = new Date();
        var tdy_date = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()}`
        var unixTimeStamp_today = parseInt((new Date(tdy_date).getTime() / 1000).toFixed(0))
        for(let date in instr_db){
          for(let obj in instr_db[date]){
            var object = instr_db[date][obj];
            object.id = Math.floor(Math.random() * 100000000000000000000000000000000000000000000000) + 1;
            if(object.name == "Driving Lesson"){
              var booking_date_string = object.date;
              var arr = booking_date_string.split("/")
              var unix_needed = arr[2]+"."+arr[0]+"."+arr[1]   
              var unixTimeStamp = parseInt((new Date(unix_needed).getTime() / 1000).toFixed(0))
              if(unixTimeStamp>=unixTimeStamp_today){
                allEvents.push(object)
            }
            }
            }
                
          }
          var ref = firebase.database().ref(`Booking/${user_id}`);   
          ref.once("value")
          .then(function(snapshot){
            var today = new Date();
            var tdy_date = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()}`
            var unixTimeStamp_today = parseInt((new Date(tdy_date).getTime() / 1000).toFixed(0))
            if(snapshot.exists()){
                var booking_db = snapshot.val()
                for(let event in booking_db){
                    var object = booking_db[event];
                    if(object.id >= unixTimeStamp_today){
                      bookedEvents.push(object)
                    }
                    
                }
            }
          
            $("#calendar").evoCalendar({
              theme: 'Royal Navy',
              /* 'eventListToggler': false,
              'sidebarToggler': false, */
              calendarEvents: allEvents,
            })
          })
    });
          

  $('#calendar').on('selectEvent', function(event, activeEvent) {
        // $('#calendar').evoCalendar('toggleEventList', false);
    var active_date = $('#calendar').evoCalendar('getActiveDate');
    var booked_alr = false;
    if(activeEvent.type == "event"){
      alert("You have booked this slot. To remove the booking, go to timetable")
      booked_alr=true
    }
    else{
      for(let booked of bookedEvents){
        if(active_date == booked.date && activeEvent.description == booked.time){
          var old_instr = booked.instructor
          booked_alr =true
          alert(`You have already booked a slot at this timing with ${old_instr}`)
        }
        
      }
    }
    if(booked_alr==false){
      sessionStorage.setItem("instructor",id);
      sessionStorage.setItem("date",active_date)
      sessionStorage.setItem("time",activeEvent.description)
      sessionStorage.setItem("cost",activeEvent["badge"])
      window.location.href = "confirm_booking.html";
    }
    });


    