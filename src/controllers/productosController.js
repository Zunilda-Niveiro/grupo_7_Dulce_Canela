const { request } = require("express")

module.exports = {
    add : (req,res) => {
        return res.render ('productAdd')
    },
    store : (req,res) => {
        return res.send (req.body)
    },
    edit : (req,res) =>{
        return res.render ('productEdit')
    },
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