const {validationResult} = require('express-validator');
const {loadUsers, storeUsers} = require('../data/db_Module');
const bcryptjs = require('bcryptjs');



module.exports = {
    registro:(req,res) => {
        return res.render('registro')
    },

    processRegister:(req,res) => {
    let errors = validationResult(req)
        if(errors.isEmpty()) {
            const {} = req.body
            let users =loadUsers()

            let newUser = {
                id : users.length > 0 ? users[users.length - 1].id + 1 : 1,
                first_name : fisrt_name.trim(),
                last_name : last_name.trim(),
                email : email.trim(),
                password : bcryptjs.hashSync(password,12),
                username : username.trim(),
                rol : 'user',
                avatar : null 
            }
        }

    },
    login : (req,res) => {
        return res.render('login')
    },


}