const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const presonschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "manager"],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

presonschema.pre("save", async (next) => {
    const persons = this;

    if (!persons.isModified('password')) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10);

        const hashed = await bcrypt.hash(persons.password, salt)

        persons.password = hashed;
        next();
    } catch (error) {
        return next(error)
    }
})

presonschema.methods.comparePassword = async (candidatepassword) => {
    try {
        const isMatch = await bcrypt.compare(candidatepassword, this.password)
        return isMatch
    } catch (error) {
        throw error
    }
}

const person = mongoose.model('Person', presonschema)
module.exports = person
