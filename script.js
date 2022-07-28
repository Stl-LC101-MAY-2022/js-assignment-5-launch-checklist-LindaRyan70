// Write your JavaScript code here!
window.addEventListener("load", function() {
	let listedPlanets;
	//Set listedPlanetsResponse equal to the value returned by calling myFetch()
	let listedPlanetsResponse = myFetch();
	listedPlanetsResponse.then(function(result) {
		listedPlanets = result;
        // The console.logs 1 and 2 lines down are unnecessare except to view json planet results in console. //
		// console.log(listedPlanets);
	}).then(function() {
		// console.log(listedPlanets);
		// Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
		let randomPlanet = pickPlanet(listedPlanets);
        addDestinationInfo(document, randomPlanet.name, randomPlanet.diameter, randomPlanet.star, randomPlanet.distance, randomPlanet.moons, randomPlanet.image);
	});

	let form = document.querySelector("form");

    // This line sets faultyItems/list to hidden visibility BEFORE the form submission is made/button pressed. (Even though it technically "works"/same visual result if placed w/in submit listener.)
	document.getElementById('faultyItems').style.visibility = 'hidden';

	form.addEventListener('submit', function(event) {
		event.preventDefault();
		let pilotName = document.querySelector("input[name='pilotName']");
		let copilotName = document.querySelector("input[name='copilotName']");
		let fuelLevel = document.querySelector("input[name='fuelLevel']");
		let cargoMass = document.querySelector("input[name='cargoMass']");

        // I NEED the line below for the SUBMIT button to work. Otherwise no alerts/data displayed. //
        let list = document.getElementById('faultyItems');

		// I think these 3 lines below are unnecessary. //
        // let faultyItems = document.getElementById('faultyItems');
        // let launchStatus = document.getElementById('launchStatus');

		// Even though this line works the same as one before/outside the listener, this one fails the npm test b/c supposed to show hidden BEFORE form submission.
		// document.getElementById('faultyItems').style.visibility = 'hidden';

		formSubmission(document, list, pilotName.value, copilotName.value, fuelLevel.value, cargoMass.value);
	});
});
