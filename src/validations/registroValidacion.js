const {body,check} = require('express-validator')
const{loadUsers} = require('../data/db_Module')

module.exports = [
    check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({
        min : 3
    }).withMessage('Mínimo 3 caracteres').bail(),

check('apellido')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isLength({
        min : 3
    }).withMessage('Mínimo 3 caracteres').bail(),
    
check('domicilio')
    .notEmpty().withMessage('El domicilio es obligatorio'),

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
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({
        min : 6, 
        max : 12
    }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

body('contrasena2')
    .notEmpty().withMessage('Debes confirmar la contraseña').bail()
    .custom((value,{req}) => {
        if(value !== req.body.contrasena){
            return false
        }
        return true
    }).withMessage('Las contraseñas no coinciden'),
]