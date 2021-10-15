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


function display(input){
    for(let ele in input){
        if(ele == id){
            console.log(input)
            var avail_dates = ele.date
        }
    }
}