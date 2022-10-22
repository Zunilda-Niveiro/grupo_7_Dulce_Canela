
const { validationResult } = require('express-validator');
const { loadUsers, storeUsers } = require('../data/db_Module');
const bcryptjs = require('bcryptjs');

const db = require('../database/models')



module.exports = {
    registro: (req, res) => {
        return res.render('registro')
    },

    login: (req, res) => {
        return res.render('login')
    },

    procesoLogin: (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            let { id, nombre, rol, imagen } = loadUsers().find(user => user.email === req.body.email);
            req.session.userLogin = {
                id,
                nombre,
                rol,
                imagen,
            }
            if (req.body.recordarme) {
                res.cookie('DulceCanela', req.session.userLogin, {
                    maxAge: 1000 * 60
                })
            }

            return res.redirect('/')
        } else {
            return res.render('login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

    procesoRegistro: (req, res) => {
        const errors = validationResult(req)
        const { nombre, apellido, domicilio, email, contrasena } = req.body

        if (errors.isEmpty()) {
            db.User.create({
                nombre : nombre.trim(),
                apellido : apellido.trim(),
                domicilio : domicilio.trim(),
                imagen: req.file ? req.file.filename : 'userDefault.png',
                email: email.trim(),
                contrasena: bcryptjs.hashSync(contrasena, 10),
                rol: "user",
            }).then(user =>{
                
            })

            const usuarios = loadUsers();
            const { nombre, apellido, domicilio, email, contrasena } = req.body

            const usuario = {
                id: usuarios[usuarios.length - 1] ? usuarios[usuarios.length - 1].id + 1 : 1,
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                direccion: domicilio.trim(),
                imagen: req.file ? req.file.filename : 'userDefault.png',
                email: email.trim(),
                contrasena: bcryptjs.hashSync(contrasena, 10),
                rol: "user",
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
    },
    perfil: (req, res) => {
        let user = loadUsers().find(user => user.id === req.session.userLogin.id);
        return res.render('perfil', {
            user,
        })
    },
    update: (req, res) => {
        return res.send(req.body)
    },
    logout: (req, res) => {
        req.session.destroy()
        return res.redirect('/')
    },
    administracionUsuarios: (req, res) => {
        const usuarios = loadUsers();
        const users = usuarios.find((users) => users.id === +req.params.id);
        return res.render("administracionUsuarios", {
            users,
        });
    




        const usuario = {
            id: usuarios[usuarios.length - 1] ? usuarios[usuarios.length - 1].id + 1 : 1,
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            direccion: domicilio.trim(),
            imagen: req.file ? req.file.filename : 'userDefault.png',
            email: email.trim(),
            contrasena: bcryptjs.hashSync(contrasena, 10),
            rol: "user",
        }

    
    }

}