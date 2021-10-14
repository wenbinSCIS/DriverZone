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

    import {getDatabase, ref, set, child, get,update, remove} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js" 

    const db= getDatabase();


    const dbref= ref(db);

    get(child(dbref,"instructor")).then((snapshot)=>{
        if (snapshot.exists()) {
            return display(snapshot.val());
        }
        else {
            alert("No data found")
        }
    })

    function resourceTemplate(resource) {
        return `
          <div>
            <h2>${resource.title}</h2>
            <p>${resource.description}</p>
          </div>
        `;
      }
    function display(input) {
        var body=document.getElementById("body");
        var arr=[];
        console.log(input);
        for (let ele in input) {
            console.log(input[ele])
            var name=ele;
            var lang=input[ele].language
            var price=input[ele].price
            console.log(price)
            var image="../images/"+name+".JPG";
            var description=input[ele].description;
            document.getElementById("here").innerHTML+=

            document.getElementById("here").innerHTML+=`<div class="block-3 bo2 flex-w">
            <div class="wrap-pic-b3 wrap-pic-w hov5 bo2-r w-size6 respon2">
                <a href="course-detail.html?id=${name}"><img src="${image}" alt="IMG-COURSE" height:50px></a>
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
                        ${ele}
                    </a>
                </h4>
                
                <p class="s-txt2 h-size4 of-hidden m-b-2 respon3">
                    ${description}
                </p>
    
                <span class="m-txt9">$${price}</span>
                
                <div class="wrap-btn-b3 flex-w p-t-13">
                    <div class="m-r-8 p-t-8">
                        <!-- Button -->
                        <a href="booking.html?id=${name}" class="btn-drive m-txt1 size3 bg-main hov-color-white bo-rad-4">
                            Book now
                        </a>
                    </div>
    
                    <div class="p-t-8">
                        <!-- Button -->
                        <a href="course-detail.html?id=${name}" class="btn-drive m-txt10 size4 bo3 bg1 hov-color-white bo-rad-4">
                            Detail
                        </a>
                    </div>
                </div>
    
            </div>
            
        </div>
            `
        }
 

        

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
    }