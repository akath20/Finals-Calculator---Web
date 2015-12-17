$("#goButton").click(function(){

	//data validation

	//process info
	var data = {};
	data['termWeight'] = (100 - $('#finalWeight').val());
	data['finalWeight'] = $('#finalWeight').val();
	data['currentAverage'] = $('#currentAverage').val();
	var results = dataAnalysis(data);
	debugger;

	//hide data screen
    $("#dataScreen").slideUp();

    //show results screen
    $("#resultsScreen").slideDown();

});

function buildResultsScreen(data) {

}