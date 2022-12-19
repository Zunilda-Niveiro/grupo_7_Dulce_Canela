
const express = require('express');
const router = express.Router();
const {upload} = require('../../middleware/uploadFiles')
const { productos, detalle,remove, agregarProducto, update ,getImage, guardarImg, deleteImg } = require('../../controllers/API/apiProductos')
const {agregarProductoValidaciones,editarProductosValidaciones} = require('../../validaciones')
/* /api/productos */
router
    /* PRODUCTOS TODOS */
    .get('/', productos)

    /* CARGA DETALLE DE PRODUCTO */
    .get('/detalle/:id', detalle)
    
    /*GUARDADO DE PRODUCTO*/
    .post('/productAdd', upload.array('image'), agregarProductoValidaciones, agregarProducto)

    /*ACTUALIZACION DE PRODUCTO*/
    .put('/update/:id',upload.array('image'),editarProductosValidaciones,update)

    /*ELIMINACIÓN DE PRODUCTO*/
    .delete('/remove/:id',remove)
    
    /*RETORNA IMAGEN*/
    .get('/images/:image',getImage)

    .post('/saveImage',upload.array('image'),guardarImg)

    .delete('/deleteImage',deleteImg)
module.exports = router;