var express = require('express');
var router = express.Router();
const indexController = require('../controllers/homeController')

router.get('/', indexController.home)

module.exports = router;