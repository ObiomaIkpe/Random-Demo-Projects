const Book = require('./bookModel');

const homeController = async(req, res) => {
    res.json('home').status(200)
}

const bookAggregation = async (req, res) => {
    try {
        const stats = await Book.aggregate([   
            // each stage is expressed as an object.
            //stage 1: $match [match is the first pipeline the data passes through]            
           {
            $match: {rating: {$gt: 4.5}}
           },
            //the $match means "select all documents with rating greater than 4.5"
            //stage 2: $group [group objects together using a distinct criterion.]
            {
                $group: { 
                    _id: null,
                    //calculate the number of books that match this condition
                    numOfBooks: {$sum: 1},
                    //calculate the sum of the ratings.  
                    sumOfRatings: {$sum: '$rating'},
                    //calculate the average rating.
                    avgRating: {$avg: '$rating'},
                    //calculate the average price.
                    avgPrice: {$avg: '$price'},
                    minPrice: {$min: '$price'},
                    maxPrice: {$max: '$price'}
                }}            
        ])
        const numOfDocuments = await Book.countDocuments();

        res.status(200).json({stats, numOfDocuments })
    }catch (err){
        console.log(err)
    }
}

const createBooks = async (req, res) => {
    const newBook = await Book.create(req.body);
    res.status(200).json({newBook})
}

const getAllBooks = async (req, res) => {
    const allBooks = await Book.find();
    res.status(200).json({allBooks})
}



module.exports = {bookAggregation, homeController, createBooks, getAllBooks}


//this aggregation pipeline is going to get the average price of all books that have a rating greater than or equal to 3.5, as well as their minimum and maximum price.         