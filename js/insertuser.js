
var config = {
    apiKey: "AIzaSyDruPuuruiIkp6rGikLAUixFbT5-RFRm0s",
    authDomain: "wad2-e8948.firebaseapp.com",
    databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "wad2-e8948.appspot.com",
  };

firebase.initializeApp(config);

function writeUserData(){

	
		

		const dbRef = firebase.database().ref();
		const usersRef = dbRef.child('users');

		
 		userRefs.child('mike').set({'firstName': "test", 'lastName': "test", 'gender': "test",})


}






            