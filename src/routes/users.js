var express = require('express');
var router = express.Router();
const {uploadUser} = require('../middleware/uploadFiles')

const {login,registro,procesoRegistro} = require('../controllers/userController')

const registroValidacion = require('../validations/registroValidacion')

router
    .get('/registro',registro)

    .get('/login',login)

    .post('/registro',uploadUser.single('imagenUser'),registroValidacion,procesoRegistro)



module.exports = router;