module.exports = {
    productos: (req,res) => {
        return res.render ('productos')
    },
    detalle: (req,res) => {
        return res.render ('detalle')
    },
    carrito: (req,res) => {
        return res.render ('carrito')
    }
}