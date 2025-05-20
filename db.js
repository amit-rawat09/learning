const mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost:27017/amitDatabase'
mongoose.connect(mongoURL)

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