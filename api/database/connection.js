const {Client} = require('pg');
const path = require('path');
require('dotenv').config();

/*
var connection = mysql.createConnection({
//    debug: true,

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});
*/

const connection = new Client({
//    debug: true,

    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE 
});
connection.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Successful connection on port ${process.env.PORT}`);
    }
});

module.exports = connection;
