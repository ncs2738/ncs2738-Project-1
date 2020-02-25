
const http = require('http');
const url = require('url');
const query = require('querystring');
const fs = require('fs');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// urlStruct
const urlStruct = 
{
	'GET'  : 
	{
		'/' : htmlHandler.getIndex,
		'/style.css' : htmlHandler.getCSS,
		'/getDate' : jsonHandler.handlerGetDate,
		//'/getRandomJoke' : 
	},
	'POST' : {
		//'/addJoke' : handlerAddJoke,
	},
	'HEAD' : {},
	notFound: jsonHandler.notFound,
};

//onRequest
const onRequest = (request, response) =>
{
	const parsedURL = url.parse(request.url);
	const pathname = parsedURL.pathname;
	const httpMethod = request.method;
	const params = query.parse(parsedURL.query);

	console.log(`pathname = ${pathname}`);
	console.log(`httpMethod = ${httpMethod}`);
	console.log(`params = ${Object.keys(params)}`);

	if(urlStruct[httpMethod][pathname])
	{
		urlStruct[httpMethod][pathname](request, response, params);
	}
	else
	{
		urlStruct.notFound(request,response);
	}
}

let init = () => 
{
	// create server
	http.createServer(onRequest).listen(port);
	console.log(`Listening on 127.0.0.1: ${port}`);
}

init();