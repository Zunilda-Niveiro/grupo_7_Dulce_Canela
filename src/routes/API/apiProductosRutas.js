
const express = require('express');
const router = express.Router();
const {upload} = require('../../middleware/uploadFiles')
const { productos, detalle,remove, agregarProducto, update ,getImage } = require('../../controllers/API/apiProductos')
const { editarProductosValidaciones, agregarProductoValidaciones} = require('../../validaciones')

router
    /* PRODUCTOS TODOS */
    .get('/', productos)

    /* CARGA DETALLE DE PRODUCTO */
    .get('/detalle/:id', detalle)
    
    /*GUARDADO DE PRODUCTO*/
    .post('/productAdd', upload.array('imagen'), agregarProductoValidaciones, agregarProducto)

    /*ELIMINACIÓN DE PRODUCTO*/
    .delete('/remove/:id',remove)
    
    /*RETORNA IMAGEN*/
    .get('/images/:image',getImage)


module.exports = router;