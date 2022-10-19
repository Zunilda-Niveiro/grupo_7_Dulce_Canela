var express = require('express');
var router = express.Router();
const { loginValidacion, registroValidacion } = require('../validaciones');

const { uploadUser } = require('../middleware/uploadFiles')
const { login, registro, procesoRegistro, procesoLogin,perfil,logout,update,administracionUsuarios } = require('../controllers/userController');
const userSessionCheck = require('../middleware/userSessionCheck');


/* GET users listing. */

router
    .get('/registro', registro)
    .post('/registro', uploadUser.single('imagenUser'), registroValidacion, procesoRegistro)
    .get('/login', login)
    .post('/login', loginValidacion, procesoLogin)
    .get('/perfil',userSessionCheck,perfil)
    .get('/logout',logout)
    .put('/update/:id',update)
    .get('/administracionUsuarios',userSessionCheck, administracionUsuarios)
    



module.exports = router;