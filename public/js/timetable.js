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
            if(allEvents.length>0){
                avail=false;
            }
            else{
                avail=true;
            }
            const app = Vue.createApp({
                data() {
                    return {
                        events:allEvents,
                        not_avail:avail
                    };
                },
                computed:{
                    getDetails(){
                        var timings_arr = ["9am ","10am ","11am ","12pm ","1pm ","2pm ","3pm ","4pm ","5pm ","6pm "]
                        var smallest_day_arr = [];
                        var largest_timestamp = 1000000000000000000000000000000
                        for(let event of this.events){
                            if(event.id <=largest_timestamp){
                                largest_timestamp = event.id;
                                //get smallest timestamp as it is the closest date
                            }
                        }
                        for(let day of this.events){
                            if(day.id == largest_timestamp){
                                smallest_day_arr.push(day)
                            }
                        }
                        if(smallest_day_arr.length ==1){
                            var time = smallest_day_arr[0].time
                            var instr = smallest_day_arr[0].instructor
                        }
                        else{
                            let rank = 11;
                            for(let timing of smallest_day_arr){
                                var timerank = timings_arr.indexOf(timing["time"].split("-")[0])
                                if (timerank <rank){
                                    rank = timerank
                                    var instr = timing.instructor;
                                    var time = timing.time
                                }
                            }
                        }
                        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                        var unixTimeStamp = largest_timestamp
                        var date = new Date(unixTimeStamp * 1000);
                        var d = date.getDate();
                        var day = days[date.getDay()];  
                        var month = months[date.getMonth()];
                        return [day,d,month,time,instr]
                    },
                    
                    
                }
            });
            app.mount("#app");

            $("#calendar").evoCalendar({
                theme: 'Royal Navy',
                /* 'eventListToggler': false,
                'sidebarToggler': false, */
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
          
    
       



