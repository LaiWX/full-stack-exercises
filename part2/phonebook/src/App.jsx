import { useState } from 'react'

const Filter = ({ filterString, onFilterStringChange }) => {
    return (
        <div>
            <label htmlFor='filter'>filter shown with</label>
            <input
                id='filter'
                value={filterString}
                onChange={(e) => {onFilterStringChange(e.target.value)}} />
        </div>
    )
}

const PersonForm = ({name, onNameChange, number, onNumberChange, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <Input
                name='name'
                value={name}
                handleChange={onNameChange}
            />
            <Input
                name='number'
                value={number}
                handleChange={onNumberChange}
            />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Input = ({ name, value, handleChange }) => {
    return (
        <div>
            <label htmlFor={name}>{name}: </label>
            <input
                id={name}
                value={value}
                onChange={
                    (e) => handleChange(e.target.value)
            }/>
        </div>
    )
}

const Persons = ({persons}) => {
    return persons.map(
        (person) =>
            <Person key={person.name} name={person.name} number={person.number} />
    )
}

const Person = ({ name, number}) => {
    return (
        <div>{name} {number}</div>
    )
}
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456'},
        { name: 'Ada Lovelace', number: '39-44-5323523'},
        { name: 'Dan Abramov', number: '12-43-234345'},
        { name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterString, setFilterString] = useState('')

    const onNameSubmit = (e) => {
        e.preventDefault()
        const isExist = persons.some(person => person.name === newName)
        if (isExist) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const newNameObject = {
                name: newName,
                number: newNumber,
            }
            setPersons(persons.concat(newNameObject))
        }
    }

    let personToShow = []
    if (filterString === '') {
        personToShow = persons
    } else {
        personToShow = persons.filter(
            person =>
                person.name.toLowerCase().includes(filterString.toLowerCase()))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterString={filterString} onFilterStringChange={setFilterString} />
            <h3>add a new</h3>
            <PersonForm
                name={newName}
                onNameChange={setNewName}
                number={newNumber}
                onNumberChange={setNewNumber}
                onSubmit={onNameSubmit}
            />
            <h3>Numbers</h3>
            <Persons persons={personToShow} />
        </div>
    )
}

export default App