//button functions

$("#goButton").click(function(){

	//data validation
	var elements = [$('#currentAverage'), $('#finalWeight')];

	var error = false;
	var message = '';

	$.each(elements, function( index, value ) {
  		
  		var element = value;

  		//check if not blank
  		if (!(element.val().trim() == '')) {
  			//check it is a number
  			

  			var number = parseFloat(element.val());


	  		if (!(isNaN(number))) {

	  			//check if valid number
	  			if (!((element.val() >= 0) && (element.val() <= 100))) {
	  				//if not valid
	  				error = true;
	  				message = 'Please make sure both values are between 0% and 100%';
	  			}

	  		} else {
	  			//show error
	  			error = true;
	  			message = 'Please check that you input only numbers into the data fields.';
	  		}
  		} else {
  			error = true;
  			message = 'Please make sure both textboxes are filled in.';
  		}

  		

	});

	if (error) {
		alert(message);
	} else {
		//process info
		var data = {};
		data['termWeight'] = (100 - $('#finalWeight').val());
		data['finalWeight'] = $('#finalWeight').val();
		data['currentAverage'] = $('#currentAverage').val();
		var results = dataAnalysis(data);
		
		//build results screen
		buildResultsScreen(results);

		//hide data screen
	    $("#dataScreen").slideUp();

	    //show results screen
	    $("#resultsScreen").slideDown();
	}

	
});

$("#showGradeScale").click(function(){

	function createTable() {

		//delete existing contents
		$("#gradeScaleTable").empty();

		///variables
		// Find a <table> element with id="myTable":
		var table = document.getElementById("gradeScaleTable");

		//add letters
		var letterRow = table.insertRow(-1);

		
		for (var i = 0; gradesArray.length - 1 >= i; i++) {
				var cell = letterRow.insertCell(i);
				cell.innerHTML = gradesArray[i];
				cell.style.width = '(88/12)%';

				//format
		};

		//header
		var letterHeader = letterRow.insertCell(0);
		letterHeader.innerHTML = 'Letter';
		letterHeader.style.width = '12%';
		//format



		//add %
		//add letters
		var percentRow = table.insertRow(-1);
		
		for (var i = 0; gradesArray.length - 1 >= i; i++) {
				var cell = percentRow.insertCell(i);
				cell.innerHTML = gradesScale[gradesArray[i]];
		};

		//header
		var percentHeader = percentRow.insertCell(0);
		percentHeader.innerHTML = '%';

	}

	//check if already showing or not
	if ($('#gradeScaleView').css('display') == 'none') {

		//show
		
		createTable();
		$("#gradeScaleView").slideDown();

		//change text
		$("#gradeScaleButtonText").text('Hide Grade Scale');

	} else {

		//hide
		$("#gradeScaleView").slideUp();

		//change text
		$("#gradeScaleButtonText").text('Show Grade Scale');
	};
	

});

$("#resultsBackArrow").click(function(){

	//go back to the first screen

	//hide results screen
    $("#resultsScreen").slideUp();

	//show data screen
    $("#dataScreen").slideDown();
});


//ui functions
function buildResultsScreen(data) {

	///variables
	// Find a <table> element with id="myTable":
	var table = document.getElementById("resultsTable");

	//functions

	function addTableRow (firstCol, secondCol) {
		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(-1);

		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		debugger;
		// Add some text to the new cells:
		cell1.innerHTML = firstCol;
		cell2.innerHTML = secondCol;
	}
	


}
















