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

    // const db= getDatabase();
    // const dbref= ref(db);   

    //testing
    const db = getDatabase(app)
    console.log(db);
    const dbRef = ref(db)
    console.log(dbRef);
    const usersSnapshot = await get(query(dbRef))
    var instructor_obj=usersSnapshot.val().instructor;
    var input=display(instructor_obj);


    // var a;
    // get(child(dbref,"instructor")).then((snapshot)=>{
    //     if (snapshot.exists()) {
    //         a= display(snapshot.val());
    //         test(a);     
    //     } 
    // });

    function resourceTemplate(resource) {
        return `
        <div class="block-3 bo2 flex-w">
        <div class="wrap-pic-b3 wrap-pic-w hov5 bo2-r w-size6 respon2">
            <a href="course-detail.html?id=${resource.name}"><img src="../images/${resource.name}.JPG" alt="IMG-COURSE" height:50px></a>
        </div>

        <div class="wrap-text-b3 w-size7 p-l-35 p-r-27 p-t-26 p-b-25 w-full-md">
            <div class="flex-sb-m p-b-12">
                
                <span class="color1 fs-12">
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
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

            <span class="m-txt9">$${resource.price}</span>
            
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
    function display(input) {
        arr=[];
        for (let ele in input) {
            arr.push(input[ele]);
        }
        
        return project(arr)

    }


    function project(input) {
        console.log(input)
        document.getElementById("here").innerHTML=input
        .splice(0, 3) 
        .map(resourceTemplate)
        .join('');

        for (let i = 0; i <input.length; i += 2) {
            input = input.slice(i, i + 2);
  
            }

        return input;
        
    }


    function tried(a) {
        console.log(23808);
        // display(a);
    }

    //buttons

    length=Math.ceil((Object.keys(instructor_obj).length)/3);
    console.log(length)

    for (let index = 0; index<length; index++) {
        document.getElementById("buttons").innerHTML+=`
        <a href="#1" class="flex-c-m s-txt24 size14 bgwhite bo6 bo-rad-3 hov3 trans-03 m-r-12 m-t-5 m-b-5 act-pagi" id="1">
        ${index+1}
        </a>
        `;
        
    }
    document.getElementById("buttons").innerHTML+=`	<button type="button" class="btn btn-light" id="hello">Next</button> `
    

    document.getElementById("hello").addEventListener("click", ()=>display(input));







    

    

   



   
  


   









































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