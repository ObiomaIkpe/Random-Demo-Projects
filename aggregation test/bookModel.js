const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    numberOfPages: {
        type: Number,
        required: true
    },
    averageRating: {
        type: Number,
        required: true, 
        default: 3
    }
}, {timeStamps: true})

const Book = mongoose.model('Book', BookSchema)

module.exports = Book