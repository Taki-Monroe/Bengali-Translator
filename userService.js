// userService.js
function getCurrentUser(req) {
  return req.session.user;
}

module.exports = { getCurrentUser };