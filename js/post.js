var config = 
{
    apiKey: "AIzaSyDruPuuruiIkp6rGikLAUixFbT5-RFRm0s",
    authDomain: "wad2-e8948.firebaseapp.com",
    databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "wad2-e8948.appspot.com",
};

firebase.initializeApp(config);

function create_new_post(title,content,creator,tag,time, no_of_vote)
{
    var rootRef = firebase.database().ref();
    var storesRef = rootRef.child('post');
    var newStoreRef = storesRef.push();
    newStoreRef.set({
        "title": title,
        "content": content,
        "creator": creator,
        "tag": tag,
        "time": time,
        "no_of_vote": no_of_vote
    }

   , (error) => {
        if (error) {
         // The write failed...
            alert("There was a problem with post creating")
        } 

        else {
         // Data saved successfully!
            alert("Post creation is successful")
            window.location.href = "forum.html";
        }
    });
    }

