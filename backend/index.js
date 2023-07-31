require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const app = express();
const port = process.env.PORT || 5000;

// use body parser to get data from POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Use API routes from the api folder
const apis = require("./api");
app.use("/api", apis);

//static files
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req,res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// Connect to Mongo DB Atlas
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected to Weather App..'))
.catch(err => console.log(err));

app.listen(port, () => console.log(`Listening on port ${port}`));