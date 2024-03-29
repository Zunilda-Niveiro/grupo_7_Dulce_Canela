const {check, body} = require('express-validator');

module.exports = [
    check('name')
    .notEmpty().withMessage('Debes introducir nombre del producto').bail()
    .isLength({ min : 5 }).withMessage('El nombre debe tener al menos 5 caracteres de largo'),

    check('detail')
    .notEmpty().withMessage('Debes introducir detalle del producto').bail()
    .isLength({ min : 20 }).withMessage('El detalle debe tener al menos 20 caracteres de largo'),

    check('brand')
    .notEmpty().withMessage('Debes introducir una marca'),

    check('price')
    .notEmpty().withMessage('Debes introducir el valor')
    .isNumeric().withMessage('Debes ingesar solo números'),

    check('amount')
    .notEmpty().withMessage('Debes introducir cantidad'),

    check('category')
    .notEmpty().withMessage('Debes seleccionar una categoria'),
    
    body('image')
    .custom((value, {req}) => {
        let imagenes = req.files
        const fileType = ['jpeg','jpg','png','gif']
        let bandera=true;
        if (imagenes.length >= 4) {
            return false
        }
        imagenes.forEach(imagen => {
            const fileExtension = imagen.mimetype.split('/').pop()
         
            if (!(fileType.includes(fileExtension)) ) {
                bandera=false
                return false
            } 
        });
        return bandera
     }).withMessage('Debes cargar entre 1 y 3 imagenes validas')
]