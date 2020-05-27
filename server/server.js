/* Require */
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');


const app = express();
/*revisar*/
// app.use(express.json());

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

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