//firebase stuff
var config = {
    apiKey: "AIzaSyDruPuuruiIkp6rGikLAUixFbT5-RFRm0s",
    authDomain: "wad2-e8948.firebaseapp.com",
    databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "wad2-e8948.appspot.com",
    };

firebase.initializeApp(config);

//user
const user_id = sessionStorage.getItem("userid");

//get timings to be in Calendar

    var string=""
    var ref = firebase.database().ref(`Booking/${user_id}`);   
    ref.once("value")
        .then(function(snapshot){
            var allEvents =[];
            var today = new Date();
            var tdy_date = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()}`
            var unixTimeStamp_today = parseInt((new Date(tdy_date).getTime() / 1000).toFixed(0))
            if(snapshot.exists()){
                var booking_db = snapshot.val()
                for(let event in booking_db){
                    var object = booking_db[event];
                    if(object.id >= unixTimeStamp_today){
                        allEvents.push(object)
                    }
                    
                }
            }
            function getDetails(){
                var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                var instr = allEvents[0].instructor;
                var unixTimeStamp = allEvents[0].id;
                var date = new Date(unixTimeStamp * 1000);
                var d = date.getDate();
                var day = days[date.getDay()];  
                var month = months[date.getMonth()];
                var time = allEvents[0].time
                return [day,d,month,time,instr]
                        
            }
            var details = getDetails()
            if(allEvents.length>0){
<<<<<<< HEAD
                var string =  `<div v-else>
                <h2 class="text-white" >Your next lesson is on <h1 class="text-muted" id="next_lesson_info"> ${details[0]}, ${details[1]} ${details[2]} ${details[3]} with Instructor ${details[4]}</h1> </h2>
                <p class="lead pt-4 text-white" style="font-size: 15px;" id="instr_quote">View all details of your bookings below.</p>
            </div>`
            var to_replace = document.getElementById("next_lesson_info");
            to_replace.innerHTML = string;
=======
                avail=false;
>>>>>>> parent of 827bbe7 (done)
            }
            else{
                avail=true;
            }
<<<<<<< HEAD
            
=======
            const app = Vue.createApp({
                data() {
                    return {
                        events:allEvents,
                        not_avail:avail
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
>>>>>>> parent of 827bbe7 (done)

            $("#calendar").evoCalendar({
                theme: 'Royal Navy',
                'eventListToggler': false,
                'sidebarToggler': false,
                calendarEvents: allEvents,
            });
            
            $('#calendar').on('selectEvent', function(event, activeEvent) {
                     // code here...
                var active_date = $('#calendar').evoCalendar('getActiveDate');
                sessionStorage.setItem("instructor",activeEvent.instructor);
                sessionStorage.setItem("date",active_date)
                sessionStorage.setItem("time",activeEvent.description)
                window.location.href = "change_booking.html";
                });
            })
          
    
       



