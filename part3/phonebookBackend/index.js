const express = require('express')
const morgan = require('morgan')

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

const generateID = () => {
    const id = Math.floor(Math.random() * 1e10)
    return String(id)
}

// public
app.use(express.static('public'))

// main api
app.get("/api/persons", (req, res) => {
    res.json(persons)
})

// single person
app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    res.json(person)
})

// add person
app.post("/api/persons", (req, res) => {
    const person = req.body
    if (!person.name || !person.number) {
        res.status(400).json({
            error: 'name or number does not exist'
        })
        return
    } else if (persons.find(i => i.name === person.name)) {
        res.status(400).json({
            error: 'name must be unique'
        })
        return
    }
    person.id = generateID()
    persons.push(person)
    res.status(201).end()
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