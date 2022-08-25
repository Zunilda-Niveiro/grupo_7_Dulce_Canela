const express = require('express');
const router = express.Router();

const upload = require('../middleware/uploadFiles')

const {productos,detalle,carrito,busqueda,agregar,remove,agregarProd,agregarProducto} = require('../controllers/productosController')


router
/* CARGA VISTA PRODUCTOS POR CATEGORIA SELECCIONADA */
    .get('/productos/:id',productos)
    /* AGREGA PRODUCTO A CARRITO */
    .post('/agregar/:id',agregar)
    /* CARGA PRODUCTOR AGREGAR */
    .get('/productAdd',agregarProd)
    .post('/productAdd',upload.single('imagen'),agregarProducto)

    /* BARRA DE BUSQUEDA */
    .get('/buscar',busqueda)
    /* CARGA DETALLE DE PRODUCTO */
    .get('/detalle/:id', detalle)
    
    .get('/carrito',carrito)
    .delete('/delete/:id',remove)

module.exports = router;