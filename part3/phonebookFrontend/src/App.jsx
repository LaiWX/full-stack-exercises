import { useState, useEffect } from 'react'
import phonebookServer from "./services/phonebook.js";
import {Filter, PersonForm, Persons} from './components/Phonebook'
import InfoMessage from "./components/InfoMessage.jsx";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterString, setFilterString] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        phonebookServer
            .getAll()
            .then(res => setPersons(res.data))
    },[])

    const onNameSubmit = (e) => {
        e.preventDefault()
        const existPerson = persons.find(person => person.name === newName)
        if (existPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old with a new one?`)) {
                onChange({...existPerson, number: newNumber})
            }
        } else {
            const newNameObject = {
                name: newName,
                number: newNumber,
            }
            phonebookServer
                .create(newNameObject)
                .then(res =>
                    setPersons(persons.concat(res.data))
                )
            setMessage(`Added ${newName}`)
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        }
    }

    const onChange = (personOnChange) => {
        phonebookServer
            .update(personOnChange)
            .then(res => {
                const changedPerson = res.data
                const newPersons = persons.map((person) =>
                    person.name === changedPerson.name ? changedPerson : person
                )
                setPersons(newPersons)
            })
            .catch(() => {
                setMessage(`Information of ${personOnChange.name} has already been removed from server`)
                setTimeout(() =>
                    setMessage(null)
                , 3000)
                const newPersons = persons.filter((person) => person.name !== personOnChange.name)
                setPersons(newPersons)
            })
    }

    const onDelete = (id, name) => {
        if (window.confirm(`Delete ${name}`)) {
            phonebookServer.deletePerson(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
    }

    let personToShow
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
            <InfoMessage message={message} />
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
            <Persons persons={personToShow} onDelete={onDelete}/>
        </div>
    )
}

export default App