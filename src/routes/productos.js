var express = require('express');
var router = express.Router();
const {productos,detalle,carrito,busqueda} = require('../controllers/productosController')
/* GET users listing. */
router
    .get('/productos/:id',productos)
    .get('/buscar',busqueda)
    .get('/detalle/:id', detalle)
    .get('/carrito',carrito)

module.exports = router;