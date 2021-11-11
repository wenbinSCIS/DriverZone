  
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
              var name=input[ele].name;
              var lang=input[ele].language
              var price=input[ele].price
              var location=input[ele].location
              var oneStar=Number(input[ele].rating[1])
              var twoStar=Number(input[ele].rating[2])
              var threeStar=Number(input[ele].rating[3])
              var fourStar=Number(input[ele].rating[4])
              var fiveStar=Number(input[ele].rating[5]);
              var TotalRating=oneStar+twoStar+threeStar+fourStar+fiveStar;
              var oneStar=oneStar/TotalRating*100;
              var twoStar=twoStar/TotalRating*100
              var threeStar=threeStar/TotalRating*100
              var fourStar=fourStar/TotalRating*100
              var fiveStar=fiveStar/TotalRating*100
              var rating=Number(input[ele].rating.total)
            
              rating=rating.toFixed(1);
              var totalNumOfRating=Object.keys(input[ele].review).length;
              
         
              var image="../images/"+name+".jpg";
              var description=input[ele].description;
        
              const name_capitalize = name.charAt(0).toUpperCase() + name.slice(1);
              document.getElementById("body").innerHTML=`<div id="section_1">
              <div class="box_general_3">
                  <div class="profile">
                      <div class="row">
                          <div class="col-lg-5 col-md-4">
                              <figure>
                                  <img src="${image}" alt="" class="" style="max-width:100%; max-height:400px";>
                              </figure>
                          </div>
                          <div class="col-lg-7 col-md-8">
                              <h1 style="font-size:30px">${name_capitalize}</h1>
                              <span class="rating" style="font-size:28px;">
                                  ${star_display(Math.floor(Number(rating)))}
                                  <small>(${totalNumOfRating})</small>                
                              </span>
                              <ul class="contacts">
                                
                                  <li>
                                  <i class='icon_phone' style='font-size:20px;color:black'></i> <span style="font-size:20px">96956594</span> </li>
                                  <li>
                                  <i class='icon_pin_alt' style='font-size:20px;color:black'></i>
                                  <span style="font-size:20px">    ${capitalizeFirstLetter(location)}</span>
                                  </li>
                                  <i class=' icon_chat_alt' style='font-size:20px;color:black'></i>
                                  <span style="font-size:20px">    ${lang.join("/").slice(1)}</span>
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
                      <p style="font-size:18px">${description}</p>
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
                                  ${star_display(rating)}
                                  </div>
                                  <medium>Based on ${totalNumOfRating} reviews</medium>
                              </div>
                          </div>
                          <div class="col-lg-9">
                              <div class="row">
                                  <div class="col-lg-10 col-9">
                                      <div class="progress">
                                          <div class="progress-bar" role="progressbar" style="width: ${fiveStar}%" ></div>
                                      </div>
                                  </div>
                                  <div class="col-lg-2 col-3"><medium>5 stars</medium></div>
                              </div>
                              <!-- /row -->
                              <div class="row">
                                  <div class="col-lg-10 col-9">
                                      <div class="progress">
                                          <div class="progress-bar" role="progressbar" style="width: ${fourStar}%"></div>
                                      </div>
                                  </div>
                                  <div class="col-lg-2 col-3"><medium>4 stars</medium></div>
                              </div>
                              <!-- /row -->
                              <div class="row">
                                  <div class="col-lg-10 col-9">
                                      <div class="progress">
                                          <div class="progress-bar" role="progressbar" style="width: ${threeStar}%"></div>
                                      </div>
                                  </div>
                                  <div class="col-lg-2 col-3"><medium>3 stars</medium></div>
                              </div>
                              <!-- /row -->
                              <div class="row">
                                  <div class="col-lg-10 col-9">
                                      <div class="progress">
                                          <div class="progress-bar" role="progressbar" style="width: ${twoStar}%" ></div>
                                      </div>
                                  </div>
                                  <div class="col-lg-2 col-3"><medium>2 stars</medium></div>
                              </div>
                              <!-- /row -->
                              <div class="row">
                                  <div class="col-lg-10 col-9">
                                      <div class="progress">
                                          <div class="progress-bar" role="progressbar" style="width: ${oneStar}%" ></div>
                                      </div>
                                  </div>
                                  <div class="col-lg-2 col-3"><medium>1 stars</medium></div>
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
     
          for (let eachReview in input) {
              document.getElementById("review-box").innerHTML+=`
              <div class="review-box clearfix">
              <figure class="rev-thumb"><img src="../images/noProfile.jpg" >
              </figure>
              <div class="rev-content">
                  <div class="rating" id="rating-display">
                    ${star_display(input[eachReview].rating)}                
                  </div>
                  <div class="rev-info">
                      ${input[eachReview].name}
                  </div>
                  <div class="" style="font-size:18px">
                      <p>
                          ${input[eachReview].description}
                      </p>
                  </div>
              </div>
          </div>
          `
          }
      }

      function star_display(input) {
        var new1="";
        input=Number(input);
          for (let index = 0; index < input; index++) {
            new1+="<i class='icon_star voted' style='font-size:18px'></i>"
              
          };
          let remaining=5-input;
          for (let index = 0; index < remaining; index++) {
            new1+="<i class='icon_star' style='font-size:18px'></i>"
  
            
          }
          return new1
      
      }

      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      

    

	

  
     
  
  
