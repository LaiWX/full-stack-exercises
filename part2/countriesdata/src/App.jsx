import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import axios from "axios";

const App = () => {
    const [ filter, setFilter ] = useState('')
    const [ data, setData ] = useState([])

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(res => setData(res.data))
        }
    , [])

    const onFilterChange = (e) => {
        setFilter(e.target.value)
    }

    const dataToDisplay = data.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <>
            <label>find countries <input value={filter} onChange={onFilterChange}/></label>
            <Countries countries={dataToDisplay} />
        </>
    )
}

export default App