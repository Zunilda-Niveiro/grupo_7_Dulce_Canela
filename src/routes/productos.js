var express = require('express');
var router = express.Router();
const {productos,detalle,carrito} = require('../controllers/productosController')
/* GET users listing. */
router.get('/productos',productos)
router.get('/detalle', detalle)
router.get('/carrito',carrito)

module.exports = router;