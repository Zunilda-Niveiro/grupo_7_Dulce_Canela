const express = require('express');
const router = express.Router();
const { upload } = require('../../middleware/uploadFiles')
const { procesoLogin, procesoRegistro, verifyEmail } = require('../../controllers/API/apiUsers')



/* GET users listing. */

router
    .post('/login', procesoLogin)
    .post('/registro', uploadUser.single('imagenUser'), procesoRegistro)


    .post('/verified', verifyEmail) //agregado ruta para validar el email


module.exports = router;