
var config = {
    apiKey: "AIzaSyDruPuuruiIkp6rGikLAUixFbT5-RFRm0s",
    authDomain: "wad2-e8948.firebaseapp.com",
    databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "wad2-e8948.appspot.com",
  };

  firebase.initializeApp(config);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

function submit() {
    var a=checkRating()
    console.log(a);
    console.log(checkDescription())
    console.log(checkRating());
    console.log(checkDescription());
    cur_userid = sessionStorage.getItem('userid')
    var ref = firebase.database().ref("users/"+cur_userid+"/name");
    console.log(ref);
    ref.on('value', (snapshot) => {
        var name1 =snapshot.val();
        if (checkRating() && checkDescription()) {
            var description=checkDescription();
            var rating= checkRating();
            var rootRef = firebase.database().ref("instructor/"+id+"/review");
            var rootRef = rootRef.push();
            rootRef.set({
                "description": description,
                "rating": rating,
                "name": name1,
              }
              , (error) => {
                  if (error) {
                    // The write failed...
                    alert("There was a problem with registering")
                  } else {
                    // Data saved successfully
                   
                    window.location.href = "course-detail.html?id="+id;
          
                  }
              });
    
        }
        else {
          //error if user does not fill up the form or key in the rating score
        }

      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      }); 
  
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







