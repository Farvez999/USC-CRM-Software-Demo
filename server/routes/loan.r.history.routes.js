const express = require('express');
const { addPayLoan, getPayLoan } = require('../controllers/loan.r.history.controller');
const router = express.Router();
const verifyAccessToken = require('../middleware/user.middleware')

router.post("/loan/pay", verifyAccessToken, addPayLoan);
router.get("/loan/pay", getPayLoan);

module.exports = router;