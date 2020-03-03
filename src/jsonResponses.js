const fs = require('fs');

let numerics;
let dates;

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const getDate = (request, response) => {
  const today = new Date();
  const d = today.getDate();
  const m = today.getMonth();
  // const s = Math.ceil(m / 4);
  const y = today.getFullYear();
  const w = today.getDay();

  const day = dates.days[d];
  const weekday = dates.weekdays[w];
  const month = dates.months[m];

  const responseJSON = {
    date: `${m + 1}/${d + 1}/${y}`,
    kanji: `${month.kanji + day.kanji} (${weekday.kanji})`,
    reading: `${month.reading} ${day.reading} (${weekday.reading})`,
    english: `${month.english} ${day.english} (${weekday.english})`,
    translation: `${month.month} ${day.date} (${weekday.day})`,
  };

  // if (requestMethod === 'GET') responseJSON.users = users;

  respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response) => {
  const statusCode = 404;
  response.writeHead(statusCode, { 'Content-Type': 'text/html' });
  response.write('<html><body><h1>404 - Not Found</h1></body></html>');
  response.end();
};

const appendNumbers = (num, array, response, isPower) => {
  const searchNum = Number.parseInt(num, 10);
  const number = array[searchNum];

  if ((isPower && searchNum === 1) || (isPower && searchNum === 0)) {
    response.english += ' ';
  } else {
    response.kanji = number.kanji + response.kanji;
    response.reading = `${number.reading} ${response.reading}`;
    response.english = `${number.english} ${response.english}`;
  }
};

const getNumber = (request, response, input) => {
  const responseJSON = {};
  const counter = { counter: 0 };

  // if (numerics[input.number] !== undefined) {
  if (!Number.isNaN(input.number)) {
    const numString = input.number.toString();
    const { length } = numString;
    responseJSON.num = input.number;
    responseJSON.kanji = '';
    responseJSON.reading = '';
    responseJSON.english = '';

    // for (let i = 0; i <= length; i++) {
    for (let i = length; i >= 1; i--) {
      if (numString[i - 1] !== '0') {
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
      counter.counter++;
    }
  } else {
    responseJSON.response = 'Please enter in a valid number!';
  }

  // if (requestMethod === 'GET') responseJSON.users = users;

  respondJSON(request, response, 200, responseJSON);
};

module.exports = {
  getDate,
  getNumber,
  notFound,
};

const init = () => {
  // load in the JSON data
  const numberKanji = fs.readFileSync(`${__dirname}/../json/Numerical-Kanji.json`);
  const dateFile = fs.readFileSync(`${__dirname}/../json/Dates.json`);

  numerics = JSON.parse(numberKanji).numbers;
  dates = JSON.parse(dateFile).dates;
};

init();
