// require node libraries
const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegistration(data) {
    let allErrors = {};

    // change empty data fields into empty strings
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.retypePassword = !isEmpty(data.retypePassword) ? data.retypePassword : "";

    // validation checks
    if (validator.isEmpty(data.firstName)) {
        allErrors.firstName = "First name is required";
    }

    if (validator.isEmpty(data.lastName)) {
        allErrors.lastName = "Last name is required";
    }

    if (validator.isEmpty(data.email)) {
        allErrors.email = "Email is required";
    } else if (!validator.isEmail(data.email)) {
        allErrors.email = "Email is invalid";
    }

    if (validator.isEmpty(data.password)) {
        allErrors.password = "Password is required";
    } else if (!validator.isLength(data.password, {min: 8, max: 30})) {
        allErrors.password = "Password must be from 8 and 30 characters in length";
    }

    if (validator.isEmpty(data.retypePassword)) {
        allErrors.retypePassword = "Confirming password is required";
    }

    if (!validator.equals(data.password, data.retypePassword)) {
        allErrors.retypePassword = "Passwords must match";
    }

    return {
        allErrors, // dictionary containing all validation errors
        isValid: isEmpty(allErrors) // true if there are no errors, false if there are errors
    }
}