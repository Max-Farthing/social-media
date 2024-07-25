require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')
const feedRoutes = require('./routes/feed') //feed routes

const app = express()

app.use(express.json())

app.use((req, res, next) => { //setting permissions
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    )
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/feed', feedRoutes) //routes to feed API
app.use('/auth', authRoutes) //routes to auth API

const databaseConnection = process.env.DATABASE_URL //database 
const PORT = process.env.PORT || 5000

mongoose
    .connect(
        databaseConnection
    )
    .then(result => {
        app.listen(PORT, () => console.log("Server started"))
    })
    .catch(err => console.log(err))