const fs = require('fs');

// Variables used for the json files
let numerics;
let dates;

// Returns the JSON response
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};


const getDate = (request, response) => {
  const responseJSON = {};

  if (request.method === 'GET') {
    const today = new Date();
    const d = today.getDate();
    const m = today.getMonth();
    const y = today.getFullYear();
    const w = today.getDay();

    // Get the days, week, and month translations
    const day = dates.days[d];
    const weekday = dates.weekdays[w];
    const month = dates.months[m];

    // Return the JSON block
    responseJSON.date = `${m + 1}/${d + 1}/${y}`;
    responseJSON.kanji = `${month.kanji + day.kanji} (${weekday.kanji})`;
    responseJSON.reading = `${month.reading} ${day.reading} (${weekday.reading})`;
    responseJSON.english = `${month.english} ${day.english} (${weekday.english})`;
    responseJSON.translation = `${month.month} ${day.date} (${weekday.day})`;
  } else {
    // The request wasn't a get, so just return a success message
    responseJSON.message = 'Success!';
  }

  respondJSON(request, response, 200, responseJSON);
};

// Not found
const notFound = (request, response) => {
  const statusCode = 404;
  response.writeHead(statusCode, { 'Content-Type': 'text/html' });
  response.write('<html><body><h1>404 - Not Found</h1></body></html>');
  response.end();
};


// Search the numeric array and retrieve the kanji based off the number
const appendNumbers = (num, array, response, isPower) => {
  // Parse the number and get it's json array relation
  const searchNum = Number.parseInt(num, 10);
  const number = array[searchNum];

  // Check If the current power is a single-character kanji,
  // and the number entered is either 1 or 0, we skip it.
  if ((isPower && searchNum === 1) || (isPower && searchNum === 0)) {
    response.english += ' ';
  } else {
    // The numbers valid, so append it's values to the JSON object
    response.kanji = number.kanji + response.kanji;
    response.reading = `${number.reading} ${response.reading}`;
    response.english = `${number.english} ${response.english}`;
  }
};

// Used for translating numbers from english to japanese
const getNumber = (request, response, input) => {
  // Create the json object
  const responseJSON = {};

  // Check for get request
  if (request.method === 'GET') {
    // Create a counter
    const counter = { counter: 0 };
    // Check if the number's actually good or not
    if (!Number.isNaN(input.number)) {
      // translate the string back into a number, and get it's length
      const numString = input.number.toString();
      const { length } = numString;
      responseJSON.num = input.number;
      // Create the JSON variables
      responseJSON.kanji = '';
      responseJSON.reading = '';
      responseJSON.english = '';

      // Loop through the number
      for (let i = length; i >= 1; i--) {
        // Make sure there are no 0's; They are not counted in japanese
        if (numString[i - 1] !== '0') {
          // Use the counter to start at the first number on the right
          // Case 0 would be 1, case 1 would be 10, case 2 would be 100, etc
          switch (counter.counter) {
            case 9:
              appendNumbers(0, numerics.powers, responseJSON, false);
              appendNumbers(4, numerics.powers, responseJSON, false);
              appendNumbers(numString[i - 1], numerics.numbers, responseJSON, false);
              break;

            case 8:
              appendNumbers(4, numerics.powers, responseJSON, false);
              appendNumbers(numString[i - 1], numerics.numbers, responseJSON, false);
              break;

            case 7:
              appendNumbers(2, numerics.powers, responseJSON, true);
              appendNumbers(numString[i - 1], numerics.numbers, responseJSON, false);
              break;

            case 6:
              appendNumbers(1, numerics.powers, responseJSON, false);
              appendNumbers(numString[i - 1], numerics.numbers, responseJSON, true);
              break;

            case 5:
              appendNumbers(0, numerics.powers, responseJSON, false);
              appendNumbers(numString[i - 1], numerics.numbers, responseJSON, false);
              break;

            case 4:
              appendNumbers(3, numerics.powers, responseJSON, false);
              appendNumbers(numString[i - 1], numerics.numbers, responseJSON, false);
              break;

            case 3:
              appendNumbers(2, numerics.powers, responseJSON, false);
              appendNumbers(numString[i - 1], numerics.numbers, responseJSON, true);
              break;

            case 2:
              appendNumbers(1, numerics.powers, responseJSON, false);
              appendNumbers(numString[i - 1], numerics.numbers, responseJSON, true);
              break;

            case 1:
              appendNumbers(0, numerics.powers, responseJSON, false);
              appendNumbers(numString[i - 1], numerics.numbers, responseJSON, true);
              break;

            case 0:
              appendNumbers(numString[i - 1], numerics.numbers, responseJSON, false);
              break;

            default:
              responseJSON.english += ' ';
              break;
          }
        }
        // increment the counter
        counter.counter++;
      }
    } else {
      // An invalid number was entered
      // Return a bad request
      responseJSON.id = 'badRequest';
      responseJSON.message = 'Please enter in a valid number!';
      return respondJSON(request, response, 400, responseJSON);
    }
  } else {
    // The method was not Get, so return a success
    responseJSON.message = 'Success!';
  }
  return respondJSON(request, response, 200, responseJSON);
};

// Exports
module.exports = {
  getDate,
  getNumber,
  notFound,
};

// Read in the files at the start of the program
const init = () => {
  // load in the JSON data
  const numberKanji = fs.readFileSync(`${__dirname}/../json/Numerical-Kanji.json`);
  const dateFile = fs.readFileSync(`${__dirname}/../json/Dates.json`);

  numerics = JSON.parse(numberKanji).numbers;
  dates = JSON.parse(dateFile).dates;
};

init();
