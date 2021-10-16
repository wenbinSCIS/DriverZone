  
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
         
              var image="../images/"+name+".jpg";
              var description=input[ele].description;
        
              var tr=document.createElement("tr");
              tr.appendChild(createNode(name));
              tr.appendChild(createNode(lang));
              tr.appendChild(createNode(price));
              tr.appendChild(ImgNode(name));
              arr.push(tr);
     
              let a=appendBody(tr);
              ;
              const name_capitalize = name.charAt(0).toUpperCase() + name.slice(1);
              document.getElementById("body").innerHTML=`<div id="section_1">
              <div class="box_general_3">
                  <div class="profile">
                      <div class="row">
                          <div class="col-lg-5 col-md-4">
                              <figure>
                                  <img src="${image}" alt="" class="img-fluid">
                              </figure>
                          </div>
                          <div class="col-lg-7 col-md-8">
                              <h1>${name_capitalize}</h1>
                              <span class="rating">
                                  <i class="icon_star voted"></i>
                                  <i class="icon_star voted"></i>
                                  <i class="icon_star voted"></i>
                                  <i class="icon_star voted"></i>
                                  <i class="icon_star"></i>
                                  <small>(145)</small>
                                  <a href="badges.html" data-bs-toggle="tooltip" data-bs-placement="top" title="Badge Level" class="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt=""></a>
                              </span>
                              <ul class="statistic">
                                  <li>854 Views</li>
                                  <li>124 Patients</li>
                              </ul>
                              <ul class="contacts">
                                  <li>
                                      <h6>Address</h6>
                                      2726 Shinn Street, New York -
                                      <a href="https://www.google.com/maps/dir//Assistance+%E2%80%93+H%C3%B4pitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x0:0xa6a9af76b1e2d899!2sAssistance+%E2%80%93+H%C3%B4pitaux+De+Paris!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361" target="_blank"> <strong>View on map</strong></a>
                                  </li>
                                  <li>
                                      <h6>Phone</h6> <a href="tel://000434323342">+00043 4323342</a></li>
                                  <li>
                                      <h6>Location</h6>
                                      ${location}

                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  
                  <hr>
                  
                  <!-- /profile -->
                  <div class="indent_title_in">
                      <i class="pe-7s-user"></i>
                      <h3>Professional statement</h3>
                  </div>
                  <div class="wrapper_indent">
                      <p>${description}</p>
                      <!-- /row-->
                  </div>
                  <!-- /wrapper indent -->

                  <hr>

                  <div class="indent_title_in">
                      <i class="pe-7s-cash"></i>
                      <h3>Prices &amp; Payments</h3>
                  </div>
                  <div class="wrapper_indent">
                      <div class="table-responsive">
                      <table class="table table-striped">
                          <thead>
                              <tr>
                                  <th>Timing</th>
                                  <th>Price</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>Weekday (Peak)</td>
                                  <td>$34</td>
                              </tr>
                              <tr>
                                  <td>Weekday (Non-peak)</td>
                                  <td>$60</td>
                              </tr>
                              <tr>
                                  <td>Weekend/Public Holiday</td>
                                  <td>$40</td>
                              </tr>
                          </tbody>
                      </table>
                      </div>
                  </div>
                  <!--  /wrapper_indent -->
              </div>
              <!-- /section_1 -->
          </div>
          <!-- /box_general -->

          <div id="section_2">
              <div class="box_general_3">
                  <div class="reviews-container">
                      <div class="row">
                          <div class="col-lg-3">
                              <div id="review_summary">
                                  <strong>4.7</strong>
                                  <div class="rating">
                                      <i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i>
                                  </div>
                                  <small>Based on 4 reviews</small>
                              </div>
                          </div>
                          <div class="col-lg-9">
                              <div class="row">
                                  <div class="col-lg-10 col-9">
                                      <div class="progress">
                                          <div class="progress-bar" role="progressbar" style="width: 90%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                      </div>
                                  </div>
                                  <div class="col-lg-2 col-3"><small><strong>5 stars</strong></small></div>
                              </div>
                              <!-- /row -->
                              <div class="row">
                                  <div class="col-lg-10 col-9">
                                      <div class="progress">
                                          <div class="progress-bar" role="progressbar" style="width: 95%" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                      </div>
                                  </div>
                                  <div class="col-lg-2 col-3"><small><strong>4 stars</strong></small></div>
                              </div>
                              <!-- /row -->
                              <div class="row">
                                  <div class="col-lg-10 col-9">
                                      <div class="progress">
                                          <div class="progress-bar" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                      </div>
                                  </div>
                                  <div class="col-lg-2 col-3"><small><strong>3 stars</strong></small></div>
                              </div>
                              <!-- /row -->
                              <div class="row">
                                  <div class="col-lg-10 col-9">
                                      <div class="progress">
                                          <div class="progress-bar" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                      </div>
                                  </div>
                                  <div class="col-lg-2 col-3"><small><strong>2 stars</strong></small></div>
                              </div>
                              <!-- /row -->
                              <div class="row">
                                  <div class="col-lg-10 col-9">
                                      <div class="progress">
                                          <div class="progress-bar" role="progressbar" style="width: 0" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                      </div>
                                  </div>
                                  <div class="col-lg-2 col-3"><small><strong>1 stars</strong></small></div>
                              </div>
                              <!-- /row -->
                          </div>
                      </div>
                      <!-- /row -->

                      <hr>

                      <div class="review-box clearfix">
                          <figure class="rev-thumb"><img src="http://via.placeholder.com/150x150.jpg" alt="">
                          </figure>
                          <div class="rev-content">
                              <div class="rating">
                                  <i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i>
                              </div>
                              <div class="rev-info">
                                  Admin – April 03, 2016:
                              </div>
                              <div class="rev-text">
                                  <p>
                                      Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                                  </p>
                              </div>
                          </div>
                      </div>
                      <!-- End review-box -->

                      <div class="review-box clearfix">
                          <figure class="rev-thumb"><img src="http://via.placeholder.com/150x150.jpg" alt="">
                          </figure>
                          <div class="rev-content">
                              <div class="rating">
                                  <i class="icon-star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i>
                              </div>
                              <div class="rev-info">
                                  Ahsan – April 01, 2016
                              </div>
                              <div class="rev-text">
                                  <p>
                                      Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                                  </p>
                              </div>
                          </div>
                      </div>
                      <!-- End review-box -->

                      <div class="review-box clearfix">
                          <figure class="rev-thumb"><img src="http://via.placeholder.com/150x150.jpg" alt="">
                          </figure>
                          <div class="rev-content">
                              <div class="rating">
                                  <i class="icon-star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i>
                              </div>
                              <div class="rev-info">
                                  Sara – March 31, 2016
                              </div>
                              <div class="rev-text">
                                  <p>
                                      Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                                  </p>
                              </div>
                          </div>
                      </div>
                      <!-- End review-box -->
                  </div>
                  <!-- End review-container -->
                  <hr>
                <div class="text-end"><a href="submit-review.html" class="btn_1">Submit review</a></div>
              </div>
          </div>

              `
          }

          }
		  document.getElementById("reference").href="booking.html?id="+name
   
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // // Import the functions you need from the SDKs you need
    // import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
    // // TODO: Add SDKs for Firebase products that you want to use
    // // https://firebase.google.com/docs/web/setup#available-libraries
  
    // // Your web app's Firebase configuration
    // const firebaseConfig = {
    //   apiKey: "AIzaSyDruPuuruiIkp6rGikLAUixFbT5-RFRm0s",
    //   authDomain: "wad2-e8948.firebaseapp.com",
    //   databaseURL: "https://wad2-e8948-default-rtdb.asia-southeast1.firebasedatabase.app",
    //   projectId: "wad2-e8948",
    //   storageBucket: "wad2-e8948.appspot.com",
    //   messagingSenderId: "905590919273",
    //   appId: "1:905590919273:web:5d6c7e3da73fbdb9cdd2f8"
    // };
  
    // // Initialize Firebase
    // const app = initializeApp(firebaseConfig);

    // import {getDatabase, ref, set, child, get,update, remove} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js" 

    // const db= getDatabase();


    // const dbref= ref(db);

    // get(child(dbref,"instructor")).then((snapshot)=>{
    //     if (snapshot.exists()) {
    //         return display(snapshot.val());
    //     }
    //     else {
    //         alert("No data found")
    //     }
    // })

    // function resourceTemplate(resource) {
    //     return `
    //       <div>
    //         <h2>${resource.title}</h2>
    //         <p>${resource.description}</p>
    //       </div>
    //     `;
    //   }
    // function display(input) {
    //     var body=document.getElementById("body");
    //     var arr=[];
    //     console.log(input);
    //     for (let ele in input) {
    //         console.log(input[ele])
    //         var name=ele;
    //         var lang=input[ele].language
    //         var price=input[ele].price
    //         console.log(price)
    //         var image="../images/"+name+".JPG";
    //         var description=input[ele].description;
    //         document.getElementById("here").innerHTML+=

    //         document.getElementById("here").innerHTML+=`<div class="block-3 bo2 flex-w">
    //         <div class="wrap-pic-b3 wrap-pic-w hov5 bo2-r w-size6 respon2">
    //             <a href="course-detail.html?id=${name}"><img src="${image}" alt="IMG-COURSE" height:50px></a>
    //         </div>
    
    //         <div class="wrap-text-b3 w-size7 p-l-35 p-r-27 p-t-26 p-b-25 w-full-md">
    //             <div class="flex-sb-m p-b-12">
                    
    //                 <span class="color1 fs-12">
    //                     <i class="fa fa-star" aria-hidden="true"></i>
    //                     <i class="fa fa-star" aria-hidden="true"></i>
    //                     <i class="fa fa-star" aria-hidden="true"></i>
    //                     <i class="fa fa-star" aria-hidden="true"></i>
    //                     <i class="fa fa-star" aria-hidden="true"></i>
    //                 </span>
    //             </div>
    
    //             <h4 class="p-b-15">
    //                 <a href="course-detail.html" class="m-txt8 hov-color-main trans-04">
    //                     ${ele}
    //                 </a>
    //             </h4>
                
    //             <p class="s-txt2 h-size4 of-hidden m-b-2 respon3">
    //                 ${description}
    //             </p>
    
    //             <span class="m-txt9">$${price}</span>
                
    //             <div class="wrap-btn-b3 flex-w p-t-13">
    //                 <div class="m-r-8 p-t-8">
    //                     <!-- Button -->
    //                     <a href="booking.html?id=${name}" class="btn-drive m-txt1 size3 bg-main hov-color-white bo-rad-4">
    //                         Book now
    //                     </a>
    //                 </div>
    
    //                 <div class="p-t-8">
    //                     <!-- Button -->
    //                     <a href="course-detail.html?id=${name}" class="btn-drive m-txt10 size4 bo3 bg1 hov-color-white bo-rad-4">
    //                         Detail
    //                     </a>
    //                 </div>
    //             </div>
    
    //         </div>
            
    //     </div>
    //         `
    //     }

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
    // }