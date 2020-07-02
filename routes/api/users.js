// require node libraries
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const validateRegistration = require('../../validation/register');
const validateLogin = require('../../validation/login');
const User = require('../../models/User');

// register API endpoint
router.post('/register', (request, response) => {
    const {errors, isValid} = validateRegistration(request.body);

    if (!isValid) {
        return response.status(400).json(errors);
    }

    User.findOne({email: request.body.email}).then(user => {
        if (user) {
            return response.status(400).json({email: "This email is already in use"});
        }

        const newUser = new User({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    throw err;
                }
                newUser.password = hash;
                newUser.save()
                    .then(user => response.json(user))
                    .catch(err => console.log(err));
            });
        });
    });
});

// login API endpoint
router.post('/login', (request, response) => {
    const { errors, isValid } = validateLogin(request.body);

    if (!isValid) {
        return response.status(400).json(errors);
    }

    const email = request.body.email;
    const password = request.body.password;

    User.findOne({email}).then(user => {
        if (!user) {
            return response.status(404).json({email: "Email not found"});
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };

                jwt.sign(
                    payload,
                    process.env.SECRET_OR_KEY,
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        response.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return response.status(400).json({password: "Password is incorrect"});
            }
        })
    })
});

router.get('/find/:userId', (request, response) => {
    const userId = request.params.userId;

    User.findById(userId)
        .then(user => {
            if (user) return response.status(200).json(user);
            return response.status(404).json({error: "User not found"});
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/all', (request, response) => {

    User.find({}, function(err, users) {
        return response.status(200).json(users);
    });
});

module.exports = router;