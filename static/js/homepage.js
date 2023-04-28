$(document).ready(function(){
	$("body").on("click", "#complete-button", function(e){
        e.preventDefault()
	    console.log("i am working");
		let cardBody = $(this).closest(".card-body");
		let taskId = cardBody.find(".card-id-input").data('id');
		console.log(taskId)

		data = {
			id: taskId
		}
        $.ajax({
            url: "http://127.0.0.1:5000/api/complete-todo",
            method: "POST",
			data: data,
            success: function(response) {
				console.log(response);
				window.location.reload()
            //   alert("Your account has been created!")
            },
            error: function(xhr, status, error) {
              console.log(error);
            }
          });
	});
	$("body").on("click", "#edit-todo-button", function(){
	    console.log("i am working");

		let cardBody = $(this).closest(".card-body");
		let title = cardBody.find(".card-title");
		let hiddenTitleInput = cardBody.find("[name=hidden-title-input]");
		hiddenTitleInput.attr("type", "text");
		title.hide();

		let description = cardBody.find(".card-description");
		let hiddenDescriptionInput = cardBody.find("[name=hidden-description-input]");
		hiddenDescriptionInput.attr("type", "text");
		description.hide();

		let dueDate = cardBody.find(".card-due-date");
		let hiddenDueDate = cardBody.find("[name=hidden-due-date-input]");
		hiddenDueDate.attr("type", "date");
		dueDate.hide();

		let confirmButton = cardBody.find("#confirm-edit-button");
		confirmButton.attr('style', 'display: block')

		let editButton = cardBody.find("#edit-todo-button");
		editButton.attr('style', 'display: none')
	});
	$("body").on("click", "#confirm-edit-button", function(){
		console.log("i am working");

		let cardBody = $(this).closest(".card-body");
		let taskId = cardBody.find(".card-id-input").data('id');
		console.log(taskId)

		let title = cardBody.find(".card-title");
		let hiddenTitleInput = cardBody.find("[name=hidden-title-input]");
		let newTitle = hiddenTitleInput.val()
		console.log(newTitle)
		hiddenTitleInput.val("")
		hiddenTitleInput.attr("type", "hidden");
		title.show();

		let description = cardBody.find(".card-description");
		let hiddenDescriptionInput = cardBody.find("[name=hidden-description-input]");
		let newDescription = hiddenDescriptionInput.val()
		console.log(newDescription)
		hiddenDescriptionInput.val("")
		hiddenDescriptionInput.attr("type", "hidden");
		description.show();

		let dueDate = cardBody.find(".card-due-date");
		let hiddenDueDate = cardBody.find("[name=hidden-due-date-input]");
		let newDueDate = hiddenDueDate.val()
		console.log(newDueDate)
		hiddenDueDate.val("")
		hiddenDueDate.attr("type", "hidden");
		dueDate.show();

		let confirmButton = cardBody.find("#confirm-edit-button");
		confirmButton.attr('style', 'display: none')

		let editButton = cardBody.find("#edit-todo-button");
		editButton.attr('style', 'display: block')

		let data = {
			id: taskId,
			title: newTitle,
			description: newDescription,
			due_date: newDueDate,
        }
        $.ajax({
            url: "http://127.0.0.1:5000/api/edit-todo",
            method: "POST",
            data: data,
            success: function(response) {
              console.log(response);
              window.location.reload()
            },
            error: function(xhr, status, error) {
              console.log(error);
			  alert("Please make sure all input fields are valid!")
            }
          });
	});
	$("body").on("click", "#delete-todo-button", function(){
		console.log("i am working");

		let cardBody = $(this).closest(".card-body");
		let taskId = cardBody.find(".card-id-input").data('id');
		console.log(taskId)

		let data = {
			id: taskId,
        }
        $.ajax({
            url: "http://127.0.0.1:5000/api/delete-todo",
            method: "POST",
            data: data,
            success: function(response) {
              console.log(response);
              window.location.reload()
            },
            error: function(xhr, status, error) {
              console.log(error);
            }
        });
	});
	$("#add-todo-button").on("click", function(e){
        e.preventDefault()
	    console.log("i am working");
        let title = $("[name=add-title-input]").val()
        let description = $("[name=add-description-input]").val()
		let due_date = $("[name=add-due-date-input]").val()
        console.log(title);
        console.log(description);
		console.log(due_date);
        let data = {
            title: title,
            description: description,
			due_date: due_date,
        }
        $.ajax({
            url: "http://127.0.0.1:5000/api/add-todo",
            method: "POST",
            data: data,
            success: function(response) {
				console.log(response);
				window.location.reload()
            //   alert("Your account has been created!")
            },
            error: function(xhr, status, error) {
              console.log(error);
			  alert("Please make sure all input fields are valid!")
            }
          });
	});
	$("#logout-button").on("click", function(e){
        e.preventDefault()
	    console.log("i am working");
        $.ajax({
            url: "http://127.0.0.1:5000/api/logout",
            method: "POST",
            success: function(response) {
				console.log(response);
				window.location.reload()
            //   alert("Your account has been created!")
            },
            error: function(xhr, status, error) {
              console.log(error);
            }
          });
	});
	$("body").on("click", "#right-button", function(e){
        e.preventDefault()
	    console.log("i am working");
		let cardBody = $(this).closest(".card-body");
		let taskId = cardBody.find(".card-order-index-input").attr("id");
		let orderIndex = cardBody.find(".card-order-index-input").data('id');
		console.log(taskId)
		console.log(orderIndex)

		data = {
			id: taskId,
			order_index: orderIndex,
			leftOrRight: 1,
		}
        $.ajax({
            url: "http://127.0.0.1:5000/api/swap-todo",
            method: "POST",
			data: data,
            success: function(response) {
				console.log(response);
				window.location.reload()
            //   alert("Your account has been created!")
            },
            error: function(xhr, status, error) {
              console.log(error);
            }
          });
	});
	$("body").on("click", "#left-button", function(e){
        e.preventDefault()
	    console.log("i am working");
		let cardBody = $(this).closest(".card-body");
		let taskId = cardBody.find(".card-order-index-input").attr("id");
		let orderIndex = cardBody.find(".card-order-index-input").data('id');
		console.log(taskId)
		console.log(orderIndex)

		data = {
			id: taskId,
			order_index: orderIndex,
			leftOrRight: -1,
		}
        $.ajax({
            url: "http://127.0.0.1:5000/api/swap-todo",
            method: "POST",
			data: data,
            success: function(response) {
				console.log(response);
				window.location.reload()
            //   alert("Your account has been created!")
            },
            error: function(xhr, status, error) {
              console.log(error);
            }
          });
	});
});