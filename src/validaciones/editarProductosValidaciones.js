const {check, body} = require('express-validator');
module.exports = [
    check('name')
    .notEmpty().withMessage('Debes introducir nombre del producto'),

    check('brand')
    .notEmpty().withMessage('Debes introducir una marca'),

    check('price')
    .notEmpty().withMessage('Debes introducir el valor')
    .isNumeric().withMessage('Debes ingesar solo números'),

    check('amount')
    .notEmpty().withMessage('Debes introducir cantidad'),

    check('category')
    .notEmpty().withMessage('Debes seleccionar una categoria'),
    
    check('detail')
    .notEmpty().withMessage('Debes seleccionar una categoria'),
]