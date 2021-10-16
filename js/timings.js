// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDruPuuruiIkp6rGikLAUixFbT5-RFRm0s",
    authDomain: "wad2-e8948.firebaseapp.com",
    databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wad2-e8948",
    storageBucket: "wad2-e8948.appspot.com",
    messagingSenderId: "905590919273",
    appId: "1:905590919273:web:5d6c7e3da73fbdb9cdd2f8"
};

var confirm=false;

// Initialize Firebase
    const app = initializeApp(firebaseConfig);

    import {getDatabase, ref, set, child, get,update, remove} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js" 

    const db= getDatabase();


        const dbref= ref(db);

        get(child(dbref,"instructor")).then((snapshot)=>{
            if (snapshot.exists()) {
                return display(snapshot.val());
            }
            else {
                alert("No data found")
            }
        })
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        // Id is ali
        
var instr_img = document.getElementById("instructor-img");
var instr_name = document.getElementById("instructor-name");

instr_name.innerText = id;
instr_img.src = `../images/${id}.JPG`;

var time= []

function display(input){
    var date_select = document.getElementById("selected_date").innerText;
    var date_split = date_select.split(" ").join('')
    var date_format_needed = date_split.split('/').join('-');
    console.log(date_format_needed);
    var count=0;
    var string =""
        for(let ele in input){
            if(ele == id){
                console.log(input)
                var avail_dates = input[ele].date
                // assume can get date
                console.log(avail_dates)
                for(let a_date in avail_dates){
                    if (a_date == date_format_needed){
                        time = avail_dates[a_date]
                    }
                }
            }
        }
}

