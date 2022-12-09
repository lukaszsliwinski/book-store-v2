// required dependencies
const path = require('path');
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
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

// connect to db and run server
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://bookstorev2:jYAy3buifJzJkfvEwurT@127.0.0.1:27017/bookstoreDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => {
        app.listen(PORT, () => {
            console.log(`connected to db\nserver listening on ${PORT}\nenv: ${NODE_ENV}`);
        });
    })
    .catch(err => console.log(err))