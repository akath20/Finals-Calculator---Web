
var teacherRoundsUp = true;

//analytics
$("#twitterClick").click(function() {
	ga('send', {
	  hitType: 'event',
	  eventCategory: 'Twitter',
	  eventAction: 'click',
	  fieldsObject: {nonInteraction: true}	
	});
});
$("#linkedinClick").click(function() {
	ga('send', {
	  hitType: 'event',
	  eventCategory: 'LinkedIn',
	  eventAction: 'click',
	  fieldsObject: {nonInteraction: true}	
	});
});
$("#emailClick").click(function() {
	ga('send', {
	  hitType: 'event',
	  eventCategory: 'Email',
	  eventAction: 'click',
	  fieldsObject: {nonInteraction: true}	
	});
});
$("#websiteClick").click(function() {
	ga('send', {
	  hitType: 'event',
	  eventCategory: 'Website',
	  eventAction: 'click',
	  fieldsObject: {nonInteraction: true}	
	});
});



//button functions


$("#yesButton").click(function() {

	teacherRoundsUp = true;

});

$("#noButton").click(function() {

	teacherRoundsUp = false;

});

//about button
$("#aboutButton").click(function() {

	

	//check if open or closed
	if ($('#header').css('display') == 'none') {
		//if hidden
		//show it
		$('#header').slideDown();

		//change text
		$('#aboutButton span').text('Hide');

		//analytics
		ga('send', {
		  hitType: 'event',
		  eventCategory: 'About Button',
		  eventAction: 'click',
		  fieldsObject: {nonInteraction: true}	
		});


	} else {
		//if showing
		$('#header').slideUp();

		//change text
		$('#aboutButton span').text('About');


	}


});

//increment button clicked 
$(".incrementButton").click(function() {

	//figure out which button it was
	var val = this.textContent;

	var incVal = 0.0;

	if (val == '+') {
		if (!(((parseFloat($('#incrementText').text()))) >= 3)) {
			incVal = 0.5;
		}
		
	} else {
		if ((((parseFloat($('#incrementText').text())))) > -3) {
			incVal = -0.5;
		}
	};

	//increment the text
	$('#incrementText').text((parseFloat($('#incrementText').text()) + incVal));

	//increment the dictionary
	
	for (var i = gradesArray.length - 1; i >= 0; i--) {

		if (gradesArray[i] != 'E') {

			gradesScale[gradesArray[i]] = (parseFloat(gradesScale[gradesArray[i]]) + incVal);

		};

	};

	//update the view
	buildGradeScaleTable();
	var data = {};
	data['termWeight'] = (100 - $('#finalWeight').val());
	data['finalWeight'] = $('#finalWeight').val();
	data['currentAverage'] = $('#currentAverage').val();
	var results = dataAnalysis(data);
	
	//build results screen
	buildResultsScreen(results);




});


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

		//check if teacher rounds up
		teacherScaleUpEnter();


		//process info
		var data = {};
		data['termWeight'] = (100 - $('#finalWeight').val());
		data['finalWeight'] = $('#finalWeight').val();
		data['currentAverage'] = $('#currentAverage').val();
		var results = dataAnalysis(data);

		

		//build results screen
		buildResultsScreen(results);

		//build grade scale table again just in case the teacher round was changed
		buildGradeScaleTable();

		//hide data screen
	    $("#dataScreen").slideUp();

	    //show results screen
	    $("#resultsScreen").slideDown();

		//google analytics
		//average
		
		//final weight
		
		}

	
});

function buildGradeScaleTable() {

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
		letterHeader.style.minWidth = '67px;';
		$(letterHeader).addClass('tableHeader');
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
		$(percentHeader).addClass('tableHeader');



	}

$("#showGradeScale").click(function(){

	

	//check if already showing or not
	if ($('#gradeScaleView').css('display') == 'none') {

		//show
		
		buildGradeScaleTable();
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

	teacherScaleUpExit();
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

		//to line things up add a <p> element

		
		// Add some text to the new cells:
		
		if (row.rowIndex == 0) {
			//if header
			//no align
			cell1.innerHTML = firstCol;

			//apply style
			
			$(row).addClass('tableHeader');

		} else {
			cell1.innerHTML = '<p class="tableAlign">' + firstCol + '</p>';
		};
		
		cell2.innerHTML = secondCol;

		

	}
	
	//delete content
	$("#resultsTable").empty();

	//add header
	addTableRow('Class Grade', 'Minimum Grade On Final');


	for (var i = 0; (data.length - 1) >= i; i++) {
		var object = data[i];
 
		var termWeight = (100 - $('#finalWeight').val());
		var finalWeight = $('#finalWeight').val();
		var currentAverage = $('#currentAverage').val();


		var firstCol = (object['classGrade'] + ' (' + classGradePercentage(currentAverage, finalWeight, object['minPossibleGradeOnFinal']) + '%)');
		var secondCol = (object['minPossibleGradeOnFinal'] + '% (' + object['minPossibleGradeOnFinalAsLetter'] + ')');
		addTableRow(firstCol, secondCol);
	};






}
















