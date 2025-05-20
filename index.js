const express = require('express')
const db = require('./db')
const app = express()
require('dotenv').config()

const student = require('./models/newPerson.js')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello my name is amit");
})


app.post('/student', async (req, res) => {
    try {
        const data = req.body;
        const response = new student(data);

        response.save();
        console.log("data saved");
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" })
    }
})

app.get("/student/:class", async (req, res) => {
    try {
        const className = req.params.class;
        if (className == "BCA" || "BTECH" || "MCA") {
            const students = await student.find({ class: className })
            res.status(200).json({ students })
        }
        else {
            console.log("invalid crediential");
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

const Personrouter=require('./router/personRouter.js')

app.use('/person',Personrouter)

const port=process.env.PORT

app.listen(port, () => {
    console.log("app is running on port", 3000);
})