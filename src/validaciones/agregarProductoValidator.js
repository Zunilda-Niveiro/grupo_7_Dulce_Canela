const {check, body} = require('express-validator');
const users = require('../data/db_Module').loadUsers();
const bcryptjs = require('bcryptjs');

module.exports = [
    check('nombre')
    .notEmpty().withMessage('Debes introducir nombre del producto'),

    check('marca')
    .notEmpty().withMessage('Debes introducir una marca'),

    check('precio')
    .notEmpty().withMessage('Debes introducir el valor')
    .isNumeric().withMessage('Debes ingesar solo números'),

    check('cantidad')
    .notEmpty().withMessage('Debes introducir cantidad'),

    check('categoria')
    .notEmpty().withMessage('Debes seleccionar una categoria'),

    check('imagen')
    .notEmpty().withMessage('Debes introducir una imagen'),
]