const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/productos');
    },
    filename: (req, file, cb) => {
        cb(null, `product-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const storageUser = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/usuarios');
    },
    filename: (req, file, cb) => {
        cb(null, `user-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const storageCategory = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './public/images/categorias');
    },
    filename : (req, file, cb) => {
        cb(null, `cat-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const uploadUser =multer({
    storage : storageUser
})
const upload = multer({
    storage: storage
})
const uploadCat = multer({
    storage : storageCategory
})
module.exports = {
    upload,
    uploadUser,
    uploadCat
}