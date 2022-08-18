const categorias = require('../data/categorias.json')
const productos = require('../data/productos.json')
const {
    loadCarrito,
    loadProducts,
    storeCarrito,
    storeProducts
} = require('../data/db_Module')

module.exports = {
    productos: (req, res) => {

        const categ = categorias.find(categoria => categoria.idcat == +req.params.id)
        const subprod = productos.filter(producto => producto.categoria == categ.nombre)
        const carrito = loadCarrito();
        return res.render('productos', {
            subprod,
            categ: categ.nombre,
            carrito,
            productos
        })


    },
    detalle: (req, res) => {
        const prod = productos.find(producto => producto.id === +req.params.id)
        const carrito = loadCarrito();
        return res.render('detalle', {
            prod,
            productos,
            carrito
        })
    },
    carrito: (req, res) => {
        return res.render('carrito')
    },
    agregar: (req, res) => {

        const carrito = loadCarrito();

        if (carrito == undefined || carrito == "") {
            const nuevoProd = {
                id: 1,
                id_producto: +req.params.id,
                cantidad_p: 1
            }
            const prodNuevo = [...carrito, nuevoProd]
            storeCarrito(prodNuevo)
        } else {
            let bandera = false;
            let aux = carrito.map(produ => {
                if (produ.id_producto == +req.params.id) {
                    bandera = true
                    return {
                        ...produ,
                        cantidad_p: produ.cantidad_p + 1
                    }
                }
                return produ
            })
            if (!bandera) {
                let idconst = aux.lenght;
                const nuevoProd = {
                    id: idconst,
                    id_producto: +req.params.id,
                    cantidad_p: 1
                }
                const prodNuevo = [...carrito, nuevoProd]
                storeCarrito(prodNuevo)
            } else {
                storeCarrito(aux)
            }
        }
        res.redirect('/')
    },
    busqueda: (req, res) => {
        const subprod = productos.filter(producto => producto.nombre.toLocaleLowerCase().includes(req.query.busqueda.toLocaleLowerCase()))
        let categ = "Resultados"
        if (subprod != "") {
            return res.render('productos', {
                subprod,
                categ
            })
        } else {
            categ = "Sin resultados"
            return res.render('productos', {
                subprod,
                categ
            })
        }

    },
    remove: (req, res) => {
        const carrito = loadCarrito();

        const carritoModificado = carrito.filter(car => car.id_producto != +req.params.id);
        storeCarrito(carritoModificado);
        return res.redirect('/')
    }
}