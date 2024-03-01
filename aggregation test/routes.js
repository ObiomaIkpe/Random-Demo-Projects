const express = require('express')
const router  = express.Router()
const { bookAggregation, homeController, createBooks, getAllBooks } = require('./bookController')

router.get('/', homeController)
router.post('/createBooks', createBooks)
router.get('/bookAggregator', bookAggregation)
router.get('/allbooks', getAllBooks)


module.exports = router