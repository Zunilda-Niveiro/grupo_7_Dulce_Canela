const express = require('express');
const router = express.Router();
const { upload } = require('../../middleware/uploadFiles')
const { remove, todosLosUsuarios, unUsuario,getUserImage, verifyEmail, modifyUserTipe } = require('../../controllers/API/apiUser')



/* GET users listing. */

router
  /*   .get('/perfil', perfil)
    .put('/update/:id', update) */
    .delete('/remove/:id', remove)
    .get('/', todosLosUsuarios)
    .get('/:id', unUsuario)
    .patch('/change/:id',modifyUserTipe)
    .get('/images/:image',getUserImage)
    .post('/verified', verifyEmail) //agregado ruta para validar el email


module.exports = router;