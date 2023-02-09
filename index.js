const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000
const authUserRouter = require('./routes/authUserRouter');
dbConnect()

app.use('/', (req, res) => {
    res.send("Hallo ini server")
})

app.use('/api/user', authUserRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server berjalan di port ${PORT}`)
})
