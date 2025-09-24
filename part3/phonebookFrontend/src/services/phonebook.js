import axios from 'axios'

const url = '/api/persons'

const getAll = () => {
    return axios.get(url)
}

const create = (newObject) => {
    return axios.post(url, newObject)
}

const update = (newObject) => {
    return axios.put(url + '/' + newObject.id, newObject)
}

const deletePerson = (id) => {
    return axios.delete(url + '/' + id)
}

export default {
    getAll,
    update,
    create,
    deletePerson,
}