jQuery(function($) {
    "use strict";
  
    $('form').attr('action', 'login.html');
    // Validate
    $('form').validate({
        ignore: [],
        rules: {
            website: {
                maxlength: 0
            },
            password1: {
                required: true,
                minlength: 5
            },
            password2: {
                required: true,
                minlength: 5,
                equalTo: "#password1"
            }
        }
    });
    $('form').on('submit', function() {
       
        form.validate();
        if (form.valid()) {
            alert("hi");
            $("#loader_form").fadeIn();
        }
      
    });
});