

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
// Id is ali

var instr_img = document.getElementById("instructor-img");
var instr_name = document.getElementById("instructor-name");
var instr_title = document.getElementById("instr_title");
var instr_quote = document.getElementById("instr_quote");
var display_instr= document.getElementById("book_instr");

instr_name.innerText = `Instructor ${id}`;
instr_img.src = `../images/${id}.JPG`;
display_instr.innerText = `Instructor ${id}`;

displayQuoteAndTitle()

function displayQuoteAndTitle(){
    var ref = firebase.database().ref('instructor');
    ref.once("value")
        .then(function(snapshot){
            var instr_db = snapshot.val()
            for(let ele in instr_db){
                if(ele == id){
                    instr_title.innerText= instr_db[ele].title;
                    instr_quote.innerText = instr_db[ele].quote;
                }
            }
        })
}

//button stuff and initialize databse

function displayTimings(){
    var no_avail = true;
    var string=""
    var ref = firebase.database().ref('instructor');
    //date given in eg 10/10/1000 format
    var date_select = document.getElementById("selected_date").innerText;
    var date_split = date_select.split(" ").join('')
    var date_format_needed = date_split.split('/').join('-');
    // format is now "10.10.1000"
    var to_display = document.getElementById("to_display");
    
    ref.once("value")
        .then(function(snapshot){
            var time=""
            var instr_db = snapshot.val()
            for(let ele in instr_db){
                if(ele == id){
                    var avail_dates = instr_db[ele].date 
                    for(let a_date in avail_dates){
                        if (a_date == date_format_needed){
                            var time = avail_dates[a_date]
                            console.log(time)
                            
                        }
                    }
                    
                }
            }
            var to_update = document.getElementById("times");
            //time is whether there are dates inside, if no dates, time.length is 0
                for(let key in time){
                    if (time[key].Availability == "Available"){
                        no_avail = false;
                        var timings = time[key].time
                        string+= `<button class="button-18" role="button" onclick="bookingDetails(this)" }> ${timings}</button> `;
                    }
                }
                
            if(no_avail==true){
                to_update.innerText = "No dates available for this day"
                to_display.style.display = "none";
            }
            else{
                //date in system
                to_update.innerHTML = string;
                to_display.style.display = "block";
                var display_date = document.getElementById("book_date");
                display_date.innerText = date_format_needed;
                }
            
        })
        
    }  

//User clicks on "select this timeslot" which is after pressing both date and time

/* var to_appear = document.getElementById("timeconfirm");
to_appear.addEventListener("click", bookingDetails);
console.log(to_appear); */

function bookingDetails(button){
    var timing = button.innerText;    
    var display_time = document.getElementById("book_time");
    var display_instr= document.getElementById("book_instr");
    
    display_time.innerText = timing;
    display_instr.innerText = `Instructor ${id}`;
    
}

var book_slot = document.getElementById("confirmation");
book_slot.addEventListener("click",AddtimingtoDB);

const user_id = sessionStorage.getItem("userid");
console.log(user_id);

function AddtimingtoDB(){
    var date_select = document.getElementById("selected_date").innerText;
    var date_split = date_select.split(" ").join('')
    var date_format_needed = date_split.split("/").join('-')

    var format_shift = date_split.split('/')
    var month = format_shift.splice(1,1)
    var new_arr_date = month.concat(format_shift)
    var date_for_timetable = new_arr_date.join("/")
    //dateformat is mm/dd/yyyy
    var arr = date_select.split(" ")
    var unix_needed = arr[4]+"."+arr[2]+"."+arr[0]    
    var unixTimeStamp = parseInt((new Date(unix_needed).getTime() / 1000).toFixed(0))
    // unixTimeStamp as ID for each booking
    var display_time = document.getElementById("book_time").innerText;
    var description = `You have booked a lesson with ${id} on this date at ${display_time}.`
    //user will see this description in the timetable page
    var rootRef = firebase.database().ref(`Booking/${user_id}/${unixTimeStamp}`);
    
    console.log(display_time);
    //push the date
    var pushed_obj = {
        "date": date_for_timetable,
        "description":description,
        "time":display_time,
        "instructor": id, 
        "type":"event",
        "name":"Lesson Booking" ,
        }
    sessionStorage.setItem("instructor",id);
    sessionStorage.setItem("time",display_time)
    sessionStorage.setItem("date",date_format_needed)
    //set to session storage for use in confirmation booking
    rootRef.set(
        pushed_obj
    , (error) => {
        if (error) {
          // The write failed...
        alert("There was a problem with booking, please try again!")
        } else {
          // Data saved successfully!
        
        var newRef = firebase.database().ref(`instructor/${id}/date/${date_format_needed}`);
        
        newRef.once("value")
        .then(function(snapshot){
            var instr_db = snapshot.val()
            for(let ele in instr_db){
                console.log(instr_db[ele])
                if(instr_db[ele].time == display_time){
                    //get element from db
                    var refNeeded = firebase.database().ref(`instructor/${id}/date/${date_format_needed}/${ele}`);
                    // edit availability status
                    refNeeded.update({Availability:"Booked"})
                    
                }
            }
            window.location.href = "confirmation.html";
        })

        
        
        
    } })
}






//This is to add values into the system




function addTime(){
    var date_select = document.getElementById("selected_date").innerText;
    var date_split = date_select.split(" ").join('')
    var date_format_needed = date_split.split('/').join('-');
    var time_to_add = document.getElementById("time_to_add").value

    var ref = firebase.database().ref(`instructor/${id}/date/${date_format_needed}`);
    var storesRef = ref; 
    var newStoreRef = storesRef.push();
    newStoreRef.set({
            "Availability":"Available",
            "time": `${time_to_add}` 
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