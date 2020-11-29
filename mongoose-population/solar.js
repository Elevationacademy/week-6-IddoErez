// Mongoose setup
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/solar', { useNewUrlParser: true })
console.log('hello')
const solarSystemSchema = new Schema({
    starName: String,
    planets: [{ type: Schema.Types.ObjectId, ref: 'Planet' }]
})

const planetSchema = new Schema({
    name: String,
    system: { type: Schema.Types.ObjectId, ref: 'SolarSystem' },
    visitors: [{ type: Schema.Types.ObjectId, ref: 'Visitor' }]
})

const visitorSchema = new Schema({
    name: String,
    homePlanet: { type: Schema.Types.ObjectId, ref: 'Planet' },
    visitedPlanets: [{ type: Schema.Types.ObjectId, ref: 'Planet' }],
})

const SolarSystem = mongoose.model("SolarSystem", solarSystemSchema)
const Planet = mongoose.model("Planet", planetSchema)
const Visitor = mongoose.model("Visitor", visitorSchema)

let s1 = new SolarSystem({
    starName: "Sun",
    planets: []
})


let p1 = new Planet({
    name: "Earth",
    system: s1,
    visitors: [],
})

let v1 = new Visitor({
    name: "William Jeffery",
    homePlanet: p1,
    visitedPlanets: []
})

let v2 = new Visitor({
    name: "Moshe David",
    homePlanet: p1,
    visitedPlanets: []
})



s1.planets.push(p1)
v1.visitedPlanets.push(p1)
p1.visitors.push(v1)

// s1.planets.push(p1)
v2.visitedPlanets.push(p1)
p1.visitors.push(v2)

p1.save()
s1.save()
v1.save()
v2.save()

console.log(v1)

 Visitor.findOne({})
    .populate("visitedPlanets")
     .exec(function (err, visitor) {
         console.log(visitor.visitedPlanets)
     })

Planet.findOne({})
    .populate("visitors")
    .exec(function (err, planet) {
        console.log(planet.visitors)
    })

SolarSystem.findOne({})
    .populate({
        path: 'planets',
        populate: {
            path: 'visitors'
        }
    })
    .exec(function (err, SolarSystem) {
        console.log(SolarSystem.planets)
    })
