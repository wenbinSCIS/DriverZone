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
var ref = firebase.database().ref(`instructor/${id}/date`); 
ref.once("value")
    .then(function(snapshot){
        var instr_db = snapshot.val()
        for(let date in instr_db){
            var object = instr_db[date];
            object.id = date;
            allEvents.push(object)
            $("#calendar").evoCalendar({
              theme: 'Royal Navy',
              'eventListToggler': false,
              'sidebarToggler': false,
              calendarEvents: allEvents,
              /* calendarEvents: [
                  {
                  name: "Lesson",
                  id:1234,
                    badge: "$50", // Event badge (optional)
                    date: "2/13/2020", 
                    description: "1pm - 2pm", // Event description (optional)
                    type: "event",
                    color: "#222831" // Event custom color (optional)
                  },
                  {
                      name: "Lesson",
                      id:12345,
                      badge: "$50", // Event badge (optional)
                      date: "2/13/2020", 
                      description: "2pm - 3pm", // Event description (optional)
                      type: "event",
                      color: "#222831" // Event custom color (optional)
                    },
                    {
                      name: "Lesson",
                      id:123456,
                      badge: "$50", // Event badge (optional)
                      date: "2/13/2020", 
                      description: "2pm - 3pm", // Event description (optional)
                      type: "event",
                      color: "#222831",
                    }
                ] */
          
                
            });
          
        }
    })        

  $('#calendar').on('selectEvent', function(event, activeEvent) {
        // $('#calendar').evoCalendar('toggleEventList', false);
      
    });


    function addTime(){
        var active_date = $('#calendar').evoCalendar('getActiveDate');
        var time_to_add = document.getElementById("time_to_add").value
        var arr = active_date.split("/")
        var unix_needed = arr[2]+"."+arr[0]+"."+arr[1] 
        console.log(unix_needed)   
        var unixTimeStamp = parseInt((new Date(unix_needed).getTime() / 1000).toFixed(0))
        var ref = firebase.database().ref(`instructor/${id}/date/${unixTimeStamp}`);
        ref.set({
                "badge":"$50",
                "color":"#222831",
                "date":active_date,
                "description":time_to_add,
                name:"Driving Lesson",
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