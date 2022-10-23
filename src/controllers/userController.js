
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

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
        
            db.User.findOne({
                where:{
                    email:req.body.email
                }
            })
                .then(user=>{
                    req.session.userLogin = {
                        id:user.id,
                        nombre:user.firstname,
                        rol:user.rol_id == 1 ? 1 : 2,
                        imagen:user.avatar,
                    }
                    if (req.body.recordarme) {
                        res.cookie('DulceCanela', req.session.userLogin, {
                            maxAge: 1000 * 60
                        })
                    }
                    return res.redirect('/')
                }) 
                .catch(error => console.log(error))
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
    perfil: (req, res) => {
        db.User.findOne({
            where:{
                id:req.session.userLogin.id
            }
        })
        .then(user => {
            return res.render('perfil', {
                user,
                old:user
            })
        })
    },
    update: (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const { nombre, apellido, domicilio, email, contrasena } = req.body
        
            db.User.update({
                firstname: nombre.trim(),
                surname: apellido.trim(),
                address: domicilio.trim(),
                avatar: req.file ? req.file.filename : 'userDefault.png',
                email: email.trim(),
                password: bcryptjs.hashSync(contrasena, 10),
                rol_id: 1,
                updatedAt: new Date()
            },{
                where:{id:req.params.id}
            })
            .then(user => {
                    res.redirect('/users/perfil') 
                })
            .catch(error => console.log(error))
            
        } else {

            res.render('perfil', {
                errors: errors.mapped(),
                old: {
                    firstname: req.body.nombre.trim(),
                    surname: req.body.apellido.trim(),
                    address: req.body.domicilio.trim(),
                    email: req.body.email.trim(),
                    id:req.params.id
                }
            })
        }
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