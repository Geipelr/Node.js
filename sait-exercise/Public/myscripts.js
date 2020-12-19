// variables and functions for our pages

// Author: Heinz Geipel
// Date: 5/31/2020
// Course: CPRG-210-OOS
// Exercises for days 1-7


// used to swap pictures for desciptions in the right hand section of the page body
function descMouseover(index) {
	for (i=0; i<descs.length; i++)
	{
		if (i == index)
		{
// swap descriptions for pics		
			var x = document.getElementById(i);
			x.innerHTML = `<img src= ${ pics[i] } width = "100" height = "100" />`;
// open new window
			if (typeof(myWin) == "undefined")
			{
// no window has been opened before
				myWin = window.open(myURLs[index], "", "width=400,height=300,top=100,left=500");
				setTimeout(function(){myWin.close();}, 6000);
			}
			else
			{
// window has been closed before
				if (myWin.closed != false ) {
					myWin = window.open(myURLs[index], "", "width=400,height=300,top=100,left=500");
					setTimeout(function(){myWin.close();}, 6000);
				}
			} 
		}
		else
		{
// swap pics for descriptions		
			var x = document.getElementById(i);
			x.innerHTML = `<h1>${ descs[i] }</h1>`;
		}
	}
}



// switches on the input aid for specific fields
function showAid(field) {
    switch(field) {
	case 'firstName': document.getElementById("firstName").style.display = "initial"; break;
	case 'lastName': document.getElementById("lastName").style.display = "initial";
	}
}


// switches off the input aid for specific fields
function blurAid(field) {
    switch(field) {
	case 'firstName': document.getElementById("firstName").style.display = "none"; break;
	case 'lastName': document.getElementById("lastName").style.display = "none";
	}
}


// checks on postal code using regular expressions
function checkPostal(postal) {
	var reg = /^[a-z]\d[a-z] ?\d[a-z]\d$/i;
	if (!reg.test(postal))
	{
		return false;	
	}
}


// overall validation
function validate(myForm) {
	var message = "";
	if (myForm.fname.value == "")	
	{
		message += "FirstName must have a value<br />";
	}
	if (myForm.lname.value == "")	
	{
		message += "LastName must have a value<br />";
	}
	if (myForm.email.value == "")	
	{
		message += "Email must have a value<br />";
	}
	if (myForm.postal.value == "")	
	{
		message += "Postal code must have a value<br />";
	}

	if (myForm.postal.value != "")	
	{
		if (checkPostal(myForm.postal.value) == false) {message += "Postal code must be like T1Y 3A5 <br />"};		
	}

	if (message == "")
	{	
		document.getElementById("myMessage").innerHTML = "";
		return confirm('Do you want to submit?');
	}
	else
	{
		document.getElementById("myMessage").innerHTML = message;					
		return false;	
	}
}
