const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  const responseCode = 201;

  // check to make sure we have both fields
  // We might want more validation than just checking if they exist
  // This could easily be abused with invalid types (such as booleans, numbers, etc)
  // If either are missing, send back an error message as a 400 badRequest
  if (!body.username || !body.password) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // if that user's name already exists in our object
  // then switch to a 204 updated status
  if (users[body.username]) {
    responseJSON.id = 'badRequest';
    responseJSON.message = "We're sorry; that username already exists. Please choose another!";
    return respondJSON(request, response, 400, responseJSON);
  }
  // otherwise create an object with that name
  users[body.username] = {};


  // add the fields for this username and password
  users[body.username].username = body.username;
  users[body.username].password = body.password;

  responseJSON.message = 'Created Successfully';
  return respondJSON(request, response, responseCode, responseJSON);
};

const getUsers = (request, response, params) => {
  const responseJSON = {
    message: 'Invalid log-in!',
  };

  if (Object.keys(users).length > 0) {
    for (const user in users) {
      if (params.username === users[user].username && params.password === users[user].password) {
        responseJSON.message = 'Successfully logged in!';
        return respondJSON(request, response, 200, responseJSON);
      }
    }
  }

  responseJSON.id = 'badRequest';
  return respondJSON(request, response, 400, responseJSON);
};


const addSchedule = (request, response, body) => {
  const responseJSON = {
    message: 'Successfully added to the schedule!',
  };

  console.log(body);

  // if that user's name already exists in our object
  // then switch to a 204 updated status
  if (!users[body.username]) {
    responseJSON.id = 'badRequest';
    responseJSON.message = 'Error; not logged in';
    return respondJSON(request, response, 400, responseJSON);
  }


  let responseCode = 201;

  if (users[body.username].schedule) {
    responseCode = 204;
  } else {
    // otherwise create an object with that name
    users[body.username].schedule = {};
  }

  // add the fields for this username and password
  users[body.username].schedule = body.schedule;

  responseJSON.schedule = users[body.username].schedule;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
  }
};


const getSchedule = (request, response, params) => {
  const responseJSON = {
    message: 'No schedule found!',
  };

  if (!users[params.username].schedule) {
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  responseJSON.message = 'Schedule found!';
  responseJSON.schedule = users[params.username].schedule;
  return respondJSON(request, response, 200, responseJSON);
};

module.exports = {
  addUser,
  addSchedule,
  getUsers,
  getSchedule,
};
