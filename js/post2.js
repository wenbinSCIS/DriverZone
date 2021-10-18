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
        "no_of_vote": no_of_vote,
        "comment": 
        {
            "0":{
                "content":"This is the beginning of the post",
                "user_id":"System"
            }
        }
    }

   , (error) => {
        if (error) {
         // The write failed...
            alert("There was a problem with post creating")
        } 
    });
}

var cur_name_list=[null]
function get_username(cur_user_id)
{
    var rootRef = firebase.database().ref();
    var storesRef = rootRef.child('users');
    var count = 0;
    var total_count = 0;
    
    

    storesRef.on("value", function(snapshot) 
    {
        snapshot.forEach((child) => 
        {
            total_count=total_count+1

            if (cur_user_id == child.key)
            {
                cur_name=child.val().name;
                cur_name_list[0]=cur_name
            }

            else
            {
                count++
            }
        })

        if (count == total_count)
        {
            console.log("no such user")
        }

        return cur_name_list
    })

    
    return cur_name_list
}

var all_post_list = {}
function get_all_post(){
    var ref = firebase.database().ref('post');
    var count=0
    var string ="<table class='table'><tr><th style='width: 700px;'>Topic</th><th style='width: 150px;'>Tag</th><th style='width: 150px;'>Time</th><th>No. of Comments</th></tr>"

    ref.once("value")
        .then(function(snapshot){
            var post_db = snapshot.val()
            console.log(post_db)
            for(let ele in post_db){
                var cur_title = post_db[ele].title;
                var cur_content = post_db[ele].content;
                var cur_creator_id = post_db[ele].creator;
                var cur_username = get_username(cur_creator_id);
                var cur_tag = post_db[ele].tag;
                var cur_time = post_db[ele].time;
                var cur_upvote = post_db[ele].no_of_vote;
                var cur_comment = post_db[ele].comment;
                var to_populate = document.getElementById("info_here");

                string += `<tr>
                            <td>${cur_title}</td>
                            <td>${cur_tag}</td>
                            <td>${cur_time}</td>
                            <td>${cur_comment.length}
                            </tr>`
            }
            string += "</table>"
            to_populate.innerHTML = string;
        })
    }
get_all_post()
