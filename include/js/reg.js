

 $( document ).ready(function() {


	var pass1 = document.getElementById('pass1');
	var pass2 = document.getElementById('pass2');
	var mail = document.getElementById('mail');
	var name = document.getElementById('name');

	var sub = document.getElementById('submit');


	pass1.onchange = passwordApprove;
	pass2.onchange = passwordApprove;
	mail.onchange = passwordApprove;
	name.onchange = passwordApprove;
	sub.disabled = true;




	 function passwordApprove(){

	 	if(pass1.value == pass2.value && pass1.value != ""){

	 		pass1.style.borderColor = "#2cc36b";
	 		pass2.style.borderColor = "#2cc36b";


	 		if(mail.value != "" && name.value != "" ){
	 			sub.disabled = false; 
	 		}

	 	}
	 	else{

	 		pass1.style.borderColor = "#c0392b";
	 		pass2.style.borderColor = "#c0392b";
	 		sub.disabled = true;
	 	}

	 }









	$("#submit").click(function(){
		


		$.ajax({

				type : "POST",
				url : 'https://apartmentserverside.herokuapp.com/reg',
				data : {

					mail : $("#mail").val(),
					user : $("#name").val(),
					pass : $("#pass1").val()
				},
				success : function(data) {

					if(data.status == "Success"){

						localStorage.setItem("apartEmail", $("#mail").val()); // from now on i will check if this exists everytime the user will try login
						localStorage.setItem("apartPass", $("#pass1").val()); // i took the pass since i dont want someone who know my email to fake a login
						window.location.href = "./home.html";			
					}
					else{

						console.log("Email Already Exists");
						window.location.href = "./alreadyExists.html";	
					}
				},
				error : function(req, errortype) {
					console.log("ERROR");
				}

			});


	});








});