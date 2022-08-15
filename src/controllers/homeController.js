const categorias = require('../data/categorias.json')
module.exports={
    home : (req,res) => {
        return res.render('home',{categorias})
    }
}