const {productos,detalle,carrito,busqueda,agregar,remove} = require('../controllers/productosController')
/* GET users listing. */
router
    .get('/productos/:id',productos)
    .post('/agregar/:id',agregar)
    .get('/buscar',busqueda)
    .get('/detalle/:id', detalle)
    .get('/carrito',carrito)
    .delete('/delete/:id',remove)

module.exports = router;