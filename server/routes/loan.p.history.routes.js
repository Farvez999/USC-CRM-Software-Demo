const express = require('express');
const { addRevLoan, getRevLoan } = require('../controllers/loan.p.history.controller');
const router = express.Router();
const verifyAccessToken = require('../middleware/user.middleware')

router.post("/loan/rev", verifyAccessToken, addRevLoan);
router.get("/loan/rev", getRevLoan);

module.exports = router;