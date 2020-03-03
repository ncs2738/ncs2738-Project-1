
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const userHandler = require('./usersResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, httpMethod, pathname) => {
  const res = response;

  // uploads come in as a byte stream that we need
  // to reassemble once it's all arrived
  const body = [];

  // if the upload stream errors out, just throw a
  // a bad request and send it back
  request.on('error', (err) => {
    console.dir(err);
    res.statusCode = 400;
    res.end();
  });

  // on 'data' is for each byte of data that comes in
  // from the upload. We will add it to our byte array.
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  let bodyParams;

  // on end of upload stream.
  request.on('end', () => {
    // combine our byte array (using Buffer.concat)
    // and convert it to a string value (in this instance)
    const bodyString = Buffer.concat(body).toString();
    // since we are getting x-www-form-urlencoded data
    // the format will be the same as querystrings
    // Parse the string into an object by field name
    bodyParams = query.parse(bodyString);
    urlStruct[httpMethod][pathname](request, response, bodyParams);
  });
};

// urlStruct
const urlStruct = {
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
  POST:
  {
    '/addUser': userHandler.addUser,
    '/addSchedule': userHandler.addSchedule,
  },
  HEAD:
  {

  },
  notFound: jsonHandler.notFound,
};

// onRequest
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

const init = () => {
  // create server
  http.createServer(onRequest).listen(port);
  console.log(`Listening on 127.0.0.1: ${port}`);
};

init();
