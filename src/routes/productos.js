const express = require('express');
const router = express.Router();
const {upload} = require('../middleware/uploadFiles')
const { productos, detalle, carrito, busqueda, remove, agregarProducto, editarProducto, update,agregarProd } = require('../controllers/productosController')
const { editarProductosValidaciones, agregarProductoValidaciones} = require('../validaciones')
const userSessionCheck = require('../middleware/userSessionCheck');

router
    /* CARGA VISTA PRODUCTOS POR CATEGORIA SELECCIONADA */
    .get('/productos/:id', productos)
    /* BARRA DE BUSQUEDA */
    .get('/buscar', busqueda)
    /* CARGA DETALLE DE PRODUCTO */
    .get('/detalle/:id', detalle)

    .get('/carrito',carrito)

    .get('/productAdd',userSessionCheck, agregarProd)// Agregar Producto 
    .post('/productAdd', upload.single('imagen'), agregarProductoValidaciones, agregarProducto)

    .get('/edicionDeProductos/:id',userSessionCheck,editarProducto)//Editar Producto - se agrega el id para saber que producto se va a editar
    .put('/update/:id',upload.single('imagen'), editarProductosValidaciones,update)//Actualizar Producto - se agrega el id para saber que producto se va a editar
    
    .delete('/delete/:id', remove)

module.exports = router;