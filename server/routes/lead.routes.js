const express = require('express');
const { addLeads, addOnlineLeads, addOfflineLeads, addAdmissions, getLeads, getUserById, updateLeadById, updateAddPayById, getTodayLeads, deleteUserById } = require('../controllers/lead.controller');
const router = express.Router();
const cors = require('cors');
const app = express();
const verifyAccessToken = require('../middleware/user.middleware')

// Middleware
app.use(express.json());
app.use(cors());

router.post('/add-leads', verifyAccessToken, addLeads);
router.post('/add-online-leads', verifyAccessToken, addOnlineLeads);
router.post('/add-offline-leads', verifyAccessToken, addOfflineLeads);

router.post('/add-admissions', verifyAccessToken, addAdmissions);

router.get("/leads", getLeads);

router.get("/leads/:id", getUserById);

router.patch("/update/:id", updateLeadById);

router.patch("/update-admission-pay/:id", updateAddPayById);

router.get("/todayLead/:date", getTodayLeads);

router.delete("/delete/:id", deleteUserById);

module.exports = router;