const mongoose = require('mongoose')
require('dotenv').config()

// const mongoURL = 'mongodb://localhost:27017/amitDatabase'
const mongodbURL = process.env.DB_URL
mongoose.connect(mongodbURL)

const db = mongoose.connection;

db.on('connected', () => {
    console.log("connected to db");
})

db.on('error', () => {
    console.log("connection error");
})

db.on('disconnected', () => {
    console.log("connection disconnected");
})

module.exports = { db };  