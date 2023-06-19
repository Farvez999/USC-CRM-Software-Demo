const express = require('express');
const { createUser, getUsers, getHeads, loginUser, getLoggedUser, deleteUserById, updateUserById } = require('../controllers/user.controller');
const router = express.Router();
const verifyAccessToken = require('../middleware/user.middleware')

router.post('/users', verifyAccessToken, createUser);

router.get("/users", getUsers);

router.get("/heads", getHeads);

router.get("/logged-user", verifyAccessToken, getLoggedUser);

router.post("/login", loginUser)

// router.get("/:id", getUserById);

router.patch("/update-pass/:id", updateUserById);

router.delete("/delete-user/:id", deleteUserById);

module.exports = router;