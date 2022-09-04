const {validationResult} = require('express-validator')

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
            
        }else{
            res.render('registro',{
                errors : errors.mapped(),
                old : req.body
            })
        }
    }
}