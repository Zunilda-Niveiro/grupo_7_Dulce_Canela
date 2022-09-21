const {check, body} = require('express-validator');
const users = require('../data/db_Module').loadUsers()

module.exports = [
    check('nombre')
    .notEmpty().withMessage('Debes introducir un Nombre'),

    check('apellido')
    .notEmpty().withMessage('Debes introducir un Apellido'),

    check('domicilio')
    .notEmpty().withMessage('debes introducir una direccion'),

    body('email')
    .notEmpty().withMessage('Debes introducir un email').bail()
    .isEmail().withMessage('Debe ser un email válido').bail()
    .custom((value, {req})=>{
        let user = users.find(user=> user.email === value.trim())
        if(user){
            return false
        }else{
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