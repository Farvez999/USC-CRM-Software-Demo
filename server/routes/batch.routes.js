const express = require('express');
const router = express.Router();
const verifyAccessToken = require('../middleware/user.middleware');
const { addBatch, getBatch, deleteUserById } = require('../controllers/batch.controller');

router.post("/batch", verifyAccessToken, addBatch);

router.get("/batch", getBatch);

// router.get("/:id", getUserById);

// router.put("/update/:id", verifyAccessToken, updateUserById);

router.delete("/delete-batch/:id", deleteUserById);

module.exports = router;