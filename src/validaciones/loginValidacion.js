const {check, body} = require('express-validator');
const db = require('../database/models')
const bcryptjs = require('bcryptjs');

module.exports = [

    check('email')
    .notEmpty().withMessage('Debes introducir un email').bail()
    .isEmail().withMessage('Debe ser un email válido'),

    body('contrasena')
    .notEmpty().withMessage('Debes introducir una contraseña obligatoria').bail()
    .custom((value, {req}) => {
        
        return db.User.findOne({
            where: {
                email : req.body.email
            }
        }).then(user => {
            console.log('>>>>>>>>>>>>>' + bcryptjs.compareSync(value, user.password))
            if(!user || !bcryptjs.compareSync(value, user.password)){
                return Promise.reject()
            }
        }).catch(() => Promise.reject('Email y/o contraseña incorrecto'))

    })
]