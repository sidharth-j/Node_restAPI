require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('conn okay'))

app.use(express.json())
const carsRouter = require('./routes/cars')
app.use('/cars', carsRouter)



app.listen(3000, ()=> console.log('server started'))