// require node libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

// routes
const users = require('./routes/api/users');
const rooms = require('./routes/api/rooms');

// const variables
const PORT = 3005;
const DB_CONNECTION = process.env.DB_CONNECTION;

const app = express();

// set up body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

// passport
app.use(passport.initialize());
require('./config/passport') (passport);

app.use('/users', users);
app.use('/rooms', rooms);

mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB: successfully connected!'))
    .catch(err => console.log(err));

/* API endpoints */
// /helloworld - returns the DB connection URI
app.get('/helloworld', (request, response) => {
    response.json({ template: DB_CONNECTION });
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));