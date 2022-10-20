
const { loadCarrito} = require('../data/db_Module')
const db = require('../database/models');


module.exports = {
    home: (req, res) => {

        const carrito = loadCarrito();
        
        const categorias = db.Category.findAll()
        const productos = db.Product.findAll()
        
        Promise.all([categorias,productos])
            .then(([categorias,productos]) => res.render('home',{
                productos,
                categorias,
                carrito,

            }))
    }
}