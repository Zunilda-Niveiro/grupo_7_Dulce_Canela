const express = require('express');
const router = express.Router();
const { upload } = require('../../middleware/uploadFiles')
const { perfil, update, remove, verifyEmail } = require('../../controllers/API/apiUser')



/* GET users listing. */

router
    .get('/perfil', perfil)
    .put('/update/:id', update)
    .delete('/remove/:id', remove)
    .post('/verified', verifyEmail) //agregado ruta para validar el email


module.exports = router;