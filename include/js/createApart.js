

 $( document ).ready(function() {



	var submitBtnCreate = document.getElementById('submitBtnCreate');
	var submitBtnJoin = document.getElementById('submitBtnJoin');
	var inpMail = document.getElementById('mail');
	var inpCity = document.getElementById('city');
	var inpStreet = document.getElementById('street');


	submitBtnCreate.disabled = true;
	submitBtnJoin.disabled = true;



	inpMail.onchange = join;
	inpCity.onchange = inpStreet.onchange = create;


	function join(){

		if(inpMail.value != ""){

			submitBtnJoin.disabled = false;
		}
		else{
			submitBtnJoin.disabled = true;
		}
	}




	function create(){

		if(inpCity.value != "" && inpStreet.value != ""){

			submitBtnCreate.disabled = false;
		}
		else{
			submitBtnCreate.disabled = true;
		}
	}





	submitBtnCreate.onclick = function(){ // ajax tocreate a new group


			$.ajax({

				type : "POST",
				url : 'https://apartmentserverside.herokuapp.com/createNewApart',
				data : {
					mail : localStorage.getItem("apartEmail"),
					pass : localStorage.getItem("apartPass"),
					city : $("#city").val(),
					street : $("#street").val()

				},
				success : function(data) {

					if(data.status == "Success"){


						window.location.href = "./home.html";			
					}
					else
					{
						console.log("Failed To Create");
						window.location.href = "./failedUpdate.html";	
					}
				},
				error : function(req, errortype) {
					console.log("ERROR");		
				}

			});


		
	}


	submitBtnJoin.onclick = function(){ // ajax to join existing group




			$.ajax({

				type : "POST",
				url : 'https://apartmentserverside.herokuapp.com/joinApart',
				data : {
					mail : localStorage.getItem("apartEmail"),
					pass : localStorage.getItem("apartPass"),
					joinTo : $("#mail").val()

				},
				success : function(data) {

					if(data.status == "Success"){





						window.location.href = "./home.html";			
					}
					else
					{
						console.log("Failed To Join");
						window.location.href = "./failedUpdate.html";	
					}
				},
				error : function(req, errortype) {
					console.log("ERROR");		
				}

			});



		
	}
	




});