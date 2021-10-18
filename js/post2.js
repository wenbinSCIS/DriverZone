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
        }else {
            // Post created successfully!
            window.location.href = "forum.html";
    }
    });
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

var all_post_list = {}
function get_all_post(){
    var ref = firebase.database().ref('post');
    var count=0
    var string ="<table class='table'><tr><th style='width: 55%;' class='text-center text-middle'>Topic</th><th class='text-center text-middle' width='15%'>Creator</th><th style='width: 10%;' class='text-center text-middle'>Tag</th><th style='width: 20%;' class='text-center text-middle'>Time</th><th class='text-center text-middle'>No. of Comments</th><th class='text-center text-middle'>Upvotes</th></tr>"

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

                if (cur_tag=="theory")
                {
                    tag_class="bg-info text-light text-center"
                }

                if (cur_tag=="practical")
                {
                    tag_class="bg-secondary text-light text-center"
                }

                if (cur_tag=="other")
                {
                    tag_class="bg-warning text-light text-center"
                }

                string += `<tr>
                            <td><a class="text-secondary text-left text-middle" href="#">${cur_title}</a></td>
                            <td class="text-center align-middle" id="user">${cur_username}</td>
                            <td class='${tag_class} align-middle'>${cur_tag}</td>
                            <td class="text-center align-middle">${cur_time}</td>
                            <td class="text-center align-middle">${cur_comment.length}</td>
                            <td class="text-center align-middle">${cur_upvote}</td>
                            </tr>`
            }
            string += "</table>"
            to_populate.innerHTML = string;
        })
    }
get_all_post()
