var express = require('express');
var router = express.Router();

const {login,registro,procesoRegistro} = require('../controllers/userController')

const registroValidacion = require('../validations/registroValidacion')

router
    .get('/registro',registro)

    .get('/login',login)

    .post('/registro', registroValidacion,procesoRegistro)



module.exports = router;