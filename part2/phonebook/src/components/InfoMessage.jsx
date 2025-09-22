const InfoMessage = props => {
    const style = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    const { message } = props
    if (message === null) {
        return null
    } else {
        return (
            <div style={style}>{message}</div>
        )
    }
}

export default InfoMessage