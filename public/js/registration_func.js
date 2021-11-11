jQuery(function($) {
    "use strict";
    alert("here1");
    $('form').attr('action', 'login.html');
    // Validate
    alert("here2");
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
    $('form').on('submit', function(event) {
        
        form.validate();
        if (form.valid()) {
            alert("here");
            $("#loader_form").fadeIn();
        }
      
    });
});