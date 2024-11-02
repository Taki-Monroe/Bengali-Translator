const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const translationRouter = require('./translation');
const loginRouter = require('./login');
const dashboardMiddleware = require('./dashboard');
const registerRouter = require('./register');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up sessions with longer expiration time for "remember me" functionality
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  }
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Parse incoming JSON requests
app.use(express.json());

// Serve the public directory
app.use(express.static(__dirname + '/public'));

// Middleware to check if user is logged in
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

// Mount the translation router
app.use('/', translationRouter);

// Mount the login router
app.use('/login', loginRouter);

// Mount the dashboard middleware with requireLogin middleware
app.use('/dashboard', requireLogin, dashboardMiddleware);

// Mount the register router
app.use('/register', registerRouter);

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/login');
  });
});

// Redirect root to dashboard if user is logged in, otherwise redirect to login page
app.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});