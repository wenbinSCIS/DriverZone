  
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
              var rating=input[ele].rating
              rating=rating.toFixed(1);
              
         
              var image="../images/"+name+".jpg";
              var description=input[ele].description;
        
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
                                  <td>$${price}/h</td>
                              </tr>
                              <tr>
                                  <td>Weekday (Non-peak)</td>
                                  <td>$${price+10}/h</td>
                              </tr>
                              <tr>
                                  <td>Weekend/Public Holiday</td>
                                  <td>$${price+20}/h</td>
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
                                  <strong>${rating}</strong>
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
                      <div id="review-box">

              
                      </div>
                  <!-- End review-container -->
                  <hr>
                <div class="text-end"><a href="submit-review.html?id=${name}" class="btn_1" >Submit review</a></div>
              </div>
          </div>

              `
              processReview(input[ele].review);
          }

          }
		  document.getElementById("reference").href="booking.html?id="+name
   
      }

      function processReview(input) {
          console.log(input);
          for (let eachReview in input) {
              console.log(input[eachReview]);
              document.getElementById("review-box").innerHTML+=`
              <div class="review-box clearfix">
              <figure class="rev-thumb"><img src="http://via.placeholder.com/150x150.jpg" alt="">
              </figure>
              <div class="rev-content">
                  <div class="rating">
                      <i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i>
                  </div>
                  <div class="rev-info">
                      ${input[eachReview].name}
                  </div>
                  <div class="rev-text">
                      <p>
                          ${input[eachReview].description};
                      </p>
                  </div>
              </div>
          </div>
          `
          }
      }
	

  
     
  
  
