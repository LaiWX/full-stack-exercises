const mongoose = require('mongoose')

let password
let name
let number
let mode

if (process.argv.length === 5) {
    mode = 'add'
    password = process.argv[2]
    name = process.argv[3]
    number = process.argv[4]
} else if (process.argv.length === 3) {
    mode = 'show'
    password = process.argv[2]
} else {
    console.log('need 1 or 3 extra arguments')
    process.exit(1)
}

const url = `mongodb+srv://wxlai128_db_user:${password}@cluster0.ww9qwq8.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', noteSchema)

if (mode === 'add') {
    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else if (mode === 'show') {
    console.log('phonebook:')
    Person.find({}).then((persons) => {
        persons.forEach((person) => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    console.log('unknown operation')
    mongoose.connection.close()
}