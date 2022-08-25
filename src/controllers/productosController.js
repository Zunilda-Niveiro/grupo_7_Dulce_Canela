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
    agregarProd:(req,res) => {
        const carrito = loadCarrito()
       return res.render('productAdd',{
        carrito
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
        const carrito = loadCarrito()
        const productos = loadProducts()
        return res.render('carrito',{
            carrito,
            productos
        })
    },
    agregarProducto : (req,res) => {
       
        const productos = loadProducts()
        const {nombre, marca, precio, cantidad, categoria, detalle} = req.body
    
        let productoNuevo = {
            id : productos[productos.length - 1].id + 1,
            categoria : categoria,
            nombre : nombre,
            cantidad : cantidad,
            marca : marca,
            precio : precio,
            imagen : req.file.filename, 
            detalle: detalle
        }
        producModificado = [...productos, productoNuevo];
        storeProducts(producModificado);

		return res.redirect('/')
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
        res.redirect('/productos/detalle/' + req.params.id)
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