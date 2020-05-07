// require node libraries
const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLogin(data) {
    let allErrors = {};

    // change empty data fields into empty strings
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // validation checks
    if (validator.isEmpty(data.email)) {
        allErrors.email = "Email is required";
    } else if (!validator.isEmail(data.email)) {
        allErrors.email = "Email is invalid";
    }

    if (validator.isEmpty(data.password)) {
        allErrors.password = "Password is required";
    }

    return {
        allErrors, // dictionary containing all validation errors
        isValid: isEmpty(allErrors) // true if there are no errors, false if there are errors
    }
}