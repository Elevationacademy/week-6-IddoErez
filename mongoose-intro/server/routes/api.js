const express = require('express')
const router = express.Router()

const Person = require('../models/Person')

router.get('/people', function (req, res) {
    Person.find({}, function (err, people) {
        console.log(people)
        res.send(people)

    })
})

router.post('/person', function (req, res) {
    let person = req.body
    let newPerson = new Person({ firstName: person.firstName, lastName: person.lastName, age: person.age })
    newPerson.save()
    res.end()
})


router.put('/person/:id', function (req, res) {
    let id = req.params.id
    Person.findByIdAndUpdate(id, { age: 80 }, { new: true }, function (err, person) {
        console.log(person)
        res.end()
    })
})
router.delete('/apocalypse', function (req, res) {
    Person.find({}, function (err, people) {
        people.forEach(p => p.remove())
        res.end()

    })
})

module.exports = router

