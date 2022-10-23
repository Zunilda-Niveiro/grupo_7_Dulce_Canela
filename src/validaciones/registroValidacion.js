const {check, body} = require('express-validator');
const db = require('../database/models')

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
        return db.User.findOne({
            where: {
                email:value
            }
        }).then(user => {
            if(user){
                return Promise.reject
            }
        }).catch(() => Promise.reject('El email ya se encuentra registrado'))

    }),

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