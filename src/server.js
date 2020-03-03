// Read in the files
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const userHandler = require('./usersResponses.js');

// urlStruct
const urlStruct = {
  // Get Request
  GET:
  {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/VueHandler.js': htmlHandler.getVue,
    '/VueComponents.js': htmlHandler.getComponents,
    '/getDate': jsonHandler.getDate,
    '/getNumber': jsonHandler.getNumber,
    '/getUsers': userHandler.getUsers,
    '/getSchedule': userHandler.getSchedule,
  },
  // Posts
  POST:
  {
    '/addUser': userHandler.addUser,
    '/addSchedule': userHandler.addSchedule,
  },
  // Only data get requests
  HEAD:
  {
    '/getDate': jsonHandler.getDate,
    '/getNumber': jsonHandler.getNumber,
    '/getUsers': userHandler.getUsers,
    '/getSchedule': userHandler.getSchedule,
  },
  notFound: jsonHandler.notFound,
};

// Handles posting to the server;
// Translate it's paramters, then search the struct with it.
const handlePost = (request, response, httpMethod, pathname) => {
  const res = response;

  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    res.statusCode = 400;
    res.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  let bodyParams;

  // Read the url string, and search the struct with it
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    bodyParams = query.parse(bodyString);
    urlStruct[httpMethod][pathname](request, response, bodyParams);
  });
};

// Parse the url string, and search the requested methods
const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const { pathname } = parsedURL;
  const httpMethod = request.method;
  const params = query.parse(parsedURL.query);

  if (request.method === 'POST') {
    handlePost(request, response, httpMethod, pathname);
  } else if (urlStruct[httpMethod][pathname]) {
    urlStruct[httpMethod][pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response);
  }
};

// Open the port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const init = () => {
  // create server
  http.createServer(onRequest).listen(port);
};

init();
