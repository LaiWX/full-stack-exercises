import Weather from './Weather'

const Country = ({ country }) => {
    const name = country.name.common;
    const capital = country.capital
    const area = country.area
    const languages = Object.entries(country.languages)
    const flagImage = country.flags.png
    return (
        <>
            <h1>{name}</h1>
            <p>Capital {capital}</p>
            <p>Area {area}</p>
            <h2>Languages</h2>
            {languages.map(language => (
                <li key={language[0]}>{language[1]}</li>
            ))}
            <br/>
            <img src={flagImage} alt={`flag of ${name}`}/>
            <Weather city={capital} />
        </>
    )
}

export default Country