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
    var string =`
    <table class='table table-striped' id='content_table'>
    <thead class="thead thead-dark">
        <tr>
            <th class='text-center text-middle' width='10%'>Username</th>
            <th style='width: 60%;' class='text-left text-middle'>Content</th>
            <th style='width: 20%;' class='text-left text-middle'>Time</th>
        </tr>
    </thead>`
    var count_id = sessionStorage.getItem("post_count_id")
    var data_checker=0

    ref.once("value")
        .then(function(snapshot){
            var post_db = snapshot.val()

            for(let ele in post_db){
                if (data_checker==count_id)
                {
                var upvote_no=post_db[ele].no_of_vote
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

                var upvote_holder=document.getElementById("upvote_count")
                upvote_holder.innerHTML+=upvote_no

                comment_key_list=Object.keys(cur_comment)

                for (const [key, value] of Object.entries(comment_key_list))
                {
                    var is_hidden=""
                    var comment_user_id = cur_comment[value].user_id
                    var comment_user = get_username(comment_user_id)

                    if (comment_user=="System")
                    {
                        is_hidden="style='display:none;'"
                    }

                    var comment_content = cur_comment[value].content
                    var comment_time = cur_comment[value].time
                    string += `<tr ${is_hidden}>
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
        check_upvote()
        check_downvote()
    }

function check_upvote()
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
                    user_id = sessionStorage.getItem("userid")
                    var rootRef_0 = firebase.database().ref("users");
                    var user_ref = rootRef_0.child(user_id);

                    user_ref.once("value")
                        .then(function(snapshot){
                            var user_db = snapshot.val()
                            var upvote_db = user_db.upvote

                            if (upvote_db!=undefined)
                            {
                                upvote_arr=Object.entries(upvote_db)
                                var has_upvote=false

                                for (const [key, value] of upvote_arr)
                                {
                                    if (value==ele)
                                    {
                                        has_upvote=true
                                    }
                                }

                            if (has_upvote)
                            {
                                upvote_button=document.getElementById("give_upvote")
                                upvote_button.setAttribute("onclick","remove_upvote()")
                                upvote_button.setAttribute("class","fa fa-arrow-circle-up fa-3x")
                                upvote_button.setAttribute("style","float: right;color:green")

                                document.getElementById("give_downvote").disabled = true
                            }
                        }
                            }
                        )
                }
                data_checker++
            }
        })
}

function check_downvote()
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
                    user_id = sessionStorage.getItem("userid")
                    var rootRef_0 = firebase.database().ref("users");
                    var user_ref = rootRef_0.child(user_id);

                    user_ref.once("value")
                        .then(function(snapshot){
                            var user_db = snapshot.val()
                            var downvote_db = user_db.downvote

                            if (downvote_db!=undefined)
                            {
                                downvote_arr=Object.entries(downvote_db)
                                var has_downvote=false

                                for (const [key, value] of downvote_arr)
                                {
                                    if (value==ele)
                                    {
                                        has_downvote=true
                                    }
                                }

                            if (has_downvote)
                            {
                                downvote_button=document.getElementById("give_downvote")
                                downvote_button.setAttribute("onclick","remove_downvote()")
                                downvote_button.setAttribute("class","fa fa-arrow-circle-down fa-3x")
                                downvote_button.setAttribute("style","float: left;color:red")

                                document.getElementById("give_upvote").disabled = true
                            }
                        }
                            }
                        )
                }
                data_checker++
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
                    user_id = sessionStorage.getItem("userid")
                    var rootRef_0 = firebase.database().ref("users");
                    var user_ref = rootRef_0.child(user_id);

                    user_ref.once("value")
                        .then(function(snapshot){
                            var user_db = snapshot.val()
                            var upvote_db = user_db.upvote

                            if (upvote_db!=undefined)
                            {
                                upvote_arr=Object.entries(upvote_db)
                                var not_in=true
    
                                for (const [key, value] of upvote_arr)
                                {
                                    if (value==ele)
                                    {
                                        not_in=false
                                    }
                                }
                                
                                if (not_in)
                                {
                                    var storesRef = user_ref.child("upvote");
    
                                    if (storesRef[ele]==undefined)
                                    {
                                        storesRef.push(ele);
    
                                        var rootRef = firebase.database().ref("post/"+ele+"/no_of_vote")
                                        rootRef.set(firebase.database.ServerValue.increment(1));
                                    }
                                    upvote_holder=document.getElementById("upvote_count")
                                    upvote_count=Number(upvote_holder.innerHTML)
                                    upvote_count+=1
                                    upvote_holder.innerHTML=upvote_count
                                }
                            }

                            else
                            {
                                var storesRef = user_ref.child("upvote");

                                if (storesRef[ele]==undefined)
                                {
                                    storesRef.push(ele);

                                    var rootRef = firebase.database().ref("post/"+ele+"/no_of_vote")
                                    rootRef.set(firebase.database.ServerValue.increment(1));
                                }
                                upvote_holder=document.getElementById("upvote_count")
                                upvote_count=Number(upvote_holder.innerHTML)
                                upvote_count+=1
                                upvote_holder.innerHTML=upvote_count
                            }
                            }
                        )
                }
                data_checker++
            }
        })
        upvote_button=document.getElementById("give_upvote")
        upvote_button.setAttribute("onclick","remove_upvote()")
        upvote_button.setAttribute("class","fa fa-arrow-circle-up fa-3x")
        upvote_button.setAttribute("style","float: right;color:green")

        document.getElementById("give_downvote").disabled = true
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
                    user_id = sessionStorage.getItem("userid")
                    var rootRef_0 = firebase.database().ref("users");
                    var user_ref = rootRef_0.child(user_id);

                    user_ref.once("value")
                        .then(function(snapshot){
                            var user_db = snapshot.val()
                            var downvote_db = user_db.downvote

                            if (downvote_db!=undefined)
                            {
                                downvote_obj_arr=Object.entries(downvote_db)
                                var not_in=true
    
                                for (const [key, value] of downvote_obj_arr)
                                {
                                    if (value==ele)
                                    {
                                        not_in=false
                                    }
                                }
                                
                                if (not_in)
                                {
                                    var storesRef = user_ref.child("downvote");
    
                                    if (storesRef[ele]==undefined)
                                    {
                                        storesRef.push(ele);
    
                                        var rootRef = firebase.database().ref("post/"+ele+"/no_of_vote")
                                        rootRef.set(firebase.database.ServerValue.increment(-1));
                                    }
                                }
                            }

                            else
                            {
                                var storesRef = user_ref.child("downvote");
    
                                if (storesRef[ele]==undefined)
                                {
                                    storesRef.push(ele);

                                    var rootRef = firebase.database().ref("post/"+ele+"/no_of_vote")
                                    rootRef.set(firebase.database.ServerValue.increment(-1));
                                }
                                upvote_holder=document.getElementById("upvote_count")
                                upvote_count=Number(upvote_holder.innerHTML)
                                upvote_count-=1
                                upvote_holder.innerHTML=upvote_count
                            }
                            }
                        )
                }
                data_checker++
            }
        })

        downvote_button=document.getElementById("give_downvote")
        downvote_button.setAttribute("onclick","remove_downvote()")
        downvote_button.setAttribute("class","fa fa-arrow-circle-down fa-3x")
        downvote_button.setAttribute("style","float: left;color:red")

        document.getElementById("give_upvote").disabled = true
}

function remove_upvote()
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
                    user_id = sessionStorage.getItem("userid")
                    var rootRef_0 = firebase.database().ref("users");
                    var user_ref = rootRef_0.child(user_id);

                    user_ref.once("value")
                        .then(function(snapshot){
                            var user_db = snapshot.val()
                            var upvote_db = user_db.upvote

                            if (upvote_db!=undefined)
                            {
                                upvote_arr=Object.entries(upvote_db)
    
                                for (const [key, value] of upvote_arr)
                                {
                                    if (value==ele)
                                    {
                                        var delete_ref = firebase.database().ref();
                                        delete_ref.child('users').child(user_id).child("upvote").child(key).remove();
                                    }
                                }
                                upvote_button=document.getElementById("give_upvote")
                                upvote_button.setAttribute("onclick","give_upvote()")
                                upvote_button.setAttribute("class","fa fa-arrow-circle-o-up fa-3x")
                                upvote_button.setAttribute("style","float: right;")

                                document.getElementById("give_downvote").disabled = false

                                var post_ref = firebase.database().ref('post');
                                var count_id = sessionStorage.getItem("post_count_id")
                                var data_checker=0
                            
                                post_ref.once("value")
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

                            
                            }
                        )
                }
                data_checker++
            }
        })
        upvote_holder=document.getElementById("upvote_count")
        upvote_count=Number(upvote_holder.innerHTML)
        upvote_count-=1
        upvote_holder.innerHTML=upvote_count
}

function remove_downvote()
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
                    user_id = sessionStorage.getItem("userid")
                    var rootRef_0 = firebase.database().ref("users");
                    var user_ref = rootRef_0.child(user_id);

                    user_ref.once("value")
                        .then(function(snapshot){
                            var user_db = snapshot.val()
                            var downvote_db = user_db.downvote

                            if (downvote_db!=undefined)
                            {
                                downvote_arr=Object.entries(downvote_db)
    
                                for (const [key, value] of downvote_arr)
                                {
                                    if (value==ele)
                                    {
                                        var delete_ref = firebase.database().ref();
                                        delete_ref.child('users').child(user_id).child("downvote").child(key).remove();
                                    }
                                }
                                downvote_button=document.getElementById("give_downvote")
                                downvote_button.setAttribute("onclick","give_downvote()")
                                downvote_button.setAttribute("class","fa fa-arrow-circle-o-down fa-3x")
                                downvote_button.setAttribute("style","float: left;")

                                document.getElementById("give_upvote").disabled = false
                                
                                var post_ref = firebase.database().ref('post');
                                var count_id = sessionStorage.getItem("post_count_id")
                                var data_checker=0
                            
                                post_ref.once("value")
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

                            
                            }
                        )
                }
                data_checker++
            }
        })
        upvote_holder=document.getElementById("upvote_count")
        upvote_count=Number(upvote_holder.innerHTML)
        upvote_count+=1
        upvote_holder.innerHTML=upvote_count
}