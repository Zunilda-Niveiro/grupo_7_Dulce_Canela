const fs = require('fs');
const path = require('path');


const loadCarrito = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'carrito.json'), 'utf-8'))
}
const storeCarrito = (carr) => {
    return fs.writeFileSync(path.join(__dirname, 'carrito.json'), JSON.stringify(carr, null, 3), 'utf-8')
}


const loadProduct = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'productos.json'), 'utf-8'))
}

const storeProduct = (producto) => {
    return fs.writeFileSync(path.join(__dirname, 'productos.json'), JSON.stringify(producto, null, 3), 'utf-8')
}
const loadUsers = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'usuarios.json'), 'utf-8'))
}

const storeUsers = (usuario) => {
    return fs.writeFileSync(path.join(__dirname, 'usuarios.json'), JSON.stringify(usuario, null, 3), 'utf-8')
}
        


module.exports = {
    loadProduct,
    loadCarrito,
    storeProduct,
    storeCarrito,
    loadUsers,
    storeUsers
}