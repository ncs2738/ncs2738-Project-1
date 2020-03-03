const fs = require('fs');

// Read in the files
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
// Javascript files
const vue = fs.readFileSync(`${__dirname}/VueHandler.js`);
const components = fs.readFileSync(`${__dirname}/VueComponents.js`);

// Get the index page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// Get the css
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// Returns a script
const getScript = (request, response, fileName) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(fileName);
  response.end();
};

// Gets the vue file
const getVue = (request, response) => {
  getScript(request, response, vue);
};

// Gets the vue components
const getComponents = (request, response) => {
  getScript(request, response, components);
};

module.exports = {
  getIndex,
  getCSS,
  getVue,
  getComponents,
};
