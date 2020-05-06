// require node libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

// const variables
const PORT = 3005;
const DB_CONNECTION = process.env.DB_CONNECTION;

const app = express();

// set up body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB: successfully connected!"))
    .catch(err => console.log(err));

/* API endpoints */
// /helloworld - returns the DB connection URI
app.get('/helloworld', (request, response) => {
    response.json({ template: DB_CONNECTION });
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));