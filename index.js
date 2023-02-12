const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000
const authUserRouter = require('./routes/authUserRouter');
const cookieParser = require('cookie-parser');
dbConnect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

// Base Url : http://localhost:8000/api/users/???????
app.use('/api/user', authUserRouter)

// Middleware
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server berjalan di port ${PORT}`)
})
