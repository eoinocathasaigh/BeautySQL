var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mySqlDao = require('./sqlDao')
let ejs = require('ejs');
app.set('view engine', 'ejs')
const { check, validationResult } = require('express-validator');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'));

//Making our app listen on port 3004
//Listening for connections on a certain port
app.listen(3000, ()=>{
    console.log("App is listening for connection");
})

//Routing in the application
//Returning the content of the home page - what the user will initially see
app.get("/", (req, res)=> {
    res.render("home");
})

//Rendering the participants page
app.get("/participants", (req, res)=> {
    res.render("participants");
})

//Rendering the members and their details
app.get("/members", (req, res)=> {
    mySqlDao.getMembers()
    .then((data)=>{
        console.log("Correctly retrieved data")
        res.render("memberDetails", {"squadMembers": data, updateEligibility: mySqlDao.updateVideoEligibility});
    })
    .catch((error)=>{
        console.log("Error Encountered While Retrieving data")
        res.send(error);
    })
})

//Rendering the campaings with their details
app.get("/campaigns", (req, res)=> {
    mySqlDao.getCampaigns()
    .then((data)=>{
        console.log("Correctly retrieved data")
        res.render("campaigns", {"campDetails": data});
    })
    .catch((error)=>{
        console.log("Error Encountered While Retrieving data")
        res.send(error);
    })
})