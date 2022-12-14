
const express = require('express');
const router = express.Router();
const {getTotals} = require('../../controllers/API/apiTotals')

/* /api/totals */
router
    /* CATEGORIAS TODOS */
    .get('/', getTotals )

module.exports = router;