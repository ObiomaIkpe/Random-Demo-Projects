[
    {
    ratings: 4.5,
    bookName: "The Lord of the Rings",
    length: 1178, // Page count
    price: 15.99,
  },
  {
    ratings: 4.2,
    bookName: "To Kill a Mockingbird",
    length: 320,
    price: 10.99,
  },
  {
    ratings: 4.7,
    bookName: "Pride and Prejudice",
    length: 224,
    price: 9.99,
  },
  {
    ratings: 4.3,
    bookName: "One Hundred Years of Solitude",
    length: 487,
    price: 12.99,
  },
  {
    ratings: 4.8,
    bookName: "The Great Gatsby",
    length: 180,
    price: 8.99,
  },
];

const getTours = async (req, res) => {
    try {
        const stats = await getTours.aggregate([
            // each stage is expressed as an object.
            //stage 1: $match [match is the first pipeline the data passes through]
            
            {
                $match: { ratings: {$gte: 3}}
            }, 
            //the $match means "select all objects with ratings greater than or equal to three"
            //stage 2: $group [group objects together using a distinct criterion.]
            {
                _id: null,
                averageRating: { $avg: '$ratingsAverage'},
                minPrice: {$min: '$price'},
                maxPrice: {$max: '$price'},
            
            }, 
            {
                $sort: {avgPrice: 1}
                //setting the average price to 1 sorts the result in ascending order.
            }
            
        ]);

        res.status(200).json({stats})
    } catch (error) {
        console.log(error)
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}