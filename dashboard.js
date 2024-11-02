const express = require('express');
const router = express.Router();
const fs = require('fs');

// Middleware function for the dashboard page
const dashboardMiddleware = (req, res) => {
  res.render('dashboard');
};

// Mount the middleware function for the dashboard route
router.get('/', dashboardMiddleware);

// Middleware function for the overview page
const overviewMiddleware = (req, res) => {
  const username = req.session.user;
  const userData = JSON.parse(fs.readFileSync('./userData.json', 'utf8'));
  const user = userData.find((u) => u.username === username);
  const patternCount = user.patterns;
  res.render('overview', { username: username, patternCount: patternCount });
};


// Mount the middleware function for the overview route
router.get('/overview', overviewMiddleware);

const addPatternMiddleware = (req, res) => {
  res.render('add-pattern');
};

// Mount the middleware function for the add pattern dashboard route
router.get('/add-pattern', addPatternMiddleware);

module.exports = router;
