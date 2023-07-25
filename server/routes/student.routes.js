const express = require('express');
const { createStudent, getStudents, getUserById, loginStudent, getLoggedUser, deleteUserById, updateUserById } = require('../controllers/student.controller');
const router = express.Router();
const verifyAccessToken = require('../middleware/user.middleware')

router.post('/student', createStudent);

router.get("/students", getStudents);

router.get("/student/:id", getUserById);

router.get("/logged-user", verifyAccessToken, getLoggedUser);

router.post("/student/login", loginStudent)

router.patch("/update-pass/:id", updateUserById);

router.delete("/delete-user/:id", deleteUserById);

module.exports = router;