const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadFiles')
const { productos, detalle, carrito, busqueda, agregar, remove, agregarProd, agregarProducto, edit, update,removeCarrito } = require('../controllers/productosController')


router
    /* CARGA VISTA PRODUCTOS POR CATEGORIA SELECCIONADA */
    .get('/productos/:id', productos)
    /* AGREGA PRODUCTO A CARRITO */
    .post('/agregar/:id', agregar)
    /* BARRA DE BUSQUEDA */
    .get('/buscar', busqueda)
    /* CARGA DETALLE DE PRODUCTO */
    .get('/detalle/:id', detalle)
    /* ELIMINA PRODUCTOS DEL CARRITO  */
    .delete('/deleteCarrito/:id', removeCarrito)

    .get('/carrito', carrito)
    .get('/productAdd', agregarProd)// Agregar Producto 
    .post('/productAdd', upload.single('imagen'), agregarProducto)
    .get('/edit/:id',edit)//Editar Producto - se agrega el id para saber que producto se va a editar
    .put('/update/:id',update)//Actualizar Producto - se agrega el id para saber que producto se va a editar
    .delete('/delete/:id', remove)

module.exports = router;