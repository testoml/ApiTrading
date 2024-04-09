# Api Trading Demo using MongoDB

### Prerequisites
- Installed node.js
- Installed MondoDB
  - You can use these tutorials to start with MongoDB, for our example with will use localhost, but you can use the free cloud account from MongoDB:
    - [Mongodb installation in windows](https://www.youtube.com/watch?v=gB6WLkSrtJk) 
    - [Mongodb fundamentals](https://www.youtube.com/watch?v=c2M-rlkkT5o)
  - Links useful for installation of MongoDB
    - [Comunity](https://www.mongodb.com/try/download/community)
    - [Shell](https://www.mongodb.com/try/download/shell)


       
- Initialize package.js
 ```sh
npm init
```
- Please create a new folder with an empty project and I suggest the following structure
 
   
- Install dependecies and dev-depencies
#### Dev-dependecies
Install nodemon
```sh
npm install nodemon --save-dev
```
nodemon is a utility tool that helps in the development of Node.js-based applications by monitoring changes in the file system. Unlike the regular node command, which requires manual restart every time you make changes to your code, nodemon automatically restarts your application whenever it detects changes in your source files. This saves developers time and effort during the development process, as they don't have to constantly stop and restart the server manually.

Some key features of nodemon include:
- Automatic Restart: Nodemon monitors files in the directory where your Node.js application is located. Whenever it detects changes in any of the files with specified extensions (e.g., .js, .json), it automatically restarts the application.
- Customization: Nodemon offers various configuration options to customize its behavior according to your requirements. You can specify which files to watch, ignore specific files or directories, delay the restart, and more, using command-line flags or a nodemon.json configuration file.
- Integration: Nodemon can be easily integrated into your development workflow. You can use it with popular build tools, task runners, and frameworks, such as npm scripts, Gulp, or Grunt, to streamline your development process further.
- Improved Productivity: By eliminating the need for manual server restarts after code changes, nodemon improves developers' productivity and workflow efficiency. It allows developers to focus on writing and testing code without interruptions caused by server restarts.

> Note: After installation of dev-depencies in package.json set the script to run nodemon
```json
 "scripts": {
    "start": "nodemon src/index.js"
  },
```
#### Dependecies
```sh
npm install mongoose express dotenv
```
- **mongoose**: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward schema-based solution to model your application data. With Mongoose, you can define schemas to represent your data structures and perform operations like querying, inserting, updating, and deleting documents in your MongoDB database.
- **express**: Express is a web application framework for Node.js. It simplifies the process of building web applications and APIs by providing a robust set of features for handling HTTP requests, routing, middleware integration, and more. Express is widely used for building both small-scale and large-scale web applications due to its flexibility and minimalist design.
- **dotenv**: Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. It's commonly used in Node.js applications to manage environment-specific configurations such as API keys, database connection strings, and other sensitive information. Using dotenv helps keep sensitive information out of version control and provides a convenient way to manage environment variables across different environments (e.g., development, staging, production).

### Conecction MongoDB
In my example I connected to localhost, so in our index.js we are going to connect with the data based
```javascript
//Dependecies
const express = require("express");
const mongoose = require("mongoose");
//Express Setup: an instance of express is created, and stored in the variable app
const app = express();
//MongoDB connection uri
/*This URI typically specifies the host, port, and any additional options required to connect to the MongoDB server.*/
const uri = 'mongodb://localhost:27017/'
/*Port Configuration - The code sets up the port on which the Express server will listen for incoming requests. 
It uses the value of the environment variable PORT if set, otherwise defaults to port 9000.*/ 
const port = process.env.PORT || 9000;
/*A basic route is defined for the root URL ('/') using app.get(). 
When a GET request is made to the root URL, the server responds with the message "Welcome to my API".*/ 
app.get('/', (req, res)=>{
    res.send("Welcome to my API");
});
/*Method is called to establish a connection to the MongoDB database using the URI defined earlier. 
This returns a promise, which is handled using then() and catch() to log success or error messages respectively.*/
mongoose.connect(uri)
.then(()=> console.log('connected to mongo db success'))
.catch((err)=>console.error(err));
/*Server Listening - The Express application starts listening on the specified port for incoming HTTP requests using app.listen(). 
Once the server is running, a message indicating the port number is logged to the console.*/
app.listen(port, ()=> console.log("server listening on port", port));
```
Run and check the connection working on
```dash
npm run start
```
[image]()

### Set environment
- Create a new file called .env in the main path
`MONGODB_URI= 'mongodb://localhost:27017/'`
- Add env to index.js
```javascript
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//const uri = 'mongodb://localhost:27017/' comnent uri

const port = process.env.PORT || 9000;

app.get('/', (req, res)=>{
    res.send("Welcome to my API");
});

//Add env
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('connected to mongo db success'))
.catch((err)=>console.error(err));

app.listen(port, ()=> console.log("server listening on port", port));
```
- Save all changes and check that all working on

## Schema
In MongoDB, a schema refers to the structure or blueprint of how data is organized within a collection. Unlike traditional relational databases where tables have fixed schemas and enforce strict data types for each column, MongoDB is a NoSQL database that is schema-less by default. This means that documents within a collection can have varying structures, and fields within documents can be added or removed dynamically.

However, while MongoDB allows flexibility in schema design, it's still common and often beneficial to define a schema for your documents, especially in applications with well-defined data models. This is where Mongoose, the ODM (Object Data Modeling) library, comes into play.

In Mongoose, a schema is a configuration object that defines the structure of documents in a MongoDB collection. It typically includes the following:
- Field Definitions: Each field in the document is defined within the schema, specifying the field's name, data type, and any additional options such as default values, validation rules, etc.
- Data Types: MongoDB supports a variety of data types including string, number, boolean, date, array, object, and more. Mongoose provides additional data types and features such as embedded schemas, references, and virtuals.
- Validation Rules: Mongoose allows you to define validation rules for each field in the schema, ensuring that data adheres to specific criteria before being stored in the database.
- Default Values: You can specify default values for fields in the schema, which are used when a document is created without providing a value for that field.
- Indexes: Indexes can be defined within the schema to improve query performance for specific fields.

#### Set Schema
In models create a new file called trades.js
```javascript
const mongoose = require("mongoose");

const tradeSchema = mongoose.Schema({
    date:{
        type: String, 
        required: true
    }, 
    amount:{
        type: Number,
        required: true
    },
    win:{
        type: Boolean,
        required:true
    },
    payaout:{
        type: Number,
        required: true,
    },
    profit:{
        type: Number,
        required: false
    },
    assert:{
        type: String, 
        required: false
    }
});


module.exports = mongoose.model('Trade', tradeSchema);
```
## POST
#### Define route
In Route folder create a new file called trades.js and we are ready for a first insert 
```javascript
const e = require("express");
const tradeSchema = require("../models/trades");

const router = e.Router();

//create trade
router.post('/trades', (req, res) => {
    const trade = tradeSchema(req.body);
    trade.save()
        .then((data) => { res.json(data) })
        .catch((error) => res.json({ message: error }))
});

module.exports = router;
```
#### Set route/trades
In index.js set route/trades and middleware
```javascript
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
```

- app.use(express.json());
This line configures the Express application to parse incoming requests with JSON payloads. When a request is received with a Content-Type header of "application/json", Express automatically parses the request body and exposes it in req.body as a JavaScript object. This middleware is essential for handling JSON data in requests, such as those coming from client-side applications or APIs.
- app.use('/api', tradesRoute);
This line mounts a router middleware at a specific route in the Express application. The router middleware (tradesRoute) is responsible for handling requests and generating responses for routes prefixed with '/api'. This means that any incoming request to paths starting with '/api' will be forwarded to the tradesRoute router middleware for further handling.
#### Test API
In main folder create a new file called requests.http 
```
###
POST http://localhost:9000/api/trades HTTP/1.1
Content-Type:  application/json

{
    "date": "07/04/2024",
    "amount": 2,
    "win": true, 
    "payaout": 0.92,
    "profit": 1.84
}
```
Save all and In requests.http click on "Send Request" and check the response, you can refresh your Mongodb compass and verify if the collection and document is created
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 113
ETag: W/"71-lrjp8FwKj/zTeAS9ACP1Fp2540U"
Date: Mon, 08 Apr 2024 17:17:46 GMT
Connection: close

{
  "date": "07/04/2024",
  "amount": 2,
  "win": true,
  "payaout": 0.92,
  "profit": 1.84,
  "_id": "661426ba36479b2525cd9c0c",
  "__v": 0
}
```

## GET ALL
#### Define route 
In route/trades.js add method to get all trades
```javascript
//get all trades
router.get('/trades', (req, res) => {
    tradeSchema.find()
        .then((data) => { res.json(data) })
        .catch((error) => res.json({ message: error }))
})
```

#### Test API
In our requests.http add test
```
###
GET http://localhost:9000/api/trades HTTP/1.1
Content-Type:  application/json
```
Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 229
ETag: W/"e5-O41ncZ6VlE9t6I1rGuJbhkI28bw"
Date: Mon, 08 Apr 2024 17:36:48 GMT
Connection: close

[
  {
    "_id": "661427d636479b2525cd9c10",
    "date": "07/04/2024",
    "amount": 2,
    "win": true,
    "payaout": 0.92,
    "profit": 1.84,
    "__v": 0
  },
  {
    "_id": "66142b2ab04509486dc009df",
    "date": "07/04/2024",
    "amount": 4,
    "win": true,
    "payaout": 0.92,
    "profit": 3.68,
    "__v": 0
  }
]
```

## GET By Id
#### Define route 
In route/trades.js add method to get trade by id param
```javascript
//get trade by id
router.get('/trades/:id', (req, res) => {
    const { id } = req.params;
    tradeSchema.findById(id)
        .then((data) => { res.json(data) })
        .catch((error) => res.json({ message: error }))
});
```
#### Test API
In our requests.http add test and replace with a valid id
```
###
GET http://localhost:9000/api/trades/661427d636479b2525cd9c10 HTTP/1.1
Content-Type:  application/json
```
Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 113
ETag: W/"71-Im9QGNhLuq53BNBGxPNxy8odshg"
Date: Mon, 08 Apr 2024 17:38:46 GMT
Connection: close

{
  "_id": "661427d636479b2525cd9c10",
  "date": "07/04/2024",
  "amount": 2,
  "win": true,
  "payaout": 0.92,
  "profit": 1.84,
  "__v": 0
}
```
## PUT
#### Define route 
In route/trades.js add method to update a trade by id
```javascript
//update a trade
router.put('/trades/:id', (req, res) => {
    const { id } = req.params;
    const { date, amount, win, payaout, profit, assert } = req.body;
    tradeSchema
        .updateOne({ _id: id }, { $set: { date, amount, win, payaout, profit, assert } })
        .then((data) => { res.json(data) })
        .catch((error) => res.json({ message: error }))
});
```
#### Test API
In our requests.http add test and replace with a valid id
```
###
PUT  http://localhost:9000/api/trades/661427d636479b2525cd9c10 HTTP/1.1
Content-Type:  application/json

{
    "date": "07/05/2024",
    "amount": 3,
    "win": true, 
    "payaout": 0.92,
    "profit": 1.84
}
```
Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 92
ETag: W/"5c-XE4LqSKK8lMBgnDPfq7vp2yCSG8"
Date: Mon, 08 Apr 2024 17:42:48 GMT
Connection: close

{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

## DELETE
#### Define route 
In route/trades.js add method to update a trade by id
```javascript
//delete a trade
router.delete("/trades/:id", (req, res) => {
    const { id } = req.params;
    tradeSchema
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

```
#### Test API
In our requests.http add test and replace with a valid id
```
###
DELETE  http://localhost:9000/api/trades/661427d636479b2525cd9c10 HTTP/1.1
```
Response
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-fgR5yLHQ1Hpp6zDESHaY9wJreYE"
Date: Mon, 08 Apr 2024 17:46:53 GMT
Connection: close

{
  "acknowledged": true,
  "deletedCount": 1
}
```
You can run the test related to get all and verify the length of array

## Validations
In routes/trades.js add some validations, you can perform with Postman all endpoint
```javascript
const e = require("express");
const mongoose = require("mongoose");
const tradeSchema = require("../models/trades");

const router = e.Router();

//create trade
router.post('/trades', (req, res) => {
    const trade = tradeSchema(req.body);
    // Validate the trade data
    const validationError = trade.validateSync();
    if (validationError) {
        // If there are validation errors, respond with a 400 Bad Request status code
        return res.status(400).json({ error: validationError.message });
    }
    trade.save()
        .then((data) => { res.json(data) })
        .catch((error) => res.status(500).json({ message: error }))
});

//get all trades
router.get('/trades', (req, res) => {
    const errors = validateTradeQuery(req.query);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    tradeSchema.find()
        .then((data) => { res.json(data) })
        .catch((error) => res.status(500).json({ message: error }))
})

//get trade by id
router.get('/trades/:id', (req, res) => {
    const { id } = req.params;
    validateID(id);
    tradeSchema.findById(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: 'Trade not found' });
            }
            res.json(data)
        })
        .catch((error) => res.status(500).json({ message: error }))
});

//update a trade
router.put('/trades/:id', (req, res) => {
    const { id } = req.params;
    const { date, amount, win, payaout, profit, assert } = req.body;
    validateID(id);
    const errors = validateTradeQuery(req.query);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    };
    tradeSchema
        .updateOne({ _id: id }, { $set: { date, amount, win, payaout, profit, assert } })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: 'Trade not found' });
            }
            res.json(data)
        })
        .catch((error) => res.status(500).json({ message: error }))
});

//delete a trade
router.delete("/trades/:id", (req, res) => {
    const { id } = req.params;
    validateID(id)
    tradeSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

function validateID(id){
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid trade ID' });
    }
}

// Function to validate request parameters based on schema


module.exports = router;
```
**Example of reponse with error**
```
### Invalid id
PUT  http://localhost:9000/api/trades/457   HTTP/1.1
Content-Type:  application/json
```
**PUT Response**

```
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 28
ETag: W/"1c-oVFWzv7Ooc8YZvVPl8/YNo3k+P4"
Date: Mon, 08 Apr 2024 19:25:26 GMT
Connection: close

{
  "error": "Invalid trade ID"
}
```