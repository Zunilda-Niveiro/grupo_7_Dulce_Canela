var express = require('express');
var router = express.Router();
const {productos,detalle,carrito,add,store,edit} = require('../controllers/productosController')



/* GET users listing. */
router.get('/add',add)
router.post('/add',store)
router.get('/edit',edit)
router.get('/productos',productos)
router.get('/detalle', detalle)
router.get('/carrito',carrito)

module.exports = router;