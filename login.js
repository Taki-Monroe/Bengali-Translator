const express = require('express');
const router = express.Router();
const { authenticateUser } = require('./auth');

// Route to handle GET requests to /login
router.get('/', (req, res) => {
  // Redirect user to dashboard if already logged in
  if (req.session.user) {
    return res.redirect('/dashboard');
  }

  res.sendFile(__dirname + '/public/login.html');
});

// Route to handle POST requests to /login
router.post('/', (req, res) => {
  const { username, password, rememberMe } = req.body;

  // Check if user is authenticated
  const isAuthenticated = authenticateUser(username, password);

  if (isAuthenticated) {
    // Set session user value and redirect to dashboard
    req.session.user = username;

    // Set session expiration to 30 days if "remember me" is checked
    if (rememberMe) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    }

    res.redirect('/dashboard');
  } else {
    // Authentication failed, show error message
    res.status(401).send('Incorrect username or password');
  }
});

module.exports = router;
