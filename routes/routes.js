const express = require('express')
const { register } = require('../Controller/AuthController')
const router = express.Router()

router.post('/sign-up', register)




module.exports = router
