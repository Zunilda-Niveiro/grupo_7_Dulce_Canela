
const express = require('express');
const router = express.Router();
const {upload} = require('../../middleware/uploadFiles')
const { productos, detalle,remove, agregarProducto, update,getImage } = require('../../controllers/API/apiProductos')
const { editarProductosValidaciones, agregarProductoValidaciones} = require('../../validaciones')

router
    /* PRODUCTOS TODOS */
    .get('/', productos)
    /* CARGA DETALLE DE PRODUCTO */
    .get('/detalle/:id', detalle)

    .post('/productAdd', upload.single('imagen'), agregarProductoValidaciones, agregarProducto)

    .delete('/remove/:id',remove)

    .get('/images/:image',getImage)

module.exports = router;