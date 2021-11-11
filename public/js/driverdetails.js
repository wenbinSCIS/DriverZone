    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDruPuuruiIkp6rGikLAUixFbT5-RFRm0s",
      authDomain: "wad2-e8948.firebaseapp.com",
      databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "wad2-e8948",
      storageBucket: "wad2-e8948.appspot.com",
      messagingSenderId: "905590919273",
      appId: "1:905590919273:web:5d6c7e3da73fbdb9cdd2f8"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    import {getDatabase, ref, set, child, get,update, remove,query} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js" 

    const db = getDatabase(app)
    const dbRef = ref(db)
    const usersSnapshot = await get(query(dbRef))
    var instructor_obj=usersSnapshot.val().instructor;
    var input=display(instructor_obj);
    var holder=[];
    for (let x in instructor_obj) {
        holder.push(instructor_obj[x]);

    }



    function resourceTemplate(resource) {
        return `
        <div class="block-3 bo2 flex-w">
        <div class="wrap-pic-w hov5 bo2-r w-size6 ">
            <a href="course-detail.html?id=${resource.name}"><img src="../images/${resource.name}.JPG" alt="IMG-COURSE"></a>
        </div>

        <div class="wrap-text-b3 w-size7 p-l-35 p-r-27 p-t-26 p-b-25 w-full-md">
            <div class="flex-sb-m p-b-12">
                
                <span class="color1 fs-16">
                    <i class='icon_star-empty'></i>
                    ${star_display(resource.rating.total)}
                
                </span>
            </div>

            <h4 class="p-b-15">
                <a href="course-detail.html" class="m-txt9 hov-color-main trans-04">
                    ${capitalizeFirstLetter(resource.name)}
                </a>
            </h4>
            
            <p class="m-txt10 h-size4 of-hidden m-b-5 respon3">
                ${resource.description}
            </p>

            <span class="m-txt9">$${resource.price}/h</span>
            
            <div class="wrap-btn-b3 flex-w p-t-13">
                <div class="m-r-8 p-t-8">
                    <!-- Button -->
                    <a href="booking.html?id=${resource.name}" class="btn-drive m-txt1 size3 bg-main hov-color-white bo-rad-4">
                        Book now
                    </a>
                </div>

                <div class="p-t-8">
                    <!-- Button -->
                    <a href="course-detail.html?id=${resource.name}" class="btn-drive m-txt10 size4 bo3 bg1 hov-color-white bo-rad-4">
                        Detail
                    </a>
                </div>
            </div>

        </div>
        
    </div>
        `;

      }
    


    var arr;
    var copy;
    function display(input) {
        arr=[];
        for (let ele in input) {
            arr.push(input[ele]);
        }
     
        return project(arr,0)

    }
    function project(holder,num) {
        document.getElementById("result-page").innerHTML=`Showing ${num+1}-${Math.ceil((Object.keys(holder).length)/3)} of ${Object.keys(holder).length} results`
    
        if (num>0) {
            num=num+(num)*3-1
            console.log(num);
        }
        let copy=holder.slice(num,num+3);
   
        document.getElementById("here").innerHTML=copy
        .map(resourceTemplate)
        .join('');  
         
    }


    //buttons

    length=Math.ceil((Object.keys(instructor_obj).length)/3);

    document.getElementById("buttons").innerHTML+=`<nav aria-label="Page navigation example"><ul class="pagination justify-content-center">`
    for (let index = 0; index<length; index++) {
        document.getElementById("buttons").innerHTML+=`
        <li class="page-item text-primary"><a class="page-link" id=${index}>${index+1}</a></li>
        `;
        
    }
    document.getElementById("buttons").innerHTML+=`</ul></nav>`
    
    var wrapper= document.getElementById("buttons").innerHTML;
    for (let index = 0; index<length; index++) {
        document.getElementById(index.toString()).addEventListener("click", ()=>project(holder,index)); 
        $('#'+index).click(function (e) { //#A_ID is an example. Use the id of your Anchor
            $('html, body').animate({
                scrollTop: $('#top').offset().top - 10 //#DIV_ID is an example. Use the id of your destination on the page
            }, 'slow');
        });
        
        
    }

    function star_display(input) {
        var new1="";
        input=Math.floor((Number(input)))
      
        for (let index = 0; index < input; index++) {
          new1+="<i class='icon_star voted'></i>"
            
        };
        let remaining=5-input;
        for (let index = 0; index < remaining; index++) {
          new1+="<i class='icon_star' style='color:#DCDCDC'></i>"

          
        }
        return new1
    

        
    }


    document.getElementById("submit").addEventListener("click",getSelectValue);

    function getSelectValue()
    {
        var location1 = document.getElementById("location").value;
        var rating = document.getElementById("rating").value;
        var langauge1=document.getElementById("language").value;
        var budget=document.getElementById("budget").value;
        if (location1=="Location") {
            location1=0;
            
        }
        if (rating=="Rating") {
            rating=0;
            
        }
        else {
            rating=rating.slice(0,1);
        }
        if (langauge1=="Language") {
            langauge1=0;
            
        }
        else {
            // langauge1=langauge1.toLowerCase();
        }
        if (budget=="Budget") {
            budget=0;
            
        }
        else {
            budget=Number(budget.slice(1,3));
        }
     
        let test=[];
        test.push({"location":location1},{"rating":rating},{"language":langauge1},{"budget":budget})
        var test3=[];
        for (let index = 0; index < test.length; index++) {
            if (Object.values(test[index])[0]!=0) {

                test3.push(test[index])
     
            }
            
        }

        if (test3.length==0) {
            window.location.href = "course-list.html";
            exit();

            
            
        }


        else {
        var arr2=[];
        var arr3=[];
        
        for (let x in holder) {
            var arr4=[];
            for (let y in test3) {
                var key1=Object.keys(test3[y])[0];
                var val=Object.values(test3[y])[0];
                if (key1=="rating") {
                    if (holder[x][key1].total>=val) {
                        arr4.push(true)
                    }
                }
                if (key1=="location") {
    
                    if (holder[x].location==val) {
                        arr4.push(true)
                    }
                }
                if (key1=="budget"){
                    if (holder[x].price<=val) {
                        arr4.push(true);
                    }
                }
                if (key1=="language") {
                    if ((holder[x].language).includes(val)) {
                        arr4.push(true);
                    }
                }

            }
            if (arr4.length==test3.length) {
                arr2.push(holder[x])
            }
      
        }
        }
        window.location.href = "course-list.html#top";

        if (arr2.length==0) {
            document.getElementById("here").innerHTML="<img src='../images/search-bar.gif' style='width:100%'>"
        }
        else {
        project(arr2,0);
        }
        length=Math.ceil((Object.keys(arr2).length)/3);
        document.getElementById("buttons").innerHTML=`<nav aria-label="Page navigation example"><ul class="pagination justify-content-center">`
        for (let index = 0; index<length; index++) {
            document.getElementById("buttons").innerHTML+=`
            <li class="page-item text-primary"><a class="page-link" id=${index}>${index+1}</a></li>
            `;
            
        }
        document.getElementById("buttons").innerHTML+=`</ul></nav>`
        for (let index = 0; index<length; index++) {
            document.getElementById(index.toString()).addEventListener("click", ()=>project(arr2,index)); 
            $('#'+index).click(function (e) { //#A_ID is an example. Use the id of your Anchor
                $('html, body').animate({
                    scrollTop: $('#top').offset().top - 10 //#DIV_ID is an example. Use the id of your destination on the page
                }, 'slow');
            });
        }

        }


        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }
          








    

    

   



   
  


   






































