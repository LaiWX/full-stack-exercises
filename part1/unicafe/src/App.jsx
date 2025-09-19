import { useState } from 'react'

const Button = ({onClick, buttonName}) => {
    return <button onClick={onClick}>{buttonName}</button>
}

const Statistics = ({ good, neutral, bad}) => {
    let all = good + neutral + bad
    let average = (good - bad) / all
    let positive = good / all
    if (all === 0){
        return (
            <div>No feedback given</div>
        )
    }
    return (
        <table>
            <tbody>
                <StatisticLine name="good" value={good} />
                <StatisticLine name="neutral" value={neutral} />
                <StatisticLine name="bad" value={bad} />
                <StatisticLine name="all" value={all} />
                <StatisticLine name="average" value={average} />
                <StatisticLine name="positive" value={positive * 100 + "%"} />
            </tbody>
        </table>
    )
}

const StatisticLine = ({ name, value }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{value}</td>
        </tr>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const increaseScore = ({scoreItem, scoreHandle}) => () => {
        scoreHandle(scoreItem + 1)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button
                onClick={increaseScore({scoreItem: good, scoreHandle: setGood})}
                buttonName="good"
            />
            <Button
                onClick={increaseScore({scoreItem: neutral, scoreHandle: setNeutral})}
                buttonName="neutral"
            />
            <Button
                onClick={increaseScore({scoreItem: bad, scoreHandle: setBad})}
                buttonName="bad"
            />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App