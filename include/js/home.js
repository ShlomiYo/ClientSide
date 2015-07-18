

window.onload = function() {  // i needed to reload the page since i updated data on the mongo and it is needs the refresh on this page
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}




 $( document ).ready(function() {





	var withApartHeader = document.getElementById('withApartHeader');
	var theAddress = document.getElementById('theAddress');
	var noApart = document.getElementById('partA');
	var withApart = document.getElementById('partB');


	var leftTopSection = document.getElementById('leftTopSection');
	var rightTopSection = document.getElementById('rightTopSection');
	var leftBottomSection = document.getElementById('leftBottomSection');
	var rightBottomSection = document.getElementById('rightBottomSection');



	var middleScreenWithApart = document.getElementById('middleScreenWithApart');
	var mainCircle = document.getElementById('mainCircle');
	var insideApart  = ""; // will include a string with all of my apart members which are inside, for the main circle.

	var circlesCounter = 0; //this will count my circles and decide how many to display
	var loopCounter = 0; // this var will help me later incase i wanna type something when the apartment is empty
	var insideLoop = 0; // count the number of people inside the apart

	leftTopSection.style.display = "none";
	rightTopSection.style.display = "none";
	leftBottomSection.style.display = "none";
	rightBottomSection.style.display = "none";


	noApart.style.display = "none"; // this will be displayed only if the user got not apartment

	withApart.style.display = "none"; // this will be displayed only if the user got not apartment
	withApartHeader.style.display = "none"; // this will be displayed only if the user got not apartment




 //window.setTimeout(function(){ window.location.reload(true); },60000);  // auto update every 60 sec


	$.ajax({

				type : "POST",
				url : 'https://apartmentserverside.herokuapp.com/home',
				data : {
					mail : localStorage.getItem("apartEmail"),
					pass : localStorage.getItem("apartPass")
				},
				success : function(data) {

					if(data.status == "Success"){ // i am logged in and i got all of the data i need! only the data i may see of course


						//##################################################################################################################
					if(data.statusApart == "1"){	//  #####################  user is logged in and have an apartment #####################
						//##################################################################################################################


								noApart.style.display = "none"; // this will be displayed only if the user got not apartment

								withApart.style.display = "block"; // this will be displayed only if the user got not apartment
								withApartHeader.style.display = "block"; // this will be displayed only if the user got not apartment



								for(var i=0; i<data.apartInfo.gStatusArr.length; i++){

									if(data.apartInfo.gStatusArr[i] == "A"){insideLoop++;} // insideLoop is the number of people inside the apart
								}

								


								if(insideLoop >= 3){

									middleScreenWithApart.style.background = "url('./include/img/inside3.png') no-repeat center center";
	 								middleScreenWithApart.style.backgroundSize  =  "contain";
								}
								else if(insideLoop == 2){

									middleScreenWithApart.style.background = "url('./include/img/inside2.png') no-repeat center center";
	 								middleScreenWithApart.style.backgroundSize  =  "contain";
								}
								else if(insideLoop <= 1){

									middleScreenWithApart.style.background = "url('./include/img/inside1.png') no-repeat center center";
	 								middleScreenWithApart.style.backgroundSize  =  "contain";
								}



								//document.getElementById('testData').innerHTML =  data.userInfo.city;

								for(var i=0; i<data.apartInfo.gUsersArr.length; i++){


									if(data.apartInfo.gUsersArr[i] == localStorage.getItem("apartEmail") ){ // this is ME



										if(data.apartInfo.gStatusArr[i] == "A"){ // i am in the middle circle

											if(loopCounter != 0 ){

												if(data.apartInfo.gPlusArr[i] != 0){

													insideApart = 'אתה '+data.apartInfo.gPlusArr[i]+"+, "+insideApart;
												}
												else{

													insideApart = 'אתה'+insideApart+", ";
												}


											}else{

												if(data.apartInfo.gPlusArr[i] != 0){

													insideApart = 'אתה '+data.apartInfo.gPlusArr[i]+"+"+insideApart;
												}
												else{

													insideApart = 'אתה'+insideApart;
												}

											}


											loopCounter++;


										}
										else if(data.apartInfo.gStatusArr[i] == "W"){ // i am on my way, outside circle



											if(data.apartInfo.gPlusArr[i] == 0){

												if(circlesCounter == 0){

														leftTopSection.style.display = "block";
														leftTopSection.children[0].children[0].innerHTML = "אני"; // ME

												}
												else if(circlesCounter == 1){

														rightTopSection.style.display = "block";
														rightTopSection.children[0].children[0].innerHTML = "אני"; // ME

												}
												else if(circlesCounter == 2){

														leftBottomSection.style.display = "block";
														leftBottomSection.children[0].children[0].innerHTML = "אני"; // ME

												}
												else if(circlesCounter == 3){

														rightBottomSection.style.display = "block";
														rightBottomSection.children[0].children[0].innerHTML = "אני"; // ME

												}

											}
											else{


												if(circlesCounter == 0){

														leftTopSection.style.display = "block";
														leftTopSection.children[0].children[0].innerHTML = "אני "+data.apartInfo.gPlusArr[i]+"+"; // ME

												}
												else if(circlesCounter == 1){

														rightTopSection.style.display = "block";
														rightTopSection.children[0].children[0].innerHTML = "אני "+data.apartInfo.gPlusArr[i]+"+"; // ME

												}
												else if(circlesCounter == 2){

														leftBottomSection.style.display = "block";
														leftBottomSection.children[0].children[0].innerHTML = "אני "+data.apartInfo.gPlusArr[i]+"+"; // ME

												}
												else if(circlesCounter == 3){

														rightBottomSection.style.display = "block";
														rightBottomSection.children[0].children[0].innerHTML = "אני "+data.apartInfo.gPlusArr[i]+"+"; // ME

												}
											}



											circlesCounter++; // everytime i saw "W" it means i have +1 circle
										}
										
										theAddress.innerHTML =  data.apartInfo.gAddress + ", " + data.apartInfo.gCity ;// loading the apartment info


									}
									else{ // this is the other room mates
																				// O == Out, i need to take him down from the view
																				// W == On the Way To The Apart
																				// A == Arrived To The Apart

										if(data.apartInfo.gStatusArr[i] == "W"){ //  W means on the way, need to open outside circles




											if(data.apartInfo.gPlusArr[i] != 0){

												if(circlesCounter == 0){

														leftTopSection.style.display = "block";
														leftTopSection.children[0].children[0].innerHTML = data.apartInfo.gNamesArr[i]+' '+data.apartInfo.gPlusArr[i]+"+"; // persons name

												}
												else if(circlesCounter == 1){

														rightTopSection.style.display = "block";
														rightTopSection.children[0].children[0].innerHTML = data.apartInfo.gNamesArr[i]+' '+data.apartInfo.gPlusArr[i]+"+"; // persons name

												}
												else if(circlesCounter == 2){

														leftBottomSection.style.display = "block";
														leftBottomSection.children[0].children[0].innerHTML = data.apartInfo.gNamesArr[i]+' '+data.apartInfo.gPlusArr[i]+"+"; // persons name

												}
												else if(circlesCounter == 3){

														rightBottomSection.style.display = "block";
														rightBottomSection.children[0].children[0].innerHTML = data.apartInfo.gNamesArr[i]+' '+data.apartInfo.gPlusArr[i]+"+"; // persons name

												}

											}else{

												if(circlesCounter == 0){

														leftTopSection.style.display = "block";
														leftTopSection.children[0].children[0].innerHTML = data.apartInfo.gNamesArr[i]; // persons name

												}
												else if(circlesCounter == 1){

														rightTopSection.style.display = "block";
														rightTopSection.children[0].children[0].innerHTML = data.apartInfo.gNamesArr[i]; // persons name

												}
												else if(circlesCounter == 2){

														leftBottomSection.style.display = "block";
														leftBottomSection.children[0].children[0].innerHTML = data.apartInfo.gNamesArr[i]; // persons name

												}
												else if(circlesCounter == 3){

														rightBottomSection.style.display = "block";
														rightBottomSection.children[0].children[0].innerHTML = data.apartInfo.gNamesArr[i]; // persons name

												}

											}





											circlesCounter++; // everytime i saw "W" it means i have +1 circle
										}
										else if(data.apartInfo.gStatusArr[i] == "A"){ // the people in the apartment right now


											if(loopCounter == 0){

													if(data.apartInfo.gPlusArr[i] != 0){

														insideApart += data.apartInfo.gNamesArr[i]+' '+data.apartInfo.gPlusArr[i]+"+";
													}
													else{

														insideApart += data.apartInfo.gNamesArr[i];
													}

													loopCounter++;
											}else{

													if(data.apartInfo.gPlusArr[i] != 0){

														insideApart += ", "+data.apartInfo.gNamesArr[i]+' '+data.apartInfo.gPlusArr[i]+"+";
													}
													else{

														insideApart += ", "+data.apartInfo.gNamesArr[i];
													}

											}

									


										}
										else{}//  data.apartInfo.gStatusArr[i] == "O"  if he is out i dont need to do anything


									}
								}


								if(insideApart != null){ mainCircle.innerHTML = insideApart; }
								

						}//##################################################################################################################
						else{	// ##################### user is logged in but dont have apart #####################
						//##################################################################################################################



								noApart.style.display = "block"; // this will be displayed only if the user got not apartment

								withApart.style.display = "none"; // this will be displayed only if the user got not apartment
								withApartHeader.style.display = "none"; // this will be displayed only if the user got not apartment


						}


					}
					else{

						console.log("Email Or Password Are Incorrect");
						window.location.href = "./worngUserOrPass.html";	
					}
				},
				error : function(req, errortype) {
					console.log("ERROR");
				}

			});


















});