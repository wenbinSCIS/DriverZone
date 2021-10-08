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
        for (let ele in input) {
            console.log(ele)
            var name=ele;
            var lang=input[ele].language
            var price=input[ele].price
            console.log(price)
            var image="../images/"+name+".jpg";
            console.log(image)
            var tr=document.createElement("tr");
            tr.appendChild(createNode(name));
            tr.appendChild(createNode(lang));
            tr.appendChild(createNode(price));
            tr.appendChild(ImgNode(name));
            arr.push(tr);
            console.log(tr)
            let a=appendBody(tr);
            ;
        }
    }

    function createNode(input) {
        var td=document.createElement("td");
        var name_txt=document.createTextNode(input);
        td.appendChild(name_txt)
        return td;
    }

    function ImgNode(name) {
        var image="../images/"+name+".jpg";
        var td=document.createElement("td");
        var img_node=document.createElement("img");
        img_node.src=image;
        img_node.style.width="100px";
        img_node.style.height="100px";
        td.appendChild(img_node);
        return td;
    }

    function appendBody(input) {
        console.log(input)
        var body=document.getElementById("body");
        body.appendChild(input)
    }