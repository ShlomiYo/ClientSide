
 $( document ).ready(function() {



	var manageUser = document.getElementById('manageUser');
	var simpleUser = document.getElementById('simpleUser');
	var leaveApartBtn = document.getElementById('leaveApartBtn');


// Manage
	var submitBtn = document.getElementById('submitBtn');
	var removeBtn = document.getElementById('removeBtn');

// Normal
	var simpleSubmitBtn = document.getElementById('simpleSubmitBtn');


	manageUser.style.display = "none";
	simpleUser.style.display = "none";
	leaveApartBtn.style.display = "none";


		

		$.ajax({

				type : "POST",
				url : 'https://apartmentserverside.herokuapp.com/settingsKickStart',
				data : {
					mail : localStorage.getItem("apartEmail"),
					pass : localStorage.getItem("apartPass")
				},
				success : function(data) {

					if(data.status == "Success"){ // i am gonna send an ajax req to the server and see if this is a manager or a simple user
												  // then i can decide what he is able to do

						if(data.apartAdmin == 1){

							manageUser.style.display = "block";
							submitBtn.onclick = adminUpdate;
							removeBtn.onclick = removeUser;
							 $("#a_name").val(data.user);
							 $("#a_city").val(data.city);
							 $("#a_add").val(data.add);

						}
						else{

							simpleUser.style.display = "block";
							simpleSubmitBtn.onclick = simpleUpdate;
							 $("#s_name").val(data.user);
						}

						leaveApartBtn.style.display = "block";
		
					}
					else{

						if(data.status2 == 0){
							console.log("Email Or Password Are Incorrect");
							window.location.href = "./worngUserOrPass.html";	
						}
						else{

							console.log("No Apartment");
							window.location.href = "./login.html";
						}

					}
				},
				error : function(req, errortype) {
					console.log("ERROR");		
				}

		});







function simpleUpdate(){ // update a user name

			$.ajax({

				type : "POST",
				url : 'https://apartmentserverside.herokuapp.com/simpleUpdate',
				data : {
					mail : localStorage.getItem("apartEmail"),
					pass : localStorage.getItem("apartPass"),
					name :  $("#s_name").val()
				},
				success : function(data) {

					if(data.status == "Success"){



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

}








function adminUpdate(){


		if($("#a_name").val() != "" && $("#a_city").val() != "" && $("#a_add").val() != "" && $("#a_name").val() != " " && $("#a_city").val() != " " && $("#a_add").val() != " "){


			$.ajax({

				type : "POST",
				url : 'https://apartmentserverside.herokuapp.com/adminUpdate',
				data : {
					mail : localStorage.getItem("apartEmail"),
					pass : localStorage.getItem("apartPass"),
					name :  $("#a_name").val(),
					city :  $("#a_city").val(),
					add :  $("#a_add").val()
				},
				success : function(data) {

					if(data.status == "Success"){



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


		}


}


function removeUser(){


			$.ajax({

				type : "POST",
				url : 'https://apartmentserverside.herokuapp.com/removeUser',
				data : {
					mail : localStorage.getItem("apartEmail"),
					pass : localStorage.getItem("apartPass"),
					remove :  $("#removeMem").val()
				},
				success : function(data) {

					if(data.status == "Success"){



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


}






leaveApartBtn.onclick = function(){





			$.ajax({

				type : "POST",
				url : 'https://apartmentserverside.herokuapp.com/leaveApartment',
				data : {
					mail : localStorage.getItem("apartEmail"),
					pass : localStorage.getItem("apartPass")
				},
				success : function(data) {

					if(data.status == "Success"){



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




}





});