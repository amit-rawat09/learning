const express = require("express")
const router = express.Router();
const student = require("../models/newPerson.js")


router.post('/', async (req, res) => {
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

router.get("/:class", async (req, res) => {
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

module.exports=router;