

 $( document ).ready(function() {




	$("#submit").click(function(){
		

		$.ajax({

				type : "POST",
				url : 'https://apartmentserverside.herokuapp.com/addUser',
				data : {
					mail : localStorage.getItem("apartEmail"),
					pass : localStorage.getItem("apartPass"),
					toAdd : $("#mail").val()

				},
				success : function(data) {

					if(data.status == "Success"){





						window.location.href = "./home.html";			
					}
					else
					{
						console.log("Failed To Add");
						window.location.href = "./failedUpdate.html";	
					}
				},
				error : function(req, errortype) {
					console.log("ERROR");		
				}

			});

	});




});