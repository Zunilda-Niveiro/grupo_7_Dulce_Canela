const { validationResult } = require('express-validator');
const { loadUsers, storeUsers } = require('../data/db_Module');
const bcryptjs = require('bcryptjs');



module.exports = {
    registro: (req, res) => {
        return res.render('registro')
    },

    login: (req, res) => {
        return res.render('login')
    },

<<<<<<< HEAD
    procesoLogin: (req, res) => {
=======
    procesoLogin : (req,res) =>{
        const errors = validationResult(req)

        if(errors.isEmpty()){
            let usuario = loadUsers().find(usuario => usuario.email === req.body.email)
            const {recordarme} = req.body
            req.session.userLogin = usuario
            if(recordarme){
            res.cookie('DulceCanela', req.session.userLogin,{maxAge:1000*60})
            }
            return res.redirect('/')
        }else{
            return res.render('login', {
                errors :errors.mapped()
            })
        }
    },

    procesoRegistro : (req,res) => {
>>>>>>> 08730cb25301fc501d81a34091525b96222dbb42
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            let usuario = loadUsers().find(usuario => usuario.email === req.body.email)
            const { recordarme } = req.body
            req.session.userLogin = usuario
            if (recordarme) {
                res.cookie('DulceCanela', req.session.userLogin, { maxAge: 1000 * 60 })
            }
            return res.redirect('/')
        } else {
            return res.render('login', {
                errors: errors.mapped()
            })
        }
    },

    procesoRegistro: (req, res) => {
        const errors = validationResult(req)

        if (errors.isEmpty()) {

            const usuarios = loadUsers();
            const { nombre, apellido, domicilio, email, contrasena } = req.body


            const usuario = {
                id: usuarios[usuarios.length - 1] ? usuarios[usuarios.length - 1].id + 1 : 1,
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                direccion: domicilio.trim(),
                imagen: req.file ? req.file.filename : 'userDefault.png',
                email: email.trim(),
<<<<<<< HEAD
                contrasena: bcryptjs.hashSync(contrasena, 10),
                rol: "user",
=======
                contrasena: bcryptjs.hashSync(contrasena,10),
                rol:"user",
>>>>>>> 08730cb25301fc501d81a34091525b96222dbb42
            }

            const usuariosTodos = [...usuarios, usuario]
            storeUsers(usuariosTodos)
            res.redirect('/')
        } else {

            res.render('registro', {
                errors: errors.mapped(),
                old: req.body

            })
        }
    }

}