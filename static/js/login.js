$(document).ready(function(){
	$("#login-button").on("click", function(e){
        e.preventDefault()
        console.log("i am working");
        let loginfailure = false;
        let username = $("[name=username-input-field]").val()
        let password = $("[name=password-input-field]").val()
        console.log(username);
        console.log(password);
        let data = {
            username: username,
            password: password
        }
        $.ajax({
            url: "http://127.0.0.1:5000/api/login",
            method: "POST",
            data: data,
            success: function(response) {
                console.log(response);
                if (response == 'success') {
                    window.location.href = "/"
                } else {
                    loginfailure = true
                }
            },
            error: function(xhr, status, error) {
              console.log(error);
            }
          });
        if (loginfailure) {
          alert("Login failed, please make sure you have typed in the correct username and password")
        }
	});
  $("#go-back-button").on("click", function(e){
    e.preventDefault()
    console.log("i am working");
    window.location.href = "/purgatory"
  });
});