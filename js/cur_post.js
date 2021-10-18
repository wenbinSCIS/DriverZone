var config = 
{
    apiKey: "AIzaSyDruPuuruiIkp6rGikLAUixFbT5-RFRm0s",
    authDomain: "wad2-e8948.firebaseapp.com",
    databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "wad2-e8948.appspot.com",
};

firebase.initializeApp(config);

function create_new_comment(content,creator,time)
{
    var post_ref = firebase.database().ref('post');
    var count_id = sessionStorage.getItem("post_count_id");
    var post_specific_id;

    post_ref.once("value")
        .then(function(snapshot){
            var post_db = snapshot.val()

            var data_checker=0

            for(let ele in post_db){
                if (data_checker==count_id)
                {
                    post_specific_id=ele
                    var rootRef = firebase.database().ref();
                    var storesRef = rootRef.child('post').child(post_specific_id).child("comment");
                    var newStoreRef = storesRef.push();
                    newStoreRef.set({
                        "content": content,
                        "time": time,
                        "user_id": creator
                    }

                    , (error) => {
                        if (error) {
                         // The write failed...
                            alert("There was a problem with post creating")
                        }else {
                            // Post created successfully!
                            window.location.href = "cur_post.html";
                    }
                    });
                                }
                                data_checker++
                                }})
    
}

var cur_name
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
                var element = document.getElementById("user")
                element.innerText = cur_name;
                element.removeAttribute('id')
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
        return cur_name
    })
    return cur_name
}

function get_username_post_title(cur_user_id)
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
                var element = document.getElementById("post_creator")
                element.innerText = cur_name;
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
        return cur_name
    })
    return cur_name
}

function get_comment(){
    var ref = firebase.database().ref('post');
    var string ="<table class='table' id='content_table'><tr><th class='text-center text-middle' width='10%'>Username</th><th style='width: 60%;' class='text-left text-middle'>Content</th><th style='width: 20%;' class='text-left text-middle'>Time</th>"
    var count_id = sessionStorage.getItem("post_count_id")
    var data_checker=0

    ref.once("value")
        .then(function(snapshot){
            var post_db = snapshot.val()

            for(let ele in post_db){
                if (data_checker==count_id)
                {
                var cur_title = post_db[ele].title;
                var cur_content = post_db[ele].content;
                var cur_creator_id = post_db[ele].creator;
                var cur_username = get_username_post_title(cur_creator_id);
                var cur_time = post_db[ele].time;
                var cur_comment = post_db[ele].comment;
                var to_populate = document.getElementById("content_here");

                var title_holder=document.getElementById("post_title")
                title_holder.innerHTML=cur_title

                var creator_holder=document.getElementById("post_creator")
                creator_holder.innerHTML=cur_username

                var time_holder=document.getElementById("post_time")
                time_holder.innerHTML=cur_time

                var content_holder=document.getElementById("post_content")
                content_holder.innerHTML=cur_content

                comment_key_list=Object.keys(cur_comment)

                for (const [key, value] of Object.entries(comment_key_list))
                {
    
                    var comment_user_id = cur_comment[value].user_id
                    var comment_user = get_username(comment_user_id)

                    var comment_content = cur_comment[value].content
                    var comment_time = cur_comment[value].time
                    string += `<tr>
                            <th class="text-center text-middle" id="user">${comment_user}</a></th>
                            <td class="text-left align-middle">${comment_content}</td>
                            <td class='align-middle'>${comment_time}</td>
                            </tr>`
                }
                string += "</table>"
                to_populate.innerHTML = string;
            }
            data_checker+=1
            }
        })
    }

function give_upvote()
{
    var ref = firebase.database().ref('post');
    var count_id = sessionStorage.getItem("post_count_id")
    var data_checker=0

    ref.once("value")
        .then(function(snapshot){
            var post_db = snapshot.val()

            for(let ele in post_db){
                if (data_checker==count_id)
                {
                var rootRef = firebase.database().ref("post/"+ele+"/no_of_vote")
                rootRef.set(firebase.database.ServerValue.increment(1));
                }
                data_checker++
            }
        })
}

function give_downvote()
{
    var ref = firebase.database().ref('post');
    var count_id = sessionStorage.getItem("post_count_id")
    var data_checker=0

    ref.once("value")
        .then(function(snapshot){
            var post_db = snapshot.val()

            for(let ele in post_db){
                if (data_checker==count_id)
                {
                var rootRef = firebase.database().ref("post/"+ele+"/no_of_vote")
                rootRef.set(firebase.database.ServerValue.increment(-1));
                }
                data_checker++
            }
        })
}