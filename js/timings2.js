
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
                    instr_title.innerText= instr_db[ele].title;
                    instr_quote.innerText = instr_db[ele].quote;
                }
            }
        })
}

//button stuff and initialize databse
var select = document.getElementById("confirm")
select.addEventListener("click", displayTimings);




function displayTimings(){
    var string=""
    var ref = firebase.database().ref('instructor');
    var date_select = document.getElementById("selected_date").innerText;
    var date_split = date_select.split(" ").join('')
    var date_format_needed = date_split.split('/').join('-');
    var to_display = document.getElementById("to_display");
    to_display.style.display = "block";
    ref.once("value")
        .then(function(snapshot){
            var time=""
            var instr_db = snapshot.val()
            for(let ele in instr_db){
                if(ele == id){
                    var avail_dates = instr_db[ele].date 
                    console.log(avail_dates)
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
            if(time.length>0){
                for(let timings of time){
                    string+= `<button class="button-18" role="button" onclick="bookingDetails(this)"> ${timings}</button> `;
                }
                to_update.innerHTML = string;
            }
            else{
                //no date in system
                to_update.innerText = "No dates available for this day"
                }
            
        })
        
    }  

//User clicks on "select this timeslot" which is after pressing both date and time

/* var to_appear = document.getElementById("timeconfirm");
to_appear.addEventListener("click", bookingDetails);
console.log(to_appear); */

function bookingDetails(button){
    var timing = button.innerText;
    var date_select = document.getElementById("selected_date").innerText;
    var date_split = date_select.split(" ").join('')
    var date_format_needed = date_split.split('/').join('-');

    var display_date = document.getElementById("book_date");
    var display_time = document.getElementById("book_time");
    var display_instr= document.getElementById("book_instr");
    

    display_date.innerText = date_format_needed;
    display_time.innerText = timing;
    display_instr.innerText = `Instructor ${id}`;
    
}