const express = require('express');
const router = express.Router();
const { upload } = require('../../middleware/uploadFiles')
const { login, registro, procesoRegistro, procesoLogin, perfil, logout, update, verifyEmail } = require('../../controllers/API/apiUsers')
const { editarProductosValidaciones, agregarProductoValidaciones } = require('../../validaciones')



/* GET users listing. */

router
    .get('/registro', registro)
    .post('/registro', uploadUser.single('imagenUser'), registroValidacion, procesoRegistro)
    .get('/login', login)
    .post('/login', loginValidacion, procesoLogin)
    .get('/perfil', userSessionCheck, perfil)
    .get('/logout', logout)
    .put('/update/:id', uploadUser.single('imagenUser'), registroValidacion, update)

    .post('/verified', verifyEmail) //agregado ruta para validar el email


module.exports = router;