const express = require("express")
const router = express.Router();
const person = require("../models/person.js")

router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        res.status(200).json(data)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' })
    }
})

router.post("/", async (req, res) => {
    try {
        const data = req.body

        const newPerson = new person(data)

        console.log(newPerson);

        const response = await newPerson.save()
        console.log(response);
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' })

    }

})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const response = await person.findByIdAndUpdate(id, data)
        res.status(200).send("data changes")
    } catch (error) {
        res.status(400).send(error)

    }
})
 
// hello this is new line 
module.exports = router;