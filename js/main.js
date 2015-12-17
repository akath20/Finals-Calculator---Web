$("#goButton").click(function(){

	//data validation

	//process info
	var data = {};
	data['termWeight'] = $('#currentAverage').val();
	data['finalWeight'] = $('#finalWeight').val();
	var results = dataAnalysis(data);

	//hide data screen
    $("#dataScreen").slideUp();

    //show results screen
    $("#resultsScreen").slideDown();

});

function buildResultsScreen(data) {

}