


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
            alert("Log in successful!")
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

      
      
   });
   const mode = sessionStorage.getItem('userid');
   if(mode === null){
     alert("Incorrect login details!")
   }
  }





 