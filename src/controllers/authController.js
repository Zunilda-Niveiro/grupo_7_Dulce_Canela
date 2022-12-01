const { hashSync, compareSync} = require("bcryptjs");
const db = require("../database/models");
const {sendSequelizeError, createError } = require("../helpers");
const { sing } = require("jsonwebtoken");


module.exports = {
    signUp: async (req, res) => {

        const errors = validationResult(req)

        if (errors.isEmpty()) {
            const { nombre, apellido, domicilio, email, contrasena } = req.body
        
            db.User.create({
                firstname: nombre.trim(),
                surname: apellido.trim(),
                address: domicilio.trim(),
                avatar: req.file ? req.file.filename : 'userDefault.png',
                email: email.trim(),
                password: bcryptjs.hashSync(contrasena, 10),
                rol_id: 1,
                createdAt: new Date()
            })
            .then(user => {
                    res.redirect('/users/login') 
                })
            .catch(error => console.log(error))
            
        } else {

            res.render('registro', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

//registrarse
    signIn: async(req, res) => {
        try {
            const { email, contrasena} = req.body;

            if(!email || !contrasena){
                throw createError(404, 'se requiere email y contrasena');
            }
            let user = await db.User.findOne({
                where : {
                    email
                }
            });

        }
    }
}