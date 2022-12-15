const express = require('express');
const router = express.Router();

const { upload } = require('../../middleware/uploadFiles')
const { procesoLogin, procesoRegistro, verifyEmail } = require('../../controllers/API/apiUser')

// ************ Controller Require ************
const { signUp, signIn } = require('../../controllers/API/authController');
const { uploadUser } = require('../../middleware/uploadFiles');

/* /users */
router
    .post('/signup', uploadUser.single('avatar'), signUp)
    .post('/signin', loginValidacion, signIn)
    .post('/login', procesoLogin)
    .post('/registro', uploadUser.single('imagenUser'), procesoRegistro)
    .post('/verified', verifyEmail) //agregado ruta para validar el email


module.exports = router;

