const { addUser, getUser } = require('./users');

function authenticateUser(username, password) {
  const user = getUser(username);

  if (user && user.password === password) {
    return true;
  }

  return false;
}

module.exports = {
  authenticateUser,
};
