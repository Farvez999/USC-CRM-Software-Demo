const express = require('express');
const { addCollection, getCollection, deleteUserById } = require('../controllers/collection.controller');
const router = express.Router();
const verifyAccessToken = require('../middleware/user.middleware')

router.post("/collection", verifyAccessToken, addCollection);

router.get("/collection", getCollection);

router.delete("/delete-collection/:id", deleteUserById);

module.exports = router;