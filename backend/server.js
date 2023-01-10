// required dependencies
const path = require('path');
const express = require('express');
const bp = require('body-parser');

// import database connection
const dbConnect = require('./config/db.config');

// import auth middleware
const auth = require('./middleware/auth.middleware');

// import controllers
const search = require('./controllers/search.controller');
const register = require('./controllers/register.controller');
const login = require('./controllers/login.controller');
const getUser = require('./controllers/getUser.controller');
const changePassword = require('./controllers/changePassword.controller');
const bookDetails = require('./controllers/bookDetails.controller');

// create express app
const app = express();

// dotenv package
require('dotenv').config();

// port number
const PORT = process.env.PORT || 3001;

// environment
const NODE_ENV = process.env.NODE_ENV;

// middleware
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../frontend/build')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// render react app
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
// });

// endpoints
app.post('/search', search);
app.post('/register', register);
app.post('/login', login);
app.get('/get-user', auth, getUser);
app.post('/change-password', auth, changePassword);
app.post('/book-details', bookDetails);

// execute database connection
dbConnect();

// run server
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}\nenv: ${NODE_ENV}`);
});
