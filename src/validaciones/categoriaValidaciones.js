const {check, body} = require('express-validator');

module.exports = [
    check('name')
    .notEmpty().withMessage('Debes introducir nombre del producto').bail()
    .isLength({ min : 5 }).withMessage('El nombre debe tener al menos 5 caracteres de largo'),
    
    body('image')
    .custom((value, {req}) => { 
        const fileType = ['jpeg','jpg','png','gif']
        const fileExtension = req.file.mimetype.split('/').pop()        
     
        if (fileType.includes(fileExtension)) {
                return true
            } else{
            
                return false
            } 
     }).withMessage('Debes cargar una imagene valida')
]