require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const routing = require("./routes/main") 
// database connectivity
const connectDB = require("./db/connect")

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// routing
app.use('/api/v1' , routing);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
