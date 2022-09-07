const {validationResult} = require('express-validator')
const {loadUsers,storeUsers} = require('../data/db_Module')
const bcrypt =require('bcryptjs')


module.exports = {
    registro:(req,res) => {
        return res.render('registro')
    },
    login : (req,res) => {
        return res.render('login')
    },
    procesoRegistro : (req,res) => {
        const errors = validationResult(req)

        if (errors.isEmpty()) {

            const usuarios = loadUsers();
            const{nombre,apellido,domicilio,email,contrasena} = req.body
        
                
            const usuario = {
                id: usuarios[usuarios.length - 1] ? usuarios[usuarios.length - 1].id + 1 : 1,
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                direccion: domicilio.trim(),
                imagen: req.file ? req.file.filename : 'userDefault.png',
                email: email.trim(),
                contrasena: bcrypt.hashSync(contrasena,10),
                rol:"user",
            }

            const usuariosTodos = [...usuarios,usuario]
            storeUsers(usuariosTodos)
            res.redirect('/')
        }else{

            res.render('registro',{
                errors : errors.mapped(),
                old : req.body
                
            })
        }
    }
}