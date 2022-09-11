const {check, body} = require('express-validator');
const {loadUsers} = require('../data/db_Module')
 
module.exports = [
    check('nombre')
    .notEmpty().withMessage('Debes introducir un Nombre'),

    check('apellido')
    .notEmpty().withMessage('Debes introducir un Apellido'),

    check('domicilio')
    .notEmpty().withMessage('Debes introducir un domicilio'),


    body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ser un email válido').bail()
    .custom((value, {req}) => {
        const user = loadUsers().find(user => user.email === value);

        if(user){
            return false
        }else {
            return true
        }
    }).withMessage('El email ya se encuentra registrado'),

    check('contrasena')
    .notEmpty().withMessage('Debes introducir una contraseña obligatoria').bail()
    .isLength({
            min : 6 ,
            max : 12
            }).withMessage('La contraseña debe ser entre 6 y 12 caracteres de largo'),

    body('contrasena2')
    .notEmpty().withMessage('vuelve a ingresar la contraseña').bail()
    .custom((value, {req}) => {
    if (value !== req.body.contrasena){
        return false
    }else{
        return true
    }
    }).withMessage('Las contraseñas no coinciden')

]