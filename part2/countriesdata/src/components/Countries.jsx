import Country from './Country'
import CountryLine from './CountryLine'

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (countries.length === 1) {
        return <Country country={countries[0]}/>
    } else {
        return countries.map(country =>
            <CountryLine key={country.name.common} country={country}/>
        )
    }
}

export default Countries