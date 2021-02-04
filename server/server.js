/* Require */
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');


const app = express();

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(require('./routes/index'));

mongoose
    .connect(
        config.urlDB, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        }
    ).then(() => console.log(`URL DB: ${config.urlDB}`))
    .catch(err => console.log(err.message));


app.listen(config.port, () => {

    console.log(`API Server Listening on http://localhost:${config.port}`);
    console.log(`Environment: ${config.dev}`);

});