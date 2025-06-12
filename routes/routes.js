const express = require('express')
const { createLeads, verifyLeads, getAllLeads } = require('../Controller/LeadController')
const { createSuperAdmin, userLogin } = require('../Controller/AuthController')
const verifyToken = require('../Middleware/AuthMiddleware')
const router = express.Router()

router.post('/leads', createLeads)
router.post('/verify-otp', verifyLeads)
router.post('/create-admin', createSuperAdmin)
router.post('/login', userLogin)

router.get('/all-leads', verifyToken, getAllLeads)


module.exports = router
