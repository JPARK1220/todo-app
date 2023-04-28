$(document).ready(function(){
    $("#login-button").on("click", function(e){
        e.preventDefault()
        console.log("login works")
        window.location.href = "/login"
    });
	$("#create-account-button").on("click", function(e){
        e.preventDefault()
        console.log("create button works")
        window.location.href = "/create-account"
    });
});