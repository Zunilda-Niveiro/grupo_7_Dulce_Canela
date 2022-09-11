var express = require('express');
var router = express.Router();
const {loginValidacion, registroValidacion} = require('../validaciones');

const {uploadUser} = require('../middleware/uploadFiles')
const {login,registro,procesoRegistro, procesoLogin} = require('../controllers/userController')


/* GET users listing. */

router
    .get('/registro',registro)
    .get('/login',login)
    .post('/login',loginValidacion,procesoLogin)
    .post('/registro',uploadUser.single('imagenUser'),registroValidacion,procesoRegistro)



module.exports = router;