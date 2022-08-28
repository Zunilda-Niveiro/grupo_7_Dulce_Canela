const fs = require('fs');
const path = require('path');


const loadProducts = () =>{
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'productos.json'),'utf-8'))
}
const loadCarrito = () =>{
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'carrito.json'),'utf-8'))
}
const storeCarrito = (carr) =>{
    return fs.writeFileSync(path.join(__dirname,'carrito.json'),JSON.stringify(carr,null,3),'utf-8')
}
const storeProducts = (prod) =>{
    return fs.writeFileSync(path.join(__dirname,'productos.json'),JSON.stringify(prod,null,3),'utf-8')
}


module.exports = {
    loadProducts,
    loadCarrito,
    storeProducts,
    storeCarrito
}