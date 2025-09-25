require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./model/persons')

const app = express()

app.use(express.json())

morgan.token('body', (req) => {
    if (req.method !== 'POST') {
        return ''
    } else {
        return JSON.stringify(req.body)
    }
})
morgan.format('tiny-with-body', ':method :url :status :res[content-length] - :response-time ms :body')

app.use(morgan('tiny-with-body'))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// public
app.use(express.static('public'))

// main api
app.get("/api/persons", (req, res) => {
    Person
        .find({})
        .then((persons) => {
            res.json(persons)
        })
})

// single person
app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    Person.findById(id).then(person => res.json(person))
})

// add person
app.post("/api/persons", (req, res) => {
    const person = req.body
    if (!person.name || !person.number) {
        res.status(400).json({
            error: 'name or number does not exist'
        })
        return
    }

    const newPerson = new Person({
        name: person.name,
        number: person.number,
    })
    newPerson.save().then((saved) => {
        console.log(saved)
        res.status(201).json(saved)
    })
})

// delete
app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

// information page
app.get("/info", (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
<p>${Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))