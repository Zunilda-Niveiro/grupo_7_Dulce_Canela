
const express = require('express');
const router = express.Router();
const {upload} = require('../../middleware/uploadFiles')
const { productos, detalle,remove, agregarProducto, update ,getImage } = require('../../controllers/API/apiProductos')
const {agregarProductoValidaciones} = require('../../validaciones')
/* /api/productos */
router
    /* PRODUCTOS TODOS */
    .get('/', productos)

    /* CARGA DETALLE DE PRODUCTO */
    .get('/detalle/:id', detalle)
    
    /*GUARDADO DE PRODUCTO*/
    .post('/productAdd', upload.array('image'), agregarProductoValidaciones, agregarProducto)

    /*ACTUALIZACION DE PRODUCTO*/
    .patch('/update/:id',upload.array('image'),agregarProductoValidaciones,update)

    /*ELIMINACIÓN DE PRODUCTO*/
    .delete('/remove/:id',remove)
    
    /*RETORNA IMAGEN*/
    .get('/images/:image',getImage)


module.exports = router;