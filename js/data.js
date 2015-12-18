var gradesScale = {
	'A' : 92.5,
	'A-' : 89.5,
	'B+' : 86.5,
	'B' : 82.5,
	'B-' : 79.5,
	'C+' : 76.5,
	'C' : 72.5,
	'C-' : 69.5,
	'D+' : 66.5,
	'D' : 62.5,
	'D-' : 59.5,
	'E': 0,
}

var gradesArray = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E'];


function gradeAsLetter (value) {

		if (value >= gradesScale['A']) {
			return 'A';
		} else if ((gradesScale['A'] > value) && (value >= gradesScale['A-'])) {
			return 'A-';
		} else if ((gradesScale['A-'] > value) && (value >= gradesScale['B+'])) {
			return 'B+';
		} else if ((gradesScale['B+'] > value) && (value >= gradesScale['B'])) {
			return 'B';
		} else if ((gradesScale['B'] > value) && (value >= gradesScale['B-'])) {
			return 'B-';
		} else if ((gradesScale['B-'] > value) && (value >= gradesScale['C+'])) {
			return 'C+';
		} else if ((gradesScale['C+'] > value) && (value >= gradesScale['C'])) {
			return 'C';
		} else if ((gradesScale['C'] > value) && (value >= gradesScale['C-'])) {
			return 'C-';
		} else if ((gradesScale['C-'] > value) && (value >= gradesScale['D+'])) {
			return 'D+';
		} else if ((gradesScale['D+'] > value) && (value >= gradesScale['D'])) {
			return 'D';
		} else if ((gradesScale['D'] > value) && (value >= gradesScale['D-'])) {
			return 'D-';
		} else if (gradesScale['D-'] > value) {
			return 'E';
		};

}


function dataAnalysis (data) {

	//variables
	var termWeight = 0;
	var finalWeight = 0;
	var currentAverage = 0;


	//functions
	function lowestPossibleGrade () {

		return (((1 - finalWeight) * currentAverage)*100);
	}

	function highestPossibleGrade () {
	
		return ((((1 - finalWeight)*currentAverage)+finalWeight)*100);
	}

	function minPossGrade (input) {
		
		//convert the grade letter to %
		var gradeAsPercent = gradesScale[input];

		var minGrade = ((gradeAsPercent - lowestPossibleGrade())/finalWeight);

		if (minGrade < 0) {
			return 0;
		};

		return minGrade;

	}

	function possibleGrades () {
		

		var grades = [];


		var highGradeIndex = gradesArray.indexOf(gradeAsLetter(highestPossibleGrade()));
		var lowGradeIndex = gradesArray.indexOf(gradeAsLetter(lowestPossibleGrade()));

		var xCounter = 0;
		while(Math.abs(highGradeIndex - lowGradeIndex) >= xCounter) {

			var data = {
				'classGrade': gradesArray[(highGradeIndex + xCounter)],
				'minPossibleGradeOnFinal': minPossGrade(gradesArray[(highGradeIndex + xCounter)]).toFixed(1),
				'minPossibleGradeOnFinalAsLetter': gradeAsLetter(minPossGrade(gradesArray[(highGradeIndex + xCounter)])),
			}

			grades.push(data)
			xCounter++;
		}

		return grades;

	}

	


	//main
	//set variables
	termWeight = (data['termWeight'] * .01);
	finalWeight = (data['finalWeight'] * .01);
	currentAverage = (data['currentAverage'] * .01)

	return possibleGrades();
}


