const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to ', url)
mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((err) => {
        console.log('error connecting to MongoDB', err.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type:String,
        required: true,
        validate: {
            validator: (number) => {
                const length = number.length
                const parts = number.split('-')
                return (
                    length >= 8
                    && parts.length === 2
                    && /^\d+$/.test(parts[0])
                    && /^\d+$/.test(parts[1])
                    && (parts[0].length === 2 || parts[0].length ===3)
                )
            },
            message: message => `${message.value} is not a valid number`
        }
    },
})

personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Person', personSchema)