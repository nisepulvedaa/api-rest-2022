const {check } = require('express-validator');
const validateResults  = require('../utils/handleValidators');

const validatorRegister = [
    check("name")
    .exists()
    .notEmpty()
    .isLength({min:3, max:99}),
    check("edad")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("password")
    .exists()
    .notEmpty()
    .isLength({min:3, max:15}),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    (req, res, next) => {
        return validateResults(req,res,next);
    }
    //.isLength({min:5, max: 90}),
];


const validatorLogin = [
    check("password")
    .exists()
    .notEmpty()
    .isLength({min:3, max:15}),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    (req, res, next) => {
        return validateResults(req,res,next);
    }
    //.isLength({min:5, max: 90}),
];


module.exports = {validatorRegister,validatorLogin};
