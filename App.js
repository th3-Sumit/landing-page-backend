const express = require('express')
const router = require('./routes/routes.js')
const cors = require('cors')

require('dotenv').config()
require('./Config/db.js')

const app = express()

const port = process.env.PORT || 8000
app.use(cors())
app.use(express.json())

app.use('/freelancer', router)

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})