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

const Persons = ({persons, onDelete}) => {
    return persons.map(
        (person) =>
            <Person key={person.id} person={person} onDelete={onDelete}/>
    )
}

const Person = ({ person, onDelete}) => {
    const { name, number, id } = person
    return (
        <div>{name} {number}
        <button onClick={() => onDelete(id, name)}>delete</button>
        </div>
    )
}

export {Filter, PersonForm, Persons}