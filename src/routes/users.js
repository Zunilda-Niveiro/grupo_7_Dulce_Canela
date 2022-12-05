var express = require('express');
var router = express.Router();
const { loginValidacion, registroValidacion } = require('../validaciones');

const { uploadUser } = require('../middleware/uploadFiles')
<<<<<<< HEAD
const { login, registro, procesoRegistro, procesoLogin, perfil, logout, update, administracionUsuarios } = require('../controllers/userController');
=======
const { login, registro, procesoRegistro, procesoLogin,perfil,logout,update, verifyEmail } = require('../controllers/userController');
>>>>>>> 184f964de688cd56b437b72c89a37b0389a0c2da
const userSessionCheck = require('../middleware/userSessionCheck');


/* GET users listing. */

router
    .get('/registro', registro)
    .post('/registro', uploadUser.single('imagenUser'), registroValidacion, procesoRegistro)
    .get('/login', login)
    .post('/login', loginValidacion, procesoLogin)
<<<<<<< HEAD
    .get('/perfil', userSessionCheck, perfil)
    .get('/logout', logout)
    .put('/update/:id', uploadUser.single('imagenUser'), registroValidacion, update)

=======
    .get('/perfil',userSessionCheck,perfil)
    .get('/logout',logout)
    .put('/update/:id', uploadUser.single('imagenUser'), registroValidacion,update)
    .get('/verified', verifyEmail) //agregado ruta para validar el email
>>>>>>> 184f964de688cd56b437b72c89a37b0389a0c2da


module.exports = router;