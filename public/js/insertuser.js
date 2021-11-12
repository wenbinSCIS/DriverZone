


 var config = {
  apiKey: "AIzaSyDruPuuruiIkp6rGikLAUixFbT5-RFRm0s",
  authDomain: "wad2-e8948.firebaseapp.com",
  databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "wad2-e8948.appspot.com",
};



firebase.initializeApp(config);

function writeUserData(full_name,pnum,email,password,gender,dob){
 var rootRef = firebase.database().ref();
 var storesRef = rootRef.child('users');
 var newStoreRef = storesRef.push();
 newStoreRef.set({
   "name": full_name,
   "pnum": pnum,
   "email": email,
   "password": password,
   "gender": gender,
   "dateofbirth": dob

   
 }
 , (error) => {
     if (error) {
       // The write failed...
       alert("There was a problem with registering")
     } else {
       // Data saved successfully!
       alert("Registration successful")
       window.location.href = "login.html";

     }
 });
}


function getUser(emailstr,password){
 var rootRef = firebase.database().ref();
 var storesRef = rootRef.child('users');
 var count = 0;
 storesRef.on("value", function(snapshot) {
   console.log(snapshot.val());
   for( var item in snapshot.val()){
    

     var dbemail = snapshot.val()[item].email
     var dbpassword = snapshot.val()[item].password
     var username = snapshot.val()[item].name
     if(emailstr===dbemail){
       if (dbpassword === password){
        
         sessionStorage.setItem("userid",item)
         sessionStorage.setItem("username",username)
         
         window.location.href = "index.html";
         break
       }
       else{
         count +=1;
       }
     }
     else{
       count +=1;
     }
   }

   const mode = sessionStorage.getItem('userid');
   if(mode === null){
     alert("Incorrect login details!")
   }
   
});

}

function getEmail(emailstr){
 var rootRef = firebase.database().ref();
 var storesRef = rootRef.child('users');
 var emailcount = 0;
 var error = []
 storesRef.on("value", function(snapshot) {
   console.log(snapshot.val());
   for( var item in snapshot.val()){
     var dbemail = snapshot.val()[item].email

     console.log(dbemail,emailstr)
     if(emailstr===dbemail){
       
       emailcount +=1
       
     }
     else{
       
     }
   }

   if(emailcount > 0){
   
   sessionStorage.setItem("email","false")
   }
   else{

     sessionStorage.setItem("email","true")
   }
});



}





function getTop5Lessons(){
 var rootRef = firebase.database().ref();
 var storesRef = rootRef.child('Booking');
 const userid = sessionStorage.getItem('userid');


 var elemstring = ''

 storesRef.on("value", function(snapshot) {
   
   snapshot.forEach(function(child) {
     var finishedcounter=0
     var reslist = []
     if(userid == child.key){
     
       var dat = child.val()
     
       for(var data in dat){
          
           var date = dat[data].date
        
           var time = dat[data].time
           var instructor = dat[data].instructor
           
           var today = new Date()
 
           var thatdate = new Date(date)
           today.setHours(0,0,0,0)
 
           if(thatdate<today){
             finishedcounter+=1
           }
           else{
             const person = {lessondate:thatdate, instructor:instructor, time:time};
             reslist.push(person)
           
           }
       }

     }
     const sortedActivities = reslist.slice().sort((a, b) => a.lessondate - b.lessondate)
     console.log(sortedActivities)

     var elem = document.getElementById("completed")
     elem.innerText = finishedcounter

     var upc = document.getElementById("upcoming")
     upc.innerText = reslist.length


     var next = document.getElementById("nextlesson")
     var nextins = document.getElementById("nextinstructor")
     upc.innerText = reslist.length
     var tbl = document.getElementById("top5body")
     var bodystr = ''
     if(sortedActivities.length >0){
       
       next.innerText=sortedActivities[0].lessondate.toDateString() + ' ' + sortedActivities[0].time + ' hrs'  
       nextins.innerText=sortedActivities[0].instructor



       if(sortedActivities.length >5){
       var counter = 0
       
       for(lessons of sortedActivities){
         if(counter < 5){
         bodystr += `
         <tr>
               <td> ${lessons.lessondate.toDateString()}</td>
               <td>${lessons.time}</td>
               <td> ${lessons.instructor}</td>
               <td>27,340</td>
         </tr>
         
         `
        
       }
       counter+=1
     }
       tbl.innerHTML = bodystr
   
   }

     else{
       for(lessons of sortedActivities){
         bodystr += `
         <tr>
               <td> ${lessons.lessondate.toDateString()}</td>
               <td>${lessons.time}</td>
               <td> ${lessons.instructor}</td>
               <td>27,340</td>
         </tr>
         
         `
       }
       tbl.innerHTML = bodystr
     }
     }
     else{
       next.innerText="None"
       nextins.innerText="None"
     }
     next.style="font-size:18px;"
   });

   

   getWeather()
});



}



