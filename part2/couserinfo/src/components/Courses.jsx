const Courses = ({courses}) => {
    return (
        courses.map((course) => {
            return <Course key={course.id} course={course} />
        })
    )
}
const Course = ({course}) => {
    const {name, parts} = course
    const total =
        parts.reduce((total, part) => total + part.exercises, 0)
    return (
        <>
            <h2>{name}</h2>
            {parts.map((part) => (
                <p key={part.id}>{part.name} {part.exercises}</p>
            ))}
            <h3>total of {total} exercises</h3>
        </>
    )
}

export default Courses