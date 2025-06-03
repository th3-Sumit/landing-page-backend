const express = require('express')
const { createLeads, verifyLeads } = require('../Controller/LeadController')
const router = express.Router()

router.post('/leads', createLeads)
router.post('/verify-otp', verifyLeads)




module.exports = router
