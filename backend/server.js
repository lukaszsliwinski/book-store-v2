// required dependencies
const path = require('path');
const express = require('express');
const bp = require('body-parser');

const dbConnect = require('./db/dbConnect');

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

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

// execute database connection
dbConnect();

// run server
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}\nenv: ${NODE_ENV}`);
});