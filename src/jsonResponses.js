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

const getNumber = (request, response, input) => {
  const responseJSON = {};

  if (numerics[input.number] !== undefined) {
    const number = numerics[input.number];

    responseJSON.num = input.number;
    responseJSON.kanji = `${number.kanji}`;
    responseJSON.reading = `${number.reading}`;
    responseJSON.english = `${number.english}`;
    responseJSON.translation = `${number.name}`;
  } else {
    responseJSON.response = 'Please enter in a valid number!';
  }

  // if (requestMethod === 'GET') responseJSON.users = users;

  respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response) => {
  const statusCode = 404;
  response.writeHead(statusCode, { 'Content-Type': 'text/html' });
  response.write('<html><body><h1>404 - Not Found</h1></body></html>');
  response.end();
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
