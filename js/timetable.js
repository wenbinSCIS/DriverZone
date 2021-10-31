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
            
            for(let event in booking_db){
                var object = booking_db[event];
                object.id = event;
                allEvents.push(object)
            }

            const app = Vue.createApp({
                data() {
                    return {
                        events:allEvents,
                    };
                },
                computed:{
                    getDetails(){
                        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                        var instr = this.events[0].instructor;
                        var unixTimeStamp = this.events[0].id;
                        var date = new Date(unixTimeStamp * 1000);
                        var d = date.getDate();
                        var day = days[date.getDay()];  
                        var month = months[date.getMonth()];
                        var time = this.events[0].time
                        return [day,d,month,time,instr]
                    },
                    
                }
            });
            app.mount("#app");




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

window.event = allEvents;
