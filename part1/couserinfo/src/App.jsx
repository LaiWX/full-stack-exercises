const Header = (props) =>{
    return (
        <>
        <h1>{props.course}</h1>
        </>
    )
}

const Content = (props) => {
    const content_list = props.content_list
    return (
        <>
        <p>{content_list[0].part} {content_list[0].exercises}</p>
        <p>{content_list[1].part} {content_list[1].exercises}</p>
        <p>{content_list[2].part} {content_list[2].exercises}</p>
        </>
    )
}

const Total = (props) =>{
    const content_list= props.content_list
    return (
        <>
            <p>
                Number of exercises {
                    content_list[0].exercises +
                    content_list[1].exercises +
                    content_list[2].exercises
                }
            </p>
        </>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const content_list = [
        {part: "Fundamentals of React", exercises: 10},
        {part: "Using props to pass data", exercises: 7},
        {part: "State of a component", exercises: 14},

    ]

    return (
        <div>
            <Header course={course} />
            <Content content_list={content_list} />
            <Total content_list={content_list} />
        </div>
    )
}

export default App