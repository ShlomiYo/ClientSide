

 $( document ).ready(function() {




	$("#submitBtn").click(function(){
		

		$.ajax({

				type : "POST",
				url : 'https://apartmentserverside.herokuapp.com/login',
				data : {
					mail : $("#mail").val(),
					pass : $("#pass").val()
				},
				success : function(data) {

					if(data.status == "Success"){

						localStorage.setItem("apartEmail", $("#mail").val()); // from now on i will check if this exists everytime the user will try login
						localStorage.setItem("apartPass", $("#pass").val()); // since i used local storage, i also took the pass because
																			 // i dont want someone who know my email to fake a login 
						localStorage.setItem("apartID", data.apart); // to see if the user have an apartment or not

						window.location.href = "./home.html";			
					}
					else
					{
						console.log("Email Or Password Are Incorrect");
						window.location.href = "./worngUserOrPass.html";	
					}
				},
				error : function(req, errortype) {
					console.log("ERROR");		
				}

			});

	});




});