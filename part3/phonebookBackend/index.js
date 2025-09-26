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

// public
app.use(express.static('public'))

// main api
app.get("/api/persons", (req, res, next) => {
    Person
        .find({})
        .then((persons) => {
            res.json(persons)
        })
        .catch(err => next(err))
})

// single person
app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    Person.findById(id)
        .then(person => res.json(person))
        .catch(err => next(err))
})

// add person
app.post("/api/persons", (req, res, next) => {
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
    newPerson.save()
        .then((saved) => {
            console.log(saved)
            res.status(201).json(saved)
        })
        .catch(err => next(err))
})

// update
app.put("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    const { name, number } = req.body

    Person.findById(id)
        .then((person) => {
        if (!person) {
            res.status(404).end()
        }

        person.name = name
        person.number = number

        person.save()
            .then((updatePerson) => {
                res.json(updatePerson)
            })
            .catch(err => next(err))
    })
        .catch(err => next(err))
})

// delete
app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
        .then(() => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

// information page
app.get("/info", (req, res, next) => {
    Person.find({})
        .then(persons => {
            res.send(`<p>Phonebook has info for ${persons.length} people</p>
<p>${Date()}</p>`)
        })
        .catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandle = (err, req, res, next) => {
    console.log('caught error:',err.message)
    if (err.name === 'CastError') {
        res.status(400).send({ error: 'malformatted id'})
    }
    next(err)
}

app.use(errorHandle)

const PORT = 3001
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))