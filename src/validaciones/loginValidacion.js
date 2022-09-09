const {check, body} = require('express-validator');
const users = require('../data/db_Module').loadUsers();
const bcryptjs = require('bcryptjs');

module.exports = [

    check('email')
    .notEmpty().withMessage('Debes introducir un email').bail()
    .isEmail().withMessage('Debe ser un email válido'),

    body('contrasena')
    .notEmpty().withMessage('Debes introducir una contraseña obligatoria').bail()
    .custom((value, {req}) => {
        let user = users.find(user =>user.email === req.body.email.trim() && bcryptjs.compareSync(value, user.contrasena))
        return !!user
    }).withMessage('Email y/o contraseña incorrecto')
]