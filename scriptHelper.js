// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
	// Here is the HTML formatting for our mission target div.
	// I tried experimenting with using .querySelector here.
	let missionTarget = document.querySelector("div[id='missionTarget']");
	missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
};

// Validation code still accepts symbols like quotes or punctuation for pilot/copilot, but works otherwise! Might want to use regex in future.//

function validateInput(testInput) {
	// I added a testNumber variable here to use for the 2nd/3rd else conditionals to turn input to a Number. I could not use that for the first "if" b/c an empty string '' would have been accepted as a Number and not triggered the alert.
	let testNumber = Number(testInput);
	if (testInput === '') {
		return 'Empty';
	}
	else if (isNaN(testNumber)) {
		return 'Not a Number';
	}
    else if (!isNaN(testNumber)) {
		// I could just use else return 'Is a Number' instead but wanted to practice with using ! operator.
		return 'Is a Number';
	}
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
	
    let launchStatus = document.getElementById('launchStatus');

    // I don't think I need line below b/c I used list.style.visibility instead. //
	// let faultyItems = document.getElementById('faultyItems');

	let pilotStatus = document.getElementById('pilotStatus');
	let copilotStatus = document.getElementById('copilotStatus');
	let fuelStatus = document.getElementById('fuelStatus');
	let cargoStatus = document.getElementById('cargoStatus');
    
    // Re-setting default visibiliy and h2 text heading below each time an alert is thrown, since cycles to top of function. //

    list.style.visibility = 'hidden';
    launchStatus.innerHTML = 'Awaiting Information Before Launch';
    launchStatus.style.color = "black";

    // Various validation/alert Code in the if/else lines below. //

    // I need the returns below on each if/else if conditional in order to stop the function and force it to go back to the top. //
    if (validateInput(pilot) === 'Empty' ||
		validateInput(copilot) === 'Empty' ||
		validateInput(fuelLevel) === 'Empty' ||
		validateInput(cargoLevel) === 'Empty') {

        // I think this line below is redundant. //
		// list.style.visibility = 'hidden';


        // My validation code still allows symbols like quotes and puntuation but otherwise works. //
		return alert('All fields are required!');
	}

	else if (validateInput(Number(pilot)) === 'Is a Number' || validateInput(Number(copilot)) === 'Is a Number') {
		return alert('Invalid entry! Please use only letters for Pilot and/or Co-Pilot.');
	}

	// I don't think I need line below. //
    // if (validateInput(Number(fuelLevel)) === 'Is a Number' || validateInput(Number(cargoLevel)) === 'Is a Number') {
	// }

	else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        return alert('Invalid entry! Please use only numbers for Fuel Level and/or Cargo Mass.');
	}

    // Setting the Pilot and Co-Pilot Names with template literals. //

	pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
	copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    // Changing the faultyItems/list below based on user form input. //

	if (fuelLevel < 10000) {
		fuelStatus.innerHTML = 'Fuel level too low for launch';
	} else {
		fuelStatus.innerHTML = 'Fuel level high enough for launch';
	}

	if (cargoLevel > 10000) {
		cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
	} else {
		cargoStatus.innerHTML = 'Cargo mass low enough for launch';
	}
  
	if (fuelLevel >= 10000 && cargoLevel <= 10000) {
		launchStatus.style.color = 'green';
		launchStatus.innerHTML = 'Shuttle is Ready for Launch';
		list.style.visibility = 'visible';
	} else {
		launchStatus.style.color = 'red';
		launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
		list.style.visibility = 'visible';
	}

};

// Added the URL to the fetch below AND added the "return response.json()"" //
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
		return response.json();
	});

    return planetsReturned;
};

// Interestingly, this version below also seemed to work without using .then but not sure why...
// async function myFetch() {
// 	let planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json');

// 	return planetsReturned.json();
// }


// Added code to function below to randomly pick one planet's data. //

function pickPlanet(planets) {
	let planet = Math.floor(Math.random() * planets.length);
	// Note: Line below CANNOT use () i.e. return planets(planet). It HAS to be in [planet] to work, I believe b/c it is returning an array "planets[index]" from the json fetch URL".
	return planets[planet];
};

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
