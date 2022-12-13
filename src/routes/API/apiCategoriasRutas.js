
const express = require('express');
const router = express.Router();
const {uploadCat} = require('../../middleware/uploadFiles')
const { categorias , agregarCategorias, getImage, remove, update } = require('../../controllers/API/apiCategorias')
const {categoriaValidaciones} = require('../../validaciones')
/* /api/categorias */
router
    /* CATEGORIAS TODOS */
    .get('/', categorias )

    .post('/agregar', uploadCat.single('image'), categoriaValidaciones, agregarCategorias)

    .patch('/update/:id',uploadCat.single('image'),categoriaValidaciones,update)

    .delete('/delete/:id',remove)

    .get('/images/:image',getImage)
module.exports = router;