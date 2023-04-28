$(document).ready(function(){
	$("#create-account-button").on("click", function(e){
        e.preventDefault()
	    console.log("i am working");
        let username = $("[name=username-input-field]").val()
        let password = $("[name=password-input-field]").val()
        console.log(username);
        console.log(password);
        let data = {
            username: username,
            password: password
        }
        $.ajax({
            url: "http://127.0.0.1:5000/api/create-account",
            method: "POST",
            data: data,
            success: function(response) {
              console.log(response);
              window.location.href = "/"
            //   alert("Your account has been created!")
            },
            error: function(xhr, status, error) {
              alert("Error: username may already exist!")
              console.log(error);
            }
          });
	});
  $("#go-back-button").on("click", function(e){
    e.preventDefault()
    console.log("i am working");
    window.location.href = "/purgatory"
  });
});