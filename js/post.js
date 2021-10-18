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

        else {
         // Data saved successfully!
            alert("Post creation is successful")
            window.location.href = "forum.html";
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
function get_all_post()
{
    var rootRef = firebase.database().ref();
    var storesRef = rootRef.child('post');
    var count=0

    storesRef.on("value", function(snapshot)
    {
    
        for( var item in snapshot.val())
        {
            var cur_title = snapshot.val()[item].title;
            var cur_content = snapshot.val()[item].content;
            var cur_creator_id = snapshot.val()[item].creator;
            var cur_username = get_username(cur_creator_id);
            var cur_tag = snapshot.val()[item].tag;
            var cur_time = snapshot.val()[item].time;
            var cur_upvote = snapshot.val()[item].no_of_vote;
            var cur_comment = snapshot.val()[item].comment;

            var cur_key="key"+count.toString();

            all_post_list[cur_key]=[cur_title,cur_content,cur_creator_id,cur_username,cur_tag,cur_time,cur_upvote,cur_comment];
            count+=1;
            all_post_list.total_length=count;
        }
        return all_post_list;
    })

    return all_post_list;
}

