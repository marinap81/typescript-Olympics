import './style.css';
// TODO: required imports
import { Countries } from './models/Countries.enum';
import { Country } from './models/Country';
import { Result } from './models/IResult';
import { Medals } from './models/Medals.enum';
import { Sports } from './models/Sports.enum';

const countrySelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('country-slt')
);
const medalSelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('medal-slt')
);
const sportSelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('sport-slt')
);

//TODO: add an eventlistener to the button to trigger addMedal
const addButton: HTMLElement = document.getElementById('add-btn');
addButton.addEventListener('click', addMedal);

// keeps an array of the result PER COUNTRY.
// countries[0] (results are added for the index country)
let countries: Array<Country> = [];

init();
// This function sets up some display elements
function init() {
  let count = 0;

  // init countries
  for (let c in Countries) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = count.toString();
      count++;
      countrySelect.add(newOption);
    }
  }

  // init sports

  count = 0; // reset to zero,
  for (let c in Sports) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = count.toString();
      count++;
      sportSelect.add(newOption);
    }
  }

  // init medals

  count = 0;
  for (let c in Medals) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = Medals[c];
      count++;
      medalSelect.add(newOption);
    }
  }
}

// This function adds a medal to the countries tally *****
function addMedal() {
  //TODO: complete this function
  // COuntry name from Select
  let myCountryName = countrySelect.options[countrySelect.value].text;
  let mySport: Sports = Sports[sportSelect.value];
  //let myMedal: Medals = Medals.Gold;
  // Found online. converts the string from the select into an enum.
  let myMedal: Medals = <keyof typeof Medals>medalSelect.value; // Error shows but works.
  //console.log(medalSelect.value);
  //console.log(Medals[medalSelect.value]);
  // this creates a new 'result' object
  let myResult = new Result(mySport, myMedal);
  let isFound = 0;

  // Setup Country in Array,

  // index related-countries is a blank array to start with. ie looks to see if Australia for example
  // already added to the countries array yet. it just gives a yes or no (ie. isFounnd = 1)

  // the let c part picks up on the INDEX 0,1,2 etc only.
  for (let c in countries) {
    if (countries[c].name == myCountryName) {
      isFound = 1;
      break;
    }
  }

  // Add Country where not found
  // Uses info from above. If NOT found, it creates a new country. Then adds this new countryt to the countries array.

  if (isFound == 0) {
    let myCountry = new Country(myCountryName);
    countries.push(myCountry);
  }

  // Now add Result to the country

  for (let c in countries) {
    if (countries[c].name == myCountryName) {
      countries[c].addResult(myResult);
    }
  }

  displayTable();
}

// This function refreshes the medal tally table ******
function displayTable() {
  let tableBody = document.getElementById('results-body');
  let content = '';

  for (let c in countries) {
    var myCountryName = countries[c].name;
    var myTotal = countries[c].totalMedals();
    var myGoldTotal = countries[c].totalMedalType(
      Medals.Gold
    ); /*links into enum*/
    var mySilverTotal = countries[c].totalMedalType(Medals.Silver);
    var myBronzeTotal = countries[c].totalMedalType(Medals.Bronze);

    content += `<tr><td>${myCountryName}</td><td>${myGoldTotal}</td><td>${mySilverTotal}</td><td>${myBronzeTotal}</td><td>${myTotal}</td></tr>`;
  }

  tableBody.innerHTML = content;
}
