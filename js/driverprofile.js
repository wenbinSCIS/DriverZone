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
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')

     

    
    function display(input) {
        var body=document.getElementById("body");
        var arr=[];
        for (let ele in input) {
            if (ele==id) {
            var name=ele;
            var lang=input[ele].language
            var price=input[ele].price
            var location=input[ele].location
            console.log(price)
            var image="../images/"+name+".jpg";
            var description=input[ele].description;
            console.log(description);
            var tr=document.createElement("tr");
            tr.appendChild(createNode(name));
            tr.appendChild(createNode(lang));
            tr.appendChild(createNode(price));
            tr.appendChild(ImgNode(name));
            arr.push(tr);
   
            let a=appendBody(tr);
            ;
            document.getElementById("body").innerHTML=`<div class="container">
			<div class="row">
				<div class="col-sm-10 col-md-8 col-lg-9 m-lr-auto p-b-50">
					<div class="p-r-20 p-r-0-md">
						<div class="bo2">
							<div class="wrap-pic-w bo2-b">
								<img src="${image}" alt="IMG-COURSE">
							</div>

							<div class="p-l-38 p-r-38 p-t-30 p-b-18 p-lr-15-sm">
								<!--  -->
								<div class="flex-sb-m p-b-12">
								
									<span class="color1 fs-12">
										<i class="fa fa-star" aria-hidden="true"></i>
										<i class="fa fa-star" aria-hidden="true"></i>
										<i class="fa fa-star" aria-hidden="true"></i>
										<i class="fa fa-star" aria-hidden="true"></i>
										<i class="fa fa-star" aria-hidden="true"></i>
									</span>
								</div>
								
								<!--  -->
								<h4 class="m-txt25 p-b-22">
									${name}
								</h4>
								
								<!--  -->
								<div class="p-b-5">
									<span class="s-txt25">
										Language 
									</span>

									<span class="s-txt2">
										${lang}
									</span>
								</div>

								<div class="p-b-28">
									<span class="s-txt25">
										Locations:
									</span>

									<span class="s-txt2">
										${location}
									</span>
								</div>
								
								<!--  -->
								<p class="s-txt2 p-b-24">
									${description}
								</p>
			
								<ul class="list-01 p-b-32">
									<li class="p-b-6">	
										<span class="s-txt2">
											Pulling out and returning to the side of the road
										</span>
									</li>

									<li class="p-b-6">
										<span class="s-txt2">
											Driving on the road
										</span>
									</li>

									<li class="p-b-6">
										<span class="s-txt2">
											Knowing your blind spots
										</span>
									</li>

									<li class="p-b-6">
										<span class="s-txt2">
											Scanning for hazards
										</span>
									</li>

									<li class="p-b-6">
										<span class="s-txt2">
											Stalling the car (manual)
										</span>
									</li>

									<li class="p-b-6">
										<span class="s-txt2">
											Railway crossings
										</span>
									</li>

									<li class="p-b-6">
										<span class="s-txt2">
											Crossing a level crossing
										</span>
									</li>
								</ul>	
								
								<!--  -->
								<div class="m-txt26 p-b-5">
									$${price}
								</div>
								
								<!--  -->
								<div class="flex-w flex-sb-m">
									<div class="flex-w p-t-10 p-b-10 p-r-30">
										<div class="m-r-8 m-t-4 m-b-4">
											<!-- Button -->
											<a href="#" class="btn-drive m-txt1 size3 bg-main hov-color-white bo-rad-4">
												Book now
											</a>
										</div>

								
									</div>

									
								</div>

							</div>
						</div>
					</div>	
				</div>

	

				
				</div>
			</div>
		</div>
            `
        }
        }
 
    }

    function createNode(input) {
        var td=document.createElement("td");
        var name_txt=document.createTextNode(input);
        td.appendChild(name_txt)
        return td;
    }

    function ImgNode(name) {
        var image="./images/"+name+".jpg";
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