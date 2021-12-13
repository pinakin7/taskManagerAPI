const express = require('express');
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/errorHandler');
require('dotenv').config();


const app = express();

// middleware
app.use(express.json());
app.use(notFound);

app.use(errorHandlerMiddleware);

// routes
app.get('/',(req,res)=>{
    // console.log(req);
    res.send('Task Manager App');
});



app.use('/api/v1/tasks',tasks);


const port = process.env.PORT || 3000;

const start = async ()=>{
    try{

        // waiting for the database to establishing connection 
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to the database');

        // after successful connection we start the server
        app.listen(port, console.log(`server is listening on port ${port}...`));

    }
    catch(error){

        console.error(error);
        
    }
}

start()