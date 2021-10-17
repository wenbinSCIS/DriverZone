
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
    var date_select = document.getElementById("selected_date").innerText;
    var date_split = date_select.split(" ").join('')
    var date_format_needed = date_split.split('/').join('-');
    var string=""
    var ref = firebase.database().ref('instructor');
    
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
            var to_appear = document.getElementById("timeconfirm");
            //time is whether there are dates inside, if no dates, time.length is 0
            if(time.length>0){
                for(let timings of time){
                    console.log(timings)
                    string+= `<button class="button-18" role="button"> ${timings}</button> `;
                }
                to_update.innerHTML = string;
                var to_appear = document.getElementById("timeconfirm");
                to_appear.style.display = "inline";
            }
            else{
                //no date in system
                to_update.innerText = "No dates available for this day"
                to_appear.style.display = "none";
                }
            
        })
    }  

//User clicks on "select this timeslot" which is after pressing both date and time


to_appear.addEventListener("click", bookingDetails);
console.log(to_appear);
function bookingDetails(){
    console.log("here")
    var buttons = document.getElementsByClassName("button-18");
    var checked = "";
    for(let button of buttons){
        if(button.clicked){
            console.log(button)
        }
    }
}