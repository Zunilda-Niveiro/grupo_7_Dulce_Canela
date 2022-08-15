const categorias = require('../data/categorias.json')
const productos = require('../data/productos.json')

module.exports = {
    productos: (req,res) => {

        const categ = categorias.find(categoria => categoria.idcat == +req.params.id)
        const subprod =productos.filter(producto => producto.categoria == categ.nombre)
    
        return res.render ('productos',{
            subprod,
            categ:categ.nombre
        })
    },
    detalle: (req,res) => {
        const prod = productos.find(producto => producto.id === +req.params.id)
        return res.render ('detalle',{
            prod,
            productos
        })
    },
    carrito: (req,res) => {
        return res.render ('carrito')
    },
    busqueda:(req,res) =>{
        const subprod = productos.filter(producto=>producto.nombre.toLocaleLowerCase().includes(req.query.busqueda.toLocaleLowerCase()))
        let categ = "Resultados"
        if (subprod != "") {
            return res.render('productos',{
            subprod,
            categ
        })  
        }else{
            categ = "Sin resultados"
            return res.render('productos',{
                subprod,
                categ
        })}
      
    }
}