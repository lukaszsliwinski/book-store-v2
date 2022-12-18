const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect() {
    mongoose.set('strictQuery', true);
    mongoose
        .connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('connected to db'))
        .catch((err) => {
            console.log('unable to connect to db');
            console.error(err);
        });
};

module.exports = dbConnect;