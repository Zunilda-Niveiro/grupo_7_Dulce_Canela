var express = require('express');
var router = express.Router();
const {loginValidacion, registroValidacion} = require('../validaciones');

const {uploadUser} = require('../middleware/uploadFiles')
const {login,registro,procesoRegistro, procesoLogin} = require('../controllers/userController')


/* GET users listing. */

router
    .get('/registro',registro)
<<<<<<< HEAD
    .get('/login',login)
    .post('/login',loginValidacion,procesoLogin)
    .post('/registro',uploadUser.single('imagenUser'),registroValidacion,procesoRegistro)
=======

    .post('/registro',uploadUser.single('imagenUser'),registroValidacion,procesoRegistro)

    .get('/login',login)

    .post('/login', loginValidacion, procesoLogin)

    
>>>>>>> 08730cb25301fc501d81a34091525b96222dbb42



module.exports = router;