var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const {loginValidator, registerValidator} = require('../validaciones');

/* GET users listing. */
router.get('/registro',userController.registro)
router.get('/login', userController.login)

module.exports = router;