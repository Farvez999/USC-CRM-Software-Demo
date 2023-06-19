const express = require('express');
const { getPayment } = require('../controllers/payment.controller');
const router = express.Router();


router.get("/payment", getPayment);

module.exports = router;