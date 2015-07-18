

 $( document ).ready(function() {


	var partA = document.getElementById('partA');
	var partB = document.getElementById('partB');

	partB.style.display = "none"; // this will be displayed only if the user got not apartment



	var leftTopSectionA = document.getElementById('leftTopSectionA');
	var rightTopSectionA = document.getElementById('rightTopSectionA');
	var rightBottomSectionA = document.getElementById('rightBottomSectionA');

	var clickedPartA;


	leftTopSectionA.onclick = rightTopSectionA.onclick = rightBottomSectionA.onclick = nextPart;


	function nextPart(){

		if(this.id == "leftTopSectionA" )
		clickedPartA = "W";
		else if(this.id == "rightTopSectionA" )
		clickedPartA = "A";
		else if(this.id == "rightBottomSectionA" )
		clickedPartA = "O";


		console.log(clickedPartA);
		partA.style.display = "none"; // this will be displayed only if the user got not apartment
		partB.style.display = "block"; // this will be displayed only if the user got not apartment
	}




	var leftTopSectionB = document.getElementById('leftTopSectionB');
	var rightTopSectionB = document.getElementById('rightTopSectionB');
	var rightBottomSectionB = document.getElementById('rightBottomSectionB');
	var leftBottomSectionB = document.getElementById('leftBottomSectionB');

	var clickedPartB;



	leftTopSectionB.onclick = rightTopSectionB.onclick = rightBottomSectionB.onclick = leftBottomSectionB.onclick = updateServer;


	function updateServer(){

		if(this.id == "leftTopSectionB" )
		clickedPartB = "3";
		else if(this.id == "rightTopSectionB" )
		clickedPartB = "2";
		else if(this.id == "rightBottomSectionB" )
		clickedPartB = "1";
		else if(this.id == "leftBottomSectionB" )
		clickedPartB = "0";


		console.log( "A: "+clickedPartA +" B: "+ clickedPartB);

		// in here i will send the update request to the server and redirect back to home.html to receive the updated data






		$.ajax({

				type : "POST",
				url : 'https://apartmentserverside.herokuapp.com/apartUpdate',
				data : {
					mail : localStorage.getItem("apartEmail"),
					pass : localStorage.getItem("apartPass"),
					plusArr : parseInt(clickedPartB),
					statusArr : clickedPartA
				},
				success : function(data) {

					if(data.status == "Success"){



						window.location.href = "./home.html";			
					}
					else
					{
						console.log("Failed To Update");
						window.location.href = "./failedUpdate.html";	
					}
				},
				error : function(req, errortype) {
					console.log("ERROR");		
				}

			});









		// redirect

		 window.location = "./home.html"
	}



});