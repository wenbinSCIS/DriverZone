
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

//button stuff and initialize databse
var select = document.getElementById("confirm")
select.addEventListener("click", displayTimings);


function getDatabase(){
    var ref = firebase.database().ref('instructor');
    ref.once("value")
        .then(function(snapshot){
            var instr_db = snapshot.val()
            return instr_db;
        })
}


function displayTimings(){
    var date_select = document.getElementById("selected_date").innerText;
    var date_split = date_select.split(" ").join('')
    var date_format_needed = date_split.split('/').join('-');
    console.log(date_format_needed);
    var string=""
    var ref = firebase.database().ref('instructor');
    ref.once("value")
        .then(function(snapshot){
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
            if(time.length>0){
            for(let timings of time){
                console.log(timings)
                string+= `<button class="button-18" role="button"> ${timings}</button> `;
            }
            }
            var to_update = document.getElementById("times");
            to_update.innerHTML = string;
        })

   
    }  