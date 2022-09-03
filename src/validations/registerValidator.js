const {check, body} = require('express-validator');

module.exports = [
    check('first_name')
    .notEmpty().withMessage('Debes introducir un Nombre'),

    check('last_name')
    .notEmpty().withMessage('Debes introducir un Apellido'),

    body('email')
    .notEmpty().withMessage('Debes introducir un email').bail()
    .isEmail().withMessage('Debe ser un email válido'),

    check('password')
    .notEmpty().withMessage('Debes introducir una contraseña obligatoria').bail()
    .isLength({
            min : 6 ,
            max : 12
            }).withMessage('La contraseña debe ser entre 6 y 12 caracteres de largo'),

    body('password')
    .notEmpty().withMessage('vuelve a ingresar la contraseña').bail()
    .custom((value, {req}) => {
    if (value !== req.body.password){
        return false
    }else{
        return true
    }
    }).withMessage('Las contraseñas no coinciden')

]