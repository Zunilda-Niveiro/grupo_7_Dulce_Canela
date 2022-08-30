const categorias = require('../data/categorias.json')
const { loadCarrito, loadProduct, storeCarrito, storeProducts } = require('../data/db_Module')

module.exports = {
    home: (req, res) => {
        const productos = loadProduct();
        const carrito = loadCarrito();
        return res.render('home', {
            productos,
            categorias,
            carrito
        })
    }
}