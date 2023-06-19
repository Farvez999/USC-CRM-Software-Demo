const express = require('express');
const { addHead, getHead, deleteUserById } = require('../controllers/head.controller');
const router = express.Router();
const verifyAccessToken = require('../middleware/user.middleware')

router.post("/head", verifyAccessToken, addHead);

router.get("/head", getHead);

// router.get("/:id", getUserById);

// router.put("/update/:id", verifyAccessToken, updateUserById);

router.delete("/delete-head/:id", deleteUserById);

module.exports = router;