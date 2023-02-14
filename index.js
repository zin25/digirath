const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000
const authUserRouter = require('./routes/authUserRoute');
const productRouter = require('./routes/productRoute');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
dbConnect()

app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

// Base Url : http://localhost:8000/api/users/???????
app.use('/api/user', authUserRouter)

// Base url : Product localhost:8000/api/product/????
app.use('/api/product', productRouter)

// Middleware
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server berjalan di port ${PORT}`)
})
