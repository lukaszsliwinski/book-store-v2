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
const order = require('./controllers/order.controller');
const history = require('./controllers/history.controller');

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
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// render react app
app.get(['/', '/login', '/register', '/profile', '/books/*', '/cart'], (request, response) => {
  response.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

// endpoints
app.post('/api/search', search);
app.post('/api/register', register);
app.post('/api/login', login);
app.get('/api/get-user', auth, getUser);
app.post('/api/change-password', auth, changePassword);
app.post('/api/book-details', bookDetails);
app.post('/api/order', auth, order);
app.get('/api/history', auth, history);

// execute database connection
dbConnect();

// run server
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}\nenv: ${NODE_ENV}`);
});
