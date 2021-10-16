
var config = {
    apiKey: "AIzaSyDruPuuruiIkp6rGikLAUixFbT5-RFRm0s",
    authDomain: "wad2-e8948.firebaseapp.com",
    databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "wad2-e8948.appspot.com",
  };

  firebase.initializeApp(config);

function test(){
    console.log(999);
    var rootRef = firebase.database().ref();
    var storesRef = rootRef.child('instructor');
    var count = 0;
    storesRef.on("value", function(snapshot) {
      console.log(snapshot.val());
      for(var item in snapshot.val()) {
          if (item==id) {
          for (var instructor in snapshot.val()[item]) {
              if (instructor=="rating") {
                  console.log(instructor);
                  var review=snapshot.val()[item].review;
                  var length=Object.keys(review).length;
                  var storesRef = rootRef.child('instructor').child(id).child("review");
                  console.log(storesRef);
                  var newStoreRef = storesRef.push();
              }
          }
        }
    }
}
    )
}


 const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

console.log(id);

function submit() {
    var a=checkRating()
    console.log(a);
    console.log(checkDescription())
}


function checkRating() {
    var rating=document.querySelectorAll('input[type="radio"]');
    for (const rb of rating) {
       if (rb.checked) {
           return rb.value;
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



