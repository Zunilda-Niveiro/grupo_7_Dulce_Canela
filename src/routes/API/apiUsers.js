var express = require('express');
var router = express.Router();

const { verifyEmail } = require('../../controllers/API/apiUser');



/* GET users listing. */

router
    .post('/verified', verifyEmail) //agregado ruta para validar el email


module.exports = router;