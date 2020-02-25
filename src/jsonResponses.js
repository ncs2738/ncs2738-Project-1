let numerics;
let dates;

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response, requestMethod) => {
  const responseJSON = dates;

  //if (requestMethod === 'GET') responseJSON.users = users;

  respondJSON(request, response, 200, responseJSON);
};

/*
const notFound = (request, response, requestMethod) => {
  const responseJSON = {
    id: 'notFound',
  };

  if (requestMethod === 'GET') responseJSON.message = 'The page you are looking for was not found.';

  respondJSON(request, response, 404, responseJSON);
};
*/

const notFound = (request, response) =>
{
	const statusCode = 404;
	response.writeHead(statusCode, {'Content-Type' : 'text/html'});
	response.write("<html><body><h1>404 - Not Found</h1></body></html>");
	response.end();
};


const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  getUsers,
  addUser,
  notFound,
};

/*
Sunday: Nichiyôbi (にちようび – 日曜日)
Monday: Getsuyôbi (げつようび – 月曜日)
Tuesday: Kayôbi (かようび – 火曜日)
Wednesday: Suiyôbi (すいようび – 水曜日)
Thursday: Mokuyôbi (もくようび – 木曜日)
Friday: Kinyôbi (きんようび – 金曜日)
Saturday: Doyôbi (どようび – 土曜日)
*/

let init = () => 
{
  // load in the JSON data
  const numberKanji = fs.readFileSync(`${__dirname}../json/Numerical-Kanji.json`);
  const dateFile = fs.readFileSync(`${__dirname}../json/Dates.json`);
  
  numerics = JSON.parse(numberKanji).numbers;
  dates = JSON.parse(dateFile).numbers;
	//console.log(`There are ${jokesArray.length} jokes!`);
}

init();

/*

// request handlers
const handlerGetAllJokes= (request, response) =>
{
	const statusCode = 200;												//TURN ON CORS
	response.writeHead(statusCode, {'Content-Type' : 'application/json', 'Access-Control-Allow-Origin' : '*'});
	response.write(JSON.stringify(jokesArray));
	response.end();
};

const handlerGetRandomJoke = (request, response) =>
{
	let randJoke = jokesArray[Math.floor(Math.random() * jokesArray.length)];
	const statusCode = 200;												//TURN ON CORS
	response.writeHead(statusCode, {'Content-Type' : 'application/json', 'Access-Control-Allow-Origin' : '*'});
	response.write(JSON.stringify(randJoke));
	response.end();
};

//function to add a joke from a POST'ed joke
const handlerAddJoke = (request, response, jokes) => 
{
	const responseJSON = {
	  message: 'question and answer are both required.',
	};

	if (!jokes.q|| !jokes.a) {
		responseJSON.id = 'missingParams';
		response.writeHead(400, {'Content-Type' : 'text/html'});
		response.write("<html><body><h1>400 - question and answer are both required</h1></body></html>");
	}
  
	let responseCode = 201;
  
	if (jokesArray[jokes.q]) {
	  responseCode = 204;
	} else {
	  jokesArray[jokes.q] = {};
	}

	jokesArray[jokes.q].q= jokes.q;
	jokesArray[jokes.q].age = jokes.a;
  
	if (responseCode === 201) {
	  responseJSON.message = 'Created Successfully';
	  response.write("<html><body><h1>201 - new joke written!</h1></body></html>");
	}
  };

*/