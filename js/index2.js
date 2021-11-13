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

        const dbref= ref(db);

        get(child(dbref,"instructor")).then((snapshot)=>{
            if (snapshot.exists()) {
               
                return display(snapshot.val());
            }
            else {
                alert("No data found")
            }
        })
        // .catch((error)=>{
        //     alert("unsucessful"+error);
        // })
     

    
    function display(input) {
        var body=document.getElementById("body");
        var arr=[];
        var count=0;
        for (let ele in input) {
        
            var name=input[ele].name;
            var lang=input[ele].language
            var location=input[ele].location
            var price=input[ele].price
            var rating=input[ele].rating.total;
       
            var image="../images/"+name+".jpg";
            var description=input[ele].description;
           
            // var tr=document.createElement("tr");
            // tr.appendChild(createNode(name));
            // tr.appendChild(createNode(lang));
            // tr.appendChild(createNode(price));
            // tr.appendChild(ImgNode(name));
            // arr.push(tr);
   
            // let a=appendBody(tr);
            count++;

          
            
            if (count<5) {
            document.getElementById("here").innerHTML+=`<div class="col-sm-6 col-lg-3 p-t-30">
            <!-- Block 3 -->
            <div class="block-3 bo2">
                <div class="wrap-pic-b3 wrap-pic-w hov5 bo2-b">
                    <a href="course-detail.html?id=${name}"><img src="${image}" width="240px" height="276px" alt="IMG-COURSE"></a>
                </div>

                <div class="wrap-text-b3 p-l-20 p-r-20 p-t-16 p-b-26">
                    <div class="flex-sb-m p-b-12">
                        <span class="s-txt5" style=text-transform:capitalize;font-size:20px>
                            ${name}
                        </span>
                        <span class="color1 fs-12">
                            ${star_display(rating)}
                        </span>
                    </div>

                    <a href="course-detail.html"><h4 class="m-txt8 hov-color-main trans-04 p-b-12">
                        ${capitalizeFirstLetter(location)}
                    </h4></a>
                    <span class="m-txt9">$${price}/h</span>
                    
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
        </div>	


  
            `
        }
    }
    function star_display(input) {
        input=Math.floor(input);
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
  
 
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      