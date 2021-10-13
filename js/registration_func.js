jQuery(function($) {
    "use strict";
    // Chose here which method to send the email, available:
    // Phpmaimer text/html > phpmailer/registration_phpmailer.php
    // Phpmaimer text/html SMPT > phpmailer/registration_phpmailer_smpt.php
    // PHPmailer with html template > phpmailer/registration_phpmailer_template.php
    // PHPmailer with html template SMTP> phpmailer/registration_phpmailer_template_smtp.php
    // Submit loader mask
    $('form').attr('action', 'phpmailer/registration_phpmailer_template_smtp.php');
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
        var form = $("form");
        form.validate();
        if (form.valid()) {
            $("#loader_form").fadeIn();
        }
    });
});