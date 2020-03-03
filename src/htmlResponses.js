const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const vue = fs.readFileSync(`${__dirname}/VueHandler.js`);
const components = fs.readFileSync(`${__dirname}/VueComponents.js`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getScript = (request, response, fileName) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(fileName);
  response.end();
};

const getVue = (request, response) => {
  getScript(request, response, vue);
};

const getComponents = (request, response) => {
  getScript(request, response, components);
};

module.exports = {
  getIndex,
  getCSS,
  getVue,
  getComponents,
};
