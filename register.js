// register.js

const express = require('express');
const router = express.Router();
const { addUser, users } = require('./users');

router.get('/', (req, res) => {
  res.sendFile('register.html', { root: 'public', dotfiles: 'allow' });
});

router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    res.status(409).send('User already exists');
  } else {
    addUser(username, password);
    // Set session user value and redirect to login
    req.session.user = username;
    res.redirect('/login');
  }
});

module.exports = router; 