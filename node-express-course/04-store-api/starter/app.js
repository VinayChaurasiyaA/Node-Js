
require('dotenv').config();
require("express-async-errors")

const express = require('express');

const productsRouter = require("./routes/products");
const connectDB = require('./db/connect');

const app = express();

// middlewares
const errorMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found')

// in-built middlewares;
app.use(express.json());
// app.use(cors());

// the middlewares we made:
app.use(errorMiddleware);
app.use(notFoundMiddleware);

// routes
app.get('/' , (req,res) => {
    res.send("<h1> Store api</h> <a href='/api/v1/products'>More products</a>")
});

app.use('/api/v1/products' , productsRouter);


// start
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(5000 , () => {
            console.log("server is starting on port 5000")
        })
    } catch (error) {
        console.log(error)
    }
}
start()
console.log('04 Store API')