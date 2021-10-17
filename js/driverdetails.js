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
    console.log(holder)



    function resourceTemplate(resource) {
        return `
        <div class="block-3 bo2 flex-w">
        <div class="wrap-pic-b3 wrap-pic-w hov5 bo2-r w-size6 respon2">
            <a href="course-detail.html?id=${resource.name}"><img src="../images/${resource.name}.JPG" alt="IMG-COURSE"></a>
        </div>

        <div class="wrap-text-b3 w-size7 p-l-35 p-r-27 p-t-26 p-b-25 w-full-md">
            <div class="flex-sb-m p-b-12">
                
                <span class="color1 fs-12">
                    <i class='icon_star-empty'></i>
                    ${star_display(resource.rating.total)}
                
                </span>
            </div>

            <h4 class="p-b-15">
                <a href="course-detail.html" class="m-txt8 hov-color-main trans-04">
                    ${resource.name}
                </a>
            </h4>
            
            <p class="s-txt2 h-size4 of-hidden m-b-2 respon3">
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
    
    
      console.log(document.getElementById("reference"))


    var arr;
    var copy;
    function display(input) {
        arr=[];
        for (let ele in input) {
            arr.push(input[ele]);
        }
        console.log(arr)
        return project(arr,0)

    }
    function project(holder,num) {
        console.log(num);
        if (num>0) {
            num=num+(num)*3-1
            console.log(num);
        }
        let copy=holder.slice(num,num+3);
        console.log(copy);
        document.getElementById("here").innerHTML=copy
        .map(resourceTemplate)
        .join('');  
         
    }


    //buttons

    length=Math.ceil((Object.keys(instructor_obj).length)/3);
    console.log(length)

    for (let index = 0; index<length; index++) {
        document.getElementById("buttons").innerHTML+=`
        <button type="button" class="btn btn-dark" id=${index} >${index+1}</button>
        `;
        // document.getElementById(str).addEventListener("click", ()=>project(holder,index));
        
    }
    


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
        for (let index = 0; index < input; index++) {
          new1+="<i class='icon_star voted'></i>"
            
        };
        let remaining=5-input;
        for (let index = 0; index < remaining; index++) {
          new1+="<i class='icon_star' style='color:#DCDCDC'></i>"

          
        }
        return new1
    
    }
  







    

    

   



   
  


   









































    // document.getElementById("next").addEventListener("click",project);


    // function add() {

      
    //   var name= document.getElementById("name");
    //   var submit=document.getElementById("submit");
        
    //     set(ref(db, name.value),{
    //         Name: name.value
    //     }      
        
    //     )
    //     .then(()=>{
    //         alert("data stored successfully");
            
    //     })
    //     .catch((error)=>{
    //         alert("data not stored successfully");
            
    //     })
    // }

  
        // var name= document.getElementById("name");
        // var submit=document.getElementById("submit");