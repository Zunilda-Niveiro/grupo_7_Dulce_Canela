const {check, body} = require('express-validator');

module.exports = [
    check('nombre')
    .notEmpty().withMessage('Debes introducir nombre del producto').bail()
    .isLength({ min : 5 }).withMessage('El nombre debe tener al menos 5 caracteres de largo'),

    check('detalle')
    .notEmpty().withMessage('Debes introducir detalle del producto').bail()
    .isLength({ min : 20 }).withMessage('El detalle debe tener al menos 20 caracteres de largo'),

    check('marca')
    .notEmpty().withMessage('Debes introducir una marca'),

    check('precio')
    .notEmpty().withMessage('Debes introducir el valor')
    .isNumeric().withMessage('Debes ingesar solo números'),

    check('cantidad')
    .notEmpty().withMessage('Debes introducir cantidad'),

    check('categoria')
    .notEmpty().withMessage('Debes seleccionar una categoria'),
    
    body('imagen')
    .custom((value, {req}) => {
        const fileExtension = req.file.mimetype.split('/').pop()
        const fileType = ['jpeg','jpg','png','gif']
        if (req.file && fileType.includes(fileExtension) ) {
            return true
        } else {
            return false
        }
    }).withMessage('Debes cargar una imagen valida')
]