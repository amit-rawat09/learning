const express = require('express')
const db = require('./db')
const app = express()
const person = require("./models/person.js")
const student = require("./models/newPerson.js")

require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.json())


const passport = require('passport')
const loacalStrategy = require('passport-local').Strategy;

app.use(passport.initialize())

passport.use(new loacalStrategy(async (userget, password, done) => {
    try {

        const user = await person.findOne({ username: userget })

        if (!user) {
            return done(null, false, { message: "incorrect user name" })
        }


        const ispasswordmatch =await user.comparePassword(password)
        console.log(ispasswordmatch);


        if (ispasswordmatch) {
            console.log(" user matched");
            return done(null, user, { message: "user found" })
        }
        else {
            return done(null, false, { message: "wrong password" })
        }
    } catch (error) {
        return done(error)
    }
}))

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleDateString()}] Request made to : ${req.orignalUrl}`);
    next()
}

app.get('/', passport.authenticate("local", { session: false }), (req, res) => {
    res.send("Hello my name is amit");
})

//router
const Personrouter = require('./router/personRouter.js')
const studentrouter = require('./router/studentrouter.js')

app.use('/person', Personrouter)
app.use('/student', studentrouter)

// const port=process.env.PORT

app.listen(3000, () => {
    console.log("app is running on port", 3000);
})