// Variable for storing users
const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// a user was posted to the server
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  // Default to a 201 code
  const responseCode = 201;


  // Check if a password and username were entered; if not, error out
  if (!body.username || !body.password) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // if that user's name already exists in our object
  // error out; bad username. need a new one
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

  // Respond successfully
  responseJSON.message = 'Created Successfully';
  return respondJSON(request, response, responseCode, responseJSON);
};

// Get the users logins; used for logging into the site
const getUsers = (request, response, params) => {
  const responseJSON = {
    message: 'Invalid log-in!',
  };

  // Check if there are any users first
  if (Object.keys(users).length > 0) {
    // Check if a valid name and password are entered
    if (params.username === users[params.username].username
      && params.password === users[params.username].password) {
      // One was, so return successful
      responseJSON.message = 'Successfully logged in!';
      return respondJSON(request, response, 200, responseJSON);
    }
  }

  // Invalid login; return bad request
  responseJSON.id = 'badRequest';
  return respondJSON(request, response, 400, responseJSON);
};


// Used for posting schedules
// This function literally ruined my life
const addSchedule = (request, response, body) => {
  const responseJSON = {
    message: 'Successfully added to the schedule!',
  };

  // if the user's not logged in,
  // error out
  if (!users[body.username]) {
    responseJSON.id = 'badRequest';
    responseJSON.message = 'Error; not logged in';
    return respondJSON(request, response, 400, responseJSON);
  }

  // Default the status code to 201
  let responseCode = 201;

  // Check if the user's already made a schedule
  if (users[body.username].schedule) {
    // They have, so update it
    responseCode = 204;
  } else {
  // otherwise create an object for the user
    users[body.username].schedule = {};
  }

  // update the user's database
  users[body.username].schedule = body.schedule;

  // Send back the data; used for updating the vue table
  responseJSON.schedule = users[body.username].schedule;

  // Respond succesffuly
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
  }
  return respondJSON(request, response, responseCode, responseJSON);
};

// Used for getting the user's schedule
const getSchedule = (request, response, params) => {
  const responseJSON = {
    message: 'No schedule found!',
  };

  // If the user doesn't have a schedule, return a bad request
  if (!users[params.username].schedule) {
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  // The user's got one, so respond successfully.
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
