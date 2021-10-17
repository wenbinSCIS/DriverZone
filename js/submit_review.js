
var config = {
    apiKey: "AIzaSyDruPuuruiIkp6rGikLAUixFbT5-RFRm0s",
    authDomain: "wad2-e8948.firebaseapp.com",
    databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "wad2-e8948.appspot.com",
  };

  firebase.initializeApp(config);

function test(){
    console.log(99);
    var rootRef = firebase.database().ref("instructor/"+id+"/review");
    var rootRef = rootRef.push();
    rootRef.set({
        "name": "Tom",
  
        
      }
      , (error) => {
          if (error) {
            // The write failed...
            alert("There was a problem with registering")
          } else {
            // Data saved successfully!
            alert("Registration successful")
            window.location.href = "course-detail.html?id="+id;
  
          }
      });
    }
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')





function submit() {
    var a=checkRating()
    console.log(a);
    console.log(checkDescription())
    console.log(checkRating());
    console.log(checkDescription());
    if (checkRating() && checkDescription()) {
        var description=checkDescription();
        var rating= checkRating();
        var rootRef = firebase.database().ref("instructor/"+id+"/review");
        var rootRef = rootRef.push();
        rootRef.set({
            "description": description,
            "rating": rating,
          }
          , (error) => {
              if (error) {
                // The write failed...
                alert("There was a problem with registering")
              } else {
                // Data saved successfully!
                window.location.href = "course-detail.html?id="+id;
      
              }
          });

    }
    else {
        console.log("elee");
    }

}


function checkRating() {
    var rating=document.querySelectorAll('input[type="radio"]');
    for (const rb of rating) {
       if (rb.checked) {
           return Number(rb.value);
       }
    }
    return false;
}

function checkDescription() {
    if (document.getElementById("review").value==="") {
        return false;
    }
    return document.getElementById("review").value;
}



