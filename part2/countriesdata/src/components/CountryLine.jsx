import { useState } from "react"
import Country from "./Country.jsx";

const CountryLine = ( {country} ) => {
    const [isShowing, setIsShowing] = useState(false)

    const onChangeShowing = () => {
        setIsShowing(!isShowing)
    }

    return (
        <>
            <li>{country.name.common} <button onClick={onChangeShowing}>{isShowing ? 'Hide' : 'Show' }</button></li>
            {isShowing ? <Country country={country}/> : null}
        </>
    )
}

export default CountryLine