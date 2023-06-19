const express = require('express');
const { addLoanHead, getLoanHead, deleteUserById } = require('../controllers/loan.head.controller');
const router = express.Router();
const verifyAccessToken = require('../middleware/user.middleware')

router.post("/loan-head", verifyAccessToken, addLoanHead);

router.get("/loan-head", getLoanHead);

// router.get("/:id", getUserById);

// router.put("/update/:id", verifyAccessToken, updateUserById);

router.delete("/delete-loan-head/:id", deleteUserById);

module.exports = router;