const express = require('express')
const mongoose = require('mongoose')
const Books = require('./bookModel')
const dotenv = require('dotenv')
const router = require('./routes')
dotenv.config()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router)
const connectDB = (URL) => {
    try {
        console.log('connected to db')
        return mongoose.connect(URL)
    } catch (error) {
        console.log(error)
    }
}

const port = 7200 || process.env.port;

const start = async () => {
    try{
    await connectDB(process.env.MONGO_URI);
     app.listen(port, () => console.log(`listening on port ${port}`))
    }
    catch (err){
        console.log(err)
    }
}

start();