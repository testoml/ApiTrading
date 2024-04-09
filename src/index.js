//Dependecies
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
//configure route for trades
const tradesRoute = require("./routes/trades");

const app = express();

//middleware
app.use(express.json());
app.use('/api', tradesRoute);

const port = process.env.PORT || 9000;

app.get('/', (req, res)=>{
    res.send("Welcome to my API");
});

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('connected to mongo db success'))
.catch((err)=>console.error(err));

app.listen(port, ()=> console.log("server listening on port", port));